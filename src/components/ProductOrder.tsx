import { useMemo, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
import {
  products,
  categoryMeta,
  type Product,
  type ProductCategory,
} from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  CheckCircle,
  Loader2,
  Package,
} from "lucide-react";

const WHATSAPP_NUMBER = "212664662629";

type CartState = Record<string, number>;

const categories: (ProductCategory | "all")[] = [
  "all",
  "pool",
  "electricity",
  "plumbing",
  "maintenance",
];

export default function ProductOrder() {
  const { language, dir } = useLanguage();
  const T = translations[language];
  const [activeCat, setActiveCat] = useState<ProductCategory | "all">("all");
  const [cart, setCart] = useState<CartState>({});
  const [client, setClient] = useState({ name: "", city: "", phone: "", notes: "" });
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const catLabel = (cat: ProductCategory | "all") => {
    switch (cat) {
      case "all":
        return T.all;
      case "pool":
        return T.catPool;
      case "electricity":
        return T.catElectricity;
      case "plumbing":
        return T.catPlumbing;
      case "maintenance":
        return T.catMaintenance;
    }
  };

  const productName = (p: Product) => (language === "fr" ? p.nameFr : p.nameAr);
  const productDesc = (p: Product) => (language === "fr" ? p.descFr : p.descAr);
  const productUnit = (p: Product) => (language === "fr" ? p.unitFr : p.unitAr);

  const visibleProducts = useMemo(
    () =>
      activeCat === "all"
        ? products
        : products.filter((p) => p.category === activeCat),
    [activeCat],
  );

  const cartItems = useMemo(
    () =>
      products
        .filter((p) => (cart[p.id] ?? 0) > 0)
        .map((p) => ({ product: p, qty: cart[p.id] })),
    [cart],
  );

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0,
  );

  const setQty = (id: string, qty: number) =>
    setCart((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });

  const add = (id: string) => setQty(id, (cart[id] ?? 0) + 1);
  const remove = (id: string) => setQty(id, (cart[id] ?? 0) - 1);

  const canSubmit = cartItems.length > 0 && client.name.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSending(true);

    const lines = cartItems.map(
      (item) =>
        `- ${item.product.nameFr} x${item.qty} (${item.product.price} DH) = ${
          item.product.price * item.qty
        } DH`,
    );

    const message =
      `*Nouvelle commande de compléments*\n\n` +
      `*Client:* ${client.name}\n` +
      `*Ville:* ${client.city || "N/A"}\n` +
      `*Telephone client:* ${client.phone || "N/A"}\n\n` +
      `*Produits:*\n${lines.join("\n")}\n\n` +
      `*Total estime:* ${total} DH\n` +
      `*Note:* ${client.notes || "N/A"}\n\n` +
      `Merci d'avoir utilise AquaVolt Pro.`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      window.open(url, "_blank");
      setSubmitted(true);
      setSending(false);
    }, 500);
  };

  const reset = () => {
    setCart({});
    setClient({ name: "", city: "", phone: "", notes: "" });
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-16" dir={dir}>
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">
          {T.orderSuccessTitle}
        </h2>
        <p className="text-slate-400 mb-8">{T.orderSuccessDesc}</p>
        <Button
          onClick={reset}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white"
        >
          {T.newOrder}
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" dir={dir}>
      {/* Catalog */}
      <div className="lg:col-span-2">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => {
            const active = activeCat === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  active
                    ? "bg-emerald-500 text-white border-emerald-500"
                    : "bg-slate-900/50 text-slate-300 border-white/10 hover:border-emerald-500/40"
                }`}
              >
                {catLabel(cat)}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {visibleProducts.map((product) => {
            const meta = categoryMeta[product.category];
            const qty = cart[product.id] ?? 0;
            const Icon = meta.icon;
            return (
              <div
                key={product.id}
                className="flex flex-col rounded-2xl bg-slate-900/50 border border-white/10 p-5 hover:border-emerald-500/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${meta.bg} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-emerald-400 font-bold text-lg">
                    {product.price}{" "}
                    <span className="text-xs font-medium text-slate-400">DH</span>
                  </span>
                </div>
                <h3 className="text-white font-semibold mb-1">
                  {productName(product)}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-2 flex-1">
                  {productDesc(product)}
                </p>
                <p className="text-xs text-slate-500 mb-4">{productUnit(product)}</p>

                {qty > 0 ? (
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => remove(product.id)}
                        className="h-9 w-9 border-white/10 text-white hover:bg-white/5"
                        aria-label={T.remove}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center text-white font-semibold">
                        {qty}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => add(product.id)}
                        className="h-9 w-9 border-white/10 text-white hover:bg-white/5"
                        aria-label={T.addToOrder}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <span className="text-sm text-emerald-400 font-medium">
                      {T.added}
                    </span>
                  </div>
                ) : (
                  <Button
                    onClick={() => add(product.id)}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white"
                  >
                    <Plus className="w-4 h-4 mr-1.5" />
                    {T.addToOrder}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Order summary */}
      <div className="lg:col-span-1">
        <div className="lg:sticky lg:top-24 bg-slate-900/50 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">{T.yourOrder}</h3>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <Package className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">{T.emptyOrder}</p>
            </div>
          ) : (
            <>
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto pr-1">
                {cartItems.map(({ product, qty }) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between gap-2 text-sm"
                  >
                    <div className="min-w-0">
                      <p className="text-white truncate">{productName(product)}</p>
                      <p className="text-slate-500 text-xs">
                        {qty} × {product.price} DH
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-slate-300 font-medium">
                        {qty * product.price} DH
                      </span>
                      <button
                        onClick={() => setQty(product.id, 0)}
                        className="text-slate-500 hover:text-red-400 transition-colors"
                        aria-label={T.remove}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between py-3 border-t border-white/10 mb-4">
                <span className="text-slate-300 font-medium">
                  {T.estimatedTotal}
                </span>
                <span className="text-emerald-400 font-bold text-lg">
                  {total} DH
                </span>
              </div>
            </>
          )}

          {/* Client info */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-300">{T.clientInfo}</p>
            <Input
              value={client.name}
              onChange={(e) => setClient((c) => ({ ...c, name: e.target.value }))}
              placeholder={T.clientName}
              className="bg-slate-800 border-white/10 text-white placeholder:text-slate-500"
            />
            <Input
              value={client.city}
              onChange={(e) => setClient((c) => ({ ...c, city: e.target.value }))}
              placeholder={T.clientCity}
              className="bg-slate-800 border-white/10 text-white placeholder:text-slate-500"
            />
            <Input
              value={client.phone}
              onChange={(e) => setClient((c) => ({ ...c, phone: e.target.value }))}
              placeholder={T.clientPhone}
              className="bg-slate-800 border-white/10 text-white placeholder:text-slate-500"
            />
            <Textarea
              value={client.notes}
              onChange={(e) => setClient((c) => ({ ...c, notes: e.target.value }))}
              placeholder={T.orderNotes}
              className="bg-slate-800 border-white/10 text-white placeholder:text-slate-500 min-h-[80px]"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!canSubmit || sending}
            className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white disabled:opacity-50"
          >
            {sending ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <ShoppingCart className="w-4 h-4 mr-2" />
            )}
            {T.orderViaWhatsapp}
          </Button>
          <p className="text-xs text-slate-500 text-center mt-3">
            {T.priceIndicative}
          </p>
        </div>
      </div>
    </div>
  );
}
