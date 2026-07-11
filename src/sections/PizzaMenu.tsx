import { useState } from "react";
import { Plus, Flame, Info } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

type Category = "pizze" | "fritti" | "insalate" | "dolci" | "bar";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
  badge?: "hot" | "new" | "bestseller" | "vegan" | "mare";
  tags?: string[];
}

const CATEGORIES: { id: Category; label: string; emoji: string }[] = [
  { id: "pizze", label: "Pizze", emoji: "🍕" },
  { id: "fritti", label: "Antipasti & Fritti", emoji: "🍤" },
  { id: "insalate", label: "Insalate", emoji: "🥗" },
  { id: "dolci", label: "Dolci", emoji: "🍮" },
  { id: "bar", label: "Bar & Cocktail", emoji: "🍹" },
];

const BADGE_STYLES: Record<string, string> = {
  hot: "bg-red-600 text-white",
  new: "bg-blue-600 text-white",
  bestseller: "bg-yellow-500 text-black",
  vegan: "bg-green-600 text-white",
  mare: "bg-cyan-600 text-white",
};
const BADGE_LABELS: Record<string, string> = {
  hot: "🔥 Popolare",
  new: "✨ Novità",
  bestseller: "⭐ Best seller",
  vegan: "🌿 Vegetariana",
  mare: "🌊 Mare",
};

