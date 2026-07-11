import { useEffect, useState } from "react";
import { Zap, Gift, Users, Clock } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

function useCountdown(targetHour: number) {
  const getRemaining = () => {
    const now = new Date();
    const target = new Date();
    target.setHours(targetHour, 0, 0, 0);
    if (now >= target) target.setDate(target.getDate() + 1);
    const diff = Math.floor((target.getTime() - now.getTime()) / 1000);
    return { h: Math.floor(diff / 3600), m: Math.floor((diff % 3600) / 60), s: diff % 60 };
  };
  const [time, setTime] = useState(getRemaining());
  useEffect(() => {
    const iv = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(iv);
  }, []);
  return time;
}

const DEALS = [
  {
    id: "deal-midi",
    emoji: "☀️",
    label: "Offre du Midi",
    title: "Menu Complet à 14.90€",
    description: "1 pizza au choix + 1 boisson + 1 dessert du jour",
    price: 14.9,
    originalPrice: 21.5,
    savings: "6.60€ économisés",
    available: "11h30 – 14h30",
    icon: Clock,
    color: "from-orange-600 to-red-700",
    glow: "shadow-orange-900/50",
    countdown: true,
    targetHour: 14,
  },
  {
    id: "deal-duo",
    emoji: "👫",
    label: "Spécial Duo",
    title: "2 Pizzas + 1 Bouteille",
    description: "2 pizzas de votre choix + 1 bouteille de vin Chianti 75cl",
    price: 34.9,
    originalPrice: 46.7,
    savings: "11.80€ économisés",
    available: "Tous les soirs dès 18h",
    icon: Users,
    color: "from-purple-700 to-pink-700",
    glow: "shadow-purple-900/50",
    countdown: false,
  },
  {
    id: "deal-student",
    emoji: "🎓",
    label: "Tarif Étudiant",
    title: "Pizza + Boisson à 10.90€",
    description: "Sur présentation d'une carte étudiante valide",
    price: 10.9,
    originalPrice: 17.4,
    savings: "6.50€ économisés",
    available: "Lun – Ven, toute la journée",
    icon: Gift,
    color: "from-blue-700 to-cyan-700",
    glow: "shadow-blue-900/50",
    countdown: false,
  },
];

const FEATURED = {
  id: "pizza-semaine",
  emoji: "⭐",
  title: "Pizza de la Semaine",
  name: "Burrata & Truffe Noire",
  description:
    "Cette semaine, notre chef vous propose une pizza d'exception : base crème de truffe noire, mozzarella di bufala, burrata entière au centre, carpaccio de champignons, roquette et copeaux de parmesan 36 mois.",
  price: 22.9,
  originalPrice: 28.9,
  rating: 4.9,
  reviews: 47,
};

