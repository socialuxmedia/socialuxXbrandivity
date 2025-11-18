import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // toute la typo "font-sans" utilisera d'abord IBM Plex Arabic,
        // puis Inter, puis system fonts
        sans: [
          'var(--font-arabic)',
          'var(--font-latin)',
          'system-ui',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}

export default config
