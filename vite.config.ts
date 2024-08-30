import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "assets/gevpLogo.png",
        "assets/entrenamientos2.png",
        "assets/eventos.png",
        "apple-touch-icon.png",
      ],
      manifest: {
        name: "GEVP",
        short_name: "GEVP",
        description:
          "Consulta o carga entrenamientos y eventos en el club GEVP.",
        theme_color: "#06018a",
        background_color: "#06018a",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "assets/gevpLogo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "assets/gevpLogo-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  build: {
    outDir: "dist", // o tu directorio de salida preferido
  },
  server: {
    open: true,
  },
});
