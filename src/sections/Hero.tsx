import { useState, useEffect } from "react";
import { ChevronDown, Star, Clock, MapPin, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

const PIZZA_EMOJIS = ["🍕", "🫑", "🧀", "🍅", "🌿", "🧄", "🫒"];

function FloatingIngredient({
  emoji,
  style,
}: {
  emoji: string;
  style: React.CSSProperties;
}) {
  return (
    <div
      className="absolute select-none pointer-events-none text-4xl opacity-30 animate-float"
      style={style}
    >
      {emoji}
    </div>
  );
}

function StatBadge({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-3">
      <div className="text-pizza-red">{icon}</div>
      <div>
        <div className="text-xl font-bold text-white font-playfair">{value}</div>
        <div className="text-xs text-white/60">{label}</div>
      </div>
    </div>
  );
}

export default function Hero() {
  const [activeWord, setActiveWord] = useState(0);
  const words = ["Authentique", "Artisanale", "Napolitaine", "Inoubliable"];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const floatingItems = [
    { emoji: "🍕", style: { top: "15%", left: "8%", animationDelay: "0s", fontSize: "3rem" } },
    { emoji: "🍅", style: { top: "25%", right: "10%", animationDelay: "1s", fontSize: "2.5rem" } },
    { emoji: "🌿", style: { top: "60%", left: "5%", animationDelay: "2s", fontSize: "2rem" } },
    { emoji: "🧀", style: { bottom: "20%", right: "8%", animationDelay: "0.5s", fontSize: "2.5rem" } },
    { emoji: "🫑", style: { top: "70%", right: "15%", animationDelay: "1.5s", fontSize: "2rem" } },
    { emoji: "🧄", style: { bottom: "35%", left: "12%", animationDelay: "3s", fontSize: "1.8rem" } },
    { emoji: "🫒", style: { top: "40%", left: "3%", animationDelay: "2.5s", fontSize: "2rem" } },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-pizza-dark">
      {/* Background image with deep overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1920&q=80"
          alt="Pizza au feu de bois"
          className="w-full h-full object-cover scale-105"
          style={{ filter: "saturate(1.2)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-pizza-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-pizza-dark/70 via-transparent to-pizza-dark/50" />
      </div>

      {/* Floating ingredients */}
      {floatingItems.map((item, i) => (
        <FloatingIngredient key={i} emoji={item.emoji} style={item.style} />
      ))}

      {/* Fire glow effects */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pizza-red/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-pizza-gold/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pizza-red/20 border border-pizza-red/40 text-pizza-red-light text-sm font-semibold mb-8 backdrop-blur-sm animate-slide-up">
          <Flame className="w-4 h-4 animate-flame" />
          <span>Cuit au feu de bois depuis 1987</span>
          <Flame className="w-4 h-4 animate-flame" style={{ animationDelay: "0.3s" }} />
        </div>

        {/* Main title */}
        <h1 className="text-6xl sm:text-7xl lg:text-9xl font-bold text-white mb-4 font-playfair leading-none tracking-tight">
          La{" "}
          <span className="italic text-shimmer">Bella</span>
          <br />
          <span className="text-white">Napoli</span>
        </h1>

        {/* Animated subtitle */}
        <div className="h-16 flex items-center justify-center mb-6">
          <p className="text-2xl sm:text-3xl font-playfair italic text-pizza-gold-light">
            Pizza{" "}
            <span
              key={activeWord}
              className="inline-block animate-bounce-in text-pizza-red-light"
            >
              {words[activeWord]}
            </span>
          </p>
        </div>

        <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          Des pizzas napolitaines préparées avec passion, des ingrédients 100% frais,
          et la tradition italienne transmise de génération en génération.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a href="#menu">
            <Button
              size="lg"
              className="bg-pizza-red hover:bg-pizza-red-dark text-white shadow-2xl shadow-pizza-red/40 text-base px-10 py-6 rounded-full font-semibold transition-all duration-300 hover:scale-105 animate-pulse-glow"
            >
              🍕 Voir notre Menu
            </Button>
          </a>
          <a href="#reservation">
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:border-pizza-gold/50 text-base px-10 py-6 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              Réserver une Table
            </Button>
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
          <StatBadge
            value="35+"
            label="Pizzas au menu"
            icon={<span className="text-xl">🍕</span>}
          />
          <StatBadge
            value="4.9★"
            label="Note Google"
            icon={<Star className="w-5 h-5 fill-current" />}
          />
          <StatBadge
            value="30 min"
            label="Livraison express"
            icon={<Clock className="w-5 h-5" />}
          />
          <StatBadge
            value="Khouribga"
            label="Livraison locale"
            icon={<MapPin className="w-5 h-5" />}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/40">
        <span className="text-xs uppercase tracking-widest font-medium">Découvrir</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-pizza-dark to-transparent z-5" />
    </section>
  );
}
