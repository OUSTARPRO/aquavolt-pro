import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import { useLanguage } from "@/hooks/useLanguage";
import {
  websitePackages,
  additionalOptions,
  type WebsitePackage,
} from "@/lib/catalogue-data";
import {
  Check,
  X,
  Download,
  Tag,
  Zap,
  Star,
  Clock,
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
  Globe,
  ShoppingCart,
  Rocket,
  Monitor,
} from "lucide-react";
import { Link } from "react-router";
import * as XLSX from "xlsx";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Site Vitrine": Monitor,
  "Site Professionnel": Globe,
  "E-Commerce": ShoppingCart,
  "Application Web": Rocket,
};

function formatPrice(price: number, lang: string) {
  return lang === "fr"
    ? `${price.toLocaleString("fr-FR")} MAD`
    : `${price.toLocaleString("ar-MA")} د.م`;
}

export default function Catalogue() {
  const { language, dir } = useLanguage();
  const isFr = language === "fr";
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [filter, setFilter] = useState("all");

  const categories = isFr
    ? ["Tous", "Site Vitrine", "Site Professionnel", "E-Commerce", "Application Web"]
    : ["الكل", "موقع عرض", "موقع احترافي", "تجارة إلكترونية", "تطبيق ويب"];

  const filterKeys = ["all", "Site Vitrine", "Site Professionnel", "E-Commerce", "Application Web"];

  const filteredPackages =
    filter === "all"
      ? websitePackages
      : websitePackages.filter((p) => p.category === filter);

  function toggleSelect(id: string) {
    setSelectedPackages((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function exportToExcel() {
    const packagesToExport =
      selectedPackages.length > 0
        ? websitePackages.filter((p) => selectedPackages.includes(p.id))
        : websitePackages;

    const wb = XLSX.utils.book_new();

    // Sheet 1 — Packages summary
    const summaryData = [
      ["CATALOGUE SITES WEB — AquaVolt Digital", "", "", "", "", ""],
      ["Date d'export", new Date().toLocaleDateString("fr-FR"), "", "", "", ""],
      ["", "", "", "", "", ""],
      ["Forfait", "Catégorie", "Prix Normal (MAD)", "Prix Promo (MAD)", "Réduction", "Délai (jours)"],
      ...packagesToExport.map((p) => [
        p.name,
        p.category,
        p.originalPrice,
        p.promoPrice,
        `-${p.promoPercent}%`,
        p.deliveryDays,
      ]),
      ["", "", "", "", "", ""],
      ["OPTIONS SUPPLÉMENTAIRES", "", "", "", "", ""],
      ["Option", "Prix Normal (MAD)", "Prix Promo (MAD)", "Réduction", "", ""],
      ...additionalOptions.map((o) => [
        o.name,
        o.price,
        o.promo,
        `-${Math.round(((o.price - o.promo) / o.price) * 100)}%`,
        "",
        "",
      ]),
    ];

    const ws1 = XLSX.utils.aoa_to_sheet(summaryData);

    // Column widths
    ws1["!cols"] = [
      { wch: 40 },
      { wch: 22 },
      { wch: 22 },
      { wch: 22 },
      { wch: 14 },
      { wch: 16 },
    ];

    // Style header rows
    const headerStyle = {
      font: { bold: true, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "10B981" } },
      alignment: { horizontal: "center" },
    };
    ["A1", "A4", "B4", "C4", "D4", "E4", "F4"].forEach((cell) => {
      if (ws1[cell]) ws1[cell].s = headerStyle;
    });

    XLSX.utils.book_append_sheet(wb, ws1, "Catalogue");

    // Sheet 2 — Detailed options per package
    packagesToExport.forEach((pkg) => {
      const sheetData = [
        [`${pkg.name} — Détail des options`, ""],
        ["Prix Normal", `${pkg.originalPrice} MAD`],
        ["Prix Promo", `${pkg.promoPrice} MAD`],
        ["Réduction", `-${pkg.promoPercent}%`],
        ["Délai de livraison", `${pkg.deliveryDays} jours`],
        ["", ""],
        ["Option", "Inclus"],
        ...pkg.options.map((o) => [o.label, o.included ? "✓ Oui" : "✗ Non"]),
      ];
      const ws = XLSX.utils.aoa_to_sheet(sheetData);
      ws["!cols"] = [{ wch: 50 }, { wch: 12 }];
      XLSX.utils.book_append_sheet(wb, ws, pkg.name.substring(0, 31));
    });

    XLSX.writeFile(wb, "Catalogue_Sites_Web_AquaVolt.xlsx");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white" dir={dir}>
      <Navbar />
      <main className="pt-20">
        {/* Hero banner */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-500/8 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <Tag className="w-4 h-4" />
              <span>{isFr ? "Promotions exclusives — Juillet 2026" : "عروض حصرية — يوليو 2026"}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              {isFr ? (
                <>
                  Catalogue{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                    Sites Web
                  </span>
                </>
              ) : (
                <>
                  كتالوج{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                    المواقع الإلكترونية
                  </span>
                </>
              )}
            </h1>

            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-4">
              {isFr
                ? "Des forfaits complets, transparents et abordables pour créer votre présence digitale au Maroc"
                : "حزم شاملة وشفافة وبأسعار معقولة لإنشاء حضورك الرقمي في المغرب"}
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400 mb-10">
              {[
                { icon: Zap, label: isFr ? "Livraison rapide" : "تسليم سريع" },
                { icon: Star, label: isFr ? "Qualité garantie" : "جودة مضمونة" },
                { icon: Clock, label: isFr ? "Support inclus" : "دعم مشمول" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-emerald-400" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Excel export button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={exportToExcel}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold shadow-xl shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95"
              >
                <FileSpreadsheet className="w-5 h-5" />
                {isFr
                  ? selectedPackages.length > 0
                    ? `Exporter sélection (${selectedPackages.length}) en Excel`
                    : "Exporter tout en Excel"
                  : selectedPackages.length > 0
                  ? `تصدير الاختيار (${selectedPackages.length}) إلى Excel`
                  : "تصدير الكل إلى Excel"}
              </button>
              <Link
                to="/devis"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 hover:border-emerald-500/40 font-semibold transition-all"
              >
                {isFr ? "Demander un devis" : "طلب عرض سعر"}
              </Link>
            </div>
          </div>
        </section>

        {/* Promo banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 p-4">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent" />
            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                  <Tag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm sm:text-base">
                    {isFr ? "🎉 Promotion d'été — jusqu'à 33% de réduction !" : "🎉 عروض الصيف — خصم يصل إلى 33%!"}
                  </p>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    {isFr
                      ? "Offre valable jusqu'au 31 août 2026. Paiement en plusieurs fois disponible."
                      : "العرض صالح حتى 31 أغسطس 2026. الدفع بالتقسيط متاح."}
                  </p>
                </div>
              </div>
              <span className="flex-shrink-0 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-semibold">
                {isFr ? "Code: SUMMER26" : "الكود: SUMMER26"}
              </span>
            </div>
          </div>
        </div>

        {/* Category filter */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat, idx) => (
              <button
                key={cat}
                onClick={() => setFilter(filterKeys[idx])}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                  filter === filterKeys[idx]
                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                    : "bg-slate-900 text-slate-400 border-white/10 hover:text-white hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {selectedPackages.length > 0 && (
            <p className="text-center text-xs text-slate-500 mt-3">
              {isFr
                ? `${selectedPackages.length} forfait(s) sélectionné(s) pour l'export Excel`
                : `${selectedPackages.length} حزمة مختارة للتصدير إلى Excel`}
              {" — "}
              <button
                onClick={() => setSelectedPackages([])}
                className="text-emerald-400 hover:underline"
              >
                {isFr ? "Tout décocher" : "إلغاء الكل"}
              </button>
            </p>
          )}
        </div>

        {/* Packages grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {filteredPackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                isFr={isFr}
                expanded={expandedId === pkg.id}
                onToggle={() => setExpandedId(expandedId === pkg.id ? null : pkg.id)}
                selected={selectedPackages.includes(pkg.id)}
                onSelect={() => toggleSelect(pkg.id)}
              />
            ))}
          </div>
        </div>

        {/* Additional options */}
        <section className="bg-slate-900/50 border-t border-white/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                {isFr ? "Options & Add-ons" : "الخيارات الإضافية"}
              </h2>
              <p className="text-slate-400">
                {isFr
                  ? "Personnalisez votre forfait avec des options supplémentaires"
                  : "خصص حزمتك بخيارات إضافية"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {additionalOptions.map((opt) => {
                const discount = Math.round(((opt.price - opt.promo) / opt.price) * 100);
                return (
                  <div
                    key={opt.id}
                    className="group bg-slate-900 border border-white/10 hover:border-emerald-500/30 rounded-xl p-5 transition-all hover:shadow-lg hover:shadow-emerald-500/5"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <p className="text-white text-sm font-medium leading-snug flex-1">
                        {isFr ? opt.name : opt.nameAr}
                      </p>
                      <span className="ml-2 flex-shrink-0 px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold">
                        -{discount}%
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-emerald-400">
                        {formatPrice(opt.promo, language)}
                      </span>
                      <span className="text-sm text-slate-500 line-through">
                        {formatPrice(opt.price, language)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 text-center">
              <p className="text-slate-400 text-sm mb-4">
                {isFr
                  ? "Toutes les options peuvent être combinées avec n'importe quel forfait"
                  : "يمكن تركيب جميع الخيارات مع أي حزمة"}
              </p>
              <Link
                to="/devis"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold shadow-xl shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
              >
                <Download className="w-4 h-4" />
                {isFr ? "Commander maintenant" : "اطلب الآن"}
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ strip */}
        <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            {isFr ? "Questions fréquentes" : "الأسئلة الشائعة"}
          </h2>
          <div className="space-y-3">
            {(isFr ? faqFr : faqAr).map((item, i) => (
              <FaqItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function PackageCard({
  pkg,
  isFr,
  expanded,
  onToggle,
  selected,
  onSelect,
}: {
  pkg: WebsitePackage;
  isFr: boolean;
  expanded: boolean;
  onToggle: () => void;
  selected: boolean;
  onSelect: () => void;
}) {
  const CategoryIcon = categoryIcons[pkg.category] ?? Globe;
  const savings = pkg.originalPrice - pkg.promoPrice;

  return (
    <div
      className={`relative flex flex-col rounded-2xl border transition-all duration-300 overflow-hidden ${
        pkg.popular
          ? "border-emerald-500/50 shadow-2xl shadow-emerald-500/15 bg-slate-900"
          : selected
          ? "border-teal-500/40 bg-slate-900"
          : "border-white/10 bg-slate-900/60 hover:border-white/20 hover:bg-slate-900"
      }`}
    >
      {/* Popular badge */}
      {pkg.popular && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
      )}

      {/* Card header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-xl bg-gradient-to-br ${pkg.gradient} flex items-center justify-center shadow-lg ${pkg.glowColor}`}
            >
              <CategoryIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${pkg.color}`}>
                {isFr ? pkg.name : pkg.nameAr}
              </h3>
              {pkg.badge && (
                <span className="text-xs text-slate-400">
                  {isFr ? pkg.badge : pkg.badgeAr}
                </span>
              )}
            </div>
          </div>

          {/* Select checkbox */}
          <button
            onClick={onSelect}
            title={isFr ? "Sélectionner pour export" : "اختر للتصدير"}
            className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0 ${
              selected
                ? "bg-teal-500 border-teal-500"
                : "border-white/20 hover:border-teal-400"
            }`}
          >
            {selected && <Check className="w-3.5 h-3.5 text-white" />}
          </button>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          {isFr ? pkg.description : pkg.descriptionAr}
        </p>

        {/* Pricing */}
        <div className="flex items-end gap-3 mb-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">
                {pkg.promoPrice.toLocaleString()}
              </span>
              <span className="text-slate-400 text-sm">MAD</span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-slate-500 text-sm line-through">
                {pkg.originalPrice.toLocaleString()} MAD
              </span>
              <span className="px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/25 text-rose-400 text-xs font-bold">
                -{pkg.promoPercent}%
              </span>
            </div>
          </div>
          <div className="ml-auto text-right">
            <p className="text-emerald-400 text-sm font-semibold">
              {isFr ? `Économie` : `وفر`}
            </p>
            <p className="text-emerald-300 font-bold">{savings.toLocaleString()} MAD</p>
          </div>
        </div>

        {/* Delivery */}
        <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-4">
          <Clock className="w-3.5 h-3.5" />
          <span>
            {isFr
              ? `Livraison en ${pkg.deliveryDays} jours`
              : `تسليم خلال ${pkg.deliveryDays} أيام`}
          </span>
        </div>

        {/* CTA */}
        <Link
          to="/devis"
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all bg-gradient-to-r ${pkg.gradient} text-white hover:opacity-90 hover:shadow-lg shadow-sm mb-3`}
        >
          {isFr ? "Commander ce forfait" : "اطلب هذه الحزمة"}
        </Link>
      </div>

      {/* Options toggle */}
      <div className="border-t border-white/8">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between px-6 py-3.5 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <span>
            {isFr
              ? `Voir les ${pkg.options.length} options incluses`
              : `عرض ${pkg.options.length} خيارات مشمولة`}
          </span>
          {expanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {expanded && (
          <div className="px-6 pb-5 space-y-2.5">
            {pkg.options.map((opt, i) => (
              <div key={i} className="flex items-center gap-2.5">
                {opt.included ? (
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                ) : (
                  <X className="w-4 h-4 text-slate-600 flex-shrink-0" />
                )}
                <span
                  className={`text-sm ${
                    opt.included ? "text-slate-200" : "text-slate-600"
                  }`}
                >
                  {isFr ? opt.label : opt.labelAr}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-colors"
      >
        <span className="text-white font-medium text-sm">{question}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0 ml-3" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0 ml-3" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-4">
          <p className="text-slate-400 text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

const faqFr = [
  {
    q: "Quels sont les modes de paiement acceptés ?",
    a: "Nous acceptons le virement bancaire, le chèque, et le paiement en plusieurs fois (2 à 4 versements). 50% à la commande, 50% à la livraison.",
  },
  {
    q: "Est-ce que l'hébergement et le domaine sont inclus ?",
    a: "L'hébergement 1 an est inclus dans les forfaits Professionnel, E-Commerce et Startup. Pour le site Vitrine, il est disponible en option à 399 MAD/an.",
  },
  {
    q: "Que se passe-t-il après la livraison ?",
    a: "Vous recevez une formation complète sur votre site. Un support technique de 1 à 12 mois selon le forfait est inclus pour tous les problèmes techniques.",
  },
  {
    q: "Puis-je modifier mon site moi-même après livraison ?",
    a: "Oui ! Chaque site est livré avec un dashboard d'administration simple. Une formation est incluse pour que vous puissiez gérer votre contenu facilement.",
  },
  {
    q: "Comment se déroule le processus de création ?",
    a: "1) Remplissez le formulaire de devis en ligne 2) Nous vous contactons sous 24h 3) Validation du design 4) Développement 5) Tests & livraison avec formation.",
  },
];

const faqAr = [
  {
    q: "ما هي طرق الدفع المقبولة؟",
    a: "نقبل التحويل البنكي والشيك والدفع بالتقسيط (2 إلى 4 دفعات). 50% عند الطلب و50% عند التسليم.",
  },
  {
    q: "هل الاستضافة والنطاق مشمولان؟",
    a: "الاستضافة لمدة سنة مشمولة في حزم الاحترافي والتجارة الإلكترونية والشركات الناشئة. في حزمة العرض متاحة كخيار بـ 399 درهم/سنة.",
  },
  {
    q: "ماذا يحدث بعد التسليم؟",
    a: "ستتلقى تدريباً كاملاً على موقعك. يشمل الدعم التقني من شهر إلى 12 شهراً حسب الحزمة لجميع المشكلات التقنية.",
  },
  {
    q: "هل يمكنني تعديل موقعي بنفسي بعد التسليم؟",
    a: "نعم! يُسلَّم كل موقع مع لوحة إدارة بسيطة. يشمل التدريب لتتمكن من إدارة محتواك بسهولة.",
  },
  {
    q: "كيف تسير عملية الإنشاء؟",
    a: "1) املأ نموذج طلب السعر 2) نتواصل معك خلال 24 ساعة 3) مصادقة التصميم 4) التطوير 5) الاختبار والتسليم مع التدريب.",
  },
];
