const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        logo: ['Cattie', ...defaultTheme.fontFamily.sans],
        content: ['Noto Sans TC', 'Noto Sans SC', '微軟正黑體', ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [],
}
