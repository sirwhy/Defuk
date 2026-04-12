'use client';

import { useState, useEffect, useRef } from 'react';

interface LobsterIconProps {
  type: 'lobster' | 'crayfish' | 'claw' | 'shell' | 'bubble' | 'ocean' | 'fresh' | 'premium';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  animation?: 'swim' | 'wave' | 'pulse' | 'float' | 'bubble-up' | 'wave-slow' | 'fresh' | 'glow';
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  showParticles?: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  tx: string;
  ty: string;
  delay: number;
  size: string;
  color: string;
}

/**
 * Pixel Lobster Icon Component
 * All 8 icons in pixel art style (32x32 grid)
 */
export default function LobsterIcon({
  type,
  size = 'md',
  animation = 'float',
  className = '',
  onClick,
  showParticles = true,
  style
}: LobsterIconProps) {
  const [frame, setFrame] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const iconRef = useRef<HTMLDivElement>(null);
  const particleIdRef = useRef(0);

  // Animation frames loop
  useEffect(() => {
    if (animation === 'float' || animation === 'wave' || animation === 'bubble-up') {
      const interval = setInterval(() => {
        setFrame(prev => (prev + 1) % 60);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [animation]);

  // Handle click to create water splash
  const handleClick = (e: React.MouseEvent) => {
    // Call parent onClick if provided
    if (onClick) onClick();

    if (!showParticles) return;

    // Get icon position
    const iconRect = iconRef.current?.getBoundingClientRect();
    if (!iconRect) return;

    const centerX = iconRect.left + iconRect.width / 2;
    const centerY = iconRect.top + iconRect.height / 2;

    // Get cursor position
    const cursorX = e.clientX;
    const cursorY = e.clientY;

    // Calculate distance and angle
    const dx = cursorX - centerX;
    const dy = cursorY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Normalize and add some randomness for splash effect
    const angle = Math.atan2(dy, dx);
    const spread = (Math.random() - 0.5) * 0.5; // +/- 0.25 rad spread
    const finalAngle = angle + spread;

    // Create 8-12 particles
    const particleCount = 8 + Math.floor(Math.random() * 5);
    const newParticles: Particle[] = [];
    const colors = ['#006994', '#40e0d0', '#f0f8ff', '#40e0d0', '#006994'];
    const sizes = ['4px', '6px', '8px'];

    for (let i = 0; i < particleCount; i++) {
      const particleDistance = distance * (0.8 + Math.random() * 0.4); // 80-120% of cursor distance
      const tx = Math.cos(finalAngle + (Math.random() - 0.5) * 0.3) * particleDistance;
      const ty = Math.sin(finalAngle + (Math.random() - 0.5) * 0.3) * particleDistance;
      
      newParticles.push({
        id: particleIdRef.current++,
        x: centerX,
        y: centerY,
        tx: `${tx.toFixed(2)}px`,
        ty: `${ty.toFixed(2)}px`,
        delay: Math.random() * 0.1,
        size: sizes[Math.floor(Math.random() * sizes.length)],
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    setParticles(prev => [...prev, ...newParticles]);

    // Clean up particles after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.includes(p)));
    }, 500);
  };

  // Size mapping
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24',
    '2xl': 'w-32 h-32',
    '3xl': 'w-40 h-40'
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
      ref={iconRef}
      className={`relative inline-block cursor-pointer ${getAnimationClass()} ${className}`}
      onClick={handleClick}
      style={style}
    >
      <div className={`${sizeClasses[size]} relative flex items-center justify-center`}>
        {getLobsterSVG(type, frame)}
      </div>

      {/* Render particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle-water"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            background: particle.color,
            '--tx': particle.tx,
            '--ty': particle.ty,
            animationDelay: `${particle.delay}s`
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

// Pixel Lobster SVG generator (32x32 grid)
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
        <svg viewBox="0 0 32 32" className={baseClasses}>
          {/* Eyes - black pixel squares */}
          <rect x="8" y="6" width="4" height="4" fill="#000000" />
          <rect x="20" y="6" width="4" height="4" fill="#000000" />
          
          {/* Eye highlights - white pixels */}
          <rect x="9" y="7" width="2" height="2" fill="#ffffff" opacity="0.8" />
          <rect x="21" y="7" width="2" height="2" fill="#ffffff" opacity="0.8" />
          
          {/* Antennae - diagonal pixel lines */}
          <rect x="7" y="5" width="2" height="2" fill="#000000" />
          <rect x="8" y="4" width="2" height="2" fill="#000000" />
          <rect x="22" y="5" width="2" height="2" fill="#000000" />
          <rect x="24" y="4" width="2" height="2" fill="#000000" />
          
          {/* Head - main orange block */}
          <rect x="10" y="8" width="12" height="8" fill={lobsterRed} />
          
          {/* Head highlight - lighter orange pixels */}
          <rect x="12" y="9" width="4" height="4" fill={lobsterOrange} />
          
          {/* Body - red gradient blocks */}
          <rect x="8" y="16" width="16" height="8" fill={lobsterRed} />
          <rect x="10" y="20" width="12" height="6" fill={lobsterOrange} />
          
          {/* Body stripes - darker red pixels */}
          <rect x="8" y="18" width="16" height="1" fill="#cc3700" opacity="0.5" />
          <rect x="8" y="22" width="16" height="1" fill="#cc3700" opacity="0.5" />
          
          {/* Left claw - pink square block */}
          <rect x="2" y="18" width="6" height="8" fill={clawPink} />
          <rect x="3" y="19" width="4" height="6" fill="#ffb6c1" opacity="0.6" />
          
          {/* Right claw - pink square block */}
          <rect x="24" y="18" width="6" height="8" fill={clawPink} />
          <rect x="25" y="19" width="4" height="6" fill="#ffb6c1" opacity="0.6" />
          
          {/* Legs - small pixel lines */}
          <rect x="6" y="20" width="2" height="3" fill="#cc3700" />
          <rect x="9" y="23" width="2" height="3" fill="#cc3700" />
          <rect x="21" y="23" width="2" height="3" fill="#cc3700" />
          <rect x="24" y="20" width="2" height="3" fill="#cc3700" />
          
          {/* Tail - orange blocks */}
          <rect x="12" y="28" width="8" height="2" fill={lobsterOrange} />
          <rect x="4" y="27" width="4" height="4" fill={lobsterOrange} 
                 style={{ transform: `rotate(${Math.sin(frame * 0.15) * 15}deg)`, transformOrigin: '6px 28px' }} />
          <rect x="24" y="27" width="4" height="4" fill={lobsterOrange} 
                 style={{ transform: `rotate(${Math.cos(frame * 0.15) * 15}deg)`, transformOrigin: '26px 28px' }} />
          <rect x="14" y="29" width="4" height="2" fill={lobsterOrange} />
        </svg>
      );

    case 'claw':
      return (
        <svg viewBox="0 0 32 32" className={baseClasses}>
          {/* Big pixel lobster claw */}
          
          {/* Main claw body - large pink square */}
          <rect x="8" y="12" width="16" height="12" fill={clawPink} />
          
          {/* Claw highlight - lighter pink pixels */}
          <rect x="10" y="14" width="10" height="8" fill="#ffb6c1" opacity="0.7" />
          
          {/* Top - curved pixel pattern */}
          <rect x="8" y="10" width="16" height="4" fill={clawPink} />
          
          {/* Claws - two pixel blocks opening/closing */}
          <rect x="6" y="8" width="4" height="6" fill={clawPink}
                style={{ transform: `rotate(${Math.sin(frame * 0.1) * 20}deg)`, transformOrigin: '8px 12px' }} />
          <rect x="22" y="8" width="4" height="6" fill={clawPink}
                style={{ transform: `rotate(${Math.cos(frame * 0.1) * 20}deg)`, transformOrigin: '24px 12px' }} />
          
          {/* Inner detail - darker pixels */}
          <rect x="12" y="16" width="8" height="6" fill={lobsterRed} opacity="0.3" />
          
          {/* Highlight pixels */}
          <rect x="9" y="13" width="4" height="4" fill="#ffffff" opacity="0.4" />
        </svg>
      );

    case 'crayfish':
      return (
        <svg viewBox="0 0 32 32" className={baseClasses}>
          {/* Smaller pixel crayfish */}
          
          {/* Eyes - black pixels */}
          <rect x="10" y="8" width="3" height="3" fill="#000000" />
          <rect x="19" y="8" width="3" height="3" fill="#000000" />
          
          {/* Head - small orange block */}
          <rect x="12" y="10" width="8" height="5" fill="#ff4500" />
          
          {/* Antennae - tiny pixel lines */}
          <rect x="10" y="8" width="2" height="2" fill="#000000" />
          <rect x="20" y="8" width="2" height="2" fill="#000000" />
          
          {/* Body - red blocks */}
          <rect x="8" y="15" width="16" height="6" fill="#cc3700" />
          <rect x="10" y="19" width="12" height="5" fill="#ff4500" />
          
          {/* Legs - tiny pixels */}
          <rect x="6" y="18" width="2" height="2" fill="#cc3700" />
          <rect x="9" y="20" width="2" height="2" fill="#cc3700" />
          <rect x="21" y="20" width="2" height="2" fill="#cc3700" />
          <rect x="24" y="18" width="2" height="2" fill="#cc3700" />
        </svg>
      );

    case 'bubble':
      return (
        <svg viewBox="0 0 32 32" className={baseClasses}>
          {/* Multiple pixel bubbles rising */}
          
          {/* Small bubble */}
          <rect x="10" y="22" width="4" height="4" fill={foamWhite} opacity="0.3" />
          
          {/* Medium bubble */}
          <rect x="14" y="16" width="6" height="6" fill={foamWhite} opacity="0.5" stroke={oceanLight} strokeWidth="1" />
          
          {/* Large bubble with highlight */}
          <rect x="16" y="10" width="8" height="8" fill={foamWhite} opacity="0.7" stroke={oceanLight} strokeWidth="1" />
          <rect x="18" y="12" width="4" height="4" fill="#ffffff" opacity="0.6" />
          
          {/* Tiny bubble */}
          <rect x="6" y="18" width="3" height="3" fill={foamWhite} opacity="0.25" />
          
          {/* Extra tiny bubble */}
          <rect x="22" y="20" width="2" height="2" fill={foamWhite} opacity="0.2" />
          
          {/* Rising animation - multiple bubbles at different heights */}
          <rect x="12" y={18 + (frame % 60) * 0.25} width="5" height="5" fill={foamWhite} opacity="0.4" />
          <rect x="18" y={8 + (frame % 60) * 0.25} width="7" height="7" fill={foamWhite} opacity="0.6" />
        </svg>
      );

    case 'ocean':
      return (
        <svg viewBox="0 0 32 32" className={baseClasses}>
          {/* Pixel ocean waves - horizontal lines */}
          
          {/* Top wave line - darker blue */}
          <rect x="0" y="12" width="32" height="4" fill={oceanBlue} opacity="0.3" />
          <rect x="0" y="13" width="32" height="2" fill={oceanLight} opacity="0.5" />
          
          {/* Bottom wave - lighter */}
          <rect x="0" y="18" width="32" height="4" fill={oceanBlue} opacity="0.4" />
          <rect x="0" y="19" width="32" height="2" fill={oceanLight} opacity="0.6" />
          
          {/* Wave peaks - pixel pattern */}
          <rect x="4" y="10" width="2" height="3" fill={oceanBlue} opacity="0.3" />
          <rect x="12" y="8" width="2" height="4" fill={oceanBlue} opacity="0.3" />
          <rect x="20" y="10" width="2" height="3" fill={oceanBlue} opacity="0.3" />
          <rect x="28" y="8" width="2" height="4" fill={oceanBlue} opacity="0.3" />
          
          {/* Foam bubbles */}
          <rect x={8 + (frame % 60) * 0.15} y="12" width="2" height="2" fill={foamWhite} opacity="0.8" />
          <rect x={16 + (frame % 60) * 0.15} y="12" width="2" height="2" fill={foamWhite} opacity="0.8" />
          <rect x={24 + (frame % 60) * 0.15} y="12" width="2" height="2" fill={foamWhite} opacity="0.8" />
        </svg>
      );

    case 'fresh':
      return (
        <svg viewBox="0 0 32 32" className={baseClasses}>
          {/* Fresh seafood pixel icon */}
          
          {/* Circle border - pixel approximation */}
          <rect x="4" y="4" width="24" height="24" fill="none" stroke={oceanLight} strokeWidth="2" />
          <rect x="6" y="6" width="20" height="20" fill="none" stroke={oceanBlue} strokeWidth="1" />
          
          {/* Fresh leaf/check mark - diagonal pixels */}
          <rect x="14" y="10" width="4" height="10" fill={oceanBlue} />
          <rect x="12" y="16" width="4" height="4" fill={oceanBlue} />
          <rect x="16" y="16" width="4" height="4" fill={oceanBlue} />
          
          {/* Sparkles - small white pixel clusters */}
          <rect x={6 + Math.sin((frame + 0) * 0.1) * 12} y={6 + Math.cos((frame + 0) * 0.1) * 12} width="2" height="2" fill={shellGold} opacity="0.8" />
          <rect x={6 + Math.sin((frame + 90) * 0.1) * 12} y={6 + Math.cos((frame + 90) * 0.1) * 12} width="2" height="2" fill={shellGold} opacity="0.8" />
          <rect x={6 + Math.sin((frame + 180) * 0.1) * 12} y={6 + Math.cos((frame + 180) * 0.1) * 12} width="2" height="2" fill={shellGold} opacity="0.8" />
          <rect x={6 + Math.sin((frame + 270) * 0.1) * 12} y={6 + Math.cos((frame + 270) * 0.1) * 12} width="2" height="2" fill={shellGold} opacity="0.8" />
          
          {/* Center dot */}
          <rect x="15" y="14" width="2" height="2" fill={oceanBlue} />
        </svg>
      );

    case 'premium':
      return (
        <svg viewBox="0 0 32 32" className={baseClasses}>
          {/* Premium gold crown - pixel style */}
          
          {/* Crown base */}
          <rect x="4" y="20" width="24" height="4" fill={shellGold} stroke="#d4af37" strokeWidth="1" />
          
          {/* Crown spikes - triangular pixel pattern */}
          <rect x="6" y="14" width="4" height="8" fill={shellGold} stroke="#d4af37" strokeWidth="1" />
          <rect x="10" y="10" width="4" height="12" fill={shellGold} stroke="#d4af37" strokeWidth="1" />
          <rect x="14" y="8" width="4" height="14" fill={shellGold} stroke="#d4af37" strokeWidth="1" />
          <rect x="18" y="10" width="4" height="12" fill={shellGold} stroke="#d4af37" strokeWidth="1" />
          <rect x="22" y="14" width="4" height="8" fill={shellGold} stroke="#d4af37" strokeWidth="1" />
          
          {/* Gems - colored squares */}
          <rect x="6" y="14" width="2" height="2" fill="#ff0066" opacity="0.8" />
          <rect x="14" y="8" width="4" height="4" fill="#0066ff" opacity="0.8" />
          <rect x="24" y="14" width="2" height="2" fill="#ff0066" opacity="0.8" />
          
          {/* Shine - white pixel */}
          <rect x="15" y="10" width="2" height="2" fill="#ffffff" opacity="0.9" />
        </svg>
      );

    case 'shell':
      return (
        <svg viewBox="0 0 32 32" className={baseClasses}>
          {/* Pixel sea shell - rounded shape approximation */}
          
          {/* Outer shell - white blocks */}
          <rect x="4" y="4" width="4" height="8" fill={foamWhite} stroke={oceanBlue} strokeWidth="1" />
          <rect x="8" y="6" width="16" height="6" fill={foamWhite} stroke={oceanBlue} strokeWidth="1" />
          <rect x="24" y="4" width="4" height="8" fill={foamWhite} stroke={oceanBlue} strokeWidth="1" />
          <rect x="6" y="12" width="20" height="10" fill={foamWhite} stroke={oceanBlue} strokeWidth="1" />
          <rect x="8" y="22" width="16" height="6" fill={foamWhite} stroke={oceanBlue} strokeWidth="1" />
          <rect x="10" y="26" width="12" height="4" fill={foamWhite} stroke={oceanBlue} strokeWidth="1" />
          
          {/* Inner spiral - pixel rings */}
          <rect x="12" y="12" width="8" height="12" fill="none" stroke={oceanLight} strokeWidth="1" />
          <rect x="14" y="14" width="6" height="8" fill="none" stroke={oceanLight} strokeWidth="1" />
          
          {/* Shine - light pixels */}
          <rect x="10" y="12" width="4" height="6" fill="#ffffff" opacity="0.6" />
          <rect x="22" y="14" width="3" height="5" fill="#ffffff" opacity="0.5" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 32 32" className={baseClasses}>
          <rect x="6" y="6" width="20" height="20" fill={lobsterRed} />
        </svg>
      );
  }
}
