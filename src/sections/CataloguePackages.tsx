import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { packages, type Package } from "@/lib/catalogData";
import {
  Check,
  X,
  Star,
  Clock,
  ArrowRight,
  Layers,
} from "lucide-react";
import { Link } from "react-router";

const colorConfig: Record<
  string,
  { border: string; glow: string; badge: string; accent: string; btn: string }
> = {
  sky: {
    border: "border-sky-500/30 hover:border-sky-500/60",
    glow: "hover:shadow-sky-500/15",
    badge: "bg-sky-500/20 text-sky-300 border-sky-500/30",
    accent: "text-sky-400",
    btn: "bg-sky-500 hover:bg-sky-400",
  },
  emerald: {
    border: "border-emerald-500/30 hover:border-emerald-500/60",
    glow: "hover:shadow-emerald-500/20",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    accent: "text-emerald-400",
    btn: "bg-emerald-500 hover:bg-emerald-400",
  },
  violet: {
    border: "border-violet-500/30 hover:border-violet-500/60",
    glow: "hover:shadow-violet-500/15",
    badge: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    accent: "text-violet-400",
    btn: "bg-violet-500 hover:bg-violet-400",
  },
  amber: {
    border: "border-amber-500/30 hover:border-amber-500/60",
    glow: "hover:shadow-amber-500/15",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    accent: "text-amber-400",
    btn: "bg-amber-500 hover:bg-amber-400",
  },
  rose: {
    border: "border-rose-500/30 hover:border-rose-500/60",
    glow: "hover:shadow-rose-500/15",
    badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    accent: "text-rose-400",
    btn: "bg-rose-500 hover:bg-rose-400",
  },
};

function PackageCard({ pkg }: { pkg: Package }) {
  const { language } = useLanguage();
  const isFr = language === "fr";
  const [expanded, setExpanded] = useState(false);
  const cfg = colorConfig[pkg.color];

  const displayedFeatures = expanded ? pkg.features : pkg.features.slice(0, 6);
  const remaining = pkg.features.length - 6;

  const savings = pkg.promoPrice ? pkg.price - pkg.promoPrice : 0;

  return (
    <div
      className={`relative flex flex-col rounded-3xl bg-slate-900/60 border backdrop-blur-sm transition-all duration-500 shadow-2xl ${cfg.border} ${cfg.glow} ${pkg.popular ? "ring-2 ring-emerald-500/40 scale-[1.02]" : ""}`}
    >
      {/* Popular ribbon */}
      {pkg.badge && (
        <div
          className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full border text-xs font-bold z-10 ${cfg.badge}`}
        >
          {isFr ? pkg.badge : pkg.badgeAr}
        </div>
      )}

      <div className="p-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-5">
          <h3 className="text-xl font-bold text-white mb-1">
            {isFr ? pkg.name : pkg.nameAr}
          </h3>
          <p className="text-slate-400 text-sm">
            {isFr ? pkg.tagline : pkg.taglineAr}
          </p>
        </div>

        {/* Price */}
        <div className="mb-5 p-4 rounded-2xl bg-slate-950/50 border border-white/5">
          {pkg.promoPrice ? (
            <>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-slate-500 line-through text-base">
                  {pkg.price.toLocaleString("fr-MA")} MAD
                </span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full border ${cfg.badge}`}
                >
                  {isFr ? pkg.promoLabel : pkg.promoLabelAr}
                </span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black text-white">
                  {pkg.promoPrice.toLocaleString("fr-MA")}
                </span>
                <span className={`text-lg font-semibold mb-1 ${cfg.accent}`}>
                  MAD
                </span>
              </div>
              <p className="text-emerald-400 text-xs font-medium mt-1">
                {isFr
                  ? `Vous économisez ${savings.toLocaleString("fr-MA")} MAD`
                  : `توفّر ${savings.toLocaleString("ar-MA")} درهم`}
              </p>
            </>
          ) : (
            <div className="flex items-end gap-2">
              <span className="text-4xl font-black text-white">
                {pkg.price.toLocaleString("fr-MA")}
              </span>
              <span className={`text-lg font-semibold mb-1 ${cfg.accent}`}>
                MAD
              </span>
            </div>
          )}

          {/* Meta */}
          <div className="flex flex-wrap gap-3 mt-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Layers className="w-3.5 h-3.5" />
              <span>{isFr ? pkg.pages : pkg.pagesAr}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>
                {isFr
                  ? `Livraison ${pkg.deliveryDays}j`
                  : `تسليم ${pkg.deliveryDays} يوم`}
              </span>
            </div>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-2.5 flex-1 mb-4">
          {displayedFeatures.map((feature) => (
            <li key={feature.label} className="flex items-start gap-2.5">
              <span
                className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  feature.included
                    ? `bg-gradient-to-br ${pkg.gradient} text-white`
                    : "bg-slate-800 text-slate-600"
                }`}
              >
                {feature.included ? (
                  <Check className="w-2.5 h-2.5" />
                ) : (
                  <X className="w-2.5 h-2.5" />
                )}
              </span>
              <span
                className={`text-sm leading-snug ${
                  feature.included ? "text-slate-200" : "text-slate-600"
                }`}
              >
                {isFr ? feature.label : feature.labelAr}
              </span>
            </li>
          ))}
        </ul>

        {/* Expand toggle */}
        {!expanded && remaining > 0 && (
          <button
            onClick={() => setExpanded(true)}
            className={`text-sm font-medium mb-4 ${cfg.accent} hover:underline flex items-center gap-1`}
          >
            <span>
              {isFr ? `+${remaining} fonctionnalités` : `+${remaining} مميزات`}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
        {expanded && (
          <button
            onClick={() => setExpanded(false)}
            className={`text-sm font-medium mb-4 ${cfg.accent} hover:underline`}
          >
            {isFr ? "Réduire" : "تقليص"}
          </button>
        )}

        {/* CTA */}
        <Link to="/devis">
          <button
            className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-200 shadow-lg flex items-center justify-center gap-2 ${cfg.btn}`}
          >
            {isFr ? "Demander un devis" : "طلب عرض سعر"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function CataloguePackages() {
  const { language, dir } = useLanguage();
  const isFr = language === "fr";

  return (
    <section id="packages" className="py-16" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            <span>
              {isFr ? "Nos packages complets" : "حزمنا المتكاملة"}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {isFr ? "Choisissez votre solution web" : "اختر حلك على الويب"}
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {isFr
              ? "5 packages adaptés à tous les besoins et tous les budgets. Chaque package est livré clé en main."
              : "5 حزم مناسبة لجميع الاحتياجات والميزانيات. كل حزمة تُسلَّم جاهزة للاستخدام."}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
          {packages.map((pkg) => (
            <PackageCard key={pkg.key} pkg={pkg} />
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-slate-500 text-sm mt-8">
          {isFr
            ? "* Tous les prix sont TTC. Paiement en plusieurs fois disponible. Contactez-nous pour un devis personnalisé."
            : "* جميع الأسعار شاملة للضريبة. الدفع بالتقسيط متاح. تواصل معنا للحصول على عرض مخصص."}
        </p>
      </div>
    </section>
  );
}
