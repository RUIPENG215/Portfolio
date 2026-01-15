/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        design: {
          primary: '#FF6B6B', // Coral/Pastel Red
          secondary: '#4ECDC4', // Teal
          bg: '#F7FFF7', // Off white
        },
        engineering: {
          primary: '#00B4D8', // Cyan
          secondary: '#0077B6', // Blue
          bg: '#03045E', // Dark Blue
          text: '#CAF0F8',
        },
        humanities: {
          primary: '#D4A373', // Tan
          secondary: '#CCD5AE', // Sage
          bg: '#FEFAE0', // Cream
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        pixel: ['"Press Start 2P"', 'cursive'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
