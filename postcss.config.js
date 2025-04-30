const tailwindcss = require("@tailwindcss/postcss");
const autoprefixer = require("autoprefixer");

module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},  // New v4 PostCSS plugin
    autoprefixer: {}              // Vendor prefixes
  }
};

