import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductGrid } from "@/components/ProductGrid";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";

const Catalogo = () => {
  return (
    <>
      <Helmet>
        <title>Catálogo | Lux Joyas - Todas nuestras joyas de lujo</title>
        <meta 
          name="description" 
          content="Explora nuestro catálogo completo de joyas de lujo. Cadenas, anillos, pulseras y más. Encuentra la pieza perfecta para ti." 
        />
      </Helmet>

      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-card to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="section-title">Catálogo Completo</h1>
              <p className="section-subtitle">
                Explora nuestra colección exclusiva de joyas de lujo
              </p>
            </motion.div>
          </div>
        </section>

        {/* Products */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <ProductGrid showFilters={true} />
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
};

export default Catalogo;
