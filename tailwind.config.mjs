/** @type {import("tailwindcss").Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  // mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        serif: ["DM Serif Display", ...defaultTheme.fontFamily.serif],
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      gridTemplateColumns: {
        24: "repeat(24, minmax(0, 1fr))",
      },
      colors: {
        primary: "#222224",
        secondary: "#F3F4F6",
        tertiary: "#F9AB00",
      },
      transitionProperty: {
        opacity: "opacity",
      },
      cursor: {
        'default': 'url(/src/images/cursor-1x.webp), default',
        'pointer': 'url(/src/images/cursor-hover-1x.webp), pointer'
      }
    },
  },
  plugins: [],
};
