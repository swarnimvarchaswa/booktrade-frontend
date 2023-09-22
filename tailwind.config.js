/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        r:['Roboto', 'sans-serif'],
        m:['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: [],
}

