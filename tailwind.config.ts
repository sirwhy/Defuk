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
      },
      animation: {
        'pixel-bounce': 'pixel-bounce 0.6s ease-in-out infinite',
        'pixel-idle': 'pixel-idle 2s ease-in-out infinite',
        'pixel-spin': 'pixel-spin 2s linear infinite',
        'pixel-pulse': 'pixel-pulse 1.5s ease-in-out infinite',
        'pixel-shake': 'pixel-shake 0.3s ease-in-out infinite',
        'pixel-float': 'pixel-float 3s ease-in-out infinite',
        'pixel-wiggle': 'pixel-wiggle 0.5s ease-in-out infinite',
        'scanline': 'scanline 2s linear infinite',
        'retro-grid': 'retro-grid-move 10s linear infinite',
      },
      keyframes: {
        'pixel-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20%)' },
        },
        'pixel-idle': {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.05)' },
          '50%': { transform: 'scale(1)' },
        },
        'pixel-spin': {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.1)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        'pixel-pulse': {
          '0%, 100%': { transform: 'scale(1)', filter: 'brightness(1)' },
          '50%': { transform: 'scale(1.15)', filter: 'brightness(1.3)' },
        },
        'pixel-shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' },
        },
        'pixel-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'pixel-wiggle': {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'retro-grid-move': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 50px' },
        },
      },
      colors: {
        'pixel-black': '#0d0d0d',
        'pixel-dark': '#1a1a1a',
        'pixel-gray': '#333333',
        'pixel-green': '#39ff14',
        'pixel-pink': '#ff6ec7',
        'pixel-cyan': '#00ffff',
        'pixel-yellow': '#ffff00',
        'pixel-red': '#ff0040',
        'pixel-purple': '#9d4edd',
      },
    },
  },
  plugins: [],
}
