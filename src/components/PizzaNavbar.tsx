import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, Phone, Clock } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import CartDrawer from "@/components/CartDrawer";

const navLinks = [
  { label: "Menu", href: "#menu" },
  { label: "Offerte", href: "#specialites" },
  { label: "Galleria", href: "#galerie" },
  { label: "Recensioni", href: "#avis" },
  { label: "Contatti", href: "#contact" },
];

export default function PizzaNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, toggleCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="hidden md:flex items-center justify-between bg-[#1a0500] px-8 py-2 text-xs text-orange-300">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            Aperto tutti i giorni: 07:00 – 23:30
          </span>
          <a href="tel:+393938998615" className="flex items-center gap-1.5 hover:text-orange-200">
            <Phone className="w-3 h-3" />
            +39 393 899 8615
          </a>
        </div>
        <span className="text-orange-400 font-medium animate-pulse">
          🔥 Forno a legna · Via Giuseppe Garibaldi, Lipari · Isole Eolie
        </span>
      </div>

      {/* Main navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0d0300]/95 backdrop-blur-md shadow-2xl shadow-red-950/30 py-3 md:top-0"
            : "bg-transparent py-5 md:top-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <span className="text-4xl pizza-spin cursor-pointer select-none">🍕</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-70" />
            </div>
            <div>
              <p className="font-playfair text-lg font-bold leading-tight">
                <span className="text-fire">Pizzeria</span>{" "}
                <span className="text-white">Siciliana</span>
              </p>
              <p className="text-[10px] text-orange-400 tracking-[0.18em] uppercase font-medium">
                Bar · Lipari · Eolie
              </p>
            </div>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-white/80 hover:text-orange-400 transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-full rounded-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + Cart */}
          <div className="flex items-center gap-3">
            <a
              href="#menu"
              className="hidden md:inline-flex items-center gap-2 bg-fire text-white text-sm font-semibold px-5 py-2.5 rounded-full glow-fire-sm hover:opacity-90 transition-all hover:scale-105 active:scale-95"
            >
              Ordina Ora
            </a>

            <button
              onClick={toggleCart}
              className="relative p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all hover:scale-105 active:scale-95 border border-white/10"
              aria-label="Carrello"
            >
              <ShoppingCart className="w-5 h-5 text-white" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-fire text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce-in glow-fire-sm">
                  {count}
                </span>
              )}
            </button>

            <button
              className="md:hidden p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#0d0300]/98 backdrop-blur-lg border-t border-white/10 animate-slide-up">
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/80 hover:text-orange-400 text-lg font-medium py-2 border-b border-white/5 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#menu"
                className="mt-2 inline-flex items-center justify-center bg-fire text-white font-semibold py-3 rounded-full glow-fire-sm"
                onClick={() => setMobileOpen(false)}
              >
                🍕 Ordina Adesso
              </a>
              <div className="text-center text-xs text-orange-400 mt-2 space-y-1">
                <p>📞 +39 393 899 8615</p>
                <p>📍 Via Giuseppe Garibaldi, Lipari</p>
                <p>🕐 Aperto tutti i giorni 07:00 – 23:30</p>
              </div>
            </div>
          </div>
        )}
      </nav>

      <CartDrawer />
    </>
  );
}
