/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      ripple: theme => ({
        colors: theme('colors'),
        darken: 0.1,
      })
    },
  },
  plugins: [require('tailwindcss-ripple')()],
}

