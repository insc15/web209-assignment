/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#0b7c6b",
        "button-hover": "#085752"
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}