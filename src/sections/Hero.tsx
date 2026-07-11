import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, FileSpreadsheet, Globe2 } from "lucide-react";
import { Link } from "react-router";

export default function Hero() {
  const { language, dir } = useLanguage();
  const T = translations[language];

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      dir={dir}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/hero-pool.jpg"
          alt="AquaVolt Pro"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-teal-900/20" />
      </div>

      {/* Animated particles/dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6 backdrop-blur-sm">
          <Globe2 className="w-4 h-4" />
          <span>
            {language === "fr"
              ? "Creation de sites web pour tout le Maroc"
              : "إنشاء مواقع ويب في جميع أنحاء المغرب"}
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
          {T.heroTitle.split("Aqua")[0]}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
            Aqua
          </span>
          <span className="text-white">Volt</span>
          <span className="text-teal-300 text-3xl sm:text-4xl lg:text-5xl font-light ml-2">
            Pro
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-slate-300 mb-4 font-light">
          {T.heroSubtitle}
        </p>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          {T.heroDescription}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/devis">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-xl shadow-emerald-500/30 text-base px-8 py-6"
            >
              {T.heroCta}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <a href="#services">
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 hover:border-emerald-500/40 text-base px-8 py-6"
            >
              {T.heroCta2}
            </Button>
          </a>
        </div>

        {/* Service icons */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {[
            { icon: Globe2, label: language === "fr" ? "Sites web" : "مواقع الويب" },
            { icon: BarChart3, label: language === "fr" ? "Manager" : "إدارة" },
            { icon: FileSpreadsheet, label: language === "fr" ? "Excel auto" : "Excel آلي" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-emerald-500/30 transition-colors"
            >
              <item.icon className="w-7 h-7 text-emerald-400" />
              <span className="text-xs text-slate-300 font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  );
}
