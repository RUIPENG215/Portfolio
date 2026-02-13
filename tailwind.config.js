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
          bg: '#0d1117',
          card: '#161b22',
          item: '#21262d',
          text: '#c9d1d9',
          muted: '#8b949e',
          accent: '#79c0ff',
          hover: '#58a6ff',
          border: '#30363d',
          header: '#e6edf3',
        },
        humanities: {
          primary: '#D4A373', // Tan
          secondary: '#CCD5AE', // Sage
          bg: '#FEFAE0', // Cream
        }
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        serif: ['"Noto Serif SC"', '"Playfair Display"', 'serif'],
      }
    },
  },
  plugins: [],
}
