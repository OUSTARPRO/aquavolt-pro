import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { packages } from "@/lib/catalogData";
import { Check, X, ChevronDown, ChevronUp, BarChart3 } from "lucide-react";
import { Link } from "react-router";

const colorText: Record<string, string> = {
  sky: "text-sky-400",
  emerald: "text-emerald-400",
  violet: "text-violet-400",
  amber: "text-amber-400",
  rose: "text-rose-400",
};

const colorBg: Record<string, string> = {
  sky: "bg-sky-500",
  emerald: "bg-emerald-500",
  violet: "bg-violet-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
};

export default function CatalogueComparison() {
  const { language, dir } = useLanguage();
  const isFr = language === "fr";
  const [showAll, setShowAll] = useState(false);

  // Build unique feature set preserving order
  const allFeatures = [
    ...new Map(
      packages.flatMap((p) =>
        p.features.map((f) => [f.label, { label: f.label, labelAr: f.labelAr }])
      )
    ).values(),
  ];

  const visibleFeatures = showAll ? allFeatures : allFeatures.slice(0, 8);

  return (
    <section id="comparison" className="py-16" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-medium mb-4">
            <BarChart3 className="w-4 h-4" />
            <span>
              {isFr ? "Tableau comparatif" : "جدول المقارنة"}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {isFr
              ? "Comparez les packages en détail"
              : "قارن الحزم بالتفصيل"}
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            {isFr
              ? "Toutes les fonctionnalités côte à côte pour un choix éclairé"
              : "جميع الميزات جنباً إلى جنب لاختيار مستنير"}
          </p>
        </div>

        {/* Table container (horizontal scroll on mobile) */}
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/50">
          <table className="w-full min-w-[700px]">
            {/* Head */}
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 pl-6 text-slate-400 font-medium text-sm w-56">
                  {isFr ? "Fonctionnalité" : "الميزة"}
                </th>
                {packages.map((pkg) => (
                  <th key={pkg.key} className="p-4 text-center">
                    <div
                      className={`text-sm font-bold ${colorText[pkg.color]} mb-1`}
                    >
                      {isFr ? pkg.name.split(" ").slice(-1)[0] : pkg.nameAr.split(" ").slice(-1)[0]}
                    </div>
                    <div className="text-white text-xs font-semibold">
                      {pkg.promoPrice
                        ? `${pkg.promoPrice.toLocaleString("fr-MA")} MAD`
                        : `${pkg.price.toLocaleString("fr-MA")} MAD`}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {visibleFeatures.map((feature, idx) => (
                <tr
                  key={feature.label}
                  className={`border-b border-white/5 ${
                    idx % 2 === 0 ? "bg-slate-950/30" : ""
                  }`}
                >
                  <td className="p-4 pl-6 text-slate-300 text-sm">
                    {isFr ? feature.label : feature.labelAr}
                  </td>
                  {packages.map((pkg) => {
                    const found = pkg.features.find(
                      (f) => f.label === feature.label
                    );
                    return (
                      <td key={pkg.key} className="p-4 text-center">
                        {found?.included ? (
                          <div className="flex justify-center">
                            <span
                              className={`w-6 h-6 rounded-full flex items-center justify-center ${colorBg[pkg.color]}`}
                            >
                              <Check className="w-3.5 h-3.5 text-white" />
                            </span>
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <X className="w-4 h-4 text-slate-700" />
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>

            {/* CTA row */}
            <tfoot>
              <tr className="border-t border-white/10 bg-slate-900/80">
                <td className="p-4 pl-6 text-slate-400 text-sm font-medium">
                  {isFr ? "Démarrer" : "ابدأ الآن"}
                </td>
                {packages.map((pkg) => (
                  <td key={pkg.key} className="p-4 text-center">
                    <Link to="/devis">
                      <button
                        className={`px-4 py-2 rounded-xl text-white text-xs font-semibold transition-opacity hover:opacity-80 ${colorBg[pkg.color]}`}
                      >
                        {isFr ? "Choisir" : "اختر"}
                      </button>
                    </Link>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Show more */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white text-sm transition-colors"
          >
            {showAll ? (
              <>
                <ChevronUp className="w-4 h-4" />
                {isFr ? "Voir moins" : "عرض أقل"}
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                {isFr
                  ? `Voir toutes les fonctionnalités (${allFeatures.length})`
                  : `عرض جميع الميزات (${allFeatures.length})`}
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
