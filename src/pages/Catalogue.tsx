import { useState, useMemo } from "react";
import * as XLSX from "xlsx";
import {
  Check,
  Star,
  Sparkles,
  Tag,
  Download,
  Globe,
  ShoppingCart,
  Briefcase,
  BookOpen,
  Building2,
  Wand2,
  ArrowRight,
  Loader2,
  Filter,
} from "lucide-react";
import { Link } from "react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
import { trpc } from "@/providers/trpc";
import { Button } from "@/components/ui/button";

type Category =
  | "all"
  | "vitrine"
  | "ecommerce"
  | "portfolio"
  | "blog"
  | "corporate"
  | "custom";

const categoryIcons: Record<string, React.ElementType> = {
  vitrine: Globe,
  ecommerce: ShoppingCart,
  portfolio: Briefcase,
  blog: BookOpen,
  corporate: Building2,
  custom: Wand2,
};

const badgeStyles: Record<string, string> = {
  emerald: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  amber: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  violet: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  rose: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  sky: "bg-sky-500/20 text-sky-400 border-sky-500/30",
  orange: "bg-orange-500/20 text-orange-400 border-orange-500/30",
};

const categoryGradients: Record<string, string> = {
  vitrine: "from-emerald-500 to-teal-600",
  ecommerce: "from-violet-500 to-purple-600",
  portfolio: "from-amber-500 to-orange-600",
  blog: "from-sky-500 to-blue-600",
  corporate: "from-rose-500 to-pink-600",
  custom: "from-slate-500 to-slate-600",
};

const staticPackages = [
  {
    id: 1,
    name: "Starter Vitrine",
    description: "Idéal pour les artisans, commerçants et petites entreprises souhaitant une présence professionnelle en ligne.",
    category: "vitrine" as const,
    price: 1500,
    oldPrice: null,
    options: [
      "1 page Landing Page",
      "Design responsive mobile/tablette",
      "Formulaire de contact",
      "Hébergement 1 an inclus",
      "Nom de domaine .ma",
      "SSL gratuit (HTTPS)",
      "Livraison en 7 jours",
    ],
    badge: null,
    badgeColor: "emerald",
    promoPercent: null,
    isActive: true,
    sortOrder: 0,
  },
  {
    id: 2,
    name: "Business Pro",
    description: "La solution complète pour PME et entrepreneurs avec référencement et analytics intégrés.",
    category: "vitrine" as const,
    price: 3500,
    oldPrice: 4500,
    options: [
      "Jusqu'à 10 pages",
      "Design responsive premium",
      "SEO on-page optimisé",
      "Hébergement 1 an inclus",
      "Nom de domaine + SSL",
      "Google Analytics",
      "Blog intégré",
      "WhatsApp flottant",
      "Livraison en 14 jours",
    ],
    badge: "Populaire",
    badgeColor: "emerald",
    promoPercent: 22,
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 3,
    name: "E-Commerce Standard",
    description: "Lancez votre boutique en ligne avec paiement sécurisé, gestion des stocks et tableau de bord.",
    category: "ecommerce" as const,
    price: 6500,
    oldPrice: null,
    options: [
      "Jusqu'à 100 produits",
      "Paiement en ligne (CMI / PayPal)",
      "Gestion des stocks",
      "Tableau de bord admin",
      "Paniers abandonnés",
      "SEO e-commerce",
      "Hébergement 1 an",
      "SSL & sécurité avancée",
    ],
    badge: null,
    badgeColor: "violet",
    promoPercent: null,
    isActive: true,
    sortOrder: 2,
  },
  {
    id: 4,
    name: "E-Commerce Premium",
    description: "Solution e-commerce entreprise avec produits illimités, multi-devises et application mobile.",
    category: "ecommerce" as const,
    price: 12000,
    oldPrice: 15000,
    options: [
      "Produits illimités",
      "Multi-devises (MAD, EUR, USD)",
      "Application mobile PWA",
      "CRM clients intégré",
      "Analytics avancés",
      "Programme de fidélité",
      "API intégrations tierces",
      "Support prioritaire 24/7",
      "Hébergement cloud 2 ans",
    ],
    badge: "Best Seller",
    badgeColor: "amber",
    promoPercent: 20,
    isActive: true,
    sortOrder: 3,
  },
  {
    id: 5,
    name: "Portfolio Créatif",
    description: "Mettez en valeur vos créations avec animations fluides, galerie interactive et formulaire de contact.",
    category: "portfolio" as const,
    price: 2200,
    oldPrice: null,
    options: [
      "Galerie projets illimitée",
      "Animations CSS & GSAP",
      "Formulaire de contact",
      "Blog intégré",
      "SEO optimisé",
      "Hébergement 1 an",
      "Nom de domaine",
    ],
    badge: "Nouveau",
    badgeColor: "sky",
    promoPercent: null,
    isActive: true,
    sortOrder: 4,
  },
  {
    id: 6,
    name: "Blog Magazine",
    description: "Publiez du contenu, gérez des catégories et fidélisez votre audience avec newsletter et réseaux sociaux.",
    category: "blog" as const,
    price: 2800,
    oldPrice: 3500,
    options: [
      "Articles illimités",
      "Catégories & tags",
      "Newsletter intégrée",
      "Partage réseaux sociaux",
      "Commentaires modérés",
      "Google Analytics",
      "SEO avancé",
    ],
    badge: "Promo",
    badgeColor: "rose",
    promoPercent: 20,
    isActive: true,
    sortOrder: 5,
  },
  {
    id: 7,
    name: "Corporate Entreprise",
    description: "Site institutionnel multilingue avec espace client, intranet et intégrations ERP/CRM professionnels.",
    category: "corporate" as const,
    price: 15000,
    oldPrice: null,
    options: [
      "Site multilingue (FR/AR/EN)",
      "Intranet employés",
      "Espace client sécurisé",
      "Tableau de bord RH",
      "Intégrations ERP/CRM",
      "API REST documentée",
      "Hébergement cloud dédié",
      "Support & maintenance 1 an",
      "Formation équipe incluse",
    ],
    badge: null,
    badgeColor: "emerald",
    promoPercent: null,
    isActive: true,
    sortOrder: 6,
  },
  {
    id: 8,
    name: "Sur Mesure",
    description: "Développement 100% personnalisé selon vos besoins spécifiques : application web, API, architecture scalable.",
    category: "custom" as const,
    price: 0,
    oldPrice: null,
    options: [
      "Analyse & cahier des charges",
      "Architecture sur mesure",
      "Développement full-stack",
      "Tests & QA inclus",
      "Déploiement & CI/CD",
      "Documentation technique",
      "Maintenance & évolutions",
    ],
    badge: null,
    badgeColor: "emerald",
    promoPercent: null,
    isActive: true,
    sortOrder: 7,
  },
];

