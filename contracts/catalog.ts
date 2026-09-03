export const PRODUCT_CATEGORIES = ["pool", "plumbing", "electricity"] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export type CatalogProduct = {
  id: string;
  category: ProductCategory;
  nameFr: string;
  nameAr: string;
  descriptionFr: string;
  descriptionAr: string;
  unitFr: string;
  unitAr: string;
  priceMad: number;
};

export const CATALOG: CatalogProduct[] = [
  {
    id: "chlore-choc-5kg",
    category: "pool",
    nameFr: "Chlore choc",
    nameAr: "كلور صدمة",
    descriptionFr: "Traitement choc pour eau trouble ou après orage. Granulés.",
    descriptionAr: "معالجة صادمة للماء العكر. حبيبات.",
    unitFr: "seau 5 kg",
    unitAr: "وعاء 5 كغ",
    priceMad: 180,
  },
  {
    id: "chlore-lent-5kg",
    category: "pool",
    nameFr: "Chlore lent (galets)",
    nameAr: "كلور بطيء (أقراص)",
    descriptionFr: "Entretien quotidien. Galets à dissolution lente.",
    descriptionAr: "صيانة يومية. أقراص بذوبان بطيء.",
    unitFr: "seau 5 kg",
    unitAr: "وعاء 5 كغ",
    priceMad: 160,
  },
  {
    id: "ph-minus-5kg",
    category: "pool",
    nameFr: "pH Minus",
    nameAr: "مخفض الحموضة",
    descriptionFr: "Abaisse le pH de l'eau de piscine.",
    descriptionAr: "يخفض درجة حموضة ماء المسبح.",
    unitFr: "seau 5 kg",
    unitAr: "وعاء 5 كغ",
    priceMad: 90,
  },
  {
    id: "ph-plus-5kg",
    category: "pool",
    nameFr: "pH Plus",
    nameAr: "رافع الحموضة",
    descriptionFr: "Remonte le pH de l'eau de piscine.",
    descriptionAr: "يرفع درجة حموضة ماء المسبح.",
    unitFr: "seau 5 kg",
    unitAr: "وعاء 5 كغ",
    priceMad: 95,
  },
  {
    id: "algicide-5l",
    category: "pool",
    nameFr: "Algicide",
    nameAr: "مضاد الطحالب",
    descriptionFr: "Prévient et traite les algues vertes.",
    descriptionAr: "يمنع ويعالج الطحالب الخضراء.",
    unitFr: "bidon 5 L",
    unitAr: "علبة 5 لتر",
    priceMad: 120,
  },
  {
    id: "floculant-1l",
    category: "pool",
    nameFr: "Floculant",
    nameAr: "مندف",
    descriptionFr: "Clarifie l'eau et aide le filtre à retenir les particules.",
    descriptionAr: "يصفي الماء ويساعد المرشح على احتجاز الجزيئات.",
    unitFr: "flacon 1 L",
    unitAr: "قارورة 1 لتر",
    priceMad: 55,
  },
  {
    id: "brome-5kg",
    category: "pool",
    nameFr: "Brome",
    nameAr: "بروم",
    descriptionFr: "Désinfectant alternatif au chlore, idéal spa et eau chaude.",
    descriptionAr: "مطهر بديل للكلور، مناسب للسبا والماء الساخن.",
    unitFr: "seau 5 kg",
    unitAr: "وعاء 5 كغ",
    priceMad: 280,
  },
  {
    id: "kit-analyse",
    category: "pool",
    nameFr: "Kit d'analyse eau",
    nameAr: "عدة تحليل الماء",
    descriptionFr: "Pastilles pH + chlore pour contrôle hebdomadaire.",
    descriptionAr: "أقراص لقياس الحموضة والكلور أسبوعياً.",
    unitFr: "boîte",
    unitAr: "علبة",
    priceMad: 75,
  },
  {
    id: "sel-electrolyse-25kg",
    category: "pool",
    nameFr: "Sel pour électrolyse",
    nameAr: "ملح للتحليل الكهربائي",
    descriptionFr: "Sel raffiné pour électrolyseurs de piscine.",
    descriptionAr: "ملح مكرر لأجهزة التحليل الكهربائي.",
    unitFr: "sac 25 kg",
    unitAr: "كيس 25 كغ",
    priceMad: 85,
  },
  {
    id: "cartouche-filtre",
    category: "pool",
    nameFr: "Cartouche de filtre",
    nameAr: "خرطوشة فلتر",
    descriptionFr: "Cartouche de rechange pour filtre à cartouche.",
    descriptionAr: "خرطوشة بديلة لفلتر الخرطوشة.",
    unitFr: "unité",
    unitAr: "وحدة",
    priceMad: 150,
  },
  {
    id: "stabilisant-5kg",
    category: "pool",
    nameFr: "Stabilisant chlore",
    nameAr: "مثبت الكلور",
    descriptionFr: "Protège le chlore contre les UV.",
    descriptionAr: "يحمي الكلور من الأشعة فوق البنفسجية.",
    unitFr: "seau 5 kg",
    unitAr: "وعاء 5 كغ",
    priceMad: 140,
  },
  {
    id: "anti-calcaire-1l",
    category: "pool",
    nameFr: "Anti-calcaire",
    nameAr: "مضاد الكلس",
    descriptionFr: "Limite les dépôts de calcaire sur parois et équipements.",
    descriptionAr: "يحد من ترسب الكلس على الجدران والمعدات.",
    unitFr: "flacon 1 L",
    unitAr: "قارورة 1 لتر",
    priceMad: 70,
  },
  {
    id: "silicone-sanitaire",
    category: "plumbing",
    nameFr: "Silicone sanitaire",
    nameAr: "سيليكون صحي",
    descriptionFr: "Joint étanche pour salles de bain et piscines.",
    descriptionAr: "مانع تسرب للحمامات والمسابح.",
    unitFr: "cartouche",
    unitAr: "خرطوشة",
    priceMad: 45,
  },
  {
    id: "teflon",
    category: "plumbing",
    nameFr: "Ruban téflon",
    nameAr: "شريط تيفلون",
    descriptionFr: "Étanchéité des filetages sanitaires.",
    descriptionAr: "إحكام خيوط التوصيلات الصحية.",
    unitFr: "rouleau",
    unitAr: "لفة",
    priceMad: 15,
  },
  {
    id: "flexible-50",
    category: "plumbing",
    nameFr: "Flexible sanitaire 50 cm",
    nameAr: "خرطوم صحي 50 سم",
    descriptionFr: "Flexible inox pour robinetterie.",
    descriptionAr: "خرطوم ستانلس للصنابير.",
    unitFr: "unité",
    unitAr: "وحدة",
    priceMad: 80,
  },
  {
    id: "deboucheur",
    category: "plumbing",
    nameFr: "Déboucheur canalisation",
    nameAr: "مفتح المجاري",
    descriptionFr: "Gel déboucheur pour siphons et canalisations.",
    descriptionAr: "جل لفتح السيفونات والقنوات.",
    unitFr: "flacon 1 L",
    unitAr: "قارورة 1 لتر",
    priceMad: 40,
  },
  {
    id: "led-12w",
    category: "electricity",
    nameFr: "Ampoule LED 12W",
    nameAr: "مصباح LED 12 واط",
    descriptionFr: "Éclairage économique E27, lumière neutre.",
    descriptionAr: "إضاءة اقتصادية E27، ضوء محايد.",
    unitFr: "unité",
    unitAr: "وحدة",
    priceMad: 35,
  },
  {
    id: "isolant",
    category: "electricity",
    nameFr: "Ruban isolant",
    nameAr: "شريط عازل",
    descriptionFr: "Ruban PVC pour connexions électriques.",
    descriptionAr: "شريط PVC للتوصيلات الكهربائية.",
    unitFr: "rouleau",
    unitAr: "لفة",
    priceMad: 12,
  },
  {
    id: "disjoncteur-16a",
    category: "electricity",
    nameFr: "Disjoncteur 16A",
    nameAr: "قاطع 16 أمبير",
    descriptionFr: "Protection de circuit 16A, rail DIN.",
    descriptionAr: "حماية دائرة 16 أمبير، سكة DIN.",
    unitFr: "unité",
    unitAr: "وحدة",
    priceMad: 55,
  },
];

