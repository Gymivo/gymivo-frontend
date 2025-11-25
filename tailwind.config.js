/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          0: "#FDFFF0",
          100: "#F9FFC5",
          200: "#F4FF9A",
          300: "#ECFB6D",
          400: "#D0DE59",
          500: "#B4C147",
          600: "#98A437",
          700: "#7D8629",
          800: "#61691D",
          900: "#464C12",
        },
      },
    },
  },
  plugins: [],
}