export default function Catalogue() {
  const { language, dir } = useLanguage();
  const T = translations[language];
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const { data: apiPackages, isLoading } = trpc.catalog.list.useQuery(undefined, {
    retry: 1,
  });

  const packages = (apiPackages && apiPackages.length > 0 ? apiPackages : staticPackages) as typeof staticPackages;

  const categories: { key: Category; label: string }[] = [
    { key: "all", label: T.catalogueAllCategories },
    { key: "vitrine", label: T.catalogueVitrine },
    { key: "ecommerce", label: T.catalogueEcommerce },
    { key: "portfolio", label: T.cataloguePortfolio },
    { key: "blog", label: T.catalogueBlog },
    { key: "corporate", label: T.catalogueCorporate },
    { key: "custom", label: T.catalogueCustom },
  ];

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? packages
        : packages.filter((p) => p.category === activeCategory),
    [packages, activeCategory]
  );

  function exportToExcel() {
    const rows = packages.map((p) => ({
      Forfait: p.name,
      Catégorie: p.category,
      Description: p.description,
      "Prix (MAD)": p.price === 0 ? "Sur devis" : p.price,
      "Ancien Prix (MAD)": p.oldPrice ?? "",
      "Remise %": p.promoPercent ?? "",
      Badge: p.badge ?? "",
      Options: (p.options as string[]).join(" | "),
    }));

    const ws = XLSX.utils.json_to_sheet(rows);
    ws["!cols"] = [
      { wch: 22 },
      { wch: 14 },
      { wch: 50 },
      { wch: 12 },
      { wch: 14 },
      { wch: 10 },
      { wch: 14 },
      { wch: 80 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Catalogue");
    XLSX.writeFile(wb, `catalogue-sites-web-${new Date().toISOString().split("T")[0]}.xlsx`);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white" dir={dir}>
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-500/8 rounded-full blur-3xl" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-medium">{T.catalogueTitle}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              {T.catalogueTitle}
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
              {T.catalogueSubtitle}
            </p>
            <Button
              onClick={exportToExcel}
              variant="outline"
              className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 gap-2"
            >
              <Download className="w-4 h-4" />
              {T.catalogueExportExcel}
            </Button>
          </div>
        </section>

        {/* Category Filter */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <Filter className="w-4 h-4 text-slate-500 shrink-0" />
            {categories.map((cat) => {
              const Icon = categoryIcons[cat.key] ?? Star;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.key
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                      : "bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:border-emerald-500/30"
                  }`}
                >
                  {cat.key !== "all" && <Icon className="w-3.5 h-3.5" />}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Packages Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-500">{T.catalogueNoPackages}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((pkg) => {
                const Icon = categoryIcons[pkg.category] ?? Globe;
                const gradient = categoryGradients[pkg.category] ?? "from-slate-500 to-slate-600";
                const badgeStyle = badgeStyles[pkg.badgeColor ?? "emerald"] ?? badgeStyles.emerald;
                const isCustom = pkg.category === "custom" || pkg.price === 0;
                const hasPromo = !!pkg.promoPercent && pkg.promoPercent > 0;

                return (
                  <div
                    key={pkg.id}
                    className={`group relative flex flex-col bg-slate-900/60 border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                      pkg.badge === "Populaire" || pkg.badge === "Best Seller"
                        ? "border-emerald-500/40 shadow-lg shadow-emerald-500/10"
                        : "border-white/10 hover:border-emerald-500/20"
                    }`}
                  >
                    {/* Top gradient bar */}
                    <div className={`h-1 bg-gradient-to-r ${gradient}`} />

                    {/* Badge */}
                    {pkg.badge && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeStyle}`}>
                          {pkg.badge === "Populaire" || pkg.badge === "Best Seller" ? (
                            <Star className="w-3 h-3" />
                          ) : pkg.badge === "Promo" ? (
                            <Tag className="w-3 h-3" />
                          ) : (
                            <Sparkles className="w-3 h-3" />
                          )}
                          {pkg.badge}
                        </span>
                      </div>
                    )}

                    <div className="p-6 flex flex-col flex-1">
                      {/* Icon + Category */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                            {categories.find((c) => c.key === pkg.category)?.label}
                          </p>
                          <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                            {pkg.name}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-slate-400 text-sm leading-relaxed mb-5">
                        {pkg.description}
                      </p>

                      {/* Price block */}
                      <div className="mb-5">
                        {isCustom ? (
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-white">{T.cataloguePriceOnRequest}</span>
                          </div>
                        ) : (
                          <div className="flex items-end gap-3 flex-wrap">
                            <div className="flex items-baseline gap-1">
                              <span className="text-3xl font-extrabold text-white">
                                {pkg.price.toLocaleString("fr-FR")}
                              </span>
                              <span className="text-emerald-400 font-semibold text-sm">MAD</span>
                            </div>
                            {pkg.oldPrice && (
                              <span className="text-slate-500 line-through text-sm">
                                {pkg.oldPrice.toLocaleString("fr-FR")} MAD
                              </span>
                            )}
                            {hasPromo && (
                              <span className="inline-flex items-center gap-1 bg-rose-500/15 text-rose-400 border border-rose-500/20 rounded-full px-2 py-0.5 text-xs font-bold">
                                -{pkg.promoPercent}% {T.catalogueDiscount}
                              </span>
                            )}
                          </div>
                        )}
                        <p className="text-xs text-slate-600 mt-1">{T.catalogueOneTime}</p>
                      </div>

                      {/* Options */}
                      <div className="flex-1 mb-6">
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-3">
                          {T.catalogueIncluded}
                        </p>
                        <ul className="space-y-2">
                          {(pkg.options as string[]).map((opt, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                              <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                              {opt}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA */}
                      <Link
                        to={`/devis?forfait=${encodeURIComponent(pkg.name)}`}
                        className={`group/btn flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                          pkg.badge === "Populaire" || pkg.badge === "Best Seller"
                            ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-400 hover:to-teal-500 shadow-lg shadow-emerald-500/25"
                            : "bg-slate-800 text-white border border-white/10 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400"
                        }`}
                      >
                        {isCustom ? T.catalogueContactUs : T.catalogueGetQuote}
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Bottom CTA banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="relative rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 p-8 text-center overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            </div>
            <Wand2 className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              {language === "fr" ? "Besoin d'une solution sur mesure ?" : "تحتاج حلاً مخصصاً؟"}
            </h2>
            <p className="text-slate-400 mb-6 max-w-lg mx-auto">
              {language === "fr"
                ? "Notre équipe conçoit et développe des applications web uniques adaptées à vos processus métier."
                : "يصمم فريقنا ويطور تطبيقات ويب فريدة مصممة لعمليات عملك."}
            </p>
            <Button
              onClick={exportToExcel}
              variant="outline"
              className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 mr-3 gap-2"
            >
              <Download className="w-4 h-4" />
              {T.catalogueExportExcel}
            </Button>
            <Link to="/devis">
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-400 hover:to-teal-500">
                {language === "fr" ? "Démarrer un projet" : "بدء مشروع"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
