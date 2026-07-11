import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import ChatBot from "@/components/ChatBot";
import WhatsAppButton from "@/components/WhatsAppButton";
import CatalogueHero from "@/sections/CatalogueHero";
import CataloguePackages from "@/sections/CataloguePackages";
import CatalogueAddOns from "@/sections/CatalogueAddOns";
import CataloguePromos from "@/sections/CataloguePromos";
import CatalogueComparison from "@/sections/CatalogueComparison";
import CatalogueExport from "@/sections/CatalogueExport";

export default function Catalogue() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main>
        <CatalogueHero />
        <CataloguePromos />
        <CataloguePackages />
        <CatalogueAddOns />
        <CatalogueComparison />
        <CatalogueExport />
      </main>
      <Footer />
      <ChatBot />
      <WhatsAppButton />
    </div>
  );
}
