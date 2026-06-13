export type Industry = '餐饮/夜宵店' | '美甲店' | '咖啡店' | '宠物店' | '健身房';

export type Tone = '接地气' | '高级感' | '活泼' | '专业可信';

export type LocaleCode = 'zh-CN' | 'en' | 'ja' | 'ko' | 'es' | 'fr' | 'de' | 'pt' | 'ar';

export type BusinessProfile = {
  name: string;
  industry: Industry;
  city: string;
  tone: Tone;
  avgPrice: string;
  signatureItems: string;
};

export type Offer = {
  name: string;
  price: string;
  sellingPoints: string;
  discount: string;
  imagePreviewUrl: string;
};

export type GeneratedDay = {
  day: string;
  theme: string;
  title: string;
  postBody: string;
  hashtags: string[];
  publishTime: string;
  videoScript: string;
  imageSuggestion: string;
};

export type ReviewReplies = {
  positive: string;
  negative: string;
  slowService: string;
  priceConcern: string;
  refund: string;
};

export type GeneratedPack = {
  calendar: GeneratedDay[];
  reviewReplies: ReviewReplies;
};

export type LlmSettings = {
  endpoint: string;
  model: string;
  apiKey: string;
  extraHeaders: string;
};

export type GenerationMode = 'template' | 'llm';

export type IndustryPreset = {
  industry: Industry;
  exampleName: string;
  avgPrice: string;
  signatureItems: string;
  offer: Omit<Offer, 'imagePreviewUrl'>;
};