export const CATALOG_BY_ID = Object.fromEntries(CATALOG.map((p) => [p.id, p])) as Record<
  string,
  CatalogProduct
>;

export type OrderLineInput = {
  productId: string;
  quantity: number;
};

export type PricedOrderLine = {
  productId: string;
  nameFr: string;
  nameAr: string;
  unitFr: string;
  unitAr: string;
  quantity: number;
  unitPriceMad: number;
  lineTotalMad: number;
};

export function computeOrderLines(items: OrderLineInput[]): {
  lines: PricedOrderLine[];
  totalMad: number;
} {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("EMPTY_CART");
  }

  const merged = new Map<string, number>();
  for (const item of items) {
    if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99) {
      throw new Error("INVALID_QUANTITY");
    }
    const product = CATALOG_BY_ID[item.productId];
    if (!product) {
      throw new Error("UNKNOWN_PRODUCT");
    }
    merged.set(item.productId, (merged.get(item.productId) ?? 0) + item.quantity);
  }

  const lines: PricedOrderLine[] = [];
  let totalMad = 0;
  for (const [productId, quantity] of merged) {
    const product = CATALOG_BY_ID[productId];
    if (!product) {
      throw new Error("UNKNOWN_PRODUCT");
    }
    if (quantity > 99) {
      throw new Error("INVALID_QUANTITY");
    }
    const lineTotalMad = product.priceMad * quantity;
    totalMad += lineTotalMad;
    lines.push({
      productId,
      nameFr: product.nameFr,
      nameAr: product.nameAr,
      unitFr: product.unitFr,
      unitAr: product.unitAr,
      quantity,
      unitPriceMad: product.priceMad,
      lineTotalMad,
    });
  }

  return { lines, totalMad };
}
