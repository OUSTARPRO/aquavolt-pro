import { Link } from "react-router";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
import { Zap, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  const { language, dir } = useLanguage();
  const T = translations[language];

  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-8" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Aqua<span className="text-emerald-400">Volt</span>
                <span className="text-teal-300 text-sm ml-0.5">Pro</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">{T.footerDesc}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{T.quickLinks}</h3>
            <ul className="space-y-2">
              {[
                { label: T.home, href: "/" },
                { label: T.services, href: "#services" },
                { label: T.catalogue, href: "/catalogue" },
                { label: T.quote, href: "/devis" },
                { label: T.contact, href: "#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-emerald-400 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">{T.services}</h3>
            <ul className="space-y-2">
              {[T.electricity, T.plumbing, T.pool, T.maintenance].map((s) => (
                <li key={s}>
                  <span className="text-slate-400 text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">{T.followUs}</h3>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Youtube, href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} AquaVolt Pro. {T.rights}
          </p>
          <p className="text-slate-600 text-xs">
            {language === "fr"
              ? "Conçu avec expertise pour le Maroc"
              : "مصمم بخبرة للمغرب"}
          </p>
        </div>
      </div>
    </footer>
  );
}
