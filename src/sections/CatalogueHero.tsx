import { useLanguage } from "@/hooks/useLanguage";
import { Globe, Sparkles, TrendingUp, FileSpreadsheet } from "lucide-react";

export default function CatalogueHero() {
  const { language, dir } = useLanguage();
  const isFr = language === "fr";

  const stats = [
    {
      value: "50+",
      label: isFr ? "Sites livrés" : "مواقع مسلّمة",
      icon: Globe,
    },
    {
      value: "98%",
      label: isFr ? "Clients satisfaits" : "عملاء راضون",
      icon: TrendingUp,
    },
    {
      value: "24h",
      label: isFr ? "Délai de réponse" : "وقت الاستجابة",
      icon: Sparkles,
    },
  ];

  return (
    <section
      className="relative pt-32 pb-16 overflow-hidden"
      dir={dir}
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/8 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-violet-500/8 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/50 via-slate-950 to-slate-950" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
            <FileSpreadsheet className="w-4 h-4" />
            <span>
              {isFr
                ? "Catalogue Officiel 2026 — Export Excel disponible"
                : "الكتالوج الرسمي 2026 — تصدير Excel متاح"}
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-center text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
          {isFr ? (
            <>
              Catalogue{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">
                Sites Web
              </span>
              <br />& Tarifs 2026
            </>
          ) : (
            <>
              كتالوج{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">
                المواقع الإلكترونية
              </span>
              <br />
              والأسعار 2026
            </>
          )}
        </h1>

        <p className="text-center text-slate-400 text-lg sm:text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
          {isFr
            ? "Des solutions web professionnelles adaptées à chaque budget. Choisissez votre package, personnalisez vos options et bénéficiez de nos promotions exclusives."
            : "حلول ويب احترافية مناسبة لكل ميزانية. اختر حزمتك، خصّص خياراتك واستفد من عروضنا الحصرية."}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                <stat.icon className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="flex justify-center">
          <div className="flex flex-col items-center gap-2 text-slate-500 text-sm">
            <span>{isFr ? "Découvrez nos offres" : "اكتشف عروضنا"}</span>
            <div className="w-px h-12 bg-gradient-to-b from-slate-500 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
