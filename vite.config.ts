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
      manifest: {
        name: "MMCN-DEVICE",
        short_name: "DEVICE",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "google-fonts-stylesheets",
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com/,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
              cacheableResponse: {
                statuses: [0, 200],
              },
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
              },
            },
          },
        ],
      },
    }),
  ],
});
