/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enables dark mode using the "dark" class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
  theme: {
    extend: {
      colors: {
        base: {
          100: '#ffffff',  // Light mode base color (background)
          200: '#f3f4f6',  // Light mode navbar background
          800: '#1f2937',  // Dark mode base color (background)
          900: '#111827',  // Dark mode navbar background
        },
        animation: {
          float: 'float 6s ease-in-out infinite',
        },
      },
    },
  },
  plugins: [
    require("daisyui"),
  ],
};
