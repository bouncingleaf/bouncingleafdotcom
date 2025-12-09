/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text-primary': '#383838',
        'accent-primary': '#3079C2',
        'accent-secondary': '#F68E61',
      },
      maxWidth: {
        'content': '1200px',
      },
    },
  },
  plugins: [],
}
