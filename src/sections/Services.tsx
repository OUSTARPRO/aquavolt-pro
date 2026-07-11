import { useState } from "react";
import { ShoppingCart, Plus, Star, Flame, Leaf } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Category = "toutes" | "classiques" | "speciales" | "vegetariennes" | "calzones";

interface Pizza {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Exclude<Category, "toutes">;
  image: string;
  tags: string[];
  spicy?: boolean;
  vegan?: boolean;
  bestseller?: boolean;
  isNew?: boolean;
}

const PIZZAS: Pizza[] = [
  {
    id: 1,
    name: "Margherita Regina",
    description: "Sauce tomate San Marzano, mozzarella di bufala, basilic frais, huile d'olive extra vierge",
    price: 12.5,
    category: "classiques",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&q=80",
    tags: ["Classique", "Fromage"],
    bestseller: true,
  },
  {
    id: 2,
    name: "Diavola Fuoco",
    description: "Sauce tomate, mozzarella, salami piccante, piments rouges, origan",
    price: 14.5,
    category: "classiques",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
    tags: ["Épicée", "Viande"],
    spicy: true,
  },
  {
    id: 3,
    name: "Quattro Formaggi",
    description: "Sauce béchamel, mozzarella, gorgonzola, parmesan, ricotta, noix caramélisées",
    price: 15.9,
    category: "classiques",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80",
    tags: ["Fromage", "Gourmet"],
  },
  {
    id: 4,
    name: "Truffe Noire & Burrata",
    description: "Crème de truffe noire, burrata fraîche, roquette, copeaux de parmesan 24 mois",
    price: 22.9,
    category: "speciales",
    image: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&q=80",
    tags: ["Premium", "Gourmet"],
    bestseller: true,
  },
  {
    id: 5,
    name: "Saumon & Avocat",
    description: "Crème fraîche, mozzarella, saumon fumé norvégien, avocat, câpres, citron",
    price: 19.9,
    category: "speciales",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80",
    tags: ["Poisson", "Frais"],
    isNew: true,
  },
  {
    id: 6,
    name: "Prosciutto e Rucola",
    description: "Sauce tomate, mozzarella, jambon prosciutto de Parme, roquette, tomates cerises",
    price: 17.5,
    category: "speciales",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&q=80",
    tags: ["Charcuterie", "Frais"],
  },
  {
    id: 7,
    name: "Verde Primavera",
    description: "Pesto de basilic, mozzarella, courgette grillée, épinards, pignons, tomates cerises",
    price: 13.9,
    category: "vegetariennes",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80",
    tags: ["Végétarien", "Léger"],
    vegan: true,
  },
  {
    id: 8,
    name: "Funghi Porcini",
    description: "Crème de champignons, mozzarella, champignons porcini, thym frais, truffe blanche",
    price: 16.5,
    category: "vegetariennes",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80",
    tags: ["Végétarien", "Champignons"],
  },
  {
    id: 9,
    name: "Calzone Classico",
    description: "Sauce tomate, mozzarella, ricotta, jambon cuit, champignons, sauce tomate côté",
    price: 14.9,
    category: "calzones",
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&q=80",
    tags: ["Calzone", "Classique"],
    bestseller: true,
  },
  {
    id: 10,
    name: "Calzone Poulet-Pesto",
    description: "Pesto maison, mozzarella, poulet grillé, poivrons confits, parmesan",
    price: 16.9,
    category: "calzones",
    image: "https://images.unsplash.com/photo-1598021634509-3db4aaaa4f51?w=400&q=80",
    tags: ["Calzone", "Volaille"],
    isNew: true,
  },
];

const CATEGORIES: { key: Category; label: string; emoji: string }[] = [
  { key: "toutes", label: "Toutes", emoji: "🍕" },
  { key: "classiques", label: "Classiques", emoji: "🇮🇹" },
  { key: "speciales", label: "Spéciales", emoji: "⭐" },
  { key: "vegetariennes", label: "Végétariennes", emoji: "🌿" },
  { key: "calzones", label: "Calzones", emoji: "🫓" },
];

