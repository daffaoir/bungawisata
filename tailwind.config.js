/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10b981', // Emerald-500
          hover: '#059669',   // Emerald-600
          light: '#34d399',   // Emerald-400
        },
        secondary: {
          DEFAULT: '#64748b', // Slate-500
          dark: '#0f172a',    // Slate-900
          light: '#94a3b8',   // Slate-400
        },
        accent: '#f8fafc',    // Slate-50 (White-ish)
        'wa-green': '#25D366',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Optional: Add a nice font if desired later
      },
    },
  },
  plugins: [],
}