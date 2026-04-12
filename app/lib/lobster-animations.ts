/**
 * Lobster Ocean Animations
 * Inspired by Higgsfield.ai & MotionSite.ai
 * Fluid, organic, ocean-inspired motions
 */

/* ================================
   Ocean-inspired Animations
   ================================ */

/* Lobster Swim - Smooth swimming motion */
@keyframes lobster-swim {
  0% {
    transform: translateY(0) rotate(0deg) scaleX(1);
  }
  25% {
    transform: translateY(-8px) rotate(2deg) scaleX(1.02);
  }
  50% {
    transform: translateY(0) rotate(0deg) scaleX(1);
  }
  75% {
    transform: translateY(-4px) rotate(-2deg) scaleX(0.98);
  }
  100% {
    transform: translateY(0) rotate(0deg) scaleX(1);
  }
}

/* Lobster Wave - Gentle waving motion */
@keyframes lobster-wave {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(8deg);
  }
  75% {
    transform: rotate(-8deg);
  }
}

/* Lobster Pulse - Soft organic pulse */
@keyframes lobster-pulse {
  0%, 100% {
    transform: scale(1);
    filter: brightness(1);
  }
  50% {
    transform: scale(1.08);
    filter: brightness(1.15);
    box-shadow: 0 0 30px rgba(255, 69, 0, 0.4);
  }
}

/* Lobster Float - Effortless floating */
@keyframes lobster-float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-6px) translateX(3px);
  }
  50% {
    transform: translateY(0) translateX(0);
  }
  75% {
    transform: translateY(-3px) translateX(-2px);
  }
}

/* Bubble Up - Rising bubbles */
@keyframes bubble-up {
  0% {
    transform: translateY(0) scale(0.5);
    opacity: 0;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(-60px) scale(1.2);
    opacity: 0;
  }
}

/* Ocean Wave - Rolling ocean waves */
@keyframes ocean-wave {
  0%, 100% {
    transform: translateX(0) scaleX(1);
  }
  50% {
    transform: translateX(5px) scaleX(1.05);
  }
}

/* Fresh Splash - Fresh seafood splash */
@keyframes fresh-splash {
  0%, 100% {
    transform: scale(1) rotate(0deg);
  }
  10% {
    transform: scale(1.1) rotate(5deg);
  }
  20% {
    transform: scale(1.05) rotate(-5deg);
  }
  50% {
    transform: scale(1.15) rotate(0deg);
    filter: drop-shadow(0 0 15px rgba(64, 224, 208, 0.6));
  }
  80% {
    transform: scale(1.05) rotate(-3deg);
  }
}

/* Soft Glow - Gentle glowing effect */
@keyframes glow-soft {
  0%, 100% {
    box-shadow: 0 0 10px rgba(255, 69, 0, 0.3);
  }
  50% {
    box-shadow: 0 0 25px rgba(255, 69, 0, 0.6), 
                0 0 40px rgba(255, 107, 53, 0.4);
  }
}

/* Ocean Flow - Continuous ocean current */
@keyframes ocean-flow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Sea Foam - Foamy water effect */
@keyframes sea-foam {
  0%, 100% {
    transform: translateX(0);
    opacity: 0.6;
  }
  50% {
    transform: translateX(10px);
    opacity: 0.8;
  }
}

/* Tide - Rising and falling tide */
@keyframes tide {
  0%, 100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(1.03);
  }
}

/* Shell Open - Opening shell animation */
@keyframes shell-open {
  0% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.95);
  }
  100% {
    transform: scaleY(1);
  }
}

/* Claws - Lobster claws clamping */
@keyframes claw-clamp {
  0%, 100% {
    transform: scaleX(1);
  }
  50% {
    transform: scaleX(0.95);
  }
}

/* Fresh Splash Particles - Multiple splash particles */
@keyframes splash-particle {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(var(--tx), var(--ty)) scale(0);
    opacity: 0;
  }
}

/* Ocean Gradient Flow - Animated gradient background */
@keyframes ocean-gradient-flow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Water Ripple - Concentric ripples */
@keyframes water-ripple {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

/* Floaty Bubbles - Multiple bubbles floating */
@keyframes floaty-bubbles {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  33% {
    transform: translateY(-15px) translateX(8px);
  }
  66% {
    transform: translateY(-8px) translateX(-5px);
  }
}

/* Organic Pulse - Breathing organic motion */
@keyframes organic-pulse {
  0%, 100% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.07) rotate(1deg);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.05) rotate(-1deg);
  }
}

/* ================================
   Animation Utility Classes
   ================================ */

