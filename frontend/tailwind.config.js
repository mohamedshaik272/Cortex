/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        /* ── Warm canvas system (from baggins) ── */
        canvas: "#efe8dc",
        paper: "#f7f2ea",
        surface: "#e5dcd0",
        elevated: "#faf6f0",
        ink: "#2c2419",
        muted: "#6b5d4d",

        /* ── Accent family ── */
        accent: "#ea580c",
        "accent-soft": "#fff7ed",

        terracotta: "#c2410c",
        rust: "#9a3412",
        clay: "#7c2d12",

      },
      fontFamily: {
        display: ["Syne", "system-ui", "sans-serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
