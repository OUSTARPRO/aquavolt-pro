import { useState, useEffect, useRef } from "react";
import { Star, Quote, MessageCircle } from "lucide-react";

const REVIEWS = [
  {
    name: "Marco B.",
    avatar: "👨‍🦱",
    rating: 5,
    date: "3 giorni fa",
    text: "Pizza ai frutti di mare eccezionale! Cozze e gamberi freschissimi, impasto leggero cotto perfettamente nel forno a legna. Siamo stati in vacanza a Lipari e ci siamo tornati 3 volte!",
    platform: "Google",
    dish: "Frutti di Mare",
  },
  {
    name: "Giulia & Luca",
    avatar: "👫",
    rating: 4,
    date: "1 settimana fa",
    text: "Bella pizzeria nel centro di Lipari. Abbiamo preso la siciliana con melanzane e ricotta salata – autentica! Il Malvasia delle Lipari in abbinamento era perfetto. Torneremo!",
    platform: "TripAdvisor",
    dish: "Pizza Siciliana + Malvasia",
  },
  {
    name: "Stefan K.",
    avatar: "👨‍🦳",
    rating: 5,
    date: "2 settimane fa",
    text: "We visited from Germany during our Aeolian Islands tour. Best pizza we had in Sicily! The seafood was incredibly fresh and the wood oven gives an amazing flavor. Staff was very friendly.",
    platform: "Google",
    dish: "Frutti di Mare",
  },
  {
    name: "Anna M.",
    avatar: "👩‍🦰",
    rating: 4,
    date: "5 giorni fa",
    text: "Gli arancini siciliani sono una meraviglia! E il cannolo al dessert... perfetto. Atmosfera accogliente, tavoli in terrazza di sera – romantico. Lo consiglio a tutti i turisti di Lipari.",
    platform: "TripAdvisor",
    dish: "Arancini + Cannolo",
  },
  {
    name: "Pierre D.",
    avatar: "👨‍🍳",
    rating: 5,
    date: "3 settimane fa",
    text: "Incroyable! La pizza Prosciutto e Rucola était sublime – la vraie cuisine sicilienne. L'Aperol Spritz en apéro sous les étoiles de Lipari... un souvenir inoubliable. Merci mille fois!",
    platform: "Google",
    dish: "Prosciutto & Rucola",
  },
  {
    name: "Rosa L.",
    avatar: "👩",
    rating: 4,
    date: "1 settimana fa",
    text: "Ottimo rapporto qualità-prezzo per Lipari. Porzioni abbondanti, ingredienti freschi. La pizza tonno e capperi di Salina è una specialità locale assolutamente da provare!",
    platform: "Google",
    dish: "Tonno & Capperi di Salina",
  },
];

const PLATFORM_ICONS: Record<string, { color: string; icon: string }> = {
  Google: { color: "#4285f4", icon: "G" },
  TripAdvisor: { color: "#00aa6c", icon: "T" },
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
        {review.dish && <p className="text-xs text-orange-400/80 font-medium">🍕 {review.dish}</p>}
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
    intervalRef.current = setInterval(() => setActiveIndex((i) => (i + 1) % REVIEWS.length), 4000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  return (
    <section id="avis" className="py-20 bg-[#080100] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-600/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-950/50 border border-yellow-700/40 text-yellow-400 text-sm font-medium mb-4">
            <Star className="w-4 h-4 fill-yellow-400" />
            Ci adorano
          </div>
          <h2 className="font-playfair text-4xl sm:text-5xl font-black text-white mb-4">
            Cosa Dicono i <span className="text-fire italic">Nostri Clienti</span>
          </h2>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-8 mb-4">
            <div className="text-center">
              <div className="text-4xl font-black text-white">4.0</div>
              <div className="flex justify-center mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-yellow-400/30"}`} />
                ))}
              </div>
              <div className="text-white/40 text-xs mt-1">Voto Google</div>
            </div>
            <div className="w-px h-12 bg-white/10 hidden sm:block" />
            <div className="text-center">
              <div className="text-4xl font-black text-white">20+</div>
              <div className="text-white/40 text-xs mt-2">Recensioni verificate</div>
            </div>
            <div className="w-px h-12 bg-white/10 hidden sm:block" />
            <div className="text-center">
              <div className="text-4xl font-black text-white">Lipari</div>
              <div className="text-white/40 text-xs mt-2">Isole Eolie, Sicilia</div>
            </div>
            <div className="w-px h-12 bg-white/10 hidden sm:block" />
            <div className="text-center">
              <div className="text-4xl font-black text-white">🌋</div>
              <div className="text-white/40 text-xs mt-2">Patrimonio UNESCO</div>
            </div>
          </div>
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden mb-8">
          <ReviewCard review={REVIEWS[activeIndex]} featured />
          <div className="flex justify-center gap-2 mt-4">
            {REVIEWS.map((_, i) => (
              <button key={i} onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all ${i === activeIndex ? "bg-orange-500 w-6" : "bg-white/20 w-2"}`} />
            ))}
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((review, i) => (
            <ReviewCard key={i} review={review} featured={i === 0} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://search.google.com/local/writereview?placeid=ChIJpizzeriasicilianalipari"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-orange-500/50 hover:bg-white/5 transition-all text-sm font-medium"
          >
            <MessageCircle className="w-4 h-4" />
            Lascia una recensione su Google
          </a>
        </div>
      </div>
    </section>
  );
}
