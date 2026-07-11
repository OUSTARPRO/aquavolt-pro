import { useLanguage } from "@/hooks/useLanguage";
import { promos } from "@/lib/catalogData";
import { Tag, Clock, Copy, Check } from "lucide-react";
import { useState } from "react";

const colorMap: Record<string, string> = {
  emerald:
    "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-emerald-500/10",
  violet:
    "bg-violet-500/10 border-violet-500/30 text-violet-400 shadow-violet-500/10",
  amber:
    "bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-amber-500/10",
};

const badgeColorMap: Record<string, string> = {
  emerald: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  violet: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  amber: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

export default function CataloguePromos() {
  const { language, dir } = useLanguage();
  const isFr = language === "fr";
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const daysLeft = (expiresAt: string) => {
    const diff = Math.ceil(
      (new Date(expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    return Math.max(0, diff);
  };

  return (
    <section className="py-12" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-rose-500/15 flex items-center justify-center flex-shrink-0">
            <Tag className="w-5 h-5 text-rose-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              {isFr ? "Promotions & Codes de réduction" : "العروض وأكواد الخصم"}
            </h2>
            <p className="text-slate-400 text-sm">
              {isFr
                ? "Profitez de nos offres exclusives avant leur expiration"
                : "استفد من عروضنا الحصرية قبل انتهاء صلاحيتها"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {promos.map((promo) => {
            const left = daysLeft(promo.expiresAt);
            return (
              <div
                key={promo.id}
                className={`relative rounded-2xl border p-5 shadow-xl ${colorMap[promo.color]}`}
              >
                {/* Discount badge */}
                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full border text-xs font-bold ${badgeColorMap[promo.color]}`}
                >
                  {promo.type === "percent"
                    ? `-${promo.discount}%`
                    : `-${promo.discount} MAD`}
                </div>

                <h3 className="text-lg font-bold text-white mb-1 pr-20">
                  {isFr ? promo.label : promo.labelAr}
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  {isFr ? promo.description : promo.descriptionAr}
                </p>

                {/* Code & copy */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1 bg-slate-950/60 rounded-xl border border-white/10 px-4 py-2 font-mono text-base font-bold tracking-widest text-white text-center">
                    {promo.code}
                  </div>
                  <button
                    onClick={() => copyCode(promo.code, promo.id)}
                    className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    title={isFr ? "Copier" : "نسخ"}
                  >
                    {copiedId === promo.id ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </div>

                {/* Expires */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    {isFr
                      ? `Expire dans ${left} jours`
                      : `تنتهي خلال ${left} يوم`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
