/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['Press Start 2P', 'cursive'],
        retro: ['VT323', 'monospace'],
        silkscreen: ['Silkscreen', 'cursive'],
        lobster: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'lobster-swim': 'lobster-swim 3s ease-in-out infinite',
        'lobster-wave': 'lobster-wave 2s ease-in-out infinite',
        'lobster-pulse': 'lobster-pulse 2s ease-in-out infinite',
        'lobster-float': 'lobster-float 4s ease-in-out infinite',
        'bubble-up': 'bubble-up 2s ease-out infinite',
        'ocean-wave': 'ocean-wave 3s ease-in-out infinite',
        'fresh-splash': 'fresh-splash 1.5s ease-in-out infinite',
        'glow-soft': 'glow-soft 3s ease-in-out infinite',
        'ocean-flow': 'ocean-flow 8s linear infinite',
        'sea-foam': 'sea-foam 2s ease-in-out infinite',
        'water-ripple': 'water-ripple 1.5s ease-out infinite',
        'floaty-bubbles': 'floaty-bubbles 3s ease-in-out infinite',
        'organic-pulse': 'organic-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        'lobster-swim': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg) scaleX(1)' },
          '25%': { transform: 'translateY(-8px) rotate(2deg) scaleX(1.02)' },
          '50%': { transform: 'translateY(0) rotate(0deg) scaleX(1)' },
          '75%': { transform: 'translateY(-4px) rotate(-2deg) scaleX(0.98)' },
        },
        'lobster-wave': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(8deg)' },
          '75%': { transform: 'rotate(-8deg)' },
        },
        'lobster-pulse': {
          '0%, 100%': { transform: 'scale(1)', filter: 'brightness(1)' },
          '50%': { transform: 'scale(1.08)', filter: 'brightness(1.15)', 
                   boxShadow: '0 0 30px rgba(255, 69, 0, 0.4)' },
        },
        'lobster-float': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '25%': { transform: 'translateY(-6px) translateX(3px)' },
          '50%': { transform: 'translateY(0) translateX(0)' },
          '75%': { transform: 'translateY(-3px) translateX(-2px)' },
        },
        'bubble-up': {
          '0%': { transform: 'translateY(0) scale(0.5)', opacity: 0 },
          '50%': { opacity: 0.8 },
          '100%': { transform: 'translateY(-60px) scale(1.2)', opacity: 0 },
        },
        'ocean-wave': {
          '0%, 100%': { transform: 'translateX(0) scaleX(1)' },
          '50%': { transform: 'translateX(5px) scaleX(1.05)' },
        },
        'fresh-splash': {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '10%': { transform: 'scale(1.1) rotate(5deg)' },
          '20%': { transform: 'scale(1.05) rotate(-5deg)' },
          '50%': { transform: 'scale(1.15) rotate(0deg)', 
                   filter: 'drop-shadow(0 0 15px rgba(64, 224, 208, 0.6))' },
          '80%': { transform: 'scale(1.05) rotate(-3deg)' },
        },
        'glow-soft': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(255, 69, 0, 0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(255, 69, 0, 0.6), 0 0 40px rgba(255, 107, 53, 0.4)' },
        },
        'ocean-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'water-ripple': {
          '0%': { transform: 'scale(0.8)', opacity: 1 },
          '100%': { transform: 'scale(1.5)', opacity: 0 },
        },
        'floaty-bubbles': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '33%': { transform: 'translateY(-15px) translateX(8px)' },
          '66%': { transform: 'translateY(-8px) translateX(-5px)' },
        },
        'organic-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.07) rotate(1deg)' },
          '50%': { transform: 'scale(1)' },
          '75%': { transform: 'scale(1.05) rotate(-1deg)' },
        },
      },
      colors: {
        /* Old pixel colors (kept for backward compatibility) */
        'pixel-black': '#0d0d0d',
        'pixel-dark': '#1a1a1a',
        'pixel-gray': '#333333',
        'pixel-green': '#39ff14',
        'pixel-pink': '#ff6ec7',
        'pixel-cyan': '#00ffff',
        'pixel-yellow': '#ffff00',
        'pixel-red': '#ff0040',
        'pixel-purple': '#9d4edd',
        
        /* New Lobster Ocean Colors */
        'lobster-red': '#ff4500',
        'lobster-orange': '#ff6b35',
        'lobster-pink': '#ffb6c1',
        'ocean-blue': '#006994',
        'ocean-teal': '#40e0d0',
        'ocean-foam': '#f0f8ff',
        'shell-gold': '#ffd700',
        'premium-gold': '#d4af37',
        'fresh-white': '#f5f5f5',
      },
    },
  },
  plugins: [],
}
