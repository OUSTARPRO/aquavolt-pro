import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Phone,
  MapPin,
  Clock,
  Star,
  Menu,
  X,
  ChevronRight,
  Instagram,
  Facebook,
  Flame,
} from "lucide-react";

// ─── Types & Data ──────────────────────────────────────────────────────────────

type MenuCategory = "pizza" | "pasta" | "desserts" | "boissons";

const NAV_LINKS = [
  { label: "Menu", href: "#menu" },
  { label: "Notre Histoire", href: "#about" },
  { label: "Avis Clients", href: "#testimonials" },
  { label: "Réservation", href: "#reservation" },
  { label: "Contact", href: "#contact" },
];

const CATEGORIES: { id: MenuCategory; label: string; icon: string }[] = [
  { id: "pizza", label: "Pizzas", icon: "🍕" },
  { id: "pasta", label: "Pâtes", icon: "🍝" },
  { id: "desserts", label: "Desserts", icon: "🍮" },
  { id: "boissons", label: "Boissons", icon: "🍷" },
];

interface MenuItem {
  name: string;
  desc: string;
  price: string;
  tag?: string;
  popular?: boolean;
  spicy?: boolean;
  veg?: boolean;
}

const MENU_ITEMS: Record<MenuCategory, MenuItem[]> = {
  pizza: [
    {
      name: "Margherita Royale",
      desc: "Sauce tomate San Marzano, mozzarella di bufala DOP, basilic frais, huile d'olive extra-vierge",
      price: "89 DH",
      popular: true,
      veg: true,
    },
    {
      name: "Quattro Stagioni",
      desc: "Jambon cru, champignons de Paris, artichauts marinés, olives noires de Kalamata, mozzarella",
      price: "115 DH",
    },
    {
      name: "Diavola Fuego",
      desc: "Salami piquant, nduja calabraise, jalapeños frais, mozzarella fumée, sauce piri-piri",
      price: "125 DH",
      spicy: true,
      popular: true,
    },
    {
      name: "Tartufo Nero",
      desc: "Crème de truffe noire, champignons sauvages, mozzarella fior di latte, roquette, copeaux de parmesan",
      price: "149 DH",
      tag: "Premium",
    },
    {
      name: "Prosciutto e Rucola",
      desc: "Jambon de Parme 24 mois affiné, roquette sauvage, copeaux de parmigiano, tomates cerises demi-sec",
      price: "135 DH",
    },
    {
      name: "Vegetale del Giardino",
      desc: "Légumes grillés de saison, pesto de basilic maison, mozzarella, tomates séchées, pignons de pin",
      price: "99 DH",
      veg: true,
    },
  ],
  pasta: [
    {
      name: "Carbonara Classica",
      desc: "Spaghetti artisanaux, guanciale croustillant, jaunes d'œufs frais, pecorino romano, poivre noir concassé",
      price: "95 DH",
      popular: true,
    },
    {
      name: "Penne all'Arrabbiata",
      desc: "Penne rigate, sauce tomate fraîche épicée, ail confit, câpres de Sicile, persil plat ciselé",
      price: "79 DH",
      spicy: true,
    },
    {
      name: "Tagliatelle al Ragù",
      desc: "Tagliatelles fraîches maison, ragù de bœuf braisé 4 heures, parmigiano reggiano 24 mois",
      price: "110 DH",
      popular: true,
    },
    {
      name: "Gnocchi ai Funghi Porcini",
      desc: "Gnocchi maison à la pomme de terre, crème de cèpes, parmesan, truffe d'été, noisettes torréfiées",
      price: "120 DH",
      tag: "Chef",
    },
    {
      name: "Rigatoni Cacio e Pepe",
      desc: "Rigatoni, pecorino romano fondu, poivre noir de Sarawak, beurre clarifié, aucun autre ingrédient",
      price: "85 DH",
      veg: true,
    },
    {
      name: "Linguine alle Vongole",
      desc: "Linguine, palourdes fraîches, vin blanc sec, ail, huile d'olive, persil, piment doux",
      price: "130 DH",
    },
  ],
  desserts: [
    {
      name: "Tiramisù Originale",
      desc: "Mascarpone crémeux, café espresso Napoletano, biscuits savoiardi, cacao amer de Valrhona, rhum ambré",
      price: "55 DH",
      popular: true,
    },
    {
      name: "Panna Cotta à la Vanille",
      desc: "Crème fraîche veloutée, gousse de vanille de Madagascar, coulis de fruits rouges frais",
      price: "45 DH",
      veg: true,
    },
    {
      name: "Cannoli Siciliani",
      desc: "Tubes de pâte croustillante, ricotta sucrée, zestes d'orange confits, pistaches de Bronte, pépites de chocolat",
      price: "49 DH",
    },
    {
      name: "Fondant Nutella & Sel",
      desc: "Pâte sablée maison, cœur coulant de Nutella, noisettes caramélisées, fleur de sel de Guérande",
      price: "42 DH",
    },
  ],
  boissons: [
    {
      name: "Chianti Classico DOCG",
      desc: "Vin rouge toscan d'exception, tanins soyeux, notes de cerise noire, prune et épices douces",
      price: "65 DH / verre",
    },
    {
      name: "Limonata Artigianale",
      desc: "Limonade artisanale, citrons de Sicile pressés à froid, menthe fraîche, eau pétillante de source",
      price: "35 DH",
      veg: true,
    },
    {
      name: "Espresso Napoletano",
      desc: "Café arabica 100% torréfié artisanalement, préparé à la machine La Marzocca traditionnelle",
      price: "25 DH",
    },
    {
      name: "Aperol Spritz",
      desc: "Aperol, Prosecco DOC Valdobbiadene, eau pétillante San Pellegrino, tranche d'orange sicilienne",
      price: "55 DH",
    },
    {
      name: "Acqua Panna",
      desc: "Eau minérale naturelle des Apennins toscans, source protégée depuis le XVIème siècle",
      price: "20 DH",
      veg: true,
    },
    {
      name: "Negroni Sbagliato",
      desc: "Campari, vermouth rouge Martini, Prosecco à la place du gin — l'erreur la plus délicieuse d'Italie",
      price: "60 DH",
    },
  ],
};

