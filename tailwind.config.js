/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'swipper-bg': "url('/public/swiperbg.svg')"
      }
    },
  },
  plugins: [require("daisyui")],
}

