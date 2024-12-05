/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enables dark mode using the "dark" class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          100: '#ffffff',  // Light mode base color (background)
          200: '#f3f4f6',  // Light mode navbar background
          800: '#1f2937',  // Dark mode base color (background)
          900: '#111827',  // Dark mode navbar background
        },
      },
    },
  },
  plugins: [
    require("daisyui"),
  ],
};
