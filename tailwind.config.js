const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        margin: "margin",
        width: "width",
      },
      colors: {
        gray: colors.zinc,
        accent: ({ opacityValue }) => {
          if (opacityValue !== undefined) {
            return `rgba(var(--accent), ${opacityValue})`;
          }
          return `rgb(var(--accent)`;
        },
        "accent-hex": "var(--accent-hex)",
      },
      screens: {
        xs: "480px",
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
