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
import * as XLSX from "xlsx";
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
  Pencil,
  Download,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

export default function Admin() {
  const navigate = useNavigate();
  const { user, isLoading, isAuthenticated } = useAuth({
    redirectOnUnauthenticated: true,
  });
  const { language, dir } = useLanguage();
  const T = translations[language];
  const [tab, setTab] = useState<"gallery" | "quotes" | "catalogue">("gallery");

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
          <div className="flex gap-2 mb-8">
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
          </div>

          {tab === "gallery" ? <GalleryManager /> : tab === "quotes" ? <QuotesManager /> : <CatalogueManager />}
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

const CATEGORIES = ["vitrine", "ecommerce", "portfolio", "blog", "corporate", "custom"] as const;
type PkgCategory = typeof CATEGORIES[number];

const BADGE_COLORS = ["emerald", "amber", "violet", "rose", "sky", "orange"] as const;

const emptyForm = {
  name: "",
  description: "",
  category: "vitrine" as PkgCategory,
  price: 0,
  oldPrice: null as number | null,
  options: "",
  badge: "",
  badgeColor: "emerald",
  promoPercent: null as number | null,
  isActive: true,
  sortOrder: 0,
};

function CatalogueManager() {
  const { language, dir } = useLanguage();
  const T = translations[language];
  const utils = trpc.useUtils();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...emptyForm });

  const { data: packages, isLoading } = trpc.catalog.listAll.useQuery();

  const createMutation = trpc.catalog.create.useMutation({
    onSuccess: () => { utils.catalog.listAll.invalidate(); utils.catalog.list.invalidate(); resetForm(); },
  });
  const updateMutation = trpc.catalog.update.useMutation({
    onSuccess: () => { utils.catalog.listAll.invalidate(); utils.catalog.list.invalidate(); resetForm(); },
  });
  const deleteMutation = trpc.catalog.delete.useMutation({
    onSuccess: () => { utils.catalog.listAll.invalidate(); utils.catalog.list.invalidate(); },
  });
  const toggleMutation = trpc.catalog.toggleActive.useMutation({
    onSuccess: () => { utils.catalog.listAll.invalidate(); utils.catalog.list.invalidate(); },
  });

  function resetForm() {
    setShowForm(false);
    setEditId(null);
    setForm({ ...emptyForm });
  }

  function startEdit(pkg: NonNullable<typeof packages>[number]) {
    setForm({
      name: pkg.name,
      description: pkg.description,
      category: pkg.category,
      price: pkg.price,
      oldPrice: pkg.oldPrice ?? null,
      options: (pkg.options as string[]).join("\n"),
      badge: pkg.badge ?? "",
      badgeColor: pkg.badgeColor ?? "emerald",
      promoPercent: pkg.promoPercent ?? null,
      isActive: pkg.isActive,
      sortOrder: pkg.sortOrder,
    });
    setEditId(pkg.id);
    setShowForm(true);
  }

  function handleSubmit() {
    const payload = {
      name: form.name,
      description: form.description,
      category: form.category,
      price: form.price,
      oldPrice: form.oldPrice,
      options: form.options.split("\n").map((s) => s.trim()).filter(Boolean),
      badge: form.badge || null,
      badgeColor: form.badgeColor || "emerald",
      promoPercent: form.promoPercent,
      isActive: form.isActive,
      sortOrder: form.sortOrder,
    };
    if (editId !== null) {
      updateMutation.mutate({ id: editId, ...payload });
    } else {
      createMutation.mutate(payload);
    }
  }

  function exportToExcel() {
    if (!packages) return;
    const rows = packages.map((p) => ({
      ID: p.id,
      Forfait: p.name,
      Catégorie: p.category,
      Description: p.description,
      "Prix (€)": p.price === 0 ? "Sur devis" : p.price,
      "Ancien Prix (€)": p.oldPrice ?? "",
      "Remise %": p.promoPercent ?? "",
      Badge: p.badge ?? "",
      Options: (p.options as string[]).join(" | "),
      Actif: p.isActive ? "Oui" : "Non",
      "Ordre": p.sortOrder,
      "Créé le": new Date(p.createdAt).toLocaleDateString("fr-FR"),
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    ws["!cols"] = [
      { wch: 6 }, { wch: 22 }, { wch: 14 }, { wch: 50 }, { wch: 12 },
      { wch: 12 }, { wch: 10 }, { wch: 14 }, { wch: 80 }, { wch: 8 }, { wch: 8 }, { wch: 12 },
    ];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Catalogue");
    XLSX.writeFile(wb, `catalogue-admin-${new Date().toISOString().split("T")[0]}.xlsx`);
  }

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div dir={dir}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Button
            onClick={() => { resetForm(); setShowForm(!showForm); }}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white gap-2"
          >
            {showForm && !editId ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {showForm && !editId ? T.cancel : T.catalogueAddPackage}
          </Button>
        </div>
        <Button
          variant="outline"
          onClick={exportToExcel}
          className="border-white/10 text-slate-400 hover:text-white gap-2"
        >
          <Download className="w-4 h-4" />
          {T.catalogueExportExcel}
        </Button>
      </div>

      {showForm && (
        <div className="bg-slate-900 border border-white/10 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-5">
            {editId ? T.catalogueEditPackage : T.catalogueAddPackage}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="text-sm text-slate-400 mb-1 block">{T.cataloguePackageName}</label>
              <Input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="bg-slate-800 border-white/10 text-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-slate-400 mb-1 block">{T.cataloguePackageDesc}</label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="bg-slate-800 border-white/10 text-white"
                rows={2}
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">{T.cataloguePackageCategory}</label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm((f) => ({ ...f, category: v as PkgCategory }))}
              >
                <SelectTrigger className="bg-slate-800 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/10">
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c} className="text-white">
                      {T[`catalogue${c.charAt(0).toUpperCase() + c.slice(1)}` as keyof typeof T] || c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">{T.cataloguePackagePrice}</label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
                className="bg-slate-800 border-white/10 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">{T.cataloguePackageOldPrice}</label>
              <Input
                type="number"
                value={form.oldPrice ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, oldPrice: e.target.value ? Number(e.target.value) : null }))}
                placeholder="0"
                className="bg-slate-800 border-white/10 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">{T.cataloguePackagePromo}</label>
              <Input
                type="number"
                value={form.promoPercent ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, promoPercent: e.target.value ? Number(e.target.value) : null }))}
                placeholder="0"
                min={0}
                max={100}
                className="bg-slate-800 border-white/10 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">{T.cataloguePackageBadge}</label>
              <Input
                value={form.badge}
                onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))}
                placeholder={T.catalogueNoBadge}
                className="bg-slate-800 border-white/10 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Couleur badge</label>
              <Select
                value={form.badgeColor}
                onValueChange={(v) => setForm((f) => ({ ...f, badgeColor: v }))}
              >
                <SelectTrigger className="bg-slate-800 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/10">
                  {BADGE_COLORS.map((c) => (
                    <SelectItem key={c} value={c} className="text-white capitalize">{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">{T.cataloguePackageSortOrder}</label>
              <Input
                type="number"
                value={form.sortOrder}
                onChange={(e) => setForm((f) => ({ ...f, sortOrder: Number(e.target.value) }))}
                className="bg-slate-800 border-white/10 text-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-slate-400 mb-1 block">{T.cataloguePackageOptions}</label>
              <Textarea
                value={form.options}
                onChange={(e) => setForm((f) => ({ ...f, options: e.target.value }))}
                className="bg-slate-800 border-white/10 text-white font-mono text-sm"
                rows={6}
                placeholder="Design responsive&#10;SSL gratuit&#10;Hébergement 1 an"
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm text-slate-400">{T.cataloguePackageActive}</label>
              <button
                onClick={() => setForm((f) => ({ ...f, isActive: !f.isActive }))}
                className={`transition-colors ${form.isActive ? "text-emerald-400" : "text-slate-600"}`}
              >
                {form.isActive ? <ToggleRight className="w-7 h-7" /> : <ToggleLeft className="w-7 h-7" />}
              </button>
            </div>
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <Button variant="outline" onClick={resetForm} className="border-white/10 text-slate-400">
              <X className="w-4 h-4 mr-1" />
              {T.cancel}
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!form.name || !form.description || isSaving}
              className="bg-emerald-500 hover:bg-emerald-400 text-white"
            >
              {isSaving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              <Check className="w-4 h-4 mr-1" />
              {T.save}
            </Button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
        </div>
      ) : packages && packages.length > 0 ? (
        <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-slate-400">Forfait</TableHead>
                  <TableHead className="text-slate-400">Catégorie</TableHead>
                  <TableHead className="text-slate-400">Prix</TableHead>
                  <TableHead className="text-slate-400">Badge</TableHead>
                  <TableHead className="text-slate-400">Promo</TableHead>
                  <TableHead className="text-slate-400">Statut</TableHead>
                  <TableHead className="text-slate-400 text-right">{T.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {packages.map((pkg) => (
                  <TableRow key={pkg.id} className="border-white/10 hover:bg-white/5">
                    <TableCell className="text-white font-medium">{pkg.name}</TableCell>
                    <TableCell className="text-slate-300 capitalize">{pkg.category}</TableCell>
                    <TableCell className="text-slate-300">
                      {pkg.price === 0 ? (
                        <span className="text-slate-500">Sur devis</span>
                      ) : (
                        <span>
                          {pkg.price.toLocaleString("fr-FR")} €
                          {pkg.oldPrice && (
                            <span className="ml-1 text-slate-600 line-through text-xs">
                              {pkg.oldPrice.toLocaleString("fr-FR")} €
                            </span>
                          )}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {pkg.badge ? (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {pkg.badge}
                        </span>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {pkg.promoPercent ? (
                        <span className="text-rose-400 font-semibold">-{pkg.promoPercent}%</span>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => toggleMutation.mutate({ id: pkg.id, isActive: !pkg.isActive })}
                        className={`transition-colors ${pkg.isActive ? "text-emerald-400" : "text-slate-600"}`}
                      >
                        {pkg.isActive ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                      </button>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => startEdit(pkg)}
                          className="w-7 h-7 rounded-lg hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-400 flex items-center justify-center transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteMutation.mutate({ id: pkg.id })}
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
      ) : (
        <div className="text-center py-12 text-slate-500">{T.catalogueNoPackages}</div>
      )}
    </div>
  );
}
