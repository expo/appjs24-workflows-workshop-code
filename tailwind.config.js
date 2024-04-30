const colors = require("./constants/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        black: "#111111",
        tint: colors.tint,
        "shade-0": "#ffffff",
        "shade-1": "#f5f5f5",
        "shade-2": "#CDCDCD",
      },
    }
  },
  plugins: [],
}

