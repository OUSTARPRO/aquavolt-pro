import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
import { Zap, Droplets, Waves, Wrench, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const services = [
  {
    key: "electricity" as const,
    icon: Zap,
    image: "/service-electricity.jpg",
    color: "from-amber-500 to-orange-600",
    bgGlow: "shadow-amber-500/20",
  },
  {
    key: "plumbing" as const,
    icon: Droplets,
    image: "/service-plumbing.jpg",
    color: "from-sky-500 to-blue-600",
    bgGlow: "shadow-sky-500/20",
  },
  {
    key: "pool" as const,
    icon: Waves,
    image: "/service-pool.jpg",
    color: "from-emerald-500 to-teal-600",
    bgGlow: "shadow-emerald-500/20",
  },
  {
    key: "maintenance" as const,
    icon: Wrench,
    image: "/gallery-1.jpg",
    color: "from-violet-500 to-purple-600",
    bgGlow: "shadow-violet-500/20",
  },
];

export default function Services() {
  const { language, dir } = useLanguage();
  const T = translations[language];

  return (
    <section id="services" className="py-24 bg-slate-950 relative" dir={dir}>
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {T.servicesTitle}
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {T.servicesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.key}
              className="group relative overflow-hidden rounded-2xl bg-slate-900/50 border border-white/10 hover:border-emerald-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={T[service.key]}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                <div
                  className={`absolute top-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg ${service.bgGlow}`}
                >
                  <service.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {T[service.key]}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {T[`${service.key}Desc` as keyof typeof T] || ""}
                </p>
                <Link
                  to="/devis"
                  className="inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  {T.learnMore}
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
