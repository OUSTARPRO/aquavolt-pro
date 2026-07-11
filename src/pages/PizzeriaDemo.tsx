import { useMemo, useState } from 'react'
import {
  Bike,
  CheckCircle2,
  Clock3,
  Flame,
  MessageCircle,
  Phone,
  Sparkles,
  Star,
} from 'lucide-react'

type Category = 'pizza' | 'burger' | 'dessert'

type MenuItem = {
  name: string
  description: string
  price: string
  badge?: string
  category: Category
}

const menuItems: MenuItem[] = [
  {
    name: 'Pizza Truffe Royale',
    description: 'Crème truffée, mozzarella fior di latte, champignons grillés.',
    price: '129 MAD',
    badge: 'Best seller',
    category: 'pizza',
  },
  {
    name: 'Pizza Volcanique',
    description: 'Sauce tomate fumée, double pepperoni, burrata fondante.',
    price: '119 MAD',
    badge: 'Très demandée',
    category: 'pizza',
  },
  {
    name: 'Burger Maestro',
    description: 'Steak 180g, cheddar maturé, sauce maison piment doux.',
    price: '99 MAD',
    category: 'burger',
  },
  {
    name: 'Burger Chicken Crunch',
    description: 'Poulet croustillant, mayo citronnée, salade iceberg.',
    price: '89 MAD',
    category: 'burger',
  },
  {
    name: 'Tiramisu Pistache',
    description: 'Crème mascarpone légère, cacao premium, pistache torréfiée.',
    price: '49 MAD',
    badge: 'Nouveau',
    category: 'dessert',
  },
  {
    name: 'Pizza Choco-Fraise',
    description: 'Pâte fine, chocolat noisette, fraises fraîches, éclats croquants.',
    price: '65 MAD',
    category: 'dessert',
  },
]

const categoryLabels: Record<Category, string> = {
  pizza: 'Pizzas',
  burger: 'Burgers',
  dessert: 'Desserts',
}

