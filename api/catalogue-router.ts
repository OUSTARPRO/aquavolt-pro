import { eq, asc } from "drizzle-orm";
import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { catalogueItems } from "@db/schema";

const defaultItems = [
  // Electricity
  {
    name: "Pack Électricité Basique",
    nameAr: "باقة الكهرباء الأساسية",
    category: "electricity" as const,
    plan: "basic" as const,
    price: 1500,
    originalPrice: null,
    features: ["Diagnostic électrique", "Réparation simple", "1 point lumineux", "Rapport d'intervention"],
    featuresAr: ["تشخيص كهربائي", "إصلاح بسيط", "نقطة إضاءة واحدة", "تقرير التدخل"],
    isPromo: false,
    isFeatured: false,
    promoLabel: null,
    promoLabelAr: null,
    sortOrder: 1,
  },
  {
    name: "Pack Électricité Standard",
    nameAr: "باقة الكهرباء القياسية",
    category: "electricity" as const,
    plan: "standard" as const,
    price: 4500,
    originalPrice: 5500,
    features: ["Tableau électrique complet", "Mise aux normes", "Jusqu'à 5 points lumineux", "Prises et interrupteurs", "Garantie 1 an"],
    featuresAr: ["لوحة كهربائية كاملة", "معايرة المعايير", "حتى 5 نقاط إضاءة", "مآخذ ومفاتيح", "ضمان سنة"],
    isPromo: true,
    isFeatured: true,
    promoLabel: "⭐ Populaire",
    promoLabelAr: "⭐ الأكثر طلباً",
    sortOrder: 2,
  },
  {
    name: "Pack Électricité Premium",
    nameAr: "باقة الكهرباء المتميزة",
    category: "electricity" as const,
    plan: "premium" as const,
    price: 8500,
    originalPrice: null,
    features: ["Installation complète", "Domotique & automatisation", "Tableau divisionnaire", "Éclairage LED design", "Borne de recharge EV", "Garantie 2 ans"],
    featuresAr: ["تركيب كامل", "دوموتيك وأتمتة", "لوحة فرعية", "إضاءة LED تصميمية", "شاحن سيارة كهربائية", "ضمان سنتين"],
    isPromo: false,
    isFeatured: false,
    promoLabel: null,
    promoLabelAr: null,
    sortOrder: 3,
  },
  // Plumbing
  {
    name: "Pack Plomberie Basique",
    nameAr: "باقة السباكة الأساسية",
    category: "plumbing" as const,
    plan: "basic" as const,
    price: 1200,
    originalPrice: null,
    features: ["Dépannage urgent", "Réparation fuite", "Remplacement robinet", "Intervention J+1"],
    featuresAr: ["إصلاح عاجل", "إصلاح تسرب", "استبدال صنبور", "تدخل اليوم التالي"],
    isPromo: false,
    isFeatured: false,
    promoLabel: null,
    promoLabelAr: null,
    sortOrder: 4,
  },
  {
    name: "Pack Plomberie Standard",
    nameAr: "باقة السباكة القياسية",
    category: "plumbing" as const,
    plan: "standard" as const,
    price: 3800,
    originalPrice: 4500,
    features: ["Installation sanitaire complète", "Chauffe-eau solaire", "Salle de bain clé en main", "Traitement eau", "Garantie 1 an"],
    featuresAr: ["تركيب صحي كامل", "سخان شمسي", "حمام متكامل", "معالجة المياه", "ضمان سنة"],
    isPromo: true,
    isFeatured: true,
    promoLabel: "🔥 Promo été",
    promoLabelAr: "🔥 عرض الصيف",
    sortOrder: 5,
  },
  {
    name: "Pack Plomberie Premium",
    nameAr: "باقة السباكة المتميزة",
    category: "plumbing" as const,
    plan: "premium" as const,
    price: 7200,
    originalPrice: null,
    features: ["Rénovation complète", "Chauffe-eau thermodynamique", "Adoucisseur d'eau", "Détection fuite intelligente", "Garantie 2 ans"],
    featuresAr: ["تجديد كامل", "سخان ثيرموديناميكي", "مرطب المياه", "كشف تسرب ذكي", "ضمان سنتين"],
    isPromo: false,
    isFeatured: false,
    promoLabel: null,
    promoLabelAr: null,
    sortOrder: 6,
  },
  // Pool
  {
    name: "Pack Piscine Classique",
    nameAr: "باقة المسبح الكلاسيكي",
    category: "pool" as const,
    plan: "basic" as const,
    price: 18000,
    originalPrice: null,
    features: ["Construction béton 20m²", "Pompe + filtre à sable", "Traitement chlore", "Escalier intégré", "Garantie structure 5 ans"],
    featuresAr: ["بناء خرساني 20م²", "مضخة + فلتر رملي", "معالجة بالكلور", "درج متكامل", "ضمان هيكل 5 سنوات"],
    isPromo: false,
    isFeatured: false,
    promoLabel: null,
    promoLabelAr: null,
    sortOrder: 7,
  },
  {
    name: "Pack Piscine Confort",
    nameAr: "باقة المسبح المريح",
    category: "pool" as const,
    plan: "standard" as const,
    price: 32000,
    originalPrice: 38000,
    features: ["Construction 30m² sur mesure", "Pompe à chaleur", "Traitement sel électrolyse", "Éclairage LED sous-marin", "Robot nettoyeur", "Garantie 7 ans"],
    featuresAr: ["بناء 30م² مخصص", "مضخة حرارية", "معالجة ملح الإلكتروليز", "إضاءة LED تحت الماء", "روبوت تنظيف", "ضمان 7 سنوات"],
    isPromo: true,
    isFeatured: true,
    promoLabel: "💎 Best-seller",
    promoLabelAr: "💎 الأكثر مبيعاً",
    sortOrder: 8,
  },
  {
    name: "Pack Piscine Prestige",
    nameAr: "باقة المسبح الفاخر",
    category: "pool" as const,
    plan: "premium" as const,
    price: 65000,
    originalPrice: null,
    features: ["Piscine 50m² sur mesure", "Débordement ou miroir", "Domotique piscine", "Spa intégré", "Couverture automatique", "Garantie 10 ans"],
    featuresAr: ["مسبح 50م² مخصص", "تدفق حر أو مرآة", "دوموتيك المسبح", "جاكوزي متكامل", "غطاء أوتوماتيكي", "ضمان 10 سنوات"],
    isPromo: false,
    isFeatured: false,
    promoLabel: null,
    promoLabelAr: null,
    sortOrder: 9,
  },
  // Maintenance
  {
    name: "Contrat Maintenance Essentiel",
    nameAr: "عقد الصيانة الأساسي",
    category: "maintenance" as const,
    plan: "basic" as const,
    price: 2400,
    originalPrice: null,
    features: ["2 visites/an", "Vérification électrique", "Contrôle plomberie", "Rapport de maintenance", "Hotline 5j/7"],
    featuresAr: ["زيارتان/سنة", "فحص كهربائي", "مراقبة السباكة", "تقرير الصيانة", "خط ساخن 5 أيام/7"],
    isPromo: false,
    isFeatured: false,
    promoLabel: null,
    promoLabelAr: null,
    sortOrder: 10,
  },
  {
    name: "Contrat Maintenance Pro",
    nameAr: "عقد الصيانة الاحترافي",
    category: "maintenance" as const,
    plan: "standard" as const,
    price: 4800,
    originalPrice: 5800,
    features: ["4 visites/an", "Tous corps de métier", "Pièces de rechange incluses", "Urgence 24h/24", "Tableau de bord digital", "Priorité intervention"],
    featuresAr: ["4 زيارات/سنة", "جميع الأعمال", "قطع غيار مشمولة", "طوارئ 24/24", "لوحة رقمية", "أولوية التدخل"],
    isPromo: true,
    isFeatured: true,
    promoLabel: "🏆 Recommandé",
    promoLabelAr: "🏆 موصى به",
    sortOrder: 11,
  },
  {
    name: "Contrat Maintenance Premium",
    nameAr: "عقد الصيانة المتميز",
    category: "maintenance" as const,
    plan: "premium" as const,
    price: 9600,
    originalPrice: null,
    features: ["Visites illimitées", "Tous travaux couverts", "Remplacement équipements", "Technicien dédié", "Urgence 1h garantie", "Rapport mensuel"],
    featuresAr: ["زيارات غير محدودة", "جميع الأعمال مشمولة", "استبدال المعدات", "تقني مخصص", "طوارئ خلال ساعة", "تقرير شهري"],
    isPromo: false,
    isFeatured: false,
    promoLabel: null,
    promoLabelAr: null,
    sortOrder: 12,
  },
];

