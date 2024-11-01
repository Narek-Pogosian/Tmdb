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
    extend: {
      keyframes: {
        shimmer: {
          "100%": { left: "100%" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        shimmer: "shimmer 1.5s infinite",
        fadeIn: "fadeIn 0.3s",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
