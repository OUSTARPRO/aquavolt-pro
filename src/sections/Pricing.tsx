import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
import { trpc } from "@/providers/trpc";
import { Link } from "react-router";
import {
  Zap,
  Droplets,
  Waves,
  Wrench,
  Check,
  Star,
  Tag,
  Loader2,
  MessageCircle,
  ArrowRight,
  Sparkles,
  TrendingDown,
} from "lucide-react";
import type { CatalogueItem } from "@db/schema";

const categoryConfig = {
  electricity: {
    icon: Zap,
    gradient: "from-amber-500 to-orange-500",
    glow: "shadow-amber-500/20",
    border: "border-amber-500/30",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    key: "catalogueElectricity" as const,
  },
  plumbing: {
    icon: Droplets,
    gradient: "from-sky-500 to-blue-600",
    glow: "shadow-sky-500/20",
    border: "border-sky-500/30",
    badge: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    key: "cataloguePlumbing" as const,
  },
  pool: {
    icon: Waves,
    gradient: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/20",
    border: "border-emerald-500/30",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    key: "cataloguePool" as const,
  },
  maintenance: {
    icon: Wrench,
    gradient: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/20",
    border: "border-violet-500/30",
    badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    key: "catalogueMaintenance" as const,
  },
};

const planConfig = {
  basic: { label: "cataloguePlanBasic" as const, color: "text-slate-300" },
  standard: { label: "cataloguePlanStandard" as const, color: "text-emerald-400" },
  premium: { label: "cataloguePlanPremium" as const, color: "text-amber-400" },
};

type Category = keyof typeof categoryConfig | "all";

function formatPrice(price: number) {
  return new Intl.NumberFormat("fr-MA").format(price);
}

