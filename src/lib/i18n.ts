import type { Industry, LocaleCode, Tone } from './types';

export type Translations = {
  appName: string;
  brand: string;
  copyToday: string;
  copied: string;
  inputArea: string;
  outputArea: string;
  language: string;
  appInstallStatus: string;
  offlineReady: string;
  offlineNow: string;
  installApp: string;
  runningAsApp: string;
  business: {
    step: string;
    title: string;
    name: string;
    namePlaceholder: string;
    industry: string;
    city: string;
    cityPlaceholder: string;
    avgPrice: string;
    avgPricePlaceholder: string;
    tone: string;
    signatureItems: string;
    signaturePlaceholder: string;
    presets: string;
    presetTitle: (industry: string) => string;
  };
  offer: {
    step: string;
    title: string;
    name: string;
    namePlaceholder: string;
    price: string;
    pricePlaceholder: string;
    discount: string;
    discountPlaceholder: string;
    sellingPoints: string;
    sellingPlaceholder: string;
    upload: string;
    previewAlt: string;
  };
  llm: {
    eyebrow: string;
    title: string;
    modeLabel: string;
    template: string;
    api: string;
    provider: string;
    providerCustom: string;
    providerDeepSeek: string;
    providerMimo: string;
    setupHint: string;
    endpoint: string;
    endpointPlaceholder: string;
    model: string;
    modelPlaceholder: string;
    apiKey: string;
    extraHeaders: string;
    extraHeadersPlaceholder: string;
    advancedSettings: string;
    generating: string;
    generate: string;
    generateFailed: string;
  };
  export: {
    eyebrow: string;
    title: string;
    txt: string;
    json: string;
    reset: string;
    localOnly: string;
  };
  calendar: {
    eyebrow: string;
    title: string;
    copyDay: string;
    videoScript: string;
  };
  reviews: {
    eyebrow: string;
    title: string;
    positive: string;
    negative: string;
    slowService: string;
    priceConcern: string;
    refund: string;
  };
  industries: Record<Industry, string>;
  tones: Record<Tone, string>;
};

export const locales: Array<{ code: LocaleCode; label: string; dir?: 'rtl' }> = [
  { code: 'zh-CN', label: '中文' },
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'pt', label: 'Português' },
  { code: 'ar', label: 'العربية', dir: 'rtl' },
];

const industryZh: Record<Industry, string> = {
  '餐饮/夜宵店': '餐饮/夜宵店',
  美甲店: '美甲店',
  咖啡店: '咖啡店',
  宠物店: '宠物店',
  健身房: '健身房',
};

const toneZh: Record<Tone, string> = {
  接地气: '接地气',
  高级感: '高级感',
  活泼: '活泼',
  专业可信: '专业可信',
};

const base: Translations = {
  appName: '本地小商家内容工作台',
  brand: 'Local Growth Desk',
  copyToday: '复制今日文案',
  copied: '已复制',
  inputArea: '输入区',
  outputArea: '结果区',
  language: '语言',
  appInstallStatus: 'App 安装状态',
  offlineReady: '支持离线缓存',
  offlineNow: '当前离线，可继续使用',
  installApp: '安装 App',
  runningAsApp: '已以 App 模式运行',
  business: {
    step: 'Step 1',
    title: '店铺资料',
    name: '店铺名称',
    namePlaceholder: '例如：巷口夜宵铺',
    industry: '行业',
    city: '城市/商圈',
    cityPlaceholder: '例如：杭州湖滨',
    avgPrice: '客单价',
    avgPricePlaceholder: '例如：68',
    tone: '品牌语气',
    signatureItems: '主打产品',
    signaturePlaceholder: '例如：小龙虾、炭烤牛油、冰粉',
    presets: '行业样例',
    presetTitle: (industry) => `套用${industry}样例`,
  },
  offer: {
    step: 'Step 2',
    title: '产品和活动',
    name: '产品/服务名称',
    namePlaceholder: '例如：小龙虾双人夜宵套餐',
    price: '价格',
    pricePlaceholder: '例如：99',
    discount: '活动优惠',
    discountPlaceholder: '例如：送冰粉 2 份',
    sellingPoints: '卖点',
    sellingPlaceholder: '例如：现炒入味、适合下班聚餐、出餐快',
    upload: '上传产品图',
    previewAlt: '产品预览',
  },
  llm: {
    eyebrow: 'AI Mode',
    title: '文案生成方式',
    modeLabel: '生成方式',
    template: '模板',
    api: 'LLM API',
    provider: 'API 提供商',
    providerCustom: '自定义兼容接口',
    providerDeepSeek: 'DeepSeek',
    providerMimo: 'MiMo',
    setupHint: '填写 API 地址、模型和 Key 即可生成；需要特殊网关时再打开高级设置。',
    endpoint: 'API 地址',
    endpointPlaceholder: 'https://api.example.com/v1/chat/completions',
    model: '模型',
    modelPlaceholder: '例如：gpt-4o-mini / deepseek-chat',
    apiKey: 'API Key',
    extraHeaders: '自定义请求头 JSON',
    extraHeadersPlaceholder: '{"HTTP-Referer":"https://your-site.com","X-Title":"内容工作台"}',
    advancedSettings: '高级设置',
    generating: '生成中',
    generate: '使用 LLM 生成',
    generateFailed: 'LLM 生成失败',
  },
  export: {
    eyebrow: 'Export',
    title: '内容包导出',
    txt: '导出 TXT',
    json: '导出 JSON',
    reset: '重置样例',
    localOnly: '本地生成，无需登录',
  },
  calendar: {
    eyebrow: '7 Days',
    title: '发布日历',
    copyDay: '复制当天内容',
    videoScript: '短视频脚本',
  },
  reviews: {
    eyebrow: 'Reviews',
    title: '点评回复模板',
    positive: '好评感谢',
    negative: '差评安抚',
    slowService: '服务慢解释',
    priceConcern: '价格质疑',
    refund: '退款沟通',
  },
  industries: industryZh,
  tones: toneZh,
};

