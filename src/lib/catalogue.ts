export interface LocalizedText {
  fr: string;
  ar: string;
}

export interface CatalogueItem {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  /** Prix promo en DH. null = sur devis */
  price: number | null;
  /** Ancien prix barré en DH */
  oldPrice?: number;
  /** Suffixe du prix, ex: "/mois" */
  unit?: LocalizedText;
  features: LocalizedText[];
  popular?: boolean;
  delivery?: LocalizedText;
}

export interface CatalogueOption {
  id: string;
  name: LocalizedText;
  price: number;
  oldPrice?: number;
  unit?: LocalizedText;
}

export const WHATSAPP_NUMBER = "212664662629";

export const promoBanner: LocalizedText = {
  fr: "Offre de lancement : jusqu'à -30% sur tous les packs + nom de domaine offert la 1ère année",
  ar: "عرض الإطلاق: خصم يصل إلى %30 على جميع الباقات + اسم نطاق مجاني للسنة الأولى",
};

export const websitePacks: CatalogueItem[] = [
  {
    id: "vitrine",
    name: { fr: "Site Vitrine Essentiel", ar: "موقع تعريفي أساسي" },
    description: {
      fr: "Idéal pour présenter votre activité et être visible sur Google.",
      ar: "مثالي لعرض نشاطك والظهور على جوجل.",
    },
    price: 2490,
    oldPrice: 3500,
    delivery: { fr: "Livraison en 7 jours", ar: "التسليم في 7 أيام" },
    features: [
      { fr: "Jusqu'à 5 pages (Accueil, Services, Contact...)", ar: "حتى 5 صفحات (الرئيسية، الخدمات، اتصل بنا...)" },
      { fr: "Design moderne et responsive (mobile & PC)", ar: "تصميم عصري متجاوب (هاتف وحاسوب)" },
      { fr: "Formulaire de contact + bouton WhatsApp", ar: "نموذج اتصال + زر واتساب" },
      { fr: "Référencement Google de base (SEO)", ar: "تحسين محركات البحث الأساسي (SEO)" },
      { fr: "Hébergement 1 an offert", ar: "استضافة مجانية لمدة سنة" },
      { fr: "Certificat de sécurité SSL inclus", ar: "شهادة أمان SSL مضمنة" },
    ],
  },
  {
    id: "pro",
    name: { fr: "Site Pro Business", ar: "موقع احترافي للأعمال" },
    description: {
      fr: "Le pack complet pour les entreprises qui veulent se démarquer.",
      ar: "الباقة الكاملة للشركات التي تريد التميز.",
    },
    price: 4990,
    oldPrice: 6900,
    popular: true,
    delivery: { fr: "Livraison en 14 jours", ar: "التسليم في 14 يوما" },
    features: [
      { fr: "Jusqu'à 10 pages personnalisées", ar: "حتى 10 صفحات مخصصة" },
      { fr: "Site bilingue Français / Arabe", ar: "موقع ثنائي اللغة فرنسي / عربي" },
      { fr: "Galerie photos + témoignages clients", ar: "معرض صور + آراء العملاء" },
      { fr: "Formulaire de devis multi-étapes", ar: "نموذج طلب عرض سعر متعدد الخطوات" },
      { fr: "Chatbot d'accueil + WhatsApp intégré", ar: "روبوت محادثة + واتساب مدمج" },
      { fr: "SEO avancé + Google Maps + statistiques", ar: "SEO متقدم + خرائط جوجل + إحصائيات" },
      { fr: "Formation d'1h pour gérer votre site", ar: "تدريب لمدة ساعة لإدارة موقعك" },
    ],
  },
  {
    id: "ecommerce",
    name: { fr: "Site E-commerce", ar: "متجر إلكتروني" },
    description: {
      fr: "Vendez en ligne avec une boutique complète et facile à gérer.",
      ar: "بع عبر الإنترنت بمتجر كامل وسهل الإدارة.",
    },
    price: 8990,
    oldPrice: 12500,
    delivery: { fr: "Livraison en 21 jours", ar: "التسليم في 21 يوما" },
    features: [
      { fr: "Boutique en ligne complète (produits illimités)", ar: "متجر إلكتروني كامل (منتجات غير محدودة)" },
      { fr: "Paiement en ligne + paiement à la livraison", ar: "دفع إلكتروني + دفع عند الاستلام" },
      { fr: "Gestion du stock et des commandes", ar: "إدارة المخزون والطلبات" },
      { fr: "Tableau de bord administrateur", ar: "لوحة تحكم للمشرف" },
      { fr: "Export Excel automatique des commandes", ar: "تصدير تلقائي للطلبات إلى إكسل" },
      { fr: "Emails de confirmation automatiques", ar: "رسائل تأكيد تلقائية" },
      { fr: "SEO + intégration réseaux sociaux", ar: "SEO + ربط مع مواقع التواصل" },
    ],
  },
  {
    id: "surmesure",
    name: { fr: "Application Sur Mesure", ar: "تطبيق حسب الطلب" },
    description: {
      fr: "Plateforme web personnalisée : réservation, gestion interne, portail client...",
      ar: "منصة ويب مخصصة: حجوزات، إدارة داخلية، بوابة عملاء...",
    },
    price: null,
    delivery: { fr: "Délai selon projet", ar: "المدة حسب المشروع" },
    features: [
      { fr: "Analyse gratuite de votre besoin", ar: "دراسة مجانية لاحتياجاتك" },
      { fr: "Fonctionnalités 100% personnalisées", ar: "وظائف مخصصة 100%" },
      { fr: "Espace admin + gestion des utilisateurs", ar: "لوحة إدارة + إدارة المستخدمين" },
      { fr: "Automatisations et rapports Excel", ar: "أتمتة وتقارير إكسل" },
      { fr: "Accompagnement et support dédié", ar: "مواكبة ودعم مخصص" },
      { fr: "À partir de 14 900 DH", ar: "ابتداء من 14900 درهم" },
    ],
  },
];

