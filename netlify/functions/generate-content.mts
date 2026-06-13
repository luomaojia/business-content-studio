import type { Config, Context } from '@netlify/functions';

type BusinessProfile = {
  name: string;
  industry: string;
  city: string;
  tone: string;
  avgPrice: string;
  signatureItems: string;
};

type Offer = {
  name: string;
  price: string;
  sellingPoints: string;
  discount: string;
  imagePreviewUrl?: string;
};

type LlmSettings = {
  endpoint: string;
  model: string;
  apiKey: string;
  extraHeaders?: string;
};

const requiredThemes = ['新品', '优惠', '口碑', '场景', '爆款', '节日', '复购'];

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

function parseExtraHeaders(value = '') {
  if (!value.trim()) return {};
  const parsed = JSON.parse(value) as Record<string, unknown>;
  return Object.fromEntries(
    Object.entries(parsed)
      .filter(([, headerValue]) => typeof headerValue === 'string')
      .map(([headerName, headerValue]) => [headerName, headerValue as string]),
  );
}

function buildPrompt(profile: BusinessProfile, offer: Offer) {
  return [
    '你是本地生活商家运营文案助手。请为店铺生成中文社媒内容包。',
    '必须只输出 JSON，不要 Markdown，不要代码块。',
    'JSON schema:',
    '{',
    '  "pack": {',
    '    "calendar": [',
    '      { "day": "Day 1", "theme": "新品", "title": "...", "postBody": "...", "hashtags": ["#..."], "publishTime": "11:30", "videoScript": "...", "imageSuggestion": "..." }',
    '    ],',
    '    "reviewReplies": { "positive": "...", "negative": "...", "slowService": "...", "priceConcern": "...", "refund": "..." }',
    '  }',
    '}',
    '要求：calendar 必须正好 7 条，theme 依次为 新品、优惠、口碑、场景、爆款、节日、复购。每条 postBody 要包含具体店名、产品、卖点、优惠或本地场景。hashtags 3-6 个。videoScript 需要包含 3-4 个镜头。不要编造不存在的地址。',
    '',
    `店铺资料：${JSON.stringify(profile)}`,
    `产品/活动：${JSON.stringify({ ...offer, imagePreviewUrl: offer.imagePreviewUrl ? '[用户已上传图片]' : '' })}`,
  ].join('\n');
}

function extractJsonObject(text: string) {
  const trimmed = text.trim();
  if (trimmed.startsWith('{')) return trimmed;
  const match = trimmed.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('模型没有返回可解析的 JSON。');
  return match[0];
}

function validatePack(payload: any) {
  const pack = payload?.pack;
  if (!pack || !Array.isArray(pack.calendar) || pack.calendar.length !== 7) {
    throw new Error('模型返回内容缺少 7 天日历。');
  }

  pack.calendar.forEach((day: any, index: number) => {
    const theme = requiredThemes[index];
    if (day.theme !== theme) day.theme = theme;
    day.day = day.day || `Day ${index + 1}`;
    day.title = String(day.title || `${theme}内容`);
    day.postBody = String(day.postBody || '');
    day.hashtags = Array.isArray(day.hashtags) ? day.hashtags.map(String).slice(0, 6) : ['#本地生活'];
    day.publishTime = String(day.publishTime || '18:30');
    day.videoScript = String(day.videoScript || '');
    day.imageSuggestion = String(day.imageSuggestion || '');
  });

  pack.reviewReplies = {
    positive: String(pack.reviewReplies?.positive || ''),
    negative: String(pack.reviewReplies?.negative || ''),
    slowService: String(pack.reviewReplies?.slowService || ''),
    priceConcern: String(pack.reviewReplies?.priceConcern || ''),
    refund: String(pack.reviewReplies?.refund || ''),
  };

  return pack;
}

async function callChatCompletions(settings: LlmSettings, headers: Record<string, string>, profile: BusinessProfile, offer: Offer) {
  const baseBody = {
    model: settings.model.trim(),
    messages: [
      {
        role: 'system',
        content: '你只返回符合用户要求的 JSON。不要输出 Markdown。',
      },
      {
        role: 'user',
        content: buildPrompt(profile, offer),
      },
    ],
    temperature: 0.7,
  };

  const endpoint = settings.endpoint.trim();
  const strictResponse = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      ...baseBody,
      response_format: { type: 'json_object' },
    }),
  });

  if (strictResponse.ok || ![400, 404, 422].includes(strictResponse.status)) {
    return strictResponse;
  }

  return fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(baseBody),
  });
}

export default async (req: Request, _context: Context) => {
  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  try {
    const body = (await req.json()) as {
      profile?: BusinessProfile;
      offer?: Offer;
      settings?: LlmSettings;
    };

    const { profile, offer, settings } = body;
    if (!profile || !offer || !settings) return jsonResponse({ error: '缺少生成参数。' }, 400);
    if (!settings.endpoint?.trim()) return jsonResponse({ error: '请填写 API 地址。' }, 400);
    if (!settings.model?.trim()) return jsonResponse({ error: '请填写模型名称。' }, 400);

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...parseExtraHeaders(settings.extraHeaders),
    };

    if (settings.apiKey?.trim() && !headers.Authorization && !headers.authorization) {
      headers.Authorization = `Bearer ${settings.apiKey.trim()}`;
    }

    const upstream = await callChatCompletions(settings, headers, profile, offer);

    const upstreamText = await upstream.text();
    if (!upstream.ok) {
      return jsonResponse({ error: `上游 API 请求失败：${upstream.status}`, detail: upstreamText.slice(0, 800) }, 502);
    }

    const upstreamPayload = JSON.parse(upstreamText);
    const content = upstreamPayload?.choices?.[0]?.message?.content;
    if (typeof content !== 'string') throw new Error('上游 API 响应不包含 choices[0].message.content。');

    const parsed = JSON.parse(extractJsonObject(content));
    const pack = validatePack(parsed);

    return jsonResponse({ pack });
  } catch (error) {
    return jsonResponse({ error: error instanceof Error ? error.message : 'LLM 生成失败。' }, 500);
  }
};

export const config: Config = {
  path: '/api/generate-content',
};
