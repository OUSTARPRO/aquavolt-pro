import { useState, useMemo, useCallback } from "react";
import {
  ShoppingCart,
  Search,
  Star,
  Tag,
  Plus,
  Minus,
  Trash2,
  X,
  ShoppingBag,
  Download,
  Package,
  Zap,
  Filter,
  ChevronRight,
  Check,
  ArrowRight,
} from "lucide-react";
import * as XLSX from "xlsx";
import { Link } from "react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
import { trpc } from "@/providers/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ─── Static fallback products ───────────────────────────────
const staticProducts = [
  {
    id: 1, name: "Tableau Électrique Modulaire", nameAr: "لوحة كهربائية معيارية",
    description: "Tableau électrique 13 modules, protection différentielle 30mA, disjoncteurs 16A inclus. Idéal pour rénovation ou installation neuve.",
    price: 89, oldPrice: 120, promoPercent: 26,
    category: "Électricité", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    images: [], tags: ["électricité", "tableau", "sécurité"], stock: 15,
    sku: "ELEC-TAB-001", isActive: true, isFeatured: true, sortOrder: 0,
  },
  {
    id: 2, name: "Kit Détecteur de Fuite", nameAr: "مجموعة كاشف التسرب",
    description: "Détecteur de fuite d'eau intelligent avec alarme sonore et notification mobile. Installation facile, batterie 2 ans.",
    price: 45, oldPrice: null, promoPercent: null,
    category: "Plomberie", imageUrl: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80",
    images: [], tags: ["plomberie", "détecteur", "sécurité"], stock: 28,
    sku: "PLOMB-DET-001", isActive: true, isFeatured: true, sortOrder: 1,
  },
  {
    id: 3, name: "Pompe de Filtration Piscine 1.5CV", nameAr: "مضخة ترشيح حمام سباحة",
    description: "Pompe centrifuge silencieuse 1.5CV, débit 18m³/h, corps en ABS résistant aux UV. Parfaite pour piscines jusqu'à 80m³.",
    price: 299, oldPrice: 380, promoPercent: 21,
    category: "Piscines", imageUrl: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=400&q=80",
    images: [], tags: ["piscine", "pompe", "filtration"], stock: 8,
    sku: "PISC-POMPE-001", isActive: true, isFeatured: true, sortOrder: 2,
  },
  {
    id: 4, name: "Ampoule LED 12W E27 (lot 10)", nameAr: "مصابيح LED 12W (عبوة 10)",
    description: "Ampoules LED 12W équivalent 100W, lumière chaude 3000K, durée de vie 25 000h. Économies d'énergie jusqu'à 85%.",
    price: 24, oldPrice: 35, promoPercent: 31,
    category: "Électricité", imageUrl: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80",
    images: [], tags: ["LED", "ampoule", "éclairage"], stock: 50,
    sku: "ELEC-LED-001", isActive: true, isFeatured: false, sortOrder: 3,
  },
  {
    id: 5, name: "Robinet Thermostatique Douche", nameAr: "صنبور حمام ثرموستاتي",
    description: "Mitigeur thermostatique encastré, anti-brûlure, finition chromée brossée. Compatible toutes pressions. Garantie 5 ans.",
    price: 135, oldPrice: null, promoPercent: null,
    category: "Plomberie", imageUrl: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80",
    images: [], tags: ["robinet", "douche", "thermostat"], stock: 12,
    sku: "PLOMB-ROB-001", isActive: true, isFeatured: false, sortOrder: 4,
  },
  {
    id: 6, name: "Traitement Eau Piscine Kit Complet", nameAr: "مجموعة معالجة مياه الحمام",
    description: "Kit complet : chlore choc 5kg, anti-algues 1L, floculant 1L, testeur pH numérique. Pour piscines jusqu'à 50m³.",
    price: 79, oldPrice: 99, promoPercent: 20,
    category: "Piscines", imageUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&q=80",
    images: [], tags: ["piscine", "traitement", "chlore"], stock: 20,
    sku: "PISC-TRAITE-001", isActive: true, isFeatured: false, sortOrder: 5,
  },
  {
    id: 7, name: "Câble Électrique 2.5mm² (100m)", nameAr: "كابل كهربائي 2.5mm (100م)",
    description: "Câble rigide H07V-U 2.5mm², isolation PVC, couleur rouge. Norme NF. Rouleau 100m. Pour circuits prises 16A.",
    price: 58, oldPrice: null, promoPercent: null,
    category: "Électricité", imageUrl: "https://images.unsplash.com/photo-1601598851547-4302969d0614?w=400&q=80",
    images: [], tags: ["câble", "fil électrique", "installation"], stock: 35,
    sku: "ELEC-CAB-001", isActive: true, isFeatured: false, sortOrder: 6,
  },
  {
    id: 8, name: "Chauffe-Eau Thermodynamique 200L", nameAr: "سخان مائي ديناميكي 200L",
    description: "Chauffe-eau thermodynamique 200L, classe énergétique A+, compatible solaire. Économie d'énergie 70% vs électrique classique.",
    price: 899, oldPrice: 1099, promoPercent: 18,
    category: "Plomberie", imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80",
    images: [], tags: ["chauffe-eau", "thermodynamique", "économie"], stock: 5,
    sku: "PLOMB-CE-001", isActive: true, isFeatured: true, sortOrder: 7,
  },
  {
    id: 9, name: "Robot Nettoyeur Piscine Automatique", nameAr: "روبوت تنظيف حمام سباحة",
    description: "Robot de piscine autonome, nettoyage fond + parois + ligne d'eau. Cycle 2h, filtre ultra-fin, cordon 12m.",
    price: 449, oldPrice: 599, promoPercent: 25,
    category: "Piscines", imageUrl: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=400&q=80",
    images: [], tags: ["robot", "nettoyage", "automatique"], stock: 6,
    sku: "PISC-ROBOT-001", isActive: true, isFeatured: true, sortOrder: 8,
  },
  {
    id: 10, name: "Disjoncteur Différentiel 40A 30mA", nameAr: "قاطع تفاضلي 40A",
    description: "Disjoncteur différentiel Type AC 40A 30mA, pouvoir de coupure 6kA. Protège personnes et installations. Norme EN 61009.",
    price: 32, oldPrice: 45, promoPercent: 29,
    category: "Électricité", imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45249ff78?w=400&q=80",
    images: [], tags: ["disjoncteur", "protection", "sécurité"], stock: 40,
    sku: "ELEC-DISJ-001", isActive: true, isFeatured: false, sortOrder: 9,
  },
  {
    id: 11, name: "Bâche Piscine Hivernage 6x4m", nameAr: "غطاء حمام سباحة للشتاء",
    description: "Bâche d'hivernage en polyéthylène renforcé, 150g/m², résistante UV et gel. Avec tendeurs et œillets inox.",
    price: 65, oldPrice: null, promoPercent: null,
    category: "Piscines", imageUrl: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&q=80",
    images: [], tags: ["piscine", "bâche", "hivernage"], stock: 18,
    sku: "PISC-BACH-001", isActive: true, isFeatured: false, sortOrder: 10,
  },
  {
    id: 12, name: "Prise Étanche IP44 Double", nameAr: "مقبس مقاوم للماء مزدوج",
    description: "Double prise de courant étanche IP44 avec volet, 16A 250V. Idéale extérieur, garage, salle de bain. Coloris blanc.",
    price: 18, oldPrice: 25, promoPercent: 28,
    category: "Électricité", imageUrl: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=400&q=80",
    images: [], tags: ["prise", "étanche", "extérieur"], stock: 60,
    sku: "ELEC-PRISE-001", isActive: true, isFeatured: false, sortOrder: 11,
  },
];

