import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import ChatBot from "@/components/ChatBot";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  websitePacks,
  catalogOptions,
  discountPercent,
  formatMAD,
  PROMO_LABEL_FR,
  PROMO_LABEL_AR,
  WHATSAPP_NUMBER,
  type WebsitePack,
} from "@/lib/catalog";
import { downloadCatalogExcel, downloadQuoteExcel } from "@/lib/catalogExcel";
import {
  Globe,
  Check,
  Sparkles,
  FileSpreadsheet,
  MessageCircle,
  Clock,
  Loader2,
  Tag,
  Star,
  Calculator,
} from "lucide-react";
import { toast } from "sonner";

export default function Catalogue() {
  const { language, dir } = useLanguage();
  const fr = language === "fr";

  const [selectedPackId, setSelectedPackId] = useState<string>("vitrine");
  const [selectedOptionIds, setSelectedOptionIds] = useState<Set<string>>(new Set());
  const [downloadingCatalog, setDownloadingCatalog] = useState(false);
  const [downloadingQuote, setDownloadingQuote] = useState(false);

  const selectedPack = useMemo(
    () => websitePacks.find((p) => p.id === selectedPackId) ?? websitePacks[0],
    [selectedPackId]
  );
  const selectedOptions = useMemo(
    () => catalogOptions.filter((o) => selectedOptionIds.has(o.id)),
    [selectedOptionIds]
  );

  const oneTimeTotal =
    selectedPack.promoPrice +
    selectedOptions.filter((o) => !o.monthly).reduce((sum, o) => sum + o.price, 0);
  const monthlyTotal = selectedOptions
    .filter((o) => o.monthly)
    .reduce((sum, o) => sum + o.price, 0);

  const optionCategories = useMemo(() => {
    const map = new Map<string, typeof catalogOptions>();
    for (const opt of catalogOptions) {
      const key = fr ? opt.categoryFr : opt.categoryAr;
      map.set(key, [...(map.get(key) ?? []), opt]);
    }
    return [...map.entries()];
  }, [fr]);

  const toggleOption = (id: string) => {
    setSelectedOptionIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleDownloadCatalog = async () => {
    setDownloadingCatalog(true);
    try {
      await downloadCatalogExcel(language);
      toast.success(
        fr ? "Catalogue Excel téléchargé !" : "تم تحميل الكتالوج بصيغة Excel!"
      );
    } catch {
      toast.error(fr ? "Erreur lors de la génération" : "خطأ أثناء الإنشاء");
    } finally {
      setDownloadingCatalog(false);
    }
  };

  const handleDownloadQuote = async () => {
    setDownloadingQuote(true);
    try {
      await downloadQuoteExcel(language, selectedPack, selectedOptions);
      toast.success(
        fr ? "Devis Excel généré automatiquement !" : "تم إنشاء عرض السعر Excel تلقائيًا!"
      );
    } catch {
      toast.error(fr ? "Erreur lors de la génération" : "خطأ أثناء الإنشاء");
    } finally {
      setDownloadingQuote(false);
    }
  };

  const whatsappOrderUrl = (pack: WebsitePack) => {
    const optionsList = selectedOptions
      .map((o) => `- ${fr ? o.nameFr : o.nameAr} (${formatMAD(o.price, language)}${o.monthly ? (fr ? "/mois" : "/شهر") : ""})`)
      .join("\n");
    const message = fr
      ? `Bonjour AquaVolt Pro,\n\nJe suis intéressé par le pack *${pack.nameFr}* à ${formatMAD(pack.promoPrice, language)} (au lieu de ${formatMAD(pack.price, language)}).${optionsList && pack.id === selectedPackId ? `\n\nOptions choisies :\n${optionsList}` : ""}\n\nPouvez-vous me contacter ?`
      : `مرحباً أكوا فولت برو،\n\nأنا مهتم بباقة *${pack.nameAr}* بسعر ${formatMAD(pack.promoPrice, language)} (بدلاً من ${formatMAD(pack.price, language)}).${optionsList && pack.id === selectedPackId ? `\n\nالخيارات المختارة:\n${optionsList}` : ""}\n\nهل يمكنكم الاتصال بي؟`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white" dir={dir}>
      <Navbar />
      <main>
        {/* Header */}
        <div className="pt-32 pb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 to-transparent" />
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
                <Globe className="w-4 h-4" />
                <span>{fr ? "Création de sites web" : "إنشاء المواقع الإلكترونية"}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                {fr ? "Catalogue Sites Web" : "كتالوج المواقع الإلكترونية"}
              </h1>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                {fr
                  ? "Des offres complètes à prix raisonnables : choisissez votre pack, ajoutez vos options et téléchargez votre devis Excel en un clic."
                  : "عروض كاملة بأسعار معقولة: اختر باقتك، أضف خياراتك وحمّل عرض السعر بصيغة Excel بنقرة واحدة."}
              </p>
            </div>

            {/* Promo banner */}
            <div className="flex items-center justify-center gap-3 max-w-3xl mx-auto rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-rose-500/15 border border-amber-500/30 px-6 py-4 mb-8">
              <Sparkles className="w-6 h-6 text-amber-400 shrink-0" />
              <p className="text-amber-300 font-semibold text-sm sm:text-base">
                {fr ? PROMO_LABEL_FR : PROMO_LABEL_AR}
              </p>
            </div>

            {/* Excel export */}
            <div className="flex justify-center mb-4">
              <Button
                onClick={handleDownloadCatalog}
                disabled={downloadingCatalog}
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/25 gap-2"
              >
                {downloadingCatalog ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <FileSpreadsheet className="w-5 h-5" />
                )}
                {fr ? "Télécharger le catalogue Excel" : "تحميل الكتالوج Excel"}
              </Button>
            </div>
            <p className="text-center text-slate-500 text-xs mb-4">
              {fr
                ? "Fichier .xlsx généré automatiquement avec tous les packs, options et prix"
                : "ملف .xlsx يُنشأ تلقائيًا مع جميع الباقات والخيارات والأسعار"}
            </p>
          </div>
        </div>

        {/* Packs grid */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {websitePacks.map((pack) => {
                const isSelected = pack.id === selectedPackId;
                return (
                  <div
                    key={pack.id}
                    className={`group relative flex flex-col rounded-2xl bg-slate-900/50 border transition-all duration-300 hover:shadow-2xl ${pack.glow} ${
                      isSelected
                        ? "border-emerald-500/60 shadow-xl shadow-emerald-500/10"
                        : "border-white/10 hover:border-emerald-500/30"
                    }`}
                  >
                    {pack.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                        <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 px-3 py-1 gap-1 shadow-lg shadow-emerald-500/30">
                          <Star className="w-3 h-3 fill-current" />
                          {fr ? "Le plus demandé" : "الأكثر طلبًا"}
                        </Badge>
                      </div>
                    )}

                    {/* Promo ribbon */}
                    <div className="absolute top-4 end-4">
                      <Badge className="bg-rose-500/15 text-rose-400 border border-rose-500/30 gap-1">
                        <Tag className="w-3 h-3" />
                        -{discountPercent(pack)}%
                      </Badge>
                    </div>

                    <div className="p-6 pb-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pack.color} flex items-center justify-center shadow-lg ${pack.glow} mb-4`}
                      >
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {fr ? pack.nameFr : pack.nameAr}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed min-h-[40px]">
                        {fr ? pack.descFr : pack.descAr}
                      </p>

                      {/* Prices */}
                      <div className="flex items-baseline gap-2 mt-4">
                        <span className="text-3xl font-extrabold text-emerald-400">
                          {formatMAD(pack.promoPrice, language)}
                        </span>
                        <span className="text-slate-500 line-through text-sm">
                          {formatMAD(pack.price, language)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-1">
                        <Clock className="w-3.5 h-3.5" />
                        {fr
                          ? `Livraison en ${pack.deliveryDays} jours`
                          : `التسليم خلال ${pack.deliveryDays} يومًا`}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="px-6 pb-4 flex-1">
                      <ul className="space-y-2">
                        {(fr ? pack.featuresFr : pack.featuresAr).map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm text-slate-300">
                            <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="p-6 pt-2 space-y-2">
                      <Button
                        onClick={() => setSelectedPackId(pack.id)}
                        variant={isSelected ? "default" : "outline"}
                        className={`w-full ${
                          isSelected
                            ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white"
                            : "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300"
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-4 h-4" />
                            {fr ? "Pack sélectionné" : "الباقة المختارة"}
                          </>
                        ) : (
                          <>{fr ? "Choisir ce pack" : "اختر هذه الباقة"}</>
                        )}
                      </Button>
                      <a
                        href={whatsappOrderUrl(pack)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full h-9 rounded-md text-sm font-medium bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        {fr ? "Commander via WhatsApp" : "اطلب عبر واتساب"}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Options configurator */}
        <section className="pb-24 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                {fr ? "Personnalisez votre pack" : "خصص باقتك"}
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                {fr
                  ? "Cochez les options souhaitées : le total se calcule automatiquement et votre devis Excel est généré en un clic."
                  : "حدد الخيارات المطلوبة: يُحسب المجموع تلقائيًا ويُنشأ عرض السعر Excel بنقرة واحدة."}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Options list */}
              <div className="lg:col-span-2 space-y-6">
                {optionCategories.map(([category, options]) => (
                  <div
                    key={category}
                    className="rounded-2xl bg-slate-900/50 border border-white/10 p-5"
                  >
                    <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wide mb-4">
                      {category}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {options.map((opt) => {
                        const checked = selectedOptionIds.has(opt.id);
                        return (
                          <label
                            key={opt.id}
                            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                              checked
                                ? "border-emerald-500 bg-emerald-500/10"
                                : "border-white/10 bg-slate-800/50 hover:border-white/20"
                            }`}
                          >
                            <Checkbox
                              checked={checked}
                              onCheckedChange={() => toggleOption(opt.id)}
                              className="border-white/30 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                            />
                            <span className="flex-1 text-sm text-slate-200">
                              {fr ? opt.nameFr : opt.nameAr}
                            </span>
                            <span className="text-sm font-semibold text-emerald-400 whitespace-nowrap">
                              {formatMAD(opt.price, language)}
                              {opt.monthly && (
                                <span className="text-slate-500 text-xs">
                                  {fr ? "/mois" : "/شهر"}
                                </span>
                              )}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="lg:sticky lg:top-28 h-fit">
                <div className="rounded-2xl bg-slate-900/80 border border-emerald-500/20 p-6 shadow-xl shadow-emerald-500/5">
                  <div className="flex items-center gap-2 mb-5">
                    <Calculator className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg font-bold text-white">
                      {fr ? "Récapitulatif" : "الملخص"}
                    </h3>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">
                        {fr ? selectedPack.nameFr : selectedPack.nameAr}
                      </span>
                      <span className="text-white font-semibold">
                        {formatMAD(selectedPack.promoPrice, language)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-500">
                      <span>{fr ? "Prix normal" : "السعر العادي"}</span>
                      <span className="line-through">
                        {formatMAD(selectedPack.price, language)}
                      </span>
                    </div>

                    {selectedOptions.map((opt) => (
                      <div key={opt.id} className="flex justify-between items-center gap-2">
                        <span className="text-slate-400 truncate">
                          + {fr ? opt.nameFr : opt.nameAr}
                        </span>
                        <span className="text-slate-300 whitespace-nowrap">
                          {formatMAD(opt.price, language)}
                          {opt.monthly ? (fr ? "/mois" : "/شهر") : ""}
                        </span>
                      </div>
                    ))}

                    <div className="border-t border-white/10 pt-3 mt-3 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-bold">
                          {fr ? "Total (une fois)" : "المجموع (مرة واحدة)"}
                        </span>
                        <span className="text-2xl font-extrabold text-emerald-400">
                          {formatMAD(oneTimeTotal, language)}
                        </span>
                      </div>
                      {monthlyTotal > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">
                            {fr ? "Abonnements" : "الاشتراكات"}
                          </span>
                          <span className="text-amber-400 font-semibold">
                            {formatMAD(monthlyTotal, language)}
                            {fr ? "/mois" : "/شهر"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <Button
                      onClick={handleDownloadQuote}
                      disabled={downloadingQuote}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white gap-2"
                    >
                      {downloadingQuote ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <FileSpreadsheet className="w-4 h-4" />
                      )}
                      {fr ? "Générer mon devis Excel" : "أنشئ عرض السعر Excel"}
                    </Button>
                    <a
                      href={whatsappOrderUrl(selectedPack)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full h-9 rounded-md text-sm font-medium bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {fr ? "Envoyer sur WhatsApp" : "أرسل عبر واتساب"}
                    </a>
                  </div>

                  <p className="text-slate-500 text-xs text-center mt-4">
                    {fr
                      ? "Prix TTC en dirhams. Devis valable 30 jours."
                      : "الأسعار بالدرهم شاملة الضرائب. العرض صالح لمدة 30 يومًا."}
                  </p>
                </div>
              </div>
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
