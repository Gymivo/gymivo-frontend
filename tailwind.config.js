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
        neutral: {
          white: "#FFFFFF",  // white
          ligher: "#E0E0E0", // lighter gray
          light: "#D5D5D5", // light gray
          gray: "#949494", // gray
          dark: "#6E6E6E", // dark gray
          darker: "#212121", // dark
        },
      },
    },
  },
  plugins: [],
}
