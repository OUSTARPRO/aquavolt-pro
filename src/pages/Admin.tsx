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
  Download,
  Tag,
  Star,
  Edit2,
  LayoutGrid,
} from "lucide-react";
import * as XLSX from "xlsx";
import type { CatalogueItem } from "@db/schema";

export default function Admin() {
  const navigate = useNavigate();
  const { user, isLoading, isAuthenticated } = useAuth({
    redirectOnUnauthenticated: true,
  });
  const { language, dir } = useLanguage();
  const T = translations[language];
  const [tab, setTab] = useState<"gallery" | "quotes" | "catalogue">("catalogue");

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
                {language === "fr"
                  ? `Connecté en tant que ${user?.name || user?.email}`
                  : `متصل كـ ${user?.name || user?.email}`}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 flex-wrap">
            <button
              onClick={() => setTab("catalogue")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                tab === "catalogue"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-slate-900 text-slate-400 border border-white/10 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              {T.catalogueManagement}
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

          {tab === "catalogue" && <CatalogueManager />}
          {tab === "gallery" && <GalleryManager />}
          {tab === "quotes" && <QuotesManager />}
        </div>
      </main>
    </div>
  );
}

/* ─── CATALOGUE MANAGER ──────────────────────────────────────────────────── */

const categoryLabels: Record<string, string> = {
  electricity: "Électricité",
  plumbing: "Plomberie",
  pool: "Piscines",
  maintenance: "Maintenance",
};

const planLabels: Record<string, string> = {
  basic: "Basique",
  standard: "Standard",
  premium: "Premium",
};

