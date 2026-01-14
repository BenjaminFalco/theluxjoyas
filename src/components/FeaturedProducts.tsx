import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ProductGrid } from "./ProductGrid";

export const FeaturedProducts = () => {
  return (
    <section id="colecciones" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Nuestra Colección</h2>
          <p className="section-subtitle">
            Cada pieza es una declaración de elegancia y exclusividad
          </p>
        </motion.div>

        <ProductGrid showFilters={false} limit={8} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 btn-gold-outline"
          >
            Ver catálogo completo
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
