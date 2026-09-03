import { useMemo, useState } from "react";
import { CATALOG, computeOrderLines, type CatalogProduct, type ProductCategory } from "@contracts/catalog";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
import { MOROCCAN_CITIES, openWhatsApp } from "@/lib/contact";
import { trpc } from "@/providers/trpc";
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
  CheckCircle,
  Loader2,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  Waves,
  Droplets,
  Zap,
} from "lucide-react";

type Cart = Record<string, number>;

const categoryMeta: Record<
  ProductCategory | "all",
  { icon: typeof Waves; labelKey: "allCategories" | "poolProducts" | "plumbingProducts" | "electricityProducts" }
> = {
  all: { icon: ShoppingCart, labelKey: "allCategories" },
  pool: { icon: Waves, labelKey: "poolProducts" },
  plumbing: { icon: Droplets, labelKey: "plumbingProducts" },
  electricity: { icon: Zap, labelKey: "electricityProducts" },
};

function formatMad(value: number, language: "fr" | "ar") {
  return `${value.toLocaleString(language === "fr" ? "fr-MA" : "ar-MA")} MAD`;
}

export default function OrderForm() {
  const { language, dir } = useLanguage();
  const T = translations[language];
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [cart, setCart] = useState<Cart>({});
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    city: "",
    address: "",
    orderedBy: "",
    notes: "",
  });

  const createOrder = trpc.order.create.useMutation();

  const items = useMemo(
    () =>
      Object.entries(cart)
        .filter(([, qty]) => qty > 0)
        .map(([productId, quantity]) => ({ productId, quantity })),
    [cart],
  );

  const priced = useMemo(() => {
    if (items.length === 0) return null;
    try {
      return computeOrderLines(items);
    } catch {
      return null;
    }
  }, [items]);

  const products = category === "all" ? CATALOG : CATALOG.filter((p) => p.category === category);

  const setQty = (productId: string, quantity: number) => {
    setCart((prev) => {
      const next = { ...prev };
      if (quantity <= 0) delete next[productId];
      else next[productId] = Math.min(99, quantity);
      return next;
    });
  };

  const productLabel = (product: CatalogProduct) =>
    language === "fr" ? product.nameFr : product.nameAr;

  const canSubmit =
    items.length > 0 &&
    form.clientName.trim().length > 0 &&
    form.clientPhone.trim().length >= 6 &&
    form.city.trim().length > 0 &&
    !createOrder.isPending;

  const handleSubmit = async () => {
    if (!canSubmit || !priced) return;
    const payload = {
      clientName: form.clientName.trim(),
      clientPhone: form.clientPhone.trim(),
      city: form.city.trim(),
      address: form.address.trim() || undefined,
      orderedBy: form.orderedBy.trim() || undefined,
      notes: form.notes.trim() || undefined,
      items,
      ...(form.clientEmail.trim() ? { clientEmail: form.clientEmail.trim() } : {}),
    };

    await createOrder.mutateAsync(payload);

    const linesText = priced.lines
      .map((line) => {
        const name = language === "fr" ? line.nameFr : line.nameAr;
        return `- ${name} x${line.quantity} = ${line.lineTotalMad} MAD`;
      })
      .join("\n");

    const message = `*Commande compléments — AquaVolt Pro*

*Client:* ${payload.clientName}
*Telephone:* ${payload.clientPhone}
*Ville:* ${payload.city}
${payload.address ? `*Adresse:* ${payload.address}\n` : ""}${payload.orderedBy ? `*Commande par:* ${payload.orderedBy}\n` : ""}
*Articles:*
${linesText}

*Total:* ${priced.totalMad} MAD
${payload.notes ? `\n*Notes:* ${payload.notes}` : ""}`;

    openWhatsApp(message);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-16" dir={dir}>
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">{T.orderSuccessTitle}</h2>
        <p className="text-slate-400 mb-8">{T.orderSuccessMessage}</p>
        <Button
          onClick={() => {
            setSubmitted(false);
            setCart({});
            createOrder.reset();
          }}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
        >
          {T.newOrder}
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" dir={dir}>
      <div className="lg:col-span-2">
        <div className="flex flex-wrap gap-2 mb-6">
          {(Object.keys(categoryMeta) as Array<ProductCategory | "all">).map((key) => {
            const meta = categoryMeta[key];
            const Icon = meta.icon;
            const active = category === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setCategory(key)}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  active
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                    : "bg-slate-900 text-slate-400 border-white/10 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                {T[meta.labelKey]}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map((product) => {
            const qty = cart[product.id] ?? 0;
            return (
              <div
                key={product.id}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-white font-semibold">{productLabel(product)}</h3>
                  <span className="text-emerald-400 text-sm font-semibold whitespace-nowrap">
                    {formatMad(product.priceMad, language)}
                  </span>
                </div>
                <p className="text-slate-400 text-sm flex-1 mb-2">
                  {language === "fr" ? product.descriptionFr : product.descriptionAr}
                </p>
                <p className="text-slate-500 text-xs mb-4">
                  {language === "fr" ? product.unitFr : product.unitAr}
                </p>
                {qty === 0 ? (
                  <Button
                    type="button"
                    onClick={() => setQty(product.id, 1)}
                    className="w-full bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    {T.addToCart}
                  </Button>
                ) : (
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setQty(product.id, qty - 1)}
                      className="w-9 h-9 rounded-lg border border-white/10 text-white hover:bg-white/5 flex items-center justify-center"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-white font-semibold tabular-nums">{qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(product.id, qty + 1)}
                      className="w-9 h-9 rounded-lg border border-white/10 text-white hover:bg-white/5 flex items-center justify-center"
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

      <aside className="lg:col-span-1">
        <div className="lg:sticky lg:top-24 rounded-2xl border border-white/10 bg-slate-900/70 p-6 space-y-6">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">{T.cartTitle}</h2>
          </div>

          {!priced ? (
            <p className="text-slate-500 text-sm">{T.cartEmpty}</p>
          ) : (
            <ul className="space-y-3">
              {priced.lines.map((line) => (
                <li key={line.productId} className="flex items-start justify-between gap-2 text-sm">
                  <div>
                    <p className="text-white font-medium">
                      {language === "fr" ? line.nameFr : line.nameAr}
                    </p>
                    <p className="text-slate-500">
                      {line.quantity} × {formatMad(line.unitPriceMad, language)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-200 tabular-nums">
                      {formatMad(line.lineTotalMad, language)}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty(line.productId, 0)}
                      className="text-slate-500 hover:text-red-400"
                      aria-label={T.delete}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {priced && (
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <span className="text-slate-400">{T.orderTotal}</span>
              <span className="text-xl font-bold text-emerald-400">
                {formatMad(priced.totalMad, language)}
              </span>
            </div>
          )}

          <div className="space-y-3 border-t border-white/10 pt-4">
            <h3 className="text-white font-semibold">{T.clientSection}</h3>
            <Input
              value={form.clientName}
              onChange={(e) => setForm((f) => ({ ...f, clientName: e.target.value }))}
              placeholder={T.clientName}
              className="bg-slate-800 border-white/10 text-white placeholder:text-slate-500"
            />
            <Input
              value={form.clientPhone}
              onChange={(e) => setForm((f) => ({ ...f, clientPhone: e.target.value }))}
              placeholder={T.clientPhone}
              className="bg-slate-800 border-white/10 text-white placeholder:text-slate-500"
            />
            <Input
              type="email"
              value={form.clientEmail}
              onChange={(e) => setForm((f) => ({ ...f, clientEmail: e.target.value }))}
              placeholder={T.yourEmail}
              className="bg-slate-800 border-white/10 text-white placeholder:text-slate-500"
            />
            <Select value={form.city} onValueChange={(city) => setForm((f) => ({ ...f, city }))}>
              <SelectTrigger className="bg-slate-800 border-white/10 text-white">
                <SelectValue placeholder={T.selectCity} />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/10 max-h-60">
                {MOROCCAN_CITIES.map((city) => (
                  <SelectItem key={city} value={city} className="text-white">
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              value={form.address}
              onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
              placeholder={T.clientAddress}
              className="bg-slate-800 border-white/10 text-white placeholder:text-slate-500"
            />
            <Input
              value={form.orderedBy}
              onChange={(e) => setForm((f) => ({ ...f, orderedBy: e.target.value }))}
              placeholder={T.orderedByPlaceholder}
              className="bg-slate-800 border-white/10 text-white placeholder:text-slate-500"
            />
            <Textarea
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              placeholder={T.orderNotes}
              className="bg-slate-800 border-white/10 text-white placeholder:text-slate-500 min-h-[80px]"
            />
          </div>

          {createOrder.isError && (
            <p className="text-red-400 text-sm">
              {language === "fr"
                ? "Impossible d'enregistrer la commande. Réessayez ou contactez-nous sur WhatsApp."
                : "تعذر حفظ الطلب. أعد المحاولة أو تواصل معنا عبر واتساب."}
            </p>
          )}

          <Button
            type="button"
            onClick={() => void handleSubmit()}
            disabled={!canSubmit}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white disabled:opacity-50"
          >
            {createOrder.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            {T.submitOrder}
          </Button>
        </div>
      </aside>
    </div>
  );
}
