export const PACKAGE_TYPES = [
  "landing",
  "vitrine",
  "portfolio",
  "blog",
  "ecommerce",
  "application",
  "surmesure",
] as const;

export type PackageType = (typeof PACKAGE_TYPES)[number];

export const PACKAGE_TYPE_LABELS: Record<
  PackageType,
  { fr: string; ar: string }
> = {
  landing: { fr: "Landing Page", ar: "صفحة هبوط" },
  vitrine: { fr: "Site Vitrine", ar: "موقع تعريفي" },
  portfolio: { fr: "Portfolio", ar: "معرض أعمال" },
  blog: { fr: "Blog / Magazine", ar: "مدونة / مجلة" },
  ecommerce: { fr: "E-commerce", ar: "متجر إلكتروني" },
  application: { fr: "Application Web", ar: "تطبيق ويب" },
  surmesure: { fr: "Sur Mesure", ar: "حسب الطلب" },
};

/**
 * Normalized shape returned to the client for a catalog item. It matches the
 * `website_packages` DB row (minus `createdAt`) so the same UI can render both
 * database-backed items and the built-in defaults used as a fallback.
 */
export type CatalogItem = {
  id: number;
  name: string;
  nameAr: string | null;
  type: PackageType;
  description: string | null;
  descriptionAr: string | null;
  imageUrl: string | null;
  price: number;
  promoPrice: number | null;
  options: string[];
  optionsAr: string[] | null;
  deliveryDays: number | null;
  popular: boolean;
  active: boolean;
  sortOrder: number;
};

/** Currency used across the catalog (Moroccan Dirham). */
export const CATALOG_CURRENCY = "DH";

/**
 * Built-in catalog shown when the database has no packages yet (or is
 * unreachable). Prices are in MAD (DH) and include promotional pricing.
 */
