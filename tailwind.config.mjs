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
        'default': 'url(/src/icons/cursor.svg) 16 16, default',
        'pointer': 'url(/src/icons/cursor-hover.svg) 16 16, pointer',
        'text': 'url(/src/icons/cursor.svg) 16 16, default',
        'copy': 'url(/src/icons/cursor.svg) 16 16, default',
      },
      fontSize: {
        '2xl': ['24px', '34px']
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
