import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router";
import { useLanguage } from "@/hooks/useLanguage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Download,
  FileSpreadsheet,
  Sparkles,
  Tag,
} from "lucide-react";

type LocalizedText = {
  fr: string;
  ar: string;
};

type WebsitePack = {
  name: LocalizedText;
  description: LocalizedText;
  basePrice: number;
  promoPrice: number;
  delivery: LocalizedText;
  features: LocalizedText[];
  badge?: LocalizedText;
};

type ManagerOption = {
  name: LocalizedText;
  description: LocalizedText;
  monthlyPrice: number;
};

const websitePacks: WebsitePack[] = [
  {
    name: { fr: "Pack Starter", ar: "باقة البداية" },
    description: {
      fr: "Site vitrine professionnel pour lancer votre presence en ligne rapidement.",
      ar: "موقع احترافي للتعريف بنشاطك والانطلاق بسرعة على الانترنت.",
    },
    basePrice: 4500,
    promoPrice: 3400,
    delivery: { fr: "7 a 10 jours", ar: "من 7 الى 10 ايام" },
    features: [
      { fr: "Jusqu'a 5 pages", ar: "حتى 5 صفحات" },
      { fr: "Design moderne responsive", ar: "تصميم حديث ومتجاوب" },
      { fr: "Formulaire de contact WhatsApp", ar: "استمارة تواصل + واتساب" },
      { fr: "SEO de base", ar: "تهيئة سيو اساسية" },
    ],
  },
  {
    name: { fr: "Pack Business", ar: "باقة الاعمال" },
    description: {
      fr: "Catalogue digital avec options manager et espace d'administration simple.",
      ar: "كتالوج رقمي مع خيارات الادارة ولوحة تحكم بسيطة.",
    },
    basePrice: 7800,
    promoPrice: 6200,
    delivery: { fr: "10 a 14 jours", ar: "من 10 الى 14 يوما" },
    badge: { fr: "Le plus choisi", ar: "الاكثر طلبا" },
    features: [
      { fr: "Jusqu'a 15 pages + blog", ar: "حتى 15 صفحة + مدونة" },
      { fr: "Gestion de catalogue/services", ar: "ادارة الكتالوج والخدمات" },
      { fr: "Integration Facebook Pixel + Analytics", ar: "دمج اناليتكس وبيكسل" },
      { fr: "Support prioritaire 30 jours", ar: "دعم سريع لمدة 30 يوما" },
    ],
  },
  {
    name: { fr: "Pack E-commerce", ar: "باقة المتجر الالكتروني" },
    description: {
      fr: "Boutique en ligne complete avec paiement, stock et promotions.",
      ar: "متجر الكتروني متكامل مع الدفع وادارة المخزون والعروض.",
    },
    basePrice: 12500,
    promoPrice: 9800,
    delivery: { fr: "14 a 21 jours", ar: "من 14 الى 21 يوما" },
    features: [
      { fr: "Jusqu'a 200 produits", ar: "حتى 200 منتج" },
      { fr: "Paiement en ligne + livraison", ar: "دفع الكتروني + شحن" },
      { fr: "Gestion commandes et clients", ar: "ادارة الطلبات والعملاء" },
      { fr: "Coupons et promos automatiques", ar: "كوبونات وعروض تلقائية" },
    ],
  },
];

const managerOptions: ManagerOption[] = [
  {
    name: {
      fr: "Manager mensuel",
      ar: "ادارة شهرية",
    },
    description: {
      fr: "Mise a jour contenu, controle qualite et reporting hebdomadaire.",
      ar: "تحديث المحتوى ومراقبة الجودة وتقرير اسبوعي.",
    },
    monthlyPrice: 900,
  },
  {
    name: {
      fr: "Creation Excel automatisee",
      ar: "انشاء اكسل تلقائي",
    },
    description: {
      fr: "Generation automatique des catalogues clients et export mensuel.",
      ar: "انشاء تلقائي لكتالوجات العملاء وتصدير شهري.",
    },
    monthlyPrice: 650,
  },
  {
    name: {
      fr: "Ads manager + suivi lead",
      ar: "ادارة الاعلانات وتتبع العملاء",
    },
    description: {
      fr: "Pilotage des campagnes Meta/Google avec tableau de performance.",
      ar: "ادارة حملات ميتا وجوجل مع لوحة متابعة الاداء.",
    },
    monthlyPrice: 1200,
  },
];

