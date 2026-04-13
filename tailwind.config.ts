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
        /* FarmCats fonts */
        serif: ['EB Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        pixel: ['Press Start 2P', 'monospace'],
        /* Old pixel fonts (kept for backward compatibility) */
        pixel: ['Press Start 2P', 'cursive'],
        retro: ['VT323', 'monospace'],
        silkscreen: ['Silkscreen', 'cursive'],
        lobster: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp .3s cubic-bezier(.4,0,.2,1)',
        'fade-in': 'fadeIn .3s cubic-bezier(.4,0,.2,1)',
        'pulse-slow': 'pulse 2.4s ease infinite',
        'spin-slow': 'spin 8s linear infinite',
        'lobster-swim': 'lobster-swim 3s ease-in-out infinite',
        'lobster-wave': 'lobster-wave 2s ease-in-out infinite',
        'lobster-pulse': 'lobster-pulse 2s ease-in-out infinite',
        'lobster-float': 'lobster-float 4s ease-in-out infinite',
        'bubble-up': 'bubble-up 2s ease-out infinite',
        'ocean-wave': 'ocean-wave 3s ease-in-out infinite',
        'fresh-splash': 'fresh-splash 1.5s ease-in-out infinite',
        'glow-soft': 'glow-soft 3s ease-in-out infinite',
        'ocean-flow': 'ocean-flow 8s linear infinite',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(14px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
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
      },
      colors: {
        /* FarmCats Theme Colors */
        'farm-bg': '#0a0a09',
        'farm-bg1': '#111110',
        'farm-bg2': '#191918',
        'farm-bg3': '#222221',
        'farm-line': '#2a2a28',
        'farm-line2': '#383835',
        'farm-txt': '#eeede8',
        'farm-txt2': '#a8a89e',
        'farm-txt3': '#6b6b63',
        'farm-gold': '#ffbe0e',
        'farm-cream': '#f5f0e8',
        'farm-green': '#5cb87a',
        'farm-red': '#d95b5b',
        'farm-blue': '#6b9fd4',
        
        /* Lobster/Ocean Brand Colors (kept) */
        'lobster-red': '#ff4500',
        'lobster-orange': '#ff6b35',
        'lobster-pink': '#ffb6c1',
        'ocean-blue': '#006994',
        'ocean-teal': '#40e0d0',
        'ocean-foam': '#f0f8ff',
        'shell-gold': '#ffd700',
        'premium-gold': '#d4af37',
        'fresh-white': '#f5f5f5',
        
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
      },
      borderRadius: {
        'farm': '12px',
        'farm-sm': '8px',
      },
    },
  },
  plugins: [],
}
