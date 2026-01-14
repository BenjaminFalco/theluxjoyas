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
}

const SHEET_ID = "1lIDg4Ki0vfzwgj4CLzvjuUHlprdyWY8R_O2VaUms0Fw";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

const parseGoogleSheetData = (data: string): Product[] => {
  try {
    // Remove the google.visualization.Query.setResponse() wrapper
    const jsonString = data.substring(data.indexOf("(") + 1, data.lastIndexOf(")"));
    const json = JSON.parse(jsonString);
    
    const headers: string[] = json.table.cols.map((col: { label: string }) => 
      col.label?.toLowerCase().trim() || ""
    );
    
    const products: Product[] = [];
    
    json.table.rows.forEach((row: { c: Array<{ v: string | number | null }> }, index: number) => {
      const product: Record<string, string> = {};
      
      row.c.forEach((cell, cellIndex) => {
        const header = headers[cellIndex];
        if (header && cell?.v != null) {
          product[header] = String(cell.v);
        }
      });
      
      // Map common variations of column names
      const nombre = product.nombre || product.name || product.producto || product.title || "";
      const precio = product.precio || product.price || product.valor || "";
      
      if (nombre) {
        products.push({
          id: String(index + 1),
          nombre,
          precio: precio ? `$${precio.replace(/[^\d.,]/g, '')}` : "Consultar precio",
          descripcion: product.descripcion || product.description || product.detalle || "Joya exclusiva de Lux Joyas",
          categoria: product.categoria || product.category || product.tipo || "Joyas",
          material: product.material || product.materiales,
          tamano: product.tamano || product.tamaño || product.size || product.medida,
          stock: product.stock || product.disponible || product.cantidad,
          imagen: product.imagen || product.image || product.foto || product.url_imagen,
          imagenes: (product.imagenes || product.images || "").split(",").filter(Boolean),
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
