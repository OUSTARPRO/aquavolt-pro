import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
import { trpc } from "@/providers/trpc";
import {
  PACKAGE_TYPE_LABELS,
  CATALOG_CURRENCY,
  DEFAULT_PACKAGES,
  type CatalogItem,
  type PackageType,
} from "@contracts/catalog";
import {
  Check,
  Star,
  Clock,
  Sparkles,
  MessageCircle,
  Loader2,
  Rocket,
  LayoutTemplate,
  Image as ImageIcon,
  Newspaper,
  ShoppingCart,
  AppWindow,
  Wand2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const WHATSAPP_NUMBER = "212664662629";

const TYPE_ICONS: Record<PackageType, LucideIcon> = {
  landing: Rocket,
  vitrine: LayoutTemplate,
  portfolio: ImageIcon,
  blog: Newspaper,
  ecommerce: ShoppingCart,
  application: AppWindow,
  surmesure: Wand2,
};

function formatPrice(value: number, language: "fr" | "ar") {
  return value.toLocaleString(language === "fr" ? "fr-FR" : "ar-MA");
}

export default function Catalogue({ id = "catalogue" }: { id?: string }) {
  const { language, dir } = useLanguage();
  const T = translations[language];
  const { data, isLoading } = trpc.catalog.list.useQuery(undefined, {
    retry: 1,
  });

  // Always keep the catalog populated: fall back to the built-in offers when
  // the API returns nothing or is unavailable.
  const fallback = DEFAULT_PACKAGES.filter((p) => p.active);
  const items =
    data && data.length > 0 ? data : isLoading ? undefined : fallback;

  return (
    <section id={id} className="py-24 bg-slate-950 relative" dir={dir}>
      {/* Background accents */}
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>{T.catalogBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {T.catalogTitle}
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {T.catalogSubtitle}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
          </div>
        ) : items && items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {items.map((item) => (
              <CatalogCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-slate-500">{T.catalogEmpty}</div>
        )}

        <p className="text-center text-slate-500 text-sm mt-12">
          {T.catalogHelp}
        </p>
      </div>
    </section>
  );
}

function CatalogCard({ item }: { item: CatalogItem }) {
  const { language } = useLanguage();
  const T = translations[language];
  const Icon = TYPE_ICONS[item.type];

  const name = language === "ar" && item.nameAr ? item.nameAr : item.name;
  const description =
    language === "ar" && item.descriptionAr
      ? item.descriptionAr
      : item.description;
  const options =
    language === "ar" && item.optionsAr && item.optionsAr.length > 0
      ? item.optionsAr
      : item.options;
  const typeLabel = PACKAGE_TYPE_LABELS[item.type][language];

  const hasPromo =
    item.promoPrice != null &&
    item.promoPrice > 0 &&
    item.promoPrice < item.price;
  const discount = hasPromo
    ? Math.round((1 - (item.promoPrice as number) / item.price) * 100)
    : 0;
  const isCustom = item.price <= 0;
  const effectivePrice = hasPromo ? (item.promoPrice as number) : item.price;

  const whatsappMessage = `${T.catalogWhatsappPrefix} "${name}" (${typeLabel})${
    isCustom
      ? ""
      : ` - ${T.catalogWhatsappPrice}: ${formatPrice(
          effectivePrice,
          language,
        )} ${CATALOG_CURRENCY}`
  }.`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    whatsappMessage,
  )}`;

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-slate-900/60 border transition-all duration-500 hover:-translate-y-1 ${
        item.popular
          ? "border-emerald-500/50 shadow-2xl shadow-emerald-500/10"
          : "border-white/10 hover:border-emerald-500/30"
      }`}
    >
      {/* Popular ribbon */}
      {item.popular && (
        <div className="absolute top-4 right-0 z-10 flex items-center gap-1 rounded-l-full bg-gradient-to-r from-emerald-500 to-teal-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
          <Star className="w-3.5 h-3.5 fill-current" />
          {T.catalogPopular}
        </div>
      )}

      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-slate-950/70 backdrop-blur border border-white/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="px-2.5 py-1 rounded-lg bg-slate-950/70 backdrop-blur border border-white/10 text-xs font-medium text-slate-200">
            {typeLabel}
          </span>
        </div>
        {hasPromo && (
          <div className="absolute bottom-3 left-4 flex items-center gap-1 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white shadow-lg">
            -{discount}% {T.catalogPromo}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
        {description && (
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            {description}
          </p>
        )}

        {/* Price */}
        <div className="mb-4">
          {isCustom ? (
            <div className="text-2xl font-bold text-emerald-400">
              {T.catalogOnQuote}
            </div>
          ) : (
            <div className="flex items-end gap-2 flex-wrap">
              <span className="text-xs text-slate-500 mb-1">
                {T.catalogFrom}
              </span>
              <span className="text-3xl font-extrabold text-white">
                {formatPrice(effectivePrice, language)}
              </span>
              <span className="text-sm font-medium text-slate-400 mb-1">
                {CATALOG_CURRENCY}
              </span>
              {hasPromo && (
                <span className="text-sm text-slate-500 line-through mb-1">
                  {formatPrice(item.price, language)} {CATALOG_CURRENCY}
                </span>
              )}
            </div>
          )}
          {hasPromo && (
            <div className="mt-1 text-xs font-medium text-emerald-400">
              {T.catalogSave} {formatPrice(item.price - effectivePrice, language)}{" "}
              {CATALOG_CURRENCY}
            </div>
          )}
        </div>

        {/* Delivery */}
        {item.deliveryDays != null && (
          <div className="inline-flex items-center gap-1.5 text-xs text-slate-400 mb-4">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            {T.catalogDelivery} {item.deliveryDays} {T.catalogDays}
          </div>
        )}

        {/* Options */}
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
            {T.catalogIncluded}
          </p>
          <ul className="space-y-2">
            {options.map((opt, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-emerald-500/15 flex items-center justify-center">
                  <Check className="w-3 h-3 text-emerald-400" />
                </span>
                {opt}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
            item.popular
              ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-500"
              : "bg-white/5 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/10"
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          {isCustom ? T.catalogQuote : T.catalogOrder}
        </a>
      </div>
    </div>
  );
}
