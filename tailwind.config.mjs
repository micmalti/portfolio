/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
        extend: {
            fontFamily: {
                serif: ['DM Serif Display', ...defaultTheme.fontFamily.serif],
            },
            gridTemplateColumns: {
                '70/30': '70% 28%'
            }
        },
	},
	plugins: [],
}
