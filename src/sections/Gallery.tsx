import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
import { trpc } from "@/providers/trpc";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ZoomIn } from "lucide-react";

const categories = ["all", "electricity", "plumbing", "pool"] as const;

const fallbackImages = [
  { id: 1, title: "Éclairage LED Jardin", titleAr: "إضاءة حديقة LED", imageUrl: "/gallery-1.jpg", category: "electricity" as const },
  { id: 2, title: "Piscine Cascade", titleAr: "مسبح الشلال", imageUrl: "/gallery-2.jpg", category: "pool" as const },
  { id: 3, title: "Salle de Bain Luxe", titleAr: "حمام فاخر", imageUrl: "/gallery-3.jpg", category: "plumbing" as const },
  { id: 4, title: "Tableau Électrique", titleAr: "لوحة كهربائية", imageUrl: "/gallery-4.jpg", category: "electricity" as const },
  { id: 5, title: "Piscine Moderne", titleAr: "مسبح عصري", imageUrl: "/hero-pool.jpg", category: "pool" as const },
  { id: 6, title: "Installation Sanitaire", titleAr: "تركيب صحي", imageUrl: "/service-plumbing.jpg", category: "plumbing" as const },
];

export default function Gallery() {
  const { language, dir } = useLanguage();
  const T = translations[language];
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<{ id: number; title: string; titleAr: string; imageUrl: string; category: string } | null>(null);

  const { data: dbImages } = trpc.gallery.list.useQuery();

  const images = dbImages && dbImages.length > 0
    ? dbImages.map((item) => ({
        id: item.id,
        title: item.title,
        titleAr: item.titleAr || item.title,
        imageUrl: item.imageUrl,
        category: item.category as typeof categories[number],
      }))
    : fallbackImages;

  const filtered =
    activeCategory === "all"
      ? images
      : images.filter((img) => img.category === activeCategory);

  const categoryLabels: Record<string, string> = {
    all: T.all,
    electricity: T.electricityCategory,
    plumbing: T.plumbingCategory,
    pool: T.poolCategory,
  };

  return (
    <section id="gallery" className="py-24 bg-slate-900 relative" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {T.galleryTitle}
          </h2>
          <p className="text-slate-400 text-lg">{T.gallerySubtitle}</p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                  : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((img) => (
            <div
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer bg-slate-800"
            >
              <img
                src={img.imageUrl}
                alt={language === "ar" ? img.titleAr : img.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white font-medium text-sm">
                  {language === "ar" ? img.titleAr : img.title}
                </p>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl bg-slate-950 border-slate-800 p-0 overflow-hidden">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
          >
            <X className="w-4 h-4" />
          </button>
          {selectedImage && (
            <div>
              <img
                src={selectedImage.imageUrl}
                alt={language === "ar" ? selectedImage.titleAr : selectedImage.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              <div className="p-4 bg-slate-950">
                <p className="text-white font-medium">
                  {language === "ar" ? selectedImage.titleAr : selectedImage.title}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
