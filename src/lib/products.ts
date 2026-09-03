export type ProductCategory = "pool" | "electricity" | "plumbing";

export interface Product {
  id: string;
  nameFr: string;
  nameAr: string;
  descFr: string;
  descAr: string;
  category: ProductCategory;
  /** Prix indicatif en dirhams (MAD) */
  price: number;
}

export const products: Product[] = [
  // --- Piscine ---
  {
    id: "chlore-galets",
    nameFr: "Chlore multifonction galets 5 kg",
    nameAr: "أقراص الكلور متعدد الوظائف 5 كغ",
    descFr: "Désinfection longue durée, galets 250 g pour skimmer.",
    descAr: "تعقيم طويل الأمد، أقراص 250 غ للسكيمر.",
    category: "pool",
    price: 350,
  },
  {
    id: "chlore-choc",
    nameFr: "Chlore choc granulés 5 kg",
    nameAr: "كلور صادم حبيبات 5 كغ",
    descFr: "Traitement choc rapide pour rattraper une eau verte.",
    descAr: "معالجة صادمة سريعة لاستعادة صفاء الماء الأخضر.",
    category: "pool",
    price: 320,
  },
  {
    id: "ph-moins",
    nameFr: "pH Moins poudre 5 kg",
    nameAr: "مسحوق خافض الحموضة pH- (5 كغ)",
    descFr: "Corrige un pH trop élevé pour une eau équilibrée.",
    descAr: "يصحح درجة الحموضة المرتفعة لماء متوازن.",
    category: "pool",
    price: 180,
  },
  {
    id: "anti-algues",
    nameFr: "Anti-algues liquide 5 L",
    nameAr: "مضاد الطحالب سائل 5 لتر",
    descFr: "Prévient et élimine les algues, eau cristalline.",
    descAr: "يمنع ويزيل الطحالب للحصول على ماء صافٍ.",
    category: "pool",
    price: 220,
  },
  {
    id: "floculant",
    nameFr: "Floculant clarifiant 5 L",
    nameAr: "مصفّي التعكر (فلوكولانت) 5 لتر",
    descFr: "Clarifie l'eau trouble et améliore la filtration.",
    descAr: "يصفّي الماء العكر ويحسّن الترشيح.",
    category: "pool",
    price: 150,
  },
  {
    id: "kit-entretien",
    nameFr: "Kit d'entretien piscine",
    nameAr: "طقم صيانة المسبح",
    descFr: "Épuisette, brosse et manche télescopique.",
    descAr: "شبكة، فرشاة وعصا تلسكوبية.",
    category: "pool",
    price: 450,
  },
  {
    id: "bandelettes-test",
    nameFr: "Bandelettes de test pH/Chlore (x50)",
    nameAr: "شرائط قياس pH والكلور (50 شريط)",
    descFr: "Contrôle rapide de la qualité de l'eau.",
    descAr: "فحص سريع لجودة الماء.",
    category: "pool",
    price: 90,
  },
  {
    id: "sable-filtration",
    nameFr: "Sable de filtration 25 kg",
    nameAr: "رمل الترشيح 25 كغ",
    descFr: "Sable calibré pour filtre à sable de piscine.",
    descAr: "رمل معاير لفلتر الرمل الخاص بالمسبح.",
    category: "pool",
    price: 120,
  },
  // --- Électricité ---
  {
    id: "disjoncteur-differentiel",
    nameFr: "Disjoncteur différentiel 30 mA",
    nameAr: "قاطع تفاضلي 30 مللي أمبير",
    descFr: "Protection des personnes contre les fuites de courant.",
    descAr: "حماية الأشخاص من تسربات التيار الكهربائي.",
    category: "electricity",
    price: 280,
  },
  {
    id: "spots-led",
    nameFr: "Spots LED encastrables (lot de 10)",
    nameAr: "سبوتات LED مدمجة (طقم 10)",
    descFr: "Éclairage moderne et économique pour intérieur.",
    descAr: "إضاءة عصرية واقتصادية للداخل.",
    category: "electricity",
    price: 250,
  },
  {
    id: "projecteur-led",
    nameFr: "Projecteur LED 50 W étanche",
    nameAr: "كشاف LED مقاوم للماء 50 واط",
    descFr: "Idéal jardin, façade et abords de piscine (IP65).",
    descAr: "مثالي للحديقة والواجهة ومحيط المسبح (IP65).",
    category: "electricity",
    price: 150,
  },
  {
    id: "cable-electrique",
    nameFr: "Câble électrique 2,5 mm² (100 m)",
    nameAr: "كابل كهربائي 2.5 ملم² (لفة 100 متر)",
    descFr: "Couronne de câble souple pour circuits prises.",
    descAr: "لفة كابل مرن لدوائر المقابس.",
    category: "electricity",
    price: 480,
  },
  {
    id: "multiprise-parafoudre",
    nameFr: "Multiprise parafoudre 5 prises",
    nameAr: "مشترك كهربائي مضاد للصواعق (5 مقابس)",
    descFr: "Protège vos appareils contre les surtensions.",
    descAr: "يحمي أجهزتك من ارتفاع التوتر الكهربائي.",
    category: "electricity",
    price: 120,
  },
  // --- Plomberie ---
  {
    id: "chauffe-eau",
    nameFr: "Chauffe-eau électrique 50 L",
    nameAr: "سخان ماء كهربائي 50 لتر",
    descFr: "Cuve émaillée, résistance blindée, garantie constructeur.",
    descAr: "خزان مطلي بالمينا، مقاومة مدرعة، ضمان المصنع.",
    category: "plumbing",
    price: 1590,
  },
  {
    id: "mitigeur-lavabo",
    nameFr: "Robinet mitigeur lavabo",
    nameAr: "خلاط مغسلة",
    descFr: "Mitigeur chromé, cartouche céramique.",
    descAr: "خلاط مطلي بالكروم، خرطوشة سيراميك.",
    category: "plumbing",
    price: 350,
  },
  {
    id: "flexible-douche",
    nameFr: "Flexible de douche inox",
    nameAr: "خرطوم دش من الفولاذ المقاوم للصدأ",
    descFr: "Flexible renforcé 1,5 m, raccords universels.",
    descAr: "خرطوم مقوى 1.5 متر، وصلات عالمية.",
    category: "plumbing",
    price: 80,
  },
  {
    id: "surpresseur",
    nameFr: "Surpresseur 24 L",
    nameAr: "مضخة ضغط الماء 24 لتر",
    descFr: "Augmente la pression d'eau dans toute la maison.",
    descAr: "يرفع ضغط الماء في جميع أنحاء المنزل.",
    category: "plumbing",
    price: 1250,
  },
  {
    id: "kit-joints",
    nameFr: "Kit joints & raccords universels",
    nameAr: "طقم حلقات ووصلات عالمية",
    descFr: "Assortiment complet pour petites réparations.",
    descAr: "تشكيلة كاملة للإصلاحات الصغيرة.",
    category: "plumbing",
    price: 60,
  },
];
