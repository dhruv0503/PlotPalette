const { blackA, green, mauve, violet } = require('@radix-ui/colors');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...blackA,
        ...green,
        ...mauve,
        ...violet,
        custom:{
          10: '#F8F8FF',
          20: '#E5E4E2',
          30: '#010B13',
          40: '#87816E',
          50: '#2A3439',
        },
      },
      keyframes: {
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        spin: 'spin 1.2s linear infinite',
      },
      fontFamily: {
        logo: ["Satisfy"]
      }
    },
  },
  plugins: [
    require('tailwindcss-dotted-background'),
  ],
}

