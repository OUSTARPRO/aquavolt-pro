import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import ChatBot from "@/components/ChatBot";
import WhatsAppButton from "@/components/WhatsAppButton";
import OrderForm from "@/components/OrderForm";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
import { Package, Truck, ShieldCheck, MessageSquare } from "lucide-react";

export default function Produits() {
  const { language } = useLanguage();
  const T = translations[language];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main>
        <div className="pt-32 pb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
                <Package className="w-4 h-4" />
                <span>{T.productsBadge}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                {T.productsTitle}
              </h1>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                {T.productsSubtitle}
              </p>
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { icon: ShieldCheck, text: language === "fr" ? "Produits de qualité" : "منتجات ذات جودة" },
                { icon: Truck, text: language === "fr" ? "Livraison rapide" : "توصيل سريع" },
                { icon: MessageSquare, text: language === "fr" ? "Confirmation par WhatsApp" : "تأكيد عبر واتساب" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-white/10 text-slate-300 text-sm"
                >
                  <item.icon className="w-4 h-4 text-emerald-400" />
                  {item.text}
                </div>
              ))}
            </div>

            <OrderForm />
          </div>
        </div>
      </main>
      <Footer />
      <ChatBot />
      <WhatsAppButton />
    </div>
  );
}
