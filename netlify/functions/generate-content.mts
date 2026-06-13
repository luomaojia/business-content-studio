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
  provider?: 'custom' | 'deepseek' | 'mimo';
  endpoint: string;
  model: string;
  apiKey: string;
  extraHeaders?: string;
};

const providerDefaults: Record<'deepseek' | 'mimo', Pick<LlmSettings, 'endpoint' | 'model'>> = {
  deepseek: {
    endpoint: 'https://api.deepseek.com/chat/completions',
    model: 'deepseek-v4-flash',
  },
  mimo: {
    endpoint: 'https://api.xiaomimimo.com/v1/chat/completions',
    model: 'mimo-v2.5-pro',
  },
};

type LocaleCode = 'zh-CN' | 'en' | 'ja' | 'ko' | 'es' | 'fr' | 'de' | 'pt' | 'ar';

const languageNames: Record<LocaleCode, string> = {
  'zh-CN': 'Simplified Chinese',
  en: 'English',
  ja: 'Japanese',
  ko: 'Korean',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  pt: 'Portuguese',
  ar: 'Arabic',
};

const themeLabels: Record<LocaleCode, string[]> = {
  'zh-CN': ['新品', '优惠', '口碑', '场景', '爆款', '节日', '复购'],
  en: ['New', 'Deal', 'Social proof', 'Scene', 'Bestseller', 'Weekend', 'Comeback'],
  ja: ['新商品', 'お得情報', '口コミ', 'シーン', '人気商品', '週末', 'リピート'],
  ko: ['신상품', '혜택', '후기', '상황', '인기상품', '주말', '재방문'],
  es: ['Nuevo', 'Oferta', 'Prueba social', 'Escena', 'Popular', 'Fin de semana', 'Repetición'],
  fr: ['Nouveauté', 'Offre', 'Preuve sociale', 'Moment', 'Populaire', 'Week-end', 'Retour'],
  de: ['Neu', 'Angebot', 'Empfehlung', 'Situation', 'Bestseller', 'Wochenende', 'Wiederkehr'],
  pt: ['Novidade', 'Oferta', 'Prova social', 'Momento', 'Mais pedido', 'Fim de semana', 'Retorno'],
  ar: ['جديد', 'عرض', 'دليل اجتماعي', 'مناسبة', 'الأكثر طلبا', 'نهاية الأسبوع', 'عودة'],
};

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

function normalizeSettings(settings: LlmSettings): LlmSettings {
  const provider = settings.provider === 'deepseek' || settings.provider === 'mimo' ? settings.provider : 'custom';
  const defaults = provider === 'custom' ? undefined : providerDefaults[provider];

  return {
    ...settings,
    provider,
    endpoint: settings.endpoint?.trim() || defaults?.endpoint || '',
    model: settings.model?.trim() || defaults?.model || '',
  };
}

function hasHeader(headers: Record<string, string>, name: string) {
  return Object.keys(headers).some((headerName) => headerName.toLowerCase() === name.toLowerCase());
}

function setProviderAuthHeaders(settings: LlmSettings, headers: Record<string, string>) {
  const apiKey = settings.apiKey?.trim();
  if (!apiKey) return;

  if (settings.provider === 'mimo') {
    if (!hasHeader(headers, 'api-key')) headers['api-key'] = apiKey;
    return;
  }

  if (!hasHeader(headers, 'authorization')) {
    headers.Authorization = `Bearer ${apiKey}`;
  }
}

function buildPrompt(profile: BusinessProfile, offer: Offer, locale: LocaleCode) {
  const targetLanguage = languageNames[locale] ?? languageNames['zh-CN'];
  const themes = themeLabels[locale] ?? themeLabels['zh-CN'];
  return [
    `You are a local business marketing copy assistant. Generate the content pack in ${targetLanguage}.`,
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
    `要求：calendar 必须正好 7 条，theme 依次为 ${themes.join('、')}。每条 postBody 要包含具体店名、产品、卖点、优惠或本地场景。hashtags 3-6 个。videoScript 需要包含 3-4 个镜头。不要编造不存在的地址。除 JSON 字段名以外，所有面向用户的内容必须使用 ${targetLanguage}。`,
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

function validatePack(payload: any, locale: LocaleCode) {
  const requiredThemes = themeLabels[locale] ?? themeLabels['zh-CN'];
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

async function callChatCompletions(settings: LlmSettings, headers: Record<string, string>, profile: BusinessProfile, offer: Offer, locale: LocaleCode) {
  const baseBody = {
    model: settings.model.trim(),
    messages: [
      {
        role: 'system',
        content: `Return only valid JSON. User-facing content must be in ${languageNames[locale] ?? languageNames['zh-CN']}. Do not output Markdown.`,
      },
      {
        role: 'user',
        content: buildPrompt(profile, offer, locale),
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
      locale?: LocaleCode;
    };

    const { profile, offer, settings } = body;
    const locale = body.locale && body.locale in languageNames ? body.locale : 'zh-CN';
    if (!profile || !offer || !settings) return jsonResponse({ error: '缺少生成参数。' }, 400);
    const normalizedSettings = normalizeSettings(settings);
    if (!normalizedSettings.endpoint?.trim()) return jsonResponse({ error: '请填写 API 地址。' }, 400);
    if (!normalizedSettings.model?.trim()) return jsonResponse({ error: '请填写模型名称。' }, 400);

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...parseExtraHeaders(normalizedSettings.extraHeaders),
    };

    setProviderAuthHeaders(normalizedSettings, headers);

    const upstream = await callChatCompletions(normalizedSettings, headers, profile, offer, locale);

    const upstreamText = await upstream.text();
    if (!upstream.ok) {
      return jsonResponse({ error: `上游 API 请求失败：${upstream.status}`, detail: upstreamText.slice(0, 800) }, 502);
    }

    const upstreamPayload = JSON.parse(upstreamText);
    const content = upstreamPayload?.choices?.[0]?.message?.content;
    if (typeof content !== 'string') throw new Error('上游 API 响应不包含 choices[0].message.content。');

    const parsed = JSON.parse(extractJsonObject(content));
    const pack = validatePack(parsed, locale);

    return jsonResponse({ pack });
  } catch (error) {
    return jsonResponse({ error: error instanceof Error ? error.message : 'LLM 生成失败。' }, 500);
  }
};

export const config: Config = {
  path: '/api/generate-content',
};
