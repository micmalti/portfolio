/** @type {import("tailwindcss").Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  // mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Source Serif 4 Variable"', ...defaultTheme.fontFamily.serif],
        sans: ['"Inter Variable"', ...defaultTheme.fontFamily.sans],
      },
      gridTemplateColumns: {
        24: "repeat(24, minmax(0, 1fr))",
      },
      colors: {
        primary: "#222224",
        secondary: "#F3F4F6",
        tertiary: "#E8710A",
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
        // '2xl': ['24px', '34px']
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              'hyperlink': '',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
