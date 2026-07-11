import { useState, useEffect, useRef } from "react";
import { Timer, Percent, ChevronRight, Flame, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

function StatCounter({ value, suffix, label, emoji }: { value: number; suffix?: string; label: string; emoji: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center group">
      <div className="text-5xl sm:text-6xl font-bold font-playfair text-white mb-2 group-hover:text-pizza-red-light transition-colors">
        {count}{suffix}
      </div>
      <div className="text-3xl mb-1">{emoji}</div>
      <div className="text-white/50 text-sm uppercase tracking-wider">{label}</div>
    </div>
  );
}

function Countdown() {
  const [time, setTime] = useState({ hours: 2, minutes: 47, seconds: 33 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex items-center gap-3">
      {[
        { val: time.hours, label: "h" },
        { val: time.minutes, label: "m" },
        { val: time.seconds, label: "s" },
      ].map(({ val, label }, i) => (
        <div key={i} className="flex items-center gap-1">
          <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-2 text-center min-w-[52px]">
            <div className="text-2xl font-bold text-white font-mono">{pad(val)}</div>
            <div className="text-xs text-white/40">{label}</div>
          </div>
          {i < 2 && <span className="text-pizza-red font-bold text-xl">:</span>}
        </div>
      ))}
    </div>
  );
}

const DEALS = [
  {
    badge: "🔥 Happy Hour",
    title: "Duo Pizza",
    subtitle: "-30%",
    description: "2 pizzas classiques pour le prix d'1,7. Valable lundi au mercredi de 11h à 14h.",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&q=80",
    color: "from-pizza-red/80 to-pizza-red-dark/60",
    hasClock: true,
    cta: "En profiter maintenant",
  },
  {
    badge: "🎁 Nouveau",
    title: "Menu Famiglia",
    subtitle: "Pour 4",
    description: "2 grandes pizzas + 1 calzone + 4 boissons + 1 tiramisu. Repas complet en famille.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80",
    color: "from-pizza-gold/70 to-amber-700/50",
    cta: "Commander le menu",
  },
  {
    badge: "🛵 Livraison",
    title: "Livraison Offerte",
    subtitle: "Dès 25€",
    description: "Livraison gratuite dans un rayon de 5 km pour toute commande à partir de 25€.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    color: "from-emerald-600/70 to-teal-800/50",
    cta: "Commander en ligne",
  },
];

export default function SpecialsAndStats() {
  return (
    <>
      {/* Stats Section */}
      <section className="py-20 bg-pizza-brown relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=1920&q=80"
            alt="background"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-pizza-brown/80" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pizza-red/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pizza-gold/30 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <StatCounter value={35} suffix="+" label="Pizzas au menu" emoji="🍕" />
            <StatCounter value={37} label="Ans d'expérience" emoji="👨‍🍳" />
            <StatCounter value={850} suffix="+" label="Clients par semaine" emoji="😍" />
            <StatCounter value={4} suffix=".9★" label="Note moyenne" emoji="⭐" />
          </div>
        </div>
      </section>

      {/* Deals Section */}
      <section id="offres" className="py-24 bg-[#150d06] relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pizza-gold/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-pizza-gold font-medium text-sm uppercase tracking-widest mb-3">
              — Offres du Moment —
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white font-playfair mb-4">
              Nos <span className="italic text-shimmer">Promotions</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Des offres spéciales renouvelées chaque semaine. Profitez-en avant qu'elles expirent !
            </p>
          </div>

          {/* Countdown banner */}
          <div className="mb-10 p-5 rounded-2xl bg-pizza-red/10 border border-pizza-red/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Timer className="w-6 h-6 text-pizza-red animate-pulse" />
              <div>
                <p className="text-white font-semibold">Happy Hour se termine dans :</p>
                <p className="text-white/50 text-sm">Dépêchez-vous, l'offre expire bientôt !</p>
              </div>
            </div>
            <Countdown />
          </div>

          {/* Deals grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEALS.map((deal, i) => (
              <div key={i} className="card-hover group rounded-2xl overflow-hidden relative">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${deal.color} to-transparent`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#150d06] via-[#150d06]/40 to-transparent" />

                  {/* Discount badge */}
                  <div className="absolute top-4 right-4">
                    <div className="w-14 h-14 rounded-full bg-pizza-red flex items-center justify-center shadow-xl animate-pulse-glow">
                      <span className="text-white font-bold text-xs text-center leading-tight px-1">
                        {deal.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-semibold border border-white/20">
                      {deal.badge}
                    </span>
                  </div>
                </div>

                <div className="p-6 bg-[#1a1008] border border-white/5 group-hover:border-pizza-red/20 transition-colors rounded-b-2xl">
                  <h3 className="text-xl font-bold text-white font-playfair mb-2">
                    {deal.title}
                  </h3>
                  <p className="text-white/50 text-sm mb-4 leading-relaxed">
                    {deal.description}
                  </p>
                  {deal.hasClock && (
                    <div className="flex items-center gap-2 text-pizza-red text-xs font-medium mb-4">
                      <Timer className="w-3.5 h-3.5" />
                      Offre limitée dans le temps
                    </div>
                  )}
                  <a href="#reservation">
                    <Button className="w-full bg-pizza-red hover:bg-pizza-red-dark text-white rounded-xl font-semibold group">
                      {deal.cta}
                      <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
