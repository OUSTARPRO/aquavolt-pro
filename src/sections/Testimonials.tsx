import { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
  source: "google" | "tripadvisor";
  verified: boolean;
}

const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Sophie M.",
    avatar: "https://i.pravatar.cc/80?img=1",
    rating: 5,
    text: "La meilleure pizza que j'ai mangée en dehors de Naples ! La pâte est parfaite, légèrement croustillante et moelleuse à l'intérieur. La Truffe Noire & Burrata est tout simplement divine. Je reviens chaque semaine !",
    date: "Il y a 2 jours",
    source: "google",
    verified: true,
  },
  {
    id: 2,
    name: "Karim B.",
    avatar: "https://i.pravatar.cc/80?img=2",
    rating: 5,
    text: "Service impeccable, ambiance chaleureuse et surtout des pizzas à tomber par terre. Le four à bois donne un goût incomparable. J'ai commandé le Menu Famiglia pour mon anniversaire, toute la famille a adoré !",
    date: "Il y a 5 jours",
    source: "google",
    verified: true,
  },
  {
    id: 3,
    name: "Marie-Claire D.",
    avatar: "https://i.pravatar.cc/80?img=3",
    rating: 5,
    text: "Incroyable rapport qualité-prix. Les ingrédients sont visiblement frais et de grande qualité. J'adore la Margherita Regina avec sa mozzarella di bufala fondante. Livraison rapide et pizza encore chaude !",
    date: "Il y a 1 semaine",
    source: "tripadvisor",
    verified: true,
  },
  {
    id: 4,
    name: "Ahmed R.",
    avatar: "https://i.pravatar.cc/80?img=4",
    rating: 5,
    text: "Depuis que j'ai découvert La Bella Napoli, je ne commande plus ailleurs. La pâte levée 72h fait vraiment la différence. Le personnel est super sympa et les conseils pour choisir sont toujours pertinents.",
    date: "Il y a 2 semaines",
    source: "google",
    verified: true,
  },
  {
    id: 5,
    name: "Isabelle T.",
    avatar: "https://i.pravatar.cc/80?img=5",
    rating: 5,
    text: "J'ai organisé un dîner pour 12 personnes et ils ont tout géré parfaitement. Ponctuel, professionnel, et les pizzas étaient extraordinaires. Le Calzone Classico était un vrai délice fumant !",
    date: "Il y a 3 semaines",
    source: "tripadvisor",
    verified: true,
  },
  {
    id: 6,
    name: "Lucas V.",
    avatar: "https://i.pravatar.cc/80?img=6",
    rating: 5,
    text: "Végétarien depuis 10 ans, je ne pensais pas trouver des pizzas végé aussi savoureuses. La Verde Primavera est un chef-d'œuvre. Le pesto maison est fait avec amour, ça se sent dans chaque bouchée.",
    date: "Il y a 1 mois",
    source: "google",
    verified: true,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= rating ? "text-pizza-gold fill-pizza-gold" : "text-white/20"}`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, isActive }: { review: Review; isActive: boolean }) {
  return (
    <div
      className={`transition-all duration-500 rounded-2xl p-6 border ${
        isActive
          ? "bg-[#1a1008] border-pizza-red/30 shadow-2xl shadow-pizza-red/10 scale-100 opacity-100"
          : "bg-[#120d08] border-white/5 scale-95 opacity-60"
      }`}
    >
      <Quote className="w-8 h-8 text-pizza-red/40 mb-4" />
      
      <p className="text-white/80 text-sm leading-relaxed mb-6 line-clamp-4">
        "{review.text}"
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={review.avatar}
              alt={review.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-pizza-red/30"
            />
            {review.verified && (
              <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-[8px] font-bold">
                ✓
              </span>
            )}
          </div>
          <div>
            <p className="text-white font-semibold text-sm">{review.name}</p>
            <p className="text-white/40 text-xs">{review.date}</p>
          </div>
        </div>

        <div className="text-right">
          <StarRating rating={review.rating} />
          <p className="text-white/30 text-xs mt-0.5 capitalize">{review.source}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex((i) => (i > 0 ? i - 1 : REVIEWS.length - 3));
  const next = () => setActiveIndex((i) => (i < REVIEWS.length - 3 ? i + 1 : 0));

  const visible = REVIEWS.slice(activeIndex, activeIndex + 3);

  return (
    <section id="avis" className="py-24 bg-pizza-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pizza-red/30 to-transparent" />
      
      {/* Background pizza */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[20rem] opacity-3 select-none pointer-events-none">
        🍕
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-pizza-red font-medium text-sm uppercase tracking-widest mb-3">
            — Ce que disent nos clients —
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white font-playfair mb-4">
            Ils nous font{" "}
            <span className="italic text-shimmer">Confiance</span>
          </h2>
          
          {/* Overall rating */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(s => (
                <Star key={s} className="w-6 h-6 text-pizza-gold fill-pizza-gold" />
              ))}
            </div>
            <span className="text-3xl font-bold text-white font-playfair">4.9</span>
            <span className="text-white/50 text-sm">/ 5 — basé sur 847 avis</span>
          </div>

          {/* Source badges */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs">
              <span className="text-base">G</span> Google Reviews
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs">
              <span className="text-base">🦉</span> TripAdvisor
            </span>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {visible.map((review, i) => (
            <ReviewCard key={review.id} review={review} isActive={i === 1} />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-pizza-red hover:border-pizza-red text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {Array.from({ length: REVIEWS.length - 2 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  i === activeIndex ? "bg-pizza-red w-6" : "bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-pizza-red hover:border-pizza-red text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
