import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import Menu from "@/sections/Services";
import SpecialsAndStats from "@/sections/Gallery";
import Testimonials from "@/sections/Testimonials";
import ContactAndReservation from "@/sections/Contact";
import Footer from "@/sections/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-pizza-dark text-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Menu />
        <SpecialsAndStats />
        <Testimonials />
        <ContactAndReservation />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
