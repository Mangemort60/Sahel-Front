/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'node_modules/preline/dist/*.js',
    './src/**/*.{html,js,jsx,ts,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        kaki: '#A4AC86',
        darkerKaki: '#72785C',
        sahelLight: '#FDC5AF',
        sahelRegular: '#AB5E3F',
        sahelDark: '#5B1E05',
        secondaryLightBlue: '#748EA3',
        secondaryBlue: '#4B6D87',
        secondaryRegularBlue: '#2D526E',
        secondaryDarkBlue: '#183b56',
        secondaryLightGreen: '#BBE29C',
        secondaryRegularGreen: '#649838',
      },
      fontFamily: { sans: ['Roboto', 'sans-serif'] },
    },
  },
  plugins: [require('preline/plugin'), require('flowbite/plugin')],
}