export const catalogueRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    const items = await db
      .select()
      .from(catalogueItems)
      .orderBy(asc(catalogueItems.sortOrder));

    if (items.length === 0) {
      await db.insert(catalogueItems).values(defaultItems);
      return await db
        .select()
        .from(catalogueItems)
        .orderBy(asc(catalogueItems.sortOrder));
    }

    return items;
  }),

  create: adminQuery
    .input(
      z.object({
        name: z.string().min(1),
        nameAr: z.string().optional(),
        category: z.enum(["electricity", "plumbing", "pool", "maintenance"]),
        plan: z.enum(["basic", "standard", "premium"]),
        price: z.number().int().positive(),
        originalPrice: z.number().int().positive().optional(),
        features: z.array(z.string()),
        featuresAr: z.array(z.string()).optional(),
        isPromo: z.boolean().default(false),
        isFeatured: z.boolean().default(false),
        promoLabel: z.string().optional(),
        promoLabelAr: z.string().optional(),
        sortOrder: z.number().int().default(0),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(catalogueItems).values({
        name: input.name,
        nameAr: input.nameAr || null,
        category: input.category,
        plan: input.plan,
        price: input.price,
        originalPrice: input.originalPrice || null,
        features: input.features,
        featuresAr: input.featuresAr || null,
        isPromo: input.isPromo,
        isFeatured: input.isFeatured,
        promoLabel: input.promoLabel || null,
        promoLabelAr: input.promoLabelAr || null,
        sortOrder: input.sortOrder,
      });
      return { success: true };
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1).optional(),
        nameAr: z.string().optional(),
        price: z.number().int().positive().optional(),
        originalPrice: z.number().int().positive().nullable().optional(),
        features: z.array(z.string()).optional(),
        featuresAr: z.array(z.string()).optional(),
        isPromo: z.boolean().optional(),
        isFeatured: z.boolean().optional(),
        promoLabel: z.string().nullable().optional(),
        promoLabelAr: z.string().nullable().optional(),
        sortOrder: z.number().int().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...rest } = input;
      const updateData: Record<string, unknown> = {};
      for (const [key, val] of Object.entries(rest)) {
        if (val !== undefined) updateData[key] = val;
      }
      await db
        .update(catalogueItems)
        .set(updateData)
        .where(eq(catalogueItems.id, id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(catalogueItems).where(eq(catalogueItems.id, input.id));
      return { success: true };
    }),
});
