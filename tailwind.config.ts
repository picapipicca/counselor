import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {},
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        song: ["SongMyung", "sans-serif"],

      },
      colors: {
        "primary-orange": "#FF5722",
      },
      screens: {
        'xxs': { 'raw': '(min-width: 320px)' },
        'xs': { 'raw': '(min-width: 480px)' },
      }
    },
  },
  plugins: [],
}
export default config
