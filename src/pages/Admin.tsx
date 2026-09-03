import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/Navbar";
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
  Shield,
  Image,
  FileText,
  Trash2,
  Plus,
  Loader2,
  X,
  Check,
  RefreshCw,
  ShoppingCart,
  Package,
} from "lucide-react";

export default function Admin() {
  const navigate = useNavigate();
  const { user, isLoading, isAuthenticated } = useAuth({
    redirectOnUnauthenticated: true,
  });
  const { language, dir } = useLanguage();
  const T = translations[language];
  const [tab, setTab] = useState<"gallery" | "quotes" | "supplements">("gallery");

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (!isLoading && isAuthenticated && !isAdmin) {
      navigate("/");
    }
  }, [isLoading, isAuthenticated, isAdmin, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-white" dir={dir}>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{T.adminTitle}</h1>
              <p className="text-slate-400 text-sm">
                {language === "fr" ? `Connecté en tant que ${user?.name || user?.email}` : `متصل كـ ${user?.name || user?.email}`}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setTab("gallery")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                tab === "gallery"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-slate-900 text-slate-400 border border-white/10 hover:text-white"
              }`}
            >
              <Image className="w-4 h-4" />
              {T.galleryManagement}
            </button>
            <button
              onClick={() => setTab("quotes")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                tab === "quotes"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-slate-900 text-slate-400 border border-white/10 hover:text-white"
              }`}
            >
              <FileText className="w-4 h-4" />
              {T.quotesManagement}
            </button>
            <button
              onClick={() => setTab("supplements")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                tab === "supplements"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-slate-900 text-slate-400 border border-white/10 hover:text-white"
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              {T.supplementsManagement}
            </button>
          </div>

          {tab === "gallery" ? (
            <GalleryManager />
          ) : tab === "quotes" ? (
            <QuotesManager />
          ) : (
            <SupplementsManager />
          )}
        </div>
      </main>
    </div>
  );
}

