import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { Readable } from "node:stream";

const imageProxyPlugin = (): Plugin => {
  const handleProxyRequest = async (
    req: import("http").IncomingMessage,
    res: import("http").ServerResponse
  ) => {
    const url = new URL(req.url || "", "http://localhost");
    const targetUrl = url.searchParams.get("url");

    if (!targetUrl) {
      res.statusCode = 400;
      res.end("Missing url parameter");
      return;
    }

    try {
      const response = await fetch(targetUrl);
      if (!response.ok || !response.body) {
        res.statusCode = 502;
        res.end("Failed to fetch image");
        return;
      }

      const contentType = response.headers.get("content-type");
      if (contentType) {
        res.setHeader("content-type", contentType);
      }

      const contentLength = response.headers.get("content-length");
      if (contentLength) {
        res.setHeader("content-length", contentLength);
      }

      res.statusCode = response.status;
      Readable.fromWeb(response.body).pipe(res);
    } catch (error) {
      res.statusCode = 500;
      res.end("Image proxy error");
    }
  };

  return {
    name: "image-proxy",
    configureServer(server) {
      server.middlewares.use("/api/img", (req, res) => {
        void handleProxyRequest(req, res);
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use("/api/img", (req, res) => {
        void handleProxyRequest(req, res);
      });
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    imageProxyPlugin(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
