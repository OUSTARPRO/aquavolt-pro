import { CartProvider } from "@/contexts/CartContext";
import PizzaNavbar from "@/components/PizzaNavbar";
import PizzaHero from "@/sections/PizzaHero";
import PizzaMenu from "@/sections/PizzaMenu";
import PizzaSpecials from "@/sections/PizzaSpecials";
import PizzaGallery from "@/sections/PizzaGallery";
import PizzaTestimonials from "@/sections/PizzaTestimonials";
import PizzaContact from "@/sections/PizzaContact";
import PizzaFooter from "@/sections/PizzaFooter";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function PizzaHome() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#0d0300] text-white">
        <PizzaNavbar />
        <main>
          <PizzaHero />
          <PizzaMenu />
          <PizzaSpecials />
          <PizzaGallery />
          <PizzaTestimonials />
          <PizzaContact />
        </main>
        <PizzaFooter />
        <WhatsAppFloat />
      </div>
    </CartProvider>
  );
}