const TESTIMONIALS = [
  {
    name: "Karim Benali",
    avatar: "KB",
    color: "from-red-500 to-orange-500",
    rating: 5,
    text: "La meilleure pizza que j'ai mangée au Maroc, sans hésitation. La pâte est croustillante à l'extérieur, moelleuse à l'intérieur. La Diavola Fuego est un chef-d'œuvre de saveurs !",
    date: "Il y a 2 semaines",
    source: "Google",
  },
  {
    name: "Sofia El Mansouri",
    avatar: "SE",
    color: "from-purple-500 to-pink-500",
    rating: 5,
    text: "Ambiance incroyable, service impeccable et des pâtes à tomber par terre. Le Tiramisù est le meilleur que j'ai goûté en dehors de l'Italie. Je recommande vivement !",
    date: "Il y a 1 mois",
    source: "Google",
  },
  {
    name: "Youssef Alami",
    avatar: "YA",
    color: "from-emerald-500 to-teal-500",
    rating: 5,
    text: "Nous avons organisé notre anniversaire de mariage ici. Le chef a préparé un menu personnalisé exceptionnel. L'équipe est aux petits soins. Un endroit vraiment magique !",
    date: "Il y a 3 semaines",
    source: "TripAdvisor",
  },
  {
    name: "Nadia Chraibi",
    avatar: "NC",
    color: "from-blue-500 to-cyan-500",
    rating: 5,
    text: "La Tartufo Nero est divine ! La truffe noire apporte une touche de luxe incroyable. Les ingrédients sont frais et de qualité supérieure. Mon restaurant préféré à Casa !",
    date: "Il y a 5 jours",
    source: "Google",
  },
];

const STATS = [
  { value: "4.9", suffix: "★", label: "Note Moyenne" },
  { value: "500", suffix: "+", label: "Avis 5 Étoiles" },
  { value: "15", suffix: " ans", label: "D'Excellence" },
  { value: "30", suffix: " min", label: "Livraison Express" },
];