export const managementPlans: CatalogueItem[] = [
  {
    id: "gestion-basique",
    name: { fr: "Gestion Basique", ar: "إدارة أساسية" },
    description: {
      fr: "L'essentiel pour garder votre site à jour et sécurisé.",
      ar: "الأساسيات للحفاظ على موقعك محدثا وآمنا.",
    },
    price: 199,
    oldPrice: 299,
    unit: { fr: "/mois", ar: "/شهر" },
    features: [
      { fr: "2 mises à jour de contenu par mois", ar: "تحديثان للمحتوى شهريا" },
      { fr: "Sauvegardes hebdomadaires", ar: "نسخ احتياطية أسبوعية" },
      { fr: "Surveillance sécurité et disponibilité", ar: "مراقبة الأمان والتوفر" },
      { fr: "Support par WhatsApp (48h)", ar: "دعم عبر واتساب (48 ساعة)" },
    ],
  },
  {
    id: "gestion-pro",
    name: { fr: "Gestion Pro", ar: "إدارة احترافية" },
    description: {
      fr: "Un manager dédié qui s'occupe de tout, chaque mois.",
      ar: "مدير مخصص يهتم بكل شيء، كل شهر.",
    },
    price: 399,
    oldPrice: 599,
    unit: { fr: "/mois", ar: "/شهر" },
    popular: true,
    features: [
      { fr: "8 mises à jour de contenu par mois", ar: "8 تحديثات للمحتوى شهريا" },
      { fr: "Sauvegardes quotidiennes", ar: "نسخ احتياطية يومية" },
      { fr: "Rapport mensuel Excel (visites, contacts)", ar: "تقرير شهري بصيغة إكسل (زيارات، اتصالات)" },
      { fr: "Suivi SEO et optimisation continue", ar: "متابعة SEO وتحسين مستمر" },
      { fr: "Support prioritaire WhatsApp (24h)", ar: "دعم أولوية عبر واتساب (24 ساعة)" },
    ],
  },
  {
    id: "gestion-premium",
    name: { fr: "Gestion Premium", ar: "إدارة بريميوم" },
    description: {
      fr: "Gestion complète : site, contenu et présence en ligne.",
      ar: "إدارة كاملة: الموقع والمحتوى والحضور الرقمي.",
    },
    price: 799,
    oldPrice: 1099,
    unit: { fr: "/mois", ar: "/شهر" },
    features: [
      { fr: "Mises à jour illimitées", ar: "تحديثات غير محدودة" },
      { fr: "4 publications réseaux sociaux / mois", ar: "4 منشورات شهريا على مواقع التواصل" },
      { fr: "Rapports Excel automatisés chaque semaine", ar: "تقارير إكسل تلقائية كل أسبوع" },
      { fr: "Petites évolutions du site incluses", ar: "تطويرات صغيرة للموقع مضمنة" },
      { fr: "Support urgent 7j/7", ar: "دعم عاجل 7/7" },
    ],
  },
];

