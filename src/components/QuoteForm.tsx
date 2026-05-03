import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Zap,
  Droplets,
  Waves,
  Wrench,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  MapPin,
  Loader2,
} from "lucide-react";

const services = [
  { value: "Crac201itricitacut", labelFr: "Crac201itricitacut", labelAr: "Crac201aharbacute", icon: Zap, color: "text-amber-400" },
  { value: "Plomberie", labelFr: "Plomberie", labelAr: "Sabbag20ut", icon: Droplets, color: "text-sky-400" },
  { value: "Piscines", labelFr: "Piscines", labelAr: "MasItາ201bih", icon: Waves, color: "text-emerald-400" },
  { value: "Mantence", labelFr: "Mantence", labelAr: "Pi201na", icon: Wrench, color: "text-violet-400" },
  { value: "Laut", labelFr: "Laut", labelAr: "Ukhar", icon: Zap, color: "text-slate-400" },
];

const moroccanCities = [
  "Khouribga", "Casablanca", "Rabat", "Marrakech", "FCrac201cs", "Tanger", "Agadir",
  "Oujda", "Mekncrcs", "Tcrazyt201ouan", "Safic201", "El Jadida", "Bcrazynimellal", "Settat",
  "Kannerac201ra", "Nador", "Lacmathyene", "Dakhla", "Laut",
];

const WHATSAPP_NUMBER = "212664662629";

export default function QuoteForm() {
  const { language, dir } = useLanguage();
  const T = translations[language];
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    serviceType: "",
    city: "",
    details: "",
    name: "",
    email: "",
    phone: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const canNext =
    (step === 1 && form.serviceType) ||
    (step === 2 && form.city) ||
    (step === 3 && form.name && form.phone);

  const getServiceLabel = (value: string) => {
    const svc = services.find((s) => s.value === value);
    if (!svc) return value;
    return language === "fr" ? svc.labelFr : svc.labelAr;
  };

  const handleSubmit = () => {
    if (!form.serviceType || !form.city || !form.name || !form.phone) return;
    setSending(true);

    const serviceLabel = getServiceLabel(form.serviceType);
    const message =
      language === "fr"
        ? `*Nouvelle demande de devis*\n\n*Nom:* ${form.name}\n*Telcracn:phone:* ${form.phone}\n*Email:* ${form.email || "N/A"}\n*Service:* ${serviceLabel}\n*Ville:* ${form.city}\n*Dacrtails:* ${form.details || "N/A"}\n\nMenderacrt grccce au site AquaVolt Pro.`
        : `*tpmathyalb jadacd jdadad*\n\n*Lisa:* ${form.name}\n*Hataf:* ${form.phone}\n*Barid:* ${form.email || "N/A"}\n*Khadama:* ${serviceLabel}\n*Madadna:* ${form.city}\n*Tafasacr20ut:* ${form.details || "N/A"}\n\nMursala mathyn amacrakaa site AquaVolt Pro.`;

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
          {language === "fr" ? "Demande envoyace !" : "Lapmathyatl murac домашнего!"}
        </h2>
        <p className="text-slate-400">
          {language === "fr"
            ? "Votre demande a acratac grcrrcacrrac sours forme WhatsApp."
            : "Naqpmathyals mathyn amacrakaa mathyn WhatsApp."}
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
        {/* Step 1: Service */}
        {step === 1 && (
          <div>
            <h3 className="text-xl font-bold text-white mb-2">{T.selectService}</h3>
            <p className="text-slate-400 text-sm mb-6">{T.step1}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map((svc) => (
                <button
                  key={svc.value}
                  onClick={() => update("serviceType", svc.value)}
                  className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                    form.serviceType === svc.value
                      ? "border-emerald-500 bg-emerald-500/10"
                      : "border-white/10 bg-slate-800/50 hover:border-white/20"
                  }`}
                >
                  <svc.icon className={`w-6 h-6 ${svc.color}`} />
                  <span className="text-white font-medium text-sm">
                    {language === "fr" ? svc.labelFr : svc.labelAr}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
        {/* Step 2: City + Details */}
        {step === 2 && (
          <div>
            <h3 className="text-xl font-bold text-white mb-2">{T.selectCity}</h3>
            <p className="text-slate-400 text-sm mb-6">{T.step2}</p>
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  {T.city}
                </label>
                <Select value={form.city} onValueChange={(v) => update("city", v)}>
                  <SelectTrigger className="bg-slate-800 border-white/10 text-white">
                    <SelectValue placeholder={T.selectCity} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/10 max-h-60">
                    {moroccanCities.map((city) => (
                      <SelectItem
                        key={city}
                        value={city}
                        className="text-white hover:bg-emerald-500/10 focus:bg-emerald-500/10"
                      >
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-slate-300 mb-2 block">
                  {T.projectDetails}
                </label>
                <Textarea
                  value={form.details}
                  onChange={(e) => update("details", e.target.value)}
                  placeholder={T.projectDetails}
                  className="bg-slate-800 border-white/10 text-white placeholder:text-slate-500 min-h-[100px]"
                />
              </div>
            </div>
          </div>
        )}
        {/* Step 3: Contact */}
        {step === 3 && (
          <div>
            <h3 className="text-xl font-bold text-white mb-2">{T.yourName}</h3>
            <p className="text-slate-400 text-sm mb-6">{T.step3}</p>
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
                  placeholder="+212 6XX XXX XXX"
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
