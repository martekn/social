/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./feed/**/*.{html,js}",
    "./profile/**/*.{html,js}",
    "./search/**/*.{html,js}",
    "./src/**/*.{html,js}",
    "./index.html",
  ],
  theme: {
    screens: {
      xs: "430px",
      ...defaultTheme.screens,
    },

    extend: {
      colors: {
        transparent: "transparent",
        primary: {
          200: "#AACAD8",
          300: "#3F88A7",
          400: "#065074",
          500: "#053c57",
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
          450: "#E9EAED",
          500: "#dce0ec",
        },
      },
      keyframes: {
        slide: {
          "0%": { transform: "translateX(130%)" },
          "100%": {
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        slide: "slide 0.3s ease-in-out",
      },
    },

    container: {
      center: true,
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
  plugins: [require("tailwindcss-animated")],
};
