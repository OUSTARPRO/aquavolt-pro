import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ComplementOrderItem } from "@contracts/types";
import {
  Package,
  ShoppingCart,
  Plus,
  Minus,
  X,
  Check,
  Trash2,
  Loader2,
  RefreshCw,
  MessageCircle,
} from "lucide-react";

const CATEGORIES = ["electricity", "plumbing", "pool", "other"] as const;
const ORDER_STATUSES = ["pending", "ordered", "delivered", "cancelled"] as const;

function formatMad(amount: number) {
  return `${amount.toFixed(2)} MAD`;
}

export default function ComplementsManager() {
  const { language, dir } = useLanguage();
  const T = translations[language];
  const [view, setView] = useState<"orders" | "catalog">("orders");

  return (
    <div dir={dir}>
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setView("orders")}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            view === "orders"
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : "bg-slate-900 text-slate-400 border border-white/10 hover:text-white"
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {T.complementsOrders}
        </button>
        <button
          onClick={() => setView("catalog")}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            view === "catalog"
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : "bg-slate-900 text-slate-400 border border-white/10 hover:text-white"
          }`}
        >
          <Package className="w-4 h-4" />
          {T.complementsCatalog}
        </button>
      </div>

      {view === "orders" ? <OrdersView /> : <CatalogView />}
    </div>
  );
}

function CatalogView() {
  const { language } = useLanguage();
  const T = translations[language];
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    nameAr: "",
    category: "other" as (typeof CATEGORIES)[number],
    price: "",
    unit: "pièce",
  });

  const utils = trpc.useUtils();
  const { data: items, isLoading } = trpc.complement.list.useQuery();
  const createMutation = trpc.complement.create.useMutation({
    onSuccess: () => {
      utils.complement.list.invalidate();
      setShowForm(false);
      setForm({ name: "", nameAr: "", category: "other", price: "", unit: "pièce" });
    },
  });
  const deleteMutation = trpc.complement.delete.useMutation({
    onSuccess: () => utils.complement.list.invalidate(),
  });

  const priceValue = Number.parseFloat(form.price);
  const canSave = form.name.trim() && Number.isFinite(priceValue) && priceValue >= 0;

  const categoryLabel = (c: string) =>
    c === "other" ? T.other : (T[`${c}Category` as keyof typeof T] as string) || c;

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
        >
          {showForm ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
          {showForm ? T.cancel : T.addComplement}
        </Button>
      </div>

      {showForm && (
        <div className="bg-slate-900 border border-white/10 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">{T.addComplement}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-400 mb-1 block">{T.complementName}</label>
              <Input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="bg-slate-800 border-white/10 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">{T.complementNameAr}</label>
              <Input
                value={form.nameAr}
                onChange={(e) => setForm((f) => ({ ...f, nameAr: e.target.value }))}
                className="bg-slate-800 border-white/10 text-white"
                dir="rtl"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">{T.category}</label>
              <Select
                value={form.category}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, category: v as typeof form.category }))
                }
              >
                <SelectTrigger className="bg-slate-800 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/10">
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c} className="text-white hover:bg-emerald-500/10">
                      {categoryLabel(c)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-400 mb-1 block">{T.price}</label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                  className="bg-slate-800 border-white/10 text-white"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1 block">{T.unit}</label>
                <Input
                  value={form.unit}
                  onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))}
                  className="bg-slate-800 border-white/10 text-white"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              onClick={() =>
                createMutation.mutate({
                  name: form.name.trim(),
                  nameAr: form.nameAr.trim() || undefined,
                  category: form.category,
                  price: priceValue,
                  unit: form.unit.trim() || "pièce",
                })
              }
              disabled={!canSave || createMutation.isPending}
              className="bg-emerald-500 hover:bg-emerald-400 text-white"
            >
              {createMutation.isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              <Check className="w-4 h-4 mr-2" />
              {T.save}
            </Button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
        </div>
      ) : items && items.length > 0 ? (
        <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-slate-400">{T.name}</TableHead>
                  <TableHead className="text-slate-400">{T.category}</TableHead>
                  <TableHead className="text-slate-400">{T.price}</TableHead>
                  <TableHead className="text-slate-400">{T.unit}</TableHead>
                  <TableHead className="text-slate-400 text-right">{T.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id} className="border-white/10 hover:bg-white/5">
                    <TableCell className="text-white font-medium">
                      {language === "ar" && item.nameAr ? item.nameAr : item.name}
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {categoryLabel(item.category)}
                    </TableCell>
                    <TableCell className="text-slate-300">{formatMad(item.price)}</TableCell>
                    <TableCell className="text-slate-300">{item.unit}</TableCell>
                    <TableCell className="text-right">
                      <button
                        onClick={() => deleteMutation.mutate({ id: item.id })}
                        className="w-7 h-7 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 flex items-center justify-center transition-colors ml-auto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-slate-500">{T.noComplements}</div>
      )}
    </div>
  );
}

function buildOrderWhatsAppMessage(order: {
  clientName: string;
  clientPhone: string;
  city: string | null;
  items: ComplementOrderItem[];
  total: number;
  notes: string | null;
}) {
  // Message toujours en francais, sans accents (convention du projet)
  const lines = order.items.map(
    (it) =>
      `- ${it.quantity} x ${it.name} (${it.unitPrice.toFixed(2)} MAD/${it.unit}) = ${(
        it.quantity * it.unitPrice
      ).toFixed(2)} MAD`
  );
  return (
    `*Commande de complements - AquaVolt Pro*\n\n` +
    `*Client:* ${order.clientName}\n` +
    `*Telephone:* ${order.clientPhone}\n` +
    `*Ville:* ${order.city || "N/A"}\n\n` +
    `*Produits:*\n${lines.join("\n")}\n\n` +
    `*Total:* ${order.total.toFixed(2)} MAD\n` +
    `*Remarques:* ${order.notes || "N/A"}`
  );
}

function OrdersView() {
  const { language } = useLanguage();
  const T = translations[language];
  const [showForm, setShowForm] = useState(false);

  const utils = trpc.useUtils();
  const { data: orders, isLoading } = trpc.complement.listOrders.useQuery();
  const updateStatus = trpc.complement.updateOrderStatus.useMutation({
    onSuccess: () => utils.complement.listOrders.invalidate(),
  });
  const deleteOrder = trpc.complement.deleteOrder.useMutation({
    onSuccess: () => utils.complement.listOrders.invalidate(),
  });

  const statusColors: Record<string, string> = {
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    ordered: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    delivered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Button
          variant="outline"
          onClick={() => utils.complement.listOrders.invalidate()}
          className="border-white/10 text-slate-400 hover:text-white"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          {language === "fr" ? "Actualiser" : "تحديث"}
        </Button>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
        >
          {showForm ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
          {showForm ? T.cancel : T.newOrder}
        </Button>
      </div>

      {showForm && <NewOrderForm onCreated={() => setShowForm(false)} />}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
        </div>
      ) : orders && orders.length > 0 ? (
        <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-slate-400">{T.client}</TableHead>
                  <TableHead className="text-slate-400">{T.phone}</TableHead>
                  <TableHead className="text-slate-400">{T.products}</TableHead>
                  <TableHead className="text-slate-400">{T.total}</TableHead>
                  <TableHead className="text-slate-400">{T.status}</TableHead>
                  <TableHead className="text-slate-400">{T.date}</TableHead>
                  <TableHead className="text-slate-400 text-right">{T.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => {
                  const items = order.items as ComplementOrderItem[];
                  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
                    buildOrderWhatsAppMessage({ ...order, items })
                  )}`;
                  return (
                    <TableRow key={order.id} className="border-white/10 hover:bg-white/5">
                      <TableCell className="text-white font-medium">
                        {order.clientName}
                        {order.city && (
                          <span className="block text-xs text-slate-500">{order.city}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-slate-300">{order.clientPhone}</TableCell>
                      <TableCell className="text-slate-300 max-w-[220px]">
                        <span className="block truncate">
                          {items.map((it) => `${it.quantity}× ${it.name}`).join(", ")}
                        </span>
                      </TableCell>
                      <TableCell className="text-emerald-400 font-medium whitespace-nowrap">
                        {formatMad(order.total)}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={order.status}
                          onValueChange={(v) =>
                            updateStatus.mutate({
                              id: order.id,
                              status: v as typeof order.status,
                            })
                          }
                        >
                          <SelectTrigger
                            className={`h-7 text-xs border ${statusColors[order.status]} bg-transparent`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-white/10">
                            {ORDER_STATUSES.map((s) => (
                              <SelectItem key={s} value={s} className="text-white text-xs">
                                {T[s]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-slate-500 text-xs">
                        {new Date(order.createdAt).toLocaleDateString(
                          language === "fr" ? "fr-FR" : "ar-MA"
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={T.sendWhatsApp}
                            className="w-7 h-7 rounded-lg hover:bg-green-500/10 text-slate-400 hover:text-green-400 flex items-center justify-center transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => deleteOrder.mutate({ id: order.id })}
                            className="w-7 h-7 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 flex items-center justify-center transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-slate-500">{T.noOrders}</div>
      )}
    </div>
  );
}

function NewOrderForm({ onCreated }: { onCreated: () => void }) {
  const { language } = useLanguage();
  const T = translations[language];
  const [form, setForm] = useState({
    clientName: "",
    clientPhone: "",
    city: "",
    notes: "",
  });
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const utils = trpc.useUtils();
  const { data: catalog, isLoading } = trpc.complement.list.useQuery();
  const createOrder = trpc.complement.createOrder.useMutation({
    onSuccess: () => {
      utils.complement.listOrders.invalidate();
      onCreated();
    },
  });

  const setQty = (id: number, qty: number) =>
    setQuantities((q) => ({ ...q, [id]: Math.max(0, qty) }));

  const selectedItems = Object.entries(quantities)
    .map(([id, quantity]) => ({ complementId: Number(id), quantity }))
    .filter((i) => i.quantity > 0);

  const total = (catalog || []).reduce(
    (sum, p) => sum + (quantities[p.id] || 0) * p.price,
    0
  );

  const canSave =
    form.clientName.trim() && form.clientPhone.trim() && selectedItems.length > 0;

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-6 mb-8">
      <h3 className="text-lg font-semibold text-white mb-4">{T.newOrder}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-sm text-slate-400 mb-1 block">{T.clientName}</label>
          <Input
            value={form.clientName}
            onChange={(e) => setForm((f) => ({ ...f, clientName: e.target.value }))}
            className="bg-slate-800 border-white/10 text-white"
          />
        </div>
        <div>
          <label className="text-sm text-slate-400 mb-1 block">{T.clientPhone}</label>
          <Input
            value={form.clientPhone}
            onChange={(e) => setForm((f) => ({ ...f, clientPhone: e.target.value }))}
            placeholder="+212 6XX XXX XXX"
            className="bg-slate-800 border-white/10 text-white placeholder:text-slate-500"
          />
        </div>
        <div>
          <label className="text-sm text-slate-400 mb-1 block">{T.city}</label>
          <Input
            value={form.city}
            onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
            className="bg-slate-800 border-white/10 text-white"
          />
        </div>
      </div>

      <label className="text-sm text-slate-400 mb-2 block">{T.selectComplements}</label>
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-5 h-5 text-emerald-400 animate-spin" />
        </div>
      ) : catalog && catalog.length > 0 ? (
        <div className="border border-white/10 rounded-lg divide-y divide-white/10 max-h-64 overflow-y-auto mb-4">
          {catalog.map((p) => {
            const qty = quantities[p.id] || 0;
            return (
              <div
                key={p.id}
                className={`flex items-center justify-between gap-3 px-4 py-2.5 ${
                  qty > 0 ? "bg-emerald-500/5" : ""
                }`}
              >
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium truncate">
                    {language === "ar" && p.nameAr ? p.nameAr : p.name}
                  </p>
                  <p className="text-slate-500 text-xs">
                    {formatMad(p.price)} / {p.unit}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setQty(p.id, qty - 1)}
                    disabled={qty === 0}
                    className="w-7 h-7 rounded-lg bg-slate-800 border border-white/10 text-slate-300 hover:text-white disabled:opacity-30 flex items-center justify-center"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span
                    className={`w-8 text-center text-sm font-medium ${
                      qty > 0 ? "text-emerald-400" : "text-slate-500"
                    }`}
                  >
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(p.id, qty + 1)}
                    className="w-7 h-7 rounded-lg bg-slate-800 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-slate-500 text-sm border border-white/10 rounded-lg mb-4">
          {T.noComplements}
        </div>
      )}

      <div className="mb-4">
        <label className="text-sm text-slate-400 mb-1 block">{T.notes}</label>
        <Textarea
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          className="bg-slate-800 border-white/10 text-white min-h-[70px]"
        />
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <p className="text-white font-semibold">
          {T.total} : <span className="text-emerald-400">{formatMad(total)}</span>
        </p>
        <Button
          onClick={() =>
            createOrder.mutate({
              clientName: form.clientName.trim(),
              clientPhone: form.clientPhone.trim(),
              city: form.city.trim() || undefined,
              notes: form.notes.trim() || undefined,
              items: selectedItems,
            })
          }
          disabled={!canSave || createOrder.isPending}
          className="bg-emerald-500 hover:bg-emerald-400 text-white"
        >
          {createOrder.isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
          <Check className="w-4 h-4 mr-2" />
          {T.createOrderBtn}
        </Button>
      </div>
    </div>
  );
}
