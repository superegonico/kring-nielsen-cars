import daisyui from "daisyui";

module.exports = {
  content: [
    "./dist/*.html",
    "./dist/*.js",
    "./src/index.js",
    "./src/index.html",
    "./src/modules/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        ibm: ["IBM Plex Sans", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [daisyui],
};