const MENU: Record<Category, MenuItem[]> = {
  pizze: [
    {
      id: "margherita",
      name: "Margherita",
      description: "Pomodoro San Marzano, fior di latte, basilico fresco, olio EVO",
      price: 8.0,
      emoji: "🍕",
      badge: "bestseller",
      tags: ["Classica"],
    },
    {
      id: "marinara",
      name: "Marinara",
      description: "Pomodoro, aglio, origano, olio EVO – la più antica tradizione napoletana",
      price: 7.0,
      emoji: "🍕",
      badge: "vegan",
      tags: ["Vegana"],
    },
    {
      id: "prosciutto",
      name: "Prosciutto & Rucola",
      description: "Fior di latte, prosciutto crudo, rucola fresca, scaglie di parmigiano",
      price: 11.0,
      emoji: "🍕",
      badge: "hot",
    },
    {
      id: "frutti_mare",
      name: "Frutti di Mare",
      description: "Cozze, vongole, gamberi, calamari, pomodorini, aglio, prezzemolo – senza formaggio",
      price: 14.0,
      emoji: "🍕",
      badge: "mare",
      tags: ["Specialità"],
    },
    {
      id: "gamberi",
      name: "Gamberetti & Zucchine",
      description: "Fior di latte, gamberetti freschi, zucchine grigliate, scorza di limone",
      price: 13.0,
      emoji: "🍕",
      badge: "new",
      tags: ["Mare"],
    },
    {
      id: "siciliana",
      name: "Siciliana",
      description: "Pomodoro, melanzane fritte, ricotta salata, basilico – autentica ricetta siciliana",
      price: 10.5,
      emoji: "🍕",
      badge: "hot",
      tags: ["Specialità"],
    },
    {
      id: "salsiccia",
      name: "Salsiccia & Friarielli",
      description: "Fior di latte, salsiccia di maiale, friarielli ripassati all'aglio",
      price: 11.5,
      emoji: "🍕",
    },
    {
      id: "diavola",
      name: "Diavola",
      description: "Pomodoro, fior di latte, salame piccante calabrese, peperoncino",
      price: 10.0,
      emoji: "🍕",
      badge: "hot",
      tags: ["Piccante 🌶️"],
    },
    {
      id: "tonno",
      name: "Tonno & Cipolla",
      description: "Pomodoro, tonno del Mediterraneo, cipolla rossa, capperi di Salina",
      price: 10.5,
      emoji: "🍕",
      badge: "mare",
      tags: ["Mare", "Isole Eolie"],
    },
    {
      id: "calzone",
      name: "Calzone Classico",
      description: "Ripieno di ricotta, prosciutto cotto, fior di latte, pomodoro",
      price: 10.0,
      emoji: "🫓",
    },
  ],
  fritti: [
    {
      id: "arancini",
      name: "Arancini Siciliani (2 pz)",
      description: "Riso allo zafferano, ragù di carne, piselli e mozzarella, fritti croccanti",
      price: 6.0,
      emoji: "🍊",
      badge: "bestseller",
    },
    {
      id: "bruschetta",
      name: "Bruschetta al Pomodoro",
      description: "Pane tostato, pomodori freschi, basilico, olio EVO, aglio",
      price: 5.0,
      emoji: "🥖",
      badge: "vegan",
    },
    {
      id: "calamari_fritti",
      name: "Calamari Fritti",
      description: "Anelli di calamaro freschissimo, infarinati e fritti, con limone e maionese",
      price: 9.5,
      emoji: "🦑",
      badge: "mare",
    },
    {
      id: "antipasto_mare",
      name: "Antipasto di Mare",
      description: "Polpo al cartoccio, gamberi scottati, cozze gratinate, insalata di mare",
      price: 14.0,
      emoji: "🍤",
      badge: "mare",
      tags: ["Specialità"],
    },
    {
      id: "mozzarella_frita",
      name: "Mozzarella in Carrozza",
      description: "Mozzarella impanata e fritta, cuore filante, salsa al pomodoro",
      price: 7.0,
      emoji: "🧀",
    },
  ],
  insalate: [
    {
      id: "insalata_mare",
      name: "Insalata di Mare",
      description: "Polpo, gamberi, calamari, sedano, olive, limone, prezzemolo",
      price: 13.0,
      emoji: "🥗",
      badge: "mare",
    },
    {
      id: "insalata_caprese",
      name: "Caprese",
      description: "Pomodoro cuore di bue, mozzarella di bufala, basilico, olio EVO",
      price: 9.0,
      emoji: "🍅",
      badge: "vegan",
    },
    {
      id: "insalata_greca",
      name: "Insalata Greca",
      description: "Cetrioli, pomodori, olive nere, feta, cipolla rossa, origano",
      price: 8.5,
      emoji: "🥗",
    },
  ],
  dolci: [
    {
      id: "cannolo",
      name: "Cannolo Siciliano",
      description: "Cialda croccante fritta, ricotta di pecora con canditi e gocce di cioccolato",
      price: 5.5,
      emoji: "🥐",
      badge: "bestseller",
    },
    {
      id: "granita",
      name: "Granita di Limone",
      description: "Limoni di Sicilia, granulosa e rinfrescante, con brioche o da sola",
      price: 4.5,
      emoji: "🍋",
      badge: "hot",
    },
    {
      id: "tiramisu",
      name: "Tiramisù della Casa",
      description: "Mascarpone, caffè espresso, savoiardi, cacao amaro – ricetta della nonna",
      price: 6.0,
      emoji: "☕",
    },
    {
      id: "gelato",
      name: "Gelato Artigianale (3 gusti)",
      description: "Pistacchio di Bronte, mandorla siciliana, stracciatella – da pasticceria locale",
      price: 5.5,
      emoji: "🍨",
    },
  ],
  bar: [
    {
      id: "spritz",
      name: "Spritz Aperol",
      description: "Aperol, Prosecco DOC, acqua gassata, arancia e ghiaccio",
      price: 6.0,
      emoji: "🍹",
      badge: "hot",
    },
    {
      id: "negroni",
      name: "Negroni",
      description: "Gin, Campari, Vermouth rosso – classico immancabile",
      price: 7.0,
      emoji: "🥃",
    },
    {
      id: "hugo",
      name: "Hugo",
      description: "Prosecco, sambuco, menta fresca, acqua frizzante – rinfrescante",
      price: 6.5,
      emoji: "🍹",
      badge: "new",
    },
    {
      id: "birra",
      name: "Birra Artigianale Siciliana",
      description: "Birra locale prodotta sull'isola, chiara o ambrata – 33cl",
      price: 5.0,
      emoji: "🍺",
      badge: "new",
    },
    {
      id: "vino",
      name: "Malvasia delle Lipari (bicchiere)",
      description: "Vino DOC delle Isole Eolie, profumato e dolce – eccellenza locale",
      price: 6.0,
      emoji: "🍷",
      badge: "bestseller",
      tags: ["Eolie DOC"],
    },
    {
      id: "caffe",
      name: "Caffè Espresso",
      description: "Miscela artigianale torrefatta, cremoso e intenso",
      price: 1.5,
      emoji: "☕",
    },
    {
      id: "acqua",
      name: "Acqua Minerale",
      description: "Naturale o frizzante – 50cl",
      price: 2.0,
      emoji: "💧",
    },
    {
      id: "limonata",
      name: "Limonata Siciliana",
      description: "Limoni freschi di Sicilia, acqua, zucchero di canna – fatta in casa",
      price: 4.0,
      emoji: "🍋",
      badge: "hot",
    },
  ],
};

function MenuCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ id: item.id, name: item.name, price: item.price, emoji: item.emoji });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-orange-500/40 hover:bg-white/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-950/30 flex flex-col gap-3">
      {item.badge && (
        <span className={`absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full ${BADGE_STYLES[item.badge]}`}>
          {BADGE_LABELS[item.badge]}
        </span>
      )}

      <div className="flex items-start gap-3">
        <span className="text-4xl group-hover:scale-110 transition-transform duration-300 select-none">
          {item.emoji}
        </span>
        <div className="flex-1 min-w-0 pt-1">
          <h3 className="font-playfair text-white font-bold text-lg leading-tight group-hover:text-orange-300 transition-colors">
            {item.name}
          </h3>
          {item.tags && (
            <div className="flex flex-wrap gap-1 mt-1">
              {item.tags.map((tag) => (
                <span key={tag} className="text-xs text-white/40 border border-white/15 px-1.5 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <p className="text-white/50 text-sm leading-relaxed flex-1">{item.description}</p>

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/10">
        <p className="text-2xl font-black text-orange-400">
          {item.price.toFixed(2)}<span className="text-base font-medium">€</span>
        </p>
        <button
          onClick={handleAdd}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
            added
              ? "bg-green-600 text-white scale-95"
              : "bg-fire text-white hover:opacity-90 hover:scale-105 active:scale-95 glow-fire-sm"
          }`}
        >
          {added ? <>✓ Aggiunto</> : <><Plus className="w-4 h-4" /> Aggiungi</>}
        </button>
      </div>
    </div>
  );
}

export default function PizzaMenu() {
  const [activeCategory, setActiveCategory] = useState<Category>("pizze");
  const [search, setSearch] = useState("");

  const filtered = MENU[activeCategory].filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="menu" className="py-20 bg-[#0d0300] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-600/40 to-transparent" />
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-5"
        style={{ background: "radial-gradient(circle, #e63000, transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-950/50 border border-red-700/40 text-orange-400 text-sm font-medium mb-4">
            <Flame className="w-4 h-4" />
            La Nostra Carta
          </div>
          <h2 className="font-playfair text-4xl sm:text-5xl font-black text-white mb-4">
            Sapori <span className="text-fire italic">Autentici</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Ingredienti freschi ogni giorno, pizze cotte nel forno a legna tradizionale
            e i frutti del mare delle Isole Eolie.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Cerca nel menu... 🔍"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-2xl px-5 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/60 transition-all text-sm"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-lg">×</button>
            )}
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setSearch(""); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-fire text-white glow-fire-sm scale-105"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              <span>{cat.emoji}</span>
              {cat.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeCategory === cat.id ? "bg-white/20" : "bg-white/10"}`}>
                {MENU[cat.id].length}
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="text-6xl">🔍</span>
            <p className="text-white/50 mt-4 text-lg">Nessun risultato per "{search}"</p>
            <button onClick={() => setSearch("")} className="mt-4 text-orange-400 hover:text-orange-300 underline text-sm">
              Cancella la ricerca
            </button>
          </div>
        )}

        <div className="mt-12 flex items-center justify-center gap-2 text-white/30 text-sm">
          <Info className="w-4 h-4" />
          <p>Allergeni disponibili su richiesta · Tutti i prezzi sono IVA inclusa · Coperto non incluso</p>
        </div>
      </div>
    </section>
  );
}