const offerText = {
  fr: {
    title: "Catalogue des Sites Web",
    subtitle:
      "Des formules completes avec options manager, prix raisonnables et promotions limitees.",
    export: "Telecharger le catalogue Excel",
    exportDone: "Fichier Excel genere avec succes",
    from: "A partir de",
    currency: "MAD",
    oldPrice: "Prix normal",
    promoPrice: "Prix promo",
    save: "Economisez",
    delivery: "Delai",
    includes: "Inclus",
    managerTitle: "Options Manager",
    managerSubtitle: "Ajoutez uniquement ce dont vous avez besoin, sans surcout inutile.",
    perMonth: "/ mois",
    askQuote: "Demander un devis detaille",
    promoLimited: "Promo du mois",
    completePack: "Option complete",
  },
  ar: {
    title: "كتالوج المواقع الالكترونية",
    subtitle:
      "باقات متكاملة مع خيارات الادارة واسعار مناسبة وعروض محدودة.",
    export: "تحميل كتالوج اكسل",
    exportDone: "تم انشاء ملف اكسل بنجاح",
    from: "ابتداء من",
    currency: "درهم",
    oldPrice: "السعر العادي",
    promoPrice: "سعر العرض",
    save: "وفر",
    delivery: "مدة الانجاز",
    includes: "يشمل",
    managerTitle: "خيارات الادارة",
    managerSubtitle: "اختر فقط ما تحتاجه دون تكاليف زائدة.",
    perMonth: "/ شهر",
    askQuote: "اطلب عرض سعر مفصل",
    promoLimited: "عرض الشهر",
    completePack: "خيار متكامل",
  },
} as const;

function localize(text: LocalizedText, language: "fr" | "ar") {
  return text[language];
}

function formatPrice(value: number, language: "fr" | "ar") {
  const locale = language === "fr" ? "fr-MA" : "ar-MA";
  return new Intl.NumberFormat(locale).format(value);
}

function escapeCsv(value: string | number) {
  return `"${String(value).replace(/"/g, '""')}"`;
}