function DealCard({ deal }: { deal: (typeof DEALS)[0] }) {
  const countdown = useCountdown(deal.targetHour ?? 23);
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ id: deal.id, name: deal.title, price: deal.price, emoji: deal.emoji });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className={`relative bg-gradient-to-br ${deal.color} p-0.5 rounded-2xl shadow-xl ${deal.glow}`}>
      <div className="bg-[#0f0200] rounded-[14px] p-5 h-full flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-white/50">{deal.label}</span>
            <h3 className="font-playfair text-xl font-bold text-white mt-0.5">{deal.title}</h3>
          </div>
          <span className="text-3xl select-none">{deal.emoji}</span>
        </div>

        <p className="text-white/60 text-sm leading-relaxed flex-1">{deal.description}</p>

        {deal.countdown && (
          <div className="flex items-center gap-2 text-center">
            <span className="text-xs text-white/40 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Expire dans :
            </span>
            <div className="flex gap-1">
              {[
                { v: countdown.h, l: "h" },
                { v: countdown.m, l: "m" },
                { v: countdown.s, l: "s" },
              ].map(({ v, l }) => (
                <div key={l} className="bg-white/10 rounded-lg px-2 py-1 min-w-[36px] text-center">
                  <p className="text-orange-400 font-black text-sm">{String(v).padStart(2, "0")}</p>
                  <p className="text-white/30 text-[9px]">{l}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">{deal.price.toFixed(2)}€</span>
              <span className="text-white/40 line-through text-sm">{deal.originalPrice.toFixed(2)}€</span>
            </div>
            <span className="text-green-400 text-xs font-bold">{deal.savings}</span>
          </div>
          <button
            onClick={handleAdd}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
              added
                ? "bg-green-600 text-white scale-95"
                : "bg-white text-black hover:opacity-90 hover:scale-105 active:scale-95"
            }`}
          >
            {added ? "✓ Ajouté !" : "Profiter"}
          </button>
        </div>

        <p className="text-white/30 text-xs flex items-center gap-1">
          <deal.icon className="w-3 h-3" />
          {deal.available}
        </p>
      </div>
    </div>
  );
}

export default function PizzaSpecials() {
  const { addItem } = useCart();
  const [featuredAdded, setFeaturedAdded] = useState(false);

  const handleAddFeatured = () => {
    addItem({ id: FEATURED.id, name: FEATURED.name, price: FEATURED.price, emoji: FEATURED.emoji });
    setFeaturedAdded(true);
    setTimeout(() => setFeaturedAdded(false), 1500);
  };

  return (
    <section id="specialites" className="py-20 bg-[#080100] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-600/40 to-transparent" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-5"
        style={{ background: "radial-gradient(circle, #ff9500, transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-950/50 border border-orange-700/40 text-orange-400 text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            Offres Exclusives
          </div>
          <h2 className="font-playfair text-4xl sm:text-5xl font-black text-white mb-4">
            Nos <span className="text-fire italic">Spécialités</span> du Moment
          </h2>
        </div>

        {/* Featured pizza */}
        <div className="relative mb-12 p-0.5 rounded-3xl"
          style={{ background: "linear-gradient(135deg, #ff6b00, #e63000, #ff9500)" }}>
          <div className="bg-[#0f0200] rounded-[22px] p-6 sm:p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-yellow-500 text-black text-xs font-black rounded-full animate-pulse">
                    ⭐ PIZZA DE LA SEMAINE
                  </span>
                </div>
                <h3 className="font-playfair text-3xl sm:text-4xl font-black text-white">
                  {FEATURED.name}
                </h3>
                <p className="text-white/60 leading-relaxed">{FEATURED.description}</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-sm">★</span>
                    ))}
                  </div>
                  <span className="text-white/50 text-sm">{FEATURED.rating} ({FEATURED.reviews} avis)</span>
                </div>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-4xl font-black text-orange-400">{FEATURED.price.toFixed(2)}€</span>
                  <span className="text-white/40 line-through text-xl">{FEATURED.originalPrice.toFixed(2)}€</span>
                  <span className="bg-green-600/20 text-green-400 text-sm font-bold px-3 py-1 rounded-full border border-green-600/30">
                    -{((1 - FEATURED.price / FEATURED.originalPrice) * 100).toFixed(0)}% ce mois
                  </span>
                </div>
                <button
                  onClick={handleAddFeatured}
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 ${
                    featuredAdded
                      ? "bg-green-600 text-white scale-95"
                      : "bg-fire text-white glow-fire hover:opacity-90 hover:scale-105 active:scale-95"
                  }`}
                >
                  {featuredAdded ? "✓ Ajoutée au panier !" : "🍕 Ajouter au panier"}
                </button>
              </div>

              <div className="flex justify-center relative">
                <div className="absolute inset-0 rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(230,48,0,0.3) 0%, transparent 70%)" }} />
                <div className="relative text-[160px] animate-float select-none"
                  style={{ filter: "drop-shadow(0 0 30px rgba(230,48,0,0.5))" }}>
                  {FEATURED.emoji}
                </div>
                <div className="absolute -top-4 -right-4 bg-yellow-500 text-black text-xs font-black px-3 py-1.5 rounded-full rotate-12 shadow-lg animate-bounce">
                  Édition limitée !
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deals grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {DEALS.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>

        {/* Loyalty banner */}
        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-orange-950/50 to-red-950/50 border border-orange-700/30 text-center">
          <p className="text-2xl mb-2">🎁</p>
          <h3 className="font-playfair text-xl font-bold text-white mb-2">Programme de Fidélité</h3>
          <p className="text-white/60 text-sm">
            Collectez des points à chaque commande. <span className="text-orange-400 font-semibold">10 pizzas achetées = 1 pizza offerte !</span>
          </p>
          <p className="text-white/40 text-xs mt-2">Demandez votre carte fidélité en restaurant ou via WhatsApp</p>
        </div>
      </div>
    </section>
  );
}