export const excelServices: CatalogueItem[] = [
  {
    id: "excel-simple",
    name: { fr: "Excel Automatisé Simple", ar: "إكسل مؤتمت بسيط" },
    description: {
      fr: "Un fichier intelligent qui fait les calculs à votre place.",
      ar: "ملف ذكي يقوم بالحسابات بدلا منك.",
    },
    price: 490,
    oldPrice: 690,
    delivery: { fr: "Livraison en 3 jours", ar: "التسليم في 3 أيام" },
    features: [
      { fr: "Factures et devis générés automatiquement", ar: "فواتير وعروض أسعار تلقائية" },
      { fr: "Calculs automatiques (totaux, TVA, marges)", ar: "حسابات تلقائية (المجاميع، الضريبة، الهوامش)" },
      { fr: "Mise en forme professionnelle à votre logo", ar: "تنسيق احترافي بشعارك" },
      { fr: "Guide d'utilisation inclus", ar: "دليل استخدام مضمن" },
    ],
  },
  {
    id: "excel-dashboard",
    name: { fr: "Tableau de Bord Excel", ar: "لوحة قيادة إكسل" },
    description: {
      fr: "Suivez votre activité en un coup d'œil avec des graphiques dynamiques.",
      ar: "تابع نشاطك بنظرة واحدة مع رسوم بيانية ديناميكية.",
    },
    price: 1290,
    oldPrice: 1790,
    popular: true,
    delivery: { fr: "Livraison en 5 jours", ar: "التسليم في 5 أيام" },
    features: [
      { fr: "Tableaux de bord avec indicateurs (KPI)", ar: "لوحات قيادة بمؤشرات أداء (KPI)" },
      { fr: "Graphiques dynamiques et filtres", ar: "رسوم بيانية ديناميكية وفلاتر" },
      { fr: "Suivi ventes, dépenses, stock, clients", ar: "متابعة المبيعات والمصاريف والمخزون والعملاء" },
      { fr: "Macros et boutons d'automatisation", ar: "ماكرو وأزرار أتمتة" },
      { fr: "Formation à distance de 30 min", ar: "تدريب عن بعد لمدة 30 دقيقة" },
    ],
  },
  {
    id: "excel-connecte",
    name: { fr: "Excel Connecté au Site", ar: "إكسل مرتبط بالموقع" },
    description: {
      fr: "Vos données du site exportées vers Excel automatiquement.",
      ar: "بيانات موقعك تصدر إلى إكسل تلقائيا.",
    },
    price: 1990,
    oldPrice: 2790,
    delivery: { fr: "Livraison en 7 jours", ar: "التسليم في 7 أيام" },
    features: [
      { fr: "Export automatique des commandes et devis", ar: "تصدير تلقائي للطلبات وعروض الأسعار" },
      { fr: "Rapports planifiés (quotidien / hebdo / mensuel)", ar: "تقارير مجدولة (يومية / أسبوعية / شهرية)" },
      { fr: "Synchronisation avec Google Sheets possible", ar: "إمكانية المزامنة مع جوجل شيتس" },
      { fr: "Alertes automatiques (stock bas, nouveau devis...)", ar: "تنبيهات تلقائية (نقص المخزون، عرض سعر جديد...)" },
      { fr: "Maintenance 3 mois incluse", ar: "صيانة 3 أشهر مضمنة" },
    ],
  },
];

export const extraOptions: CatalogueOption[] = [
  { id: "page", name: { fr: "Page supplémentaire", ar: "صفحة إضافية" }, price: 250 },
  { id: "langue", name: { fr: "Langue supplémentaire", ar: "لغة إضافية" }, price: 500, oldPrice: 700 },
  { id: "logo", name: { fr: "Création de logo professionnel", ar: "تصميم شعار احترافي" }, price: 400, oldPrice: 600 },
  { id: "chatbot", name: { fr: "Chatbot intelligent", ar: "روبوت محادثة ذكي" }, price: 600, oldPrice: 800 },
  { id: "resa", name: { fr: "Module de réservation en ligne", ar: "نظام حجز عبر الإنترنت" }, price: 900, oldPrice: 1200 },
  { id: "domaine", name: { fr: "Nom de domaine + email pro (1 an)", ar: "اسم نطاق + بريد احترافي (سنة)" }, price: 350 },
  { id: "seo", name: { fr: "Pack SEO avancé (3 mois)", ar: "باقة SEO متقدمة (3 أشهر)" }, price: 1200, oldPrice: 1600 },
  { id: "intervention", name: { fr: "Intervention ponctuelle", ar: "تدخل عند الطلب" }, price: 150, unit: { fr: "/intervention", ar: "/تدخل" } },
];

/** Espace insécable pour que « 8 990 » ne soit pas réordonné en RTL */
export function formatPrice(price: number): string {
  return price.toLocaleString("fr-FR").replace(/\u202f/g, "\u00a0");
}

export function discountPercent(price: number, oldPrice: number): number {
  return Math.round((1 - price / oldPrice) * 100);
}

/** Message WhatsApp toujours en français (cf. politique du site) */
export function buildOrderUrl(itemNameFr: string, price: number | null, unitFr?: string): string {
  const priceText =
    price === null ? "Sur devis" : `${formatPrice(price)} DH${unitFr ?? ""}`;
  const message = `*Commande depuis le catalogue*\n\n*Offre:* ${itemNameFr}\n*Prix:* ${priceText}\n\nBonjour, je souhaite commander cette offre. Merci de me contacter pour finaliser.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
