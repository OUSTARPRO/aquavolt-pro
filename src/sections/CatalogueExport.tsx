import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { exportCatalogueToExcel } from "@/lib/excelExport";
import {
  FileSpreadsheet,
  Download,
  CheckCircle2,
  Loader2,
  FileText,
  Globe,
} from "lucide-react";

export default function CatalogueExport() {
  const { language, dir } = useLanguage();
  const isFr = language === "fr";
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleExport = async (lang: "fr" | "ar") => {
    setLoading(true);
    setDone(false);
    // Brief timeout to show loading state
    await new Promise((r) => setTimeout(r, 600));
    try {
      exportCatalogueToExcel(lang);
      setDone(true);
      setTimeout(() => setDone(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: FileText,
      label: isFr ? "4 feuilles structurées" : "4 أوراق منظمة",
      sub: isFr ? "Packages, Fonctionnalités, Options, Promos" : "الحزم، الميزات، الخيارات، العروض",
    },
    {
      icon: Globe,
      label: isFr ? "Bilingue FR / AR" : "ثنائي اللغة FR / AR",
      sub: isFr ? "Exportez dans la langue de votre choix" : "صدّر بلغتك المختارة",
    },
    {
      icon: FileSpreadsheet,
      label: isFr ? "Compatible Excel & Google Sheets" : "متوافق مع Excel و Google Sheets",
      sub: isFr ? "Fichier .xlsx prêt à l'emploi" : "ملف .xlsx جاهز للاستخدام",
    },
  ];

  return (
    <section className="py-20 bg-slate-900/40" dir={dir}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Card */}
        <div className="relative rounded-3xl bg-slate-900 border border-emerald-500/20 overflow-hidden shadow-2xl shadow-emerald-500/5">
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 pointer-events-none" />

          <div className="relative p-8 sm:p-12">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                <FileSpreadsheet className="w-8 h-8 text-emerald-400" />
              </div>
            </div>

            {/* Text */}
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {isFr
                  ? "Exportez le catalogue en Excel"
                  : "صدّر الكتالوج بصيغة Excel"}
              </h2>
              <p className="text-slate-400 text-lg max-w-xl mx-auto">
                {isFr
                  ? "Téléchargez l'intégralité de notre catalogue — packages, options, prix et promotions — dans un fichier Excel prêt à partager."
                  : "حمّل الكتالوج الكامل — الحزم، الخيارات، الأسعار والعروض — في ملف Excel جاهز للمشاركة."}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {features.map((f) => (
                <div
                  key={f.label}
                  className="flex flex-col items-center text-center p-4 rounded-2xl bg-slate-950/50 border border-white/5"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3">
                    <f.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <p className="text-white text-sm font-semibold mb-1">{f.label}</p>
                  <p className="text-slate-500 text-xs">{f.sub}</p>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => handleExport("fr")}
                disabled={loading}
                className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold text-base transition-all shadow-xl shadow-emerald-500/20 disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : done ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Download className="w-5 h-5" />
                )}
                {done
                  ? isFr
                    ? "Téléchargé !"
                    : "تم التحميل!"
                  : isFr
                    ? "Télécharger en Français"
                    : "تحميل بالفرنسية"}
              </button>

              <button
                onClick={() => handleExport("ar")}
                disabled={loading}
                className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-white font-semibold text-base transition-all disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Download className="w-5 h-5" />
                )}
                {isFr ? "Télécharger en Arabe" : "تحميل بالعربية"}
              </button>
            </div>

            {/* Note */}
            <p className="text-center text-slate-600 text-xs mt-6">
              {isFr
                ? "Le fichier Excel contient 4 feuilles : Packages, Fonctionnalités, Options & Extras, Promotions"
                : "يحتوي ملف Excel على 4 أوراق: الحزم، المميزات، الخيارات والإضافات، العروض"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
