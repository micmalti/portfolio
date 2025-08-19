import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import lottie from "astro-integration-lottie";
import expressiveCode from "astro-expressive-code";

export default defineConfig({
  site: "https://michaelgauci.com",
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: true
    }),
    icon(),
    sitemap(),
    lottie(),
    expressiveCode({
      themes: ["github-light"],
      useThemedScrollbars: true,
      styleOverrides: {
        // frames: {
        // shadowColor: '#f9f9f9',
        // },
      }
    }),
    mdx()
  ],
  server: {
    port: 3000
  }
});
