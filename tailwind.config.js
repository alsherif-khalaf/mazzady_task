/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {

      colors: {
        'light_pink': '#FBE7EE',
        'pink': '#D20653',
        'dark_pink': '#A1033F',
        'dark_yellow': '#FDBC01',
        'black_text': '#1D1D1D',
        'dark_text': '#414141',
        'light_text': '#707070',
        'purble': '#44215D',
        'light_purble': '#6E3A8C',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
}