// ─── Components ───────────────────────────────────────────────────────────────

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// Navbar
function PizzeriaNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0c0700]/95 backdrop-blur-xl shadow-2xl shadow-black/40 py-3 border-b border-white/5"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center text-xl shadow-lg shadow-red-600/40 group-hover:shadow-red-600/60 transition-shadow">
              🍕
            </div>
            <div>
              <div
                className="text-white font-bold text-xl leading-none tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                La Bella <span className="text-red-500">Napoli</span>
              </div>
              <div className="text-amber-400/60 text-[10px] uppercase tracking-widest">
                Ristorante Italiano
              </div>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-gray-300 hover:text-red-400 transition-colors font-medium tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + mobile */}
          <div className="flex items-center gap-3">
            <Button
              className="hidden md:flex bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg shadow-red-600/30 border-0 font-semibold"
              size="sm"
              onClick={() => scrollTo("reservation")}
            >
              Réserver une Table
            </Button>
            <button
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10">
            <div className="flex flex-col gap-4 pt-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-300 hover:text-red-400 transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button
                className="bg-gradient-to-r from-red-600 to-red-700 text-white w-full mt-2 border-0"
                onClick={() => {
                  setIsOpen(false);
                  scrollTo("reservation");
                }}
              >
                Réserver une Table
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Hero
function PizzeriaHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1920&q=80"
          alt="Pizza napolitaine"
          className="w-full h-full object-cover opacity-35"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Fallback gradient behind image */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/50 via-[#0f0a05] to-amber-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a05] via-[#0f0a05]/60 to-transparent" />
      </div>

      {/* Decorative floating ingredients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {["🍅", "🌿", "🫒", "🧀", "🌶️", "🍷", "🔥"].map((emoji, i) => (
          <div
            key={i}
            className="absolute text-3xl opacity-10 animate-pulse select-none"
            style={{
              left: `${8 + i * 13}%`,
              top: `${15 + (i % 4) * 18}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${4 + i * 0.4}s`,
              transform: `rotate(${i * 25}deg)`,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/8 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-red-600/15 border border-red-600/30 text-red-300 text-sm font-medium mb-10 backdrop-blur-sm">
          <span>⭐⭐⭐⭐⭐</span>
          <span className="w-px h-4 bg-red-600/40" />
          <span>N°1 Pizzeria à Casablanca — 500+ Avis 5 Étoiles</span>
        </div>

        <h1
          className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-6 leading-none tracking-tight"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          La{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">
            Bella
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-400 via-red-400 to-red-600">
            Napoli
          </span>
        </h1>

        <p
          className="text-xl sm:text-2xl text-gray-300/90 mb-4 font-light italic"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          "L'Italie dans chaque bouchée"
        </p>

        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Pizzas napolitaines cuites au four à bois à 450°C, pâtes fraîches
          maison, vins italiens d'exception. Une expérience gastronomique unique
          au cœur de Casablanca depuis{" "}
          <span className="text-amber-400 font-semibold">2009</span>.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-2xl shadow-red-600/50 text-base px-10 py-7 border-0 font-semibold tracking-wide transition-all hover:scale-105 hover:shadow-red-600/60"
            onClick={() => scrollTo("menu")}
          >
            Découvrir le Menu
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 hover:border-red-500/50 text-base px-10 py-7 font-semibold tracking-wide transition-all hover:scale-105"
            onClick={() => scrollTo("reservation")}
          >
            Réserver une Table
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex flex-col items-center gap-2 text-gray-500/60">
          <span className="text-xs uppercase tracking-[0.3em]">Défiler</span>
          <div className="w-px h-10 bg-gradient-to-b from-gray-500/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}

// Stats strip
function PizzeriaStats() {
  return (
    <section className="relative py-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-950/30 via-amber-950/20 to-red-950/30 border-y border-white/5" />
      <div className="relative max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div
                className="text-4xl sm:text-5xl font-bold text-white mb-1"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {stat.value}
                <span className="text-red-500 text-3xl">{stat.suffix}</span>
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-[0.2em]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Menu section
function PizzeriaMenu() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("pizza");

  const items = MENU_ITEMS[activeCategory];

  return (
    <section id="menu" className="py-28 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] mb-4">
            Notre Carte
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-5"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Un Menu d'Exception
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Chaque plat est préparé avec des ingrédients frais importés
            directement d'Italie, selon des recettes transmises de génération en
            génération.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex items-center justify-center gap-2 mb-14 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2.5 px-7 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xl shadow-red-600/40 scale-105"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20"
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Items grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div
              key={item.name}
              className="group relative bg-white/[0.04] backdrop-blur-sm border border-white/8 rounded-2xl p-5 hover:border-red-600/30 hover:bg-white/[0.07] transition-all duration-300 hover:shadow-xl hover:shadow-red-600/10 hover:-translate-y-1 cursor-default"
            >
              {/* Subtle top gradient */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-t-2xl" />

              {/* Tags row */}
              <div className="flex items-center gap-1.5 flex-wrap mb-3 min-h-5">
                {item.popular && (
                  <span className="px-2 py-0.5 rounded-full bg-red-600/20 text-red-400 text-[11px] font-semibold border border-red-600/25">
                    ★ Populaire
                  </span>
                )}
                {item.tag && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-600/20 text-amber-400 text-[11px] font-semibold border border-amber-600/25">
                    👑 {item.tag}
                  </span>
                )}
                {item.spicy && (
                  <span className="px-2 py-0.5 rounded-full bg-orange-700/20 text-orange-400 text-[11px] font-semibold border border-orange-700/25">
                    🌶️ Épicé
                  </span>
                )}
                {item.veg && (
                  <span className="px-2 py-0.5 rounded-full bg-green-700/20 text-green-400 text-[11px] font-semibold border border-green-700/25">
                    🌿 Végé
                  </span>
                )}
              </div>

              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex-1">
                  <h3
                    className="text-white font-bold text-base mb-2 group-hover:text-red-300 transition-colors leading-snug"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <div
                    className="text-xl font-bold text-amber-400"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {item.price}
                  </div>
                </div>
              </div>

              <button className="w-full py-2.5 rounded-xl bg-red-600/10 border border-red-600/20 text-red-400 text-xs font-semibold uppercase tracking-wider hover:bg-red-600/25 hover:border-red-600/50 hover:text-red-300 transition-all duration-200">
                + Commander
              </button>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="text-gray-500 text-sm">
            Tous nos plats sont préparés à la commande •{" "}
            <a
              href="#reservation"
              className="text-red-400 hover:text-red-300 transition-colors underline underline-offset-4"
            >
              Réservez votre table
            </a>{" "}
            pour une expérience complète
          </p>
        </div>
      </div>
    </section>
  );
}

