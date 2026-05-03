import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Benali",
    city: "Casablanca",
    text: "Excellent travail sur l'installation électrique de notre villa. Équipe professionnelle, ponctuelle et très propre. Je recommande vivement AquaVolt Pro !",
    textAr: "عمل ممتاز في التركيب الكهربائي لفيلتنا. فريق محترف وفي الموعد ونظيف جداً. أنصح بشدة بأكوا فولت برو!",
    rating: 5,
  },
  {
    name: "Fatima Zahra",
    city: "Khouribga",
    text: "Ils ont rénové notre salle de bain en un temps record. Le résultat est magnifique et les prix sont très raisonnables. Merci à toute l'équipe !",
    textAr: "قاموا بتجديد حمامنا في وقت قياسي. النتيجة رائعة والأسعار معقولة جداً. شكراً للفريق بأكمله!",
    rating: 5,
  },
  {
    name: "Karim El Amrani",
    city: "Marrakech",
    text: "Construction de notre piscine par AquaVolt Pro. Un travail d'expert du début à la fin. La piscine est magnifique et l'entretien est parfait.",
    textAr: "بناء مسبحنا من قبل أكوا فولت برو. عمل خبير من البداية إلى النهاية. المسبح رائع والصيانة مثالية.",
    rating: 5,
  },
  {
    name: "Sofia Mansouri",
    city: "Rabat",
    text: "Service client impeccable et réactivité impressionnante. Mon problème de fuite d'eau a été résolu en moins de 2 heures. Bravo !",
    textAr: "خدمة العملاء لا تشوبها شائبة والاستجابة مثيرة للإعجاب. تم حل مشكلتي في تسرب المياه في أقل من ساعتين. أحسنتم!",
    rating: 5,
  },
];

export default function Testimonials() {
  const { language, dir } = useLanguage();
  const T = translations[language];

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden" dir={dir}>
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {T.testimonialsTitle}
          </h2>
          <p className="text-slate-400 text-lg">{T.testimonialsSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative p-6 rounded-2xl bg-slate-900/50 border border-white/10 hover:border-emerald-500/20 transition-colors"
            >
              <Quote className="w-8 h-8 text-emerald-500/30 mb-4" />
              <p className="text-slate-300 mb-4 leading-relaxed">
                {language === "ar" ? t.textAr : t.text}
              </p>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