/* Lobster Animations */
.animate-lobster-swim {
  animation: lobster-swim 3s ease-in-out infinite;
}

.animate-lobster-wave {
  animation: lobster-wave 2s ease-in-out infinite;
}

.animate-lobster-pulse {
  animation: lobster-pulse 2s ease-in-out infinite;
}

.animate-lobster-float {
  animation: lobster-float 4s ease-in-out infinite;
}

/* Bubble Animations */
.animate-bubble-up {
  animation: bubble-up 2s ease-out infinite;
}

/* Ocean Animations */
.animate-ocean-wave {
  animation: ocean-wave 3s ease-in-out infinite;
}

/* Fresh Animations */
.animate-fresh-splash {
  animation: fresh-splash 1.5s ease-in-out infinite;
}

/* Glow Animations */
.animate-glow-soft {
  animation: glow-soft 3s ease-in-out infinite;
}

/* Flow Animations */
.animate-ocean-flow {
  animation: ocean-flow 8s linear infinite;
  background-size: 200% 200%;
}

/* Foam Animations */
.animate-sea-foam {
  animation: sea-foam 2s ease-in-out infinite;
}

/* Tide Animations */
.animate-tide {
  animation: tide 5s ease-in-out infinite;
}

/* Shell Animations */
.animate-shell-open {
  animation: shell-open 2s ease-in-out infinite;
}

/* Claw Animations */
.animate-claw-clamp {
  animation: claw-clamp 1.5s ease-in-out infinite;
}

/* Ripple Animations */
.animate-water-ripple {
  animation: water-ripple 1.5s ease-out infinite;
}

/* Bubble Chain Animations */
.animate-floaty-bubbles {
  animation: floaty-bubbles 3s ease-in-out infinite;
}

/* Organic Animations */
.animate-organic-pulse {
  animation: organic-pulse 3s ease-in-out infinite;
}

/* ================================
   Hover Effects
   ================================ */

.lobster-hover-swim:hover {
  animation: lobster-swim 2s ease-in-out;
}

.lobster-hover-pulse:hover {
  animation: lobster-pulse 0.8s ease-in-out;
}

.lobster-hover-wave:hover {
  animation: lobster-wave 0.5s ease-in-out;
}

.lobster-hover-float:hover {
  animation: lobster-float 1s ease-in-out;
}

/* ================================
   Gradient Definitions
   ================================ */

/* Lobster gradient */
.bg-gradient-lobster {
  background: linear-gradient(135deg, #ff4500 0%, #ff6b35 50%, #ff2a00 100%);
}

/* Ocean gradient */
.bg-gradient-ocean {
  background: linear-gradient(135deg, #006994 0%, #40e0d0 50%, #f0f8ff 100%);
  background-size: 200% 200%;
  animation: ocean-gradient-flow 8s ease infinite;
}

/* Fresh gradient */
.bg-gradient-fresh {
  background: linear-gradient(135deg, #40e0d0 0%, #f0f8ff 50%, #e0ffff 100%);
}

/* Premium gradient */
.bg-gradient-premium {
  background: linear-gradient(135deg, #ffd700 0%, #d4af37 50%, #fff8dc 100%);
}

/* ================================
   Shadow Effects
   ================================ */

/* Lobster glow shadow */
.shadow-lobster-glow {
  box-shadow: 
    0 0 20px rgba(255, 69, 0, 0.4),
    0 0 40px rgba(255, 107, 53, 0.2);
}

/* Ocean wave shadow */
.shadow-ocean-wave {
  box-shadow: 
    0 10px 30px rgba(0, 105, 148, 0.3),
    0 0 60px rgba(64, 224, 208, 0.15);
}

/* Fresh splash shadow */
.shadow-fresh-splash {
  box-shadow: 
    0 5px 20px rgba(64, 224, 208, 0.4),
    0 0 40px rgba(64, 224, 208, 0.2);
}

/* ================================
   Blend Modes
   ================================ */

.blend-mode-overlay {
  mix-blend-mode: overlay;
}

.blend-mode-screen {
  mix-blend-mode: screen;
}

.blend-mode-hard-light {
  mix-blend-mode: hard-light;
}

/* ================================
   Blur Effects
   ================================ */

/* Soft ocean blur */
.blur-ocean-soft {
  filter: blur(3px);
  opacity: 0.8;
}

/* Water ripple blur */
.blur-water-ripple {
  filter: blur(2px);
  animation: water-ripple 1.5s ease-out infinite;
}

/* Depth blur for 3D effect */
.blur-depth {
  filter: blur(0.5px);
  opacity: 0.9;
}
