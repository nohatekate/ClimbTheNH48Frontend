/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tan': '#DCD7C9',
        'dark-tan': '#A27B5C',
        'darkest-green': '#2C3639',
        'medium-green': '#3F4E4F'
      },
    },

  },
  plugins: [],

}

