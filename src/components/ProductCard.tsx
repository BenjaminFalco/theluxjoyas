import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/hooks/useProducts";
import { openWhatsApp } from "@/lib/whatsapp";

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard = ({ product, index }: ProductCardProps) => {
  const handleLoQuiero = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openWhatsApp({
      nombre: product.nombre,
      precio: product.precio,
      url: `${window.location.origin}/producto/${product.id}`,
    });
  };

  const imageUrl = product.imagen || `https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&auto=format`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/producto/${product.id}`} className="group block">
        <div className="glass-card-hover overflow-hidden">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-card-elevated">
            <img
              src={imageUrl}
              alt={product.nombre}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&auto=format";
              }}
            />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                <button
                  onClick={handleLoQuiero}
                  className="flex-1 btn-gold py-3 text-sm flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  ¡Lo quiero!
                </button>
                <div className="p-3 bg-card/80 backdrop-blur-sm rounded-lg border border-border-gold/30 hover:bg-gold hover:text-background transition-colors">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Stock badge */}
            {product.stock && (
              <div className="absolute top-3 right-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  parseInt(product.stock) > 0 
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                }`}>
                  {parseInt(product.stock) > 0 ? "Disponible" : "Agotado"}
                </span>
              </div>
            )}

            {/* Category badge */}
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gold/20 text-gold border border-gold/30">
                {product.categoria}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="font-display text-lg text-ivory group-hover:text-gold transition-colors duration-300 line-clamp-1">
              {product.nombre}
            </h3>
            <p className="text-ivory-muted text-sm mt-1 line-clamp-2">
              {product.descripcion}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-display text-2xl text-gold font-semibold">
                {product.precio}
              </span>
              {product.material && (
                <span className="text-xs text-ivory-muted">
                  {product.material}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// Skeleton loader for products
export const ProductCardSkeleton = () => (
  <div className="glass-card overflow-hidden">
    <div className="aspect-square skeleton-gold" />
    <div className="p-5 space-y-3">
      <div className="h-6 skeleton-gold rounded w-3/4" />
      <div className="h-4 skeleton-gold rounded w-full" />
      <div className="h-8 skeleton-gold rounded w-1/2 mt-4" />
    </div>
  </div>
);
