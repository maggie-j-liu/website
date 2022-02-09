module.exports = {
  overrides: [
    {
      files: ["*.mdx"],
      options: {
        proseWrap: "always",
      },
    },
  ],
  plugins: [require("prettier-plugin-tailwindcss")],
};
