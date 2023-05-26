/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      AvenirMedium: ["AvenirMedium", "sans-serif"],
      AvenirBook: ["AvenirBook", "sans-serif"],
      AvenirHeavy: ["AvenirHeavy", "sans-serif"],
      GothamMedium: ["GothamMedium", "sans-serif"],
      GothamMediumItalic: ["GothamMediumItalic", "sans-serif"],
    },
  },
  plugins: [],
}

