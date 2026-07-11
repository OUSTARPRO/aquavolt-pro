import { useEffect, useRef, useState } from "react";
import { Star, Clock, Truck, Award } from "lucide-react";

const FLOATING_EMOJIS = [
  { emoji: "🍕", size: "text-5xl", top: "10%", left: "5%", delay: "0s", duration: "5s" },
  { emoji: "🍅", size: "text-3xl", top: "20%", right: "8%", delay: "1s", duration: "4s" },
  { emoji: "🧀", size: "text-4xl", top: "60%", left: "3%", delay: "2s", duration: "6s" },
  { emoji: "🫒", size: "text-3xl", top: "75%", right: "5%", delay: "0.5s", duration: "4.5s" },
  { emoji: "🌿", size: "text-2xl", top: "40%", right: "12%", delay: "1.5s", duration: "5.5s" },
  { emoji: "🧄", size: "text-3xl", top: "85%", left: "8%", delay: "3s", duration: "4s" },
];

const STATS = [
  { icon: Star, value: "4.9", label: "Note Moyenne", color: "text-yellow-400" },
  { icon: Award, value: "12+", label: "Années d'expérience", color: "text-orange-400" },
  { icon: Truck, value: "30min", label: "Livraison Express", color: "text-green-400" },
  { icon: Clock, value: "7j/7", label: "Ouvert tous les jours", color: "text-blue-400" },
];

export default function PizzaHero() {
  const [loaded, setLoaded] = useState(false);
  const [activeStat, setActiveStat] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setLoaded(true);
    intervalRef.current = setInterval(() => {
      setActiveStat((s) => (s + 1) % STATS.length);
    }, 2500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d0300]">
      {/* Layered backgrounds */}
      <div className="absolute inset-0">
        {/* Deep gradient bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0500] via-[#0d0300] to-[#000]" />

        {/* Radial fire glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(230,48,0,0.15) 0%, rgba(230,48,0,0.05) 40%, transparent 70%)" }}
        />

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(rgba(255,150,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,150,0,0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px"
          }}
        />
      </div>

      {/* Floating emojis */}
      {FLOATING_EMOJIS.map((item, i) => (
        <div
          key={i}
          className={`absolute ${item.size} pointer-events-none select-none opacity-20 hover:opacity-60 transition-opacity`}
          style={{
            top: item.top,
            left: "left" in item ? (item as any).left : undefined,
            right: "right" in item ? (item as any).right : undefined,
            animation: `float ${item.duration} ease-in-out infinite`,
            animationDelay: item.delay,
          }}
        >
          {item.emoji}
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT: Text */}
          <div className={`space-y-8 transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-950/50 border border-red-700/40 text-orange-400 text-sm font-medium backdrop-blur-sm">
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
              🔥 Cuites au feu de bois, livrées en 30 min
            </div>

            {/* Title */}
            <div>
              <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
                <span className="block text-white">La Vraie</span>
                <span className="block text-fire italic">Pizza</span>
                <span className="block text-white text-4xl sm:text-5xl lg:text-6xl font-bold">Artisanale</span>
              </h1>
              <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-md">
                Pâtes pétries à la main, ingrédients frais sélectionnés chaque matin,
                cuisson au four à bois traditionnel.{" "}
                <span className="text-orange-400 font-medium">L'Italie à votre porte.</span>
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#menu"
                className="group relative inline-flex items-center gap-2 bg-fire text-white font-bold px-8 py-4 rounded-full text-lg glow-fire hover:opacity-90 transition-all hover:scale-105 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10">🍕 Commander Maintenant</span>
                <div className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300 skew-x-12" />
              </a>
              <a
                href="#specialites"
                className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-full text-lg hover:bg-white/10 hover:border-orange-500/50 transition-all"
              >
                Voir les offres 🎁
              </a>
            </div>

            {/* Reviews quick */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                {["👨‍🍳", "👩", "🧔", "👩‍🦱", "👨"].map((em, i) => (
                  <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-red-700 to-orange-600 border-2 border-[#0d0300] flex items-center justify-center text-sm">
                    {em}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-white/50 text-xs mt-0.5">+2 400 clients satisfaits</p>
              </div>
            </div>
          </div>

          {/* RIGHT: Big pizza + spinning ring */}
          <div className={`relative flex items-center justify-center transition-all duration-1000 delay-300 ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
            {/* Outer glow ring */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(230,48,0,0.3) 0%, transparent 70%)" }}
            />

            {/* Spinning dashed ring */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border-2 border-dashed border-orange-600/30 animate-spin-slow" />

            {/* Spinning ingredients ring */}
            {["🍅", "🧀", "🌿", "🫒", "🥓", "🌶️"].map((ing, i) => {
              const angle = (i / 6) * 2 * Math.PI;
              const r = 160;
              const x = Math.cos(angle) * r;
              const y = Math.sin(angle) * r;
              return (
                <div
                  key={i}
                  className="absolute text-2xl"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    animation: `spin-slow 20s linear infinite reverse`,
                    transformOrigin: `${-x}px ${-y}px`,
                  }}
                >
                  {ing}
                </div>
              );
            })}

            {/* Main pizza */}
            <div
              className="text-[180px] sm:text-[220px] select-none cursor-pointer pizza-spin z-10 relative"
              style={{ filter: "drop-shadow(0 0 40px rgba(230,48,0,0.6)) drop-shadow(0 20px 40px rgba(0,0,0,0.8))" }}
              title="Cliquez pour commander !"
            >
              🍕
            </div>

            {/* Floating badges */}
            <div className="absolute top-4 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-float"
              style={{ animationDelay: "0.5s" }}>
              ✓ 30 min chrono
            </div>
            <div className="absolute bottom-8 left-0 bg-[#1a0500] border border-orange-600/40 text-orange-400 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-float"
              style={{ animationDelay: "2s" }}>
              🔥 Four à bois traditionnel
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-1000 delay-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {STATS.map((stat, i) => (
            <div
              key={i}
              className={`relative p-4 rounded-2xl border transition-all duration-300 cursor-default ${
                activeStat === i
                  ? "bg-red-950/50 border-red-700/60 scale-105"
                  : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
              onClick={() => setActiveStat(i)}
            >
              <stat.icon className={`w-6 h-6 mb-2 ${stat.color}`} />
              <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
              <p className="text-white/50 text-xs mt-0.5">{stat.label}</p>
              {activeStat === i && (
                <div className="absolute inset-0 rounded-2xl border border-red-600/40 animate-pulse-ring pointer-events-none" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d0300] to-transparent" />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs animate-bounce">
        <span>Découvrir le menu</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
