/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'transparent-blur': '	rgba(255, 255, 255, 0.8)'
      },
      screens: {
        '3xl': '1920px',
      }
    },
  },
  plugins: [],
}

