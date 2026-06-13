import type { BusinessProfile, GeneratedDay, GeneratedPack, LocaleCode, Offer, ReviewReplies } from './types';

type ThemeKey = 'new' | 'deal' | 'proof' | 'scene' | 'hot' | 'weekend' | 'repeat';

type LocalTemplate = {
  id: string;
  zhLabel: string;
  enLabel: string;
  zhLead: (args: TemplateArgs) => string;
  enLead: (args: TemplateArgs) => string;
  zhCta: string;
  enCta: string;
  visual: (args: TemplateArgs) => string;
};

type TemplateArgs = {
  name: string;
  offerName: string;
  price: string;
  discount: string;
  heroItem: string;
  scene: string;
  sellingPoints: string[];
};

type GeneratorCopy = {
  themes: Record<ThemeKey, string>;
  fallbacks: {
    businessName: string;
    city: string;
    avgPrice: string;
    signatureItems: string;
    offerName: string;
    price: string;
    sellingPoints: string;
    discount: string;
  };
  tones: Record<string, { opener: string; action: string }>;
  scenes: Record<string, (city: string) => string>;
  title: (args: { theme: ThemeKey; name: string; offerName: string; price: string; heroItem: string; scene: string }) => string;
  body: (args: { tone: { opener: string; action: string }; name: string; offerName: string; scene: string; sellingPoints: string[]; price: string; discount: string }) => string;
  tags: (args: { city: string; industry: string; heroItem: string; offerName: string }) => string[];
  video: (args: { name: string; offerName: string; firstPoint: string; discount: string; heroItem: string }) => string;
  image: (args: { hasImage: boolean; offerName: string; price: string; discount: string }) => string;
  reviews: (args: { name: string; offerName: string; discount: string }) => ReviewReplies;
  exportLabels: {
    packTitle: string;
    industry: string;
    city: string;
    signature: string;
    offer: string;
    calendar: string;
    title: string;
    body: string;
    tags: string;
    video: string;
    image: string;
    reviews: string;
    positive: string;
    negative: string;
    slowService: string;
    priceConcern: string;
    refund: string;
    suggested: string;
  };
};

const themeOrder: ThemeKey[] = ['new', 'deal', 'proof', 'scene', 'hot', 'weekend', 'repeat'];
const publishTimes = ['11:30', '14:00', '17:30', '19:30', '20:30', '12:00', '18:30'];

