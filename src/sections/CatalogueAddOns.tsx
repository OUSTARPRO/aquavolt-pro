import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { addOns } from "@/lib/catalogData";
import {
  Palette,
  PenLine,
  Wrench,
  TrendingUp,
  GraduationCap,
  Share2,
  Camera,
  Bot,
  Plus,
  Minus,
  ShoppingCart,
} from "lucide-react";
import { Link } from "react-router";

const iconMap: Record<string, React.ElementType> = {
  palette: Palette,
  pencil: PenLine,
  wrench: Wrench,
  "trending-up": TrendingUp,
  "graduation-cap": GraduationCap,
  share2: Share2,
  camera: Camera,
  bot: Bot,
};

export default function CatalogueAddOns() {
  const { language, dir } = useLanguage();
  const isFr = language === "fr";
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const total = addOns
    .filter((a) => selected.has(a.id))
    .reduce((sum, a) => sum + a.price, 0);

  return (
    <section id="options" className="py-16 bg-slate-900/30" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
            <Plus className="w-4 h-4" />
            <span>{isFr ? "Options & Extras" : "الخيارات والإضافات"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {isFr ? "Personnalisez votre projet" : "خصّص مشروعك"}
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {isFr
              ? "Ajoutez des options à la carte pour compléter votre solution web."
              : "أضف خيارات à la carte لإكمال حلك على الويب."}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {addOns.map((addon) => {
            const Icon = iconMap[addon.icon] ?? Plus;
            const isSelected = selected.has(addon.id);
            return (
              <button
                key={addon.id}
                onClick={() => toggle(addon.id)}
                className={`relative text-left p-5 rounded-2xl border transition-all duration-300 ${
                  isSelected
                    ? "bg-amber-500/10 border-amber-500/50 shadow-lg shadow-amber-500/10"
                    : "bg-slate-900/50 border-white/8 hover:border-white/20"
                }`}
              >
                {/* Check/Uncheck pill */}
                <div
                  className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? "bg-amber-500 text-white"
                      : "bg-slate-800 text-slate-600"
                  }`}
                >
                  {isSelected ? (
                    <Minus className="w-3.5 h-3.5" />
                  ) : (
                    <Plus className="w-3.5 h-3.5" />
                  )}
                </div>

                {/* Icon */}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${
                    isSelected ? "bg-amber-500/20" : "bg-slate-800"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${isSelected ? "text-amber-400" : "text-slate-400"}`}
                  />
                </div>

                {/* Name */}
                <h4 className="font-semibold text-white text-sm mb-1 pr-8">
                  {isFr ? addon.name : addon.nameAr}
                </h4>

                {/* Description */}
                <p className="text-slate-500 text-xs leading-relaxed mb-3">
                  {isFr ? addon.description : addon.descriptionAr}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-xl font-bold ${isSelected ? "text-amber-400" : "text-white"}`}
                  >
                    {addon.price.toLocaleString("fr-MA")}
                  </span>
                  <span className="text-slate-400 text-xs">
                    MAD{isFr ? addon.unit : addon.unitAr}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Summary bar */}
        {selected.size > 0 && (
          <div className="sticky bottom-6 z-20 mx-auto max-w-2xl">
            <div className="flex items-center justify-between gap-4 px-6 py-4 rounded-2xl bg-amber-500/10 border border-amber-500/40 backdrop-blur-xl shadow-2xl shadow-amber-500/20">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-amber-400" />
                <div>
                  <p className="text-white font-semibold text-sm">
                    {selected.size}{" "}
                    {isFr
                      ? selected.size > 1
                        ? "options sélectionnées"
                        : "option sélectionnée"
                      : "خيارات مختارة"}
                  </p>
                  <p className="text-amber-400 font-bold text-lg">
                    +{total.toLocaleString("fr-MA")} MAD
                  </p>
                </div>
              </div>
              <Link to="/devis">
                <button className="bg-amber-500 hover:bg-amber-400 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
                  {isFr ? "Inclure dans le devis" : "تضمين في العرض"}
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
