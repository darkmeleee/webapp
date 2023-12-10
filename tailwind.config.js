/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xxs: '384px',
        xs: '512px',
      },
      fontFamily: {
        sans: 'Montserrat',
      },
      colors: {
        'brown-accent': '#683B2B',
        'brown-light': '#EAD0B9',
        'tg-theme-bg': 'var(--tg-theme-bg-color)',
      }
    },
  },
  plugins: [],
}