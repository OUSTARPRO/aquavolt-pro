import { Instagram, Facebook, MapPin, Phone, Clock } from "lucide-react";

const MENU_LINKS = [
  { label: "Pizzas Classiques", href: "#menu" },
  { label: "Pizzas Spéciales", href: "#menu" },
  { label: "Végétariennes", href: "#menu" },
  { label: "Calzones", href: "#menu" },
  { label: "Nos Offres", href: "#offres" },
];

const INFO_LINKS = [
  { label: "Notre Histoire", href: "#histoire" },
  { label: "Avis Clients", href: "#avis" },
  { label: "Réservation", href: "#reservation" },
  { label: "Livraison", href: "#reservation" },
  { label: "Contact", href: "#reservation" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0d0805] border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
      {/* Background pizza emoji watermark */}
      <div className="absolute right-10 top-10 text-[15rem] opacity-[0.02] select-none pointer-events-none font-serif">
        🍕
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2.5 mb-5 group">
              <span className="text-3xl group-hover:animate-wiggle">🍕</span>
              <div>
                <div className="text-xl font-bold text-white font-playfair leading-none">
                  La{" "}
                  <span className="italic text-pizza-red-light">Bella</span>
                  {" "}Napoli
                </div>
                <div className="text-xs text-white/30 tracking-widest uppercase">
                  Pizzeria Artisanale
                </div>
              </div>
            </a>
            <p className="text-white/40 text-sm leading-relaxed mb-5">
              Depuis 1987, nous perpétuons la tradition napolitaine avec passion.
              Four à bois, ingrédients frais, savoir-faire transmis de génération en génération.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://wa.me/33123456789"
                className="w-9 h-9 rounded-lg bg-green-600 flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="WhatsApp"
              >
                <span className="text-white text-sm font-bold">W</span>
              </a>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h3 className="text-white font-semibold mb-4 font-playfair">Notre Menu</h3>
            <ul className="space-y-2.5">
              {MENU_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/40 hover:text-pizza-red-light text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-pizza-red opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Infos */}
          <div>
            <h3 className="text-white font-semibold mb-4 font-playfair">Informations</h3>
            <ul className="space-y-2.5">
              {INFO_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/40 hover:text-pizza-red-light text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-pizza-red opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-white font-semibold mb-4 font-playfair">Nous Trouver</h3>
            <div className="space-y-3">
              <div className="flex gap-3 text-sm text-white/40">
                <MapPin className="w-4 h-4 text-pizza-red flex-shrink-0 mt-0.5" />
                <span>12 Rue de la Paix<br />75001 Paris, France</span>
              </div>
              <div className="flex gap-3 text-sm text-white/40">
                <Phone className="w-4 h-4 text-pizza-red flex-shrink-0 mt-0.5" />
                <a href="tel:+33123456789" className="hover:text-pizza-red-light transition-colors">
                  +33 1 23 45 67 89
                </a>
              </div>
              <div className="flex gap-3 text-sm text-white/40">
                <Clock className="w-4 h-4 text-pizza-red flex-shrink-0 mt-0.5" />
                <div>
                  Lun–Ven : 11h30–23h<br />
                  Sam : 11h30–23h30<br />
                  Dim : 12h–22h
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-sm">
            © {new Date().getFullYear()} La Bella Napoli. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 text-white/20 text-xs">
            <a href="#" className="hover:text-white/40 transition-colors">Mentions légales</a>
            <span>·</span>
            <a href="#" className="hover:text-white/40 transition-colors">Politique de confidentialité</a>
          </div>
          <p className="text-white/10 text-xs">
            🔥 Cuit au feu de bois depuis 1987
          </p>
        </div>
      </div>
    </footer>
  );
}
