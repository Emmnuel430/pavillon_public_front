/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#36679B",
        om: "#f4802e",
        yellowCustom: "#FDC326",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
