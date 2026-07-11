// Catalogue des offres de création de sites web — packs, options et promotions.
// Les prix sont en dirhams marocains (MAD).

export interface WebsitePack {
  id: string;
  nameFr: string;
  nameAr: string;
  descFr: string;
  descAr: string;
  /** Prix normal en MAD */
  price: number;
  /** Prix promotionnel en MAD */
  promoPrice: number;
  /** Délai de livraison en jours */
  deliveryDays: number;
  featuresFr: string[];
  featuresAr: string[];
  popular?: boolean;
  color: string;
  glow: string;
}

export interface CatalogOption {
  id: string;
  nameFr: string;
  nameAr: string;
  categoryFr: string;
  categoryAr: string;
  /** Prix en MAD */
  price: number;
  /** true si le prix est mensuel */
  monthly?: boolean;
}

export const PROMO_LABEL_FR = "Offre de lancement : jusqu'à -30% sur tous les packs !";
export const PROMO_LABEL_AR = "عرض الإطلاق: خصم يصل إلى 30% على جميع الباقات!";

export const WHATSAPP_NUMBER = "212664662629";

export const websitePacks: WebsitePack[] = [
  {
    id: "landing",
    nameFr: "Landing Page",
    nameAr: "صفحة هبوط",
    descFr: "Une page unique percutante pour lancer votre produit ou capter des prospects.",
    descAr: "صفحة واحدة مؤثرة لإطلاق منتجك أو جذب العملاء المحتملين.",
    price: 2500,
    promoPrice: 1790,
    deliveryDays: 5,
    featuresFr: [
      "1 page design moderne",
      "Adapté mobile & tablette",
      "Formulaire de contact",
      "Bouton WhatsApp intégré",
      "SEO de base (Google)",
      "Certificat SSL (https)",
      "Hébergement 1 an inclus",
      "1 révision gratuite",
    ],
    featuresAr: [
      "صفحة واحدة بتصميم عصري",
      "متوافق مع الهاتف والأجهزة اللوحية",
      "نموذج اتصال",
      "زر واتساب مدمج",
      "تحسين محركات البحث الأساسي",
      "شهادة SSL (https)",
      "استضافة سنة مجانية",
      "مراجعة مجانية واحدة",
    ],
    color: "from-sky-500 to-blue-600",
    glow: "shadow-sky-500/20",
  },
  {
    id: "vitrine",
    nameFr: "Site Vitrine",
    nameAr: "موقع تعريفي",
    descFr: "Le site idéal pour présenter votre entreprise, vos services et rassurer vos clients.",
    descAr: "الموقع المثالي لتقديم شركتك وخدماتك وكسب ثقة عملائك.",
    price: 4500,
    promoPrice: 3490,
    deliveryDays: 10,
    featuresFr: [
      "Jusqu'à 5 pages",
      "Design personnalisé à votre image",
      "Adapté mobile & tablette",
      "Galerie photos",
      "Formulaire de contact + carte",
      "Bouton WhatsApp intégré",
      "SEO de base (Google)",
      "Hébergement + domaine 1 an",
      "2 révisions gratuites",
    ],
    featuresAr: [
      "حتى 5 صفحات",
      "تصميم مخصص يعكس هويتك",
      "متوافق مع الهاتف والأجهزة اللوحية",
      "معرض صور",
      "نموذج اتصال + خريطة",
      "زر واتساب مدمج",
      "تحسين محركات البحث الأساسي",
      "استضافة + نطاق لمدة سنة",
      "مراجعتان مجانيتان",
    ],
    popular: true,
    color: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/20",
  },
  {
    id: "vitrine-pro",
    nameFr: "Site Vitrine Premium",
    nameAr: "موقع تعريفي مميز",
    descFr: "Un site vitrine haut de gamme avec blog, multilingue et animations soignées.",
    descAr: "موقع تعريفي راقٍ مع مدونة ودعم متعدد اللغات ورسوم متحركة أنيقة.",
    price: 7900,
    promoPrice: 5990,
    deliveryDays: 15,
    featuresFr: [
      "Jusqu'à 10 pages",
      "Design premium + animations",
      "Multilingue FR / AR",
      "Blog intégré",
      "Espace admin (gestion contenu)",
      "SEO avancé + Google Analytics",
      "Témoignages clients",
      "Hébergement + domaine 1 an",
      "Email professionnel",
      "Révisions illimitées (30 jours)",
    ],
    featuresAr: [
      "حتى 10 صفحات",
      "تصميم مميز + رسوم متحركة",
      "متعدد اللغات فرنسي / عربي",
      "مدونة مدمجة",
      "لوحة تحكم (إدارة المحتوى)",
      "SEO متقدم + Google Analytics",
      "آراء العملاء",
      "استضافة + نطاق لمدة سنة",
      "بريد إلكتروني احترافي",
      "مراجعات غير محدودة (30 يومًا)",
    ],
    color: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/20",
  },
  {
    id: "reservation",
    nameFr: "Site de Réservation",
    nameAr: "موقع حجوزات",
    descFr: "Prise de rendez-vous et réservations en ligne pour salons, cliniques, riads…",
    descAr: "حجز المواعيد عبر الإنترنت للصالونات والعيادات والرياضات…",
    price: 9500,
    promoPrice: 7490,
    deliveryDays: 20,
    featuresFr: [
      "Calendrier de réservation en ligne",
      "Notifications WhatsApp / email",
      "Gestion des disponibilités",
      "Rappels automatiques clients",
      "Tableau de bord admin",
      "Adapté mobile & tablette",
      "SEO de base + Google Maps",
      "Hébergement + domaine 1 an",
      "Formation à l'utilisation incluse",
    ],
    featuresAr: [
      "تقويم حجز عبر الإنترنت",
      "إشعارات واتساب / بريد إلكتروني",
      "إدارة الأوقات المتاحة",
      "تذكيرات تلقائية للعملاء",
      "لوحة تحكم للمشرف",
      "متوافق مع الهاتف والأجهزة اللوحية",
      "SEO أساسي + خرائط جوجل",
      "استضافة + نطاق لمدة سنة",
      "تدريب على الاستخدام مشمول",
    ],
    color: "from-amber-500 to-orange-600",
    glow: "shadow-amber-500/20",
  },
  {
    id: "ecommerce",
    nameFr: "Boutique E-commerce",
    nameAr: "متجر إلكتروني",
    descFr: "Vendez en ligne : catalogue produits, panier, paiement et gestion des commandes.",
    descAr: "بِع عبر الإنترنت: كتالوج المنتجات، سلة الشراء، الدفع وإدارة الطلبات.",
    price: 12900,
    promoPrice: 9990,
    deliveryDays: 25,
    featuresFr: [
      "Catalogue produits illimité",
      "Panier + commandes en ligne",
      "Paiement à la livraison / CMI",
      "Gestion du stock",
      "Codes promo & soldes",
      "Tableau de bord des ventes",
      "Notifications WhatsApp commandes",
      "SEO avancé + Google Analytics",
      "Hébergement + domaine 1 an",
      "Formation à l'administration",
    ],
    featuresAr: [
      "كتالوج منتجات غير محدود",
      "سلة شراء + طلبات عبر الإنترنت",
      "الدفع عند الاستلام / CMI",
      "إدارة المخزون",
      "أكواد خصم وتخفيضات",
      "لوحة متابعة المبيعات",
      "إشعارات واتساب للطلبات",
      "SEO متقدم + Google Analytics",
      "استضافة + نطاق لمدة سنة",
      "تدريب على الإدارة",
    ],
    color: "from-rose-500 to-pink-600",
    glow: "shadow-rose-500/20",
  },
  {
    id: "surmesure",
    nameFr: "Application Web Sur Mesure",
    nameAr: "تطبيق ويب حسب الطلب",
    descFr: "Un outil web 100% adapté à votre métier : gestion, facturation, CRM, tableaux de bord…",
    descAr: "أداة ويب مصممة 100% لعملك: إدارة، فوترة، CRM، لوحات متابعة…",
    price: 19900,
    promoPrice: 15900,
    deliveryDays: 40,
    featuresFr: [
      "Analyse de vos besoins incluse",
      "Fonctionnalités 100% sur mesure",
      "Comptes utilisateurs & rôles",
      "Tableaux de bord & statistiques",
      "Export Excel / PDF automatisé",
      "API & intégrations (WhatsApp…)",
      "Sécurité renforcée",
      "Hébergement + domaine 1 an",
      "Support prioritaire 3 mois",
    ],
    featuresAr: [
      "تحليل احتياجاتك مشمول",
      "وظائف مصممة 100% حسب الطلب",
      "حسابات مستخدمين وصلاحيات",
      "لوحات متابعة وإحصائيات",
      "تصدير Excel / PDF تلقائي",
      "API وتكاملات (واتساب…)",
      "حماية معززة",
      "استضافة + نطاق لمدة سنة",
      "دعم ذو أولوية لمدة 3 أشهر",
    ],
    color: "from-cyan-500 to-teal-600",
    glow: "shadow-cyan-500/20",
  },
];

