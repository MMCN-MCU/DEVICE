import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  server: { https: true },
  plugins: [
    sveltekit(),
    mkcert(),
    VitePWA({
      registerType: "autoUpdate",
      useCredentials: true,
      includeAssets: ["favicon.png"],
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "mcu-device",
        short_name: "mcu-device",
        description: "mmcn-mcu project device app",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/src/assets/favicon.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/src/assets/favicon.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/src/assets/favicon.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
