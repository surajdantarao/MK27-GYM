/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e11d48", // red-600
        secondary: "#111827", // gray-900
        accent: "#facc15", // yellow-400
      }
    },
  },
  plugins: [],
}
