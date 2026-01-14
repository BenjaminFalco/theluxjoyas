import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "¿Cómo puedo comprar?",
    answer:
      "Para comprar cualquier joya, simplemente haz clic en el botón '¡Lo quiero!' del producto que te guste. Esto te llevará directamente a WhatsApp donde podrás confirmar tu pedido y coordinar el pago y envío con nosotros de forma personalizada.",
  },
  {
    question: "¿Cuáles son los métodos de pago?",
    answer:
      "Aceptamos transferencia bancaria, tarjetas de crédito/débito a través de link de pago, y efectivo en entregas presenciales. Te daremos todos los detalles una vez que nos contactes por WhatsApp.",
  },
  {
    question: "¿Realizan envíos?",
    answer:
      "Sí, realizamos envíos a todo Chile. El costo y tiempo de envío dependen de tu ubicación. También ofrecemos entrega presencial en Santiago para mayor comodidad.",
  },
  {
    question: "¿Cuánto tarda el envío?",
    answer:
      "Los envíos en Santiago demoran 1-2 días hábiles. Para regiones, el tiempo estimado es de 3-5 días hábiles. Te mantendremos informado/a del estado de tu pedido en todo momento.",
  },
  {
    question: "¿Puedo cambiar o devolver un producto?",
    answer:
      "Aceptamos cambios dentro de los primeros 7 días desde la entrega, siempre que el producto esté en perfectas condiciones y con su empaque original. Las devoluciones se evalúan caso a caso.",
  },
  {
    question: "¿Hacen joyas personalizadas?",
    answer:
      "¡Sí! Podemos crear piezas únicas según tus especificaciones. Escríbenos por WhatsApp con tu idea y te asesoraremos para hacer realidad la joya de tus sueños.",
  },
  {
    question: "¿Las joyas tienen garantía?",
    answer:
      "Todas nuestras joyas tienen garantía de 6 meses contra defectos de fabricación. Además, ofrecemos servicio de mantenimiento y limpieza para que tus piezas siempre luzcan perfectas.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Preguntas Frecuentes</h2>
          <p className="section-subtitle">
            Resolvemos tus dudas para que tu experiencia sea perfecta
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card border-border-gold/20 px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left text-ivory hover:text-gold py-5 text-lg font-display">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-ivory-muted pb-5 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
