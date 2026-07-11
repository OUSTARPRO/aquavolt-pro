import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import WebsiteCatalog from "@/sections/WebsiteCatalog";
import Gallery from "@/sections/Gallery";
import Testimonials from "@/sections/Testimonials";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";
import ChatBot from "@/components/ChatBot";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WebsiteCatalog />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
      <WhatsAppButton />
    </div>
  );
}
