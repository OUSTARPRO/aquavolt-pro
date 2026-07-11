import { ArrowRight, Flame, Pizza, Sparkles, Star, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const menuItems = [
  {
    name: "Volcano Truffle",
    description:
      "Crème de truffe, mozzarella fior di latte, champignons grillés et éclats de parmesan.",
    tag: "Best-seller",
    price: "119 MAD",
  },
  {
    name: "Diavola Royale",
    description:
      "Sauce tomate maison, spianata piccante, burrata cœur fondant et huile basilic pimentée.",
    tag: "Ultra gourmande",
    price: "129 MAD",
  },
  {
    name: "Méditerranéenne Verde",
    description:
      "Pesto frais, tomates cerise confites, olives Kalamata et stracciatella artisanale.",
    tag: "Signature",
    price: "109 MAD",
  },
];

const offerBlocks = [
  {
    title: "Starter Demo",
    bullets: ["Landing premium", "Menu visuel", "CTA conversion"],
    price: "Idéal pour test",
  },
  {
    title: "Growth Pack",
    bullets: ["Réservation rapide", "Avis clients", "Version mobile optimisée"],
    price: "Le plus demandé",
  },
  {
    title: "Full Brand Experience",
    bullets: ["Storytelling complet", "Effets premium", "Parcours client complet"],
    price: "Pour impressionner",
  },
];

export default function PizzeriaDemo() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-orange-400/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.3),transparent_55%)]" />
        <div className="absolute -right-24 top-24 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -left-24 bottom-8 h-80 w-80 rounded-full bg-red-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge className="mb-5 bg-orange-500/20 text-orange-100 border-orange-300/30">
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                Demo client - pizzeria premium
              </Badge>
              <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Un site pizzeria{" "}
                <span className="bg-gradient-to-r from-orange-300 via-red-300 to-yellow-200 bg-clip-text text-transparent">
                  qui vend avant même l&apos;appel
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-slate-300">
                Voici un exemple prêt à envoyer à ton nouveau client : design
                fort, offres claires, menu premium et boutons d&apos;action qui
                poussent à la réservation.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#menu-signature">
                  <Button className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-400 hover:to-red-400">
                    Voir le menu signature
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a href="#contact-demo">
                  <Button
                    variant="outline"
                    className="border-white/25 text-white hover:bg-white/10"
                  >
                    Me contacter pour le projet
                  </Button>
                </a>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-2xl font-bold text-orange-300">+42%</p>
                  <p className="text-xs text-slate-300">clics CTA</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-2xl font-bold text-red-300">2.3x</p>
                  <p className="text-xs text-slate-300">temps sur page</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-2xl font-bold text-yellow-200">24h</p>
                  <p className="text-xs text-slate-300">mise en ligne</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-orange-500/40 via-red-500/30 to-yellow-300/20 blur-xl" />
              <div className="relative rounded-3xl border border-white/15 bg-slate-900/85 p-6 backdrop-blur-xl">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-orange-200">
                    <Pizza className="h-5 w-5" />
                    <span className="font-semibold">Bella Napoli - Demo</span>
                  </div>
                  <Badge className="bg-red-500/20 text-red-100 border-red-300/30">
                    Livraison 30 min
                  </Badge>
                </div>
                <div className="space-y-3">
                  {[
                    "Pizzas artisanales au feu de bois",
                    "Réservation en 2 clics",
                    "Offres du soir visibles immédiatement",
                    "Design mobile qui donne faim",
                  ].map(point => (
                    <div
                      key={point}
                      className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                    >
                      <Flame className="h-4 w-4 text-orange-300" />
                      <span className="text-sm text-slate-100">{point}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between rounded-xl border border-orange-300/25 bg-orange-500/10 p-3">
                  <span className="text-sm text-orange-100">
                    Offre lancement client :
                  </span>
                  <span className="font-bold text-orange-200">-20% ce mois</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="menu-signature" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-orange-300">
              Menu signature
            </p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              Cartes produits qui déclenchent la commande
            </h2>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
            Version démo envoyable au client
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {menuItems.map(item => (
            <article
              key={item.name}
              className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-5 transition-transform duration-300 hover:-translate-y-1 hover:border-orange-300/40"
            >
              <div className="mb-4 flex items-center justify-between">
                <Badge className="bg-orange-500/15 text-orange-100 border-orange-300/25">
                  <Star className="mr-1 h-3 w-3" />
                  {item.tag}
                </Badge>
                <span className="text-lg font-bold text-orange-200">
                  {item.price}
                </span>
              </div>
              <h3 className="text-xl font-bold">{item.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {item.description}
              </p>
              <Button className="mt-5 w-full bg-white/10 text-white hover:bg-orange-500/25">
                Ajouter à la commande
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-3">
            <Timer className="h-5 w-5 text-orange-300" />
            <p className="text-sm uppercase tracking-wider text-slate-300">
              Processus express pour ton client
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              "1. On valide l'identité visuelle de la pizzeria",
              "2. J'intègre menu + offres + WhatsApp en direct",
              "3. Tu envoies la démo, il peut signer rapidement",
            ].map(step => (
              <div
                key={step}
                className="rounded-xl border border-white/10 bg-slate-900/70 p-4 text-slate-200"
              >
                {step}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-3xl font-black sm:text-4xl">
          Packs que tu peux proposer au client
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {offerBlocks.map(offer => (
            <div
              key={offer.title}
              className="rounded-2xl border border-white/10 bg-slate-900/80 p-6"
            >
              <h3 className="text-xl font-bold text-orange-200">{offer.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {offer.bullets.map(point => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-orange-300" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm font-semibold text-yellow-200">
                {offer.price}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact-demo" className="border-t border-orange-300/20 bg-slate-900/70">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-wider text-orange-300">
            Envoi rapide au prospect
          </p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">
            Si le client aime la démo, il peut te contacter immédiatement
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Remplace simplement les liens ci-dessous avec ton WhatsApp et ton
            email pro avant l&apos;envoi.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="https://wa.me/212600000000" target="_blank" rel="noreferrer">
              <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500">
                Discuter sur WhatsApp
              </Button>
            </a>
            <a href="mailto:contact@ton-agence.com">
              <Button
                variant="outline"
                className="border-white/25 text-white hover:bg-white/10"
              >
                Envoyer un email
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
