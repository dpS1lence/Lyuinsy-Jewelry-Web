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
        discount: '#f472b6',
        hover: '#a2a2a2',
        text: '#000000',
        accentbackground: '#fdf2f8',
      },
    },
  },
  plugins: [],
}