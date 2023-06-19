/* eslint-disable no-undef */
module.exports = {
  mode: 'jit',
  purge: {
    mode: 'all',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    safelist: [],
  },
  darkMode: 'class',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
  },
};

