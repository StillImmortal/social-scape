/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'border-bottom': 'inset 0 -1px 0 0 rgba(0,0,0,.1)'
      },
      colors: {
        'transparent-blur': '	rgba(255, 255, 255, 0.8)'
      }
    },
  },
  plugins: [],
}

