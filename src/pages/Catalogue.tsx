import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import ChatBot from "@/components/ChatBot";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
import {
  websitePacks,
  managementPlans,
  excelServices,
  extraOptions,
  promoBanner,
  buildOrderUrl,
  formatPrice,
  discountPercent,
  type CatalogueItem,
} from "@/lib/catalogue";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  Settings,
  FileSpreadsheet,
  PlusCircle,
  Check,
  Star,
  Clock,
  Tag,
  MessageCircle,
  Sparkles,
} from "lucide-react";

function PriceBlock({
  item,
  language,
}: {
  item: CatalogueItem;
  language: "fr" | "ar";
}) {
  const T = translations[language];

  if (item.price === null) {
    return (
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-extrabold text-white">{T.onQuote}</span>
      </div>
    );
  }

  return (
    <div>
      {item.oldPrice && (
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm text-slate-500 line-through">
            {formatPrice(item.oldPrice)} {T.currency}
            {item.unit ? item.unit[language] : ""}
          </span>
          <Badge className="bg-rose-500/15 text-rose-400 border border-rose-500/30 hover:bg-rose-500/15 text-[10px] px-1.5 py-0">
            -{discountPercent(item.price, item.oldPrice)}%
          </Badge>
        </div>
      )}
      <div className="flex items-baseline gap-1.5">
        <span className="text-3xl font-extrabold text-white">
          {formatPrice(item.price)}
        </span>
        <span className="text-emerald-400 font-semibold">{T.currency}</span>
        {item.unit && (
          <span className="text-slate-400 text-sm">{item.unit[language]}</span>
        )}
      </div>
    </div>
  );
}

function CatalogueCard({
  item,
  language,
  dir,
}: {
  item: CatalogueItem;
  language: "fr" | "ar";
  dir: string;
}) {
  const T = translations[language];

  return (
    <div
      dir={dir}
      className={`relative flex flex-col rounded-2xl border bg-slate-900/50 p-6 transition-all duration-300 hover:-translate-y-1 ${
        item.popular
          ? "border-emerald-500/50 shadow-xl shadow-emerald-500/10"
          : "border-white/10 hover:border-emerald-500/30"
      }`}
    >
      {item.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 shadow-lg shadow-emerald-500/30 gap-1 hover:from-emerald-500 hover:to-teal-600">
            <Star className="w-3 h-3 fill-current" />
            {T.popular}
          </Badge>
        </div>
      )}

      <h3 className="text-lg font-bold text-white mb-1">
        {item.name[language]}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-4 min-h-[40px]">
        {item.description[language]}
      </p>

      <div className="mb-4">
        <PriceBlock item={item} language={language} />
      </div>

      {item.delivery && (
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
          <Clock className="w-3.5 h-3.5 text-emerald-400" />
          {item.delivery[language]}
        </div>
      )}

      <ul className="space-y-2.5 mb-6 flex-1">
        {item.features.map((f) => (
          <li key={f.fr} className="flex items-start gap-2 text-sm text-slate-300">
            <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            <span>{f[language]}</span>
          </li>
        ))}
      </ul>

      <a
        href={buildOrderUrl(
          item.name.fr,
          item.price,
          item.unit ? item.unit.fr : undefined
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto"
      >
        <Button
          className={`w-full ${
            item.popular
              ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/25"
              : "bg-slate-800 hover:bg-slate-700 text-white border border-white/10"
          }`}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          {item.price === null ? T.contactUs : T.orderNow}
        </Button>
      </a>
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
  dir,
}: {
  icon: typeof Globe;
  title: string;
  subtitle: string;
  dir: string;
}) {
  return (
    <div className="text-center mb-10" dir={dir}>
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25 mb-4">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{title}</h2>
      <p className="text-slate-400 max-w-2xl mx-auto">{subtitle}</p>
    </div>
  );
}

export default function Catalogue() {
  const { language, dir } = useLanguage();
  const T = translations[language];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main>
        {/* Header */}
        <div className="pt-32 pb-8 relative overflow-hidden" dir={dir}>
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 to-transparent" />
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>{T.promo}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {T.catalogueTitle}
            </h1>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              {T.catalogueSubtitle}
            </p>
          </div>
        </div>

        {/* Promo banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16" dir={dir}>
          <div className="flex items-center justify-center gap-3 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 px-6 py-4 text-center">
            <Tag className="w-5 h-5 text-amber-400 shrink-0" />
            <p className="text-amber-200 text-sm sm:text-base font-medium">
              {promoBanner[language]}
            </p>
          </div>
        </div>

        {/* Websites */}
        <section id="sites" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <SectionHeader
            icon={Globe}
            title={T.catalogueWebsites}
            subtitle={T.catalogueWebsitesDesc}
            dir={dir}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 pt-3">
            {websitePacks.map((item) => (
              <CatalogueCard key={item.id} item={item} language={language} dir={dir} />
            ))}
          </div>
        </section>

        {/* Management */}
        <section
          id="gestion"
          className="relative py-24 mb-24 border-y border-white/5 bg-slate-900/30"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <SectionHeader
              icon={Settings}
              title={T.catalogueManagement}
              subtitle={T.catalogueManagementDesc}
              dir={dir}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-3">
              {managementPlans.map((item) => (
                <CatalogueCard key={item.id} item={item} language={language} dir={dir} />
              ))}
            </div>
          </div>
        </section>

        {/* Excel */}
        <section id="excel" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <SectionHeader
            icon={FileSpreadsheet}
            title={T.catalogueExcel}
            subtitle={T.catalogueExcelDesc}
            dir={dir}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-3">
            {excelServices.map((item) => (
              <CatalogueCard key={item.id} item={item} language={language} dir={dir} />
            ))}
          </div>
        </section>

        {/* Extra options */}
        <section id="options" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <SectionHeader
            icon={PlusCircle}
            title={T.catalogueOptions}
            subtitle={T.catalogueOptionsDesc}
            dir={dir}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" dir={dir}>
            {extraOptions.map((opt) => (
              <div
                key={opt.id}
                className="flex flex-col justify-between rounded-xl border border-white/10 bg-slate-900/50 p-5 hover:border-emerald-500/30 transition-colors"
              >
                <p className="text-white text-sm font-medium mb-3">
                  {opt.name[language]}
                </p>
                <div className="flex items-end justify-between gap-2">
                  <div>
                    {opt.oldPrice && (
                      <span className="block text-xs text-slate-500 line-through">
                        {formatPrice(opt.oldPrice)} {T.currency}
                      </span>
                    )}
                    <span className="text-lg font-bold text-emerald-400">
                      {formatPrice(opt.price)} {T.currency}
                      {opt.unit && (
                        <span className="text-xs text-slate-400 font-normal">
                          {opt.unit[language]}
                        </span>
                      )}
                    </span>
                  </div>
                  <a
                    href={buildOrderUrl(
                      opt.name.fr,
                      opt.price,
                      opt.unit ? opt.unit.fr : undefined
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300"
                    >
                      {T.addOption}
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24" dir={dir}>
          <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900/40 via-slate-900 to-teal-900/40 p-10 text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                {T.catalogueCtaTitle}
              </h2>
              <p className="text-slate-300 mb-6 max-w-xl mx-auto">
                {T.catalogueCtaText}
              </p>
              <a
                href={buildOrderUrl("Projet personnalisé", null)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/25"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {T.contactUs}
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatBot />
      <WhatsAppButton />
    </div>
  );
}
