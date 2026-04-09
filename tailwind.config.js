/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        accent: {
          DEFAULT: '#8b5cf6',
          2: '#a855f7',
          3: '#ec4899',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out both',
        'fade-in': 'fadeIn 0.6s ease-out both',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'float': 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}