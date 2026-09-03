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
  Minus,
} from "lucide-react";

export default function Admin() {
  const navigate = useNavigate();
  const { user, isLoading, isAuthenticated } = useAuth({
    redirectOnUnauthenticated: true,
  });
  const { language, dir } = useLanguage();
  const T = translations[language];
  const [tab, setTab] = useState<"gallery" | "quotes" | "orders">("gallery");

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
              onClick={() => setTab("orders")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                tab === "orders"
                  ? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                  : "bg-slate-900 text-slate-400 border border-white/10 hover:text-white"
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              {T.complementsManagement}
            </button>
          </div>

          {tab === "gallery" ? (
            <GalleryManager />
          ) : tab === "quotes" ? (
            <QuotesManager />
          ) : (
            <ComplementsManager />
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

type OrderItem = { name: string; quantity: number; unit: string };

function ComplementsManager() {
  const { language, dir } = useLanguage();
  const T = translations[language];
  const utils = trpc.useUtils();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    clientName: "",
    clientPhone: "",
    clientCity: "",
    notes: "",
    items: [{ name: "", quantity: 1, unit: "unité" }] as OrderItem[],
  });
  const [successMsg, setSuccessMsg] = useState(false);

  const { data: orders, isLoading } = trpc.order.list.useQuery();
  const createOrder = trpc.order.create.useMutation({
    onSuccess: () => {
      utils.order.list.invalidate();
      setShowForm(false);
      setForm({ clientName: "", clientPhone: "", clientCity: "", notes: "", items: [{ name: "", quantity: 1, unit: "unité" }] });
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 3000);
    },
  });
  const updateStatus = trpc.order.updateStatus.useMutation({
    onSuccess: () => utils.order.list.invalidate(),
  });
  const deleteOrder = trpc.order.delete.useMutation({
    onSuccess: () => utils.order.list.invalidate(),
  });

  const statusColors: Record<string, string> = {
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    ordered: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    delivered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const statusLabel: Record<string, string> = {
    pending: T.orderPending,
    ordered: T.orderOrdered,
    delivered: T.orderDelivered,
    cancelled: T.orderCancelled,
  };

  const updateItem = (idx: number, field: keyof OrderItem, value: string | number) => {
    setForm((f) => {
      const items = [...f.items];
      items[idx] = { ...items[idx], [field]: value };
      return { ...f, items };
    });
  };

  const addItem = () =>
    setForm((f) => ({ ...f, items: [...f.items, { name: "", quantity: 1, unit: "unité" }] }));

  const removeItem = (idx: number) =>
    setForm((f) => ({ ...f, items: f.items.filter((_, i) => i !== idx) }));

  const canSubmit =
    form.clientName.trim() &&
    form.clientPhone.trim() &&
    form.clientCity.trim() &&
    form.items.length > 0 &&
    form.items.every((it) => it.name.trim() && it.quantity > 0 && it.unit.trim());

  const commonUnits = ["unité", "kg", "L", "boîte", "rouleau", "sac", "pièce"];

  return (
    <div dir={dir}>
      {successMsg && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm flex items-center gap-2">
          <Check className="w-4 h-4" />
          {T.orderCreated}
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <Button
          variant="outline"
          onClick={() => utils.order.list.invalidate()}
          className="border-white/10 text-slate-400 hover:text-white"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          {language === "fr" ? "Actualiser" : "تحديث"}
        </Button>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white"
        >
          {showForm ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
          {showForm ? T.cancel : T.addOrder}
        </Button>
      </div>

      {showForm && (
        <div className="bg-slate-900 border border-white/10 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-teal-400" />
            {T.addOrder}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-sm text-slate-400 mb-1 block">{T.orderClient}</label>
              <Input
                value={form.clientName}
                onChange={(e) => setForm((f) => ({ ...f, clientName: e.target.value }))}
                className="bg-slate-800 border-white/10 text-white"
                placeholder={language === "fr" ? "Nom du client" : "اسم العميل"}
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">{T.orderPhone}</label>
              <Input
                value={form.clientPhone}
                onChange={(e) => setForm((f) => ({ ...f, clientPhone: e.target.value }))}
                className="bg-slate-800 border-white/10 text-white"
                placeholder="+212..."
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">{T.orderCity}</label>
              <Input
                value={form.clientCity}
                onChange={(e) => setForm((f) => ({ ...f, clientCity: e.target.value }))}
                className="bg-slate-800 border-white/10 text-white"
                placeholder={language === "fr" ? "Ville" : "المدينة"}
              />
            </div>
          </div>

          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm text-slate-400">{T.orderItems}</label>
              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-1 text-teal-400 hover:text-teal-300 text-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                {T.addItem}
              </button>
            </div>

            <div className="space-y-2">
              {form.items.map((item, idx) => (
                <div key={idx} className="flex gap-2 items-start">
                  <Input
                    value={item.name}
                    onChange={(e) => updateItem(idx, "name", e.target.value)}
                    placeholder={language === "fr" ? "Ex: Chlore granulés, pH+, Anti-algues…" : "مثال: كلور، مضاد للطحالب…"}
                    className="bg-slate-800 border-white/10 text-white flex-1"
                  />
                  <Input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => updateItem(idx, "quantity", parseFloat(e.target.value) || 1)}
                    className="bg-slate-800 border-white/10 text-white w-20"
                  />
                  <Select
                    value={item.unit}
                    onValueChange={(v) => updateItem(idx, "unit", v)}
                  >
                    <SelectTrigger className="bg-slate-800 border-white/10 text-white w-28">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/10">
                      {commonUnits.map((u) => (
                        <SelectItem key={u} value={u} className="text-white">
                          {u}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(idx)}
                      className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <label className="text-sm text-slate-400 mb-1 block">{T.orderNotes}</label>
            <Textarea
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              className="bg-slate-800 border-white/10 text-white"
              placeholder={language === "fr" ? "Instructions de livraison, remarques…" : "تعليمات التسليم، ملاحظات…"}
              rows={2}
            />
          </div>

          <div className="flex justify-end">
            <Button
              onClick={() =>
                createOrder.mutate({
                  clientName: form.clientName,
                  clientPhone: form.clientPhone,
                  clientCity: form.clientCity,
                  items: form.items,
                  notes: form.notes || undefined,
                })
              }
              disabled={!canSubmit || createOrder.isPending}
              className="bg-teal-500 hover:bg-teal-400 text-white"
            >
              {createOrder.isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              <Check className="w-4 h-4 mr-2" />
              {T.submitOrder}
            </Button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 text-teal-400 animate-spin" />
        </div>
      ) : orders && orders.length > 0 ? (
        <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-slate-400">{T.orderClient}</TableHead>
                  <TableHead className="text-slate-400">{T.orderPhone}</TableHead>
                  <TableHead className="text-slate-400">{T.orderCity}</TableHead>
                  <TableHead className="text-slate-400">{T.orderItems}</TableHead>
                  <TableHead className="text-slate-400">{T.orderStatus}</TableHead>
                  <TableHead className="text-slate-400">{T.orderDate}</TableHead>
                  <TableHead className="text-slate-400 text-right">{T.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((ord) => {
                  const items = ord.items as OrderItem[];
                  return (
                    <TableRow key={ord.id} className="border-white/10 hover:bg-white/5">
                      <TableCell className="text-white font-medium">{ord.clientName}</TableCell>
                      <TableCell className="text-slate-300">{ord.clientPhone}</TableCell>
                      <TableCell className="text-slate-300">{ord.clientCity}</TableCell>
                      <TableCell className="text-slate-300 max-w-xs">
                        <ul className="space-y-0.5">
                          {items.map((it, i) => (
                            <li key={i} className="text-xs">
                              <span className="text-white font-medium">{it.name}</span>
                              <span className="text-slate-400"> — {it.quantity} {it.unit}</span>
                            </li>
                          ))}
                        </ul>
                        {ord.notes && (
                          <p className="text-xs text-slate-500 mt-1 italic">{ord.notes}</p>
                        )}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={ord.status}
                          onValueChange={(v) =>
                            updateStatus.mutate({ id: ord.id, status: v as typeof ord.status })
                          }
                        >
                          <SelectTrigger
                            className={`h-7 text-xs border ${statusColors[ord.status]} bg-transparent`}
                          >
                            <SelectValue>{statusLabel[ord.status]}</SelectValue>
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-white/10">
                            {(["pending", "ordered", "delivered", "cancelled"] as const).map((s) => (
                              <SelectItem key={s} value={s} className="text-white text-xs">
                                {statusLabel[s]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-slate-500 text-xs">
                        {new Date(ord.createdAt).toLocaleDateString(language === "fr" ? "fr-FR" : "ar-MA")}
                      </TableCell>
                      <TableCell className="text-right">
                        <button
                          onClick={() => deleteOrder.mutate({ id: ord.id })}
                          className="w-7 h-7 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 flex items-center justify-center transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
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