function CatalogueManager() {
  const { language, dir } = useLanguage();
  const T = translations[language];
  const utils = trpc.useUtils();
  const { data: items, isLoading } = trpc.catalogue.list.useQuery();
  const updateMutation = trpc.catalogue.update.useMutation({
    onSuccess: () => utils.catalogue.list.invalidate(),
  });
  const deleteMutation = trpc.catalogue.delete.useMutation({
    onSuccess: () => utils.catalogue.list.invalidate(),
  });
  const createMutation = trpc.catalogue.create.useMutation({
    onSuccess: () => {
      utils.catalogue.list.invalidate();
      setShowForm(false);
      resetForm();
    },
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editPrice, setEditPrice] = useState("");
  const [editOriginalPrice, setEditOriginalPrice] = useState("");
  const [editPromoLabel, setEditPromoLabel] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [exportMsg, setExportMsg] = useState(false);

  const emptyForm = {
    name: "",
    nameAr: "",
    category: "electricity" as const,
    plan: "basic" as const,
    price: "",
    originalPrice: "",
    features: "",
    featuresAr: "",
    isPromo: false,
    isFeatured: false,
    promoLabel: "",
    promoLabelAr: "",
    sortOrder: "0",
  };
  const [form, setForm] = useState(emptyForm);

  function resetForm() {
    setForm(emptyForm);
  }

  function startEdit(item: CatalogueItem) {
    setEditingId(item.id);
    setEditPrice(String(item.price));
    setEditOriginalPrice(item.originalPrice ? String(item.originalPrice) : "");
    setEditPromoLabel(item.promoLabel || "");
  }

  function saveEdit(item: CatalogueItem) {
    const price = parseInt(editPrice, 10);
    const originalPrice = editOriginalPrice ? parseInt(editOriginalPrice, 10) : null;
    if (isNaN(price) || price <= 0) return;
    updateMutation.mutate({
      id: item.id,
      price,
      originalPrice: originalPrice || undefined,
      promoLabel: editPromoLabel || null,
      isPromo: originalPrice ? true : item.isPromo,
    });
    setEditingId(null);
  }

  function toggleFeatured(item: CatalogueItem) {
    updateMutation.mutate({ id: item.id, isFeatured: !item.isFeatured });
  }

  function togglePromo(item: CatalogueItem) {
    updateMutation.mutate({ id: item.id, isPromo: !item.isPromo });
  }

  function exportExcel() {
    if (!items) return;
    const rows = items.map((i) => ({
      ID: i.id,
      Nom: i.name,
      "Nom AR": i.nameAr || "",
      Catégorie: categoryLabels[i.category] || i.category,
      Plan: planLabels[i.plan] || i.plan,
      "Prix (MAD)": i.price,
      "Prix Original (MAD)": i.originalPrice || "",
      "Label Promo": i.promoLabel || "",
      "En Vedette": i.isFeatured ? "Oui" : "Non",
      Promo: i.isPromo ? "Oui" : "Non",
      Fonctionnalités: Array.isArray(i.features) ? (i.features as string[]).join(" | ") : "",
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Catalogue");
    ws["!cols"] = [
      { wch: 5 }, { wch: 35 }, { wch: 35 }, { wch: 14 }, { wch: 12 },
      { wch: 12 }, { wch: 16 }, { wch: 18 }, { wch: 12 }, { wch: 8 }, { wch: 60 },
    ];
    XLSX.writeFile(wb, "catalogue-aquavolt.xlsx");
    setExportMsg(true);
    setTimeout(() => setExportMsg(false), 3000);
  }

  const grouped = items
    ? (["electricity", "plumbing", "pool", "maintenance"] as const).map((cat) => ({
        cat,
        items: items.filter((i) => i.category === cat),
      }))
    : [];

  const categoryColors: Record<string, string> = {
    electricity: "text-amber-400 border-amber-500/20 bg-amber-500/10",
    plumbing: "text-sky-400 border-sky-500/20 bg-sky-500/10",
    pool: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
    maintenance: "text-violet-400 border-violet-500/20 bg-violet-500/10",
  };

  return (
    <div dir={dir}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={exportExcel}
            variant="outline"
            className="border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 gap-2"
          >
            <Download className="w-4 h-4" />
            {T.exportCatalogueExcel}
          </Button>
          {exportMsg && (
            <span className="flex items-center gap-1 text-emerald-400 text-sm">
              <Check className="w-4 h-4" />
              {T.exportSuccess}
            </span>
          )}
        </div>
        <Button
          onClick={() => { setShowForm(!showForm); resetForm(); }}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white gap-2"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm
            ? (language === "fr" ? "Annuler" : "إلغاء")
            : (language === "fr" ? "Ajouter un pack" : "إضافة باقة")}
        </Button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="bg-slate-900 border border-white/10 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">
            {language === "fr" ? "Nouveau pack" : "باقة جديدة"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Nom (FR)</label>
              <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="bg-slate-800 border-white/10 text-white" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Nom (AR)</label>
              <Input value={form.nameAr} onChange={(e) => setForm((f) => ({ ...f, nameAr: e.target.value }))} className="bg-slate-800 border-white/10 text-white" dir="rtl" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Catégorie</label>
              <Select value={form.category} onValueChange={(v) => setForm((f) => ({ ...f, category: v as typeof form.category }))}>
                <SelectTrigger className="bg-slate-800 border-white/10 text-white"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/10">
                  {(["electricity", "plumbing", "pool", "maintenance"] as const).map((c) => (
                    <SelectItem key={c} value={c} className="text-white">{categoryLabels[c]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Plan</label>
              <Select value={form.plan} onValueChange={(v) => setForm((f) => ({ ...f, plan: v as typeof form.plan }))}>
                <SelectTrigger className="bg-slate-800 border-white/10 text-white"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/10">
                  {(["basic", "standard", "premium"] as const).map((p) => (
                    <SelectItem key={p} value={p} className="text-white">{planLabels[p]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Prix (MAD)</label>
              <Input type="number" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} className="bg-slate-800 border-white/10 text-white" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Prix original (MAD, optionnel)</label>
              <Input type="number" value={form.originalPrice} onChange={(e) => setForm((f) => ({ ...f, originalPrice: e.target.value }))} className="bg-slate-800 border-white/10 text-white" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Label promo</label>
              <Input value={form.promoLabel} onChange={(e) => setForm((f) => ({ ...f, promoLabel: e.target.value }))} placeholder="ex: 🔥 Promo été" className="bg-slate-800 border-white/10 text-white" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Label promo (AR)</label>
              <Input value={form.promoLabelAr} onChange={(e) => setForm((f) => ({ ...f, promoLabelAr: e.target.value }))} className="bg-slate-800 border-white/10 text-white" dir="rtl" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Ordre d'affichage</label>
              <Input type="number" value={form.sortOrder} onChange={(e) => setForm((f) => ({ ...f, sortOrder: e.target.value }))} className="bg-slate-800 border-white/10 text-white" />
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <label className="text-xs text-slate-400 mb-1 block">Fonctionnalités (FR, une par ligne)</label>
              <Textarea rows={4} value={form.features} onChange={(e) => setForm((f) => ({ ...f, features: e.target.value }))} className="bg-slate-800 border-white/10 text-white text-sm" />
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <label className="text-xs text-slate-400 mb-1 block">Fonctionnalités (AR, une par ligne)</label>
              <Textarea rows={4} value={form.featuresAr} onChange={(e) => setForm((f) => ({ ...f, featuresAr: e.target.value }))} className="bg-slate-800 border-white/10 text-white text-sm" dir="rtl" />
            </div>
            <div className="flex items-center gap-4 sm:col-span-2 lg:col-span-1">
              <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                <input type="checkbox" checked={form.isPromo} onChange={(e) => setForm((f) => ({ ...f, isPromo: e.target.checked }))} className="rounded" />
                Promo active
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm((f) => ({ ...f, isFeatured: e.target.checked }))} className="rounded" />
                En vedette
              </label>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              onClick={() => {
                const price = parseInt(form.price, 10);
                if (!form.name || isNaN(price)) return;
                createMutation.mutate({
                  name: form.name,
                  nameAr: form.nameAr || undefined,
                  category: form.category,
                  plan: form.plan,
                  price,
                  originalPrice: form.originalPrice ? parseInt(form.originalPrice, 10) : undefined,
                  features: form.features.split("\n").filter(Boolean),
                  featuresAr: form.featuresAr ? form.featuresAr.split("\n").filter(Boolean) : undefined,
                  isPromo: form.isPromo,
                  isFeatured: form.isFeatured,
                  promoLabel: form.promoLabel || undefined,
                  promoLabelAr: form.promoLabelAr || undefined,
                  sortOrder: parseInt(form.sortOrder, 10) || 0,
                });
              }}
              disabled={!form.name || !form.price || createMutation.isPending}
              className="bg-emerald-500 hover:bg-emerald-400 text-white gap-2"
            >
              {createMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              <Check className="w-4 h-4" />
              {language === "fr" ? "Enregistrer" : "حفظ"}
            </Button>
          </div>
        </div>
      )}

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
        </div>
      ) : (
        <div className="space-y-10">
          {grouped.map(({ cat, items: catItems }) => (
            <div key={cat}>
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-3 py-1 rounded-lg text-sm font-semibold border ${categoryColors[cat]}`}>
                  {categoryLabels[cat]}
                </span>
                <span className="text-slate-500 text-sm">{catItems.length} packs</span>
              </div>
              <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10 hover:bg-transparent">
                        <TableHead className="text-slate-400">Nom</TableHead>
                        <TableHead className="text-slate-400">Plan</TableHead>
                        <TableHead className="text-slate-400">Prix (MAD)</TableHead>
                        <TableHead className="text-slate-400">Prix original</TableHead>
                        <TableHead className="text-slate-400">Label promo</TableHead>
                        <TableHead className="text-slate-400">Promo</TableHead>
                        <TableHead className="text-slate-400">Vedette</TableHead>
                        <TableHead className="text-slate-400 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {catItems.map((item) => (
                        <TableRow key={item.id} className="border-white/10 hover:bg-white/5">
                          <TableCell className="text-white font-medium text-sm max-w-[200px]">
                            <div className="truncate">{item.name}</div>
                            {item.nameAr && <div className="text-slate-500 text-xs truncate" dir="rtl">{item.nameAr}</div>}
                          </TableCell>
                          <TableCell>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full
                              ${item.plan === "premium" ? "bg-amber-500/10 text-amber-400" :
                                item.plan === "standard" ? "bg-emerald-500/10 text-emerald-400" :
                                "bg-slate-700 text-slate-300"}`}>
                              {planLabels[item.plan]}
                            </span>
                          </TableCell>
                          <TableCell>
                            {editingId === item.id ? (
                              <Input
                                type="number"
                                value={editPrice}
                                onChange={(e) => setEditPrice(e.target.value)}
                                className="bg-slate-800 border-white/10 text-white h-7 w-28 text-sm"
                              />
                            ) : (
                              <span className="text-white font-semibold">{item.price.toLocaleString()}</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {editingId === item.id ? (
                              <Input
                                type="number"
                                value={editOriginalPrice}
                                onChange={(e) => setEditOriginalPrice(e.target.value)}
                                placeholder="—"
                                className="bg-slate-800 border-white/10 text-white h-7 w-28 text-sm"
                              />
                            ) : (
                              <span className="text-slate-400 text-sm">
                                {item.originalPrice ? item.originalPrice.toLocaleString() : "—"}
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            {editingId === item.id ? (
                              <Input
                                value={editPromoLabel}
                                onChange={(e) => setEditPromoLabel(e.target.value)}
                                placeholder="ex: 🔥 Promo"
                                className="bg-slate-800 border-white/10 text-white h-7 w-32 text-sm"
                              />
                            ) : (
                              <span className="text-slate-300 text-sm">{item.promoLabel || "—"}</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <button
                              onClick={() => togglePromo(item)}
                              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border transition-colors
                                ${item.isPromo
                                  ? "bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/20"
                                  : "bg-slate-800 text-slate-500 border-white/10 hover:text-white"}`}
                            >
                              <Tag className="w-3 h-3" />
                              {item.isPromo ? "Oui" : "Non"}
                            </button>
                          </TableCell>
                          <TableCell>
                            <button
                              onClick={() => toggleFeatured(item)}
                              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border transition-colors
                                ${item.isFeatured
                                  ? "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20"
                                  : "bg-slate-800 text-slate-500 border-white/10 hover:text-white"}`}
                            >
                              <Star className="w-3 h-3" />
                              {item.isFeatured ? "Oui" : "Non"}
                            </button>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              {editingId === item.id ? (
                                <>
                                  <button
                                    onClick={() => saveEdit(item)}
                                    disabled={updateMutation.isPending}
                                    className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 flex items-center justify-center transition-colors"
                                  >
                                    {updateMutation.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                                  </button>
                                  <button
                                    onClick={() => setEditingId(null)}
                                    className="w-7 h-7 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </>
                              ) : (
                                <button
                                  onClick={() => startEdit(item)}
                                  className="w-7 h-7 rounded-lg hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-400 flex items-center justify-center transition-colors"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                              <button
                                onClick={() => deleteMutation.mutate({ id: item.id })}
                                className="w-7 h-7 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 flex items-center justify-center transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── GALLERY MANAGER ────────────────────────────────────────────────────── */

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

/* ─── QUOTES MANAGER ─────────────────────────────────────────────────────── */

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
  const [exportMsg, setExportMsg] = useState(false);

  const statusColors: Record<string, string> = {
    new: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    contacted: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    quoted: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    accepted: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    rejected: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  function exportExcel() {
    if (!quotes) return;
    const rows = quotes.map((q) => ({
      ID: q.id,
      Nom: q.name,
      Ville: q.city,
      Téléphone: q.phone,
      Email: q.email || "",
      Service: T[`${q.serviceType}Category` as keyof typeof T] || q.serviceType,
      Détails: q.details || "",
      Statut: T[q.status as keyof typeof T] || q.status,
      Date: new Date(q.createdAt).toLocaleDateString(language === "fr" ? "fr-FR" : "ar-MA"),
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Devis");
    ws["!cols"] = [
      { wch: 5 }, { wch: 25 }, { wch: 18 }, { wch: 16 }, { wch: 28 },
      { wch: 14 }, { wch: 50 }, { wch: 16 }, { wch: 14 },
    ];
    XLSX.writeFile(wb, "devis-aquavolt.xlsx");
    setExportMsg(true);
    setTimeout(() => setExportMsg(false), 3000);
  }

  return (
    <div dir={dir}>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={exportExcel}
            variant="outline"
            className="border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 gap-2"
            disabled={!quotes || quotes.length === 0}
          >
            <Download className="w-4 h-4" />
            {T.exportQuotesExcel}
          </Button>
          {exportMsg && (
            <span className="flex items-center gap-1 text-emerald-400 text-sm">
              <Check className="w-4 h-4" />
              {T.exportSuccess}
            </span>
          )}
        </div>
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
