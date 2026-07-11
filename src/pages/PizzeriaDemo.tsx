import { useState } from "react";
import {
  ArrowRight,
  ChefHat,
  Clock3,
  Flame,
  MapPin,
  MessageCircle,
  Phone,
  Pizza,
  Sparkles,
  Star,
  Timer,
} from "lucide-react";

const signaturePizzas = [
  {
    name: "Truffe Royale",
    description: "Crème de truffe, mozzarella fior di latte, champignons frais",
    price: "18€",
    accent: "from-amber-400 to-orange-500",
  },
  {
    name: "Diavola Inferno",
    description: "Sauce tomate maison, spianata piquante, piment frais, burrata",
    price: "16€",
    accent: "from-rose-500 to-red-600",
  },
  {
    name: "Verde Burrata",
    description: "Pesto basilic, tomates confites, roquette, burrata crémeuse",
    price: "17€",
    accent: "from-emerald-400 to-lime-500",
  },
];

const testimonials = [
  {
    quote: "La meilleure pâte de la ville. Croustillante dehors, ultra légère dedans.",
    name: "Yasmine R.",
  },
  {
    quote: "Livraison rapide, pizza chaude et service super pro.",
    name: "Hamza K.",
  },
  {
    quote: "On a commandé pour 20 personnes, zéro retard, qualité parfaite.",
    name: "Sofia M.",
  },
];

const quickFacts = [
  { value: "90s", label: "pour commander" },
  { value: "12m", label: "temps moyen de cuisson" },
  { value: "4.9/5", label: "note clients" },
];

const messageTemplate = `Salut 👋\nJe te partage une démo premium de site pizzeria.\nOn peut personnaliser les couleurs, le menu, WhatsApp et les réservations en 24h.\nTu veux qu'on fasse la version exacte de ton restaurant ?`;

export default function PizzeriaDemo() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(messageTemplate);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-red-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-sm text-orange-200">
          <Sparkles className="h-4 w-4" />
          Démo client premium • Pizzeria
        </div>

        <section className="mt-8 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
              Une landing page{" "}
              <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-red-500 bg-clip-text text-transparent">
                qui donne faim
              </span>{" "}
              et convertit.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-300">
              Design moderne, menu ultra lisible, preuve sociale et CTA WhatsApp.
              Cette démo est prête à être personnalisée pour ton nouveau client.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://wa.me/212600000000"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 font-semibold text-white shadow-xl shadow-red-700/25 transition hover:scale-[1.02]"
              >
                <MessageCircle className="h-4 w-4" />
                Demander la version personnalisée
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="tel:+212600000000"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                <Phone className="h-4 w-4" />
                Appeler maintenant
              </a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur"
                >
                  <p className="text-xl font-black text-orange-300">{fact.value}</p>
                  <p className="text-xs text-slate-300">{fact.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between">
              <p className="text-sm text-orange-200">Menu Signature</p>
              <div className="flex items-center gap-1 text-amber-300">
                <Star className="h-4 w-4 fill-amber-300" />
                <span className="text-sm font-semibold">4.9</span>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {signaturePizzas.map((pizza) => (
                <article
                  key={pizza.name}
                  className="rounded-2xl border border-white/10 bg-slate-900/80 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold">{pizza.name}</h3>
                      <p className="mt-1 text-sm text-slate-300">{pizza.description}</p>
                    </div>
                    <span
                      className={`rounded-full bg-gradient-to-r px-3 py-1 text-sm font-bold text-slate-950 ${pizza.accent}`}
                    >
                      {pizza.price}
                    </span>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-5 inline-flex items-center gap-2 text-xs text-slate-400">
              <Clock3 className="h-3.5 w-3.5" />
              Ouvert 7j/7 • 11h30 – 00h30
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: Pizza,
              title: "Pâte artisanale",
              text: "Fermentation lente 48h pour une texture parfaite.",
            },
            {
              icon: Flame,
              title: "Four haute température",
              text: "Cuisson rapide, croustillant et goût authentique.",
            },
            {
              icon: Timer,
              title: "Livraison express",
              text: "Suivi en direct et délai moyen inférieur à 25 min.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
            >
              <item.icon className="h-6 w-6 text-orange-300" />
              <h3 className="mt-3 font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="mt-14 rounded-3xl border border-orange-300/20 bg-gradient-to-r from-orange-500/15 to-red-600/15 p-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="inline-flex items-center gap-2 text-sm text-orange-200">
                <ChefHat className="h-4 w-4" />
                Script prêt pour contacter ton client
              </p>
              <h2 className="mt-3 text-2xl font-black sm:text-3xl">
                Envoie cette démo + ce message pour décrocher le deal.
              </h2>
              <p className="mt-3 text-slate-300">
                Tu peux copier ce texte puis l'envoyer avec le lien de la page au
                client pizzeria.
              </p>
              <button
                onClick={handleCopy}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-slate-950 transition hover:scale-[1.02]"
              >
                {copied ? "Copié ✅" : "Copier le message"}
              </button>
            </div>

            <pre className="whitespace-pre-wrap rounded-2xl border border-white/15 bg-slate-950/70 p-4 text-sm text-slate-200">
              {messageTemplate}
            </pre>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-black sm:text-3xl">Ce que disent les clients</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <article
                key={item.name}
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
              >
                <p className="text-sm text-slate-200">“{item.quote}”</p>
                <p className="mt-3 text-sm font-semibold text-orange-300">
                  {item.name}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
          <p className="inline-flex items-center gap-2 text-sm text-slate-300">
            <MapPin className="h-4 w-4 text-orange-300" />
            Casablanca • Livraison & sur place
          </p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">
            Prêt à envoyer cette démo au client ?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-300">
            Partage le lien <span className="font-semibold text-orange-300">/pizzeria-demo</span>.
            Si le client est chaud, vous passez directement à la version finale.
          </p>
        </section>
      </main>
    </div>
  );
}
