import { defineConfig } from 'astro/config';
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://michaelgauci.com",
    integrations: [react()],
    server: {
        port: 3000,
    },
});