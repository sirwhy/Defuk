/**
 * Custom Animation Utilities for Animated Emoticons
 * Uses motion-site.ai style animations
 */

export const emoticonAnimations = {
  // Bounce animation with elasticity
  bounce: `
    @keyframes emoticon-bounce {
      0%, 100% {
        transform: translateY(0) scale(1);
      }
      25% {
        transform: translateY(-15%) scale(1.05);
      }
      50% {
        transform: translateY(0) scale(1);
      }
      75% {
        transform: translateY(-7%) scale(1.02);
      }
    }
  `,

  // Smooth rotation
  rotate: `
    @keyframes emoticon-rotate {
      0% {
        transform: rotate(0deg) scale(1);
      }
      50% {
        transform: rotate(180deg) scale(1.1);
      }
      100% {
        transform: rotate(360deg) scale(1);
      }
    }
  `,

  // Pulse with glow
  pulse: `
    @keyframes emoticon-pulse {
      0%, 100% {
        transform: scale(1);
        filter: drop-shadow(0 0 4px currentColor);
      }
      50% {
        transform: scale(1.15);
        filter: drop-shadow(0 0 20px currentColor);
      }
    }
  `,

  // Sparkle effect
  sparkle: `
    @keyframes emoticon-sparkle {
      0%, 100% {
        transform: scale(1) rotate(0deg);
        opacity: 1;
      }
      10% {
        transform: scale(1.1) rotate(5deg);
        opacity: 0.9;
      }
      20% {
        transform: scale(1) rotate(-5deg);
        opacity: 1;
      }
      30% {
        transform: scale(1.15) rotate(10deg);
        filter: brightness(1.3);
      }
      40% {
        transform: scale(1) rotate(0deg);
        opacity: 1;
      }
      50% {
        transform: scale(1.1) rotate(-10deg);
      }
      60% {
        transform: scale(1) rotate(5deg);
        opacity: 1;
      }
      70% {
        transform: scale(1.2) rotate(0deg);
        filter: brightness(1.5);
      }
      80% {
        transform: scale(1) rotate(0deg);
      }
    }
  `,

  // Glowing border
  glow: `
    @keyframes emoticon-glow {
      0%, 100% {
        filter: drop-shadow(0 0 8px currentColor) drop-shadow(0 0 16px currentColor);
      }
      50% {
        filter: drop-shadow(0 0 16px currentColor) drop-shadow(0 0 32px currentColor);
      }
    }
  `,

  // Smooth float
  float: `
    @keyframes emoticon-float {
      0%, 100% {
        transform: translateY(0) translateX(0);
      }
      25% {
        transform: translateY(-10px) translateX(5px);
      }
      50% {
        transform: translateY(0) translateX(10px);
      }
      75% {
        transform: translateY(10px) translateX(5px);
      }
    }
  `,

  // Hit effect (for target/win)
  hit: `
    @keyframes emoticon-hit {
      0% {
        transform: scale(1) rotate(0deg);
      }
      10% {
        transform: scale(1.3) rotate(15deg);
      }
      20% {
        transform: scale(0.9) rotate(-15deg);
      }
      30% {
        transform: scale(1.1) rotate(10deg);
      }
      40% {
        transform: scale(1) rotate(0deg);
      }
      100% {
        transform: scale(1) rotate(0deg);
      }
    }
  `,

  // Celebration (for trophy)
  celebration: `
    @keyframes emoticon-celebration {
      0%, 100% {
        transform: rotate(0deg) translateY(0);
      }
      25% {
        transform: rotate(-15deg) translateY(-5px);
      }
      50% {
        transform: rotate(15deg) translateY(0);
      }
      75% {
        transform: rotate(-10deg) translateY(-3px);
      }
    }
  `,

  // Lightning effect (for mint)
  lightning: `
    @keyframes emoticon-lightning {
      0%, 100% {
        filter: drop-shadow(0 0 4px currentColor) brightness(1);
      }
      50% {
        filter: drop-shadow(0 0 20px currentColor) brightness(1.5);
      }
      75% {
        filter: drop-shadow(0 0 40px currentColor) brightness(2);
      }
    }
  `,

  // Spin slow
  spin: `
    @keyframes emoticon-spin-slow {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `
};

export const emoticonStyles = `
  /* Base emoticon container */
  .emoticon-container {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  /* Hover effects */
  .emoticon-hover-bounce {
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  .emoticon-hover-bounce:hover {
    transform: scale(1.2);
  }

  /* Glow on hover */
  .emoticon-hover-glow {
    transition: filter 0.3s ease;
  }
  
  .emoticon-hover-glow:hover {
    filter: drop-shadow(0 0 24px currentColor);
  }

  /* Sparkle overlay */
  .emoticon-sparkle-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .emoticon-hover-sparkle:hover .emoticon-sparkle-overlay {
    opacity: 1;
  }

  /* Animation classes */
  .animate-bounce-hover {
    animation: emoticon-bounce 2s ease-in-out infinite;
  }

  .animate-spin-slow {
    animation: emoticon-spin-slow 8s linear infinite;
  }

  .animate-pulse-glow {
    animation: emoticon-pulse 2s ease-in-out infinite;
  }

  .animate-sparkle {
    animation: emoticon-sparkle 3s ease-in-out infinite;
  }

  .animate-glow-pulse {
    animation: emoticon-glow 2s ease-in-out infinite;
  }

  .animate-float {
    animation: emoticon-float 4s ease-in-out infinite;
  }

  .animate-hit {
    animation: emoticon-hit 0.5s ease-out forwards;
  }

  .animate-celebration {
    animation: emoticon-celebration 1.5s ease-in-out infinite;
  }

  .animate-lightning {
    animation: emoticon-lightning 1.5s ease-in-out infinite;
  }
`;

export default emoticonStyles;
