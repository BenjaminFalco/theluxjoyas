// WhatsApp utility for Lux Joyas
const WHATSAPP_NUMBER = "56963382899";

export interface WhatsAppProductMessage {
  nombre: string;
  precio: string;
  url: string;
}

export const generateWhatsAppUrl = (product?: WhatsAppProductMessage): string => {
  const baseUrl = `https://wa.me/${WHATSAPP_NUMBER}`;
  
  if (!product) {
    return `${baseUrl}?text=${encodeURIComponent("Hola! Quiero más información sobre las joyas de Lux Joyas.")}`;
  }

  const message = `Hola! Quiero esta joya de Lux Joyas:
Producto: ${product.nombre}
Precio: ${product.precio}
Link: ${product.url}
¿Está disponible?`;

  return `${baseUrl}?text=${encodeURIComponent(message)}`;
};

export const openWhatsApp = (product?: WhatsAppProductMessage): void => {
  window.open(generateWhatsAppUrl(product), "_blank");
};
