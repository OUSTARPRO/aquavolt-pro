import { useState } from "react";
import { Plus, Flame, Star, Info } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

type Category = "pizzas" | "pasta" | "entrees" | "desserts" | "boissons";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
  badge?: "hot" | "new" | "bestseller" | "vegan";
  tags?: string[];
  sizes?: { label: string; extra: number }[];
}

const CATEGORIES: { id: Category; label: string; emoji: string }[] = [
  { id: "pizzas", label: "Pizzas", emoji: "🍕" },
  { id: "pasta", label: "Pastas", emoji: "🍝" },
  { id: "entrees", label: "Entrées", emoji: "🥗" },
  { id: "desserts", label: "Desserts", emoji: "🍮" },
  { id: "boissons", label: "Boissons", emoji: "🥤" },
];

const BADGE_STYLES: Record<string, string> = {
  hot: "bg-red-600 text-white",
  new: "bg-blue-600 text-white",
  bestseller: "bg-yellow-500 text-black",
  vegan: "bg-green-600 text-white",
};
const BADGE_LABELS: Record<string, string> = {
  hot: "🔥 Populaire",
  new: "✨ Nouveau",
  bestseller: "⭐ Best-seller",
  vegan: "🌿 Vegan",
};

const MENU: Record<Category, MenuItem[]> = {
  pizzas: [
    { id: "margherita", name: "Margherita Classica", description: "Tomate, mozzarella fior di latte, basilic frais, huile d'olive extra vierge", price: 12.9, emoji: "🍕", badge: "bestseller", tags: ["Végétarien"] },
    { id: "pepperoni", name: "Diavola Piccante", description: "Tomate, mozzarella, pepperoni, poivrons rouges, piment fort", price: 14.9, emoji: "🍕", badge: "hot", tags: ["Épicée"] },
    { id: "quattro", name: "Quattro Formaggi", description: "Mozzarella, gorgonzola, parmesan, pecorino romano, miel de truffe", price: 16.9, emoji: "🍕", badge: "new", tags: ["Végétarien"] },
    { id: "truffe", name: "Tartufo & Funghi", description: "Crème de truffe, champignons sauvages, mozzarella di bufala, roquette, parmesan", price: 18.9, emoji: "🍕", tags: ["Premium"] },
    { id: "calzone", name: "Calzone al Forno", description: "Pizza pliée : jambon artisanal, ricotta, mozzarella, épinards, tomate", price: 15.9, emoji: "🫓" },
    { id: "nduja", name: "'Nduja Fiammante", description: "Saucisse calabraise épicée, tomate San Marzano, burrata, miel de chili", price: 17.9, emoji: "🍕", badge: "hot", tags: ["Très épicée"] },
    { id: "vegetariana", name: "Vegetariana Estiva", description: "Courgettes grillées, aubergines, poivrons, chèvre frais, pesto", price: 14.5, emoji: "🍕", badge: "vegan", tags: ["Vegan"] },
    { id: "prosciutto", name: "Prosciutto & Rucola", description: "Prosciutto di Parma 24 mois, mozzarella di bufala, roquette, copeaux de parmesan", price: 17.5, emoji: "🍕" },
  ],
  pasta: [
    { id: "carbonara", name: "Spaghetti alla Carbonara", description: "Guanciale croustillant, jaune d'œuf, pecorino romano, poivre noir", price: 13.9, emoji: "🍝", badge: "bestseller" },
    { id: "amatriciana", name: "Rigatoni all'Amatriciana", description: "Tomate San Marzano, guanciale, pecorino, poivre noir concassé", price: 13.5, emoji: "🍝" },
    { id: "arrabbiata", name: "Penne all'Arrabbiata", description: "Tomate piquante, ail, piment de Calabre, basilic frais", price: 12.5, emoji: "🍝", badge: "hot" },
    { id: "gnocchi", name: "Gnocchi Gorgonzola & Noix", description: "Gnocchi maison, sauce gorgonzola crémeuse, noix caramélisées, roquette", price: 14.9, emoji: "🥣", badge: "new" },
    { id: "lasagne", name: "Lasagne al Ragù", description: "Ragù de bœuf mijoté 4h, béchamel, pâtes fraîches, parmesan", price: 15.9, emoji: "🥘" },
  ],
  entrees: [
    { id: "bruschetta", name: "Bruschetta Tricolore", description: "Tomates cerises, avocat, ricotta, pain grillé au four à bois", price: 7.5, emoji: "🥖" },
    { id: "burrata", name: "Burrata di Puglia", description: "Burrata crémeuse, tomates cerises confites, pesto alla genovese, croûtons", price: 10.9, emoji: "🧀", badge: "new" },
    { id: "antipasto", name: "Antipasto della Casa", description: "Charcuteries italiennes, olives marinées, pickles maison, fromages affinés", price: 14.9, emoji: "🍱" },
    { id: "salade_cesar", name: "Salade César Maison", description: "Laitue romaine, parmesan, croûtons, sauce césar anchoïs", price: 11.9, emoji: "🥗" },
  ],
  desserts: [
    { id: "tiramisu", name: "Tiramisù Classico", description: "Mascarpone, café espresso, biscuits Savoiardi, cacao pur", price: 7.5, emoji: "☕", badge: "bestseller" },
    { id: "panna_cotta", name: "Panna Cotta Coulis Fruits Rouges", description: "Panna cotta vanille de Madagascar, coulis de framboises, menthe fraîche", price: 7.0, emoji: "🍮" },
    { id: "cannoli", name: "Cannoli Siciliani", description: "Pâte croustillante, ricotta à la cannelle et zeste de citron, pistaches", price: 8.5, emoji: "🥐", badge: "new" },
    { id: "gelato", name: "Gelato Artigianale (3 boules)", description: "Pistache de Bronte, stracciatella, sorbet citron de Sicile", price: 6.9, emoji: "🍨" },
  ],
  boissons: [
    { id: "limonade", name: "Limonade Sicilienne", description: "Citrons de Sicile, menthe fraîche, eau pétillante, sirop naturel", price: 4.5, emoji: "🍋" },
    { id: "espresso", name: "Espresso Illy", description: "Café sélectionné, torréfaction artisanale", price: 2.5, emoji: "☕" },
    { id: "vin_rouge", name: "Chianti Classico (verre)", description: "Toscane, robe rubis, notes de cerise et d'épices", price: 6.9, emoji: "🍷" },
    { id: "biere_craft", name: "Bière Artisanale Italienne", description: "Brassée artisanalement, notes de malt et de houblon floral", price: 5.5, emoji: "🍺", badge: "new" },
    { id: "eau", name: "Acqua San Pellegrino", description: "Eau minérale pétillante ou plate 50cl", price: 2.9, emoji: "💧" },
  ],
};

function MenuCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(0);

  const handleAdd = () => {
    addItem({
      id: item.id + (item.sizes ? `-${selectedSize}` : ""),
      name: item.name + (item.sizes ? ` (${item.sizes[selectedSize].label})` : ""),
      price: item.price + (item.sizes ? item.sizes[selectedSize].extra : 0),
      emoji: item.emoji,
      size: item.sizes?.[selectedSize].label,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-orange-500/40 hover:bg-white/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-950/30 flex flex-col gap-3">
      {/* Badge */}
      {item.badge && (
        <span className={`absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full ${BADGE_STYLES[item.badge]}`}>
          {BADGE_LABELS[item.badge]}
        </span>
      )}

      {/* Emoji + Name */}
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

      {/* Description */}
      <p className="text-white/50 text-sm leading-relaxed flex-1">{item.description}</p>

      {/* Sizes if any */}
      {item.sizes && (
        <div className="flex gap-2">
          {item.sizes.map((sz, i) => (
            <button
              key={i}
              onClick={() => setSelectedSize(i)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                selectedSize === i
                  ? "border-orange-500 bg-orange-500/20 text-orange-400"
                  : "border-white/20 text-white/50 hover:border-white/40"
              }`}
            >
              {sz.label}
              {sz.extra > 0 && ` +${sz.extra}€`}
            </button>
          ))}
        </div>
      )}

      {/* Price + Add */}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/10">
        <p className="text-2xl font-black text-orange-400">
          {(item.price + (item.sizes ? item.sizes[selectedSize].extra : 0)).toFixed(2)}
          <span className="text-base font-medium">€</span>
        </p>
        <button
          onClick={handleAdd}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
            added
              ? "bg-green-600 text-white scale-95"
              : "bg-fire text-white hover:opacity-90 hover:scale-105 active:scale-95 glow-fire-sm"
          }`}
        >
          {added ? (
            <>✓ Ajouté</>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Ajouter
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function PizzaMenu() {
  const [activeCategory, setActiveCategory] = useState<Category>("pizzas");
  const [search, setSearch] = useState("");

  const filtered = MENU[activeCategory].filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="menu" className="py-20 bg-[#0d0300] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-600/40 to-transparent" />
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-5"
        style={{ background: "radial-gradient(circle, #e63000, transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-950/50 border border-red-700/40 text-orange-400 text-sm font-medium mb-4">
            <Flame className="w-4 h-4" />
            Notre Carte
          </div>
          <h2 className="font-playfair text-4xl sm:text-5xl font-black text-white mb-4">
            Des Saveurs <span className="text-fire italic">Authentiques</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Chaque plat est préparé avec des ingrédients importés directement d'Italie,
            pour vous offrir une expérience gustative inoubliable.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher dans le menu... 🔍"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-2xl px-5 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/60 focus:bg-white/8 transition-all text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-lg"
              >
                ×
              </button>
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

        {/* Menu grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="text-6xl">🔍</span>
            <p className="text-white/50 mt-4 text-lg">Aucun résultat pour "{search}"</p>
            <button onClick={() => setSearch("")} className="mt-4 text-orange-400 hover:text-orange-300 underline text-sm">
              Effacer la recherche
            </button>
          </div>
        )}

        {/* Allergen info */}
        <div className="mt-12 flex items-center justify-center gap-2 text-white/30 text-sm">
          <Info className="w-4 h-4" />
          <p>Allergènes disponibles sur demande · Tous nos prix sont TTC · Service compris</p>
        </div>
      </div>
    </section>
  );
}
