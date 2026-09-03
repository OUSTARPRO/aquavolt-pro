import { Zap, Droplets, Waves, Wrench, type LucideIcon } from "lucide-react";

export type ProductCategory =
  | "pool"
  | "electricity"
  | "plumbing"
  | "maintenance";

export interface Product {
  id: string;
  category: ProductCategory;
  nameFr: string;
  nameAr: string;
  descFr: string;
  descAr: string;
  unitFr: string;
  unitAr: string;
  price: number;
}

export const categoryMeta: Record<
  ProductCategory,
  { icon: LucideIcon; color: string; bg: string }
> = {
  pool: {
    icon: Waves,
    color: "text-emerald-400",
    bg: "from-emerald-500 to-teal-600",
  },
  electricity: {
    icon: Zap,
    color: "text-amber-400",
    bg: "from-amber-500 to-orange-600",
  },
  plumbing: {
    icon: Droplets,
    color: "text-sky-400",
    bg: "from-sky-500 to-blue-600",
  },
  maintenance: {
    icon: Wrench,
    color: "text-violet-400",
    bg: "from-violet-500 to-purple-600",
  },
};

export const products: Product[] = [
  // Piscine
  {
    id: "chlore-choc",
    category: "pool",
    nameFr: "Chlore choc",
    nameAr: "كلور صدمة",
    descFr: "Traitement choc rapide pour eau trouble ou verte.",
    descAr: "معالجة صدمة سريعة للمياه العكرة أو الخضراء.",
    unitFr: "seau 5 kg",
    unitAr: "دلو 5 كغ",
    price: 220,
  },
  {
    id: "galets-chlore",
    category: "pool",
    nameFr: "Galets de chlore lent",
    nameAr: "أقراص كلور بطيء",
    descFr: "Désinfection longue durée pour l'entretien courant.",
    descAr: "تعقيم طويل الأمد للصيانة المعتادة.",
    unitFr: "seau 5 kg",
    unitAr: "دلو 5 كغ",
    price: 250,
  },
  {
    id: "ph-moins",
    category: "pool",
    nameFr: "Correcteur pH Moins",
    nameAr: "مصحح درجة الحموضة",
    descFr: "Régule le pH de l'eau pour un confort optimal.",
    descAr: "ينظم درجة حموضة الماء لراحة مثالية.",
    unitFr: "bidon 5 L",
    unitAr: "عبوة 5 ل",
    price: 90,
  },
  {
    id: "anti-algues",
    category: "pool",
    nameFr: "Anti-algues concentré",
    nameAr: "مضاد الطحالب المركز",
    descFr: "Prévient et élimine la formation d'algues.",
    descAr: "يمنع ويزيل تكوّن الطحالب.",
    unitFr: "bidon 3 L",
    unitAr: "عبوة 3 ل",
    price: 130,
  },
  // Électricité
  {
    id: "disjoncteur",
    category: "electricity",
    nameFr: "Disjoncteur différentiel 30 mA",
    nameAr: "قاطع تفاضلي 30 مي أمبير",
    descFr: "Protection des personnes contre les fuites de courant.",
    descAr: "حماية الأشخاص من تسربات التيار.",
    unitFr: "unité",
    unitAr: "وحدة",
    price: 180,
  },
  {
    id: "ampoule-led",
    category: "electricity",
    nameFr: "Ampoule LED 9W",
    nameAr: "مصباح LED 9 واط",
    descFr: "Éclairage économique, blanc chaud, longue durée.",
    descAr: "إضاءة اقتصادية، أبيض دافئ، طويلة العمر.",
    unitFr: "lot de 10",
    unitAr: "علبة 10",
    price: 160,
  },
  {
    id: "cable-electrique",
    category: "electricity",
    nameFr: "Câble électrique 2,5 mm²",
    nameAr: "كابل كهربائي 2.5 مم²",
    descFr: "Câble souple pour installations domestiques.",
    descAr: "كابل مرن للتركيبات المنزلية.",
    unitFr: "rouleau 100 m",
    unitAr: "لفة 100 م",
    price: 320,
  },
  // Plomberie
  {
    id: "flexible-douche",
    category: "plumbing",
    nameFr: "Flexible de douche inox",
    nameAr: "خرطوم دش من الستانلس",
    descFr: "Flexible anti-torsion résistant au calcaire.",
    descAr: "خرطوم مقاوم للالتواء والكلس.",
    unitFr: "unité",
    unitAr: "وحدة",
    price: 70,
  },
  {
    id: "kit-joints",
    category: "plumbing",
    nameFr: "Kit de joints d'étanchéité",
    nameAr: "طقم حشوات مانعة للتسرب",
    descFr: "Assortiment de joints pour robinetterie et raccords.",
    descAr: "تشكيلة حشوات للحنفيات والوصلات.",
    unitFr: "kit",
    unitAr: "طقم",
    price: 45,
  },
  {
    id: "mitigeur",
    category: "plumbing",
    nameFr: "Mitigeur lavabo",
    nameAr: "خلاط مغسلة",
    descFr: "Mitigeur monocommande, finition chromée.",
    descAr: "خلاط بمقبض واحد، تشطيب كروم.",
    unitFr: "unité",
    unitAr: "وحدة",
    price: 260,
  },
  // Maintenance
  {
    id: "kit-entretien-piscine",
    category: "maintenance",
    nameFr: "Kit d'entretien piscine",
    nameAr: "طقم صيانة المسبح",
    descFr: "Épuisette, brosse et manche télescopique.",
    descAr: "شبكة، فرشاة ومقبض تلسكوبي.",
    unitFr: "kit",
    unitAr: "طقم",
    price: 340,
  },
  {
    id: "cartouche-filtre",
    category: "maintenance",
    nameFr: "Cartouche de filtration",
    nameAr: "خرطوشة الترشيح",
    descFr: "Cartouche de rechange pour filtre à cartouche.",
    descAr: "خرطوشة بديلة لفلتر الخرطوشة.",
    unitFr: "unité",
    unitAr: "وحدة",
    price: 110,
  },
];
