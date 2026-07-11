import { useMemo } from "react";
import { Link } from "react-router";
import { BadgePercent, CheckCircle2, Download, Sparkles } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";

type PackOption = {
  labelFr: string;
  labelAr: string;
  priceMAD: number;
  included: boolean;
};

type CatalogPack = {
  key: string;
  nameFr: string;
  nameAr: string;
  descriptionFr: string;
  descriptionAr: string;
  basePriceMAD: number;
  promoPercent: number;
  managerMonthlyMAD: number;
  options: PackOption[];
};

const packs: CatalogPack[] = [
  {
    key: "starter",
    nameFr: "Site Vitrine Starter",
    nameAr: "موقع عرض Starter",
    descriptionFr:
      "Idéal pour artisans et petites entreprises qui veulent une présence pro en ligne.",
    descriptionAr:
      "مناسب للحرفيين والشركات الصغيرة التي تريد حضورًا احترافيًا على الإنترنت.",
    basePriceMAD: 3500,
    promoPercent: 20,
    managerMonthlyMAD: 350,
    options: [
      { labelFr: "Design responsive", labelAr: "تصميم متجاوب", priceMAD: 0, included: true },
      { labelFr: "Jusqu'à 5 pages", labelAr: "حتى 5 صفحات", priceMAD: 0, included: true },
      { labelFr: "Nom de domaine + SSL", labelAr: "دومين + SSL", priceMAD: 0, included: true },
      { labelFr: "Référencement SEO de base", labelAr: "تهيئة SEO أساسية", priceMAD: 0, included: true },
      { labelFr: "Blog intégré", labelAr: "مدونة مدمجة", priceMAD: 600, included: false },
    ],
  },
  {
    key: "business",
    nameFr: "Site Business Pro",
    nameAr: "موقع Business Pro",
    descriptionFr:
      "Pour entreprises qui veulent générer des leads avec une image premium.",
    descriptionAr:
      "للشركات التي تريد توليد عملاء محتملين مع صورة احترافية قوية.",
    basePriceMAD: 6500,
    promoPercent: 18,
    managerMonthlyMAD: 550,
    options: [
      { labelFr: "Jusqu'à 12 pages", labelAr: "حتى 12 صفحة", priceMAD: 0, included: true },
      { labelFr: "Formulaires avancés", labelAr: "نماذج متقدمة", priceMAD: 0, included: true },
      { labelFr: "Statistiques Google", labelAr: "إحصائيات Google", priceMAD: 0, included: true },
      { labelFr: "2 langues (FR/AR)", labelAr: "لغتان (FR/AR)", priceMAD: 0, included: true },
      { labelFr: "Automatisation Excel", labelAr: "أتمتة Excel", priceMAD: 900, included: false },
    ],
  },
  {
    key: "ecommerce",
    nameFr: "Boutique E-commerce",
    nameAr: "متجر إلكتروني",
    descriptionFr:
      "Solution complète pour vendre en ligne avec paiement et gestion des commandes.",
    descriptionAr:
      "حل متكامل للبيع عبر الإنترنت مع الدفع وإدارة الطلبات.",
    basePriceMAD: 11000,
    promoPercent: 15,
    managerMonthlyMAD: 900,
    options: [
      { labelFr: "Catalogue produits", labelAr: "كتالوج المنتجات", priceMAD: 0, included: true },
      { labelFr: "Paiement en ligne", labelAr: "الدفع الإلكتروني", priceMAD: 0, included: true },
      { labelFr: "Gestion commandes", labelAr: "إدارة الطلبات", priceMAD: 0, included: true },
      { labelFr: "Emails automatiques", labelAr: "رسائل تلقائية", priceMAD: 0, included: true },
      { labelFr: "Connexion ERP/CRM", labelAr: "ربط ERP/CRM", priceMAD: 1800, included: false },
    ],
  },
];

function formatPrice(value: number) {
  return new Intl.NumberFormat("fr-MA").format(value);
}

function csvValue(text: string) {
  return `"${text.replaceAll('"', '""')}"`;
}

