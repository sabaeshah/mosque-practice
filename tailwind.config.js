/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts,jsx}"],
  theme: {
    extend: {
      screens: {
        '4k': '2560px',
        '3xl': '1920px' // or '3840px' for actual 4K resolution
      },
    },
  },
  plugins: [],
}

