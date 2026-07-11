import { Link } from "react-router";
import {
  BadgePercent,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  Settings,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import ChatBot from "@/components/ChatBot";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type LocalizedLabel = {
  fr: string;
  ar: string;
};

type WebsitePack = {
  id: string;
  name: LocalizedLabel;
  description: LocalizedLabel;
  delivery: LocalizedLabel;
  options: LocalizedLabel[];
  managerOption: LocalizedLabel;
  managerPrice: number;
  basePrice: number;
  promoPrice: number;
  promoText: LocalizedLabel;
  highlighted?: boolean;
};

type AddonOption = {
  name: LocalizedLabel;
  details: LocalizedLabel;
  monthlyPrice: number;
};

const websitePacks: WebsitePack[] = [
  {
    id: "vitrine-starter",
    name: { fr: "Site Vitrine Starter", ar: "موقع تعريفي ستارتر" },
    description: {
      fr: "Ideal pour artisans, independants et petites entreprises.",
      ar: "مثالي للحرفيين والمهنيين المستقلين والشركات الصغيرة.",
    },
    delivery: { fr: "Livraison en 5 a 7 jours", ar: "التسليم خلال 5 إلى 7 أيام" },
    options: [
      { fr: "Jusqu'a 6 pages sur mesure", ar: "حتى 6 صفحات مخصصة" },
      { fr: "Design responsive mobile + desktop", ar: "تصميم متجاوب للجوال والحاسوب" },
      { fr: "Formulaire WhatsApp + email", ar: "نموذج واتساب + بريد إلكتروني" },
      { fr: "SEO de base (balises et vitesse)", ar: "تهيئة SEO أساسية (وسوم وسرعة)" },
    ],
    managerOption: {
      fr: "Option Manager mensuelle (contenu + suivi)",
      ar: "خيار إدارة شهري (محتوى + متابعة)",
    },
    managerPrice: 900,
    basePrice: 4800,
    promoPrice: 3900,
    promoText: { fr: "Promo lancement -19%", ar: "عرض الإطلاق -19%" },
  },
  {
    id: "business-pro",
    name: { fr: "Site Business Pro", ar: "موقع بيزنس برو" },
    description: {
      fr: "Catalogue de services complet pour PME en croissance.",
      ar: "كتالوج خدمات متكامل للشركات الصغيرة والمتوسطة.",
    },
    delivery: { fr: "Livraison en 10 a 12 jours", ar: "التسليم خلال 10 إلى 12 يومًا" },
    options: [
      { fr: "Jusqu'a 15 pages + blog", ar: "حتى 15 صفحة + مدونة" },
      { fr: "Systeme multi-langues FR/AR", ar: "نظام متعدد اللغات عربي/فرنسي" },
      { fr: "Integrations CRM et analytics", ar: "ربط CRM وأدوات التحليل" },
      { fr: "Optimisation SEO avancee", ar: "تحسين SEO متقدم" },
    ],
    managerOption: {
      fr: "Manager contenu + reporting mensuel",
      ar: "إدارة محتوى + تقرير شهري",
    },
    managerPrice: 1400,
    basePrice: 8900,
    promoPrice: 7300,
    promoText: { fr: "Promo saison -18%", ar: "عرض الموسم -18%" },
    highlighted: true,
  },
  {
    id: "ecommerce-growth",
    name: { fr: "Boutique E-commerce Growth", ar: "متجر إلكتروني جروث" },
    description: {
      fr: "Vendre en ligne avec paiement securise et suivi commandes.",
      ar: "بيع عبر الإنترنت مع دفع آمن وتتبع الطلبات.",
    },
    delivery: { fr: "Livraison en 14 a 18 jours", ar: "التسليم خلال 14 إلى 18 يومًا" },
    options: [
      { fr: "Jusqu'a 120 produits", ar: "حتى 120 منتجًا" },
      { fr: "Paiement en ligne + cash a la livraison", ar: "دفع إلكتروني + الدفع عند الاستلام" },
      { fr: "Gestion stock et promotions", ar: "إدارة المخزون والعروض" },
      { fr: "Emails automatiques clients", ar: "رسائل تلقائية للعملاء" },
    ],
    managerOption: {
      fr: "Manager boutique (produits + campagnes)",
      ar: "إدارة المتجر (منتجات + حملات)",
    },
    managerPrice: 1850,
    basePrice: 14900,
    promoPrice: 12400,
    promoText: { fr: "Promo e-commerce -17%", ar: "عرض التجارة الإلكترونية -17%" },
  },
  {
    id: "custom-platform",
    name: { fr: "Plateforme Sur Mesure", ar: "منصة مخصصة" },
    description: {
      fr: "Pour projets complexes avec espace client et automatisations.",
      ar: "للمشاريع المتقدمة مع مساحة عميل وأتمتة العمليات.",
    },
    delivery: { fr: "A partir de 3 semaines", ar: "ابتداءً من 3 أسابيع" },
    options: [
      { fr: "Fonctionnalites metier personnalisees", ar: "ميزات أعمال مخصصة" },
      { fr: "Connexion API / ERP / CRM", ar: "ربط API / ERP / CRM" },
      { fr: "Tableau de bord administrateur", ar: "لوحة تحكم للإدارة" },
      { fr: "Accompagnement technique dedie", ar: "مواكبة تقنية مخصصة" },
    ],
    managerOption: {
      fr: "Manager technique prioritaire",
      ar: "إدارة تقنية ذات أولوية",
    },
    managerPrice: 2600,
    basePrice: 22900,
    promoPrice: 19900,
    promoText: { fr: "Promo projet -13%", ar: "عرض مشروع -13%" },
  },
];

const addonOptions: AddonOption[] = [
  {
    name: { fr: "Manager contenu premium", ar: "إدارة محتوى بريميوم" },
    details: {
      fr: "8 publications + mise a jour pages et visuels",
      ar: "8 منشورات + تحديث الصفحات والصور",
    },
    monthlyPrice: 1200,
  },
  {
    name: { fr: "Manager publicite digitale", ar: "إدارة الإعلانات الرقمية" },
    details: {
      fr: "Suivi Meta/Google Ads + optimisation hebdomadaire",
      ar: "متابعة Meta/Google Ads + تحسين أسبوعي",
    },
    monthlyPrice: 1800,
  },
  {
    name: { fr: "Manager SEO mensuel", ar: "إدارة SEO شهرية" },
    details: {
      fr: "Audit mots-cles, contenu SEO et backlinks",
      ar: "تدقيق الكلمات المفتاحية ومحتوى SEO وروابط خارجية",
    },
    monthlyPrice: 1600,
  },
];

function selectText(language: "fr" | "ar", value: LocalizedLabel) {
  return language === "fr" ? value.fr : value.ar;
}

function formatPrice(language: "fr" | "ar", amount: number) {
  const locale = language === "fr" ? "fr-MA" : "ar-MA";
  return `${new Intl.NumberFormat(locale).format(amount)} MAD`;
}

function escapeCsvValue(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

function buildCatalogCsv(language: "fr" | "ar") {
  const headers =
    language === "fr"
      ? [
          "Type",
          "Nom",
          "Description",
          "Prix normal (MAD)",
          "Prix promo (MAD)",
          "Economie (MAD)",
          "Options incluses",
          "Option manager",
          "Prix manager mensuel (MAD)",
          "Delai",
          "Promotion",
        ]
      : [
          "النوع",
          "الاسم",
          "الوصف",
          "السعر العادي (MAD)",
          "سعر العرض (MAD)",
          "قيمة التخفيض (MAD)",
          "الخيارات المضمنة",
          "خيار الإدارة",
          "سعر الإدارة الشهري (MAD)",
          "المدة",
          "العرض",
        ];

  const packRows = websitePacks.map((pack) => {
    const includedOptions = pack.options
      .map((option) => selectText(language, option))
      .join(" | ");
    return [
      language === "fr" ? "Pack site web" : "باقة موقع",
      selectText(language, pack.name),
      selectText(language, pack.description),
      String(pack.basePrice),
      String(pack.promoPrice),
      String(pack.basePrice - pack.promoPrice),
      includedOptions,
      selectText(language, pack.managerOption),
      String(pack.managerPrice),
      selectText(language, pack.delivery),
      selectText(language, pack.promoText),
    ];
  });

  const addonRows = addonOptions.map((addon) => [
    language === "fr" ? "Option manager" : "خيار إدارة",
    selectText(language, addon.name),
    selectText(language, addon.details),
    String(addon.monthlyPrice),
    String(addon.monthlyPrice),
    "0",
    language === "fr" ? "-" : "-",
    language === "fr" ? "Inclus si activee" : "مضمنة عند التفعيل",
    String(addon.monthlyPrice),
    language === "fr" ? "Mensuel" : "شهري",
    language === "fr" ? "Selon campagne" : "حسب الحملة",
  ]);

  return [headers, ...packRows, ...addonRows]
    .map((row) => row.map(escapeCsvValue).join(";"))
    .join("\n");
}

function downloadCatalogCsv(language: "fr" | "ar") {
  const csvContent = `\uFEFF${buildCatalogCsv(language)}`;
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download =
    language === "fr"
      ? "catalogue-sites-web-promos.csv"
      : "كتالوج-مواقع-ويب-عروض.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

export default function Catalogue() {
  const { language, dir, t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main dir={dir}>
        <section className="pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-slate-950 to-slate-950" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-5 mb-12">
              <Badge className="bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-4 py-1.5">
                <BadgePercent className="w-4 h-4" />
                {t(
                  "Catalogue web 2026 - packs + promos raisonnables",
                  "كتالوج الويب 2026 - باقات وعروض مناسبة"
                )}
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                {t(
                  "Catalogue des sites web avec options completes",
                  "كتالوج مواقع ويب بخيارات كاملة"
                )}
              </h1>
              <p className="text-slate-300 text-lg max-w-3xl mx-auto">
                {t(
                  "Choisissez un pack pret a lancer, ajoutez un manager mensuel, puis exportez votre catalogue en Excel automatiquement.",
                  "اختر باقة جاهزة، أضف خدمة إدارة شهرية، ثم صدّر الكتالوج إلى Excel بشكل تلقائي."
                )}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button
                  onClick={() => downloadCatalogCsv(language)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  {t("Exporter Excel (CSV)", "تصدير Excel (CSV)")}
                </Button>
                <Link to="/devis">
                  <Button variant="outline" className="border-emerald-500/40 text-emerald-300">
                    <Sparkles className="w-4 h-4" />
                    {t("Demander une offre personnalisee", "اطلب عرضًا مخصصًا")}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-14">
              {[
                {
                  icon: ShieldCheck,
                  title: t("Qualite pro", "جودة احترافية"),
                  value: t("100% responsive", "متجاوب 100%"),
                },
                {
                  icon: BadgePercent,
                  title: t("Promotions", "عروض"),
                  value: t("Jusqu'a -19%", "حتى -19%"),
                },
                {
                  icon: Settings,
                  title: t("Options manager", "خيارات إدارة"),
                  value: t("A partir de 900 MAD/mois", "ابتداءً من 900 MAD/شهر"),
                },
                {
                  icon: Download,
                  title: t("Excel automatise", "Excel تلقائي"),
                  value: t("Export en 1 clic", "تصدير بنقرة واحدة"),
                },
              ].map((item) => (
                <Card key={item.title} className="bg-slate-900/70 border-white/10">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-300">{item.title}</p>
                        <p className="text-white font-semibold">{item.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {websitePacks.map((pack) => {
                const savings = pack.basePrice - pack.promoPrice;
                return (
                  <Card
                    key={pack.id}
                    className={`border transition-all ${
                      pack.highlighted
                        ? "border-emerald-400/70 bg-emerald-500/10 shadow-lg shadow-emerald-500/20"
                        : "border-white/10 bg-slate-900/70"
                    }`}
                  >
                    <CardHeader className="space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <CardTitle className="text-xl">
                          {selectText(language, pack.name)}
                        </CardTitle>
                        <Badge className="bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          {selectText(language, pack.promoText)}
                        </Badge>
                      </div>
                      <p className="text-slate-300 text-sm">
                        {selectText(language, pack.description)}
                      </p>
                      <div className="flex flex-wrap items-end gap-3">
                        <span className="text-3xl font-bold text-emerald-300">
                          {formatPrice(language, pack.promoPrice)}
                        </span>
                        <span className="text-slate-400 line-through text-sm">
                          {formatPrice(language, pack.basePrice)}
                        </span>
                        <Badge variant="outline" className="border-emerald-400/40 text-emerald-300">
                          {t("Economie", "التوفير")} {formatPrice(language, savings)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      <ul className="space-y-2">
                        {pack.options.map((option) => (
                          <li key={option.fr} className="flex items-start gap-2 text-sm text-slate-200">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                            {selectText(language, option)}
                          </li>
                        ))}
                      </ul>
                      <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/10 p-3">
                        <p className="text-sm font-medium text-emerald-200">
                          {selectText(language, pack.managerOption)}
                        </p>
                        <p className="text-sm text-emerald-300">
                          {t("A partir de", "ابتداءً من")} {formatPrice(language, pack.managerPrice)} /{" "}
                          {t("mois", "شهر")}
                        </p>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-xs text-slate-400">{selectText(language, pack.delivery)}</p>
                        <Link to={`/devis?pack=${pack.id}`}>
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white">
                            {t("Choisir ce pack", "اختر هذه الباقة")}
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-5">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                {t("Options manager mensuelles", "خيارات الإدارة الشهرية")}
              </h2>
              <p className="text-slate-400">
                {t(
                  "Ajoutez un manager dedie pour automatiser vos mises a jour, votre marketing et vos rapports.",
                  "أضف مديرًا مخصصًا لأتمتة التحديثات والتسويق والتقارير."
                )}
              </p>
            </div>
            <Card className="bg-slate-900/70 border-white/10">
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-transparent">
                      <TableHead>{t("Option", "الخيار")}</TableHead>
                      <TableHead>{t("Details", "التفاصيل")}</TableHead>
                      <TableHead className="text-right">
                        {t("Prix mensuel", "السعر الشهري")}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {addonOptions.map((addon) => (
                      <TableRow key={addon.name.fr} className="border-white/10">
                        <TableCell className="font-medium text-white">
                          {selectText(language, addon.name)}
                        </TableCell>
                        <TableCell className="text-slate-300">
                          {selectText(language, addon.details)}
                        </TableCell>
                        <TableCell className="text-right text-emerald-300 font-semibold">
                          {formatPrice(language, addon.monthlyPrice)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
      <ChatBot />
      <WhatsAppButton />
    </div>
  );
}
