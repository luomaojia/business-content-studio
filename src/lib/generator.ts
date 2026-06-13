import type { BusinessProfile, GeneratedDay, GeneratedPack, Offer, ReviewReplies } from './types';

const themes = ['新品', '优惠', '口碑', '场景', '爆款', '节日', '复购'];
const publishTimes = ['11:30', '14:00', '17:30', '19:30', '20:30', '12:00', '18:30'];

const tonePhrases = {
  接地气: {
    opener: '今天别纠结吃什么',
    action: '路过就来，别让嘴巴等太久',
  },
  高级感: {
    opener: '把日常留给一点更讲究的选择',
    action: '适合慢慢体验，也适合分享给懂生活的人',
  },
  活泼: {
    opener: '这波真的可以冲',
    action: '叫上朋友一起安排，快乐加倍',
  },
  专业可信: {
    opener: '给你一个更稳妥的选择',
    action: '欢迎提前预约，我们会按需给到建议',
  },
};

const fallbackProfile: BusinessProfile = {
  name: '你的店铺',
  industry: '餐饮/夜宵店',
  city: '本地',
  tone: '接地气',
  avgPrice: '人均价格待定',
  signatureItems: '招牌产品',
};

const fallbackOffer: Offer = {
  name: '主打产品',
  price: '到店咨询',
  sellingPoints: '新鲜、好看、适合分享',
  discount: '本周有到店福利',
  imagePreviewUrl: '',
};

function clean(value: string, fallback: string) {
  return value.trim() || fallback;
}

