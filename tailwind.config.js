module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{html,js,jsx,ts,tsx}", // Add this line to include HTML files for purging
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
  ],
};
