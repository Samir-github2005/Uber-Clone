/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        uber: {
          black: '#000000',
          dark: '#121212',
          card: '#1e1e1e',
          gray: '#2e2e2e',
          lightgray: '#f3f4f6',
          blue: '#276EF1',
          green: '#05A357',
          yellow: '#FFC043',
          red: '#E11900',
        }
      }
    },
  },
  plugins: [],
}
