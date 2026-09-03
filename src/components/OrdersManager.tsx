import { useMemo, useState } from "react";
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
} from "lucide-react";

const CATEGORIES = ["electricity", "plumbing", "pool", "other"] as const;
const ORDER_STATUSES = ["pending", "ordered", "delivered", "cancelled"] as const;

const statusColors: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  ordered: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  delivered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function OrdersManager() {
  const { language, dir } = useLanguage();
  const T = translations[language];
  const utils = trpc.useUtils();

  const [showProductForm, setShowProductForm] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);

  const { data: products, isLoading: productsLoading } =
    trpc.order.listProducts.useQuery();
  const { data: orders, isLoading: ordersLoading } = trpc.order.list.useQuery();

  const deleteProduct = trpc.order.deleteProduct.useMutation({
    onSuccess: () => utils.order.listProducts.invalidate(),
  });
  const updateStatus = trpc.order.updateStatus.useMutation({
    onSuccess: () => utils.order.list.invalidate(),
  });
  const deleteOrder = trpc.order.delete.useMutation({
    onSuccess: () => utils.order.list.invalidate(),
  });

  return (
    <div dir={dir} className="space-y-8">
      {/* Catalogue de compléments */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
            <Package className="w-5 h-5 text-emerald-400" />
            {T.productsCatalog}
          </h3>
          <Button
            onClick={() => setShowProductForm(!showProductForm)}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
          >
            {showProductForm ? (
              <X className="w-4 h-4 mr-2" />
            ) : (
              <Plus className="w-4 h-4 mr-2" />
            )}
            {showProductForm ? T.cancel : T.addProduct}
          </Button>
        </div>

        {showProductForm && <ProductForm onDone={() => setShowProductForm(false)} />}

        {productsLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between gap-3 bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium truncate">
                    {language === "ar" && p.nameAr ? p.nameAr : p.name}
                  </p>
                  <p className="text-slate-500 text-xs">
                    {T[`${p.category}Category` as keyof typeof T] || p.category}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-emerald-400 text-sm font-semibold">
                    {p.price} MAD
                  </span>
                  <button
                    onClick={() => deleteProduct.mutate({ id: p.id })}
                    className="w-7 h-7 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 flex items-center justify-center transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">{T.noProducts}</div>
        )}
      </section>

      {/* Commandes */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
            <ShoppingCart className="w-5 h-5 text-emerald-400" />
            {T.ordersManagement}
          </h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => utils.order.list.invalidate()}
              className="border-white/10 text-slate-400 hover:text-white"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {language === "fr" ? "Actualiser" : "تحديث"}
            </Button>
            <Button
              onClick={() => setShowOrderForm(!showOrderForm)}
              disabled={!products || products.length === 0}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
            >
              {showOrderForm ? (
                <X className="w-4 h-4 mr-2" />
              ) : (
                <Plus className="w-4 h-4 mr-2" />
              )}
              {showOrderForm ? T.cancel : T.newOrder}
            </Button>
          </div>
        </div>

        {showOrderForm && products && (
          <OrderForm products={products} onDone={() => setShowOrderForm(false)} />
        )}

        {ordersLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
          </div>
        ) : orders && orders.length > 0 ? (
          <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-slate-400">{T.clientName}</TableHead>
                    <TableHead className="text-slate-400">{T.phone}</TableHead>
                    <TableHead className="text-slate-400">{T.orderItems}</TableHead>
                    <TableHead className="text-slate-400">{T.total}</TableHead>
                    <TableHead className="text-slate-400">{T.status}</TableHead>
                    <TableHead className="text-slate-400">{T.date}</TableHead>
                    <TableHead className="text-slate-400 text-right">
                      {T.actions}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((o) => (
                    <TableRow key={o.id} className="border-white/10 hover:bg-white/5">
                      <TableCell className="text-white font-medium">
                        {o.clientName}
                        {o.city && (
                          <span className="block text-slate-500 text-xs">{o.city}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-slate-300">{o.clientPhone}</TableCell>
                      <TableCell className="text-slate-300 text-xs max-w-52">
                        {o.items
                          .map((item) => `${item.quantity}× ${item.name}`)
                          .join(", ")}
                      </TableCell>
                      <TableCell className="text-emerald-400 font-semibold">
                        {o.total} MAD
                      </TableCell>
                      <TableCell>
                        <Select
                          value={o.status}
                          onValueChange={(v) =>
                            updateStatus.mutate({ id: o.id, status: v as typeof o.status })
                          }
                        >
                          <SelectTrigger
                            className={`h-7 text-xs border ${statusColors[o.status]} bg-transparent`}
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
                        {new Date(o.createdAt).toLocaleDateString(
                          language === "fr" ? "fr-FR" : "ar-MA"
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <button
                          onClick={() => deleteOrder.mutate({ id: o.id })}
                          className="w-7 h-7 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 flex items-center justify-center transition-colors"
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
          <div className="text-center py-8 text-slate-500">{T.noOrders}</div>
        )}
      </section>
    </div>
  );
}

function ProductForm({ onDone }: { onDone: () => void }) {
  const { language } = useLanguage();
  const T = translations[language];
  const utils = trpc.useUtils();

  const [form, setForm] = useState({
    name: "",
    nameAr: "",
    category: "other" as (typeof CATEGORIES)[number],
    price: "",
  });

  const createProduct = trpc.order.createProduct.useMutation({
    onSuccess: () => {
      utils.order.listProducts.invalidate();
      onDone();
    },
  });

  const priceValue = Number.parseInt(form.price, 10);
  const isValid = form.name.trim().length > 0 && Number.isInteger(priceValue) && priceValue >= 0;

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-6 mb-6">
      <h4 className="text-base font-semibold text-white mb-4">{T.addProduct}</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-slate-400 mb-1 block">{T.productName}</label>
          <Input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="bg-slate-800 border-white/10 text-white"
          />
        </div>
        <div>
          <label className="text-sm text-slate-400 mb-1 block">{T.productNameAr}</label>
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
                  {T[`${c}Category` as keyof typeof T] || c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm text-slate-400 mb-1 block">{T.price}</label>
          <Input
            type="number"
            min={0}
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
            className="bg-slate-800 border-white/10 text-white"
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button
          onClick={() =>
            createProduct.mutate({
              name: form.name.trim(),
              nameAr: form.nameAr.trim() || undefined,
              category: form.category,
              price: priceValue,
            })
          }
          disabled={!isValid || createProduct.isPending}
          className="bg-emerald-500 hover:bg-emerald-400 text-white"
        >
          {createProduct.isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
          <Check className="w-4 h-4 mr-2" />
          {T.save}
        </Button>
      </div>
    </div>
  );
}

type ProductRow = {
  id: number;
  name: string;
  nameAr: string | null;
  category: string;
  price: number;
};

function OrderForm({
  products,
  onDone,
}: {
  products: ProductRow[];
  onDone: () => void;
}) {
  const { language } = useLanguage();
  const T = translations[language];
  const utils = trpc.useUtils();

  const [client, setClient] = useState({ name: "", phone: "", city: "", notes: "" });
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const createOrder = trpc.order.create.useMutation({
    onSuccess: () => {
      utils.order.list.invalidate();
      onDone();
    },
  });

  const setQty = (productId: number, qty: number) => {
    setQuantities((q) => ({ ...q, [productId]: Math.max(0, qty) }));
  };

  const selectedItems = useMemo(
    () =>
      Object.entries(quantities)
        .map(([id, quantity]) => ({ productId: Number(id), quantity }))
        .filter((i) => i.quantity > 0),
    [quantities]
  );

  const total = useMemo(
    () =>
      selectedItems.reduce((sum, item) => {
        const product = products.find((p) => p.id === item.productId);
        return sum + (product ? product.price * item.quantity : 0);
      }, 0),
    [selectedItems, products]
  );

  const isValid =
    client.name.trim().length > 0 &&
    client.phone.trim().length > 0 &&
    selectedItems.length > 0;

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-6 mb-6">
      <h4 className="text-base font-semibold text-white mb-4">{T.newOrder}</h4>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-sm text-slate-400 mb-1 block">{T.clientName}</label>
          <Input
            value={client.name}
            onChange={(e) => setClient((c) => ({ ...c, name: e.target.value }))}
            className="bg-slate-800 border-white/10 text-white"
          />
        </div>
        <div>
          <label className="text-sm text-slate-400 mb-1 block">{T.clientPhone}</label>
          <Input
            value={client.phone}
            onChange={(e) => setClient((c) => ({ ...c, phone: e.target.value }))}
            className="bg-slate-800 border-white/10 text-white"
          />
        </div>
        <div>
          <label className="text-sm text-slate-400 mb-1 block">{T.city}</label>
          <Input
            value={client.city}
            onChange={(e) => setClient((c) => ({ ...c, city: e.target.value }))}
            className="bg-slate-800 border-white/10 text-white"
          />
        </div>
      </div>

      <p className="text-sm text-slate-400 mb-2">{T.selectProducts}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
        {products.map((p) => {
          const qty = quantities[p.id] ?? 0;
          return (
            <div
              key={p.id}
              className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2 transition-colors ${
                qty > 0
                  ? "border-emerald-500/30 bg-emerald-500/5"
                  : "border-white/10 bg-slate-800/50"
              }`}
            >
              <div className="min-w-0">
                <p className="text-white text-sm truncate">
                  {language === "ar" && p.nameAr ? p.nameAr : p.name}
                </p>
                <p className="text-slate-500 text-xs">{p.price} MAD</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setQty(p.id, qty - 1)}
                  className="w-7 h-7 rounded-lg bg-slate-800 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center text-white text-sm">{qty}</span>
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

      <div className="mb-6">
        <label className="text-sm text-slate-400 mb-1 block">{T.notes}</label>
        <Textarea
          value={client.notes}
          onChange={(e) => setClient((c) => ({ ...c, notes: e.target.value }))}
          className="bg-slate-800 border-white/10 text-white"
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-white font-semibold">
          {T.total}: <span className="text-emerald-400">{total} MAD</span>
        </p>
        <Button
          onClick={() =>
            createOrder.mutate({
              clientName: client.name.trim(),
              clientPhone: client.phone.trim(),
              city: client.city.trim() || undefined,
              notes: client.notes.trim() || undefined,
              items: selectedItems,
            })
          }
          disabled={!isValid || createOrder.isPending}
          className="bg-emerald-500 hover:bg-emerald-400 text-white"
        >
          {createOrder.isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
          <Check className="w-4 h-4 mr-2" />
          {T.createOrder}
        </Button>
      </div>
    </div>
  );
}
