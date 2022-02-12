const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        margin: "margin",
      },
      colors: {
        main: colors.zinc,
        accent: ({ opacityValue }) => {
          if (opacityValue !== undefined) {
            return `rgba(var(--accent), ${opacityValue})`;
          }
          return `rgb(var(--accent)`;
        },
      },
      screens: {
        xs: "480px",
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [],
};