function PricingCard({ item, language }: { item: CatalogueItem; language: string }) {
  const T = translations[language as keyof typeof translations];
  const cat = categoryConfig[item.category];
  const plan = planConfig[item.plan];
  const Icon = cat.icon;
  const isAr = language === "ar";
  const name = (isAr && item.nameAr) ? item.nameAr : item.name;
  const features: string[] = (isAr && item.featuresAr && Array.isArray(item.featuresAr) && item.featuresAr.length > 0)
    ? (item.featuresAr as string[])
    : (item.features as string[]);
  const promoLabel = (isAr && item.promoLabelAr) ? item.promoLabelAr : item.promoLabel;
  const isMaintenance = item.category === "maintenance";
  const saving = item.originalPrice ? item.originalPrice - item.price : 0;
  const whatsappMsg = isAr
    ? `مرحباً أكوا فولت برو، أريد طلب الباقة: ${name} بسعر ${formatPrice(item.price)} درهم`
    : `Bonjour AquaVolt Pro, je suis intéressé par le pack: ${name} à ${formatPrice(item.price)} MAD`;
  const whatsappUrl = `https://wa.me/212600000000?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div
      className={`relative group flex flex-col rounded-2xl border bg-slate-900/60 backdrop-blur-sm transition-all duration-500
        hover:shadow-2xl hover:-translate-y-1
        ${item.isFeatured
          ? `${cat.border} shadow-xl ${cat.glow} ring-1 ring-inset ring-white/5`
          : "border-white/10 hover:border-white/20"
        }`}
    >
      {/* Featured banner */}
      {item.isFeatured && (
        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${cat.gradient} text-white shadow-lg z-10`}>
          <Star className="w-3 h-3 fill-white" />
          {promoLabel || T.catalogueFeaturedTag}
        </div>
      )}

      {/* Promo ribbon (non-featured items with promo) */}
      {item.isPromo && !item.isFeatured && promoLabel && (
        <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 z-10">
          <Tag className="w-3 h-3" />
          {promoLabel}
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center shadow-lg ${cat.glow} flex-shrink-0`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <span className={`text-xs font-medium ${plan.color} uppercase tracking-wider`}>
              {T[plan.label]}
            </span>
            <h3 className="text-base font-bold text-white leading-snug mt-0.5 line-clamp-2">
              {name}
            </h3>
          </div>
        </div>

        {/* Price */}
        <div className="mb-5">
          {item.originalPrice && (
            <div className="flex items-center gap-2 mb-1">
              <span className="text-slate-500 line-through text-sm">
                {formatPrice(item.originalPrice)} {T.catalogueMad}
              </span>
              {saving > 0 && (
                <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <TrendingDown className="w-3 h-3" />
                  -{formatPrice(saving)} {T.catalogueMad}
                </span>
              )}
            </div>
          )}
          <div className="flex items-end gap-1">
            <span className={`text-3xl font-extrabold bg-gradient-to-r ${cat.gradient} bg-clip-text text-transparent`}>
              {formatPrice(item.price)}
            </span>
            <span className="text-slate-400 text-sm mb-1">
              {T.catalogueMad}{isMaintenance ? T.catalogueYear : ""}
            </span>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-2.5 flex-1 mb-6">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
              <span className={`mt-0.5 w-4 h-4 flex-shrink-0 rounded-full bg-gradient-to-br ${cat.gradient} flex items-center justify-center`}>
                <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
              </span>
              {feature}
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="flex flex-col gap-2 mt-auto">
          <Link
            to="/devis"
            className={`flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-all
              bg-gradient-to-r ${cat.gradient} text-white shadow-md hover:shadow-lg hover:opacity-90`}
          >
            {T.catalogueCtaQuote}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-all
              bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 hover:bg-[#25D366]/20"
          >
            <MessageCircle className="w-4 h-4" />
            {T.catalogueCtaWhatsapp}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Pricing() {
  const { language, dir } = useLanguage();
  const T = translations[language as keyof typeof translations];
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const { data: items, isLoading } = trpc.catalogue.list.useQuery();

  const categories: Category[] = ["all", "electricity", "plumbing", "pool", "maintenance"];

  const filtered = items
    ? activeCategory === "all"
      ? items
      : items.filter((i) => i.category === activeCategory)
    : [];

  const promoItems = items ? items.filter((i) => i.isPromo) : [];

  return (
    <section id="catalogue" className="py-24 bg-slate-950 relative overflow-hidden" dir={dir}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/3 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-500/3 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            {T.cataloguePromoExpiry}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{T.catalogueTitle}</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">{T.catalogueSubtitle}</p>
        </div>

        {/* Promo Banner */}
        {promoItems.length > 0 && (
          <div className="mb-12 p-5 rounded-2xl bg-gradient-to-r from-rose-500/10 via-orange-500/10 to-amber-500/10 border border-rose-500/20 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                <Tag className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">{T.cataloguePromoTitle}</p>
                <p className="text-slate-400 text-sm">{T.cataloguePromoSubtitle}</p>
              </div>
            </div>
            <div className={`flex flex-wrap gap-2 ${dir === "rtl" ? "mr-auto" : "ml-auto"}`}>
              {promoItems.map((item) => {
                const saving = item.originalPrice ? item.originalPrice - item.price : 0;
                if (!saving) return null;
                const isAr = language === "ar";
                const name = (isAr && item.nameAr) ? item.nameAr : item.name;
                return (
                  <span key={item.id} className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
                    {name} — {T.catalogueSaving} {formatPrice(saving)} {T.catalogueMad}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const cfg = cat !== "all" ? categoryConfig[cat] : null;
            const Icon = cfg?.icon;
            const label = cat === "all"
              ? T.catalogueAll
              : T[cfg!.key];
            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border
                  ${isActive
                    ? cfg
                      ? `bg-gradient-to-r ${cfg.gradient} text-white border-transparent shadow-lg`
                      : "bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-transparent shadow-lg"
                    : "bg-slate-900 text-slate-400 border-white/10 hover:text-white hover:border-white/20"
                  }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {label}
              </button>
            );
          })}
        </div>

        {/* Cards Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <PricingCard key={item.id} item={item} language={language} />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <p className="text-slate-400 mb-4">
            {language === "fr"
              ? "Besoin d'un devis personnalisé ? Contactez-nous gratuitement !"
              : "تحتاج إلى عرض مخصص؟ تواصل معنا مجاناً!"}
          </p>
          <Link
            to="/devis"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/25"
          >
            {T.heroCta}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
