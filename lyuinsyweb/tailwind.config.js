/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:  {
        background: '#FFFFFF',
        discount: '#A20005',
        hover: '#a2a2a2',
        text: '#000000',
        accentbackground: '#F0EEE4',
      },
    },
  },
  plugins: [],
}