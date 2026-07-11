export interface WebsiteOption {
  label: string;
  labelAr: string;
  included: boolean;
}

export interface WebsitePackage {
  id: string;
  name: string;
  nameAr: string;
  badge?: string;
  badgeAr?: string;
  description: string;
  descriptionAr: string;
  originalPrice: number;
  promoPrice: number;
  promoPercent: number;
  color: string;
  gradient: string;
  glowColor: string;
  popular?: boolean;
  category: string;
  categoryAr: string;
  deliveryDays: number;
  options: WebsiteOption[];
}

export const websitePackages: WebsitePackage[] = [
  {
    id: "vitrine",
    name: "Site Vitrine",
    nameAr: "موقع عرض",
    badge: "Idéal démarrage",
    badgeAr: "مثالي للبداية",
    description: "Une présence en ligne professionnelle pour lancer votre activité",
    descriptionAr: "حضور احترافي على الإنترنت لإطلاق نشاطك",
    originalPrice: 1500,
    promoPrice: 999,
    promoPercent: 33,
    color: "text-sky-400",
    gradient: "from-sky-500 to-blue-600",
    glowColor: "shadow-sky-500/20",
    category: "Site Vitrine",
    categoryAr: "موقع عرض",
    deliveryDays: 5,
    options: [
      { label: "1 page responsive (mobile/tablette/PC)", labelAr: "صفحة واحدة متجاوبة (موبايل/تابلت/PC)", included: true },
      { label: "Design moderne personnalisé", labelAr: "تصميم عصري مخصص", included: true },
      { label: "Formulaire de contact", labelAr: "نموذج تواصل", included: true },
      { label: "Bouton WhatsApp intégré", labelAr: "زر واتساب مدمج", included: true },
      { label: "SEO basique (Google)", labelAr: "تحسين محركات البحث الأساسي", included: true },
      { label: "Hébergement 1 an inclus", labelAr: "استضافة سنة مشمولة", included: true },
      { label: "Nom de domaine .com", labelAr: "نطاق .com", included: false },
      { label: "Blog intégré", labelAr: "مدونة مدمجة", included: false },
      { label: "Boutique en ligne", labelAr: "متجر إلكتروني", included: false },
      { label: "Dashboard admin", labelAr: "لوحة تحكم مشرف", included: false },
    ],
  },
  {
    id: "pro",
    name: "Site Professionnel",
    nameAr: "الموقع الاحترافي",
    badge: "Plus populaire",
    badgeAr: "الأكثر شعبية",
    description: "Un site complet pour booster votre crédibilité et générer des prospects",
    descriptionAr: "موقع متكامل لتعزيز مصداقيتك وجذب العملاء",
    originalPrice: 3500,
    promoPrice: 2499,
    promoPercent: 29,
    color: "text-emerald-400",
    gradient: "from-emerald-500 to-teal-600",
    glowColor: "shadow-emerald-500/30",
    popular: true,
    category: "Site Professionnel",
    categoryAr: "موقع احترافي",
    deliveryDays: 10,
    options: [
      { label: "Jusqu'à 6 pages responsive", labelAr: "حتى 6 صفحات متجاوبة", included: true },
      { label: "Design premium sur mesure", labelAr: "تصميم بريميوم مخصص", included: true },
      { label: "Blog / Actualités", labelAr: "مدونة / أخبار", included: true },
      { label: "Galerie photos/vidéos", labelAr: "معرض صور/فيديو", included: true },
      { label: "Formulaire + WhatsApp + ChatBot", labelAr: "نموذج + واتساب + شات بوت", included: true },
      { label: "SEO avancé (Google Maps, meta)", labelAr: "SEO متقدم (Google Maps، ميتا)", included: true },
      { label: "Hébergement 1 an + domaine .com", labelAr: "استضافة سنة + نطاق .com", included: true },
      { label: "Support technique 3 mois", labelAr: "دعم تقني 3 أشهر", included: true },
      { label: "Boutique en ligne", labelAr: "متجر إلكتروني", included: false },
      { label: "Application mobile", labelAr: "تطبيق موبايل", included: false },
    ],
  },
  {
    id: "ecommerce",
    name: "E-Commerce Standard",
    nameAr: "تجارة إلكترونية - عادي",
    badge: "Vendez en ligne",
    badgeAr: "بيع على الإنترنت",
    description: "Votre boutique en ligne clé en main pour démarrer vos ventes",
    descriptionAr: "متجرك الإلكتروني الجاهز لبدء مبيعاتك",
    originalPrice: 6500,
    promoPrice: 4999,
    promoPercent: 23,
    color: "text-violet-400",
    gradient: "from-violet-500 to-purple-600",
    glowColor: "shadow-violet-500/20",
    category: "E-Commerce",
    categoryAr: "تجارة إلكترونية",
    deliveryDays: 15,
    options: [
      { label: "Boutique jusqu'à 100 produits", labelAr: "متجر حتى 100 منتج", included: true },
      { label: "Paiement en ligne sécurisé", labelAr: "دفع إلكتروني آمن", included: true },
      { label: "Gestion des commandes", labelAr: "إدارة الطلبات", included: true },
      { label: "Panier & liste de souhaits", labelAr: "عربة التسوق وقائمة الأمنيات", included: true },
      { label: "Dashboard admin complet", labelAr: "لوحة تحكم مشرف متكاملة", included: true },
      { label: "Gestion stocks automatique", labelAr: "إدارة مخزون تلقائية", included: true },
      { label: "Notifications email/SMS", labelAr: "إشعارات بريد/SMS", included: true },
      { label: "SEO e-commerce optimisé", labelAr: "SEO تجارة إلكترونية محسّن", included: true },
      { label: "Multi-langues (FR/AR/EN)", labelAr: "متعدد اللغات (FR/AR/EN)", included: false },
      { label: "Application mobile", labelAr: "تطبيق موبايل", included: false },
    ],
  },
  {
    id: "ecommerce-premium",
    name: "E-Commerce Premium",
    nameAr: "تجارة إلكترونية - بريميوم",
    badge: "Illimité",
    badgeAr: "غير محدود",
    description: "La solution e-commerce complète pour les grandes boutiques",
    descriptionAr: "حل التجارة الإلكترونية الكامل للمتاجر الكبيرة",
    originalPrice: 12000,
    promoPrice: 9999,
    promoPercent: 17,
    color: "text-amber-400",
    gradient: "from-amber-500 to-orange-600",
    glowColor: "shadow-amber-500/20",
    category: "E-Commerce",
    categoryAr: "تجارة إلكترونية",
    deliveryDays: 21,
    options: [
      { label: "Produits illimités", labelAr: "منتجات غير محدودة", included: true },
      { label: "Multi-langues (FR/AR/EN)", labelAr: "متعدد اللغات (FR/AR/EN)", included: true },
      { label: "Multi-devises (MAD/EUR/USD)", labelAr: "متعدد العملات (MAD/EUR/USD)", included: true },
      { label: "Analytics & rapports avancés", labelAr: "تحليلات وتقارير متقدمة", included: true },
      { label: "Programme fidélité & coupons", labelAr: "برنامج الولاء والقسائم", included: true },
      { label: "Intégration livraison (Amana, Aramex)", labelAr: "ربط شركات التوصيل", included: true },
      { label: "Chat en ligne + support 24/7", labelAr: "دردشة مباشرة + دعم 24/7", included: true },
      { label: "Hébergement haute performance", labelAr: "استضافة عالية الأداء", included: true },
      { label: "Application mobile (iOS & Android)", labelAr: "تطبيق موبايل (iOS & Android)", included: true },
      { label: "Support technique 12 mois", labelAr: "دعم تقني 12 شهراً", included: true },
    ],
  },
  {
    id: "startup",
    name: "Pack Startup / SaaS",
    nameAr: "حزمة الشركات الناشئة",
    badge: "Sur mesure",
    badgeAr: "حسب الطلب",
    description: "Application web complète avec dashboard, API et déploiement cloud",
    descriptionAr: "تطبيق ويب متكامل مع لوحة تحكم وAPI ونشر سحابي",
    originalPrice: 22000,
    promoPrice: 17999,
    promoPercent: 18,
    color: "text-rose-400",
    gradient: "from-rose-500 to-pink-600",
    glowColor: "shadow-rose-500/20",
    category: "Application Web",
    categoryAr: "تطبيق ويب",
    deliveryDays: 30,
    options: [
      { label: "Application web full-stack", labelAr: "تطبيق ويب full-stack", included: true },
      { label: "Dashboard admin sur mesure", labelAr: "لوحة تحكم مخصصة", included: true },
      { label: "API REST / GraphQL", labelAr: "API REST / GraphQL", included: true },
      { label: "Authentification & rôles utilisateurs", labelAr: "مصادقة وأدوار المستخدمين", included: true },
      { label: "Base de données cloud", labelAr: "قاعدة بيانات سحابية", included: true },
      { label: "Intégrations tierces (Stripe, Twilio...)", labelAr: "تكاملات خارجية (Stripe، Twilio...)", included: true },
      { label: "Déploiement CI/CD automatisé", labelAr: "نشر CI/CD تلقائي", included: true },
      { label: "Tests & documentation technique", labelAr: "اختبارات وتوثيق تقني", included: true },
      { label: "Application mobile React Native", labelAr: "تطبيق موبايل React Native", included: true },
      { label: "Support & maintenance 12 mois", labelAr: "دعم وصيانة 12 شهراً", included: true },
    ],
  },
];

export const additionalOptions = [
  { id: "domain", name: "Nom de domaine .ma / .com", nameAr: "نطاق .ma / .com", price: 199, promo: 149 },
  { id: "hosting-extra", name: "Hébergement supplémentaire (1 an)", nameAr: "استضافة إضافية (سنة)", price: 599, promo: 399 },
  { id: "seo", name: "Pack SEO mensuel", nameAr: "حزمة SEO شهرية", price: 999, promo: 699 },
  { id: "social", name: "Gestion réseaux sociaux (1 mois)", nameAr: "إدارة وسائل التواصل (شهر)", price: 1499, promo: 999 },
  { id: "logo", name: "Création logo + identité visuelle", nameAr: "تصميم شعار + هوية بصرية", price: 800, promo: 599 },
  { id: "maintenance", name: "Contrat maintenance mensuel", nameAr: "عقد صيانة شهري", price: 499, promo: 349 },
  { id: "speed", name: "Optimisation vitesse (Core Web Vitals)", nameAr: "تحسين السرعة (Core Web Vitals)", price: 700, promo: 499 },
  { id: "translation", name: "Traduction multilingue (par langue)", nameAr: "ترجمة متعددة اللغات (لكل لغة)", price: 500, promo: 349 },
];
