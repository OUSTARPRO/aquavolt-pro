export type PackageKey =
  | "starter"
  | "pro"
  | "ecommerce"
  | "premium"
  | "webapp";

export interface Feature {
  label: string;
  labelAr: string;
  included: boolean;
}

export interface Package {
  key: PackageKey;
  name: string;
  nameAr: string;
  tagline: string;
  taglineAr: string;
  price: number;
  promoPrice?: number;
  promoLabel?: string;
  promoLabelAr?: string;
  deliveryDays: number;
  color: string;
  gradient: string;
  badge?: string;
  badgeAr?: string;
  popular?: boolean;
  features: Feature[];
  pages: string;
  pagesAr: string;
}

export interface AddOn {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  unit: string;
  unitAr: string;
  icon: string;
}

export interface Promo {
  id: string;
  code: string;
  label: string;
  labelAr: string;
  description: string;
  descriptionAr: string;
  discount: number;
  type: "percent" | "fixed";
  expiresAt: string;
  color: string;
}

export const packages: Package[] = [
  {
    key: "starter",
    name: "Site Vitrine Starter",
    nameAr: "موقع عرض مبتدئ",
    tagline: "Idéal pour débuter votre présence en ligne",
    taglineAr: "مثالي لبدء تواجدك على الإنترنت",
    price: 1990,
    promoPrice: 1592,
    promoLabel: "-20% Promo Été",
    promoLabelAr: "-20% عرض الصيف",
    deliveryDays: 7,
    pages: "Jusqu'à 5 pages",
    pagesAr: "حتى 5 صفحات",
    color: "sky",
    gradient: "from-sky-500 to-blue-600",
    features: [
      { label: "Design responsive (mobile/tablette/PC)", labelAr: "تصميم متجاوب (موبايل/تابلت/PC)", included: true },
      { label: "Jusqu'à 5 pages", labelAr: "حتى 5 صفحات", included: true },
      { label: "Formulaire de contact", labelAr: "نموذج الاتصال", included: true },
      { label: "Intégration WhatsApp", labelAr: "تكامل واتساب", included: true },
      { label: "Hébergement 1 an inclus", labelAr: "استضافة سنة كاملة مشمولة", included: true },
      { label: "Nom de domaine (.ma ou .com)", labelAr: "اسم النطاق (.ma أو .com)", included: true },
      { label: "SEO de base (Google)", labelAr: "SEO أساسي (Google)", included: true },
      { label: "Certificat SSL (HTTPS)", labelAr: "شهادة SSL (HTTPS)", included: true },
      { label: "Blog intégré", labelAr: "مدونة مدمجة", included: false },
      { label: "Galerie photos avancée", labelAr: "معرض صور متقدم", included: false },
      { label: "Espace client / Admin", labelAr: "منطقة العميل / الإدارة", included: false },
      { label: "Paiement en ligne", labelAr: "الدفع عبر الإنترنت", included: false },
      { label: "Multilingue (FR / AR / EN)", labelAr: "متعدد اللغات (FR/AR/EN)", included: false },
      { label: "Support prioritaire 1 an", labelAr: "دعم أولوية سنة", included: false },
    ],
  },
  {
    key: "pro",
    name: "Site Vitrine Pro",
    nameAr: "موقع عرض احترافي",
    tagline: "Pour une image professionnelle complète",
    taglineAr: "لصورة احترافية متكاملة",
    price: 3490,
    promoPrice: 2792,
    promoLabel: "-20% Promo Été",
    promoLabelAr: "-20% عرض الصيف",
    deliveryDays: 14,
    pages: "Jusqu'à 15 pages",
    pagesAr: "حتى 15 صفحة",
    color: "emerald",
    gradient: "from-emerald-500 to-teal-600",
    badge: "Populaire",
    badgeAr: "الأكثر طلباً",
    popular: true,
    features: [
      { label: "Design responsive (mobile/tablette/PC)", labelAr: "تصميم متجاوب (موبايل/تابلت/PC)", included: true },
      { label: "Jusqu'à 15 pages", labelAr: "حتى 15 صفحة", included: true },
      { label: "Formulaire de contact avancé", labelAr: "نموذج اتصال متقدم", included: true },
      { label: "Intégration WhatsApp", labelAr: "تكامل واتساب", included: true },
      { label: "Hébergement 1 an inclus", labelAr: "استضافة سنة كاملة مشمولة", included: true },
      { label: "Nom de domaine (.ma ou .com)", labelAr: "اسم النطاق (.ma أو .com)", included: true },
      { label: "SEO avancé (Google / Bing)", labelAr: "SEO متقدم (Google / Bing)", included: true },
      { label: "Certificat SSL (HTTPS)", labelAr: "شهادة SSL (HTTPS)", included: true },
      { label: "Blog intégré", labelAr: "مدونة مدمجة", included: true },
      { label: "Galerie photos avancée", labelAr: "معرض صور متقدم", included: true },
      { label: "Google Analytics & Maps", labelAr: "Google Analytics & Maps", included: true },
      { label: "Multilingue (FR / AR)", labelAr: "متعدد اللغات (FR/AR)", included: true },
      { label: "Espace client / Admin", labelAr: "منطقة العميل / الإدارة", included: false },
      { label: "Paiement en ligne", labelAr: "الدفع عبر الإنترنت", included: false },
      { label: "Support prioritaire 1 an", labelAr: "دعم أولوية سنة", included: false },
    ],
  },
  {
    key: "ecommerce",
    name: "E-Commerce Standard",
    nameAr: "متجر إلكتروني قياسي",
    tagline: "Vendez en ligne avec une boutique complète",
    taglineAr: "بيع عبر الإنترنت بمتجر متكامل",
    price: 6990,
    promoPrice: 5592,
    promoLabel: "-20% Promo Été",
    promoLabelAr: "-20% عرض الصيف",
    deliveryDays: 21,
    pages: "Pages illimitées",
    pagesAr: "صفحات غير محدودة",
    color: "violet",
    gradient: "from-violet-500 to-purple-600",
    features: [
      { label: "Design responsive premium", labelAr: "تصميم متجاوب بريميوم", included: true },
      { label: "Pages illimitées", labelAr: "صفحات غير محدودة", included: true },
      { label: "Catalogue produits illimité", labelAr: "كتالوج منتجات غير محدود", included: true },
      { label: "Panier d'achat & Checkout", labelAr: "سلة التسوق والدفع", included: true },
      { label: "Paiement en ligne sécurisé", labelAr: "الدفع الآمن عبر الإنترنت", included: true },
      { label: "Gestion des commandes", labelAr: "إدارة الطلبات", included: true },
      { label: "Tableau de bord admin complet", labelAr: "لوحة تحكم الإدارة الكاملة", included: true },
      { label: "Intégration livraison (Amana/Aramex)", labelAr: "تكامل التوصيل (Amana/Aramex)", included: true },
      { label: "SEO e-commerce avancé", labelAr: "SEO متجر متقدم", included: true },
      { label: "Hébergement 1 an inclus", labelAr: "استضافة سنة كاملة مشمولة", included: true },
      { label: "Multilingue (FR / AR / EN)", labelAr: "متعدد اللغات (FR/AR/EN)", included: true },
      { label: "Support prioritaire 1 an", labelAr: "دعم أولوية سنة", included: true },
      { label: "Système de promotions & coupons", labelAr: "نظام العروض والكوبونات", included: true },
      { label: "App mobile (iOS/Android)", labelAr: "تطبيق موبايل (iOS/Android)", included: false },
      { label: "API personnalisée", labelAr: "API مخصصة", included: false },
    ],
  },
  {
    key: "premium",
    name: "E-Commerce Premium",
    nameAr: "متجر إلكتروني بريميوم",
    tagline: "La solution complète pour les grandes entreprises",
    taglineAr: "الحل المتكامل للشركات الكبيرة",
    price: 12990,
    promoPrice: 10392,
    promoLabel: "-20% Promo Été",
    promoLabelAr: "-20% عرض الصيف",
    deliveryDays: 30,
    pages: "Pages illimitées",
    pagesAr: "صفحات غير محدودة",
    color: "amber",
    gradient: "from-amber-500 to-orange-600",
    badge: "Best Value",
    badgeAr: "أفضل قيمة",
    features: [
      { label: "Design UI/UX sur mesure exclusif", labelAr: "تصميم UI/UX حصري مخصص", included: true },
      { label: "Pages illimitées", labelAr: "صفحات غير محدودة", included: true },
      { label: "Catalogue produits illimité", labelAr: "كتالوج منتجات غير محدود", included: true },
      { label: "Paiement multi-gateway (CMI, PayPal, Stripe)", labelAr: "دفع متعدد (CMI, PayPal, Stripe)", included: true },
      { label: "App mobile iOS & Android", labelAr: "تطبيق iOS & Android", included: true },
      { label: "API REST complète", labelAr: "API REST كاملة", included: true },
      { label: "ERP / CRM intégré", labelAr: "ERP / CRM مدمج", included: true },
      { label: "Tableau de bord analytics avancé", labelAr: "لوحة تحكم تحليلات متقدمة", included: true },
      { label: "Intelligence artificielle (recommandations)", labelAr: "ذكاء اصطناعي (توصيات)", included: true },
      { label: "Hébergement cloud dédié 2 ans", labelAr: "استضافة سحابية مخصصة سنتين", included: true },
      { label: "Multilingue illimité", labelAr: "لغات غير محدودة", included: true },
      { label: "Support VIP 24/7 - 2 ans", labelAr: "دعم VIP 24/7 - سنتين", included: true },
      { label: "Formation équipe (2 jours)", labelAr: "تدريب الفريق (يومان)", included: true },
      { label: "Audit SEO mensuel", labelAr: "مراجعة SEO شهرية", included: true },
      { label: "Sécurité & sauvegardes automatiques", labelAr: "الأمان والنسخ الاحتياطية التلقائية", included: true },
    ],
  },
  {
    key: "webapp",
    name: "Application Web Sur Mesure",
    nameAr: "تطبيق ويب مخصص",
    tagline: "Développement 100% personnalisé selon vos besoins",
    taglineAr: "تطوير مخصص 100% حسب احتياجاتك",
    price: 19990,
    deliveryDays: 60,
    pages: "Sur mesure",
    pagesAr: "حسب الطلب",
    color: "rose",
    gradient: "from-rose-500 to-pink-600",
    badge: "Sur Mesure",
    badgeAr: "مخصص",
    features: [
      { label: "Architecture & conception sur mesure", labelAr: "بنية وتصميم مخصص", included: true },
      { label: "Base de données avancée (MySQL/PostgreSQL)", labelAr: "قاعدة بيانات متقدمة", included: true },
      { label: "API REST / GraphQL personnalisée", labelAr: "API REST / GraphQL مخصصة", included: true },
      { label: "Authentification multi-rôles", labelAr: "مصادقة متعددة الأدوار", included: true },
      { label: "Dashboard analytique en temps réel", labelAr: "لوحة تحكم تحليلية في الوقت الفعلي", included: true },
      { label: "Intégrations tierces (CRM, ERP, APIs)", labelAr: "تكاملات ثالثية (CRM, ERP, APIs)", included: true },
      { label: "App mobile (React Native / Flutter)", labelAr: "تطبيق موبايل (React Native / Flutter)", included: true },
      { label: "Déploiement cloud AWS/Azure/GCP", labelAr: "نشر سحابي AWS/Azure/GCP", included: true },
      { label: "CI/CD & DevOps pipeline", labelAr: "CI/CD & DevOps pipeline", included: true },
      { label: "Tests automatisés", labelAr: "اختبارات آلية", included: true },
      { label: "Documentation technique complète", labelAr: "توثيق تقني كامل", included: true },
      { label: "Support VIP dédié 2 ans", labelAr: "دعم VIP مخصص سنتين", included: true },
      { label: "Formation équipe complète", labelAr: "تدريب الفريق الكامل", included: true },
      { label: "Code source livré", labelAr: "الكود المصدري مسلّم", included: true },
      { label: "Hébergement cloud dédié 2 ans", labelAr: "استضافة سحابية مخصصة سنتين", included: true },
    ],
  },
];

