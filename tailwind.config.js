import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      transparent: colors.transparent,
      current: colors.current,
      black: colors.black,
      white: colors.white,
      neutral: colors.zinc,
      primary: colors.rose,
      secondary: colors.amber,
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        xl: "1340px",
      },
    },
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};
