import { useEffect, useMemo, useState } from "react";

type MenuItem = {
  name: string;
  description: string;
  price: string;
  tag: string;
};

const menuItems: MenuItem[] = [
  {
    name: "Diavola Fire",
    description: "Sauce tomate San Marzano, mozzarella fior di latte, salami piquant, miel au piment.",
    price: "109 MAD",
    tag: "Best-seller",
  },
  {
    name: "Truffe Royale",
    description: "Crème truffée, champignons sautés, burrata et parmesan affiné 24 mois.",
    price: "139 MAD",
    tag: "Signature",
  },
  {
    name: "Margherita Classica",
    description: "Tomate fraîche, basilic du jour, mozzarella artisanale, huile d'olive premium.",
    price: "89 MAD",
    tag: "Classique",
  },
  {
    name: "Pollo Smoky",
    description: "Base barbecue maison, poulet mariné, oignons rouges, cheddar fumé.",
    price: "119 MAD",
    tag: "Nouveau",
  },
];

const benefits = [
  "Pâte maturée 48h pour une texture légère",
  "Ingrédients premium livrés chaque matin",
  "Livraison express + packaging haut de gamme",
  "Offres corporate et événements privés",
];

const socialProof = [
  { metric: "4.9/5", label: "note moyenne clients" },
  { metric: "2 300+", label: "commandes mensuelles" },
  { metric: "15 min", label: "temps moyen de cuisson" },
  { metric: "98%", label: "clients qui recommandent" },
];

export default function Home() {
  const [secondsLeft, setSecondsLeft] = useState(7 * 60 * 60 + 42 * 60 + 19);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const countdown = useMemo(() => {
    const h = Math.floor(secondsLeft / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((secondsLeft % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(secondsLeft % 60)
      .toString()
      .padStart(2, "0");

    return `${h}:${m}:${s}`;
  }, [secondsLeft]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08090f] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-red-500/20 blur-3xl" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-orange-600/15 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 pb-20 pt-8 md:px-10">
        <header className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-orange-300">Pizza Atelier</p>
            <h1 className="text-lg font-bold md:text-xl">Mamma Mio Pizzeria</h1>
          </div>
          <a
            href="https://wa.me/212600000000"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-4 py-2 text-sm font-semibold transition hover:scale-[1.03]"
          >
            Commander sur WhatsApp
          </a>
        </header>

        <section className="grid items-center gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-orange-300/30 bg-orange-500/15 px-3 py-1 text-xs font-medium text-orange-100">
              Démo premium pour nouveau client
            </span>
            <h2 className="text-4xl font-black leading-tight md:text-6xl">
              Le site pizzeria qui fait{" "}
              <span className="bg-gradient-to-r from-red-400 via-orange-300 to-amber-200 bg-clip-text text-transparent">
                saliver et convertir
              </span>
            </h2>
            <p className="max-w-xl text-base text-slate-300 md:text-lg">
              Une landing page qui vend: menu clair, preuve sociale forte, offre limitée et CTA WhatsApp instantané.
              Idéale pour convaincre ton client dès la première démo.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit} className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-slate-200">
                  ✅ {benefit}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#reservation"
                className="rounded-xl bg-gradient-to-r from-red-500 to-orange-500 px-5 py-3 font-semibold transition hover:scale-[1.03]"
              >
                Réserver maintenant
              </a>
              <a
                href="#menu"
                className="rounded-xl border border-white/20 px-5 py-3 font-semibold text-slate-200 transition hover:border-orange-300 hover:text-orange-200"
              >
                Voir le menu signature
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-5 shadow-2xl shadow-red-900/20">
            <div className="mb-5 rounded-2xl border border-red-300/30 bg-red-500/15 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-red-100">Offre lancement</p>
              <p className="mt-2 text-3xl font-black text-red-200">-25% ce soir</p>
              <p className="mt-1 text-sm text-red-100/90">Sur les 50 premières commandes en ligne.</p>
              <p className="mt-3 rounded-lg bg-black/30 px-3 py-2 font-mono text-lg tracking-[0.1em] text-amber-200">
                {countdown}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {socialProof.map((item) => (
                <div key={item.label} className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <p className="text-2xl font-bold text-orange-200">{item.metric}</p>
                  <p className="text-xs text-slate-300">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="menu" className="space-y-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-orange-300">Menu signature</p>
              <h3 className="text-3xl font-extrabold md:text-4xl">Nos pizzas stars</h3>
            </div>
            <p className="text-sm text-slate-300">Photos produit et commande directe possibles en V2.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {menuItems.map((item) => (
              <article
                key={item.name}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-orange-300/40 hover:bg-white/[0.08]"
              >
                <div className="mb-4 flex items-center justify-between gap-2">
                  <span className="rounded-full border border-orange-200/30 bg-orange-500/15 px-2.5 py-1 text-xs font-medium text-orange-100">
                    {item.tag}
                  </span>
                  <span className="text-lg font-bold text-orange-200">{item.price}</span>
                </div>
                <h4 className="text-xl font-bold">{item.name}</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.description}</p>
                <button
                  type="button"
                  className="mt-5 rounded-lg border border-white/20 px-3 py-2 text-sm font-semibold transition group-hover:border-orange-300 group-hover:text-orange-200"
                >
                  Ajouter au panier (démo)
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="reservation" className="grid gap-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:grid-cols-2 md:p-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-orange-300">Réservation smart</p>
            <h3 className="mt-2 text-3xl font-extrabold">Demande de table en 20 secondes</h3>
            <p className="mt-3 text-slate-300">
              Formulaire ultra simple pour capter des prospects chauds + relance WhatsApp automatique.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-slate-200">
              <li>• Confirmation instantanée</li>
              <li>• Intégration CRM / Google Sheets</li>
              <li>• Script de relance en cas d’abandon</li>
            </ul>
          </div>

          <form className="space-y-3 rounded-2xl border border-white/10 bg-black/25 p-4">
            <input
              type="text"
              placeholder="Nom complet"
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-orange-300"
            />
            <input
              type="tel"
              placeholder="Téléphone / WhatsApp"
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-orange-300"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none focus:border-orange-300"
              />
              <input
                type="time"
                className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none focus:border-orange-300"
              />
            </div>
            <input
              type="number"
              min={1}
              max={20}
              placeholder="Nombre de personnes"
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-orange-300"
            />
            <button
              type="button"
              className="w-full rounded-xl bg-gradient-to-r from-red-500 to-orange-500 py-2.5 text-sm font-bold transition hover:brightness-110"
            >
              Envoyer la demande (démo)
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
