import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://michaelgauci.com",
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: true,
    }),
  ],
  server: {
    port: 3000,
  },
});