function GalleryManager() {
  const { language, dir } = useLanguage();
  const T = translations[language];
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    titleAr: "",
    description: "",
    descriptionAr: "",
    imageUrl: "",
    category: "other" as const,
  });

  const utils = trpc.useUtils();
  const { data: items, isLoading } = trpc.gallery.list.useQuery();
  const createMutation = trpc.gallery.create.useMutation({
    onSuccess: () => {
      utils.gallery.list.invalidate();
      setShowForm(false);
      setForm({ title: "", titleAr: "", description: "", descriptionAr: "", imageUrl: "", category: "other" });
    },
  });
  const deleteMutation = trpc.gallery.delete.useMutation({
    onSuccess: () => utils.gallery.list.invalidate(),
  });

  return (
    <div dir={dir}>
      <div className="flex justify-end mb-4">
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
        >
          {showForm ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
          {showForm ? T.cancel : T.addImage}
        </Button>
      </div>

      {showForm && (
        <div className="bg-slate-900 border border-white/10 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">{T.addImage}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-400 mb-1 block">{T.imageTitle}</label>
              <Input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="bg-slate-800 border-white/10 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">{T.imageTitleAr}</label>
              <Input
                value={form.titleAr}
                onChange={(e) => setForm((f) => ({ ...f, titleAr: e.target.value }))}
                className="bg-slate-800 border-white/10 text-white"
                dir="rtl"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">{T.imageDesc}</label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="bg-slate-800 border-white/10 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">{T.imageDescAr}</label>
              <Textarea
                value={form.descriptionAr}
                onChange={(e) => setForm((f) => ({ ...f, descriptionAr: e.target.value }))}
                className="bg-slate-800 border-white/10 text-white"
                dir="rtl"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-slate-400 mb-1 block">{T.imageUrl}</label>
              <Input
                value={form.imageUrl}
                onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                placeholder="https://..."
                className="bg-slate-800 border-white/10 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">{T.category}</label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm((f) => ({ ...f, category: v as typeof form.category }))}
              >
                <SelectTrigger className="bg-slate-800 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/10">
                  {["electricity", "plumbing", "pool", "other"].map((c) => (
                    <SelectItem key={c} value={c} className="text-white hover:bg-emerald-500/10">
                      {T[`${c}Category` as keyof typeof T] || c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              onClick={() => createMutation.mutate(form)}
              disabled={!form.title || !form.imageUrl || createMutation.isPending}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden group">
              <div className="relative aspect-video">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                <button
                  onClick={() => deleteMutation.mutate({ id: item.id })}
                  className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4">
                <p className="text-white font-medium text-sm">{item.title}</p>
                <p className="text-slate-500 text-xs mt-1">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-500">{T.noImages}</div>
      )}
    </div>
  );
}

type OrderItem = { supplementId: number; supplementName: string; quantity: number; unit: string };

function SupplementsManager() {
  const { language, dir } = useLanguage();
  const T = translations[language];
  const [subTab, setSubTab] = useState<"catalog" | "orders">("orders");

  return (
    <div dir={dir}>
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setSubTab("orders")}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
            subTab === "orders"
              ? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
              : "bg-slate-800 text-slate-400 border border-white/10 hover:text-white"
          }`}
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          {T.ordersTab}
        </button>
        <button
          onClick={() => setSubTab("catalog")}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
            subTab === "catalog"
              ? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
              : "bg-slate-800 text-slate-400 border border-white/10 hover:text-white"
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          {T.catalogTab}
        </button>
      </div>
      {subTab === "catalog" ? <CatalogManager /> : <OrdersManager />}
    </div>
  );
}

function CatalogManager() {
  const { language, dir } = useLanguage();
  const T = translations[language];
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", unit: "unité", category: "pool" as "pool" | "electricity" | "plumbing" | "other" });

  const utils = trpc.useUtils();
  const { data: items, isLoading } = trpc.supplement.listCatalog.useQuery();
  const createMutation = trpc.supplement.createCatalog.useMutation({
    onSuccess: () => {
      utils.supplement.listCatalog.invalidate();
      setShowForm(false);
      setForm({ name: "", description: "", unit: "unité", category: "pool" });
    },
  });
  const deleteMutation = trpc.supplement.deleteCatalog.useMutation({
    onSuccess: () => utils.supplement.listCatalog.invalidate(),
  });

  const categoryLabels: Record<string, string> = {
    pool: T.poolCategory,
    electricity: T.electricityCategory,
    plumbing: T.plumbingCategory,
    other: T.otherCategory,
  };

  return (
    <div dir={dir}>
      <div className="flex justify-end mb-4">
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
        >
          {showForm ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
          {showForm ? T.cancel : T.addSupplement}
        </Button>
      </div>

      {showForm && (
        <div className="bg-slate-900 border border-white/10 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">{T.addSupplement}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-400 mb-1 block">{T.supplementName}</label>
              <Input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="bg-slate-800 border-white/10 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">{T.supplementUnit}</label>
              <Input
                value={form.unit}
                onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))}
                placeholder="ex: kg, L, pièce, m²"
                className="bg-slate-800 border-white/10 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">{T.supplementCategory}</label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm((f) => ({ ...f, category: v as typeof form.category }))}
              >
                <SelectTrigger className="bg-slate-800 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/10">
                  {(["pool", "electricity", "plumbing", "other"] as const).map((c) => (
                    <SelectItem key={c} value={c} className="text-white hover:bg-emerald-500/10">
                      {categoryLabels[c]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">{T.supplementDesc}</label>
              <Input
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="bg-slate-800 border-white/10 text-white"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              onClick={() => createMutation.mutate(form)}
              disabled={!form.name || !form.unit || createMutation.isPending}
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
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-slate-400">{T.supplementName}</TableHead>
                <TableHead className="text-slate-400">{T.supplementCategory}</TableHead>
                <TableHead className="text-slate-400">{T.supplementUnit}</TableHead>
                <TableHead className="text-slate-400">{T.supplementDesc}</TableHead>
                <TableHead className="text-slate-400 text-right">{T.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id} className="border-white/10 hover:bg-white/5">
                  <TableCell className="text-white font-medium">{item.name}</TableCell>
                  <TableCell>
                    <span className="px-2 py-0.5 rounded-full text-xs bg-teal-500/10 text-teal-400 border border-teal-500/20">
                      {categoryLabels[item.category]}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-300">{item.unit}</TableCell>
                  <TableCell className="text-slate-400 text-sm">{item.description || "—"}</TableCell>
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
      ) : (
        <div className="text-center py-12 text-slate-500">{T.noSupplements}</div>
      )}
    </div>
  );
}

function OrdersManager() {
  const { language, dir } = useLanguage();
  const T = translations[language];
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    clientName: "",
    clientPhone: "",
    clientCity: "",
    notes: "",
  });
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedSupplementId, setSelectedSupplementId] = useState<string>("");
  const [itemQty, setItemQty] = useState("1");

  const utils = trpc.useUtils();
  const { data: orders, isLoading } = trpc.supplement.listOrders.useQuery();
  const { data: catalog } = trpc.supplement.listCatalog.useQuery();
  const createMutation = trpc.supplement.createOrder.useMutation({
    onSuccess: () => {
      utils.supplement.listOrders.invalidate();
      setShowForm(false);
      setForm({ clientName: "", clientPhone: "", clientCity: "", notes: "" });
      setOrderItems([]);
      setSelectedSupplementId("");
      setItemQty("1");
    },
  });
  const updateStatus = trpc.supplement.updateOrderStatus.useMutation({
    onSuccess: () => utils.supplement.listOrders.invalidate(),
  });
  const deleteMutation = trpc.supplement.deleteOrder.useMutation({
    onSuccess: () => utils.supplement.listOrders.invalidate(),
  });

  function addItem() {
    const supp = catalog?.find((s) => s.id === Number(selectedSupplementId));
    if (!supp) return;
    const qty = parseInt(itemQty, 10);
    if (!qty || qty < 1) return;
    setOrderItems((prev) => [
      ...prev,
      { supplementId: supp.id, supplementName: supp.name, quantity: qty, unit: supp.unit },
    ]);
    setSelectedSupplementId("");
    setItemQty("1");
  }

  function removeItem(idx: number) {
    setOrderItems((prev) => prev.filter((_, i) => i !== idx));
  }

  const statusColors: Record<string, string> = {
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    ordered: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    delivered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const statusLabel: Record<string, string> = {
    pending: T.pending,
    ordered: T.ordered,
    delivered: T.delivered,
    cancelled: T.cancelled,
  };

  return (
    <div dir={dir}>
      <div className="flex justify-end mb-4">
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
        >
          {showForm ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
          {showForm ? T.cancel : T.newOrder}
        </Button>
      </div>

      {showForm && (
        <div className="bg-slate-900 border border-white/10 rounded-xl p-6 mb-6 space-y-6">
          <h3 className="text-lg font-semibold text-white">{T.newOrder}</h3>

          {/* Client info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                className="bg-slate-800 border-white/10 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">{T.clientCity}</label>
              <Input
                value={form.clientCity}
                onChange={(e) => setForm((f) => ({ ...f, clientCity: e.target.value }))}
                className="bg-slate-800 border-white/10 text-white"
              />
            </div>
          </div>

          {/* Product picker */}
          <div>
            <label className="text-sm text-slate-400 mb-2 block">{T.orderItems}</label>
            <div className="flex gap-2 flex-wrap">
              <Select value={selectedSupplementId} onValueChange={setSelectedSupplementId}>
                <SelectTrigger className="bg-slate-800 border-white/10 text-white w-64">
                  <SelectValue placeholder={T.selectProduct} />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/10">
                  {(catalog || []).map((s) => (
                    <SelectItem key={s.id} value={String(s.id)} className="text-white hover:bg-emerald-500/10">
                      {s.name} ({s.unit})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                min={1}
                value={itemQty}
                onChange={(e) => setItemQty(e.target.value)}
                className="bg-slate-800 border-white/10 text-white w-24"
                placeholder={T.quantity}
              />
              <Button
                onClick={addItem}
                disabled={!selectedSupplementId}
                variant="outline"
                className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
              >
                <Plus className="w-4 h-4 mr-1" />
                {T.addItem}
              </Button>
            </div>

            {orderItems.length > 0 && (
              <div className="mt-3 space-y-2">
                {orderItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-slate-800/50 rounded-lg px-3 py-2 text-sm">
                    <Package className="w-4 h-4 text-teal-400 shrink-0" />
                    <span className="text-white flex-1">{item.supplementName}</span>
                    <span className="text-slate-400">{item.quantity} {item.unit}</span>
                    <button onClick={() => removeItem(idx)} className="text-slate-500 hover:text-red-400 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm text-slate-400 mb-1 block">{T.orderNotes}</label>
            <Textarea
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              className="bg-slate-800 border-white/10 text-white"
              rows={2}
            />
          </div>

          <div className="flex justify-end">
            <Button
              onClick={() =>
                createMutation.mutate({
                  clientName: form.clientName,
                  clientPhone: form.clientPhone,
                  clientCity: form.clientCity,
                  items: orderItems,
                  notes: form.notes || undefined,
                })
              }
              disabled={
                !form.clientName ||
                !form.clientPhone ||
                !form.clientCity ||
                orderItems.length === 0 ||
                createMutation.isPending
              }
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
      ) : orders && orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => {
            const items = order.items as OrderItem[];
            return (
              <div key={order.id} className="bg-slate-900 border border-white/10 rounded-xl p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <p className="text-white font-semibold text-sm">{order.clientName}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{order.clientPhone} · {order.clientCity}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      value={order.status}
                      onValueChange={(v) =>
                        updateStatus.mutate({ id: order.id, status: v as typeof order.status })
                      }
                    >
                      <SelectTrigger className={`h-7 text-xs border w-36 ${statusColors[order.status]} bg-transparent`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-white/10">
                        {(["pending", "ordered", "delivered", "cancelled"] as const).map((s) => (
                          <SelectItem key={s} value={s} className="text-white text-xs">
                            {statusLabel[s]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <button
                      onClick={() => deleteMutation.mutate({ id: order.id })}
                      className="w-7 h-7 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 flex items-center justify-center transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5 mb-3">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <Package className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span className="text-slate-200">{item.supplementName}</span>
                      <span className="text-slate-500">×</span>
                      <span className="text-slate-300 font-medium">{item.quantity} {item.unit}</span>
                    </div>
                  ))}
                </div>

                {order.notes && (
                  <p className="text-slate-500 text-xs italic border-t border-white/5 pt-2 mt-2">{order.notes}</p>
                )}

                <p className="text-slate-600 text-xs mt-2">
                  {new Date(order.createdAt).toLocaleDateString(language === "fr" ? "fr-FR" : "ar-MA")}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-500">{T.noOrders}</div>
      )}
    </div>
  );
}

function QuotesManager() {
  const { language, dir } = useLanguage();
  const T = translations[language];
  const utils = trpc.useUtils();
  const { data: quotes, isLoading } = trpc.quote.list.useQuery();
  const updateStatus = trpc.quote.updateStatus.useMutation({
    onSuccess: () => utils.quote.list.invalidate(),
  });
  const deleteQuote = trpc.quote.delete.useMutation({
    onSuccess: () => utils.quote.list.invalidate(),
  });

  const statusColors: Record<string, string> = {
    new: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    contacted: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    quoted: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    accepted: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    rejected: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <div dir={dir}>
      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          onClick={() => utils.quote.list.invalidate()}
          className="border-white/10 text-slate-400 hover:text-white"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          {language === "fr" ? "Actualiser" : "تحديث"}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
        </div>
      ) : quotes && quotes.length > 0 ? (
        <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-slate-400">{T.name}</TableHead>
                  <TableHead className="text-slate-400">{T.city}</TableHead>
                  <TableHead className="text-slate-400">{T.phone}</TableHead>
                  <TableHead className="text-slate-400">{T.category}</TableHead>
                  <TableHead className="text-slate-400">{T.status}</TableHead>
                  <TableHead className="text-slate-400">{T.date}</TableHead>
                  <TableHead className="text-slate-400 text-right">{T.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotes.map((q) => (
                  <TableRow key={q.id} className="border-white/10 hover:bg-white/5">
                    <TableCell className="text-white font-medium">{q.name}</TableCell>
                    <TableCell className="text-slate-300">{q.city}</TableCell>
                    <TableCell className="text-slate-300">{q.phone}</TableCell>
                    <TableCell className="text-slate-300">
                      {T[`${q.serviceType}Category` as keyof typeof T] || q.serviceType}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={q.status}
                        onValueChange={(v) =>
                          updateStatus.mutate({ id: q.id, status: v as typeof q.status })
                        }
                      >
                        <SelectTrigger
                          className={`h-7 text-xs border ${statusColors[q.status]} bg-transparent`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/10">
                          {["new", "contacted", "quoted", "accepted", "rejected"].map((s) => (
                            <SelectItem key={s} value={s} className="text-white text-xs">
                              {T[s as keyof typeof T] || s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-slate-500 text-xs">
                      {new Date(q.createdAt).toLocaleDateString(language === "fr" ? "fr-FR" : "ar-MA")}
                    </TableCell>
                    <TableCell className="text-right">
                      <button
                        onClick={() => deleteQuote.mutate({ id: q.id })}
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
        <div className="text-center py-12 text-slate-500">{T.noQuotes}</div>
      )}
    </div>
  );
}
