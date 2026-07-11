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
  LayoutGrid,
  FileSpreadsheet,
  Pencil,
  Star,
  Eye,
  EyeOff,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  PACKAGE_TYPES,
  PACKAGE_TYPE_LABELS,
  CATALOG_CURRENCY,
  type CatalogItem,
  type PackageType,
} from "@contracts/catalog";
import { downloadCatalogExcel } from "@/lib/excel";

export default function Admin() {
  const navigate = useNavigate();
  const { user, isLoading, isAuthenticated } = useAuth({
    redirectOnUnauthenticated: true,
  });
  const { language, dir } = useLanguage();
  const T = translations[language];
  const [tab, setTab] = useState<"catalog" | "gallery" | "quotes">("catalog");

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
          <div className="flex gap-2 mb-8 flex-wrap">
            <button
              onClick={() => setTab("catalog")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                tab === "catalog"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-slate-900 text-slate-400 border border-white/10 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              {T.catalogManagement}
            </button>
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
          </div>

          {tab === "catalog" ? (
            <CatalogManager />
          ) : tab === "gallery" ? (
            <GalleryManager />
          ) : (
            <QuotesManager />
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

type PackageForm = {
  name: string;
  nameAr: string;
  type: PackageType;
  description: string;
  descriptionAr: string;
  imageUrl: string;
  price: string;
  promoPrice: string;
  deliveryDays: string;
  sortOrder: string;
  options: string;
  optionsAr: string;
  popular: boolean;
  active: boolean;
};

const emptyPackageForm: PackageForm = {
  name: "",
  nameAr: "",
  type: "vitrine",
  description: "",
  descriptionAr: "",
  imageUrl: "",
  price: "",
  promoPrice: "",
  deliveryDays: "",
  sortOrder: "0",
  options: "",
  optionsAr: "",
  popular: false,
  active: true,
};

function itemToForm(item: CatalogItem): PackageForm {
  return {
    name: item.name,
    nameAr: item.nameAr ?? "",
    type: item.type,
    description: item.description ?? "",
    descriptionAr: item.descriptionAr ?? "",
    imageUrl: item.imageUrl ?? "",
    price: item.price ? String(item.price) : "",
    promoPrice: item.promoPrice != null ? String(item.promoPrice) : "",
    deliveryDays: item.deliveryDays != null ? String(item.deliveryDays) : "",
    sortOrder: String(item.sortOrder ?? 0),
    options: item.options.join("\n"),
    optionsAr: item.optionsAr ? item.optionsAr.join("\n") : "",
    popular: item.popular,
    active: item.active,
  };
}

function CatalogManager() {
  const { language, dir } = useLanguage();
  const T = translations[language];
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<PackageForm>(emptyPackageForm);

  const utils = trpc.useUtils();
  const { data: items, isLoading } = trpc.catalog.adminList.useQuery();

  const resetForm = () => {
    setForm(emptyPackageForm);
    setEditingId(null);
    setShowForm(false);
  };

  const onMutationSuccess = () => {
    utils.catalog.adminList.invalidate();
    utils.catalog.list.invalidate();
    resetForm();
  };

  const createMutation = trpc.catalog.create.useMutation({
    onSuccess: onMutationSuccess,
  });
  const updateMutation = trpc.catalog.update.useMutation({
    onSuccess: onMutationSuccess,
  });
  const deleteMutation = trpc.catalog.delete.useMutation({
    onSuccess: () => {
      utils.catalog.adminList.invalidate();
      utils.catalog.list.invalidate();
    },
  });
  const toggleMutation = trpc.catalog.toggleActive.useMutation({
    onSuccess: () => {
      utils.catalog.adminList.invalidate();
      utils.catalog.list.invalidate();
    },
  });

  const isSaving = createMutation.isPending || updateMutation.isPending;

  const buildPayload = () => {
    const toLines = (v: string) =>
      v
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
    const optionsAr = toLines(form.optionsAr);
    return {
      name: form.name.trim(),
      nameAr: form.nameAr.trim() || undefined,
      type: form.type,
      description: form.description.trim() || undefined,
      descriptionAr: form.descriptionAr.trim() || undefined,
      imageUrl: form.imageUrl.trim() || "",
      price: parseInt(form.price, 10) || 0,
      promoPrice: form.promoPrice.trim() ? parseInt(form.promoPrice, 10) : null,
      deliveryDays: form.deliveryDays.trim()
        ? parseInt(form.deliveryDays, 10)
        : null,
      options: toLines(form.options),
      optionsAr: optionsAr.length > 0 ? optionsAr : undefined,
      popular: form.popular,
      active: form.active,
      sortOrder: parseInt(form.sortOrder, 10) || 0,
    };
  };

  const handleSave = () => {
    const payload = buildPayload();
    if (!payload.name) return;
    if (editingId != null && editingId >= 0) {
      updateMutation.mutate({ ...payload, id: editingId });
    } else {
      createMutation.mutate(payload);
    }
  };

  const startEdit = (item: CatalogItem) => {
    setForm(itemToForm(item));
    // Built-in defaults have negative ids and no DB row: editing one creates a copy.
    setEditingId(item.id >= 0 ? item.id : null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startAdd = () => {
    setForm(emptyPackageForm);
    setEditingId(null);
    setShowForm(true);
  };

  const setField = <K extends keyof PackageForm>(
    key: K,
    value: PackageForm[K],
  ) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <div dir={dir}>
      <div className="flex flex-wrap justify-end gap-3 mb-4">
        <Button
          variant="outline"
          onClick={() => items && downloadCatalogExcel(items, language, T)}
          disabled={!items || items.length === 0}
          className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
        >
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          {T.exportExcel}
        </Button>
        <Button
          onClick={showForm ? resetForm : startAdd}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
        >
          {showForm ? (
            <X className="w-4 h-4 mr-2" />
          ) : (
            <Plus className="w-4 h-4 mr-2" />
          )}
          {showForm ? T.cancel : T.addPackage}
        </Button>
      </div>

      {showForm && (
        <div className="bg-slate-900 border border-white/10 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">
            {editingId != null ? T.editPackage : T.addPackage}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-400 mb-1 block">
                {T.packageName}
              </label>
              <Input
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                className="bg-slate-800 border-white/10 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">
                {T.packageNameAr}
              </label>
              <Input
                value={form.nameAr}
                onChange={(e) => setField("nameAr", e.target.value)}
                className="bg-slate-800 border-white/10 text-white"
                dir="rtl"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">
                {T.packageType}
              </label>
              <Select
                value={form.type}
                onValueChange={(v) => setField("type", v as PackageType)}
              >
                <SelectTrigger className="bg-slate-800 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/10">
                  {PACKAGE_TYPES.map((t) => (
                    <SelectItem
                      key={t}
                      value={t}
                      className="text-white hover:bg-emerald-500/10"
                    >
                      {PACKAGE_TYPE_LABELS[t][language]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">
                {T.packageImageUrl}
              </label>
              <Input
                value={form.imageUrl}
                onChange={(e) => setField("imageUrl", e.target.value)}
                placeholder="https://..."
                className="bg-slate-800 border-white/10 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">
                {T.packageDesc}
              </label>
              <Textarea
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
                className="bg-slate-800 border-white/10 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">
                {T.packageDescAr}
              </label>
              <Textarea
                value={form.descriptionAr}
                onChange={(e) => setField("descriptionAr", e.target.value)}
                className="bg-slate-800 border-white/10 text-white"
                dir="rtl"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">
                {T.packagePrice}
              </label>
              <Input
                type="number"
                min={0}
                value={form.price}
                onChange={(e) => setField("price", e.target.value)}
                placeholder="0"
                className="bg-slate-800 border-white/10 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">
                {T.packagePromoPrice}
              </label>
              <Input
                type="number"
                min={0}
                value={form.promoPrice}
                onChange={(e) => setField("promoPrice", e.target.value)}
                placeholder="—"
                className="bg-slate-800 border-white/10 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">
                {T.packageDeliveryDays}
              </label>
              <Input
                type="number"
                min={0}
                value={form.deliveryDays}
                onChange={(e) => setField("deliveryDays", e.target.value)}
                placeholder="—"
                className="bg-slate-800 border-white/10 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">
                {T.packageSortOrder}
              </label>
              <Input
                type="number"
                value={form.sortOrder}
                onChange={(e) => setField("sortOrder", e.target.value)}
                className="bg-slate-800 border-white/10 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">
                {T.packageOptions}
              </label>
              <Textarea
                value={form.options}
                onChange={(e) => setField("options", e.target.value)}
                className="bg-slate-800 border-white/10 text-white min-h-[120px]"
                placeholder={"Option 1\nOption 2\nOption 3"}
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">
                {T.packageOptionsAr}
              </label>
              <Textarea
                value={form.optionsAr}
                onChange={(e) => setField("optionsAr", e.target.value)}
                className="bg-slate-800 border-white/10 text-white min-h-[120px]"
                dir="rtl"
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={form.popular}
                onCheckedChange={(v) => setField("popular", v)}
              />
              <span className="text-sm text-slate-300">{T.packagePopular}</span>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={form.active}
                onCheckedChange={(v) => setField("active", v)}
              />
              <span className="text-sm text-slate-300">{T.packageActive}</span>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              onClick={handleSave}
              disabled={!form.name || isSaving}
              className="bg-emerald-500 hover:bg-emerald-400 text-white"
            >
              {isSaving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {items.map((item) => {
            const name =
              language === "ar" && item.nameAr ? item.nameAr : item.name;
            const hasPromo =
              item.promoPrice != null &&
              item.promoPrice > 0 &&
              item.promoPrice < item.price;
            return (
              <div
                key={item.id}
                className="bg-slate-900 border border-white/10 rounded-xl p-4 flex gap-4"
              >
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-slate-800 flex-shrink-0">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-white font-semibold truncate">
                          {name}
                        </p>
                        {item.popular && (
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-current flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500">
                        {PACKAGE_TYPE_LABELS[item.type][language]}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border flex-shrink-0 ${
                        item.active
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-slate-700/40 text-slate-400 border-white/10"
                      }`}
                    >
                      {item.active ? T.activeLabel : T.inactiveLabel}
                    </span>
                  </div>
                  <div className="mt-1 flex items-baseline gap-2">
                    {item.price > 0 ? (
                      <>
                        <span className="text-emerald-400 font-bold">
                          {(hasPromo
                            ? (item.promoPrice as number)
                            : item.price
                          ).toLocaleString(
                            language === "fr" ? "fr-FR" : "ar-MA",
                          )}{" "}
                          {CATALOG_CURRENCY}
                        </span>
                        {hasPromo && (
                          <span className="text-xs text-slate-500 line-through">
                            {item.price.toLocaleString(
                              language === "fr" ? "fr-FR" : "ar-MA",
                            )}{" "}
                            {CATALOG_CURRENCY}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-emerald-400 font-bold">
                        {T.catalogOnQuote}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {item.options.length}{" "}
                    {language === "fr" ? "options" : "خيارات"}
                  </p>
                  <div className="mt-3 flex items-center gap-1">
                    <button
                      onClick={() => startEdit(item)}
                      className="w-8 h-8 rounded-lg hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-400 flex items-center justify-center transition-colors"
                      title={T.editPackage}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    {item.id >= 0 && (
                      <>
                        <button
                          onClick={() =>
                            toggleMutation.mutate({
                              id: item.id,
                              active: !item.active,
                            })
                          }
                          className="w-8 h-8 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                          title={item.active ? T.inactiveLabel : T.activeLabel}
                        >
                          {item.active ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => deleteMutation.mutate({ id: item.id })}
                          className="w-8 h-8 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 flex items-center justify-center transition-colors"
                          title={T.delete}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-500">{T.noPackages}</div>
      )}
    </div>
  );
}
