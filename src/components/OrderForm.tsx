import { useMemo, useState } from "react";
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
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CheckCircle,
  MapPin,
  Loader2,
  MessageCircle,
} from "lucide-react";

const WHATSAPP_NUMBER = "212664662629";

type Category = "pool" | "plumbing" | "electricity";

interface Product {
  id: string;
  nameFr: string;
  nameAr: string;
  category: Category;
}

const products: Product[] = [
  // Piscine
  { id: "chlore-choc", nameFr: "Chlore choc (seau 5 kg)", nameAr: "كلور صادم (دلو 5 كغ)", category: "pool" },
  { id: "chlore-galets", nameFr: "Chlore lent en galets (seau 5 kg)", nameAr: "أقراص كلور بطيء (دلو 5 كغ)", category: "pool" },
  { id: "ph-plus", nameFr: "pH Plus (5 kg)", nameAr: "رافع الحموضة pH+ (5 كغ)", category: "pool" },
  { id: "ph-minus", nameFr: "pH Minus (5 kg)", nameAr: "خافض الحموضة pH- (5 كغ)", category: "pool" },
  { id: "anti-algues", nameFr: "Anti-algues (bidon 5 L)", nameAr: "مضاد الطحالب (5 لتر)", category: "pool" },
  { id: "floculant", nameFr: "Floculant clarifiant", nameAr: "مُلبّد لتصفية الماء", category: "pool" },
  { id: "bandelettes", nameFr: "Bandelettes d'analyse (x50)", nameAr: "شرائط تحليل الماء (50)", category: "pool" },
  { id: "epuisette", nameFr: "Épuisette + manche télescopique", nameAr: "شبكة تنظيف + عصا تلسكوبية", category: "pool" },
  { id: "balai-fond", nameFr: "Balai aspirateur de fond", nameAr: "مكنسة قاع المسبح", category: "pool" },
  { id: "verre-filtrant", nameFr: "Verre filtrant (sac 20 kg)", nameAr: "زجاج الترشيح (كيس 20 كغ)", category: "pool" },
  { id: "projecteur-led", nameFr: "Projecteur LED piscine", nameAr: "كشاف LED للمسبح", category: "pool" },
  // Plomberie
  { id: "chauffe-eau", nameFr: "Chauffe-eau électrique", nameAr: "سخان ماء كهربائي", category: "plumbing" },
  { id: "mitigeur", nameFr: "Mitigeur / robinetterie", nameAr: "خلاط ماء / صنبور", category: "plumbing" },
  { id: "flexibles", nameFr: "Flexibles et raccords", nameAr: "أنابيب مرنة ووصلات", category: "plumbing" },
  { id: "teflon", nameFr: "Joints et téflon", nameAr: "حلقات إحكام وشريط تفلون", category: "plumbing" },
  { id: "surpresseur", nameFr: "Pompe surpresseur", nameAr: "مضخة ضغط الماء", category: "plumbing" },
  // Électricité
  { id: "disjoncteurs", nameFr: "Disjoncteurs", nameAr: "قواطع كهربائية", category: "electricity" },
  { id: "cable", nameFr: "Câble électrique (rouleau)", nameAr: "كابل كهربائي (لفة)", category: "electricity" },
  { id: "spots-led", nameFr: "Spots LED", nameAr: "مصابيح LED", category: "electricity" },
  { id: "prises", nameFr: "Prises et interrupteurs", nameAr: "مقابس ومفاتيح", category: "electricity" },
  { id: "coffret", nameFr: "Coffret / tableau électrique", nameAr: "لوحة كهربائية", category: "electricity" },
];

const categories: {
  value: Category | "all";
  labelKey: "all" | "pool" | "plumbing" | "electricity";
  icon: typeof Waves;
  color: string;
}[] = [
  { value: "all", labelKey: "all", icon: ShoppingCart, color: "text-slate-300" },
  { value: "pool", labelKey: "pool", icon: Waves, color: "text-emerald-400" },
  { value: "plumbing", labelKey: "plumbing", icon: Droplets, color: "text-sky-400" },
  { value: "electricity", labelKey: "electricity", icon: Zap, color: "text-amber-400" },
];

const moroccanCities = [
  "Khouribga", "Casablanca", "Rabat", "Marrakech", "Fès", "Tanger", "Agadir",
  "Oujda", "Meknès", "Tétouan", "Safi", "El Jadida", "Béni Mellal", "Settat",
  "Kénitra", "Nador", "Laâyoune", "Dakhla", "Autre",
];