const localTemplates: LocalTemplate[] = [
  {
    id: 'new-arrival',
    zhLabel: '新品上架',
    enLabel: 'New arrival',
    zhLead: ({ name, offerName }) => `${name} 本周把「${offerName}」放到主推位，适合用一条新品感内容先把注意力拉回来。`,
    enLead: ({ name, offerName }) => `${name} is putting "${offerName}" in the spotlight this week, making it a clean new-arrival post.`,
    zhCta: '想尝鲜的人，今天先收藏这一条。',
    enCta: 'Save this if you want to try something fresh this week.',
    visual: ({ offerName }) => `主图突出 ${offerName} 的完整成品，画面保留新品标题位置。`,
  },
  {
    id: 'limited-deal',
    zhLabel: '限时福利',
    enLabel: 'Limited deal',
    zhLead: ({ discount }) => `先把福利讲清楚：${discount}。这类内容适合放在午餐前、下班前或周末前。`,
    enLead: ({ discount }) => `Lead with the benefit: ${discount}. This angle works well before lunch, after work, or before the weekend.`,
    zhCta: '福利不需要讲太复杂，看到就能决定来不来。',
    enCta: 'Keep the offer easy to understand so people can decide quickly.',
    visual: ({ discount }) => `图片上直接放大福利信息：${discount}。`,
  },
  {
    id: 'regular-proof',
    zhLabel: '老客口碑',
    enLabel: 'Regulars love it',
    zhLead: ({ heroItem }) => `把「老客为什么会再点 ${heroItem}」讲出来，比单纯说好吃/好看更有说服力。`,
    enLead: ({ heroItem }) => `Explain why regulars keep coming back for ${heroItem}; it is stronger than a generic praise line.`,
    zhCta: '第一次来的顾客，也能从老客选择里降低决策成本。',
    enCta: 'New customers can borrow confidence from what regulars already choose.',
    visual: ({ heroItem }) => `拍一张 ${heroItem} 的细节近景，搭配“老客常点”文案。`,
  },
  {
    id: 'after-work-scene',
    zhLabel: '下班场景',
    enLabel: 'After-work scene',
    zhLead: ({ scene }) => `直接把使用场景写出来：${scene}。让顾客先看到“这正适合我”。`,
    enLead: ({ scene }) => `Make the use case obvious: ${scene}. Help people recognize the moment first.`,
    zhCta: '场景越具体，越容易被转发给同行的人。',
    enCta: 'The more specific the scene, the easier it is to share with someone who fits it.',
    visual: ({ scene }) => `画面带一点 ${scene} 的氛围，不只拍产品本身。`,
  },
  {
    id: 'owner-pick',
    zhLabel: '老板推荐',
    enLabel: 'Owner pick',
    zhLead: ({ offerName, sellingPoints }) => `用老板口吻推荐「${offerName}」：重点不是堆词，而是讲 ${sellingPoints[0] || '这个亮点'} 为什么值得试。`,
    enLead: ({ offerName, sellingPoints }) => `Use an owner-pick angle for "${offerName}": explain why ${sellingPoints[0] || 'the key point'} is worth trying.`,
    zhCta: '这种口吻适合朋友圈和私域，像真的在给熟客安利。',
    enCta: 'This tone works well for private traffic and social posts because it feels personal.',
    visual: ({ name }) => `可以拍门头或店内一角，让 ${name} 的真实感出现。`,
  },
  {
    id: 'value-breakdown',
    zhLabel: '价值拆解',
    enLabel: 'Value breakdown',
    zhLead: ({ price, sellingPoints }) => `把价格和价值放在一起讲：${price} 对应的是 ${sellingPoints.join('、')}。`,
    enLead: ({ price, sellingPoints }) => `Put price and value together: ${price} covers ${sellingPoints.join(', ')}.`,
    zhCta: '顾客不是只怕贵，而是怕不知道钱花在哪里。',
    enCta: 'People do not only fear price; they fear not knowing what the money is for.',
    visual: ({ price }) => `图片角落清楚标出参考价 ${price}，不要遮住主体。`,
  },
  {
    id: 'photo-ready',
    zhLabel: '出片打卡',
    enLabel: 'Photo-ready',
    zhLead: ({ offerName }) => `把「${offerName}」当成可拍、可晒、可分享的内容来写，适合小红书和朋友圈。`,
    enLead: ({ offerName }) => `Frame "${offerName}" as something photogenic and shareable for social posts.`,
    zhCta: '图片好看时，文案要帮顾客找到发出来的理由。',
    enCta: 'When the visual is strong, the copy should give people a reason to share it.',
    visual: ({ offerName }) => `拍 ${offerName} 的竖版图，留出上方标题和下方价格区域。`,
  },
  {
    id: 'friend-gathering',
    zhLabel: '朋友小聚',
    enLabel: 'Friend gathering',
    zhLead: ({ offerName }) => `把「${offerName}」放进朋友小聚语境里，不只卖单品，也卖一个见面的理由。`,
    enLead: ({ offerName }) => `Place "${offerName}" in a friend-gathering context; sell the reason to meet, not only the product.`,
    zhCta: '适合引导“转发给今晚一起去的人”。',
    enCta: 'Invite people to forward it to the person they want to go with.',
    visual: () => '拍双人/多人使用或分享的画面，避免只有孤零零的产品。',
  },
  {
    id: 'quick-decision',
    zhLabel: '三秒决策',
    enLabel: 'Three-second decision',
    zhLead: ({ offerName, discount }) => `用三秒能看懂的结构：是什么、多少钱、有什么福利。今天主推 ${offerName}，福利是 ${discount}。`,
    enLead: ({ offerName, discount }) => `Use a three-second structure: what it is, what it costs, and what the perk is. Today: ${offerName}, perk: ${discount}.`,
    zhCta: '越简单，越适合短视频封面和社群转发。',
    enCta: 'The simpler it is, the better it works for video covers and group chats.',
    visual: ({ offerName, price }) => `封面只放三件事：${offerName}、${price}、到店行动。`,
  },
  {
    id: 'before-after',
    zhLabel: '前后对比',
    enLabel: 'Before and after',
    zhLead: ({ offerName }) => `用“来之前/体验后”的对比写「${offerName}」，能让顾客更快想象结果。`,
    enLead: ({ offerName }) => `Use a before-and-after angle for "${offerName}" so customers can imagine the result faster.`,
    zhCta: '尤其适合美业、健身、宠物护理，也适合餐饮做开吃前后。 ',
    enCta: 'Great for beauty, fitness, pet care, and food moments before and after serving.',
    visual: () => '使用左右对比或前后两张图，文字少一点，变化明显一点。',
  },
  {
    id: 'faq-answer',
    zhLabel: '常见问题',
    enLabel: 'FAQ answer',
    zhLead: ({ offerName, sellingPoints }) => `把顾客最容易犹豫的问题先回答掉：${offerName} 适合谁？亮点是 ${sellingPoints[0] || '体验稳定'}。`,
    enLead: ({ offerName, sellingPoints }) => `Answer the hesitation first: who is ${offerName} for? The key point is ${sellingPoints[0] || 'a reliable experience'}.`,
    zhCta: '这种模板适合做点评回复、私信回复和社群说明。',
    enCta: 'This template also works for review replies, DMs, and group messages.',
    visual: ({ offerName }) => `配图可以用 ${offerName} 加一个醒目的问题式标题。`,
  },
  {
    id: 'repeat-reason',
    zhLabel: '复购理由',
    enLabel: 'Reason to return',
    zhLead: ({ offerName, heroItem }) => `不要只提醒顾客“再来”，要给一个再来的理由：${offerName} 里的 ${heroItem} 值得重复体验。`,
    enLead: ({ offerName, heroItem }) => `Do not just ask people to return; give them a reason: ${heroItem} in ${offerName} is worth repeating.`,
    zhCta: '适合发给老客，也适合做会员日或二次到店提醒。',
    enCta: 'Good for regular customers, member days, and return-visit reminders.',
    visual: ({ heroItem }) => `图片重点放在 ${heroItem}，文案强调“下次还点这个”。`,
  },
];

