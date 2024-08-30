/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            'secondary': {
                'blue': '#4169E1'
            },
            'grey': {
                '10': '#F7F9FD',
                '20': '#EFF3FB',
                '30': '#D7E1F4',
                '40': '#A9BADA',
                '60': '#6882B6',
                '70': '#4C689E',
                '80': '#3C517C',
                '90': '#2B3B5A',
                '100': '#1B2437'
            },
            'accent': {
                'error': '#EE5D50',
                'warning': '#FFB547',
                'success': '#2DAE32'
            }
        }
    },
  },
  plugins: [],
}