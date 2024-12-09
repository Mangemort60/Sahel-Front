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
        sahelExtraLight: '#f8cc9aa8',
        sahelLight: '#FDC5AF',
        sahelRegular: '#AB5E3F',
        sahelDark: '#5B1E05',
        secondaryLightBlue: '#748EA3',
        secondaryBlue: '#4B6D87',
        secondaryRegularBlue: '#2D526E',
        sahelFlashBlue: 'hsl(179, 51%, 53%)',
        sahelFlashDarkBlue: '#2d7776',
        secondaryDarkBlue: '#183b56',
        secondaryLightGreen: '#BBE29C',
        sahelPurpleTeal: '#a08db1',
        sahelPurpleTealDarker: '#675677',
        sahelBlueTeal: '#2e8ea4',
        sahelBlueTealDarker: '#257283',
        secondaryRegularGreen: '#649838',
      },
      fontFamily: { sans: ['Roboto', 'sans-serif'] },
    },
  },
  plugins: [require('preline/plugin'), require('flowbite/plugin')],
}