// ─── Cart types ─────────────────────────────────────────────
type CartItem = { product: typeof staticProducts[0]; qty: number };

// ─── Helpers ────────────────────────────────────────────────
const categoryColors: Record<string, string> = {
  "Électricité": "from-amber-500 to-orange-600",
  "Plomberie": "from-sky-500 to-blue-600",
  "Piscines": "from-emerald-500 to-teal-600",
  "default": "from-slate-500 to-slate-600",
};
const categoryBg: Record<string, string> = {
  "Électricité": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Plomberie": "bg-sky-500/10 text-sky-400 border-sky-500/20",
  "Piscines": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "default": "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

export default function Boutique() {
  const { language, dir } = useLanguage();
  const T = translations[language];

  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [addedId, setAddedId] = useState<number | null>(null);

  const { data: apiProducts } = trpc.product.list.useQuery(undefined, { retry: 1 });
  const products = (apiProducts && apiProducts.length > 0 ? apiProducts : staticProducts) as typeof staticProducts;

  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))];
    return cats;
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = activeCategory === "all" || p.category === activeCategory;
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase()) ||
        (p.tags as string[]).some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [products, activeCategory, search]);

  const featured = useMemo(() => products.filter((p) => p.isFeatured).slice(0, 3), [products]);

  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const addToCart = useCallback((product: typeof staticProducts[0]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) return prev.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1 }];
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  }, []);

  const updateQty = (id: number, delta: number) => {
    setCart((prev) => prev.map((i) => i.product.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };
  const removeFromCart = (id: number) => setCart((prev) => prev.filter((i) => i.product.id !== id));
  const clearCart = () => setCart([]);

  function exportExcel() {
    const rows = products.map((p) => ({
      ID: p.id, Nom: p.name, Catégorie: p.category,
      Description: p.description ?? "",
      "Prix (€)": p.price,
      "Ancien Prix (€)": p.oldPrice ?? "",
      "Remise %": p.promoPercent ?? "",
      Stock: p.stock,
      SKU: p.sku ?? "",
      Tags: (p.tags as string[]).join(", "),
      "Mis en avant": p.isFeatured ? "Oui" : "Non",
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    ws["!cols"] = [{ wch: 6 }, { wch: 30 }, { wch: 14 }, { wch: 55 }, { wch: 10 }, { wch: 14 }, { wch: 10 }, { wch: 8 }, { wch: 16 }, { wch: 30 }, { wch: 12 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Produits");
    XLSX.writeFile(wb, `boutique-produits-${new Date().toISOString().split("T")[0]}.xlsx`);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white" dir={dir}>
      <Navbar />

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="w-full max-w-md bg-slate-900 border-l border-white/10 flex flex-col h-full overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-bold">{T.shopCart}</h2>
                {cartCount > 0 && <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{cartCount}</span>}
              </div>
              <button onClick={() => setCartOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-slate-500">
                <ShoppingBag className="w-16 h-16 opacity-30" />
                <p>{T.shopCartEmpty}</p>
                <Button onClick={() => setCartOpen(false)} className="bg-emerald-500 hover:bg-emerald-400 text-white">
                  Continuer mes achats
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {cart.map(({ product: p, qty }) => (
                    <div key={p.id} className="flex gap-3 bg-slate-800/60 border border-white/10 rounded-xl p-3">
                      {p.imageUrl && (
                        <img src={p.imageUrl} alt={p.name} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold leading-tight truncate">{p.name}</p>
                        <p className="text-emerald-400 text-sm font-bold mt-0.5">{(p.price * qty).toFixed(2)} €</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQty(p.id, -1)} className="w-6 h-6 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-semibold w-5 text-center">{qty}</span>
                          <button onClick={() => updateQty(p.id, 1)} className="w-6 h-6 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors">
                            <Plus className="w-3 h-3" />
                          </button>
                          <button onClick={() => removeFromCart(p.id)} className="ml-auto text-slate-500 hover:text-red-400 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-white/10 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">{T.shopCartTotal}</span>
                    <span className="text-2xl font-extrabold text-white">{cartTotal.toFixed(2)} €</span>
                  </div>
                  <Link
                    to={`/devis?commande=${encodeURIComponent(cart.map(i => `${i.product.name} x${i.qty}`).join(", "))}`}
                    onClick={() => setCartOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm hover:from-emerald-400 hover:to-teal-500 transition-all"
                  >
                    {T.shopCheckout}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button onClick={clearCart} className="w-full text-slate-500 hover:text-red-400 text-xs transition-colors flex items-center justify-center gap-1">
                    <Trash2 className="w-3 h-3" /> {T.shopClearCart}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="relative py-12 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/6 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-500/6 rounded-full blur-3xl" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-4">
                  <ShoppingBag className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 text-sm font-medium">{T.shopTitle}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{T.shopTitle}</h1>
                <p className="text-slate-400 max-w-lg">{T.shopSubtitle}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Button onClick={exportExcel} variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 gap-2">
                  <Download className="w-4 h-4" /> {T.shopExportExcel}
                </Button>
                <button
                  onClick={() => setCartOpen(true)}
                  className="relative flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {T.shopCart}
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-rose-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured strip */}
        {featured.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <h2 className="text-sm font-semibold text-amber-400 uppercase tracking-wider">{T.shopFeatured}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {featured.map((p) => {
                const grad = categoryColors[p.category] ?? categoryColors.default;
                return (
                  <div key={p.id} className="group relative bg-slate-900/60 border border-amber-500/20 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative h-40 overflow-hidden">
                      {p.imageUrl ? (
                        <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${grad} flex items-center justify-center`}>
                          <Package className="w-12 h-12 text-white/50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                      <div className="absolute top-2 left-2">
                        <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-400" /> {T.shopFeatured}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-white font-semibold text-sm mb-1 truncate">{p.name}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-extrabold text-white">{p.price} <span className="text-emerald-400 text-sm">€</span></span>
                        <button onClick={() => addToCart(p)} className="bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/20 w-8 h-8 rounded-lg flex items-center justify-center transition-all">
                          {addedId === p.id ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Search + Filters */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={T.shopSearch}
                className="pl-9 bg-slate-900 border-white/10 text-white placeholder:text-slate-600"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setActiveCategory("all")}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeCategory === "all" ? "bg-emerald-500 text-white" : "bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:border-emerald-500/30"}`}
              >
                <Filter className="w-3.5 h-3.5" /> {T.shopAllCategories}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeCategory === cat ? "bg-emerald-500 text-white" : "bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:border-emerald-500/30"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <p className="text-slate-500 text-xs mt-3">{filtered.length} produit{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}</p>
        </section>

        {/* Products Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-500">{T.shopNoProducts}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((p) => {
                const grad = categoryColors[p.category] ?? categoryColors.default;
                const catBg = categoryBg[p.category] ?? categoryBg.default;
                const inCart = cart.find((i) => i.product.id === p.id);
                const isAdded = addedId === p.id;
                return (
                  <div key={p.id} className="group bg-slate-900/60 border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/5 flex flex-col">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden flex-shrink-0">
                      {p.imageUrl ? (
                        <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${grad} flex items-center justify-center`}>
                          <Package className="w-12 h-12 text-white/40" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {p.promoPercent && (
                          <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Tag className="w-3 h-3" /> -{p.promoPercent}%
                          </span>
                        )}
                        {p.isFeatured && (
                          <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-400" /> {T.shopFeatured}
                          </span>
                        )}
                      </div>
                      {/* Stock badge */}
                      <div className="absolute top-2 right-2">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.stock > 0 ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20" : "bg-red-500/15 text-red-400 border border-red-500/20"}`}>
                          {p.stock > 0 ? `${p.stock} ${T.shopInStock}` : T.shopOutOfStock}
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-4 flex flex-col flex-1">
                      <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full border mb-2 w-fit ${catBg}`}>
                        {p.category}
                      </span>
                      <h3 className="text-white font-semibold text-sm leading-tight mb-1 group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {p.name}
                      </h3>
                      {p.sku && <p className="text-slate-600 text-xs mb-2">{T.shopRef} {p.sku}</p>}
                      {p.description && (
                        <p className="text-slate-500 text-xs leading-relaxed mb-3 line-clamp-2">{p.description}</p>
                      )}

                      <div className="mt-auto">
                        {/* Price */}
                        <div className="flex items-end gap-2 mb-3">
                          <span className="text-2xl font-extrabold text-white">{p.price}</span>
                          <span className="text-emerald-400 font-bold text-sm mb-0.5">€</span>
                          {p.oldPrice && (
                            <span className="text-slate-600 line-through text-sm mb-0.5">{p.oldPrice} €</span>
                          )}
                        </div>

                        {/* Tags */}
                        {(p.tags as string[]).length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {(p.tags as string[]).slice(0, 3).map((tag) => (
                              <span key={tag} className="text-xs text-slate-600 bg-slate-800 px-2 py-0.5 rounded-full">#{tag}</span>
                            ))}
                          </div>
                        )}

                        {/* Add to cart */}
                        <button
                          onClick={() => addToCart(p)}
                          disabled={p.stock === 0}
                          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                            p.stock === 0
                              ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                              : isAdded
                              ? "bg-emerald-500 text-white"
                              : inCart
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white"
                              : "bg-slate-800 border border-white/10 text-white hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/30"
                          }`}
                        >
                          {isAdded ? (
                            <><Check className="w-4 h-4" /> Ajouté !</>
                          ) : inCart ? (
                            <><ShoppingCart className="w-4 h-4" /> Dans le panier ({inCart.qty})</>
                          ) : (
                            <><Plus className="w-4 h-4" /> {T.shopAddToCart}</>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* CTA bottom */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="relative rounded-2xl bg-gradient-to-r from-emerald-500/8 to-teal-500/8 border border-emerald-500/15 p-8 text-center overflow-hidden">
            <Zap className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              {language === "fr" ? "Besoin d'un produit spécifique ?" : "تحتاج منتجاً محدداً؟"}
            </h2>
            <p className="text-slate-400 mb-6 max-w-lg mx-auto">
              {language === "fr"
                ? "Contactez-nous pour toute demande de devis, installation ou livraison sur mesure."
                : "تواصل معنا لأي طلب عرض سعر أو تركيب أو توصيل مخصص."}
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              {cartCount > 0 && (
                <button onClick={() => setCartOpen(true)} className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm">
                  <ShoppingCart className="w-4 h-4" /> Voir mon panier ({cartCount})
                </button>
              )}
              <Link to="/devis" className="flex items-center gap-2 bg-slate-800 border border-white/10 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:border-emerald-500/30 hover:text-emerald-400 transition-all">
                Demander un devis <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
