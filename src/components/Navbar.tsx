import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Menu", href: "#menu" },
  { label: "Offres", href: "#offres" },
  { label: "Avis", href: "#avis" },
  { label: "Notre Histoire", href: "#histoire" },
  { label: "Contact", href: "#reservation" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-pizza-dark/95 backdrop-blur-xl shadow-2xl shadow-black/50 border-b border-pizza-red/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <span className="text-3xl group-hover:animate-wiggle">🍕</span>
            <div>
              <div className="text-xl font-bold text-white font-playfair leading-none">
                La{" "}
                <span className="italic text-pizza-red-light">Bella</span>
                {" "}Napoli
              </div>
              <div className="text-xs text-white/40 tracking-widest uppercase font-inter">
                Pizzeria Artisanale
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-pizza-red rounded-full transition-all duration-300 group-hover:w-4/5" />
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+33123456789"
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
            >
              <Phone className="w-4 h-4 text-pizza-red" />
              01 23 45 67 89
            </a>
            <a href="#reservation">
              <Button
                size="sm"
                className="bg-pizza-red hover:bg-pizza-red-dark text-white rounded-full px-5 font-semibold shadow-lg shadow-pizza-red/25 hover:scale-105 transition-all"
              >
                Réserver
              </Button>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-pizza-dark/98 backdrop-blur-xl border-t border-white/5`}
      >
        <div className="px-4 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-white/10">
            <a href="#reservation" onClick={() => setMobileOpen(false)}>
              <Button className="w-full bg-pizza-red hover:bg-pizza-red-dark text-white rounded-xl font-semibold">
                Réserver une table
              </Button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
