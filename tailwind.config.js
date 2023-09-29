/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./feed/**/*.{html,js}",
    "./profile/**/*.{html,js}",
    "./search/**/*.{html,js}",
    "./src/**/*.{html,js}",
    "./index.html",
  ],
  theme: {
    extend: {},
    container: {
      center: true,
    },
    colors: {
      transparent: "transparent",
      primary: {
        300: "#3F88A7",
        400: "#126D94",
        500: "#0D516E",
        600: "#073649",
      },
      dark: {
        200: "#808093",
        300: "#5E5E6E",
        400: "#4F5263",
        500: "#0D1026",
      },
      light: {
        200: "#fff",
        300: "#fcfcfd",
        400: "#F3F4F7",
        500: "#dce0ec",
      },
    },
    fontFamily: {
      base: [
        '"Open sans"',
        "ui-sans-serif",
        "system-ui",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      accent: [
        "Montserrat",
        '"Open sans"',
        "ui-sans-serif",
        "system-ui",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
    },
  },
  plugins: [],
};
