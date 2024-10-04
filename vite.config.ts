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
        name: "GEVP APP",
        short_name: "GEVP APP",
        description:
          "Consulta o carga entrenamientos y eventos en el club GEVP.",
        theme_color: "#2c7a9e",
        background_color: "#2c7a9e",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "./assets/gevpLogo.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable any",
            
          },
          {
            src: "./assets/gevpLogo.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "./assets/gevpLogo.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "maskable any",
          },
        ],
        orientation: "portrait",
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
