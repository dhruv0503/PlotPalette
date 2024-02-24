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
          10: '#EDE9E3',
          20: '#E7D7C9',
          30: '#BE8F6E',
          40: '#87816E',
          50: '#241F19',
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
    },
  },
  plugins: [
    require('tailwindcss-dotted-background'),
  ],
}

