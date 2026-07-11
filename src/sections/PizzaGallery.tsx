import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";

const GALLERY_ITEMS = [
  { emoji: "🍕", label: "Margherita Classica", description: "Tomate · Mozzarella · Basilic" },
  { emoji: "🔥", label: "Four à Bois", description: "Temperature 450°C · Cuisson 90 secondes" },
  { emoji: "🍝", label: "Spaghetti Carbonara", description: "Guanciale · Œuf · Pecorino" },
  { emoji: "🧀", label: "Quattro Formaggi", description: "4 fromages sélectionnés" },
  { emoji: "🥗", label: "Burrata di Puglia", description: "Tomates · Pesto · Croûtons" },
  { emoji: "☕", label: "Tiramisù Classico", description: "Mascarpone · Café · Cacao" },
  { emoji: "🫓", label: "Calzone al Forno", description: "Jambon · Ricotta · Épinards" },
  { emoji: "🍺", label: "Terrasse & Ambiance", description: "Restaurant & bar ouvert jusqu'à 23h" },
  { emoji: "👨‍🍳", label: "Notre Chef", description: "12 ans d'expérience à Naples" },
];

const COLORS = [
  "from-red-900/50 to-orange-900/50",
  "from-orange-900/50 to-yellow-900/50",
  "from-red-800/50 to-rose-900/50",
  "from-amber-900/50 to-orange-900/50",
  "from-green-900/50 to-teal-900/50",
  "from-brown-900/50 to-amber-900/50",
  "from-red-900/50 to-pink-900/50",
  "from-orange-900/50 to-red-900/50",
  "from-yellow-900/50 to-orange-900/50",
];

export default function PizzaGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () => setLightbox((l) => (l !== null ? (l - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null));
  const next = () => setLightbox((l) => (l !== null ? (l + 1) % GALLERY_ITEMS.length : null));

  return (
    <section id="galerie" className="py-20 bg-[#0d0300] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-600/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-950/50 border border-red-700/40 text-orange-400 text-sm font-medium mb-4">
            <Camera className="w-4 h-4" />
            Notre Univers
          </div>
          <h2 className="font-playfair text-4xl sm:text-5xl font-black text-white mb-4">
            La <span className="text-fire italic">Galerie</span>
          </h2>
          <p className="text-white/50 text-lg max-w-lg mx-auto">
            Plongez dans l'atmosphère de La Bella Pizza, de nos cuisines à votre table.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-orange-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-950/50 ${
                i === 0 || i === 4 ? "md:col-span-1 aspect-square" : "aspect-square"
              } ${i === 7 ? "col-span-2 md:col-span-1" : ""}`}
              onClick={() => setLightbox(i)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${COLORS[i % COLORS.length]}`} />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <span
                  className="text-7xl sm:text-8xl group-hover:scale-110 transition-transform duration-500 select-none"
                  style={{ filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.5))" }}
                >
                  {item.emoji}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-playfair text-white font-bold text-lg leading-tight">{item.label}</p>
                  <p className="text-white/70 text-xs mt-1">{item.description}</p>
                </div>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="mt-10 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-white/20 text-white/70 hover:text-white hover:border-orange-500/50 hover:bg-white/5 transition-all text-sm font-medium"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Suivez-nous sur Instagram @labella_pizza
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button
            className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            className="absolute right-16 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <div className="text-center animate-bounce-in" onClick={(e) => e.stopPropagation()}>
            <div className="text-[150px] mb-4 select-none"
              style={{ filter: "drop-shadow(0 0 40px rgba(230,48,0,0.5))" }}>
              {GALLERY_ITEMS[lightbox].emoji}
            </div>
            <h3 className="font-playfair text-2xl font-bold text-white">{GALLERY_ITEMS[lightbox].label}</h3>
            <p className="text-white/60 mt-2">{GALLERY_ITEMS[lightbox].description}</p>
            <p className="text-white/30 text-xs mt-4">{lightbox + 1} / {GALLERY_ITEMS.length}</p>
          </div>
        </div>
      )}
    </section>
  );
}