export const addOns: AddOn[] = [
  {
    id: "logo",
    name: "Logo & Charte Graphique",
    nameAr: "شعار وهوية بصرية",
    description: "Création de logo professionnel + guide des couleurs et typographies",
    descriptionAr: "تصميم شعار احترافي + دليل الألوان والخطوط",
    price: 990,
    unit: "",
    unitAr: "",
    icon: "palette",
  },
  {
    id: "content",
    name: "Rédaction de Contenu",
    nameAr: "كتابة المحتوى",
    description: "Rédaction professionnelle de toutes vos pages (FR/AR)",
    descriptionAr: "كتابة احترافية لجميع صفحاتك (FR/AR)",
    price: 490,
    unit: "",
    unitAr: "",
    icon: "pencil",
  },
  {
    id: "maintenance",
    name: "Maintenance Mensuelle",
    nameAr: "صيانة شهرية",
    description: "Mises à jour, sauvegardes, corrections et support technique mensuel",
    descriptionAr: "تحديثات، نسخ احتياطية، تصحيحات ودعم تقني شهري",
    price: 299,
    unit: "/mois",
    unitAr: "/شهر",
    icon: "wrench",
  },
  {
    id: "seo",
    name: "SEO & Référencement Mensuel",
    nameAr: "تحسين محركات البحث الشهري",
    description: "Optimisation SEO continue, rapport mensuel, backlinks de qualité",
    descriptionAr: "تحسين SEO مستمر، تقرير شهري، روابط خلفية عالية الجودة",
    price: 490,
    unit: "/mois",
    unitAr: "/شهر",
    icon: "trending-up",
  },
  {
    id: "training",
    name: "Formation Utilisation",
    nameAr: "تدريب الاستخدام",
    description: "Session de formation vidéo + documentation pour gérer votre site",
    descriptionAr: "جلسة تدريب فيديو + توثيق لإدارة موقعك",
    price: 390,
    unit: "",
    unitAr: "",
    icon: "graduation-cap",
  },
  {
    id: "social",
    name: "Pack Réseaux Sociaux",
    nameAr: "حزمة وسائل التواصل الاجتماعي",
    description: "Création des pages FB, Instagram, LinkedIn + 10 visuels offerts",
    descriptionAr: "إنشاء صفحات Facebook، Instagram، LinkedIn + 10 مرئيات مجانية",
    price: 690,
    unit: "",
    unitAr: "",
    icon: "share2",
  },
  {
    id: "photos",
    name: "Pack Photos Professionnelles",
    nameAr: "حزمة الصور الاحترافية",
    description: "Séance photo professionnelle de vos locaux/produits (50 photos HD)",
    descriptionAr: "جلسة تصوير احترافية لمحلاتك/منتجاتك (50 صورة HD)",
    price: 890,
    unit: "",
    unitAr: "",
    icon: "camera",
  },
  {
    id: "chatbot",
    name: "Chatbot IA Personnalisé",
    nameAr: "دردشة ذكاء اصطناعي مخصصة",
    description: "Assistant virtuel intelligent entraîné sur vos données business",
    descriptionAr: "مساعد افتراضي ذكي مدرَّب على بيانات عملك",
    price: 1490,
    unit: "",
    unitAr: "",
    icon: "bot",
  },
];

