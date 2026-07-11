import { useState, useEffect, useRef } from "react";
import { Star, Quote, MessageCircle } from "lucide-react";

const REVIEWS = [
  {
    name: "Sophie Martin",
    avatar: "👩‍🦰",
    rating: 5,
    date: "Il y a 2 jours",
    text: "La meilleure pizza que j'ai mangée en dehors de Naples ! La pâte est parfaite, bien alvéolée et croustillante. La Margherita est sublime dans sa simplicité. Je reviens chaque semaine !",
    platform: "Google",
    dish: "Margherita Classica",
  },
  {
    name: "Thomas Dubois",
    avatar: "👨‍🦱",
    rating: 5,
    date: "Il y a 1 semaine",
    text: "Livraison ultra rapide, pizza encore bien chaude ! La Diavola est à tomber, épicée juste comme il faut. L'emballage est soigné. Mon restaurant préféré pour les soirées.",
    platform: "Deliveroo",
    dish: "Diavola Piccante",
  },
  {
    name: "Marie & Pierre",
    avatar: "👫",
    rating: 5,
    date: "Il y a 3 jours",
    text: "Soirée romantique réussie ! Le Quattro Formaggi et la Burrata sont incroyables. Le tiramisù est maison, authentique comme en Italie. L'ambiance du restaurant est chaleureuse. On reviendra !",
    platform: "TripAdvisor",
    dish: "Quattro Formaggi + Tiramisù",
  },
  {
    name: "Lucas Bernard",
    avatar: "🧔",
    rating: 5,
    date: "Il y a 5 jours",
    text: "En tant que pizza aficionado, je suis très difficile. Cette pizzeria passe le test haut la main. La pâte est fermentée 48h minimum, les tomates sont San Marzano, la mozzarella est fraîche. Bravo !",
    platform: "Google",
    dish: "Tartufo & Funghi",
  },
  {
    name: "Isabelle Roux",
    avatar: "👩‍💼",
    rating: 5,
    date: "Il y a 2 semaines",
    text: "J'ai commandé pour mon équipe (12 personnes) et tout le monde était ravi. La commande était complète, chaude et bien présentée. Les gnocchi au gorgonzola sont une merveille. Service parfait !",
    platform: "Uber Eats",
    dish: "Commande groupe",
  },
  {
    name: "Antoine Lefèvre",
    avatar: "👨‍🎓",
    rating: 5,
    date: "Il y a 1 semaine",
    text: "Pizza de la semaine testée : Burrata & Truffe Noire. Un festival pour les papilles ! La burrata coulante, la truffe parfumée... c'est de la haute gastronomie dans une pizza. Exceptionnel.",
    platform: "Google",
    dish: "Pizza de la semaine",
  },
];

const PLATFORM_ICONS: Record<string, { color: string; icon: string }> = {
  Google: { color: "#4285f4", icon: "G" },
  Deliveroo: { color: "#00ccbc", icon: "D" },
  TripAdvisor: { color: "#00aa6c", icon: "T" },
  "Uber Eats": { color: "#06c167", icon: "U" },
};

function ReviewCard({ review, featured }: { review: (typeof REVIEWS)[0]; featured?: boolean }) {
  return (
    <div className={`relative flex flex-col gap-4 p-6 rounded-2xl border transition-all duration-300 ${
      featured
        ? "bg-gradient-to-br from-red-950/60 to-orange-950/40 border-orange-600/40 shadow-xl shadow-red-950/30"
        : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/8"
    }`}>
      <Quote className="w-6 h-6 text-orange-500/40" />

      <p className="text-white/75 text-sm leading-relaxed flex-1 italic">"{review.text}"</p>

      <div className="space-y-2">
        {review.dish && (
          <p className="text-xs text-orange-400/80 font-medium">
            🍕 {review.dish}
          </p>
        )}
        <div className="flex items-center gap-1">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/10">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">{review.avatar}</span>
          <div>
            <p className="text-white font-semibold text-sm">{review.name}</p>
            <p className="text-white/40 text-xs">{review.date}</p>
          </div>
        </div>
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black"
          style={{ backgroundColor: PLATFORM_ICONS[review.platform]?.color || "#666" }}
        >
          {PLATFORM_ICONS[review.platform]?.icon}
        </div>
      </div>
    </div>
  );
}

export default function PizzaTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % REVIEWS.length);
    }, 4000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  return (
    <section id="avis" className="py-20 bg-[#080100] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-600/40 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-5"
        style={{ background: "radial-gradient(circle, #ff9500, transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-950/50 border border-yellow-700/40 text-yellow-400 text-sm font-medium mb-4">
            <Star className="w-4 h-4 fill-yellow-400" />
            Ils nous adorent
          </div>
          <h2 className="font-playfair text-4xl sm:text-5xl font-black text-white mb-4">
            Ce Que Disent <span className="text-fire italic">Nos Clients</span>
          </h2>

          {/* Aggregate stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-8 mb-4">
            <div className="text-center">
              <div className="text-4xl font-black text-white">4.9</div>
              <div className="flex justify-center mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="text-white/40 text-xs mt-1">Note moyenne</div>
            </div>
            <div className="w-px h-12 bg-white/10 hidden sm:block" />
            <div className="text-center">
              <div className="text-4xl font-black text-white">2.4K</div>
              <div className="text-white/40 text-xs mt-2">Avis vérifiés</div>
            </div>
            <div className="w-px h-12 bg-white/10 hidden sm:block" />
            <div className="text-center">
              <div className="text-4xl font-black text-white">98%</div>
              <div className="text-white/40 text-xs mt-2">Clients satisfaits</div>
            </div>
            <div className="w-px h-12 bg-white/10 hidden sm:block" />
            <div className="text-center">
              <div className="text-4xl font-black text-white">#1</div>
              <div className="text-white/40 text-xs mt-2">Pizzeria du quartier</div>
            </div>
          </div>
        </div>

        {/* Mobile: featured review carousel */}
        <div className="md:hidden mb-8">
          <ReviewCard review={REVIEWS[activeIndex]} featured />
          <div className="flex justify-center gap-2 mt-4">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === activeIndex ? "bg-orange-500 w-6" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((review, i) => (
            <ReviewCard key={i} review={review} featured={i === 0} />
          ))}
        </div>

        {/* CTA review */}
        <div className="mt-12 text-center">
          <a
            href="https://g.page/r/labella-pizza/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-orange-500/50 hover:bg-white/5 transition-all text-sm font-medium"
          >
            <MessageCircle className="w-4 h-4" />
            Laisser un avis Google
          </a>
        </div>
      </div>
    </section>
  );
}