export const catalogOptions: CatalogOption[] = [
  // Domaine & hébergement
  { id: "domain", nameFr: "Nom de domaine .com / .ma (1 an)", nameAr: "اسم نطاق .com / .ma (سنة)", categoryFr: "Domaine & Hébergement", categoryAr: "النطاق والاستضافة", price: 250 },
  { id: "hosting-pro", nameFr: "Hébergement Pro rapide (1 an)", nameAr: "استضافة احترافية سريعة (سنة)", categoryFr: "Domaine & Hébergement", categoryAr: "النطاق والاستضافة", price: 600 },
  { id: "email-pro", nameFr: "Email professionnel (contact@votresite.com)", nameAr: "بريد إلكتروني احترافي", categoryFr: "Domaine & Hébergement", categoryAr: "النطاق والاستضافة", price: 300 },
  // Contenu & design
  { id: "extra-page", nameFr: "Page supplémentaire", nameAr: "صفحة إضافية", categoryFr: "Contenu & Design", categoryAr: "المحتوى والتصميم", price: 350 },
  { id: "logo", nameFr: "Création de logo professionnel", nameAr: "تصميم شعار احترافي", categoryFr: "Contenu & Design", categoryAr: "المحتوى والتصميم", price: 700 },
  { id: "copywriting", nameFr: "Rédaction de contenu (jusqu'à 10 pages)", nameAr: "كتابة المحتوى (حتى 10 صفحات)", categoryFr: "Contenu & Design", categoryAr: "المحتوى والتصميم", price: 1000 },
  { id: "multilang", nameFr: "Multilingue FR / AR / EN", nameAr: "متعدد اللغات فرنسي / عربي / إنجليزي", categoryFr: "Contenu & Design", categoryAr: "المحتوى والتصميم", price: 900 },
  { id: "blog", nameFr: "Blog intégré", nameAr: "مدونة مدمجة", categoryFr: "Contenu & Design", categoryAr: "المحتوى والتصميم", price: 800 },
  // Marketing & visibilité
  { id: "seo-advanced", nameFr: "SEO avancé (référencement Google)", nameAr: "SEO متقدم (تحسين محركات البحث)", categoryFr: "Marketing & Visibilité", categoryAr: "التسويق والظهور", price: 1200 },
  { id: "analytics", nameFr: "Google Analytics + Search Console", nameAr: "Google Analytics + Search Console", categoryFr: "Marketing & Visibilité", categoryAr: "التسويق والظهور", price: 400 },
  { id: "social", nameFr: "Intégration réseaux sociaux", nameAr: "ربط شبكات التواصل الاجتماعي", categoryFr: "Marketing & Visibilité", categoryAr: "التسويق والظهور", price: 300 },
  { id: "google-business", nameFr: "Fiche Google Business + Maps", nameAr: "صفحة Google Business + الخرائط", categoryFr: "Marketing & Visibilité", categoryAr: "التسويق والظهور", price: 350 },
  // Fonctionnalités avancées
  { id: "whatsapp", nameFr: "Intégration WhatsApp Business", nameAr: "تكامل واتساب للأعمال", categoryFr: "Fonctionnalités Avancées", categoryAr: "وظائف متقدمة", price: 250 },
  { id: "chatbot", nameFr: "Chatbot IA (assistant automatique)", nameAr: "روبوت دردشة بالذكاء الاصطناعي", categoryFr: "Fonctionnalités Avancées", categoryAr: "وظائف متقدمة", price: 1500 },
  { id: "payment", nameFr: "Paiement en ligne (CMI / PayPal)", nameAr: "الدفع عبر الإنترنت (CMI / PayPal)", categoryFr: "Fonctionnalités Avancées", categoryAr: "وظائف متقدمة", price: 1800 },
  { id: "booking-module", nameFr: "Module de réservation en ligne", nameAr: "وحدة حجز عبر الإنترنت", categoryFr: "Fonctionnalités Avancées", categoryAr: "وظائف متقدمة", price: 1500 },
  { id: "excel-export", nameFr: "Export Excel automatisé (rapports)", nameAr: "تصدير Excel تلقائي (تقارير)", categoryFr: "Fonctionnalités Avancées", categoryAr: "وظائف متقدمة", price: 900 },
  // Maintenance & accompagnement
  { id: "maintenance", nameFr: "Maintenance & mises à jour", nameAr: "صيانة وتحديثات", categoryFr: "Maintenance & Accompagnement", categoryAr: "الصيانة والمواكبة", price: 300, monthly: true },
  { id: "training", nameFr: "Formation à l'administration du site", nameAr: "تدريب على إدارة الموقع", categoryFr: "Maintenance & Accompagnement", categoryAr: "الصيانة والمواكبة", price: 500 },
  { id: "priority-support", nameFr: "Support prioritaire 7j/7", nameAr: "دعم ذو أولوية 7/7", categoryFr: "Maintenance & Accompagnement", categoryAr: "الصيانة والمواكبة", price: 400, monthly: true },
];

export function discountPercent(pack: WebsitePack): number {
  return Math.round((1 - pack.promoPrice / pack.price) * 100);
}

export function formatMAD(amount: number, language: "fr" | "ar"): string {
  const formatted = new Intl.NumberFormat("fr-MA").format(amount);
  return language === "fr" ? `${formatted} DH` : `${formatted} درهم`;
}