export const DEFAULT_PACKAGES: CatalogItem[] = [
  {
    id: -1,
    name: "Landing Page Express",
    nameAr: "صفحة هبوط سريعة",
    type: "landing",
    description:
      "Une page unique percutante pour lancer un produit, une campagne ou capter des prospects. Idéale pour démarrer vite.",
    descriptionAr:
      "صفحة واحدة مؤثرة لإطلاق منتج أو حملة أو جمع العملاء المحتملين. مثالية للانطلاق بسرعة.",
    imageUrl:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80",
    price: 1500,
    promoPrice: 990,
    options: [
      "Page unique responsive (mobile & desktop)",
      "Design moderne personnalisé",
      "Formulaire de contact + WhatsApp",
      "Optimisation vitesse & SEO de base",
      "Nom de domaine offert (1 an)",
      "Mise en ligne incluse",
    ],
    optionsAr: [
      "صفحة واحدة متجاوبة (هاتف وحاسوب)",
      "تصميم عصري مخصص",
      "نموذج اتصال + واتساب",
      "تحسين السرعة و SEO أساسي",
      "اسم نطاق مجاني (سنة)",
      "النشر على الإنترنت مشمول",
    ],
    deliveryDays: 3,
    popular: false,
    active: true,
    sortOrder: 1,
  },
  {
    id: -2,
    name: "Site Vitrine Pro",
    nameAr: "موقع تعريفي احترافي",
    type: "vitrine",
    description:
      "Le site parfait pour présenter votre entreprise, vos services et gagner la confiance de vos clients.",
    descriptionAr:
      "الموقع المثالي لتقديم شركتك وخدماتك وكسب ثقة عملائك.",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    price: 3500,
    promoPrice: 2490,
    options: [
      "5 à 7 pages sur mesure",
      "Design premium responsive",
      "Galerie & pages services",
      "Formulaire de devis + WhatsApp",
      "Référencement SEO optimisé",
      "Bilingue (FR / AR)",
      "Hébergement + domaine (1 an)",
      "Formation à la gestion incluse",
    ],
    optionsAr: [
      "5 إلى 7 صفحات حسب الطلب",
      "تصميم متميز متجاوب",
      "معرض وصفحات خدمات",
      "نموذج عرض سعر + واتساب",
      "تحسين محركات البحث SEO",
      "ثنائي اللغة (فرنسية / عربية)",
      "استضافة + نطاق (سنة)",
      "تدريب على الإدارة مشمول",
    ],
    deliveryDays: 7,
    popular: true,
    active: true,
    sortOrder: 2,
  },
  {
    id: -3,
    name: "Portfolio Créatif",
    nameAr: "معرض أعمال إبداعي",
    type: "portfolio",
    description:
      "Mettez en valeur vos réalisations avec une galerie élégante. Parfait pour freelances, artistes et agences.",
    descriptionAr:
      "أبرز أعمالك من خلال معرض أنيق. مثالي للمستقلين والفنانين والوكالات.",
    imageUrl:
      "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=1200&q=80",
    price: 2500,
    promoPrice: 1790,
    options: [
      "Galerie projets illimitée",
      "Animations & transitions élégantes",
      "Page \u00ab À propos \u00bb & contact",
      "Intégration réseaux sociaux",
      "Responsive & rapide",
      "Domaine offert (1 an)",
    ],
    optionsAr: [
      "معرض مشاريع غير محدود",
      "حركات وانتقالات أنيقة",
      "صفحة «نبذة» واتصال",
      "ربط بشبكات التواصل الاجتماعي",
      "متجاوب وسريع",
      "اسم نطاق مجاني (سنة)",
    ],
    deliveryDays: 5,
    popular: false,
    active: true,
    sortOrder: 3,
  },
  {
    id: -4,
    name: "Blog & Magazine",
    nameAr: "مدونة ومجلة",
    type: "blog",
    description:
      "Publiez vos articles facilement avec un espace de gestion complet et un design lisible et moderne.",
    descriptionAr:
      "انشر مقالاتك بسهولة مع مساحة إدارة كاملة وتصميم واضح وعصري.",
    imageUrl:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    price: 2900,
    promoPrice: null,
    options: [
      "Système de publication d'articles",
      "Catégories & recherche",
      "Espace d'administration",
      "Optimisation SEO articles",
      "Newsletter & commentaires",
      "Responsive & rapide",
    ],
    optionsAr: [
      "نظام نشر المقالات",
      "تصنيفات وبحث",
      "لوحة تحكم للإدارة",
      "تحسين SEO للمقالات",
      "نشرة بريدية وتعليقات",
      "متجاوب وسريع",
    ],
    deliveryDays: 8,
    popular: false,
    active: true,
    sortOrder: 4,
  },
  {
    id: -5,
    name: "Boutique E-commerce",
    nameAr: "متجر إلكتروني",
    type: "ecommerce",
    description:
      "Vendez en ligne 24h/24 avec un catalogue produits, un panier et le paiement. La solution complète pour votre business.",
    descriptionAr:
      "بع عبر الإنترنت 24/24 مع كتالوج منتجات وسلة ودفع. الحل الكامل لأعمالك.",
    imageUrl:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    price: 8900,
    promoPrice: 6490,
    options: [
      "Catalogue produits illimité",
      "Panier & commande en ligne",
      "Paiement en ligne & à la livraison",
      "Gestion des stocks & commandes",
      "Tableau de bord vendeur",
      "Codes promo & réductions",
      "Bilingue (FR / AR)",
      "Hébergement + domaine (1 an)",
      "Formation complète incluse",
    ],
    optionsAr: [
      "كتالوج منتجات غير محدود",
      "سلة وطلب عبر الإنترنت",
      "دفع إلكتروني وعند التسليم",
      "إدارة المخزون والطلبات",
      "لوحة تحكم للبائع",
      "أكواد ترويجية وتخفيضات",
      "ثنائي اللغة (فرنسية / عربية)",
      "استضافة + نطاق (سنة)",
      "تدريب كامل مشمول",
    ],
    deliveryDays: 14,
    popular: true,
    active: true,
    sortOrder: 5,
  },
  {
    id: -6,
    name: "Application Web",
    nameAr: "تطبيق ويب",
    type: "application",
    description:
      "Une application métier sur mesure : espace membre, tableau de bord, gestion de données et automatisations.",
    descriptionAr:
      "تطبيق أعمال حسب الطلب: مساحة أعضاء، لوحة تحكم، إدارة بيانات وأتمتة.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    price: 15000,
    promoPrice: 11900,
    options: [
      "Espace membre & authentification",
      "Tableau de bord & statistiques",
      "Base de données sur mesure",
      "Rôles & permissions",
      "Export Excel / PDF automatisé",
      "API & intégrations",
      "Maintenance 3 mois offerte",
    ],
    optionsAr: [
      "مساحة أعضاء ومصادقة",
      "لوحة تحكم وإحصائيات",
      "قاعدة بيانات حسب الطلب",
      "أدوار وصلاحيات",
      "تصدير Excel / PDF تلقائي",
      "API وتكاملات",
      "صيانة 3 أشهر مجانية",
    ],
    deliveryDays: 30,
    popular: false,
    active: true,
    sortOrder: 6,
  },
  {
    id: -7,
    name: "Projet Sur Mesure",
    nameAr: "مشروع حسب الطلب",
    type: "surmesure",
    description:
      "Un besoin spécifique ? Nous concevons une solution 100% adaptée à votre projet. Devis personnalisé et gratuit.",
    descriptionAr:
      "لديك حاجة خاصة؟ نصمم حلاً مناسباً 100% لمشروعك. عرض سعر مخصص ومجاني.",
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    price: 0,
    promoPrice: null,
    options: [
      "Étude de besoin gratuite",
      "Cahier des charges détaillé",
      "Design & développement dédiés",
      "Accompagnement personnalisé",
      "Devis clair et transparent",
    ],
    optionsAr: [
      "دراسة احتياجات مجانية",
      "دفتر تحملات مفصل",
      "تصميم وتطوير مخصص",
      "مواكبة شخصية",
      "عرض سعر واضح وشفاف",
    ],
    deliveryDays: null,
    popular: false,
    active: true,
    sortOrder: 7,
  },
];
