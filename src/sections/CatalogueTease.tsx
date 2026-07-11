import { Link } from "react-router";
import { useLanguage } from "@/hooks/useLanguage";
import {
  LayoutGrid,
  Monitor,
  Globe,
  ShoppingCart,
  Rocket,
  ArrowRight,
  Tag,
  FileSpreadsheet,
} from "lucide-react";

const packages = [
  { icon: Monitor, name: "Site Vitrine", nameAr: "موقع عرض", price: 999, color: "text-sky-400", gradient: "from-sky-500 to-blue-600" },
  { icon: Globe, name: "Site Pro", nameAr: "موقع احترافي", price: 2499, color: "text-emerald-400", gradient: "from-emerald-500 to-teal-600", popular: true },
  { icon: ShoppingCart, name: "E-Commerce", nameAr: "تجارة إلكترونية", price: 4999, color: "text-violet-400", gradient: "from-violet-500 to-purple-600" },
  { icon: Rocket, name: "App / SaaS", nameAr: "تطبيق / SaaS", price: 17999, color: "text-rose-400", gradient: "from-rose-500 to-pink-600" },
];

export default function CatalogueTease() {
  const { language, dir } = useLanguage();
  const isFr = language === "fr";

  return (
    <section id="catalogue" className="py-24 bg-slate-950 relative overflow-hidden" dir={dir}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-5">
            <Tag className="w-4 h-4" />
            <span>{isFr ? "Promotions d'été — jusqu'à -33%" : "عروض الصيف — خصم حتى 33%"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
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
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {isFr
              ? "Des forfaits complets avec prix transparents. Téléchargez le catalogue Excel gratuitement."
              : "حزم متكاملة بأسعار شفافة. قم بتحميل الكتالوج Excel مجاناً."}
          </p>
        </div>

        {/* Package cards row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative group bg-slate-900/60 border rounded-2xl p-5 hover:shadow-xl transition-all duration-300 ${
                pkg.popular
                  ? "border-emerald-500/40 hover:border-emerald-500/60 hover:shadow-emerald-500/10"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold whitespace-nowrap">
                  {isFr ? "⭐ Populaire" : "⭐ الأكثر طلباً"}
                </span>
              )}
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${pkg.gradient} flex items-center justify-center mb-4 shadow-lg`}
              >
                <pkg.icon className="w-5 h-5 text-white" />
              </div>
              <p className={`text-sm font-semibold ${pkg.color} mb-1`}>
                {isFr ? pkg.name : pkg.nameAr}
              </p>
              <p className="text-white font-bold">
                {pkg.price.toLocaleString()}{" "}
                <span className="text-slate-400 text-xs font-normal">MAD</span>
              </p>
              <p className="text-slate-500 text-xs mt-1">
                {isFr ? "Prix promo" : "سعر الترقية"}
              </p>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/catalogue"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold shadow-xl shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <LayoutGrid className="w-5 h-5" />
            {isFr ? "Voir le catalogue complet" : "عرض الكتالوج الكامل"}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/catalogue"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/20 text-white hover:bg-white/10 hover:border-emerald-500/30 font-semibold transition-all"
          >
            <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
            {isFr ? "Télécharger en Excel" : "تحميل Excel"}
          </Link>
        </div>
      </div>
    </section>
  );
}