function splitItems(value: string, fallback: string) {
  return clean(value, fallback)
    .split(/[,，、]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function cityScene(profile: BusinessProfile) {
  const city = clean(profile.city, fallbackProfile.city);
  if (profile.industry === '餐饮/夜宵店') return `${city}下班后、朋友小聚、夜宵续摊`;
  if (profile.industry === '美甲店') return `${city}通勤约会、周末变美、拍照出片`;
  if (profile.industry === '咖啡店') return `${city}午休办公、朋友见面、周末放空`;
  if (profile.industry === '宠物店') return `${city}宠物洗护、换季护理、日常打理`;
  return `${city}下班训练、新手入门、周末打卡`;
}

function platformTags(profile: BusinessProfile, offer: Offer, heroItem: string) {
  const city = clean(profile.city, fallbackProfile.city);
  return [
    `#${city}${profile.industry}`,
    `#${heroItem}`,
    `#${clean(offer.name, fallbackOffer.name)}`,
    '#本地生活',
    '#今日推荐',
  ];
}

function buildDay(profile: BusinessProfile, offer: Offer, index: number): GeneratedDay {
  const theme = themes[index];
  const items = splitItems(profile.signatureItems, fallbackProfile.signatureItems);
  const heroItem = items[index % items.length];
  const tone = tonePhrases[profile.tone] ?? tonePhrases['接地气'];
  const name = clean(profile.name, fallbackProfile.name);
  const offerName = clean(offer.name, fallbackOffer.name);
  const price = clean(offer.price, fallbackOffer.price);
  const discount = clean(offer.discount, fallbackOffer.discount);
  const sellingPoints = splitItems(offer.sellingPoints, fallbackOffer.sellingPoints).slice(0, 4);
  const scene = cityScene(profile);

  const titleMap: Record<string, string> = {
    新品: `${name}本周主推：${offerName}`,
    优惠: `${price} 元左右就能安排的${heroItem}`,
    口碑: `老客回头点名要的${heroItem}`,
    场景: `${scene}，这一份刚好合适`,
    爆款: `${name}近期高频被问的${offerName}`,
    节日: `给这个周末准备一点${heroItem}仪式感`,
    复购: `吃过/体验过一次，容易想再来的理由`,
  };

  const postBody = [
    `${tone.opener}，${name}把「${offerName}」整理成了今天的推荐。`,
    `这款适合${scene}，核心卖点是：${sellingPoints.join('、')}。`,
    `参考价格：${price} 元；当前福利：${discount}。`,
    `如果你在附近，今天可以直接收藏这条，${tone.action}。`,
  ].join('\n');

  return {
    day: `Day ${index + 1}`,
    theme,
    title: titleMap[theme],
    postBody,
    hashtags: platformTags(profile, offer, heroItem),
    publishTime: publishTimes[index],
    videoScript: `镜头1：3 秒拍门头或环境，字幕「${name}今日推荐」。\n镜头2：8 秒拍${offerName}细节，突出${sellingPoints[0] ?? heroItem}。\n镜头3：5 秒拍顾客使用/开吃/成品效果，字幕「${discount}」。\n结尾：镜头对准产品，口播「想试这款，私信或到店报名字就行」。`,
    imageSuggestion: offer.imagePreviewUrl
      ? `用上传图片做主图，叠加「${offerName} / ${price} 元 / ${discount}」三行信息。`
      : `拍一张${offerName}近景，背景带一点店内环境，画面里保留价格和福利文字位置。`,
  };
}

export function generateContentPack(profileInput: BusinessProfile, offerInput: Offer): GeneratedPack {
  const profile: BusinessProfile = {
    ...fallbackProfile,
    ...profileInput,
    name: clean(profileInput.name, fallbackProfile.name),
    city: clean(profileInput.city, fallbackProfile.city),
    avgPrice: clean(profileInput.avgPrice, fallbackProfile.avgPrice),
    signatureItems: clean(profileInput.signatureItems, fallbackProfile.signatureItems),
  };

  const offer: Offer = {
    ...fallbackOffer,
    ...offerInput,
    name: clean(offerInput.name, fallbackOffer.name),
    price: clean(offerInput.price, fallbackOffer.price),
    sellingPoints: clean(offerInput.sellingPoints, fallbackOffer.sellingPoints),
    discount: clean(offerInput.discount, fallbackOffer.discount),
  };

  return {
    calendar: themes.map((_, index) => buildDay(profile, offer, index)),
    reviewReplies: buildReviewReplies(profile, offer),
  };
}

export function buildReviewReplies(profile: BusinessProfile, offer: Offer): ReviewReplies {
  const name = clean(profile.name, fallbackProfile.name);
  const offerName = clean(offer.name, fallbackOffer.name);
  const discount = clean(offer.discount, fallbackOffer.discount);

  return {
    positive: `谢谢喜欢 ${name}！看到你满意我们很开心，下次来可以继续试试「${offerName}」，到店也可以问问当天福利。`,
    negative: `很抱歉这次体验没有达到预期。方便的话请私信我们到店时间和具体问题，我们会尽快核实并给你一个处理方案。`,
    slowService: `抱歉让你久等了。高峰期出餐/服务节奏确实可能受影响，我们会继续优化排队和提醒流程，也欢迎你提前预约或错峰到店。`,
    priceConcern: `谢谢反馈。我们的价格会尽量对应原料、服务和现场体验，也会持续保留更划算的组合选择。本周福利是：${discount}。`,
    refund: `收到你的诉求了。请把订单信息或到店凭证私信给我们，我们核实后会按实际情况处理退款、补偿或重新服务。`,
  };
}

export function serializeTextPack(profile: BusinessProfile, offer: Offer, pack: GeneratedPack) {
  const lines = [
    `${clean(profile.name, fallbackProfile.name)} 一周内容包`,
    `行业：${profile.industry}`,
    `城市：${clean(profile.city, fallbackProfile.city)}`,
    `主打：${clean(profile.signatureItems, fallbackProfile.signatureItems)}`,
    `活动：${clean(offer.name, fallbackOffer.name)} / ${clean(offer.price, fallbackOffer.price)} 元 / ${clean(offer.discount, fallbackOffer.discount)}`,
    '',
    '=== 7 天发布日历 ===',
    ...pack.calendar.flatMap((day) => [
      '',
      `${day.day}｜${day.theme}｜建议 ${day.publishTime} 发布`,
      `标题：${day.title}`,
      `正文：\n${day.postBody}`,
      `标签：${day.hashtags.join(' ')}`,
      `短视频脚本：\n${day.videoScript}`,
      `配图建议：${day.imageSuggestion}`,
    ]),
    '',
    '=== 点评回复模板 ===',
    `好评感谢：${pack.reviewReplies.positive}`,
    `差评安抚：${pack.reviewReplies.negative}`,
    `服务慢解释：${pack.reviewReplies.slowService}`,
    `价格质疑：${pack.reviewReplies.priceConcern}`,
    `退款沟通：${pack.reviewReplies.refund}`,
  ];

  return lines.join('\n');
}