export const localTemplateCount = localTemplates.length;

const zh: GeneratorCopy = {
  themes: { new: '新品', deal: '优惠', proof: '口碑', scene: '场景', hot: '爆款', weekend: '节日', repeat: '复购' },
  fallbacks: {
    businessName: '你的店铺',
    city: '本地',
    avgPrice: '人均价格待定',
    signatureItems: '招牌产品',
    offerName: '主打产品',
    price: '到店咨询',
    sellingPoints: '新鲜、好看、适合分享',
    discount: '本周有到店福利',
  },
  tones: {
    接地气: { opener: '今天别纠结吃什么', action: '路过就来，别让嘴巴等太久' },
    高级感: { opener: '把日常留给一点更讲究的选择', action: '适合慢慢体验，也适合分享给懂生活的人' },
    活泼: { opener: '这波真的可以冲', action: '叫上朋友一起安排，快乐加倍' },
    专业可信: { opener: '给你一个更稳妥的选择', action: '欢迎提前预约，我们会按需给到建议' },
  },
  scenes: {
    '餐饮/夜宵店': (city) => `${city}下班后、朋友小聚、夜宵续摊`,
    美甲店: (city) => `${city}通勤约会、周末变美、拍照出片`,
    咖啡店: (city) => `${city}午休办公、朋友见面、周末放空`,
    宠物店: (city) => `${city}宠物洗护、换季护理、日常打理`,
    健身房: (city) => `${city}下班训练、新手入门、周末打卡`,
  },
  title: ({ theme, name, offerName, price, heroItem, scene }) =>
    ({
      new: `${name}本周主推：${offerName}`,
      deal: `${price} 元左右就能安排的${heroItem}`,
      proof: `老客回头点名要的${heroItem}`,
      scene: `${scene}，这一份刚好合适`,
      hot: `${name}近期高频被问的${offerName}`,
      weekend: `给这个周末准备一点${heroItem}仪式感`,
      repeat: `吃过/体验过一次，容易想再来的理由`,
    })[theme],
  body: ({ tone, name, offerName, scene, sellingPoints, price, discount }) =>
    [
      `${tone.opener}，${name}把「${offerName}」整理成了今天的推荐。`,
      `这款适合${scene}，核心卖点是：${sellingPoints.join('、')}。`,
      `参考价格：${price} 元；当前福利：${discount}。`,
      `如果你在附近，今天可以直接收藏这条，${tone.action}。`,
    ].join('\n'),
  tags: ({ city, industry, heroItem, offerName }) => [`#${city}${industry}`, `#${heroItem}`, `#${offerName}`, '#本地生活', '#今日推荐'],
  video: ({ name, offerName, firstPoint, discount, heroItem }) =>
    `镜头1：3 秒拍门头或环境，字幕「${name}今日推荐」。\n镜头2：8 秒拍${offerName}细节，突出${firstPoint || heroItem}。\n镜头3：5 秒拍顾客使用/开吃/成品效果，字幕「${discount}」。\n结尾：镜头对准产品，口播「想试这款，私信或到店报名字就行」。`,
  image: ({ hasImage, offerName, price, discount }) =>
    hasImage
      ? `用上传图片做主图，叠加「${offerName} / ${price} 元 / ${discount}」三行信息。`
      : `拍一张${offerName}近景，背景带一点店内环境，画面里保留价格和福利文字位置。`,
  reviews: ({ name, offerName, discount }) => ({
    positive: `谢谢喜欢 ${name}！看到你满意我们很开心，下次来可以继续试试「${offerName}」，到店也可以问问当天福利。`,
    negative: `很抱歉这次体验没有达到预期。方便的话请私信我们到店时间和具体问题，我们会尽快核实并给你一个处理方案。`,
    slowService: `抱歉让你久等了。高峰期出餐/服务节奏确实可能受影响，我们会继续优化排队和提醒流程，也欢迎你提前预约或错峰到店。`,
    priceConcern: `谢谢反馈。我们的价格会尽量对应原料、服务和现场体验，也会持续保留更划算的组合选择。本周福利是：${discount}。`,
    refund: `收到你的诉求了。请把订单信息或到店凭证私信给我们，我们核实后会按实际情况处理退款、补偿或重新服务。`,
  }),
  exportLabels: {
    packTitle: '一周内容包',
    industry: '行业',
    city: '城市',
    signature: '主打',
    offer: '活动',
    calendar: '7 天发布日历',
    title: '标题',
    body: '正文',
    tags: '标签',
    video: '短视频脚本',
    image: '配图建议',
    reviews: '点评回复模板',
    positive: '好评感谢',
    negative: '差评安抚',
    slowService: '服务慢解释',
    priceConcern: '价格质疑',
    refund: '退款沟通',
    suggested: '建议',
  },
};

