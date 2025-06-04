import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import mdx from '@astrojs/mdx';
import sitemap from "@astrojs/sitemap";
import lottie from "astro-integration-lottie";

export default defineConfig({
  site: "https://michaelgauci.com",
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: true,
    }),
    icon(),
    sitemap(),
    lottie(),
    mdx()
  ],
  server: {
    port: 3000,
  },
});