// About / Story
function PizzeriaAbout() {
  const values = [
    { icon: "🔥", title: "Four à Bois", desc: "450°C — cuisson 90 secondes" },
    {
      icon: "🇮🇹",
      title: "Recettes Originales",
      desc: "Transmises de Naples",
    },
    { icon: "🌿", title: "Frais & Naturel", desc: "Légumes cueillis le matin" },
    { icon: "🏆", title: "Récompensé", desc: "5★ depuis 10 ans de suite" },
  ];

  const ingredients = [
    { emoji: "🍅", label: "Tomates\nSan Marzano", angle: 0 },
    { emoji: "🧀", label: "Mozzarella\ndi Bufala DOP", angle: 90 },
    { emoji: "🌿", label: "Basilic\nfrais d'Italie", angle: 180 },
    { emoji: "🔥", label: "Four à bois\n450°C", angle: 270 },
  ];

  return (
    <section
      id="about"
      className="py-28 relative overflow-hidden bg-gradient-to-b from-transparent via-red-950/5 to-transparent"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-600/20 to-transparent" />
      <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-80 h-80 bg-red-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-80 h-80 bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: Visual */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border border-red-800/20 animate-pulse" />
              {/* Middle ring */}
              <div className="absolute inset-6 rounded-full border border-amber-800/20" />
              {/* Center */}
              <div className="absolute inset-12 rounded-full bg-gradient-to-br from-red-900/30 to-amber-900/20 border border-red-800/30 flex items-center justify-center text-7xl">
                🍕
              </div>

              {/* Orbiting ingredients */}
              {ingredients.map((item) => {
                const rad = (item.angle * Math.PI) / 180;
                const x = 50 + 47 * Math.sin(rad);
                const y = 50 - 47 * Math.cos(rad);
                return (
                  <div
                    key={item.angle}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-12 h-12 rounded-full bg-[#1c1005] border border-red-900/40 flex items-center justify-center text-2xl shadow-lg shadow-black/30">
                        {item.emoji}
                      </div>
                      <div className="text-[9px] text-gray-500 text-center whitespace-pre leading-tight">
                        {item.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 sm:-right-8 bg-[#1c1005] border border-red-900/40 rounded-2xl px-4 py-3 shadow-2xl">
              <div
                className="text-3xl font-bold text-red-500"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                15
              </div>
              <div className="text-xs text-gray-400 whitespace-nowrap">
                Ans d'expérience
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 sm:-left-8 bg-[#1c1005] border border-amber-900/40 rounded-2xl px-4 py-3 shadow-2xl">
              <div
                className="text-3xl font-bold text-amber-500"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                100%
              </div>
              <div className="text-xs text-gray-400 whitespace-nowrap">
                Ingrédients frais
              </div>
            </div>
          </div>

          {/* Right: Text */}
          <div>
            <div className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] mb-4">
              Notre Histoire
            </div>
            <h2
              className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              L'Authentique
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">
                Art Napolitain
              </span>
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed mb-5">
              Fondée en 2009 par le chef{" "}
              <strong className="text-white font-semibold">
                Giovanni Ferraro
              </strong>
              , natif de Naples, La Bella Napoli est née d'une passion
              irréductible : apporter la véritable pizza napolitaine au Maroc.
            </p>

            <p className="text-gray-400 leading-relaxed mb-8">
              Notre four à bois, importé directement de Naples, atteint 450°C
              pour cuire chaque pizza en seulement 90 secondes. Nos
              ingrédients — tomates San Marzano DOP, mozzarella di bufala,
              farine tipo 00 — sont sélectionnés avec soin auprès de producteurs
              italiens certifiés.
            </p>

            {/* Values grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/8 hover:border-red-600/20 transition-colors"
                >
                  <span className="text-2xl flex-shrink-0">{v.icon}</span>
                  <div>
                    <div className="text-white text-sm font-semibold">
                      {v.title}
                    </div>
                    <div className="text-gray-500 text-xs mt-0.5">{v.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white border-0 shadow-xl shadow-red-600/30 font-semibold transition-all hover:scale-105"
              size="lg"
              onClick={() => scrollTo("reservation")}
            >
              Réserver une Table
              <ChevronRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Testimonials
function PizzeriaTestimonials() {
  return (
    <section
      id="testimonials"
      className="py-28 bg-gradient-to-b from-transparent via-red-950/8 to-transparent relative"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] mb-4">
            Témoignages
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-5"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Ce Que Disent Nos Clients
          </h2>
          <div className="flex items-center justify-center gap-1.5 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-amber-400 text-amber-400"
              />
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            4.9/5 — Plus de 500 avis vérifiés sur Google & TripAdvisor
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="group bg-white/[0.04] border border-white/8 rounded-2xl p-6 hover:border-red-600/20 hover:bg-white/[0.06] transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-5">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg`}
                >
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white font-semibold">{t.name}</span>
                    <span className="text-[10px] text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-0.5 rounded-full">
                      ✓ Avis Vérifié
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                    <span className="text-gray-500 text-xs ml-1">
                      {t.date}
                    </span>
                    <span className="text-gray-600 text-xs ml-auto">
                      via {t.source}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed italic">
                "{t.text}"
              </p>
            </div>
          ))}
        </div>

        {/* Google rating badge */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-4 px-6 py-4 bg-white/[0.04] border border-white/8 rounded-2xl">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div className="text-sm text-gray-400">
              <span className="text-white font-bold text-lg">4.9</span> / 5 sur{" "}
              <span className="text-blue-400">Google</span> &{" "}
              <span className="text-green-400">TripAdvisor</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Reservation form
function PizzeriaReservation() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    "w-full px-4 py-3.5 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-red-500/60 focus:bg-white/[0.07] transition-all duration-200 text-sm";

  const selectClass =
    "w-full px-4 py-3.5 bg-[#1c1005] border border-white/10 rounded-xl text-white focus:outline-none focus:border-red-500/60 transition-all duration-200 text-sm";

  return (
    <section id="reservation" className="py-28 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-600/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-amber-950/5 to-red-950/5 pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] mb-4">
            Réservation
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Réservez Votre Table
          </h2>
          <p className="text-gray-400">
            Assurez votre place pour une soirée inoubliable. Confirmation
            sous&nbsp;2h par SMS.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-16 bg-white/[0.04] border border-green-600/20 rounded-3xl">
            <div className="text-6xl mb-5">🎉</div>
            <h3
              className="text-2xl font-bold text-white mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Réservation Confirmée !
            </h3>
            <p className="text-gray-400 leading-relaxed px-6">
              Merci{" "}
              <strong className="text-white">{form.name}</strong> ! Votre table
              pour{" "}
              <strong className="text-white">{form.guests} personne(s)</strong>{" "}
              est réservée le{" "}
              <strong className="text-white">{form.date}</strong> à{" "}
              <strong className="text-white">{form.time}</strong>.
            </p>
            <p className="text-gray-500 text-sm mt-3">
              Un SMS de confirmation sera envoyé au{" "}
              <span className="text-gray-300">{form.phone}</span>
            </p>
            <Button
              className="mt-6 bg-gradient-to-r from-red-600 to-red-700 text-white border-0 shadow-lg shadow-red-600/30"
              onClick={() => setSubmitted(false)}
            >
              Nouvelle Réservation
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white/[0.04] backdrop-blur-sm border border-white/8 rounded-3xl p-8 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Prénom & Nom *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Mohammed Alami"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+212 6XX XX XX XX"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className={`${inputClass} [color-scheme:dark]`}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Heure *
                </label>
                <select
                  required
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className={selectClass}
                >
                  <option value="">Choisir</option>
                  {[
                    "12:00",
                    "12:30",
                    "13:00",
                    "13:30",
                    "14:00",
                    "19:00",
                    "19:30",
                    "20:00",
                    "20:30",
                    "21:00",
                    "21:30",
                    "22:00",
                  ].map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Personnes *
                </label>
                <select
                  value={form.guests}
                  onChange={(e) =>
                    setForm({ ...form, guests: e.target.value })
                  }
                  className={selectClass}
                >
                  {["1", "2", "3", "4", "5", "6", "7", "8", "10", "15+"].map(
                    (n) => (
                      <option key={n} value={n}>
                        {n} personne{parseInt(n) > 1 ? "s" : ""}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Message (optionnel)
              </label>
              <textarea
                rows={3}
                placeholder="Occasion spéciale, allergies, demandes particulières..."
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                className={`${inputClass} resize-none`}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-2xl shadow-red-600/30 border-0 text-base py-7 font-bold tracking-wide transition-all hover:shadow-red-600/50"
            >
              Confirmer ma Réservation
            </Button>

            <p className="text-center text-xs text-gray-600">
              Ou appelez-nous :{" "}
              <a
                href="tel:+212522000000"
                className="text-red-400 hover:text-red-300 transition-colors font-medium"
              >
                +212 5 22 XX XX XX
              </a>
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

// Contact & Location
function PizzeriaContact() {
  const contactItems = [
    {
      icon: MapPin,
      title: "Adresse",
      lines: ["Boulevard Mohammed V", "Casablanca 20000, Maroc"],
      color: "text-red-400",
      bgColor: "bg-red-600/10 border-red-600/20",
    },
    {
      icon: Phone,
      title: "Téléphone",
      lines: ["+212 5 22 XX XX XX", "WhatsApp disponible 24h/7j"],
      color: "text-amber-400",
      bgColor: "bg-amber-600/10 border-amber-600/20",
    },
    {
      icon: Clock,
      title: "Horaires",
      lines: ["Lun–Ven : 12h–15h & 19h–23h", "Sam–Dim : 12h–23h30"],
      color: "text-green-400",
      bgColor: "bg-green-600/10 border-green-600/20",
    },
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] mb-4">
            Nous Trouver
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Venez Nous Rendre Visite
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {contactItems.map((item) => (
            <div
              key={item.title}
              className={`flex items-start gap-4 p-6 rounded-2xl border ${item.bgColor} hover:scale-[1.02] transition-transform`}
            >
              <div
                className={`w-11 h-11 rounded-xl ${item.bgColor} flex items-center justify-center shrink-0`}
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div>
                <div className="text-white font-semibold mb-2">
                  {item.title}
                </div>
                {item.lines.map((line) => (
                  <div key={line} className="text-gray-400 text-sm leading-relaxed">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Map placeholder (real embed would go here) */}
        <div className="rounded-2xl overflow-hidden border border-white/8 h-56 bg-gradient-to-br from-[#1c1005] to-[#120a04] flex flex-col items-center justify-center gap-3">
          <div className="text-5xl">📍</div>
          <div>
            <p className="text-gray-400 text-sm text-center">
              Carte Google Maps intégrée ici
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-red-400 hover:text-red-300 text-sm underline underline-offset-4 mt-1 transition-colors"
            >
              Ouvrir dans Google Maps →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function PizzeriaFooter() {
  return (
    <footer className="bg-[#080501] border-t border-white/5 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center text-xl shadow-lg shadow-red-600/30">
                🍕
              </div>
              <div>
                <div
                  className="text-white font-bold text-xl"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  La Bella <span className="text-red-500">Napoli</span>
                </div>
                <div className="text-amber-400/60 text-[10px] uppercase tracking-widest">
                  Ristorante Italiano
                </div>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              L'authenticité napolitaine au cœur de Casablanca depuis 2009.
              Pizzas au four à bois, pâtes fraîches maison et vins italiens
              d'exception.
            </p>
          </div>

          {/* Nav */}
          <div>
            <div className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Navigation
            </div>
            <div className="space-y-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-gray-500 hover:text-red-400 text-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <div className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Suivez-nous
            </div>
            <div className="flex gap-3 mb-5">
              {[
                {
                  Icon: Instagram,
                  label: "Instagram",
                  hover: "hover:text-pink-400 hover:border-pink-400/40",
                },
                {
                  Icon: Facebook,
                  label: "Facebook",
                  hover: "hover:text-blue-400 hover:border-blue-400/40",
                },
              ].map(({ Icon, label, hover }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className={`w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 ${hover} transition-all hover:bg-white/10`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="text-gray-500 text-sm">@labellanapolimaroc</p>
            <div className="mt-4 flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                />
              ))}
              <span className="text-gray-500 text-xs ml-1">
                4.9/5 — 500+ avis
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">
            © 2024 La Bella Napoli. Tous droits réservés.
          </p>
          <p className="text-gray-700 text-xs flex items-center gap-1.5">
            <Flame className="w-3 h-3 text-red-800" />
            Site conçu par votre agence web
          </p>
        </div>
      </div>
    </footer>
  );
}

// WhatsApp floating button
function WhatsAppBtn() {
  return (
    <a
      href="https://wa.me/212522000000"
      target="_blank"
      rel="noopener noreferrer"
      title="Discuter sur WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] rounded-full flex items-center justify-center shadow-2xl shadow-green-600/50 transition-all hover:scale-110 hover:shadow-green-600/70"
    >
      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function PizzeriaDemo() {
  // Inject Playfair Display font for this demo page
  useEffect(() => {
    const id = "pizzeria-font";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.getElementById(id)?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0a05] text-white antialiased">
      <PizzeriaNavbar />
      <main>
        <PizzeriaHero />
        <PizzeriaStats />
        <PizzeriaMenu />
        <PizzeriaAbout />
        <PizzeriaTestimonials />
        <PizzeriaReservation />
        <PizzeriaContact />
      </main>
      <PizzeriaFooter />
      <WhatsAppBtn />
    </div>
  );
}
