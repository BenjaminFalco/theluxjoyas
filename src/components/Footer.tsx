import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { generateWhatsAppUrl } from "@/lib/whatsapp";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contacto" className="bg-card border-t border-border-gold/20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-background font-display font-bold text-xl">
                L
              </div>
              <span className="font-display text-2xl text-gold-gradient font-semibold">
                Lux Joyas
              </span>
            </Link>
            <p className="text-ivory-muted leading-relaxed mb-6">
              Joyas que elevan tu presencia. Cadenas, anillos, pulseras y accesorios de lujo para quienes buscan lo mejor.
            </p>
            <div className="flex gap-4">
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card-elevated border border-border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-background transition-all hover:scale-110"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-card-elevated border border-border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-background transition-all hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:contacto@luxjoyas.cl"
                className="w-10 h-10 rounded-full bg-card-elevated border border-border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-background transition-all hover:scale-110"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-display text-lg text-gold mb-6">Navegación</h4>
            <ul className="space-y-3">
              {[
                { label: "Inicio", href: "/" },
                { label: "Catálogo", href: "/catalogo" },
                { label: "Colecciones", href: "/#colecciones" },
                { label: "FAQ", href: "/#faq" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-ivory-muted hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-display text-lg text-gold mb-6">Categorías</h4>
            <ul className="space-y-3">
              {["Cadenas", "Anillos", "Pulseras", "Aretes", "Accesorios"].map(
                (category) => (
                  <li key={category}>
                    <Link
                      to={`/catalogo?categoria=${category.toLowerCase()}`}
                      className="text-ivory-muted hover:text-gold transition-colors"
                    >
                      {category}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-display text-lg text-gold mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-ivory-muted">
                <Phone className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span>+56 9 6338 2899</span>
              </li>
              <li className="flex items-start gap-3 text-ivory-muted">
                <Mail className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span>contacto@luxjoyas.cl</span>
              </li>
              <li className="flex items-start gap-3 text-ivory-muted">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span>Santiago, Chile</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border-gold/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-ivory-muted text-sm">
              © {currentYear} Lux Joyas. Todos los derechos reservados.
            </p>
            <p className="text-ivory-muted text-sm">
              Hecho con ✨ para quienes buscan lo mejor
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
