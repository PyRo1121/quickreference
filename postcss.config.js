/* eslint-disable no-undef */
module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    'postcss-preset-env': {
      stage: 0, // Enable all modern CSS features
      autoprefixer: { grid: true }, // Enable grid prefixes
    },
    'postcss-nested': {},
    autoprefixer: {
      overrideBrowserslist: ['> 1%', 'last 2 versions'], // A sample configuration for autoprefixer
    },
  },
};

