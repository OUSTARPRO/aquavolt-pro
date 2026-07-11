import { useState, FormEvent } from "react";
import { Phone, MapPin, Clock, Send, MessageCircle, CheckCircle } from "lucide-react";

const HOURS = [
  { day: "Lundi – Vendredi", hours: "11h30 – 23h00" },
  { day: "Samedi", hours: "11h30 – 23h30" },
  { day: "Dimanche", hours: "12h00 – 22h30" },
];

export default function PizzaContact() {
  const [form, setForm] = useState({ name: "", phone: "", date: "", guests: "2", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleWhatsApp = () => {
    const msg = `Bonjour La Bella Pizza ! 🍕\n\nJe souhaite réserver une table :\n👤 Nom : ${form.name || "..."}\n📅 Date : ${form.date || "..."}\n👥 Personnes : ${form.guests}\n📞 Téléphone : ${form.phone || "..."}${form.message ? `\n💬 Message : ${form.message}` : ""}`;
    window.open(`https://wa.me/33123456789?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section id="contact" className="py-20 bg-[#0d0300] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-600/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-950/50 border border-red-700/40 text-orange-400 text-sm font-medium mb-4">
            <MapPin className="w-4 h-4" />
            Nous Rejoindre
          </div>
          <h2 className="font-playfair text-4xl sm:text-5xl font-black text-white mb-4">
            Réservez <span className="text-fire italic">Votre Table</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Réservation gratuite, annulation possible jusqu'à 2h avant. Nous vous répondons dans les 10 minutes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* LEFT: Infos + map */}
          <div className="space-y-6">
            {/* Info cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <a href="tel:+33123456789" className="group flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-orange-500/40 hover:bg-white/8 transition-all">
                <div className="w-12 h-12 rounded-xl bg-fire flex items-center justify-center glow-fire-sm flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wide">Téléphone</p>
                  <p className="text-white font-semibold group-hover:text-orange-300 transition-colors">+33 1 23 45 67 89</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wide">Adresse</p>
                  <p className="text-white font-semibold text-sm">12 Rue de la Paix, Paris 1er</p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-orange-400 font-semibold mb-3">
                <Clock className="w-4 h-4" />
                Horaires d'ouverture
              </div>
              {HOURS.map((h) => (
                <div key={h.day} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                  <span className="text-white/60 text-sm">{h.day}</span>
                  <span className="text-white font-medium text-sm">{h.hours}</span>
                </div>
              ))}
              <div className="pt-2 flex items-center gap-2 text-green-400 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Ouvert maintenant · Ferme à 23h00
              </div>
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 h-48 flex items-center justify-center relative">
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,150,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,150,0,0.3) 1px, transparent 1px)",
                  backgroundSize: "30px 30px"
                }} />
              <div className="relative text-center">
                <div className="text-5xl mb-2 animate-float">📍</div>
                <p className="text-white/70 font-medium">12 Rue de la Paix</p>
                <p className="text-white/40 text-sm">Paris 1er · Métro Concorde</p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-xs text-orange-400 hover:text-orange-300 underline"
                >
                  Ouvrir dans Google Maps →
                </a>
              </div>
            </div>

            {/* WhatsApp quick */}
            <a
              href="https://wa.me/33123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl hover:bg-[#25D366]/20 transition-all group"
            >
              <div className="w-10 h-10 bg-[#25D366] rounded-xl flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-[#25D366] font-bold text-sm">Commandez via WhatsApp</p>
                <p className="text-white/40 text-xs">Réponse en moins de 5 minutes · Livraison ou à emporter</p>
              </div>
              <span className="text-white/30 group-hover:text-white/60 transition-colors">→</span>
            </a>
          </div>

          {/* RIGHT: Reservation form */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-12">
                <div className="w-20 h-20 rounded-full bg-green-600/20 border-2 border-green-500 flex items-center justify-center animate-bounce-in">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-white">Réservation Confirmée !</h3>
                <p className="text-white/60 text-sm max-w-xs">
                  Nous vous rappellerons dans les 10 minutes pour confirmer votre table. À très bientôt !
                </p>
                <span className="text-5xl animate-float">🍕</span>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-orange-400 hover:text-orange-300 underline text-sm"
                >
                  Faire une autre réservation
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-playfair text-2xl font-bold text-white mb-6">
                  Réserver une table 🍽️
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/50 uppercase tracking-wide block mb-1.5">Votre Nom *</label>
                    <input
                      required
                      type="text"
                      placeholder="Jean Dupont"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/60 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 uppercase tracking-wide block mb-1.5">Téléphone *</label>
                    <input
                      required
                      type="tel"
                      placeholder="+33 6 12 34 56 78"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/60 transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/50 uppercase tracking-wide block mb-1.5">Date & Heure *</label>
                    <input
                      required
                      type="datetime-local"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/60 transition-all text-sm [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 uppercase tracking-wide block mb-1.5">Nombre de personnes *</label>
                    <select
                      value={form.guests}
                      onChange={(e) => setForm({ ...form, guests: e.target.value })}
                      className="w-full bg-[#1a0500] border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/60 transition-all text-sm"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, "9+"].map((n) => (
                        <option key={n} value={n}>{n} personne{Number(n) > 1 ? "s" : ""}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-white/50 uppercase tracking-wide block mb-1.5">Message (optionnel)</label>
                  <textarea
                    rows={3}
                    placeholder="Occasion spéciale, allergie, demande particulière..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/60 transition-all text-sm resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 bg-fire text-white font-bold py-3.5 rounded-2xl hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all glow-fire-sm disabled:opacity-60"
                  >
                    {loading ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Envoi...</>
                    ) : (
                      <><Send className="w-4 h-4" /> Confirmer la réservation</>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3.5 px-5 rounded-2xl hover:opacity-90 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </button>
                </div>

                <p className="text-white/30 text-xs text-center">
                  🔒 Vos données ne sont jamais partagées · Annulation gratuite
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