export default function PizzeriaDemo() {
  const [activeCategory, setActiveCategory] = useState<Category>('pizza')
  const [form, setForm] = useState({
    name: '',
    phone: '',
    guests: '2',
    time: '20:00',
    notes: '',
  })

  const filteredItems = useMemo(
    () => menuItems.filter((item) => item.category === activeCategory),
    [activeCategory],
  )

  const whatsappMessage = useMemo(() => {
    const details = [
      `Bonjour, je veux réserver une table.`,
      `Nom: ${form.name || 'Non renseigné'}`,
      `Téléphone: ${form.phone || 'Non renseigné'}`,
      `Nombre de personnes: ${form.guests}`,
      `Heure souhaitée: ${form.time}`,
      `Notes: ${form.notes || 'Aucune'}`,
    ]

    return encodeURIComponent(details.join('\n'))
  }, [form])

  const whatsappHref = `https://wa.me/212600000000?text=${whatsappMessage}`

  function updateField(key: keyof typeof form, value: string) {
    setForm((previous) => ({ ...previous, [key]: value }))
  }

  function handleReservationSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    window.open(whatsappHref, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="relative overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-red-600/25 blur-3xl" />
        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />

        <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2 text-xl font-black tracking-wide">
            <Flame className="h-6 w-6 text-orange-400" />
            PIZZA NOVA
          </div>
          <a
            href="tel:+212600000000"
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold transition hover:border-orange-400 hover:text-orange-300"
          >
            +212 6 00 00 00 00
          </a>
        </header>

        <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 pb-16 pt-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-1 text-sm font-semibold text-orange-300">
              <Sparkles className="h-4 w-4" />
              Démo premium prête à envoyer au client
            </p>
            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              Une pizzeria qui donne
              <span className="text-orange-400"> faim </span>
              dès la première seconde.
            </h1>
            <p className="max-w-xl text-lg text-white/70">
              Design moderne, menu dynamique, réservation en 1 clic sur WhatsApp
              et branding fort pour convertir les visiteurs en commandes.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#reservation"
                className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-extrabold uppercase tracking-wide text-black transition hover:bg-orange-400"
              >
                Réserver maintenant
              </a>
              <a
                href="https://wa.me/212600000000"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/20 px-5 py-3 text-sm font-bold uppercase tracking-wide transition hover:border-white/50"
              >
                Ouvrir WhatsApp
              </a>
            </div>

            <div className="grid grid-cols-1 gap-3 pt-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-black">4.9/5</p>
                <p className="text-xs uppercase tracking-widest text-white/60">
                  Avis clients
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-black">25 min</p>
                <p className="text-xs uppercase tracking-widest text-white/60">
                  Livraison moyenne
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-black">+3K</p>
                <p className="text-xs uppercase tracking-widest text-white/60">
                  Commandes / mois
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-orange-400/20 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 shadow-[0_0_70px_-25px_rgba(251,146,60,0.8)] backdrop-blur">
            <p className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-orange-300">
              <Star className="h-4 w-4 fill-orange-300 text-orange-300" />
              Plat signature
            </p>
            <h2 className="text-3xl font-black">Pizza Volcanique XXL</h2>
            <p className="mt-2 text-white/70">
              Pepperoni croustillant, burrata fondante, sauce tomate fumée et
              huile infusée au basilic.
            </p>
            <div className="mt-8 space-y-3">
              <p className="flex items-center gap-2 text-sm text-white/80">
                <Clock3 className="h-4 w-4 text-orange-300" /> Cuisson minute au
                four à pierre
              </p>
              <p className="flex items-center gap-2 text-sm text-white/80">
                <Bike className="h-4 w-4 text-orange-300" /> Livraison rapide dans
                toute la ville
              </p>
              <p className="flex items-center gap-2 text-sm text-white/80">
                <CheckCircle2 className="h-4 w-4 text-orange-300" /> Ingrédients
                premium sélectionnés
              </p>
            </div>
            <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-sm text-white/60">Prix lancement</p>
              <p className="text-4xl font-black text-orange-300">119 MAD</p>
            </div>
          </div>
        </section>
      </div>

      <section className="mx-auto w-full max-w-6xl px-6 pb-8 pt-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-3xl font-black md:text-4xl">Menu vedette</h3>
          <div className="flex flex-wrap gap-2 rounded-full border border-white/10 bg-white/5 p-1">
            {(Object.keys(categoryLabels) as Category[]).map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeCategory === category
                    ? 'bg-orange-500 text-black'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {categoryLabels[category]}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {filteredItems.map((item) => (
            <article
              key={item.name}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-orange-300/40 hover:bg-white/[0.07]"
            >
              {item.badge ? (
                <p className="mb-3 inline-flex rounded-full border border-orange-300/40 bg-orange-300/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange-300">
                  {item.badge}
                </p>
              ) : null}
              <h4 className="text-xl font-extrabold">{item.name}</h4>
              <p className="mt-2 text-sm text-white/65">{item.description}</p>
              <p className="mt-5 text-2xl font-black text-orange-300">
                {item.price}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="reservation"
        className="mx-auto grid w-full max-w-6xl gap-6 px-6 pb-16 pt-8 md:grid-cols-[1fr_1.1fr]"
      >
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm uppercase tracking-widest text-orange-300">
            Démo orientée conversion
          </p>
          <h3 className="mt-3 text-3xl font-black">
            Formulaire de réservation intelligent
          </h3>
          <p className="mt-3 text-white/70">
            Quand le client remplit ce formulaire, un message WhatsApp pré-rempli
            s’ouvre automatiquement. Résultat: moins de friction, plus de réservations.
          </p>
          <div className="mt-8 space-y-3 text-sm text-white/75">
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400" /> CTA visible et
              clair pour mobile.
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400" /> Tunnel rapide:
              visiteur {'->'} conversation {'->'} commande.
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400" /> Facile à adapter
              au branding du client.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleReservationSubmit}
          className="rounded-3xl border border-orange-400/25 bg-gradient-to-b from-orange-500/10 to-transparent p-6"
        >
          <h4 className="text-2xl font-black">Réserve ta table</h4>
          <p className="mt-1 text-sm text-white/65">
            Démo: remplace le numéro WhatsApp par celui du client.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-sm">
              <span className="mb-2 block text-white/70">Nom</span>
              <input
                required
                value={form.name}
                onChange={(event) => updateField('name', event.target.value)}
                placeholder="Ex: Yassine"
                className="w-full rounded-xl border border-white/15 bg-black/35 px-3 py-2 outline-none transition focus:border-orange-400"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block text-white/70">Téléphone</span>
              <input
                required
                value={form.phone}
                onChange={(event) => updateField('phone', event.target.value)}
                placeholder="06..."
                className="w-full rounded-xl border border-white/15 bg-black/35 px-3 py-2 outline-none transition focus:border-orange-400"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block text-white/70">Personnes</span>
              <input
                value={form.guests}
                onChange={(event) => updateField('guests', event.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/35 px-3 py-2 outline-none transition focus:border-orange-400"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block text-white/70">Heure</span>
              <input
                type="time"
                value={form.time}
                onChange={(event) => updateField('time', event.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/35 px-3 py-2 outline-none transition focus:border-orange-400"
              />
            </label>
          </div>
          <label className="mt-4 block text-sm">
            <span className="mb-2 block text-white/70">Notes</span>
            <textarea
              rows={3}
              value={form.notes}
              onChange={(event) => updateField('notes', event.target.value)}
              placeholder="Anniversaire, chaise bébé, etc."
              className="w-full resize-none rounded-xl border border-white/15 bg-black/35 px-3 py-2 outline-none transition focus:border-orange-400"
            />
          </label>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-extrabold uppercase tracking-wide text-black transition hover:bg-orange-400"
            >
              <MessageCircle className="h-4 w-4" />
              Envoyer sur WhatsApp
            </button>
            <a
              href="tel:+212600000000"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold transition hover:border-white/50"
            >
              <Phone className="h-4 w-4" />
              Appeler la pizzeria
            </a>
          </div>
        </form>
      </section>
    </div>
  )
}
