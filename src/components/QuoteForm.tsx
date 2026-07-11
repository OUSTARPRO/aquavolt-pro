import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  ArrowLeft,
  BarChart3,
  CheckCircle,
  FileSpreadsheet,
  Globe2,
  Loader2,
  Settings2,
  ShoppingBag,
  Store,
} from "lucide-react";

const packs = [
  {
    value: "starter",
    labelFr: "Site Vitrine Starter (3 200 MAD)",
    labelAr: "موقع تعريفي Starter (3200 درهم)",
    icon: Globe2,
    color: "text-sky-400",
  },
  {
    value: "business-pro",
    labelFr: "Business Pro (5 900 MAD)",
    labelAr: "باقة Business Pro (5900 درهم)",
    icon: ShoppingBag,
    color: "text-emerald-400",
  },
  {
    value: "ecommerce-manager",
    labelFr: "E-commerce Manager (9 900 MAD)",
    labelAr: "متجر إلكتروني Manager (9900 درهم)",
    icon: Store,
    color: "text-violet-400",
  },
  {
    value: "excel-automation",
    labelFr: "Automation Excel Suite (4 900 MAD)",
    labelAr: "باقة Excel Automation (4900 درهم)",
    icon: FileSpreadsheet,
    color: "text-amber-400",
  },
];

const options = [
  {
    value: "monthly-management",
    labelFr: "Gestion mensuelle du site",
    labelAr: "إدارة شهرية للموقع",
    icon: Settings2,
  },
  {
    value: "excel-reports",
    labelFr: "Reporting Excel automatique",
    labelAr: "تقارير Excel تلقائية",
    icon: FileSpreadsheet,
  },
  {
    value: "dashboard-kpi",
    labelFr: "Dashboard KPI manager",
    labelAr: "لوحة مؤشرات KPI للمدير",
    icon: BarChart3,
  },
];

const WHATSAPP_NUMBER = "212664662629";

