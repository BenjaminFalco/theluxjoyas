import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, X } from "lucide-react";
import { useProducts, useCategories } from "@/hooks/useProducts";
import { ProductCard, ProductCardSkeleton } from "./ProductCard";

interface ProductGridProps {
  showFilters?: boolean;
  limit?: number;
}

export const ProductGrid = ({ showFilters = true, limit }: ProductGridProps) => {
  const { data: products, isLoading, error } = useProducts();
  const categories = useCategories();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    let filtered = products;
    
    if (search) {
      filtered = filtered.filter((p) =>
        p.nombre.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.categoria === selectedCategory);
    }
    
    if (limit) {
      filtered = filtered.slice(0, limit);
    }
    
    return filtered;
  }, [products, search, selectedCategory, limit]);

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="glass-card inline-block px-8 py-6">
          <p className="text-destructive mb-2">Error al cargar productos</p>
          <p className="text-ivory-muted text-sm">
            Por favor, intenta de nuevo más tarde
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row gap-4"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/60" />
            <input
              type="text"
              placeholder="Buscar joyas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card/50 border border-border-gold/30 rounded-xl text-ivory placeholder:text-ivory-muted focus:outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/20 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ivory-muted hover:text-gold transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            <Filter className="w-5 h-5 text-gold/60 flex-shrink-0" />
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                !selectedCategory
                  ? "bg-gold text-background font-medium"
                  : "bg-card/50 text-ivory-muted border border-border-gold/30 hover:border-gold/50"
              }`}
            >
              Todas
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-gold text-background font-medium"
                    : "bg-card/50 text-ivory-muted border border-border-gold/30 hover:border-gold/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
      </div>

      {/* No results */}
      {!isLoading && filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <p className="text-ivory-muted text-lg">
            No se encontraron joyas con esos criterios
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory(null);
            }}
            className="mt-4 text-gold hover:underline"
          >
            Limpiar filtros
          </button>
        </motion.div>
      )}

      {/* Results count */}
      {!isLoading && filteredProducts.length > 0 && showFilters && (
        <p className="text-center text-ivory-muted text-sm">
          Mostrando {filteredProducts.length} de {products?.length} productos
        </p>
      )}
    </div>
  );
};
