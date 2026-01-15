/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "medieval-gold": "#c5a059",
        "medieval-red": "#8b0000",
      },
      fontFamily: {
        medieval: ["Cinzel", "serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