const copies: Record<LocaleCode, GeneratorCopy> = {
  'zh-CN': zh,
  en: {
    ...zh,
    themes: { new: 'New', deal: 'Deal', proof: 'Social proof', scene: 'Scene', hot: 'Bestseller', weekend: 'Weekend', repeat: 'Comeback' },
    fallbacks: { businessName: 'Your business', city: 'local area', avgPrice: 'price TBD', signatureItems: 'signature item', offerName: 'featured offer', price: 'ask in store', sellingPoints: 'fresh, photogenic, easy to share', discount: 'this week has an in-store perk' },
    tones: {
      接地气: { opener: 'No need to overthink today', action: 'drop by and let the craving decide' },
      高级感: { opener: 'Give your everyday routine a more considered choice', action: 'perfect for a slower moment or a tasteful share' },
      活泼: { opener: 'This one is worth a quick yes', action: 'bring a friend and make it more fun' },
      专业可信: { opener: 'Here is a reliable choice for today', action: 'book ahead and we will guide you properly' },
    },
    scenes: {
      '餐饮/夜宵店': (city) => `after work in ${city}, casual meetups, late-night cravings`,
      美甲店: (city) => `commuting, dates, and photo-ready weekends in ${city}`,
      咖啡店: (city) => `lunch breaks, remote work, and weekend pauses in ${city}`,
      宠物店: (city) => `pet grooming, seasonal care, and routine maintenance in ${city}`,
      健身房: (city) => `after-work training, beginner sessions, and weekend check-ins in ${city}`,
    },
    title: ({ theme, name, offerName, price, heroItem, scene }) =>
      ({ new: `${name}'s pick this week: ${offerName}`, deal: `${heroItem} around ${price}`, proof: `The ${heroItem} regulars keep coming back for`, scene: `${scene}: this fits right in`, hot: `${offerName} is what people keep asking about`, weekend: `Add a little ${heroItem} ritual to the weekend`, repeat: `Why one visit can turn into a habit` })[theme],
    body: ({ tone, name, offerName, scene, sellingPoints, price, discount }) => `${tone.opener}. ${name} is featuring "${offerName}" today.\nIt fits ${scene}. Key reasons: ${sellingPoints.join(', ')}.\nReference price: ${price}; current perk: ${discount}.\nIf you are nearby, save this post and ${tone.action}.`,
    tags: ({ city, heroItem, offerName }) => [`#${city}`, `#${heroItem}`, `#${offerName}`, '#LocalBusiness', '#TodayPick'],
    video: ({ name, offerName, firstPoint, discount, heroItem }) => `Shot 1: show the storefront or space for 3 seconds with "${name} pick".\nShot 2: show details of ${offerName}, highlighting ${firstPoint || heroItem}.\nShot 3: show the result or customer moment with "${discount}".\nClose: point at the offer and say, "Message us or visit today to try it."`,
    image: ({ hasImage, offerName, price, discount }) => hasImage ? `Use the uploaded image as the hero visual and add: ${offerName} / ${price} / ${discount}.` : `Shoot a close-up of ${offerName} with a bit of the store environment and space for price and perk text.`,
    reviews: ({ name, offerName, discount }) => ({
      positive: `Thanks for supporting ${name}! We are glad you enjoyed it. Next time, try "${offerName}" and ask about the current perk.`,
      negative: `Sorry this visit did not meet expectations. Please message us with the visit time and details so we can check and offer a fair solution.`,
      slowService: `Sorry for the wait. Peak hours can slow us down, and we are improving the flow. Booking ahead or visiting off-peak can help.`,
      priceConcern: `Thanks for the feedback. Our pricing reflects ingredients, service, and experience, and we keep value options available. This week's perk: ${discount}.`,
      refund: `We understand. Please send your order or visit proof privately, and we will review it for a refund, compensation, or redo where appropriate.`,
    }),
    exportLabels: { packTitle: 'weekly content pack', industry: 'Industry', city: 'City', signature: 'Signature', offer: 'Offer', calendar: '7-day content calendar', title: 'Title', body: 'Body', tags: 'Tags', video: 'Video script', image: 'Image suggestion', reviews: 'Review reply templates', positive: 'Positive review', negative: 'Negative review', slowService: 'Slow service', priceConcern: 'Price concern', refund: 'Refund request', suggested: 'Suggested' },
  },
  ja: makeSimpleCopy('ja'),
  ko: makeSimpleCopy('ko'),
  es: makeSimpleCopy('es'),
  fr: makeSimpleCopy('fr'),
  de: makeSimpleCopy('de'),
  pt: makeSimpleCopy('pt'),
  ar: makeSimpleCopy('ar'),
};

