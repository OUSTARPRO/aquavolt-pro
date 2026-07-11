import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import ChatBot from "@/components/ChatBot";
import WhatsAppButton from "@/components/WhatsAppButton";
import Catalogue from "@/sections/Catalogue";

export default function CataloguePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main className="pt-16">
        <Catalogue />
      </main>
      <Footer />
      <ChatBot />
      <WhatsAppButton />
    </div>
  );
}
