/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        robotics: {
          dark: '#0a0e17',
          panel: '#111827',
          accent: '#3b82f6',
          success: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444'
        }
      }
    },
  },
  plugins: [],
}
