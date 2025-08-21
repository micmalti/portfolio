import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import lottie from "astro-integration-lottie";
import expressiveCode from "astro-expressive-code";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkDirective from "remark-directive";
import starlightAsides from "./src/utils/starlight-asides.js";

export default defineConfig({
  site: "https://michaelgauci.com",
  markdown: {
    remarkPlugins: [remarkMath, remarkDirective, starlightAsides],
    rehypePlugins: [rehypeKatex],
  },
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
      useThemedScrollbars: false,
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