export const promos: Promo[] = [
  {
    id: "summer2026",
    code: "ETE2026",
    label: "Promo Été 2026",
    labelAr: "عرض صيف 2026",
    description: "20% de réduction sur tous les packages ! Offre valable jusqu'au 31 août 2026.",
    descriptionAr: "خصم 20% على جميع الحزم! العرض ساري حتى 31 أغسطس 2026.",
    discount: 20,
    type: "percent",
    expiresAt: "2026-08-31",
    color: "emerald",
  },
  {
    id: "pack-complet",
    code: "PACKCOMPLET",
    label: "Pack Complet",
    labelAr: "الحزمة الكاملة",
    description: "Commandez un site + Logo + Maintenance 3 mois et économisez 15% supplémentaires.",
    descriptionAr: "اطلب موقعاً + شعار + صيانة 3 أشهر ووفّر 15% إضافية.",
    discount: 15,
    type: "percent",
    expiresAt: "2026-12-31",
    color: "violet",
  },
  {
    id: "premiere-commande",
    code: "BIENVENUE",
    label: "Première Commande",
    labelAr: "أول طلب",
    description: "500 MAD offerts pour toute première commande. Réservez votre place !",
    descriptionAr: "500 درهم هدية لأول طلب. احجز مكانك!",
    discount: 500,
    type: "fixed",
    expiresAt: "2026-12-31",
    color: "amber",
  },
];
