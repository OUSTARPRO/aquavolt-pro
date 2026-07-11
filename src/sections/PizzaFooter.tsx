import { Heart, Phone, MapPin, Mail, Instagram, Facebook } from "lucide-react";

const FOOTER_LINKS = {
  "Notre Carte": ["Pizzas", "Pastas", "Entrées", "Desserts", "Boissons"],
  "La Pizzeria": ["Notre Histoire", "Notre Chef", "Le Four à Bois", "Ingrédients", "Franchise"],
  "Services": ["Livraison", "À Emporter", "Sur Place", "Traiteur", "Événements"],
};

export default function PizzaFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#050100] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🍕</span>
              <div>
                <p className="font-playfair text-xl font-bold">
                  <span className="text-fire">La Bella</span>{" "}
                  <span className="text-white">Pizza</span>
                </p>
                <p className="text-[10px] text-orange-400 tracking-[0.2em] uppercase">Artisanale · Authentique</p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Depuis 2012, nous perpétuons la tradition napolitaine avec passion.
              Chaque pizza est une œuvre d'art culinaire.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-pink-600/30 border border-white/10 hover:border-pink-500/50 flex items-center justify-center transition-all group">
                <Instagram className="w-4 h-4 text-white/60 group-hover:text-pink-400 transition-colors" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-blue-600/30 border border-white/10 hover:border-blue-500/50 flex items-center justify-center transition-all group">
                <Facebook className="w-4 h-4 text-white/60 group-hover:text-blue-400 transition-colors" />
              </a>
              <a
                href="https://wa.me/33123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-green-600/30 border border-white/10 hover:border-green-500/50 flex items-center justify-center transition-all group"
              >
                <svg className="w-4 h-4 text-white/60 group-hover:text-green-400 transition-colors fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold mb-4 text-sm">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white/40 text-sm hover:text-orange-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact bar */}
        <div className="flex flex-wrap gap-6 py-8 border-y border-white/5 mb-8">
          <a href="tel:+33123456789" className="flex items-center gap-2 text-white/50 hover:text-orange-400 transition-colors text-sm">
            <Phone className="w-4 h-4" />
            +33 1 23 45 67 89
          </a>
          <span className="flex items-center gap-2 text-white/50 text-sm">
            <MapPin className="w-4 h-4" />
            12 Rue de la Paix, Paris 1er
          </span>
          <a href="mailto:contact@labella-pizza.fr" className="flex items-center gap-2 text-white/50 hover:text-orange-400 transition-colors text-sm">
            <Mail className="w-4 h-4" />
            contact@labella-pizza.fr
          </a>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/30 text-xs">
          <p>© {year} La Bella Pizza · Tous droits réservés</p>
          <p className="flex items-center gap-1">
            Fait avec <Heart className="w-3 h-3 text-red-500 fill-red-500 mx-0.5" /> et beaucoup de 🍅
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white/60 transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white/60 transition-colors">CGV</a>
            <a href="#" className="hover:text-white/60 transition-colors">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