export default function QuoteForm() {
  const { language, dir } = useLanguage();
  const T = translations[language];
  const isFr = language === "fr";
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    pack: "",
    selectedOptions: [] as string[],
    details: "",
    budget: "",
    name: "",
    email: "",
    phone: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleOption = (value: string) => {
    setForm((prev) => ({
      ...prev,
      selectedOptions: prev.selectedOptions.includes(value)
        ? prev.selectedOptions.filter((item) => item !== value)
        : [...prev.selectedOptions, value],
    }));
  };

  const canNext =
    (step === 1 && form.pack) ||
    (step === 2 && (form.selectedOptions.length > 0 || form.details)) ||
    (step === 3 && form.name && form.phone);

  const getPackLabel = (value: string) => {
    const pack = packs.find((item) => item.value === value);
    if (!pack) return value;
    return isFr ? pack.labelFr : pack.labelAr;
  };

  const getOptionsLabel = (values: string[]) => {
    if (!values.length) return isFr ? "Aucune option" : "بدون خيارات";

    return values
      .map((value) => {
        const option = options.find((item) => item.value === value);
        return option ? (isFr ? option.labelFr : option.labelAr) : value;
      })
      .join(", ");
  };

  const handleSubmit = () => {
    if (!form.pack || !form.name || !form.phone) return;

    setSending(true);

    const packLabel = getPackLabel(form.pack);
    const selectedOptions = getOptionsLabel(form.selectedOptions);
    const message =
      `*Nouvelle demande de devis web*\n\n*Nom:* ${form.name}\n*Telephone:* ${form.phone}\n*Email:* ${
        form.email || "N/A"
      }\n*Pack choisi:* ${packLabel}\n*Options:* ${selectedOptions}\n*Budget cible:* ${
        form.budget || "N/A"
      }\n*Details:* ${form.details || "N/A"}\n\nMerci pour votre confiance.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      window.open(url, "_blank");
      setSubmitted(true);
      setSending(false);
    }, 500);
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-16" dir={dir}>
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">
          {isFr ? "Demande envoyee !" : "تم ارسال الطلب بنجاح!"}
        </h2>
        <p className="text-slate-400">
          {isFr
            ? "Votre demande a ete pre-remplie sur WhatsApp avec votre pack et vos options."
            : "تم تجهيز طلبك على واتساب مع الباقة والخيارات المختارة."}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto" dir={dir}>
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex-1 flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                s <= step
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-800 text-slate-500"
              }`}
            >
              {s < step ? <CheckCircle className="w-4 h-4" /> : s}
            </div>
            {s < 3 && (
              <div
                className={`flex-1 h-1 rounded-full transition-colors ${
                  s < step ? "bg-emerald-500" : "bg-slate-800"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 sm:p-8">
        {/* Step 1: Pack */}
        {step === 1 && (
          <div>
            <h3 className="text-xl font-bold text-white mb-2">
              {isFr ? "Choisissez votre pack web" : "اختر باقة موقعك"}
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              {isFr ? "Etape 1 - Catalogue des packs" : "الخطوة 1 - كتالوج الباقات"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {packs.map((pack) => (
                <button
                  key={pack.value}
                  onClick={() => update("pack", pack.value)}
                  className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                    form.pack === pack.value
                      ? "border-emerald-500 bg-emerald-500/10"
                      : "border-white/10 bg-slate-800/50 hover:border-white/20"
                  }`}
                >
                  <pack.icon className={`w-6 h-6 ${pack.color}`} />
                  <span className="text-white font-medium text-sm">
                    {isFr ? pack.labelFr : pack.labelAr}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
        {/* Step 2: Options + Details */}
        {step === 2 && (
          <div>
            <h3 className="text-xl font-bold text-white mb-2">
              {isFr ? "Options manager & automation" : "خيارات المدير والأتمتة"}
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              {isFr ? "Etape 2 - Completez votre offre" : "الخطوة 2 - اكمل عرضك"}
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-300 mb-2">
                  {isFr ? "Options complementaires" : "خيارات إضافية"}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {options.map((option) => {
                    const selected = form.selectedOptions.includes(option.value);
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => toggleOption(option.value)}
                        className={`flex items-center gap-2 p-3 rounded-lg border text-sm transition-colors ${
                          selected
                            ? "border-emerald-500 bg-emerald-500/10 text-white"
                            : "border-white/10 bg-slate-800/50 text-slate-300 hover:border-white/20"
                        }`}
                      >
                        <option.icon className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{isFr ? option.labelFr : option.labelAr}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-300 mb-2 block">
                  {isFr ? "Budget cible (optionnel)" : "الميزانية المستهدفة (اختياري)"}
                </label>
                <Input
                  value={form.budget}
                  onChange={(e) => update("budget", e.target.value)}
                  placeholder={isFr ? "Ex: 6 000 MAD" : "مثال: 6000 درهم"}
                  className="bg-slate-800 border-white/10 text-white placeholder:text-slate-500"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300 mb-2 block">
                  {isFr ? "Objectif et details du projet" : "هدف المشروع والتفاصيل"}
                </label>
                <Textarea
                  value={form.details}
                  onChange={(e) => update("details", e.target.value)}
                  placeholder={
                    isFr
                      ? "Ex: Je veux un catalogue de produits avec export Excel automatique."
                      : "مثال: أريد كتالوج منتجات مع تصدير Excel تلقائي."
                  }
                  className="bg-slate-800 border-white/10 text-white placeholder:text-slate-500 min-h-[100px]"
                />
              </div>
            </div>
          </div>
        )}
        {/* Step 3: Contact */}
        {step === 3 && (
          <div>
            <h3 className="text-xl font-bold text-white mb-2">
              {isFr ? "Vos coordonnees" : "معلومات التواصل"}
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              {isFr ? "Etape 3 - Confirmation" : "الخطوة 3 - التأكيد"}
            </p>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-300 mb-2 block">
                  {T.yourName}
                </label>
                <Input
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder={T.yourName}
                  className="bg-slate-800 border-white/10 text-white placeholder:text-slate-500"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300 mb-2 block">
                  {T.yourPhone}
                </label>
                <Input
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+212 6 00 00 00 00"
                  className="bg-slate-800 border-white/10 text-white placeholder:text-slate-500"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300 mb-2 block">
                  {T.yourEmail}
                </label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder={T.yourEmail}
                  className="bg-slate-800 border-white/10 text-white placeholder:text-slate-500"
                />
              </div>
            </div>
          </div>
        )}
        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
          <Button
            variant="outline"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="border-white/10 text-slate-300 hover:bg-white/5"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {T.previous}
          </Button>
          {step < 3 ? (
            <Button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canNext}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white disabled:opacity-50"
            >
              {T.next}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canNext || sending}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white disabled:opacity-50"
            >
              {sending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              {T.submit}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
