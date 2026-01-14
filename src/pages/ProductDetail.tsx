import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Check, Package, Ruler, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import { useProduct } from "@/hooks/useProducts";
import { openWhatsApp } from "@/lib/whatsapp";
import { getInitialImageUrl, handleImageError, isGstaticUrl } from "@/lib/imageProxy";
import { useEffect, useState } from "react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { product, isLoading, error } = useProduct(id || "");
  const [selectedImage, setSelectedImage] = useState(0);

  const handleLoQuiero = () => {
    if (product) {
      openWhatsApp({
        nombre: product.nombre,
        precio: product.precio,
        url: window.location.href,
      });
    }
  };

  const galleryImages = [
    product?.img_principal_url,
    product?.img_zoom_url,
    product?.img_galeria_1_url,
  ].filter((img): img is string => Boolean(img));
  const images = galleryImages.length ? galleryImages : ["/placeholder.svg"];
  const mainImage = images[selectedImage] || "/placeholder.svg";
  const isMainProxyDefault = galleryImages.length ? isGstaticUrl(mainImage) : false;

  useEffect(() => {
    setSelectedImage(0);
  }, [product?.id]);

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="pt-24 min-h-screen bg-background">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="aspect-square skeleton-gold rounded-xl" />
              <div className="space-y-6">
                <div className="h-10 skeleton-gold rounded w-3/4" />
                <div className="h-6 skeleton-gold rounded w-1/2" />
                <div className="h-32 skeleton-gold rounded" />
                <div className="h-14 skeleton-gold rounded w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Header />
        <main className="pt-24 min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl text-ivory mb-4">Producto no encontrado</h1>
            <Link to="/catalogo" className="btn-gold">
              Volver al catálogo
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.nombre} | Lux Joyas</title>
        <meta name="description" content={product.descripcion} />
      </Helmet>

      <Header />

      <main className="pt-24 min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 text-ivory-muted hover:text-gold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al catálogo
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="aspect-square rounded-2xl overflow-hidden glass-card">
                <img
                  src={getInitialImageUrl(mainImage)}
                  alt={product.nombre}
                  className="w-full h-full object-cover"
                  data-proxy-tried={isMainProxyDefault ? "true" : undefined}
                  onError={(e) =>
                    handleImageError(e, galleryImages.length ? mainImage : undefined)
                  }
                />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-5 gap-3">
                {images.map((img, index) => {
                  const isProxyDefault = galleryImages.length
                    ? isGstaticUrl(img)
                    : false;
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-gold shadow-[0_0_15px_hsl(43_74%_49%/0.4)]"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={getInitialImageUrl(img)}
                        alt={`${product.nombre} - Vista ${index + 1}`}
                        className="w-full h-full object-cover"
                        data-proxy-tried={isProxyDefault ? "true" : undefined}
                        onError={(e) =>
                          handleImageError(e, galleryImages.length ? img : undefined)
                        }
                      />
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Category */}
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-gold/20 text-gold border border-gold/30">
                {product.categoria}
              </span>

              {/* Title */}
              <h1 className="font-display text-4xl md:text-5xl text-ivory">
                {product.nombre}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-4">
                <span className="font-display text-4xl text-gold-gradient font-bold">
                  {product.precio}
                </span>
                {product.stock && (
                  <span
                    className={`flex items-center gap-1.5 text-sm ${
                      parseInt(product.stock) > 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    {parseInt(product.stock) > 0 ? "En stock" : "Agotado"}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="glass-card p-6">
                <p className="text-ivory-muted leading-relaxed">
                  {product.descripcion}
                </p>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4">
                {product.material && (
                  <div className="glass-card p-4 flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-gold" />
                    <div>
                      <p className="text-xs text-ivory-muted">Material</p>
                      <p className="text-ivory font-medium">{product.material}</p>
                    </div>
                  </div>
                )}
                {product.tamano && (
                  <div className="glass-card p-4 flex items-center gap-3">
                    <Ruler className="w-5 h-5 text-gold" />
                    <div>
                      <p className="text-xs text-ivory-muted">Tamaño</p>
                      <p className="text-ivory font-medium">{product.tamano}</p>
                    </div>
                  </div>
                )}
                {product.stock && (
                  <div className="glass-card p-4 flex items-center gap-3">
                    <Package className="w-5 h-5 text-gold" />
                    <div>
                      <p className="text-xs text-ivory-muted">Disponibles</p>
                      <p className="text-ivory font-medium">{product.stock} unidades</p>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA */}
              <motion.button
                onClick={handleLoQuiero}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-gold text-xl py-5 flex items-center justify-center gap-3 animate-glow-pulse"
              >
                <ShoppingBag className="w-6 h-6" />
                ¡Lo quiero!
              </motion.button>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 justify-center text-sm text-ivory-muted">
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gold" />
                  Envío seguro
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gold" />
                  Garantía 6 meses
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gold" />
                  Pago contra entrega
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
};

export default ProductDetail;