export const translations: Record<LocaleCode, Translations> = {
  'zh-CN': base,
  en: {
    ...base,
    appName: 'Local Business Content Studio',
    copyToday: "Copy today's post",
    copied: 'Copied',
    inputArea: 'Input panel',
    outputArea: 'Results panel',
    language: 'Language',
    offlineReady: 'Offline cache ready',
    offlineNow: 'Offline, still usable',
    installApp: 'Install app',
    runningAsApp: 'Running as app',
    business: {
      ...base.business,
      title: 'Business profile',
      name: 'Business name',
      namePlaceholder: 'e.g. Corner Supper Shop',
      industry: 'Industry',
      city: 'City / district',
      cityPlaceholder: 'e.g. Hangzhou Hubin',
      avgPrice: 'Average spend',
      avgPricePlaceholder: 'e.g. 68',
      tone: 'Brand tone',
      signatureItems: 'Signature items',
      signaturePlaceholder: 'e.g. crawfish, grilled skewers, dessert',
      presets: 'Industry examples',
      presetTitle: (industry) => `Use ${industry} example`,
    },
    offer: {
      ...base.offer,
      title: 'Offer',
      name: 'Product / service',
      namePlaceholder: 'e.g. Crawfish dinner set',
      price: 'Price',
      discount: 'Promotion',
      discountPlaceholder: 'e.g. free dessert for two',
      sellingPoints: 'Selling points',
      sellingPlaceholder: 'e.g. fresh, fast service, great for after work',
      upload: 'Upload product image',
      previewAlt: 'Product preview',
    },
    llm: {
      ...base.llm,
      title: 'Generation method',
      modeLabel: 'Generation method',
      template: 'Template',
      provider: 'API provider',
      providerCustom: 'Custom compatible API',
      providerDeepSeek: 'DeepSeek',
      providerMimo: 'MiMo',
      setupHint: 'Enter an endpoint, model, and key. Open advanced settings only for special gateways.',
      endpoint: 'API endpoint',
      model: 'Model',
      modelPlaceholder: 'e.g. gpt-4o-mini / deepseek-chat',
      extraHeaders: 'Custom headers JSON',
      advancedSettings: 'Advanced settings',
      generating: 'Generating',
      generate: 'Generate with LLM',
      generateFailed: 'LLM generation failed',
    },
    export: { ...base.export, title: 'Export content pack', txt: 'Export TXT', json: 'Export JSON', reset: 'Reset demo', localOnly: 'Generated locally, no login' },
    calendar: { ...base.calendar, title: 'Content calendar', copyDay: 'Copy this day', videoScript: 'Video script' },
    reviews: { ...base.reviews, title: 'Review replies', positive: 'Positive review', negative: 'Negative review', slowService: 'Slow service', priceConcern: 'Price concern', refund: 'Refund request' },
    industries: { '餐饮/夜宵店': 'Food / late-night dining', 美甲店: 'Nail salon', 咖啡店: 'Cafe', 宠物店: 'Pet shop', 健身房: 'Gym' },
    tones: { 接地气: 'Friendly', 高级感: 'Premium', 活泼: 'Playful', 专业可信: 'Professional' },
  },
  ja: {
    ...base,
    appName: 'ローカル店舗コンテンツスタジオ',
    copyToday: '今日の投稿をコピー',
    copied: 'コピー済み',
    language: '言語',
    offlineReady: 'オフライン対応',
    offlineNow: 'オフラインでも利用可能',
    installApp: 'アプリをインストール',
    runningAsApp: 'アプリとして実行中',
    business: { ...base.business, title: '店舗情報', name: '店舗名', industry: '業種', city: '都市/エリア', avgPrice: '平均単価', tone: 'ブランドトーン', signatureItems: '看板商品', presets: '業種サンプル', presetTitle: (industry) => `${industry}のサンプルを使用` },
    offer: { ...base.offer, title: '商品とキャンペーン', name: '商品/サービス名', price: '価格', discount: '特典', sellingPoints: '訴求点', upload: '商品画像をアップロード', previewAlt: '商品プレビュー' },
    llm: { ...base.llm, title: '生成方法', modeLabel: '生成方法', template: 'テンプレート', setupHint: 'APIエンドポイント、モデル、キーを入力すれば生成できます。特殊なゲートウェイだけ詳細設定を開いてください。', endpoint: 'API エンドポイント', model: 'モデル', extraHeaders: 'カスタムヘッダー JSON', advancedSettings: '詳細設定', generating: '生成中', generate: 'LLMで生成', generateFailed: 'LLM生成に失敗しました' },
    export: { ...base.export, title: 'コンテンツを書き出し', txt: 'TXTを書き出し', json: 'JSONを書き出し', reset: 'サンプルをリセット', localOnly: 'ローカル生成、ログイン不要' },
    calendar: { ...base.calendar, title: '投稿カレンダー', copyDay: 'この日の内容をコピー', videoScript: '動画台本' },
    reviews: { ...base.reviews, title: 'レビュー返信テンプレート', positive: '高評価への返信', negative: '低評価への返信', slowService: '待ち時間への返信', priceConcern: '価格への返信', refund: '返金対応' },
    industries: { '餐饮/夜宵店': '飲食/夜食店', 美甲店: 'ネイルサロン', 咖啡店: 'カフェ', 宠物店: 'ペットショップ', 健身房: 'ジム' },
    tones: { 接地气: '親しみやすい', 高级感: '上質', 活泼: '明るい', 专业可信: '信頼感' },
  },
  ko: {
    ...base,
    appName: '로컬 비즈니스 콘텐츠 스튜디오',
    copyToday: '오늘 문구 복사',
    copied: '복사됨',
    language: '언어',
    offlineReady: '오프라인 캐시 지원',
    offlineNow: '오프라인에서도 사용 가능',
    installApp: '앱 설치',
    runningAsApp: '앱 모드 실행 중',
    business: { ...base.business, title: '매장 정보', name: '매장명', industry: '업종', city: '도시/상권', avgPrice: '객단가', tone: '브랜드 톤', signatureItems: '대표 상품', presets: '업종 예시', presetTitle: (industry) => `${industry} 예시 사용` },
    offer: { ...base.offer, title: '상품과 프로모션', name: '상품/서비스명', price: '가격', discount: '프로모션', sellingPoints: '셀링 포인트', upload: '상품 이미지 업로드', previewAlt: '상품 미리보기' },
    llm: { ...base.llm, title: '생성 방식', modeLabel: '생성 방식', template: '템플릿', setupHint: 'API 주소, 모델, 키만 입력하면 생성할 수 있습니다. 특수 게이트웨이는 고급 설정을 여세요.', endpoint: 'API 주소', model: '모델', extraHeaders: '커스텀 헤더 JSON', advancedSettings: '고급 설정', generating: '생성 중', generate: 'LLM으로 생성', generateFailed: 'LLM 생성 실패' },
    export: { ...base.export, title: '콘텐츠 내보내기', txt: 'TXT 내보내기', json: 'JSON 내보내기', reset: '예시 초기화', localOnly: '로컬 생성, 로그인 불필요' },
    calendar: { ...base.calendar, title: '게시 캘린더', copyDay: '이 날짜 내용 복사', videoScript: '영상 스크립트' },
    reviews: { ...base.reviews, title: '리뷰 답변 템플릿', positive: '좋은 리뷰', negative: '나쁜 리뷰', slowService: '서비스 지연', priceConcern: '가격 문의', refund: '환불 요청' },
    industries: { '餐饮/夜宵店': '음식/야식점', 美甲店: '네일샵', 咖啡店: '카페', 宠物店: '펫샵', 健身房: '헬스장' },
    tones: { 接地气: '친근한', 高级感: '프리미엄', 活泼: '활기찬', 专业可信: '전문적인' },
  },
  es: {
    ...base,
    appName: 'Estudio de Contenido para Negocios Locales',
    copyToday: 'Copiar texto de hoy',
    copied: 'Copiado',
    language: 'Idioma',
    offlineReady: 'Caché sin conexión listo',
    offlineNow: 'Sin conexión, sigue funcionando',
    installApp: 'Instalar app',
    runningAsApp: 'Ejecutando como app',
    business: { ...base.business, title: 'Datos del negocio', name: 'Nombre del negocio', industry: 'Sector', city: 'Ciudad / zona', avgPrice: 'Ticket medio', tone: 'Tono de marca', signatureItems: 'Productos estrella', presets: 'Ejemplos por sector', presetTitle: (industry) => `Usar ejemplo de ${industry}` },
    offer: { ...base.offer, title: 'Producto y promoción', name: 'Producto / servicio', price: 'Precio', discount: 'Promoción', sellingPoints: 'Puntos de venta', upload: 'Subir imagen', previewAlt: 'Vista previa' },
    llm: { ...base.llm, title: 'Método de generación', modeLabel: 'Método', template: 'Plantilla', setupHint: 'Introduce endpoint, modelo y clave. Usa ajustes avanzados solo para gateways especiales.', endpoint: 'Endpoint API', model: 'Modelo', extraHeaders: 'Headers JSON personalizados', advancedSettings: 'Ajustes avanzados', generating: 'Generando', generate: 'Generar con LLM', generateFailed: 'Falló la generación LLM' },
    export: { ...base.export, title: 'Exportar paquete', txt: 'Exportar TXT', json: 'Exportar JSON', reset: 'Restablecer demo', localOnly: 'Generado localmente, sin login' },
    calendar: { ...base.calendar, title: 'Calendario de publicaciones', copyDay: 'Copiar este día', videoScript: 'Guion de video' },
    reviews: { ...base.reviews, title: 'Respuestas a reseñas', positive: 'Reseña positiva', negative: 'Reseña negativa', slowService: 'Servicio lento', priceConcern: 'Duda de precio', refund: 'Reembolso' },
    industries: { '餐饮/夜宵店': 'Restaurante / comida nocturna', 美甲店: 'Salón de uñas', 咖啡店: 'Cafetería', 宠物店: 'Tienda de mascotas', 健身房: 'Gimnasio' },
    tones: { 接地气: 'Cercano', 高级感: 'Premium', 活泼: 'Dinámico', 专业可信: 'Profesional' },
  },
  fr: {
    ...base,
    appName: 'Studio de Contenu pour Commerce Local',
    copyToday: 'Copier le texte du jour',
    copied: 'Copié',
    language: 'Langue',
    offlineReady: 'Cache hors ligne prêt',
    offlineNow: 'Hors ligne, encore utilisable',
    installApp: "Installer l'app",
    runningAsApp: 'Ouvert comme app',
    business: { ...base.business, title: 'Profil du commerce', name: 'Nom du commerce', industry: 'Secteur', city: 'Ville / quartier', avgPrice: 'Panier moyen', tone: 'Ton de marque', signatureItems: 'Produits phares', presets: 'Exemples sectoriels', presetTitle: (industry) => `Utiliser l'exemple ${industry}` },
    offer: { ...base.offer, title: 'Produit et offre', name: 'Produit / service', price: 'Prix', discount: 'Offre', sellingPoints: 'Arguments', upload: 'Ajouter une image', previewAlt: 'Aperçu produit' },
    llm: { ...base.llm, title: 'Méthode de génération', modeLabel: 'Méthode', template: 'Modèle', setupHint: 'Renseignez endpoint, modèle et clé. Ouvrez les réglages avancés seulement pour les passerelles spéciales.', endpoint: 'Endpoint API', model: 'Modèle', extraHeaders: 'Headers JSON personnalisés', advancedSettings: 'Réglages avancés', generating: 'Génération', generate: 'Générer avec LLM', generateFailed: 'Échec de génération LLM' },
    export: { ...base.export, title: 'Exporter le pack', txt: 'Exporter TXT', json: 'Exporter JSON', reset: 'Réinitialiser', localOnly: 'Généré localement, sans connexion' },
    calendar: { ...base.calendar, title: 'Calendrier de publication', copyDay: 'Copier ce jour', videoScript: 'Script vidéo' },
    reviews: { ...base.reviews, title: 'Réponses aux avis', positive: 'Avis positif', negative: 'Avis négatif', slowService: 'Service lent', priceConcern: 'Question prix', refund: 'Remboursement' },
    industries: { '餐饮/夜宵店': 'Restaurant / nocturne', 美甲店: 'Salon de manucure', 咖啡店: 'Café', 宠物店: 'Animalerie', 健身房: 'Salle de sport' },
    tones: { 接地气: 'Accessible', 高级感: 'Premium', 活泼: 'Dynamique', 专业可信: 'Professionnel' },
  },
  de: {
    ...base,
    appName: 'Content Studio für lokale Unternehmen',
    copyToday: 'Heutigen Text kopieren',
    copied: 'Kopiert',
    language: 'Sprache',
    offlineReady: 'Offline-Cache bereit',
    offlineNow: 'Offline, weiter nutzbar',
    installApp: 'App installieren',
    runningAsApp: 'Läuft als App',
    business: { ...base.business, title: 'Geschäftsprofil', name: 'Name', industry: 'Branche', city: 'Stadt / Viertel', avgPrice: 'Durchschnittspreis', tone: 'Markenton', signatureItems: 'Top-Produkte', presets: 'Branchenbeispiele', presetTitle: (industry) => `${industry}-Beispiel nutzen` },
    offer: { ...base.offer, title: 'Produkt und Aktion', name: 'Produkt / Service', price: 'Preis', discount: 'Aktion', sellingPoints: 'Verkaufsargumente', upload: 'Produktbild hochladen', previewAlt: 'Produktvorschau' },
    llm: { ...base.llm, title: 'Generierungsmethode', modeLabel: 'Methode', template: 'Vorlage', setupHint: 'Endpunkt, Modell und Schlüssel reichen aus. Erweiterte Einstellungen nur für besondere Gateways öffnen.', endpoint: 'API-Endpunkt', model: 'Modell', extraHeaders: 'Eigene Header JSON', advancedSettings: 'Erweiterte Einstellungen', generating: 'Generiert', generate: 'Mit LLM generieren', generateFailed: 'LLM-Generierung fehlgeschlagen' },
    export: { ...base.export, title: 'Content-Paket exportieren', txt: 'TXT exportieren', json: 'JSON exportieren', reset: 'Demo zurücksetzen', localOnly: 'Lokal generiert, kein Login' },
    calendar: { ...base.calendar, title: 'Posting-Kalender', copyDay: 'Diesen Tag kopieren', videoScript: 'Videoskript' },
    reviews: { ...base.reviews, title: 'Antworten auf Bewertungen', positive: 'Positive Bewertung', negative: 'Negative Bewertung', slowService: 'Langsamer Service', priceConcern: 'Preisfrage', refund: 'Rückerstattung' },
    industries: { '餐饮/夜宵店': 'Restaurant / Late Night', 美甲店: 'Nagelstudio', 咖啡店: 'Café', 宠物店: 'Zoohandlung', 健身房: 'Fitnessstudio' },
    tones: { 接地气: 'Nahbar', 高级感: 'Premium', 活泼: 'Lebendig', 专业可信: 'Professionell' },
  },
  pt: {
    ...base,
    appName: 'Estúdio de Conteúdo para Negócios Locais',
    copyToday: 'Copiar post de hoje',
    copied: 'Copiado',
    language: 'Idioma',
    offlineReady: 'Cache offline pronto',
    offlineNow: 'Offline, ainda utilizável',
    installApp: 'Instalar app',
    runningAsApp: 'Rodando como app',
    business: { ...base.business, title: 'Perfil do negócio', name: 'Nome do negócio', industry: 'Setor', city: 'Cidade / bairro', avgPrice: 'Ticket médio', tone: 'Tom da marca', signatureItems: 'Produtos principais', presets: 'Exemplos por setor', presetTitle: (industry) => `Usar exemplo de ${industry}` },
    offer: { ...base.offer, title: 'Produto e promoção', name: 'Produto / serviço', price: 'Preço', discount: 'Promoção', sellingPoints: 'Diferenciais', upload: 'Enviar imagem', previewAlt: 'Prévia do produto' },
    llm: { ...base.llm, title: 'Método de geração', modeLabel: 'Método', template: 'Modelo', setupHint: 'Preencha endpoint, modelo e chave. Abra opções avançadas só para gateways especiais.', endpoint: 'Endpoint da API', model: 'Modelo', extraHeaders: 'Headers JSON personalizados', advancedSettings: 'Opções avançadas', generating: 'Gerando', generate: 'Gerar com LLM', generateFailed: 'Falha na geração LLM' },
    export: { ...base.export, title: 'Exportar pacote', txt: 'Exportar TXT', json: 'Exportar JSON', reset: 'Resetar demo', localOnly: 'Gerado localmente, sem login' },
    calendar: { ...base.calendar, title: 'Calendário de posts', copyDay: 'Copiar este dia', videoScript: 'Roteiro de vídeo' },
    reviews: { ...base.reviews, title: 'Respostas a avaliações', positive: 'Avaliação positiva', negative: 'Avaliação negativa', slowService: 'Serviço lento', priceConcern: 'Dúvida de preço', refund: 'Reembolso' },
    industries: { '餐饮/夜宵店': 'Restaurante / noite', 美甲店: 'Salão de unhas', 咖啡店: 'Cafeteria', 宠物店: 'Pet shop', 健身房: 'Academia' },
    tones: { 接地气: 'Próximo', 高级感: 'Premium', 活泼: 'Animado', 专业可信: 'Profissional' },
  },
  ar: {
    ...base,
    appName: 'استوديو محتوى للأعمال المحلية',
    copyToday: 'نسخ منشور اليوم',
    copied: 'تم النسخ',
    inputArea: 'منطقة الإدخال',
    outputArea: 'منطقة النتائج',
    language: 'اللغة',
    offlineReady: 'يدعم التخزين دون اتصال',
    offlineNow: 'غير متصل ويمكن المتابعة',
    installApp: 'تثبيت التطبيق',
    runningAsApp: 'يعمل كتطبيق',
    business: { ...base.business, title: 'بيانات المتجر', name: 'اسم المتجر', industry: 'النشاط', city: 'المدينة / الحي', avgPrice: 'متوسط السعر', tone: 'نبرة العلامة', signatureItems: 'المنتجات الرئيسية', presets: 'أمثلة الأنشطة', presetTitle: (industry) => `استخدم مثال ${industry}` },
    offer: { ...base.offer, title: 'المنتج والعرض', name: 'اسم المنتج / الخدمة', price: 'السعر', discount: 'العرض', sellingPoints: 'نقاط البيع', upload: 'رفع صورة المنتج', previewAlt: 'معاينة المنتج' },
    llm: { ...base.llm, title: 'طريقة التوليد', modeLabel: 'طريقة التوليد', template: 'قالب', setupHint: 'أدخل رابط API والنموذج والمفتاح. افتح الإعدادات المتقدمة فقط للبوابات الخاصة.', endpoint: 'رابط API', model: 'النموذج', extraHeaders: 'رؤوس مخصصة JSON', advancedSettings: 'إعدادات متقدمة', generating: 'جار التوليد', generate: 'توليد عبر LLM', generateFailed: 'فشل توليد LLM' },
    export: { ...base.export, title: 'تصدير حزمة المحتوى', txt: 'تصدير TXT', json: 'تصدير JSON', reset: 'إعادة ضبط المثال', localOnly: 'توليد محلي دون تسجيل' },
    calendar: { ...base.calendar, title: 'تقويم النشر', copyDay: 'نسخ محتوى اليوم', videoScript: 'سيناريو الفيديو' },
    reviews: { ...base.reviews, title: 'قوالب الرد على التقييمات', positive: 'تقييم إيجابي', negative: 'تقييم سلبي', slowService: 'خدمة بطيئة', priceConcern: 'اعتراض على السعر', refund: 'طلب استرداد' },
    industries: { '餐饮/夜宵店': 'مطعم / وجبات ليلية', 美甲店: 'صالون أظافر', 咖啡店: 'مقهى', 宠物店: 'متجر حيوانات', 健身房: 'نادي رياضي' },
    tones: { 接地气: 'ودود', 高级感: 'فاخر', 活泼: 'حيوي', 专业可信: 'مهني' },
  },
};

export function getTranslations(locale: LocaleCode) {
  return translations[locale] ?? translations['zh-CN'];
}

export function getLocaleMeta(locale: LocaleCode) {
  return locales.find((entry) => entry.code === locale) ?? locales[0];
}
