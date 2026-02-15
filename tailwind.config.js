/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary: Biru Laut (Trust & Freshness)
        primary: {
          DEFAULT: '#0284c7', // Sky-600
          hover: '#0369a1',   // Sky-700
        },
        // Secondary: Hijau Alam (Nature & Growth)
        secondary: {
          DEFAULT: '#10b981', // Emerald-500
          hover: '#059669',   // Emerald-600
        },
        // Aksen: Oranye Senja (CTA/Buttons)
        accent: '#f97316',    // Orange-500
        // Khusus WhatsApp
        'wa-green': '#25D366',
      },
    },
  },
  plugins: [],
}