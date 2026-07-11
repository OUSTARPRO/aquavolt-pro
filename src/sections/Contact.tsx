import { useState } from "react";
import { MapPin, Phone, Clock, Instagram, Facebook, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const HOURS = [
  { day: "Lundi — Vendredi", time: "11h30 — 14h30 · 18h30 — 23h00" },
  { day: "Samedi", time: "11h30 — 23h30 (non-stop)" },
  { day: "Dimanche", time: "12h00 — 22h00" },
];

const GALLERY_PHOTOS = [
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&q=80",
  "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&q=80",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&q=80",
  "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=300&q=80",
  "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&q=80",
  "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=300&q=80",
];

function InfoCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 p-5 rounded-2xl bg-[#1a1008] border border-white/5 hover:border-pizza-red/20 transition-colors">
      <div className="w-11 h-11 rounded-xl bg-pizza-red/10 border border-pizza-red/20 flex items-center justify-center text-pizza-red flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="text-white font-semibold mb-1">{title}</h4>
        <div className="text-white/50 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export default function ContactAndReservation() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", persons: "2", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      {/* Chef Story / About Section */}
      <section className="py-24 bg-[#150d06] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pizza-gold/30 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Photos mosaic */}
            <div className="relative">
              <div className="grid grid-cols-3 gap-3">
                {GALLERY_PHOTOS.map((src, i) => (
                  <div
                    key={i}
                    className={`overflow-hidden rounded-xl ${i === 0 ? "col-span-2 row-span-1" : ""} card-hover`}
                  >
                    <img
                      src={src}
                      alt={`Pizza ${i + 1}`}
                      className="w-full h-full object-cover aspect-square hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-pizza-red rounded-2xl p-4 shadow-2xl shadow-pizza-red/30">
                <div className="text-4xl font-bold text-white font-playfair">37</div>
                <div className="text-white/80 text-xs">ans de passion</div>
              </div>
            </div>

            {/* Story */}
            <div>
              <p className="text-pizza-red font-medium text-sm uppercase tracking-widest mb-4">
                — Notre Histoire —
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-white font-playfair mb-6 leading-tight">
                L'Art de la Pizza{" "}
                <span className="italic text-shimmer">Napolitaine</span>
              </h2>
              <p className="text-white/60 leading-relaxed mb-4">
                Fondée en 1987 par Domenico Esposito, arrivé directement de Naples avec sa recette familiale, 
                La Bella Napoli est devenue une institution locale. Domenico a transmis son savoir-faire à ses enfants, 
                qui perpétuent aujourd'hui la tradition avec la même passion.
              </p>
              <p className="text-white/60 leading-relaxed mb-8">
                Notre four à bois, importé d'Italie, atteint 450°C et cuit chaque pizza en seulement 90 secondes, 
                créant cette croûte légèrement brûlée et ce cœur moelleux qui font notre signature. 
                Chaque ingrédient est soigneusement sélectionné : tomates San Marzano, mozzarella di bufala, 
                basilic frais cueilli le matin.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-pizza-red/10 border border-pizza-red/20 text-pizza-red-light text-sm font-medium">
                  🔥 Four à bois 450°C
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-pizza-gold/10 border border-pizza-gold/20 text-pizza-gold text-sm font-medium">
                  🫙 Pâte levée 72h
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-900/30 border border-green-600/20 text-green-400 text-sm font-medium">
                  🌿 Ingrédients frais
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-medium">
                  🇮🇹 Recette napolitaine
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation + Contact */}
      <section id="reservation" className="py-24 bg-pizza-dark relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pizza-red/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-pizza-red font-medium text-sm uppercase tracking-widest mb-3">
              — Réservation & Contact —
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white font-playfair mb-4">
              Réservez <span className="italic text-shimmer">Votre Table</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="p-8 rounded-3xl bg-[#1a1008] border border-white/5">
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold text-white font-playfair mb-2">
                    Réservation confirmée !
                  </h3>
                  <p className="text-white/50">
                    Nous vous contacterons sous 24h pour confirmer votre table.
                    À très bientôt chez La Bella Napoli !
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 text-pizza-red text-sm hover:text-pizza-red-light transition-colors underline"
                  >
                    Faire une autre réservation
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/60 text-sm mb-2 block">Nom complet *</label>
                      <Input
                        required
                        placeholder="Jean Dupont"
                        value={form.name}
                        onChange={e => setForm({...form, name: e.target.value})}
                        className="bg-[#120d08] border-white/10 text-white placeholder:text-white/30 focus:border-pizza-red/50 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-sm mb-2 block">Téléphone *</label>
                      <Input
                        required
                        placeholder="+33 6 12 34 56 78"
                        value={form.phone}
                        onChange={e => setForm({...form, phone: e.target.value})}
                        className="bg-[#120d08] border-white/10 text-white placeholder:text-white/30 focus:border-pizza-red/50 rounded-xl"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Email</label>
                    <Input
                      type="email"
                      placeholder="jean@exemple.fr"
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                      className="bg-[#120d08] border-white/10 text-white placeholder:text-white/30 focus:border-pizza-red/50 rounded-xl"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/60 text-sm mb-2 block">Date souhaitée *</label>
                      <Input
                        required
                        type="date"
                        value={form.date}
                        onChange={e => setForm({...form, date: e.target.value})}
                        className="bg-[#120d08] border-white/10 text-white focus:border-pizza-red/50 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-sm mb-2 block">Nombre de personnes</label>
                      <select
                        value={form.persons}
                        onChange={e => setForm({...form, persons: e.target.value})}
                        className="w-full h-10 bg-[#120d08] border border-white/10 text-white rounded-xl px-3 text-sm focus:border-pizza-red/50 focus:outline-none"
                      >
                        {[1,2,3,4,5,6,7,8,9,10].map(n => (
                          <option key={n} value={n}>{n} {n === 1 ? "personne" : "personnes"}</option>
                        ))}
                        <option value="10+">10+ personnes</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Message / Demande spéciale</label>
                    <Textarea
                      placeholder="Allergie, occasion spéciale, demande particulière..."
                      value={form.message}
                      onChange={e => setForm({...form, message: e.target.value})}
                      className="bg-[#120d08] border-white/10 text-white placeholder:text-white/30 focus:border-pizza-red/50 rounded-xl resize-none"
                      rows={3}
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-pizza-red hover:bg-pizza-red-dark text-white rounded-xl font-semibold text-base py-6 shadow-xl shadow-pizza-red/20 hover:scale-105 transition-all duration-300"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Confirmer la Réservation
                  </Button>
                </form>
              )}
            </div>

            {/* Info + Map */}
            <div className="space-y-5">
              <InfoCard icon={<MapPin className="w-5 h-5" />} title="Adresse">
                12 Rue de la Paix, 75001 Paris<br />
                <span className="text-pizza-red-light text-xs">Métro : Concorde (ligne 1, 8, 12)</span>
              </InfoCard>

              <InfoCard icon={<Phone className="w-5 h-5" />} title="Téléphone & Livraison">
                <a href="tel:+33123456789" className="hover:text-pizza-red-light transition-colors">
                  +33 1 23 45 67 89
                </a>
                <br />
                <span className="text-xs">Ou commandez sur notre app</span>
              </InfoCard>

              <InfoCard icon={<Clock className="w-5 h-5" />} title="Horaires d'ouverture">
                {HOURS.map((h, i) => (
                  <div key={i} className="flex justify-between gap-4 py-0.5">
                    <span className="text-white/40">{h.day}</span>
                    <span className="text-white/70 text-right">{h.time}</span>
                  </div>
                ))}
              </InfoCard>

              {/* Social media */}
              <div className="p-5 rounded-2xl bg-[#1a1008] border border-white/5">
                <h4 className="text-white font-semibold mb-3">Suivez-nous</h4>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-br from-pink-500 to-orange-500 text-white text-sm font-medium hover:scale-105 transition-transform"
                  >
                    <Instagram className="w-4 h-4" />
                    @labellanapoli
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:scale-105 transition-transform"
                  >
                    <Facebook className="w-4 h-4" />
                    La Bella Napoli
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/33123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-5 rounded-2xl bg-green-600/10 border border-green-600/20 hover:bg-green-600/20 transition-colors group"
              >
                <span className="text-3xl">💬</span>
                <div>
                  <p className="text-white font-semibold group-hover:text-green-400 transition-colors">
                    Commander via WhatsApp
                  </p>
                  <p className="text-white/50 text-sm">Réponse en moins de 5 minutes</p>
                </div>
                <div className="ml-auto w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