function makeSimpleCopy(locale: Exclude<LocaleCode, 'zh-CN' | 'en'>): GeneratorCopy {
  const data = {
    ja: ['新商品', 'お得情報', '口コミ', 'シーン', '人気商品', '週末', 'リピート', '今日のおすすめ', 'おすすめポイント', '現在の特典'],
    ko: ['신상품', '혜택', '후기', '상황', '인기상품', '주말', '재방문', '오늘의 추천', '핵심 포인트', '현재 혜택'],
    es: ['Nuevo', 'Oferta', 'Prueba social', 'Escena', 'Popular', 'Fin de semana', 'Repetición', 'Recomendación de hoy', 'Puntos clave', 'Promoción actual'],
    fr: ['Nouveauté', 'Offre', 'Preuve sociale', 'Moment', 'Populaire', 'Week-end', 'Retour', 'Suggestion du jour', 'Points clés', 'Offre actuelle'],
    de: ['Neu', 'Angebot', 'Empfehlung', 'Situation', 'Bestseller', 'Wochenende', 'Wiederkehr', 'Empfehlung des Tages', 'Kernpunkte', 'Aktuelle Aktion'],
    pt: ['Novidade', 'Oferta', 'Prova social', 'Momento', 'Mais pedido', 'Fim de semana', 'Retorno', 'Recomendação de hoje', 'Pontos principais', 'Promoção atual'],
    ar: ['جديد', 'عرض', 'دليل اجتماعي', 'مناسبة', 'الأكثر طلبا', 'نهاية الأسبوع', 'عودة', 'اقتراح اليوم', 'النقاط الرئيسية', 'العرض الحالي'],
  }[locale];
  const phrase = {
    ja: { pick: '今日のおすすめ', points: 'おすすめポイント', perk: '現在の特典', scene: '利用シーン', cta: '気になる方は保存して、来店時にスタッフへお声がけください。', shot: 'カット', close: '最後に商品を映して来店を促します。', image: '価格と特典を入れる余白を残して撮影します。', thanks: '温かいレビューありがとうございます。', sorry: 'ご期待に添えず申し訳ありません。詳細をお送りください。', slow: 'お待たせして申し訳ありません。提供フローを改善します。', price: '価格へのご意見ありがとうございます。', refund: '注文情報をお送りいただければ確認します。' },
    ko: { pick: '오늘의 추천', points: '핵심 포인트', perk: '현재 혜택', scene: '추천 상황', cta: '가까이 있다면 저장해 두고 방문 시 보여 주세요.', shot: '컷', close: '마지막에는 상품을 보여 주며 방문을 유도합니다.', image: '가격과 혜택 문구가 들어갈 여백을 남겨 촬영하세요.', thanks: '좋은 리뷰 감사합니다.', sorry: '기대에 미치지 못해 죄송합니다. 자세한 내용을 보내 주세요.', slow: '기다리게 해서 죄송합니다. 서비스 흐름을 개선하겠습니다.', price: '가격 의견 감사합니다.', refund: '주문 정보를 보내 주시면 확인하겠습니다.' },
    es: { pick: 'Recomendación de hoy', points: 'Puntos clave', perk: 'Promoción actual', scene: 'Momento ideal', cta: 'Si estás cerca, guarda este post y visítanos.', shot: 'Toma', close: 'Cierra mostrando el producto e invita a visitar o escribir.', image: 'Deja espacio para texto de precio y promoción.', thanks: 'Gracias por tu reseña positiva.', sorry: 'Sentimos que la experiencia no haya sido ideal. Escríbenos con los detalles.', slow: 'Perdón por la espera. Estamos mejorando el flujo de atención.', price: 'Gracias por comentar sobre el precio.', refund: 'Envíanos los datos del pedido para revisarlo.' },
    fr: { pick: 'Suggestion du jour', points: 'Points clés', perk: 'Offre actuelle', scene: 'Moment idéal', cta: 'Si vous êtes à proximité, enregistrez ce post et passez nous voir.', shot: 'Plan', close: 'Terminer sur le produit avec un appel à venir ou écrire.', image: 'Prévoir de la place pour le prix et l’offre.', thanks: 'Merci pour votre avis positif.', sorry: 'Désolé que l’expérience n’ait pas été à la hauteur. Envoyez-nous les détails.', slow: 'Désolé pour l’attente. Nous améliorons le service.', price: 'Merci pour votre retour sur le prix.', refund: 'Envoyez les informations de commande pour vérification.' },
    de: { pick: 'Empfehlung des Tages', points: 'Kernpunkte', perk: 'Aktuelle Aktion', scene: 'Passende Situation', cta: 'Wenn du in der Nähe bist, speichere den Post und komm vorbei.', shot: 'Szene', close: 'Zum Schluss das Produkt zeigen und zum Besuch einladen.', image: 'Platz für Preis und Aktionshinweis lassen.', thanks: 'Danke für die positive Bewertung.', sorry: 'Tut uns leid, dass die Erfahrung nicht ideal war. Bitte sende Details.', slow: 'Entschuldigung für die Wartezeit. Wir verbessern den Ablauf.', price: 'Danke für dein Feedback zum Preis.', refund: 'Bitte sende Bestellinfos, damit wir es prüfen können.' },
    pt: { pick: 'Recomendação de hoje', points: 'Pontos principais', perk: 'Promoção atual', scene: 'Momento ideal', cta: 'Se estiver por perto, salve este post e venha nos visitar.', shot: 'Cena', close: 'Finalize mostrando o produto e chamando para visitar ou enviar mensagem.', image: 'Deixe espaço para preço e promoção.', thanks: 'Obrigado pela avaliação positiva.', sorry: 'Sentimos que a experiência não foi ideal. Envie os detalhes.', slow: 'Desculpe pela espera. Estamos melhorando o atendimento.', price: 'Obrigado pelo feedback sobre preço.', refund: 'Envie os dados do pedido para avaliarmos.' },
    ar: { pick: 'اقتراح اليوم', points: 'النقاط الرئيسية', perk: 'العرض الحالي', scene: 'المناسبة المناسبة', cta: 'إذا كنت قريبا، احفظ المنشور وزرنا.', shot: 'لقطة', close: 'اختم بإظهار المنتج والدعوة للزيارة أو المراسلة.', image: 'اترك مساحة لكتابة السعر والعرض.', thanks: 'شكرا على التقييم الإيجابي.', sorry: 'نأسف لأن التجربة لم تكن مثالية. أرسل لنا التفاصيل.', slow: 'نعتذر عن الانتظار ونعمل على تحسين الخدمة.', price: 'شكرا لملاحظتك حول السعر.', refund: 'أرسل بيانات الطلب لنراجع طلب الاسترداد.' },
  }[locale];

  return {
    ...zh,
    themes: { new: data[0], deal: data[1], proof: data[2], scene: data[3], hot: data[4], weekend: data[5], repeat: data[6] },
    title: ({ name, offerName, theme }) => `${phrase.pick}｜${name}｜${offerName}｜${theme}`,
    body: ({ name, offerName, scene, sellingPoints, price, discount }) => `${name}: ${offerName}\n${phrase.points}: ${sellingPoints.join(', ')}\n${phrase.scene}: ${scene}\n${price} / ${phrase.perk}: ${discount}\n${phrase.cta}`,
    tags: ({ city, heroItem, offerName }) => [`#${city}`, `#${heroItem}`, `#${offerName}`, '#LocalBusiness'],
    video: ({ name, offerName, firstPoint, discount }) => `${phrase.shot} 1: ${name}\n${phrase.shot} 2: ${offerName}: ${firstPoint}\n${phrase.shot} 3: ${discount}\n${phrase.close}`,
    image: ({ hasImage, offerName, price, discount }) => hasImage ? `${offerName} / ${price} / ${discount}` : `${offerName}: ${phrase.image}`,
    reviews: ({ name, offerName, discount }) => ({
      positive: `${name}: ${phrase.thanks} ${offerName}.`,
      negative: `${name}: ${phrase.sorry}`,
      slowService: phrase.slow,
      priceConcern: `${phrase.price} ${phrase.perk}: ${discount}.`,
      refund: phrase.refund,
    }),
    exportLabels: locale === 'ja'
      ? { ...zh.exportLabels, packTitle: '週間コンテンツパック', calendar: '7日間投稿カレンダー', reviews: 'レビュー返信テンプレート' }
      : locale === 'ko'
        ? { ...zh.exportLabels, packTitle: '주간 콘텐츠 패키지', calendar: '7일 게시 캘린더', reviews: '리뷰 답변 템플릿' }
        : locale === 'ar'
          ? { ...zh.exportLabels, packTitle: 'حزمة محتوى أسبوعية', calendar: 'تقويم محتوى 7 أيام', reviews: 'قوالب الرد على التقييمات' }
          : { packTitle: 'weekly content pack', industry: 'Industry', city: 'City', signature: 'Signature', offer: 'Offer', calendar: '7-day content calendar', title: 'Title', body: 'Body', tags: 'Tags', video: 'Video script', image: 'Image suggestion', reviews: 'Review reply templates', positive: 'Positive review', negative: 'Negative review', slowService: 'Slow service', priceConcern: 'Price concern', refund: 'Refund request', suggested: 'Suggested' },
  };
}

