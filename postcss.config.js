/* eslint-disable no-undef */
module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    'postcss-preset-env': {
      stage: 0, // Enable all modern CSS features
      autoprefixer: { 
        grid: true, // Enable grid prefixes
        overrideBrowserslist: ['> 1%', 'last 2 versions'], // Support browsers with more than 1% market share and the last 2 versions of each browser
      },
    },
    'postcss-nested': {},
  },
};