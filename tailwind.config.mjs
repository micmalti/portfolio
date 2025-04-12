/** @type {import("tailwindcss").Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 3s ease-in-out forwards",
        textReveal: "textReveal 2s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { filter: "brightness(0.1) saturate(0.5)" },
          "100%": { filter: "brightness(1) saturate(1.2)" },
        },
        textReveal: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0%)" },
        },
      },
      maxWidth: {
        readable: "17ch",
      },
      fontFamily: {
        serif: ['"Source Serif 4 Variable"', ...defaultTheme.fontFamily.serif],
        sans: ['"Inter Variable"', ...defaultTheme.fontFamily.sans],
      },
      gridTemplateColumns: {
        // 24: "repeat(24, minmax(0, 1fr))",
        2: "repeat(2, minmax(0, 100%))",
      },
      colors: {
        primary: "#111" /* black-50 "#000000" #222224 */,
        secondary: "#f9f9f9" /* gray-50 "#FFFFFF" #F3F4F6 */,
        tertiary: "#ffd23f" /* "#E8710A" */,
      },
      transitionProperty: {
        opacity: "opacity",
      },
      cursor: {
        default: "url(/src/icons/cursor.svg) 16 16, default",
        pointer: "url(/src/icons/cursor-hover.svg) 16 16, pointer",
        text: "url(/src/icons/cursor.svg) 16 16, default",
        copy: "url(/src/icons/cursor.svg) 16 16, default",
      },
      fontSize: {
        // 'article-heading-1': ['var(--step-0)', {
        //   lineHeight: '2rem',
        //   letterSpacing: '-0.01em',
        //   fontWeight: '500',
        // }],
        "serif-2xl": [
          "var(--step-7)",
          {
            lineHeight: "80%",
          },
        ], // landing-title
        "serif-title": [
          "var(--step-11)",
          {
            lineHeight: "80%",
          },
        ], // landing-title
        "serif-xl": [
          "var(--step-6)",
          {
            lineHeight: "78%",
          },
        ], // landing-title
        "serif-lg": [
          "var(--step-5)",
          {
            lineHeight: "130%",
          },
        ], // tagline
        "serif-md": [
          "var(--step-4)",
          {
            lineHeight: "110%",
            fontWeight: "650",
          },
        ], // section-title, timeline-heading, article-title, sent-title
        "serif-sm": [
          "var(--step-3)",
          {
            lineHeight: "132%",
            fontWeight: "600",
          },
        ], // h2
        "serif-xs": ["var(--step-2)"], // h3
        "sans-lg": [
          "var(--step-1)",
          {
            lineHeight: "100%",
          },
        ], // landing-subtitle, availability-tag
        "sans-timeline": [
          "var(--step-2)",
          {
            lineHeight: "147%",
            fontWeight: "300",
          },
        ], // timeline copy
        "sans-projects": [
          "var(--step-7)",
          {
            fontWeight: "800",
            lineHeight: "90%",
          },
        ],
        "serif-info-minor": [
          "var(--step-4)",
          {
            lineHeight: "110%",
            fontWeight: "300",
          },
        ],
        "serif-info-major": [
          "var(--step-6)",
          {
            lineHeight: "90%",
          },
        ],
        "sans-md": ["var(--step-0)"], // section-body, article-body, form,
        "sans-sm": ["var(--step--1)"], // footer, navigation, section-tag, timeline-year, article-date, button
        "sans-xs": ["var(--step--2)"], // contact button
      }, // 320px, 14px, 1.125  2560px, 16px, 1.2
      spacing: {},
      margin: {},
      size: {
        "volume-icon": ["var(--step--1)"],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              hyperlink: "",
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
    function ({ addUtilities }) {
      addUtilities({
        ".text-outline-white": {
          "-webkit-text-stroke": "0.04em white",
          "paint-order": "stroke fill",
        },
      });
    },
  ],
};