function PizzaCard({ pizza }: { pizza: Pizza }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="pizza-card card-hover rounded-2xl overflow-hidden bg-[#1a1008] border border-white/5 hover:border-pizza-red/30 group">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={pizza.image}
          alt={pizza.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1008] via-[#1a1008]/20 to-transparent" />

        {/* Badges overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {pizza.bestseller && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-pizza-gold text-black text-xs font-bold shadow-lg">
              <Star className="w-3 h-3 fill-current" /> Best-seller
            </span>
          )}
          {pizza.isNew && (
            <span className="px-2 py-0.5 rounded-full bg-pizza-red text-white text-xs font-bold shadow-lg animate-pulse">
              Nouveau
            </span>
          )}
        </div>

        {/* Icons top right */}
        <div className="absolute top-3 right-3 flex gap-1.5">
          {pizza.spicy && (
            <span className="w-7 h-7 rounded-full bg-red-600/90 backdrop-blur-sm flex items-center justify-center" title="Épicé">
              <Flame className="w-4 h-4 text-white" />
            </span>
          )}
          {pizza.vegan && (
            <span className="w-7 h-7 rounded-full bg-green-600/90 backdrop-blur-sm flex items-center justify-center" title="Végétalien">
              <Leaf className="w-4 h-4 text-white" />
            </span>
          )}
        </div>

        {/* Price pill */}
        <div className="absolute bottom-3 right-3">
          <span className="px-3 py-1 rounded-full bg-pizza-red text-white font-bold text-sm shadow-lg">
            {pizza.price.toFixed(2)} €
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-1 font-playfair group-hover:text-pizza-red-light transition-colors">
          {pizza.name}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">
          {pizza.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {pizza.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-white/5 text-white/60 border border-white/10 text-xs px-2 py-0.5"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Add button */}
        <Button
          onClick={handleAdd}
          className={`w-full rounded-xl font-semibold transition-all duration-300 ${
            added
              ? "bg-green-500 hover:bg-green-500 text-white scale-95"
              : "bg-pizza-red hover:bg-pizza-red-dark text-white hover:scale-105"
          }`}
        >
          {added ? (
            "✓ Ajouté au panier !"
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Commander — {pizza.price.toFixed(2)} €
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<Category>("toutes");

  const filtered =
    activeCategory === "toutes"
      ? PIZZAS
      : PIZZAS.filter((p) => p.category === activeCategory);

  return (
    <section id="menu" className="py-24 bg-pizza-dark relative">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pizza-red/40 to-transparent" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-pizza-red/3 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-pizza-gold/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-pizza-red font-medium text-sm uppercase tracking-widest mb-3 font-inter">
            — Notre Carte —
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 font-playfair">
            Le Menu <span className="italic text-shimmer">Bella Napoli</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Chaque pizza est préparée à la commande avec des ingrédients frais, 
            une pâte levée 72h et cuite dans notre four à bois à 450°C.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {CATEGORIES.map(({ key, label, emoji }) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                activeCategory === key
                  ? "bg-pizza-red text-white shadow-lg shadow-pizza-red/30 scale-105"
                  : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white hover:scale-105"
              }`}
            >
              <span>{emoji}</span>
              {label}
              <span className="text-xs opacity-60">
                ({key === "toutes" ? PIZZAS.length : PIZZAS.filter(p => p.category === key).length})
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((pizza) => (
            <PizzaCard key={pizza.id} pizza={pizza} />
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center">
          <p className="text-white/30 text-sm">
            🌾 Pâte sans additifs • 🫒 Huile d'olive italienne • 🧀 Fromages AOP • 🍅 Tomates San Marzano
          </p>
        </div>
      </div>
    </section>
  );
}
