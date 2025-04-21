/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7c3aed', // Custom purple
        secondary: '#f9fafb', // Light gray
        accent: '#111827', // Dark gray
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Custom font
      },
      spacing: {
        '128': '32rem', // Custom spacing
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem', // Custom border radius
      },
    },
  },
  plugins: [],
};