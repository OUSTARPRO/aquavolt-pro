import { useState, FormEvent } from "react";
import { Phone, MapPin, Clock, Send, MessageCircle, CheckCircle } from "lucide-react";

const HOURS = [
  { day: "Tutti i giorni", hours: "07:00 – 23:30" },
  { day: "Cucina", hours: "11:30 – 23:00" },
  { day: "Bar & Colazione", hours: "07:00 – 11:30" },
];

export default function PizzaContact() {
  const [form, setForm] = useState({ name: "", phone: "", date: "", guests: "2", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  const handleWhatsApp = () => {
    const msg = `Ciao Pizzeria Siciliana Bar! 🍕\n\nVorrei prenotare un tavolo:\n👤 Nome: ${form.name || "..."}\n📅 Data: ${form.date || "..."}\n👥 Persone: ${form.guests}\n📞 Telefono: ${form.phone || "..."}${form.message ? `\n💬 Messaggio: ${form.message}` : ""}`;
    window.open(`https://wa.me/393938998615?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section id="contact" className="py-20 bg-[#0d0300] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-600/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-950/50 border border-red-700/40 text-orange-400 text-sm font-medium mb-4">
            <MapPin className="w-4 h-4" />
            Dove Siamo
          </div>
          <h2 className="font-playfair text-4xl sm:text-5xl font-black text-white mb-4">
            Prenota il <span className="text-fire italic">Tuo Tavolo</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Prenotazione gratuita, cancellazione fino a 2 ore prima. Rispondiamo in pochi minuti!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* LEFT */}
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <a href="tel:+393938998615" className="group flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-orange-500/40 hover:bg-white/8 transition-all">
                <div className="w-12 h-12 rounded-xl bg-fire flex items-center justify-center glow-fire-sm flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wide">Telefono</p>
                  <p className="text-white font-semibold group-hover:text-orange-300 transition-colors">+39 393 899 8615</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wide">Indirizzo</p>
                  <p className="text-white font-semibold text-sm">Via G. Garibaldi, Lipari ME</p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-orange-400 font-semibold mb-3">
                <Clock className="w-4 h-4" />
                Orari di Apertura
              </div>
              {HOURS.map((h) => (
                <div key={h.day} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                  <span className="text-white/60 text-sm">{h.day}</span>
                  <span className="text-white font-medium text-sm">{h.hours}</span>
                </div>
              ))}
              <div className="pt-2 flex items-center gap-2 text-green-400 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Aperto tutti i giorni · Inclusi festivi
              </div>
            </div>

            {/* Map placeholder - Lipari */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 h-48 flex items-center justify-center relative">
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: "linear-gradient(rgba(0,150,230,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,150,230,0.3) 1px, transparent 1px)",
                  backgroundSize: "30px 30px"
                }} />
              <div className="relative text-center">
                <div className="text-5xl mb-2 animate-float">🌋</div>
                <p className="text-white/70 font-medium">Via Giuseppe Garibaldi</p>
                <p className="text-white/40 text-sm">Lipari, 98055 ME · Isole Eolie</p>
                <a
                  href="https://maps.google.com/?q=Pizzeria+Siciliana+Bar+Lipari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-xs text-orange-400 hover:text-orange-300 underline"
                >
                  Apri su Google Maps →
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/393938998615"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl hover:bg-[#25D366]/20 transition-all group"
            >
              <div className="w-10 h-10 bg-[#25D366] rounded-xl flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-[#25D366] font-bold text-sm">Ordina via WhatsApp</p>
                <p className="text-white/40 text-xs">Risposta in pochi minuti · Asporto o tavolo</p>
              </div>
              <span className="text-white/30 group-hover:text-white/60 transition-colors">→</span>
            </a>
          </div>

          {/* RIGHT: Form */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-12">
                <div className="w-20 h-20 rounded-full bg-green-600/20 border-2 border-green-500 flex items-center justify-center animate-bounce-in">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-white">Prenotazione Confermata!</h3>
                <p className="text-white/60 text-sm max-w-xs">
                  Vi richiameremo entro pochi minuti per confermare il vostro tavolo. A presto!
                </p>
                <span className="text-5xl animate-float">🍕</span>
                <button onClick={() => setSubmitted(false)} className="mt-2 text-orange-400 hover:text-orange-300 underline text-sm">
                  Altra prenotazione
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-playfair text-2xl font-bold text-white mb-6">
                  Prenota un Tavolo 🍽️
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/50 uppercase tracking-wide block mb-1.5">Nome *</label>
                    <input required type="text" placeholder="Mario Rossi"
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/60 transition-all text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 uppercase tracking-wide block mb-1.5">Telefono *</label>
                    <input required type="tel" placeholder="+39 393 899 8615"
                      value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/60 transition-all text-sm" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/50 uppercase tracking-wide block mb-1.5">Data & Ora *</label>
                    <input required type="datetime-local"
                      value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/60 transition-all text-sm [color-scheme:dark]" />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 uppercase tracking-wide block mb-1.5">Numero persone *</label>
                    <select value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })}
                      className="w-full bg-[#1a0500] border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/60 transition-all text-sm">
                      {[1, 2, 3, 4, 5, 6, 7, 8, "9+"].map((n) => (
                        <option key={n} value={n}>{n} persona{Number(n) > 1 ? "e" : ""}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-white/50 uppercase tracking-wide block mb-1.5">Messaggio (opzionale)</label>
                  <textarea rows={3} placeholder="Occasione speciale, allergie, richieste..."
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/60 transition-all text-sm resize-none" />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button type="submit" disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 bg-fire text-white font-bold py-3.5 rounded-2xl hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all glow-fire-sm disabled:opacity-60">
                    {loading
                      ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Invio...</>
                      : <><Send className="w-4 h-4" /> Conferma prenotazione</>}
                  </button>
                  <button type="button" onClick={handleWhatsApp}
                    className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3.5 px-5 rounded-2xl hover:opacity-90 transition-all">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </button>
                </div>

                <p className="text-white/30 text-xs text-center">
                  🔒 I vostri dati non vengono mai condivisi · Cancellazione gratuita
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