function getCopy(locale: LocaleCode) {
  return copies[locale] ?? copies['zh-CN'];
}

function clean(value: string, fallback: string) {
  return value.trim() || fallback;
}

function splitItems(value: string, fallback: string) {
  return clean(value, fallback)
    .split(/[,，、]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function getWeeklyTemplateSeed(now: Date) {
  const date = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return date.getUTCFullYear() * 53 + week;
}

function getLocalTemplate(index: number, weekSeed: number) {
  return localTemplates[(weekSeed + index) % localTemplates.length];
}

function isChineseLocale(locale: LocaleCode) {
  return locale === 'zh-CN';
}

function applyLocalTemplate(
  template: LocalTemplate,
  locale: LocaleCode,
  base: Pick<GeneratedDay, 'title' | 'postBody' | 'videoScript' | 'imageSuggestion'>,
  args: TemplateArgs,
) {
  const label = isChineseLocale(locale) ? template.zhLabel : template.enLabel;
  const lead = isChineseLocale(locale) ? template.zhLead(args) : template.enLead(args);
  const cta = isChineseLocale(locale) ? template.zhCta : template.enCta;

  return {
    title: `${label}｜${base.title}`,
    postBody: [lead, base.postBody, cta].join('\n\n'),
    videoScript: `${label}\n${base.videoScript}`,
    imageSuggestion: `${base.imageSuggestion}\n${template.visual(args)}`,
  };
}

function buildDay(profile: BusinessProfile, offer: Offer, index: number, locale: LocaleCode, weekSeed: number): GeneratedDay {
  const copy = getCopy(locale);
  const fallback = copy.fallbacks;
  const themeKey = themeOrder[index];
  const theme = copy.themes[themeKey];
  const items = splitItems(profile.signatureItems, fallback.signatureItems);
  const heroItem = items[index % items.length];
  const tone = copy.tones[profile.tone] ?? copy.tones['接地气'];
  const name = clean(profile.name, fallback.businessName);
  const city = clean(profile.city, fallback.city);
  const offerName = clean(offer.name, fallback.offerName);
  const price = clean(offer.price, fallback.price);
  const discount = clean(offer.discount, fallback.discount);
  const sellingPoints = splitItems(offer.sellingPoints, fallback.sellingPoints).slice(0, 4);
  const scene = (copy.scenes[profile.industry] ?? copy.scenes['餐饮/夜宵店'])(city);
  const template = getLocalTemplate(index, weekSeed);
  const templateArgs = { name, offerName, price, discount, heroItem, scene, sellingPoints };
  const base = {
    title: copy.title({ theme: themeKey, name, offerName, price, heroItem, scene }),
    postBody: copy.body({ tone, name, offerName, scene, sellingPoints, price, discount }),
    videoScript: copy.video({ name, offerName, firstPoint: sellingPoints[0] ?? heroItem, discount, heroItem }),
    imageSuggestion: copy.image({ hasImage: Boolean(offer.imagePreviewUrl), offerName, price, discount }),
  };
  const templated = applyLocalTemplate(template, locale, base, templateArgs);

  return {
    day: `Day ${index + 1}`,
    theme,
    title: templated.title,
    postBody: templated.postBody,
    hashtags: copy.tags({ city, industry: profile.industry, heroItem, offerName }),
    publishTime: publishTimes[index],
    videoScript: templated.videoScript,
    imageSuggestion: templated.imageSuggestion,
  };
}

export function generateContentPack(profileInput: BusinessProfile, offerInput: Offer, locale: LocaleCode = 'zh-CN', options: { now?: Date } = {}): GeneratedPack {
  const fallback = getCopy(locale).fallbacks;
  const profile: BusinessProfile = {
    ...profileInput,
    name: clean(profileInput.name, fallback.businessName),
    city: clean(profileInput.city, fallback.city),
    avgPrice: clean(profileInput.avgPrice, fallback.avgPrice),
    signatureItems: clean(profileInput.signatureItems, fallback.signatureItems),
  };

  const offer: Offer = {
    ...offerInput,
    name: clean(offerInput.name, fallback.offerName),
    price: clean(offerInput.price, fallback.price),
    sellingPoints: clean(offerInput.sellingPoints, fallback.sellingPoints),
    discount: clean(offerInput.discount, fallback.discount),
  };
  const weekSeed = getWeeklyTemplateSeed(options.now ?? new Date());

  return {
    calendar: themeOrder.map((_, index) => buildDay(profile, offer, index, locale, weekSeed)),
    reviewReplies: buildReviewReplies(profile, offer, locale),
  };
}

export function buildReviewReplies(profile: BusinessProfile, offer: Offer, locale: LocaleCode = 'zh-CN'): ReviewReplies {
  const copy = getCopy(locale);
  const name = clean(profile.name, copy.fallbacks.businessName);
  const offerName = clean(offer.name, copy.fallbacks.offerName);
  const discount = clean(offer.discount, copy.fallbacks.discount);
  return copy.reviews({ name, offerName, discount });
}

export function serializeTextPack(profile: BusinessProfile, offer: Offer, pack: GeneratedPack, locale: LocaleCode = 'zh-CN') {
  const copy = getCopy(locale);
  const labels = copy.exportLabels;
  const fallback = copy.fallbacks;
  const lines = [
    `${clean(profile.name, fallback.businessName)} ${labels.packTitle}`,
    `${labels.industry}: ${profile.industry}`,
    `${labels.city}: ${clean(profile.city, fallback.city)}`,
    `${labels.signature}: ${clean(profile.signatureItems, fallback.signatureItems)}`,
    `${labels.offer}: ${clean(offer.name, fallback.offerName)} / ${clean(offer.price, fallback.price)} / ${clean(offer.discount, fallback.discount)}`,
    '',
    `=== ${labels.calendar} ===`,
    ...pack.calendar.flatMap((day) => [
      '',
      `${day.day} | ${day.theme} | ${labels.suggested} ${day.publishTime}`,
      `${labels.title}: ${day.title}`,
      `${labels.body}:\n${day.postBody}`,
      `${labels.tags}: ${day.hashtags.join(' ')}`,
      `${labels.video}:\n${day.videoScript}`,
      `${labels.image}: ${day.imageSuggestion}`,
    ]),
    '',
    `=== ${labels.reviews} ===`,
    `${labels.positive}: ${pack.reviewReplies.positive}`,
    `${labels.negative}: ${pack.reviewReplies.negative}`,
    `${labels.slowService}: ${pack.reviewReplies.slowService}`,
    `${labels.priceConcern}: ${pack.reviewReplies.priceConcern}`,
    `${labels.refund}: ${pack.reviewReplies.refund}`,
  ];

  return lines.join('\n');
}
