import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";

export default function Contact() {
  const { language, dir } = useLanguage();
  const T = translations[language];

  return (
    <section id="contact" className="py-24 bg-slate-900 relative" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {T.contactTitle}
          </h2>
          <p className="text-slate-400 text-lg">{T.contactSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Phone,
              label: T.phone,
              value: "+212 6 12 34 56 78",
              href: "tel:+212612345678",
              color: "from-emerald-500 to-teal-600",
            },
            {
              icon: Mail,
              label: T.email,
              value: "contact@aquavolt-pro.ma",
              href: "mailto:contact@aquavolt-pro.ma",
              color: "from-sky-500 to-blue-600",
            },
            {
              icon: MapPin,
              label: T.address,
              value: T.addressValue,
              href: "#",
              color: "from-amber-500 to-orange-600",
            },
            {
              icon: MessageCircle,
              label: T.whatsapp,
              value: "+212 6 12 34 56 78",
              href: "https://wa.me/212612345678?text=Bonjour%20AquaVolt%20Pro",
              color: "from-green-500 to-emerald-600",
            },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group p-6 rounded-2xl bg-slate-950 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}
              >
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-1">{item.label}</h3>
              <p className="text-slate-400 text-sm">{item.value}</p>
            </a>
          ))}
        </div>

        {/* Hours */}
        <div className="mt-12 flex items-center justify-center gap-2 text-slate-400 text-sm">
          <Clock className="w-4 h-4 text-emerald-400" />
          <span>
            {language === "fr"
              ? "Lun - Sam : 8h00 - 20h00 | Dimanche : Sur rendez-vous"
              : "الإثن - السبت: 8:00 - 20:00 | الأحد: بالموعد"}
          </span>
        </div>
      </div>
    </section>
  );
}
