import { useLocation } from "react-router";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const { language } = useLanguage();
  const location = useLocation();
  const T = translations[language];

  const serviceContext: Record<string, string> = {
    "/devis": language === "fr"
      ? "Je souhaite demander un devis détaillé"
      : "أريد طلب عرض سعر مفصل",
    "/produits": language === "fr"
      ? "Je souhaite commander des produits"
      : "أريد طلب منتجات",
    "/": language === "fr"
      ? "Je suis intéressé par vos services"
      : "أنا مهتم بخدماتكم",
  };

  const serviceSpecific = serviceContext[location.pathname] || (
    language === "fr"
      ? "Je suis intéressé par vos services"
      : "أنا مهتم بخدماتكم"
  );

  const message = encodeURIComponent(
    `${serviceSpecific}. ${T.whatsappMessage}`
  );

  const href = `https://wa.me/212612345678?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-xl shadow-green-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-green-500/50 group"
      aria-label="WhatsApp"
    >
      <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
      <span className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 pointer-events-none hidden sm:block">
        {language === "fr" ? "Discuter sur WhatsApp" : "دردشة واتساب"}
      </span>
    </a>
  );
}
