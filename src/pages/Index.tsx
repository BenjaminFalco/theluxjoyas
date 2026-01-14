import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Lux Joyas | Joyas de Lujo en Chile - Cadenas, Anillos, Pulseras</title>
        <meta 
          name="description" 
          content="Descubre joyas exclusivas de lujo. Cadenas, anillos, pulseras y accesorios premium. Joyas que elevan tu presencia. Envíos a todo Chile." 
        />
        <meta name="keywords" content="joyas, lujo, cadenas, anillos, pulseras, oro, plata, Chile" />
        <link rel="canonical" href="https://luxjoyas.cl" />
      </Helmet>

      <Header />
      
      <main>
        <Hero />
        <FeaturedProducts />
        <FAQ />
      </main>

      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
};

export default Index;