export default function OrderForm() {
  const { language, dir } = useLanguage();
  const T = translations[language];
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [client, setClient] = useState({ name: "", phone: "", city: "", notes: "" });

  const visibleProducts = useMemo(
    () =>
      activeCategory === "all"
        ? products
        : products.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  const cartItems = useMemo(
    () =>
      products
        .filter((p) => (cart[p.id] ?? 0) > 0)
        .map((p) => ({ product: p, qty: cart[p.id] })),
    [cart]
  );

  const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const setQty = (id: string, qty: number) =>
    setCart((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });

  const updateClient = (field: string, value: string) =>
    setClient((prev) => ({ ...prev, [field]: value }));

  const canSubmit =
    cartItems.length > 0 && client.name.trim() && client.phone.trim() && client.city;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSending(true);

    const productLines = cartItems
      .map((item) => `- ${item.product.nameFr} x${item.qty}`)
      .join("\n");
    const message =
`*Nouvelle commande de complements*\n\n*Client:* ${client.name}\n*Telephone:* ${client.phone}\n*Ville:* ${client.city}\n\n*Produits commandes:*\n${productLines}\n\n*Remarques:* ${client.notes || "N/A"}\n\nCommande envoyee depuis le site AquaVolt Pro.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      window.open(url, "_blank");
      setSubmitted(true);
      setSending(false);
    }, 500);
  };

  const resetOrder = () => {
    setCart({});
    setClient({ name: "", phone: "", city: "", notes: "" });
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-16" dir={dir}>
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">{T.orderSuccessTitle}</h2>
        <p className="text-slate-400 mb-8">{T.orderSuccessDesc}</p>
        <Button
          onClick={resetOrder}
          variant="outline"
          className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300"
        >
          {T.newOrder}
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8" dir={dir}>
      {/* Catalog */}
      <div className="lg:col-span-3">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                activeCategory === cat.value
                  ? "border-emerald-500 bg-emerald-500/10 text-white"
                  : "border-white/10 bg-slate-900/50 text-slate-400 hover:border-white/20"
              }`}
            >
              <cat.icon className={`w-4 h-4 ${cat.color}`} />
              {T[cat.labelKey]}
            </button>
          ))}
        </div>

        {/* Product list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {visibleProducts.map((product) => {
            const qty = cart[product.id] ?? 0;
            const cat = categories.find((c) => c.value === product.category)!;
            return (
              <div
                key={product.id}
                className={`flex flex-col gap-3 p-4 rounded-xl border transition-all ${
                  qty > 0
                    ? "border-emerald-500/50 bg-emerald-500/5"
                    : "border-white/10 bg-slate-900/50 hover:border-white/20"
                }`}
              >
                <div className="flex items-start gap-3">
                  <cat.icon className={`w-5 h-5 mt-0.5 shrink-0 ${cat.color}`} />
                  <div className="min-w-0">
                    <p className="text-white font-medium text-sm leading-snug">
                      {language === "fr" ? product.nameFr : product.nameAr}
                    </p>
                    <p className="text-slate-500 text-xs mt-1">{T.priceOnRequest}</p>
                  </div>
                </div>
                {qty === 0 ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setQty(product.id, 1)}
                    className="border-white/10 text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-300 hover:border-emerald-500/30 w-full"
                  >
                    <Plus className="w-4 h-4 mr-1.5" />
                    {language === "fr" ? "Ajouter" : "أضف"}
                  </Button>
                ) : (
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => setQty(product.id, qty - 1)}
                      className="w-8 h-8 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center text-slate-300 hover:border-emerald-500/40 hover:text-emerald-400 transition-colors"
                      aria-label="-"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-white font-bold text-sm min-w-[2rem] text-center">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty(product.id, qty + 1)}
                      className="w-8 h-8 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center text-slate-300 hover:border-emerald-500/40 hover:text-emerald-400 transition-colors"
                      aria-label="+"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Order summary + client info */}
      <div className="lg:col-span-2">
        <div className="lg:sticky lg:top-28 bg-slate-900/50 border border-white/10 rounded-2xl p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <ShoppingCart className="w-5 h-5 text-emerald-400" />
              {T.yourOrder}
              {totalQty > 0 && (
                <span className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  {totalQty}
                </span>
              )}
            </h3>
            {cartItems.length === 0 ? (
              <p className="text-slate-500 text-sm">{T.emptyCart}</p>
            ) : (
              <ul className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <li
                    key={item.product.id}
                    className="flex items-center gap-2 text-sm bg-slate-800/60 border border-white/5 rounded-lg px-3 py-2"
                  >
                    <span className="text-slate-200 flex-1 min-w-0 truncate">
                      {language === "fr" ? item.product.nameFr : item.product.nameAr}
                    </span>
                    <span className="text-emerald-400 font-semibold shrink-0">
                      x{item.qty}
                    </span>
                    <button
                      onClick={() => setQty(item.product.id, 0)}
                      className="text-slate-500 hover:text-red-400 transition-colors shrink-0"
                      aria-label="remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-t border-white/10 pt-6 space-y-4">
            <h3 className="text-lg font-bold text-white">{T.clientInfo}</h3>
            <div>
              <label className="text-sm text-slate-300 mb-2 block">{T.clientName}</label>
              <Input
                value={client.name}
                onChange={(e) => updateClient("name", e.target.value)}
                placeholder={T.clientName}
                className="bg-slate-800 border-white/10 text-white placeholder:text-slate-500"
              />
            </div>
            <div>
              <label className="text-sm text-slate-300 mb-2 block">{T.clientPhone}</label>
              <Input
                value={client.phone}
                onChange={(e) => updateClient("phone", e.target.value)}
                placeholder="+212 6XX XXX XXX"
                className="bg-slate-800 border-white/10 text-white placeholder:text-slate-500"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                {T.deliveryCity}
              </label>
              <Select value={client.city} onValueChange={(v) => updateClient("city", v)}>
                <SelectTrigger className="bg-slate-800 border-white/10 text-white">
                  <SelectValue placeholder={T.deliveryCity} />
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
              <label className="text-sm text-slate-300 mb-2 block">{T.orderNotes}</label>
              <Textarea
                value={client.notes}
                onChange={(e) => updateClient("notes", e.target.value)}
                placeholder={T.orderNotes}
                className="bg-slate-800 border-white/10 text-white placeholder:text-slate-500 min-h-[80px]"
              />
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!canSubmit || sending}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/25 disabled:opacity-50 py-6 text-base"
          >
            {sending ? (
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : (
              <MessageCircle className="w-5 h-5 mr-2" />
            )}
            {T.sendOrder}
          </Button>
        </div>
      </div>
    </div>
  );
}
