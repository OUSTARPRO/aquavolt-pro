import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import ChatBot from "@/components/ChatBot";
import WhatsAppButton from "@/components/WhatsAppButton";
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
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Waves,
  Droplets,
  Zap,
  Package,
  CheckCircle,
  Loader2,
  MapPin,
} from "lucide-react";

const WHATSAPP_NUMBER = "212664662629";

type Category = "pool" | "plumbing" | "electricity";

interface Product {
  id: string;
  category: Category;
  nameFr: string;
  nameAr: string;
  price: number;
  unit: string;
}

const products: Product[] = [
  // Pool
  { id: "chlore", category: "pool", nameFr: "Chlore en galets (5 kg)", nameAr: "أقراص الكلور (5 كغ)", price: 250, unit: "u" },
  { id: "ph-minus", category: "pool", nameFr: "pH Minus (5 kg)", nameAr: "خافض الحموضة pH (5 كغ)", price: 90, unit: "u" },
  { id: "anti-algues", category: "pool", nameFr: "Anti-algues (1 L)", nameAr: "مبيد الطحالب (1 ل)", price: 120, unit: "u" },
  { id: "floculant", category: "pool", nameFr: "Floculant clarifiant (1 L)", nameAr: "مروق الماء (1 ل)", price: 80, unit: "u" },
  { id: "cartouche-filtre", category: "pool", nameFr: "Cartouche de filtre", nameAr: "خرطوشة الفلتر", price: 180, unit: "u" },
  // Plumbing
  { id: "joint-silicone", category: "plumbing", nameFr: "Joint silicone sanitaire", nameAr: "سيليكون صحي", price: 45, unit: "u" },
  { id: "flexible-douche", category: "plumbing", nameFr: "Flexible de douche inox", nameAr: "خرطوم الدش (ستانلس)", price: 65, unit: "u" },
  { id: "mitigeur", category: "plumbing", nameFr: "Robinet mitigeur", nameAr: "صنبور خلاط", price: 320, unit: "u" },
  { id: "raccord-te", category: "plumbing", nameFr: "Raccord té PVC", nameAr: "وصلة PVC حرف T", price: 25, unit: "u" },
  // Electricity
  { id: "disjoncteur", category: "electricity", nameFr: "Disjoncteur 16A", nameAr: "قاطع تيار 16 أمبير", price: 70, unit: "u" },
  { id: "prise", category: "electricity", nameFr: "Prise de courant", nameAr: "مقبس كهربائي", price: 35, unit: "u" },
  { id: "interrupteur", category: "electricity", nameFr: "Interrupteur va-et-vient", nameAr: "مفتاح تبديل", price: 40, unit: "u" },
  { id: "ampoule-led", category: "electricity", nameFr: "Ampoule LED 9W", nameAr: "مصباح LED 9 واط", price: 30, unit: "u" },
  { id: "cable", category: "electricity", nameFr: "Câble électrique (rouleau 100 m)", nameAr: "كابل كهربائي (لفة 100 م)", price: 450, unit: "u" },
];

const categoryMeta: Record<Category, { icon: typeof Waves; color: string }> = {
  pool: { icon: Waves, color: "text-emerald-400" },
  plumbing: { icon: Droplets, color: "text-sky-400" },
  electricity: { icon: Zap, color: "text-amber-400" },
};

const moroccanCities = [
  "Khouribga", "Casablanca", "Rabat", "Marrakech", "Fès", "Tanger", "Agadir",
  "Oujda", "Meknès", "Tétouan", "Safi", "El Jadida", "Béni Mellal", "Settat",
];

export default function Commander() {
  const { language, dir } = useLanguage();
  const T = translations[language];

  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [client, setClient] = useState({ name: "", phone: "", city: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const update = (field: keyof typeof client, value: string) =>
    setClient((prev) => ({ ...prev, [field]: value }));

  const addToCart = (id: string) =>
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));

  const decrement = (id: string) =>
    setCart((prev) => {
      const next = { ...prev };
      const qty = (next[id] || 0) - 1;
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });

  const removeItem = (id: string) =>
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });

  const filteredProducts = useMemo(
    () =>
      activeCategory === "all"
        ? products
        : products.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => ({ product: products.find((p) => p.id === id)!, qty }))
        .filter((item) => item.product),
    [cart]
  );

  const total = cartItems.reduce((sum, { product, qty }) => sum + product.price * qty, 0);
  const itemCount = cartItems.reduce((sum, { qty }) => sum + qty, 0);

  const productName = (p: Product) => (language === "fr" ? p.nameFr : p.nameAr);

  const canSubmit = cartItems.length > 0 && client.name.trim() && client.phone.trim();

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSending(true);

    const lines = cartItems
      .map(({ product, qty }) => `- ${product.nameFr} x${qty} = ${product.price * qty} MAD`)
      .join("\n");
    const message =
