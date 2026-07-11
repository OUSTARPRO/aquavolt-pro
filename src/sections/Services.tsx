import { useLanguage } from "@/hooks/useLanguage";
import {
  ArrowRight,
  CheckCircle2,
  FileSpreadsheet,
  Globe2,
  ShoppingBag,
  Store,
  Wrench,
} from "lucide-react";
import { Link } from "react-router";

const webPackages = [
  {
    icon: Globe2,
    color: "from-sky-500 to-indigo-600",
    nameFr: "Site Vitrine Starter",
    nameAr: "موقع تعريفي Starter",
    oldPrice: 4500,
    promoPrice: 3200,
    promoFr: "Promo lancement",
    promoAr: "عرض الانطلاقة",
    featuresFr: [
      "Jusqu'a 5 pages modernes",
      "Design responsive mobile + desktop",
      "Formulaire de contact WhatsApp",
      "Optimisation SEO de base",
    ],
    featuresAr: [
      "حتى 5 صفحات عصرية",
      "تصميم متجاوب للهاتف والحاسوب",
      "نموذج تواصل مع واتساب",
      "تحسين SEO أساسي",
    ],
  },
  {
    icon: ShoppingBag,
    color: "from-emerald-500 to-teal-600",
    nameFr: "Business Pro",
    nameAr: "باقة Business Pro",
    oldPrice: 7800,
    promoPrice: 5900,
    promoFr: "Promo du mois",
    promoAr: "عرض الشهر",
    featuresFr: [
      "Jusqu'a 12 pages + blog",
      "Securite, sauvegardes et analytics",
      "Formation manager (2h)",
      "1 mois de gestion incluse",
    ],
    featuresAr: [
      "حتى 12 صفحة مع مدونة",
      "حماية ونسخ احتياطي وتحليلات",
      "تدريب المدير (ساعتان)",
      "شهر إدارة مجاني",
    ],
  },
  {
    icon: Store,
    color: "from-fuchsia-500 to-purple-600",
    nameFr: "E-commerce Manager",
    nameAr: "متجر إلكتروني Manager",
    oldPrice: 12900,
    promoPrice: 9900,
    promoFr: "Promo flash",
    promoAr: "عرض سريع",
    featuresFr: [
      "Catalogue produits + paiements",
      "Gestion commandes et livraisons",
      "Dashboard manager simplifie",
      "Support prioritaire 30 jours",
    ],
    featuresAr: [
      "كتالوج منتجات مع الدفع",
      "إدارة الطلبات والتوصيل",
      "لوحة تحكم مدير مبسطة",
      "دعم أولوية لمدة 30 يوم",
    ],
  },
  {
    icon: FileSpreadsheet,
    color: "from-amber-500 to-orange-600",
    nameFr: "Automation Excel Suite",
    nameAr: "باقة Excel Automation",
    oldPrice: 6900,
    promoPrice: 4900,
    promoFr: "Prix raisonnable",
    promoAr: "سعر مناسب",
    featuresFr: [
      "Exports Excel automatiques",
      "Tableaux de suivi (ventes, leads, stock)",
      "Alertes WhatsApp sur objectifs",
      "Mise en place en 5 jours",
    ],
    featuresAr: [
      "تصدير Excel تلقائي",
      "جداول متابعة للمبيعات والعملاء والمخزون",
      "تنبيهات واتساب للأهداف",
      "تنفيذ خلال 5 أيام",
    ],
  },
];

const extras = [
  {
    icon: Wrench,
    nameFr: "Gestion mensuelle du site",
    nameAr: "إدارة شهرية للموقع",
    priceFr: "690 MAD / mois",
    priceAr: "690 درهم / شهر",
    promoFr: "2 mois = -20%",
    promoAr: "شهران = خصم 20%",
  },
  {
    icon: FileSpreadsheet,
    nameFr: "Pack Excel avance",
    nameAr: "باقة Excel المتقدمة",
    priceFr: "1 200 MAD (one-shot)",
    priceAr: "1200 درهم (مرة واحدة)",
    promoFr: "Offert avec E-commerce + Manager",
    promoAr: "مجاني مع باقة المتجر + الإدارة",
  },
  {
    icon: Globe2,
    nameFr: "Nom de domaine + hebergement",
    nameAr: "الدومين + الاستضافة",
    priceFr: "900 MAD / an",
    priceAr: "900 درهم / سنة",
    promoFr: "1ere annee a 690 MAD",
    promoAr: "السنة الأولى 690 درهم",
  },
];

function formatMAD(amount: number) {
  return `${new Intl.NumberFormat("fr-FR").format(amount)} MAD`;
}

export default function Services() {
  const { language, dir } = useLanguage();
  const isFr = language === "fr";

  return (
    <section id="services" className="py-24 bg-slate-950 relative" dir={dir}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
            {isFr ? "Catalogue complet" : "كتالوج كامل"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-4">
            {isFr ? "Nos Packs Sites Web" : "باقات مواقع الويب"}
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            {isFr
              ? "Des offres avec options manager et automatisation Excel. Prix raisonnables avec promos actives."
              : "عروض متكاملة مع خيارات المدير وأتمتة Excel بأسعار مناسبة وعروض نشطة."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {webPackages.map((pack) => {
            const discount = Math.round(
              ((pack.oldPrice - pack.promoPrice) / pack.oldPrice) * 100
            );

            return (
              <article
                key={pack.nameFr}
                className="group rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition-all hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/10"
              >
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${pack.color}`}
                  >
                    <pack.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                    -{discount}% • {isFr ? pack.promoFr : pack.promoAr}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {isFr ? pack.nameFr : pack.nameAr}
                </h3>

                <div className="mb-4">
                  <div className="text-slate-500 line-through text-sm">
                    {formatMAD(pack.oldPrice)}
                  </div>
                  <div className="text-2xl font-bold text-emerald-400">
                    {formatMAD(pack.promoPrice)}
                  </div>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {(isFr ? pack.featuresFr : pack.featuresAr).map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-slate-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/devis"
                  className="inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  {isFr ? "Demander cette offre" : "طلب هذا العرض"}
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mt-14">
          <h3 className="text-2xl font-bold text-white mb-2">
            {isFr ? "Options manager & Excel" : "خيارات المدير و Excel"}
          </h3>
          <p className="text-slate-400 mb-6">
            {isFr
              ? "Ajoutez des modules complets selon votre budget."
              : "أضف وحدات متكاملة حسب ميزانيتك."}
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {extras.map((option) => (
              <div
                key={option.nameFr}
                className="rounded-xl border border-white/10 bg-slate-900/50 p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <option.icon className="w-4 h-4 text-emerald-400" />
                  <p className="font-semibold text-white text-sm">
                    {isFr ? option.nameFr : option.nameAr}
                  </p>
                </div>
                <p className="text-emerald-300 font-semibold text-sm mb-1">
                  {isFr ? option.priceFr : option.priceAr}
                </p>
                <p className="text-slate-400 text-xs">
                  {isFr ? option.promoFr : option.promoAr}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
