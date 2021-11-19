const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: colors.sky,
        secondary: colors.indigo,
        contrast: colors.pink,
        dark: colors.coolGray,
        teal: colors.teal,
        cyan: colors.cyan,
        sky: colors.sky,
        fuchsia: colors.fuchsia,
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.dark.700"),
            blockquote: {
              color: theme("colors.dark.800"),
            },
            code: {
              fontWeight: "inherit",
            },
            "code::before": {
              content: "none",
            },
            "code::after": {
              content: "none",
            },
            a: {
              color: theme("colors.secondary.400"),
              textDecoration: "none",
              fontWeight: 600,
              "&:hover": {
                textDecoration: "underline",
                color: theme("colors.secondary.500"),
              },
            },
            "a code": {
              color: "inherit",
            },
            thead: {
              color: "inherit",
            },
            "ol > li::before": {
              color: theme("colors.secondary.600"),
            },
            "ul > li::before": {
              backgroundColor: theme("colors.secondary.600"),
            },
          },
        },
        dark: {
          css: {
            blockquote: {
              color: "inherit",
            },
            strong: {
              color: "inherit",
            },
            code: {
              fontWeight: "inherit",
            },
            a: {
              color: theme("colors.secondary.300"),
              textDecoration: "none",
              fontWeight: 600,
              "&:hover": {
                textDecoration: "underline",
                color: theme("colors.secondary.200"),
              },
            },
            "a code": {
              color: "inherit",
            },
            thead: {
              color: "inherit",
            },
            tr: {
              borderColor: theme("colors.gray.400"),
            },
            "ol > li::before": {
              color: theme("colors.secondary.400"),
            },
            "ul > li::before": {
              backgroundColor: theme("colors.secondary.400"),
            },
          },
        },
      }),
    },
  },
  variants: {
    typography: ["dark"],
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
