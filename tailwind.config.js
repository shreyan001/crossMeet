/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black1': '#232323',
        'black2': '#262626',
        'black3': '#IEIEIE',
        'black4': '#0D0D0D',
        discord: {
          DEFAULT: '#7289da',
          '100': '#b0bec5',
          '200': '#90a4ae',
          '300': '#78909c',
          '400': '#607d8b',
          '500': '#546e7a',
          '600': '#455a64',
          '700': '#37474f',
          '800': '#263238',
          '900': '#1c252b',
        },},
      fontSize: {
      
        '1xl': ['2.41rem', '1'],
        'small':['8.3px']
      }
    },
  },
  plugins: [],
}