export default function WebCatalog() {
  const { language, dir, t } = useLanguage();

  const csvRows = useMemo(() => {
    const header = [
      "Pack",
      "Description",
      "Prix de base (MAD)",
      "Promo (%)",
      "Prix promo (MAD)",
      "Options incluses",
      "Options payantes",
      "Gestion mensuelle (MAD)",
    ];

    const rows = packs.map((pack) => {
      const promoPrice = Math.round(pack.basePriceMAD * (1 - pack.promoPercent / 100));
      const includedOptions = pack.options
        .filter((option) => option.included)
        .map((option) => option.labelFr)
        .join(" | ");
      const paidOptions = pack.options
        .filter((option) => !option.included)
        .map((option) => `${option.labelFr} (+${option.priceMAD} MAD)`)
        .join(" | ");

      return [
        pack.nameFr,
        pack.descriptionFr,
        String(pack.basePriceMAD),
        String(pack.promoPercent),
        String(promoPrice),
        includedOptions,
        paidOptions,
        String(pack.managerMonthlyMAD),
      ];
    });

    return [header, ...rows];
  }, []);

  const exportCsv = () => {
    const csvText = csvRows
      .map((line) => line.map((value) => csvValue(value)).join(","))
      .join("\n");
    const blob = new Blob([`\uFEFF${csvText}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "catalogue-sites-web.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="catalogue-web" className="py-24 bg-slate-900/70 border-y border-white/5" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-400/30 bg-emerald-500/10 text-emerald-300 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              {t("Catalogue premium", "كتالوج مميز")}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {t("Catalogue des sites web", "كتالوج المواقع الإلكترونية")}
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              {t(
                "Packs complets, options de gestion, création Excel automatisée et promotions actives pour garder un budget raisonnable.",
                "باقات كاملة، خيارات إدارة، إنشاء Excel تلقائي وعروض ترويجية للحفاظ على ميزانية مناسبة."
              )}
            </p>
          </div>

          <Button
            onClick={exportCsv}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/20"
          >
            <Download className="w-4 h-4 mr-2" />
            {t("Exporter vers Excel", "تصدير إلى Excel")}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {packs.map((pack) => {
            const promoPrice = Math.round(pack.basePriceMAD * (1 - pack.promoPercent / 100));
            const packName = language === "fr" ? pack.nameFr : pack.nameAr;
            const packDescription = language === "fr" ? pack.descriptionFr : pack.descriptionAr;
            const includedOptions = pack.options.filter((option) => option.included);
            const paidOptions = pack.options.filter((option) => !option.included);

            return (
              <article
                key={pack.key}
                className="rounded-2xl border border-white/10 bg-slate-950/70 p-6 hover:border-emerald-400/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{packName}</h3>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs font-semibold">
                    <BadgePercent className="w-3.5 h-3.5" />-{pack.promoPercent}%
                  </div>
                </div>

                <p className="text-sm text-slate-400 mb-5 min-h-14">{packDescription}</p>

                <div className="mb-6">
                  <p className="text-slate-500 line-through text-sm">
                    {formatPrice(pack.basePriceMAD)} MAD
                  </p>
                  <p className="text-3xl font-bold text-emerald-400">
                    {formatPrice(promoPrice)} MAD
                  </p>
                </div>

                <div className="space-y-2 mb-5">
                  {includedOptions.map((option) => (
                    <div key={option.labelFr} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{language === "fr" ? option.labelFr : option.labelAr}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg border border-white/10 bg-white/5 p-3 mb-6">
                  <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">
                    {t("Options supplémentaires", "خيارات إضافية")}
                  </p>
                  <div className="space-y-1.5">
                    {paidOptions.map((option) => (
                      <p key={option.labelFr} className="text-sm text-slate-300">
                        {language === "fr" ? option.labelFr : option.labelAr}
                        <span className="text-emerald-400"> (+{formatPrice(option.priceMAD)} MAD)</span>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/10 p-3 mb-6">
                  <p className="text-xs text-emerald-300 uppercase tracking-wide mb-1">
                    {t("Gestion mensuelle", "إدارة شهرية")}
                  </p>
                  <p className="text-lg font-semibold text-white">
                    {formatPrice(pack.managerMonthlyMAD)} MAD / {t("mois", "شهر")}
                  </p>
                </div>

                <Link
                  to="/devis"
                  className="inline-flex items-center justify-center w-full rounded-md bg-white text-slate-900 hover:bg-slate-200 font-semibold px-4 py-2.5 transition-colors"
                >
                  {t("Choisir ce pack", "اختيار هذه الباقة")}
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
