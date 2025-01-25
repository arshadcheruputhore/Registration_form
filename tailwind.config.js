/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Ubuntu: ['Ubuntu', 'sans-serif'], // Add Google Font
      },
    },
  },
  plugins: [
    // function ({ addUtilities }) {
    //   addUtilities({
    //     'input[type="number"]::-webkit-inner-spin-button': {
    //       display: 'none',
    //     },
    //     'input[type="number"]::-webkit-outer-spin-button': {
    //       display: 'none',
    //     },
    //     'input[type="number"]': {
    //       '-moz-appearance': 'textfield',
    //       'appearance': 'textfield',
    //     },
    //   });
    // },
  ],
}

