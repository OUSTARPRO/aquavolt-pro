import { useMemo, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
import { products, type Product, type ProductCategory } from "@/lib/products";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Loader2,
  Package,
} from "lucide-react";

const WHATSAPP_NUMBER = "212664662629";

const moroccanCities = [
  "Khouribga", "Casablanca", "Rabat", "Marrakech", "Fès", "Tanger", "Agadir",
  "Oujda", "Meknès", "Tétouan", "Safi", "El Jadida", "Béni Mellal", "Settat",
  "Kénitra", "Nador", "Laâyoune", "Dakhla", "Autre",
];

const categoryMeta: Record<
  ProductCategory,
  { icon: typeof Zap; color: string; labelKey: "poolCategory" | "electricityCategory" | "plumbingCategory" }
> = {
  pool: { icon: Waves, color: "from-emerald-500 to-teal-600", labelKey: "poolCategory" },
  electricity: { icon: Zap, color: "from-amber-500 to-orange-600", labelKey: "electricityCategory" },
  plumbing: { icon: Droplets, color: "from-sky-500 to-blue-600", labelKey: "plumbingCategory" },
};

type CategoryFilter = "all" | ProductCategory;

export default function Complements() {
  const { language, dir } = useLanguage();
  const T = translations[language];

  const [filter, setFilter] = useState<CategoryFilter>("all");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", city: "", note: "" });

  const filtered = useMemo(
    () => (filter === "all" ? products : products.filter((p) => p.category === filter)),
    [filter]
  );

  const cartEntries = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => {
          const product = products.find((p) => p.id === id);
          return product ? { product, qty } : null;
        })
        .filter((e): e is { product: Product; qty: number } => e !== null && e.qty > 0),
    [cart]
  );

  const totalItems = cartEntries.reduce((sum, e) => sum + e.qty, 0);
  const totalPrice = cartEntries.reduce((sum, e) => sum + e.qty * e.product.price, 0);

  const setQty = (id: string, qty: number) =>
    setCart((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });

  const canSend = form.name.trim() !== "" && form.phone.trim() !== "" && form.city !== "";

  const handleSend = () => {
    if (!canSend || cartEntries.length === 0) return;
    setSending(true);

    const lines = cartEntries
      .map((e) => `- ${e.qty} x ${e.product.nameFr} = ${e.qty * e.product.price} DH`)
      .join("\n");
    const message =
      `*Nouvelle commande de complements*\n\n` +
      `*Client:* ${form.name}\n` +
      `*Telephone:* ${form.phone}\n` +
      `*Ville:* ${form.city}\n\n` +
      `*Produits:*\n${lines}\n\n` +
      `*Total estime:* ${totalPrice} DH\n` +
      `*Note:* ${form.note || "N/A"}\n\n` +
      `Commande envoyee depuis AquaVolt Pro.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      window.open(url, "_blank");
      setSubmitted(true);
      setSending(false);
    }, 500);
  };

  const resetOrder = () => {
    setCart({});
    setForm({ name: "", phone: "", city: "", note: "" });
    setSubmitted(false);
    setDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white" dir={dir}>
      <Navbar />
      <main className="pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/30">
              <Package className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {T.complementsTitle}
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              {T.complementsSubtitle}
            </p>
            <p className="text-slate-500 text-sm mt-3">{T.indicativePriceNote}</p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {(
              [
                { value: "all" as const, label: T.all },
                { value: "pool" as const, label: T.poolCategory },
                { value: "electricity" as const, label: T.electricityCategory },
                { value: "plumbing" as const, label: T.plumbingCategory },
              ]
            ).map((c) => (
              <button
                key={c.value}
                onClick={() => setFilter(c.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  filter === c.value
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                    : "bg-slate-900 text-slate-400 border-white/10 hover:text-white"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Products grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((product) => {
              const meta = categoryMeta[product.category];
              const qty = cart[product.id] || 0;
              return (
                <div
                  key={product.id}
                  className="bg-slate-900/50 border border-white/10 rounded-2xl p-5 hover:border-emerald-500/30 transition-all flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${meta.color} flex items-center justify-center shadow-lg shrink-0`}
                    >
                      <meta.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs text-slate-500 bg-slate-800/80 border border-white/5 rounded-full px-2.5 py-1">
                      {T[meta.labelKey]}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold mb-1">
                    {language === "fr" ? product.nameFr : product.nameAr}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
                    {language === "fr" ? product.descFr : product.descAr}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <span className="text-emerald-400 font-bold">
                      {product.price} {T.currency}
                    </span>
                    {qty === 0 ? (
                      <Button
                        size="sm"
                        onClick={() => setQty(product.id, 1)}
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        {T.addProduct}
                      </Button>
                    ) : (
                      <div className="flex items-center gap-1 bg-slate-800 border border-white/10 rounded-lg p-1">
                        <button
                          onClick={() => setQty(product.id, qty - 1)}
                          className="w-7 h-7 rounded-md flex items-center justify-center text-slate-300 hover:bg-white/10 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-white font-semibold text-sm">
                          {qty}
                        </span>
                        <button
                          onClick={() => setQty(product.id, qty + 1)}
                          className="w-7 h-7 rounded-md flex items-center justify-center text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Sticky cart bar */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-emerald-500/20 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4" dir={dir}>
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <ShoppingCart className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm truncate">
                  {totalItems} {T.articles}
                </p>
                <p className="text-emerald-400 text-sm font-bold">
                  {T.estimatedTotal}: {totalPrice} {T.currency}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCart({})}
                className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 hidden sm:flex"
              >
                <Trash2 className="w-4 h-4 mr-1.5" />
                {T.clearCart}
              </Button>
              <Button
                onClick={() => setDialogOpen(true)}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/25"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {T.orderNow}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Order dialog */}
      <Dialog open={dialogOpen} onOpenChange={(open) => !sending && setDialogOpen(open)}>
        <DialogContent className="bg-slate-900 border-white/10 text-white sm:max-w-lg" dir={dir}>
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{T.orderSuccessTitle}</h2>
              <p className="text-slate-400 text-sm mb-6">{T.orderSuccessDesc}</p>
              <Button
                onClick={resetOrder}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white"
              >
                {T.newOrder}
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-white">{T.orderTitle}</DialogTitle>
                <DialogDescription className="text-slate-400">
                  {T.orderSubtitle}
                </DialogDescription>
              </DialogHeader>

              {/* Order summary */}
              <div className="bg-slate-800/50 border border-white/10 rounded-xl p-4 max-h-40 overflow-y-auto space-y-2">
                {cartEntries.map((e) => (
                  <div key={e.product.id} className="flex items-center justify-between text-sm">
                    <span className="text-slate-300 truncate">
                      {e.qty} × {language === "fr" ? e.product.nameFr : e.product.nameAr}
                    </span>
                    <span className="text-emerald-400 font-medium shrink-0 ml-3">
                      {e.qty * e.product.price} {T.currency}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between text-sm font-bold pt-2 border-t border-white/10">
                  <span className="text-white">{T.estimatedTotal}</span>
                  <span className="text-emerald-400">
                    {totalPrice} {T.currency}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-300 mb-1.5 block">{T.clientName}</label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder={T.clientName}
                    className="bg-slate-800 border-white/10 text-white placeholder:text-slate-500"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-300 mb-1.5 block">{T.clientPhone}</label>
                  <Input
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="+212 6XX XXX XXX"
                    className="bg-slate-800 border-white/10 text-white placeholder:text-slate-500"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-300 mb-1.5 block">{T.deliveryCity}</label>
                  <Select
                    value={form.city}
                    onValueChange={(v) => setForm((f) => ({ ...f, city: v }))}
                  >
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
                  <label className="text-sm text-slate-300 mb-1.5 block">{T.orderNote}</label>
                  <Textarea
                    value={form.note}
                    onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                    placeholder={T.orderNote}
                    className="bg-slate-800 border-white/10 text-white placeholder:text-slate-500 min-h-[70px]"
                  />
                </div>
              </div>

              <Button
                onClick={handleSend}
                disabled={!canSend || sending}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white disabled:opacity-50"
              >
                {sending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                {T.sendOrder}
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
