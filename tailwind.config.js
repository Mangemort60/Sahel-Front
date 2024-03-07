/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'node_modules/preline/dist/*.js',
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        kaki: '#A4AC86',
        darkerKaki: '#72785C',
      },
    },
  },
  plugins: [require('preline/plugin')],
}
