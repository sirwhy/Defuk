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
    e.preventDefault();
    e.stopPropagation();

    // Call parent onClick if provided
    if (onClick) onClick();

    if (!showParticles) return;

    // Get icon position FIRST
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

    console.log('🦞 LobsterIcon clicked!', { centerX, centerY, cursorX, cursorY });
    console.log(`🌊 Creating ${particleCount} particles`);

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

    console.log('✨ Particles created, updating state');
    setParticles(prev => [...prev, ...newParticles]);

    // Clean up particles after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.includes(p)));
      console.log('🧹 Particles cleaned up');
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
          {/* EXTREME ANTENNAE - Very long like real lobster */}
          <rect x="7" y="2" width="2" height="5" fill="#000000" />
          <rect x="8" y="2" width="2" height="5" fill="#000000" />
          <rect x="7" y="3" width="1" height="2" fill="#000000" opacity="0.9" />
          <rect x="22" y="2" width="2" height="5" fill="#000000" />
          <rect x="23" y="2" width="2" height="5" fill="#000000" />
          <rect x="22" y="3" width="1" height="2" fill="#000000" opacity="0.9" />
          <rect x="7" y="2" width="1" height="1" fill="#000000" opacity="0.5" />
          <rect x="23" y="2" width="1" height="1" fill="#000000" opacity="0.5" />
          
          {/* BIG EYES on long stalks - Very prominent */}
          <rect x="8" y="4" width="4" height="3" fill="#000000" />
          <rect x="20" y="4" width="4" height="3" fill="#000000" />
          <rect x="8" y="4" width="2" height="2" fill="#ffffff" opacity="0.9" />
          <rect x="20" y="4" width="2" height="2" fill="#ffffff" opacity="0.9" />
          <rect x="9" y="5" width="1" height="1" fill="#ffffff" opacity="1" />
          <rect x="21" y="5" width="1" height="1" fill="#ffffff" opacity="1" />
          {/* Eye stalks */}
          <rect x="10" y="6" width="2" height="1" fill="#000000" />
          <rect x="20" y="6" width="2" height="1" fill="#000000" />
          
          /* HEAD - Compact but with detail
          <rect x="9" y="7" width="14" height="4" fill={lobsterRed} />
          <rect x="12" y="6" width="4" height="2" fill={lobsterOrange} />
          {/* Rostrum spike */}
          <rect x="12" y="5" width="3" height="1" fill={lobsterOrange} />
          <rect x="13" y="4" width="2" height="1" fill={lobsterRed} />
          {/* Head segmentation */}
          <rect x="9" y="7" width="3" height="2" fill={lobsterOrange} />
          <rect x="19" y="7" width="3" height="2" fill={lobsterOrange} />
          {/* Top head detail */}
          <rect x="10" y="8" width="1" height="1" fill={lobsterOrange} opacity="0.6" />
          <rect x="21" y="8" width="1" height="1" fill={lobsterOrange} opacity="0.6" />
          
          {/* THORAX - Connects head to abdomen */}
          <rect x="7" y="10" width="18" height="4" fill={lobsterRed} />
          <rect x="10" y="11" width="4" height="1" fill={lobsterOrange} opacity="0.4" />
          <rect x="17" y="11" width="4" height="1" fill={lobsterOrange} opacity="0.4" />
          {/* Thorax texture */}
          <rect x="11" y="12" width="10" height="1" fill={lobsterOrange} opacity="0.3" />
          
          {/* ABDOMEN - 6 CLEAR SEGMENTS, TAPERING */}
          {/* Segment 1 */}
          <rect x="6" y="13" width="6" height="2" fill={lobsterOrange} />
          <rect x="6" y="14" width="6" height="1" fill={lobsterOrange} opacity="0.6" />
          {/* Segment 2 */}
          <rect x="4" y="15" width="8" height="2" fill={lobsterRed} />
          <rect x="5" y="16" width="6" height="1" fill={lobsterOrange} opacity="0.4" />
          {/* Segment 3 */}
          <rect x="3" y="17" width="10" height="2" fill={lobsterOrange} />
          <rect x="4" y="18" width="8" height="1" fill={lobsterOrange} opacity="0.4" />
          {/* Segment 4 */}
          <rect x="3" y="19" width="10" height="2" fill={lobsterRed} />
          <rect x="4" y="20" width="8" height="1" fill={lobsterOrange} opacity="0.4" />
          {/* Segment 5 */}
          <rect x="2" y="21" width="10" height="2" fill={lobsterOrange} />
          <rect x="3" y="22" width="8" height="1" fill={lobsterOrange} opacity="0.4" />
          {/* Segment 6 - Tail base */}
          <rect x="2" y="23" width="10" height="2" fill={lobsterRed} />
          <rect x="3" y="24" width="6" height="1" fill={lobsterOrange} opacity="0.4" />
          
          {/* MASSIVE CLAWS - The main feature! */}
          {/* LEFT CLAW */}
          {/* Claw base */}
          <rect x="0" y="10" width="7" height="8" fill={clawPink} />
          <rect x="1" y="11" width="5" height="6" fill="#ffb6c1" opacity="0.8" />
          <rect x="0" y="10" width="2" height="2" fill={lobsterRed} opacity="0.3" />
          <rect x="5" y="10" width="2" height="2" fill={clawPink} />
          {/* Upper pincer (moving) */}
          <rect x="0" y="9" width="5" height="5" fill={clawPink}
                style={{ transform: `rotate(${Math.sin(frame * 0.12) * 25 - 20}deg)`, transformOrigin: '3px 11px' }} />
          <rect x="0" y="9" width="2" height="2" fill={lobsterRed} opacity="0.4" />
          {/* Lower pincer */}
          <rect x="0" y="14" width="5" height="6" fill={clawPink}
                style={{ transform: `rotate(${Math.cos(frame * 0.12) * 25 + 20}deg)`, transformOrigin: '3px 14px' }} />
          <rect x="0" y="14" width="2" height="2" fill={lobsterRed} opacity="0.4" />
          {/* Claw tip detail */}
          <rect x="0" y="10" width="1" height="1" fill="#ffffff" opacity="0.3" />
          
          {/* RIGHT CLAW */}
          {/* Claw base */}
          <rect x="25" y="10" width="7" height="8" fill={clawPink} />
          <rect x="26" y="11" width="5" height="6" fill="#ffb6c1" opacity="0.8" />
          <rect x="25" y="10" width="2" height="2" fill={lobsterRed} opacity="0.3" />
          <rect x="30" y="10" width="2" height="2" fill={clawPink} />
          {/* Upper pincer (moving) */}
          <rect x="27" y="9" width="5" height="5" fill={clawPink}
                style={{ transform: `rotate(${Math.cos(frame * 0.12) * 25 + 20}deg)`, transformOrigin: '28px 11px' }} />
          <rect x="27" y="9" width="2" height="2" fill={lobsterRed} opacity="0.4" />
          {/* Lower pincer */}
          <rect x="27" y="14" width="5" height="6" fill={clawPink}
                style={{ transform: `rotate(${Math.sin(frame * 0.12) * 25 - 20}deg)`, transformOrigin: '28px 14px' }} />
          <rect x="27" y="14" width="2" height="2" fill={lobsterRed} opacity="0.4" />
          {/* Claw tip detail */}
          <rect x="30" y="10" width="1" height="1" fill="#ffffff" opacity="0.3" />
          
          {/* WALKING LEGS - 8 total, detailed */}
          {/* Left legs */}
          <rect x="1" y="15" width="2" height="3" fill="#cc3700" />
          <rect x="0" y="16" width="2" height="2" fill="#cc3700" opacity="0.9" />
          <rect x="1" y="17" width="2" height="2" fill="#cc3700" opacity="0.8" />
          <rect x="4" y="16" width="2" height="2" fill="#cc3700" />
          <rect x="3" y="17" width="2" height="2" fill="#cc3700" opacity="0.9" />
          {/* Right legs */}
          <rect x="29" y="15" width="2" height="3" fill="#cc3700" />
          <rect x="30" y="16" width="2" height="2" fill="#cc3700" opacity="0.9" />
          <rect x="29" y="17" width="2" height="2" fill="#cc3700" opacity="0.8" />
          <rect x="26" y="16" width="2" height="2" fill="#cc3700" />
          <rect x="27" y="17" width="2" height="2" fill="#cc3700" opacity="0.9" />
          {/* Additional leg details */}
          <rect x="2" y="18" width="1" height="1" fill="#993300" opacity="0.6" />
          <rect x="28" y="18" width="1" height="1" fill="#993300" opacity="0.6" />
          
          {/* TAIL FAN - UROPODS + TELSON (very important!) */}
          {/* Swimming legs (swimmerets) - animated */}
          <rect x="2" y="21" width="4" height="2" fill={lobsterOrange}
                style={{ transform: `rotate(${Math.sin(frame * 0.15) * 18 - 12}deg)`, transformOrigin: "4px 22px" }} />
          <rect x="2" y="23" width="4" height="2" fill={lobsterOrange}
                style={{ transform: `rotate(${Math.cos(frame * 0.15) * 18 + 12}deg)`, transformOrigin: "4px 24px" }} />
          <rect x="26" y="21" width="4" height="2" fill={lobsterOrange}
                style={{ transform: `rotate(${Math.cos(frame * 0.15) * 18 + 12}deg)`, transformOrigin: "28px 22px" }} />
          <rect x="26" y="23" width="4" height="2" fill={lobsterOrange}
                style={{ transform: `rotate(${Math.sin(frame * 0.15) * 18 - 12}deg)`, transformOrigin: "28px 24px" }} />
          
          {/* Main tail body */}
          <rect x="6" y="24" width="6" height="2" fill={lobsterRed}
                style={{ transform: `rotate(${Math.sin(frame * 0.1) * 10}deg)`, transformOrigin: '8px 26px' }} />
          <rect x="7" y="25" width="6" height="2" fill={lobsterRed}
                style={{ transform: `rotate(${Math.cos(frame * 0.1) * 10}deg)`, transformOrigin: '8px 27px' }} />
          
          {/* LEFT UROPOD (tail fan left side) */}
          <rect x="0" y="23" width="6" height="5" fill={lobsterOrange}
                style={{ transform: `rotate(${Math.sin(frame * 0.1) * 20}deg)`, transformOrigin: '4px 26px' }} />
          <rect x="0" y="23" width="1" height="1" fill={lobsterRed} opacity="0.5" />
          <rect x="1" y="27" width="1" height="1" fill={lobsterRed} opacity="0.5" />
          
          {/* RIGHT UROPOD (tail fan right side) */}
          <rect x="26" y="23" width="6" height="5" fill={lobsterOrange}
                style={{ transform: `rotate(${Math.cos(frame * 0.1) * 20}deg)`, transformOrigin: '28px 26px' }} />
          <rect x="31" y="23" width="1" height="1" fill={lobsterRed} opacity="0.5" />
          <rect x="30" y="27" width="1" height="1" fill={lobsterRed} opacity="0.5" />
          
          {/* CENTRAL TELSON (tail tip) */}
          <rect x="10" y="23" width="12" height="2" fill={lobsterRed}
                style={{ transform: `rotate(${Math.sin(frame * 0.1) * 8}deg)`, transformOrigin: '16px 25px' }} />
          <rect x="11" y="24" width="10" height="1" fill={lobsterOrange} opacity="0.6" />
          <rect x="12" y="25" width="8" height="1" fill={lobsterOrange} opacity="0.6" />
          {/* Telson center line */}
          <rect x="16" y="23" width="1" height="4" fill={lobsterRed} />
          
          {/* TAIL SEGMENTS DETAILS */}
          <rect x="3" y="21" width="1" height="1" fill={lobsterRed} opacity="0.3" />
          <rect x="9" y="23" width="1" height="1" fill={lobsterRed} opacity="0.3" />
          
          {/* BODY TEXTURE AND SHADING */}
          <rect x="8" y="8" width="1" height="1" fill={lobsterOrange} opacity="0.5" />
          <rect x="23" y="8" width="1" height="1" fill={lobsterOrange} opacity="0.5" />
          <rect x="9" y="11" width="1" height="1" fill={lobsterOrange} opacity="0.4" />
          <rect x="22" y="11" width="1" height="1" fill={lobsterOrange} opacity="0.4" />
          <rect x="5" y="14" width="1" height="1" fill={lobsterOrange} opacity="0.5" />
          <rect x="26" y="14" width="1" height="1" fill={lobsterOrange} opacity="0.5" />
        </svg>
      );

    case 'claw':
      return (
        <svg viewBox="0 0 32 32" className={baseClasses}>
          <rect x="8" y="8" width="16" height="16" fill={clawPink} />
          <rect x="9" y="9" width="14" height="14" fill="#ffb6c1" opacity="0.8" />
          <rect x="7" y="7" width="18" height="3" fill={clawPink} />
          <rect x="7" y="7" width="2" height="2" fill={lobsterRed} opacity="0.3" />
          <rect x="21" y="7" width="2" height="2" fill={clawPink} />
          <rect x="8" y="22" width="16" height="3" fill={clawPink} />
          <rect x="6" y="5" width="4" height="6" fill={clawPink}
                style={{ transform: `rotate(${Math.sin(frame * 0.12) * 25 - 15}deg)`, transformOrigin: '8px 9px' }} />
          <rect x="6" y="5" width="2" height="2" fill={lobsterRed} opacity="0.3" />
          <rect x="22" y="5" width="4" height="6" fill={clawPink}
                style={{ transform: `rotate(${Math.cos(frame * 0.12) * 25 + 15}deg)`, transformOrigin: '24px 9px' }} />
          <rect x="22" y="5" width="2" height="2" fill={lobsterRed} opacity="0.3" />
          <rect x="13" y="9" width="6" height="2" fill={lobsterRed} />
          <rect x="10" y="20" width="12" height="4" fill={clawPink} />
          <rect x="9" y="11" width="2" height="2" fill={lobsterRed} opacity="0.2" />
          <rect x="21" y="11" width="2" height="2" fill={lobsterRed} opacity="0.2" />
          <rect x="12" y="10" width="2" height="2" fill="#ffffff" opacity="0.4" />
          <rect x="18" y="18" width="2" height="2" fill="#ffffff" opacity="0.3" />
        </svg>
      );

    case 'crayfish':
      return (
        <svg viewBox="0 0 32 32" className={baseClasses}>
          <rect x="8" y="3" width="2" height="4" fill="#000000" />
          <rect x="9" y="3" width="2" height="4" fill="#000000" />
          <rect x="21" y="3" width="2" height="4" fill="#000000" />
          <rect x="22" y="3" width="2" height="4" fill="#000000" />
          <rect x="10" y="6" width="3" height="3" fill="#000000" />
          <rect x="19" y="6" width="3" height="3" fill="#000000" />
          <rect x="10" y="6" width="1" height="1" fill="#ffffff" opacity="0.9" />
          <rect x="19" y="6" width="1" height="1" fill="#ffffff" opacity="0.9" />
          <rect x="11" y="8" width="10" height="5" fill={lobsterRed} />
          <rect x="14" y="7" width="2" height="1" fill={lobsterOrange} />
          <rect x="9" y="12" width="14" height="4" fill={lobsterRed} />
          <rect x="12" y="14" width="8" height="1" fill={lobsterOrange} opacity="0.3" />
          <rect x="8" y="15" width="16" height="3" fill={lobsterOrange} />
          <rect x="6" y="17" width="20" height="3" fill={lobsterRed} />
          <rect x="4" y="19" width="24" height="2" fill={lobsterOrange} />
          <rect x="7" y="16" width="12" height="1" fill={lobsterOrange} opacity="0.4" />
          <rect x="3" y="14" width="5" height="5" fill={clawPink} />
          <rect x="4" y="15" width="3" height="3" fill="#ffb6c1" opacity="0.7" />
          <rect x="24" y="14" width="5" height="5" fill={clawPink} />
          <rect x="25" y="15" width="3" height="3" fill="#ffb6c1" opacity="0.7" />
          <rect x="5" y="18" width="2" height="3" fill="#cc3700" />
          <rect x="25" y="18" width="2" height="3" fill="#cc3700" />
          <rect x="12" y="20" width="8" height="2" fill={lobsterOrange} />
          <rect x="6" y="21" width="4" height="2" fill={lobsterRed} />
          <rect x="22" y="21" width="4" height="2" fill={lobsterRed} />
          <rect x="12" y="9" width="1" height="1" fill={lobsterOrange} opacity="0.5" />
          <rect x="19" y="9" width="1" height="1" fill={lobsterOrange} opacity="0.5" />
        </svg>
      );

    case 'bubble':
      return (
        <svg viewBox="0 0 32 32" className={baseClasses}>
          <rect x="10" y="22" width="4" height="4" fill={foamWhite} opacity="0.3" />
          <rect x="14" y="16" width="6" height="6" fill={foamWhite} opacity="0.5" stroke={oceanLight} strokeWidth="1" />
          <rect x="16" y="10" width="8" height="8" fill={foamWhite} opacity="0.7" stroke={oceanLight} strokeWidth="1" />
          <rect x="18" y="12" width="4" height="4" fill="#ffffff" opacity="0.6" />
          <rect x="6" y="18" width="3" height="3" fill={foamWhite} opacity="0.25" />
          <rect x="22" y="20" width="2" height="2" fill={foamWhite} opacity="0.2" />
          <rect x={12 + (frame % 60) * 0.15} y={18 + (frame % 60) * 0.25} width="5" height="5" fill={foamWhite} opacity="0.4" />
          <rect x={18 + (frame % 60) * 0.15} y={8 + (frame % 60) * 0.25} width="7" height="7" fill={foamWhite} opacity="0.6" />
        </svg>
      );

    case 'ocean':
      return (
        <svg viewBox="0 0 32 32" className={baseClasses}>
          <rect x="0" y="12" width="32" height="4" fill={oceanBlue} opacity="0.3" />
          <rect x="0" y="13" width="32" height="2" fill={oceanLight} opacity="0.5" />
          <rect x="0" y="18" width="32" height="4" fill={oceanBlue} opacity="0.4" />
          <rect x="0" y="19" width="32" height="2" fill={oceanLight} opacity="0.6" />
          <rect x="4" y="10" width="2" height="3" fill={oceanBlue} opacity="0.3" />
          <rect x="12" y="8" width="2" height="4" fill={oceanBlue} opacity="0.3" />
          <rect x="20" y="10" width="2" height="3" fill={oceanBlue} opacity="0.3" />
          <rect x="28" y="8" width="2" height="4" fill={oceanBlue} opacity="0.3" />
          <rect x={8 + (frame % 60) * 0.15} y="12" width="2" height="2" fill={foamWhite} opacity="0.8" />
          <rect x={16 + (frame % 60) * 0.15} y="12" width="2" height="2" fill={foamWhite} opacity="0.8" />
          <rect x={24 + (frame % 60) * 0.15} y="12" width="2" height="2" fill={foamWhite} opacity="0.8" />
        </svg>
      );

    case 'fresh':
      return (
        <svg viewBox="0 0 32 32" className={baseClasses}>
          <rect x="4" y="4" width="24" height="24" fill="none" stroke={oceanLight} strokeWidth="2" />
          <rect x="6" y="6" width="20" height="20" fill="none" stroke={oceanBlue} strokeWidth="1" />
          <rect x="14" y="10" width="4" height="10" fill={oceanBlue} />
          <rect x="12" y="16" width="4" height="4" fill={oceanBlue} />
          <rect x="16" y="16" width="4" height="4" fill={oceanBlue} />
          <rect x={6 + Math.sin((frame + 0) * 0.1) * 12} y={6 + Math.cos((frame + 0) * 0.1) * 12} width="2" height="2" fill={shellGold} opacity="0.8" />
          <rect x={6 + Math.sin((frame + 90) * 0.1) * 12} y={6 + Math.cos((frame + 90) * 0.1) * 12} width="2" height="2" fill={shellGold} opacity="0.8" />
          <rect x={6 + Math.sin((frame + 180) * 0.1) * 12} y={6 + Math.cos((frame + 180) * 0.1) * 12} width="2" height="2" fill={shellGold} opacity="0.8" />
          <rect x={6 + Math.sin((frame + 270) * 0.1) * 12} y={6 + Math.cos((frame + 270) * 0.1) * 12} width="2" height="2" fill={shellGold} opacity="0.8" />
          <rect x="15" y="14" width="2" height="2" fill={oceanBlue} />
        </svg>
      );

    case 'premium':
      return (
        <svg viewBox="0 0 32 32" className={baseClasses}>
          <rect x="4" y="20" width="24" height="4" fill={shellGold} stroke="#d4af37" strokeWidth="1" />
          <rect x="6" y="14" width="4" height="8" fill={shellGold} stroke="#d4af37" strokeWidth="1" />
          <rect x="10" y="10" width="4" height="12" fill={shellGold} stroke="#d4af37" strokeWidth="1" />
          <rect x="14" y="8" width="4" height="14" fill={shellGold} stroke="#d4af37" strokeWidth="1" />
          <rect x="18" y="10" width="4" height="12" fill={shellGold} stroke="#d4af37" strokeWidth="1" />
          <rect x="22" y="14" width="4" height="8" fill={shellGold} stroke="#d4af37" strokeWidth="1" />
          <rect x="6" y="14" width="2" height="2" fill="#ff0066" opacity="0.8" />
          <rect x="14" y="8" width="4" height="4" fill="#0066ff" opacity="0.8" />
          <rect x="24" y="14" width="2" height="2" fill="#ff0066" opacity="0.8" />
          <rect x="15" y="10" width="2" height="2" fill="#ffffff" opacity="0.9" />
        </svg>
      );

    case 'shell':
      return (
        <svg viewBox="0 0 32 32" className={baseClasses}>
          <rect x="4" y="4" width="4" height="8" fill={foamWhite} stroke={oceanBlue} strokeWidth="1" />
          <rect x="8" y="6" width="16" height="6" fill={foamWhite} stroke={oceanBlue} strokeWidth="1" />
          <rect x="24" y="4" width="4" height="8" fill={foamWhite} stroke={oceanBlue} strokeWidth="1" />
          <rect x="6" y="12" width="20" height="10" fill={foamWhite} stroke={oceanBlue} strokeWidth="1" />
          <rect x="8" y="22" width="16" height="6" fill={foamWhite} stroke={oceanBlue} strokeWidth="1" />
          <rect x="10" y="26" width="12" height="4" fill={foamWhite} stroke={oceanBlue} strokeWidth="1" />
          <rect x="12" y="12" width="8" height="12" fill="none" stroke={oceanLight} strokeWidth="1" />
          <rect x="14" y="14" width="6" height="8" fill="none" stroke={oceanLight} strokeWidth="1" />
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
