'use client';

import { useState, useEffect } from 'react';

interface LobsterIconProps {
  type: 'lobster' | 'crayfish' | 'claw' | 'shell' | 'bubble' | 'ocean' | 'fresh' | 'premium';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  animation?: 'swim' | 'wave' | 'pulse' | 'float' | 'bubble-up' | 'wave-slow' | 'fresh' | 'glow';
  className?: string;
  onClick?: () => void;
}

/**
 * Lobster Icon Component
 * Ocean-inspired animated icons
 * Inspired by Higgsfield.ai & MotionSite.ai
 */
export default function LobsterIcon({
  type,
  size = 'md',
  animation = 'float',
  className = '',
  onClick
}: LobsterIconProps) {
  const [frame, setFrame] = useState(0);

  // Animation frames loop
  useEffect(() => {
    if (animation === 'float' || animation === 'wave' || animation === 'bubble-up') {
      const interval = setInterval(() => {
        setFrame(prev => (prev + 1) % 60);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [animation]);

  // Size mapping
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24',
    '2xl': 'w-32 h-32'
  };

  // Animation classes based on type
  const getAnimationClass = () => {
    switch (animation) {
      case 'swim':
        return 'animate-lobster-swim';
      case 'wave':
        return 'animate-lobster-wave';
      case 'pulse':
        return 'animate-lobster-pulse';
      case 'float':
        return 'animate-lobster-float';
      case 'bubble-up':
        return 'animate-bubble-up';
      case 'wave-slow':
        return 'animate-ocean-wave';
      case 'fresh':
        return 'animate-fresh-splash';
      case 'glow':
        return 'animate-glow-soft';
      default:
        return '';
    }
  };

  return (
    <div
      className={`relative inline-block ${getAnimationClass()} ${className}`}
      onClick={onClick}
    >
      <div className={`${sizeClasses[size]} relative flex items-center justify-center`}>
        {getLobsterSVG(type, frame)}
      </div>
    </div>
  );
}

// Lobster SVG generator
function getLobsterSVG(type: string, frame: number) {
  const baseClasses = 'w-full h-full';
  
  // Color palette
  const lobsterRed = '#ff4500';
  const lobsterOrange = '#ff6b35';
  const oceanBlue = '#006994';
  const oceanLight = '#40e0d0';
  const foamWhite = '#f0f8ff';
  const shellGold = '#ffd700';
  const clawPink = '#ffb6c1';

  switch (type) {
    case 'lobster':
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          {/* Main body - rounded organic shape */}
          <path 
            d="M50 15 C60 10, 70 20, 75 35 C80 50, 75 70, 65 85 C60 92, 40 92, 35 85 C25 70, 20 50, 25 35 C30 20, 40 10, 50 15 Z" 
            fill={`url(#lobster-gradient-${type})`}
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id={`lobster-gradient-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: lobsterRed, stopOpacity: 1}} />
              <stop offset="50%" style={{stopColor: lobsterOrange, stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#ff2a00', stopOpacity: 1}} />
            </linearGradient>
          </defs>
          
          {/* Eyes */}
          <circle cx="40" cy="25" r="4" fill="#000000" />
          <circle cx="60" cy="25" r="4" fill="#000000" />
          <circle cx="41" cy="24" r="1.5" fill="#ffffff" opacity="0.8" />
          <circle cx="61" cy="24" r="1.5" fill="#ffffff" opacity="0.8" />
          
          {/* Antennae - animate with frame */}
          <path 
            d="M40 18 Q30 8, 25 5" 
            stroke="#000000" 
            strokeWidth="2" 
            fill="none"
            style={{ transform: `translateY(${Math.sin(frame * 0.1) * 2}px)` }}
          />
          <path 
            d="M60 18 Q70 8, 75 5" 
            stroke="#000000" 
            strokeWidth="2" 
            fill="none"
            style={{ transform: `translateY(${Math.cos(frame * 0.1) * 2}px)` }}
          />
          
          {/* Claws - big and prominent */}
          <ellipse cx="25" cy="55" rx="8" ry="12" fill={clawPink} />
          <ellipse cx="75" cy="55" rx="8" ry="12" fill={clawPink} />
          <circle cx="25" cy="55" r="5" fill="#ffb6c1" opacity="0.6" />
          <circle cx="75" cy="55" r="5" fill="#ffb6c1" opacity="0.6" />
          
          {/* Tail fins */}
          <path 
            d="M35 88 L25 98 L35 95" 
            fill={lobsterOrange}
            style={{ transform: `rotate(${Math.sin(frame * 0.15) * 10}deg)`, transformOrigin: '35px 88px' }}
          />
          <path 
            d="M65 88 L75 98 L65 95" 
            fill={lobsterOrange}
            style={{ transform: `rotate(${Math.cos(frame * 0.15) * 10}deg)`, transformOrigin: '65px 88px' }}
          />
          <path 
            d="M50 88 L50 98 L55 95 L45 95 Z" 
            fill={lobsterOrange}
          />
          
          {/* Shell texture - subtle stripes */}
          <path d="M35 30 Q50 35, 65 30" stroke="#cc3700" strokeWidth="1" fill="none" opacity="0.5" />
          <path d="M35 45 Q50 50, 65 45" stroke="#cc3700" strokeWidth="1" fill="none" opacity="0.5" />
          <path d="M35 60 Q50 65, 65 60" stroke="#cc3700" strokeWidth="1" fill="none" opacity="0.5" />
        </svg>
      );

    case 'claw':
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          {/* Big lobster claw */}
          <ellipse cx="50" cy="60" rx="25" ry="20" fill={clawPink} />
          <ellipse cx="50" cy="60" rx="15" ry="12" fill="#ffb6c1" opacity="0.7" />
          
          {/* Claw fingers */}
          <path d="M35 45 L25 35 L30 40 Z" fill={clawPink} />
          <path d="M65 45 L75 35 L70 40 Z" fill={clawPink} />
          
          {/* Claw opening animation */}
          <path 
            d="M35 45 Q20 30, 25 35" 
            stroke={lobsterRed} 
            strokeWidth="3" 
            fill="none"
            style={{ transform: `rotate(${Math.sin(frame * 0.1) * 15}deg)`, transformOrigin: '35px 45px' }}
          />
          <path 
            d="M65 45 Q80 30, 75 35" 
            stroke={lobsterRed} 
            strokeWidth="3" 
            fill="none"
            style={{ transform: `rotate(${Math.cos(frame * 0.1) * 15}deg)`, transformOrigin: '65px 45px' }}
          />
          
          {/* Highlight */}
          <ellipse cx="45" cy="55" rx="8" ry="5" fill="#ffffff" opacity="0.4" />
        </svg>
      );

    case 'bubble':
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          {/* Multiple bubbles rising */}
          {[0, 15, 30, 45, 60].map((offset, i) => (
            <circle
              key={i}
              cx="50"
              cy={50 + offset + (frame % 60) * 0.3}
              r={8 - i}
              fill={foamWhite}
              opacity={0.3 - i * 0.05}
              stroke={oceanLight}
              strokeWidth="1"
            />
          ))}
          
          {/* Large bubble highlight */}
          <circle cx="50" cy={50 + (frame % 60) * 0.3} r="6" fill="#ffffff" opacity="0.6" />
        </svg>
      );

    case 'ocean':
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          {/* Ocean waves */}
          <path 
            d="M0 50 Q25 30, 50 50 T100 50" 
            stroke={oceanBlue} 
            strokeWidth="8" 
            fill="none"
            opacity="0.3"
          />
          <path 
            d="M0 60 Q25 40, 50 60 T100 60" 
            stroke={oceanLight} 
            strokeWidth="6" 
            fill="none"
            opacity="0.5"
          />
          
          {/* Foam */}
          {[20, 50, 80].map((x, i) => (
            <circle
              key={i}
              cx={x + (frame % 60) * 0.2}
              cy="50"
              r="3"
              fill={foamWhite}
              opacity="0.8"
            />
          ))}
        </svg>
      );

    case 'fresh':
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          {/* Fresh seafood icon */}
          <circle cx="50" cy="50" r="40" fill="none" stroke={oceanLight} strokeWidth="3" />
          
          {/* Leaf/fresh mark */}
          <path 
            d="M50 30 Q60 40, 50 50 Q40 60, 50 70" 
            stroke={oceanBlue} 
            strokeWidth="4" 
            fill="none"
          />
          <ellipse cx="50" cy="40" rx="8" ry="15" fill="none" stroke={oceanBlue} strokeWidth="2" />
          
          {/* Sparkles */}
          {[0, 90, 180, 270].map((deg, i) => (
            <circle
              key={i}
              cx={50 + Math.cos((deg + frame * 2) * 0.017) * 30}
              cy={50 + Math.sin((deg + frame * 2) * 0.017) * 30}
              r="2"
              fill={shellGold}
              opacity="0.8"
            />
          ))}
        </svg>
      );

    case 'premium':
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          {/* Premium crown */}
          <path 
            d="M20 80 L25 50 L50 65 L75 50 L80 80 Z" 
            fill={shellGold}
            stroke="#d4af37"
            strokeWidth="2"
          />
          
          {/* Gems */}
          <circle cx="25" cy="50" r="4" fill="#ff0066" opacity="0.8" />
          <circle cx="50" cy="45" r="5" fill="#0066ff" opacity="0.8" />
          <circle cx="75" cy="50" r="4" fill="#ff0066" opacity="0.8" />
          
          {/* Shine */}
          <circle cx="50" cy="50" r="3" fill="#ffffff" opacity="0.9" />
        </svg>
      );

    case 'crayfish':
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          {/* Smaller crayfish */}
          <ellipse cx="50" cy="60" rx="30" ry="15" fill="#cc3700" />
          
          {/* Head */}
          <circle cx="50" cy="45" r="12" fill="#ff4500" />
          
          {/* Antennae */}
          <path d="M45 40 L40 30 L42 35 Z" fill="#000000" />
          <path d="M55 40 L60 30 L58 35 Z" fill="#000000" />
          
          {/* Legs - subtle */}
          {[35, 42, 58, 65].map((x, i) => (
            <line
              key={i}
              x1={x}
              y1="60"
              x2={x + (i % 2 === 0 ? -5 : 5)}
              y2="70"
              stroke="#cc3700"
              strokeWidth="2"
            />
          ))}
        </svg>
      );

    case 'shell':
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          {/* Sea shell */}
          <path 
            d="M50 85 C30 85, 20 60, 20 50 C20 30, 35 15, 50 15 C65 15, 80 30, 80 50 C80 60, 70 85, 50 85 Z" 
            fill={foamWhite}
            stroke={oceanBlue}
            strokeWidth="2"
          />
          
          {/* Shell spiral */}
          <ellipse cx="50" cy="55" rx="15" ry="20" fill="none" stroke={oceanLight} strokeWidth="2" />
          <path d="M50 50 Q60 40, 50 30 Q40 40, 50 50" fill="none" stroke={oceanLight} strokeWidth="1" />
          
          {/* Shine */}
          <ellipse cx="45" cy="50" rx="8" ry="12" fill="#ffffff" opacity="0.6" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          <circle cx="50" cy="50" r="40" fill={lobsterRed} />
        </svg>
      );
  }
}