`*Nouvelle commande de compléments*\n\n*Client:* ${client.name}\n*Telephone:* ${client.phone}\n*Ville:* ${client.city || "N/A"}\n\n*Produits:*\n${lines}\n\n*Total estime:* ${total} MAD\n*Notes:* ${client.notes || "N/A"}\n\nMerci d'avoir utilise AquaVolt Pro.`;
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

  const categoryTabs: { value: Category | "all"; label: string }[] = [
    { value: "all", label: T.orderCategoryAll },
    { value: "pool", label: T.orderCategoryPool },
    { value: "plumbing", label: T.orderCategoryPlumbing },
    { value: "electricity", label: T.orderCategoryElectricity },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main>
        <div className="pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" dir={dir}>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
                <ShoppingCart className="w-4 h-4" />
                <span>{T.order}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                {T.orderTitle}
              </h1>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                {T.orderSubtitle}
              </p>
            </div>

            {submitted ? (
              <div className="max-w-lg mx-auto text-center py-16">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">{T.orderSuccess}</h2>
                <p className="text-slate-400 mb-8">{T.orderSuccessDesc}</p>
                <Button
                  onClick={resetOrder}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white"
                >
                  {T.orderNewOrder}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Catalog */}
                <div className="lg:col-span-2">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-emerald-400" />
                    {T.orderCatalog}
                  </h2>

                  {/* Category tabs */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {categoryTabs.map((tab) => (
                      <button
                        key={tab.value}
                        onClick={() => setActiveCategory(tab.value)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeCategory === tab.value
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-900 border border-white/10 text-slate-300 hover:border-emerald-500/30"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {filteredProducts.map((product) => {
                      const Icon = categoryMeta[product.category].icon;
                      const qty = cart[product.id] || 0;
                      return (
                        <div
                          key={product.id}
                          className="flex items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/50 border border-white/10 hover:border-emerald-500/30 transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                              <Icon className={`w-5 h-5 ${categoryMeta[product.category].color}`} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-white text-sm font-medium truncate">
                                {productName(product)}
                              </p>
                              <p className="text-emerald-400 text-sm font-semibold">
                                {product.price} MAD
                              </p>
                            </div>
                          </div>
                          {qty > 0 ? (
                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => decrement(product.id)}
                                className="w-8 h-8 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center text-white hover:border-emerald-500/40"
                                aria-label="decrement"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-6 text-center text-white font-semibold">{qty}</span>
                              <button
                                onClick={() => addToCart(product.id)}
                                className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white hover:bg-emerald-400"
                                aria-label="increment"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => addToCart(product.id)}
                              className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 shrink-0"
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              {T.orderAdd}
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Cart + client info */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 bg-slate-900/50 border border-white/10 rounded-2xl p-6 space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5 text-emerald-400" />
                        {T.orderCart}
                        {itemCount > 0 && (
                          <span className="ml-auto text-sm font-medium text-slate-400">
                            {itemCount} {T.orderItems}
                          </span>
                        )}
                      </h2>

                      {cartItems.length === 0 ? (
                        <p className="text-slate-500 text-sm py-4">{T.orderEmpty}</p>
                      ) : (
                        <div className="space-y-3">
                          {cartItems.map(({ product, qty }) => (
                            <div key={product.id} className="flex items-center gap-2 text-sm">
                              <span className="text-slate-300 flex-1 truncate">
                                {productName(product)}
                              </span>
                              <span className="text-slate-500">x{qty}</span>
                              <span className="text-white font-medium w-20 text-right">
                                {product.price * qty} MAD
                              </span>
                              <button
                                onClick={() => removeItem(product.id)}
                                className="text-slate-500 hover:text-red-400"
                                aria-label="remove"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                          <div className="flex items-center justify-between pt-3 border-t border-white/10">
                            <span className="text-slate-300 font-medium">{T.orderTotal}</span>
                            <span className="text-emerald-400 font-bold text-lg">{total} MAD</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Client info */}
                    <div className="space-y-4 pt-2 border-t border-white/10">
                      <h3 className="text-sm font-semibold text-white">{T.orderClientInfo}</h3>
                      <Input
                        value={client.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder={T.orderClientName}
                        className="bg-slate-800 border-white/10 text-white placeholder:text-slate-500"
                      />
                      <Input
                        value={client.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder={T.orderClientPhone}
                        className="bg-slate-800 border-white/10 text-white placeholder:text-slate-500"
                      />
                      <Select value={client.city} onValueChange={(v) => update("city", v)}>
                        <SelectTrigger className="bg-slate-800 border-white/10 text-white">
                          <span className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-emerald-400" />
                            <SelectValue placeholder={T.orderClientCity} />
                          </span>
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
                      <Textarea
                        value={client.notes}
                        onChange={(e) => update("notes", e.target.value)}
                        placeholder={T.orderNotes}
                        className="bg-slate-800 border-white/10 text-white placeholder:text-slate-500 min-h-[80px]"
                      />
                    </div>

                    <Button
                      onClick={handleSubmit}
                      disabled={!canSubmit || sending}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white disabled:opacity-50"
                    >
                      {sending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <ShoppingCart className="w-4 h-4 mr-2" />}
                      {T.orderSubmit}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <ChatBot />
      <WhatsAppButton />
    </div>
  );
}
