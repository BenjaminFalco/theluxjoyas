import { useQuery } from "@tanstack/react-query";

export interface Product {
  id: string;
  nombre: string;
  precio: string;
  descripcion: string;
  categoria: string;
  material?: string;
  tamano?: string;
  stock?: string;
  imagen?: string;
  imagenes?: string[];
  img_principal_url?: string;
  img_zoom_url?: string;
  img_icono_url?: string;
  img_thumbnail_url?: string;
  img_galeria_1_url?: string;
}

const SHEET_ID = "1lIDg4Ki0vfzwgj4CLzvjuUHlprdyWY8R_O2VaUms0Fw";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

const normalizeImageUrl = (value?: string): string | undefined => {
  if (!value) {
    return undefined;
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }
  if (!/^https?:\/\//i.test(trimmed)) {
    return undefined;
  }
  return trimmed;
};

const parseGoogleSheetData = (data: string): Product[] => {
  try {
    // Remove the google.visualization.Query.setResponse() wrapper
    const jsonString = data.substring(data.indexOf("(") + 1, data.lastIndexOf(")"));
    const json = JSON.parse(jsonString);
    
    const headers: string[] = json.table.cols.map((col: { label: string }) =>
      col.label?.trim() || ""
    );
    
    const products: Product[] = [];
    
    json.table.rows.forEach((row: { c: Array<{ v: string | number | null }> }, index: number) => {
      const product: Record<string, string> = {};
      const productLower: Record<string, string> = {};
      
      row.c.forEach((cell, cellIndex) => {
        const header = headers[cellIndex];
        if (header && cell?.v != null) {
          const value = String(cell.v);
          product[header] = value;
          productLower[header.toLowerCase()] = value;
        }
      });
      
      // Map common variations of column names
      const nombre = productLower.nombre || productLower.name || productLower.producto || productLower.title || "";
      const precio = productLower.precio || productLower.price || productLower.valor || "";
      const img_principal_url = normalizeImageUrl(product["img_principal_url"]);
      const img_zoom_url = normalizeImageUrl(product["img_zoom_url"]);
      const img_icono_url = normalizeImageUrl(product["img_icono_url"]);
      const img_thumbnail_url = normalizeImageUrl(product["img_thumbnail_url"]);
      const img_galeria_1_url = normalizeImageUrl(product["img_galeria_1_url"]);
      const imagenFallback = normalizeImageUrl(
        productLower.imagen || productLower.image || productLower.foto || productLower.url_imagen
      );
      
      if (nombre) {
        products.push({
          id: String(index + 1),
          nombre,
          precio: precio ? `$${precio.replace(/[^\d.,]/g, '')}` : "Consultar precio",
          descripcion: productLower.descripcion || productLower.description || productLower.detalle || "Joya exclusiva de Lux Joyas",
          categoria: productLower.categoria || productLower.category || productLower.tipo || "Joyas",
          material: productLower.material || productLower.materiales,
          tamano: productLower.tamano || productLower.tamaño || productLower.size || productLower.medida,
          stock: productLower.stock || productLower.disponible || productLower.cantidad,
          imagen: img_principal_url || img_thumbnail_url || imagenFallback,
          imagenes: (productLower.imagenes || productLower.images || "")
            .split(",")
            .map((value) => normalizeImageUrl(value))
            .filter(Boolean) as string[],
          img_principal_url,
          img_zoom_url,
          img_icono_url,
          img_thumbnail_url,
          img_galeria_1_url,
        });
      }
    });
    
    return products;
  } catch (error) {
    console.error("Error parsing Google Sheet data:", error);
    return [];
  }
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const response = await fetch(SHEET_URL);
      if (!response.ok) {
        throw new Error("Error al cargar productos");
      }
      const text = await response.text();
      return parseGoogleSheetData(text);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
  });
};

export const useProduct = (id: string) => {
  const { data: products, isLoading, error } = useProducts();
  
  return {
    product: products?.find((p) => p.id === id),
    isLoading,
    error,
  };
};

export const useCategories = () => {
  const { data: products } = useProducts();
  
  const categories = products
    ? [...new Set(products.map((p) => p.categoria).filter(Boolean))]
    : [];
    
  return categories;
};
