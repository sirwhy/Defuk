/**
 * Pixel Game Animations
 * 8-bit retro game style animations
 * Inspired by Higgsfield.ai pixel art and MotionSite.ai motion effects
 */

/* ================================
   Pixel Game Animations
   ================================ */

/* Pixel Bounce (8-bit game jump) */
@keyframes pixel-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20%);
  }
}

@keyframes pixel-bounce-hard {
  0%, 100% {
    transform: translateY(0) scaleY(1);
  }
  10% {
    transform: translateY(-10%) scaleY(1.1);
  }
  20% {
    transform: translateY(-30%) scaleY(0.9);
  }
  30% {
    transform: translateY(0) scaleY(1);
  }
}

/* Pixel Idle (subtle game hover) */
@keyframes pixel-idle {
  0%, 100% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.05);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.02);
  }
}

/* Pixel Spin (8-bit rotation) */
@keyframes pixel-spin {
  0% {
    transform: rotate(0deg) scale(1);
  }
  25% {
    transform: rotate(90deg) scale(1.1);
  }
  50% {
    transform: rotate(180deg) scale(1);
  }
  75% {
    transform: rotate(270deg) scale(1.1);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}

/* Pixel Pulse (game power-up) */
@keyframes pixel-pulse {
  0%, 100% {
    transform: scale(1);
    filter: brightness(1);
    box-shadow: 0 0 0 #000000;
  }
  50% {
    transform: scale(1.15);
    filter: brightness(1.3);
    box-shadow: 0 0 10px currentColor, 0 0 20px currentColor;
  }
}

/* Pixel Shake (hit effect) */
@keyframes pixel-shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-4px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(4px);
  }
}

/* Pixel Float (levitation) */
@keyframes pixel-float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

/* Pixel Wiggle (excitement) */
@keyframes pixel-wiggle {
  0%, 100% {
    transform: rotate(-5deg);
  }
  50% {
    transform: rotate(5deg);
  }
}

/* CRT Scanline Effect */
@keyframes scanline {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}

/* Pixel Flash (hit/collect) */
@keyframes pixel-flash {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Retro Grid Animation (background) */
@keyframes retro-grid-move {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 50px;
  }
}

/* Pixel Glitch Effect */
@keyframes pixel-glitch {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
  100% {
    transform: translate(0);
  }
}

/* Neon Pulse (cyberpunk) */
@keyframes neon-pulse {
  0%, 100% {
    box-shadow: 0 0 5px currentColor, 0 0 10px currentColor;
  }
  50% {
    box-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
  }
}

/* Star Sparkle (collect animation) */
@keyframes star-sparkle {
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.5) rotate(180deg);
    opacity: 1;
  }
  100% {
    transform: scale(0) rotate(360deg);
    opacity: 0;
  }
}

/* Coin Pop (money/earn) */
@keyframes coin-pop {
  0% {
    transform: scale(0) translateY(0);
  }
  50% {
    transform: scale(1.2) translateY(-10px);
  }
  100% {
    transform: scale(1) translateY(0);
  }
}

/* Arrow Bounce (directional) */
@keyframes arrow-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

/* Heartbeat (love/favorite) */
@keyframes pixel-heartbeat {
  0%, 100% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.15);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.15);
  }
  70% {
    transform: scale(1);
  }
}

/* ================================
   Animation Utility Classes
   ================================ */

/* Bounce animations */
.animate-pixel-bounce {
  animation: pixel-bounce 0.6s ease-in-out infinite;
}

.animate-pixel-bounce-hard {
  animation: pixel-bounce-hard 0.5s ease-in-out infinite;
}

/* Idle animations */
.animate-pixel-idle {
  animation: pixel-idle 2s ease-in-out infinite;
}

/* Spin animations */
.animate-pixel-spin {
  animation: pixel-spin 2s linear infinite;
}

/* Pulse animations */
.animate-pixel-pulse {
  animation: pixel-pulse 1.5s ease-in-out infinite;
}

/* Shake animations */
.animate-pixel-shake {
  animation: pixel-shake 0.3s ease-in-out infinite;
}

/* Float animations */
.animate-pixel-float {
  animation: pixel-float 3s ease-in-out infinite;
}

/* Wiggle animations */
.animate-pixel-wiggle {
  animation: pixel-wiggle 0.5s ease-in-out infinite;
}

/* CRT effects */
.animate-scanline {
  animation: scanline 2s linear infinite;
}

/* Flash effects */
.animate-pixel-flash {
  animation: pixel-flash 0.2s ease-in-out infinite;
}

/* Grid animations */
.animate-retro-grid {
  animation: retro-grid-move 1s linear infinite;
}

/* Glitch effects */
.animate-pixel-glitch {
  animation: pixel-glitch 0.3s ease-in-out infinite;
}

/* Neon effects */
.animate-neon-pulse {
  animation: neon-pulse 2s ease-in-out infinite;
}

/* Sparkle effects */
.animate-star-sparkle {
  animation: star-sparkle 1s ease-in-out infinite;
}

/* Coin effects */
.animate-coin-pop {
  animation: coin-pop 0.5s ease-in-out infinite;
}

/* Arrow animations */
.animate-arrow-bounce {
  animation: arrow-bounce 1s ease-in-out infinite;
}

/* Heartbeat effects */
.animate-pixel-heartbeat {
  animation: pixel-heartbeat 1s ease-in-out infinite;
}

/* Hover effects */
.pixel-hover-bounce:hover {
  animation: pixel-bounce-hard 0.4s ease-in-out;
}

.pixel-hover-glitch:hover {
  animation: pixel-glitch 0.3s ease-in-out;
}

.pixel-hover-pulse:hover {
  animation: pixel-pulse 0.3s ease-in-out;
}

.pixel-hover-wiggle:hover {
  animation: pixel-wiggle 0.3s ease-in-out;
}