export default function WebsiteCatalog() {
  const { language, dir } = useLanguage();
  const T = offerText[language];
  const [exportDone, setExportDone] = useState(false);

  const orderedPacks = useMemo(
    () => [...websitePacks].sort((a, b) => a.promoPrice - b.promoPrice),
    []
  );

  const handleExportExcel = useCallback(() => {
    const rows: string[][] = [
      [
        language === "fr" ? "Type" : "النوع",
        language === "fr" ? "Nom" : "الاسم",
        language === "fr" ? "Description" : "الوصف",
        language === "fr" ? "Prix normal" : "السعر العادي",
        language === "fr" ? "Prix promo" : "سعر العرض",
        language === "fr" ? "Delai" : "المدة",
        language === "fr" ? "Options incluses" : "الخيارات المضمنة",
      ],
      ...orderedPacks.map((pack) => [
        language === "fr" ? "Pack site web" : "باقة موقع",
        localize(pack.name, language),
        localize(pack.description, language),
        `${pack.basePrice}`,
        `${pack.promoPrice}`,
        localize(pack.delivery, language),
        pack.features.map((feature) => localize(feature, language)).join(" | "),
      ]),
      ...managerOptions.map((option) => [
        language === "fr" ? "Option manager" : "خيار ادارة",
        localize(option.name, language),
        localize(option.description, language),
        "",
        `${option.monthlyPrice}`,
        language === "fr" ? "Mensuel" : "شهري",
        language === "fr" ? "Support inclus" : "يشمل الدعم",
      ]),
    ];

    const csvContent = rows.map((row) => row.map(escapeCsv).join(";")).join("\n");
    const blob = new Blob([`\uFEFF${csvContent}`], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download =
      language === "fr"
        ? "catalogue-sites-web-promos.csv"
        : "catalogue-sites-web-ar.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setExportDone(true);
    window.setTimeout(() => setExportDone(false), 3000);
  }, [language, orderedPacks]);

  return (
    <section id="catalog" className="py-24 bg-slate-900/50 relative" dir={dir}>
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            {T.promoLimited}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{T.title}</h2>
          <p className="text-slate-300 text-lg">{T.subtitle}</p>
        </div>

        <div className="text-center mb-12">
          <Button
            onClick={handleExportExcel}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            {T.export}
            <Download className="w-4 h-4 ml-2" />
          </Button>
          {exportDone && (
            <p className="text-emerald-300 text-sm mt-3" role="status">
              {T.exportDone}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {orderedPacks.map((pack) => {
            const discount = pack.basePrice - pack.promoPrice;
            return (
              <article
                key={localize(pack.name, "fr")}
                className="rounded-2xl border border-white/10 bg-slate-950/80 p-6 hover:border-emerald-400/40 transition-colors"
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <Badge
                    variant="secondary"
                    className="bg-emerald-500/15 text-emerald-300 border border-emerald-400/30"
                  >
                    {T.from} {formatPrice(pack.promoPrice, language)} {T.currency}
                  </Badge>
                  {pack.badge ? (
                    <Badge className="bg-amber-500/20 text-amber-200 border border-amber-400/40">
                      {localize(pack.badge, language)}
                    </Badge>
                  ) : (
                    <Badge className="bg-sky-500/20 text-sky-200 border border-sky-400/40">
                      {T.completePack}
                    </Badge>
                  )}
                </div>

                <h3 className="text-xl font-semibold text-white mb-2">
                  {localize(pack.name, language)}
                </h3>
                <p className="text-slate-400 text-sm mb-5">
                  {localize(pack.description, language)}
                </p>

                <div className="space-y-2 mb-5">
                  <p className="text-slate-400 text-sm">
                    {T.oldPrice}:{" "}
                    <span className="line-through">
                      {formatPrice(pack.basePrice, language)} {T.currency}
                    </span>
                  </p>
                  <p className="text-emerald-300 font-semibold">
                    {T.promoPrice}: {formatPrice(pack.promoPrice, language)} {T.currency}
                  </p>
                  <p className="text-amber-300 text-sm font-medium inline-flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    {T.save} {formatPrice(discount, language)} {T.currency}
                  </p>
                  <p className="text-slate-400 text-sm">
                    {T.delivery}: {localize(pack.delivery, language)}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-white mb-3">{T.includes}</p>
                  <ul className="space-y-2">
                    {pack.features.map((feature) => (
                      <li
                        key={localize(feature, "fr")}
                        className="text-sm text-slate-300 flex items-start gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{localize(feature, language)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6 sm:p-8">
          <h3 className="text-2xl font-semibold text-white mb-2">{T.managerTitle}</h3>
          <p className="text-slate-400 mb-6">{T.managerSubtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {managerOptions.map((option) => (
              <div key={localize(option.name, "fr")} className="rounded-xl border border-white/10 p-4 bg-slate-900/60">
                <p className="text-white font-medium mb-2">{localize(option.name, language)}</p>
                <p className="text-slate-400 text-sm mb-3">
                  {localize(option.description, language)}
                </p>
                <p className="text-emerald-300 font-semibold">
                  {formatPrice(option.monthlyPrice, language)} {T.currency} {T.perMonth}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Link to="/devis" className="inline-flex items-center text-emerald-300 hover:text-emerald-200 font-medium">
              {T.askQuote}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
