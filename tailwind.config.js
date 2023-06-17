module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
  ],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      "./src/**/*.{html,js,jsx,ts,tsx}",
    ],
  },
};
