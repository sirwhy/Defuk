'use client';

import { useState, useEffect } from 'react';

interface PixelEmoticonProps {
  type: 'game' | 'shop' | 'collection' | 'win' | 'mint' | 'trading' | 'collect' | 'quest';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  animation?: 'bounce' | 'idle' | 'spin' | 'pulsing' | 'shake' | 'floating';
  pixelSize?: number; // Size of each pixel (4-8 for retro feel)
  onClick?: () => void;
  className?: string;
}

/**
 * Pixel Art Emoticon Component
 * Inspired by Higgsfield.ai & MotionSite.ai pixel art styles
 * 
 * Features:
 * - 8-bit pixel art aesthetic
 * - Retro game animations
 * - Customizable pixel grid size
 * - Canvas-based rendering for authentic pixel look
 */
export default function PixelEmoticon({
  type,
  size = 'md',
  animation = 'idle',
  pixelSize = 6,
  onClick,
  className = ''
}: PixelEmoticonProps) {
  const [hovered, setHovered] = useState(false);
  const [frame, setFrame] = useState(0);

  // Animation frames loop
  useEffect(() => {
    if (animation === 'idle' && !hovered) return;
    
    const interval = setInterval(() => {
      setFrame(prev => (prev + 1) % 8);
    }, 100);
    
    return () => clearInterval(interval);
  }, [animation, hovered]);

  // Size mapping
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24',
    '2xl': 'w-32 h-32'
  };

  // Animation classes
  const animationClasses = {
    bounce: 'animate-pixel-bounce',
    idle: 'animate-pixel-idle',
    spin: 'animate-pixel-spin',
    pulsing: 'animate-pixel-pulse',
    shake: 'animate-pixel-shake',
    floating: 'animate-pixel-float'
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center ${animationClasses[animation]} ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Pixel Art Canvas */}
      <div 
        className={`relative bg-[#1a1a1a] rounded-sm ${sizeClasses[size]}`}
        style={{
          imageRendering: 'pixelated',
          boxShadow: `
            ${pixelSize * 2}px ${pixelSize * 2}px 0 #00000050,
            0 0 0 ${pixelSize}px #00000030
          `
        }}
      >
        {/* Pixel Grid Background */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(#39ff14 ${pixelSize}px, transparent ${pixelSize}px),
              linear-gradient(90deg, #39ff14 ${pixelSize}px, transparent ${pixelSize}px)
            `,
            backgroundSize: `${pixelSize * 2}px ${pixelSize * 2}px`
          }}
        />

        {/* Main Pixel Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          {getPixelArtIcon(type, hovered, frame)}
        </div>

        {/* Scanline Effect */}
        <div className="absolute inset-0 overflow-hidden rounded-sm pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b 
            from-transparent via-[#39ff14]50 to-transparent 
            opacity-5 animate-scanline"
          />
        </div>

        {/* Corner Pixels (Retro UI) */}
        <div className="absolute top-0 left-0 w-1 h-1 bg-[#39ff14]" />
        <div className="absolute top-0 right-0 w-1 h-1 bg-[#39ff14]" />
        <div className="absolute bottom-0 left-0 w-1 h-1 bg-[#39ff14]" />
        <div className="absolute bottom-0 right-0 w-1 h-1 bg-[#39ff14]" />
      </div>
    </div>
  );
}

// Pixel art icon components (using CSS shapes for pixel art)
function getPixelArtIcon(type: string, hovered: boolean, frame: number) {
  const baseClasses = 'relative w-full h-full';
  
  switch (type) {
    case 'game':
      return (
        <div className={baseClasses}>
          {/* Game Controller Pixel Art */}
          <svg viewBox="0 0 16 16" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
            <rect x="1" y="3" width="14" height="10" fill="#ff6ec7" />
            <rect x="3" y="5" width="2" height="2" fill="#39ff14" />
            <rect x="7" y="5" width="2" height="2" fill="#39ff14" />
            <rect x="11" y="5" width="2" height="2" fill="#39ff14" />
            <rect x="6" y="8" width="4" height="4" fill="#39ff14" />
            <rect x="2" y="9" width="3" height="1" fill="#ff6ec7" />
            <rect x="11" y="9" width="3" height="1" fill="#ff6ec7" />
            {hovered && (
              <rect x="4" y="6" width="1" height="1" fill="#ffffff" className="animate-pulse" />
            )}
          </svg>
        </div>
      );

    case 'mint':
      return (
        <div className={baseClasses}>
          {/* Lightning Bolt Pixel Art */}
          <svg viewBox="0 0 16 16" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
            <path d="M8 1 L4 7 L7 7 L5 13 L12 6 L9 6 Z" fill="#ffff00" />
            {frame % 2 === 0 && (
              <rect x="3" y="5" width="1" height="1" fill="#ffffff" className="animate-pulse" />
            )}
          </svg>
        </div>
      );

    case 'trading':
      return (
        <div className={baseClasses}>
          {/* Trading Chart Pixel Art */}
          <svg viewBox="0 0 16 16" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
            <rect x="2" y="10" width="12" height="2" fill="#ff6ec7" />
            <rect x="4" y="6" width="2" height="6" fill="#ff6ec7" />
            <rect x="8" y="4" width="2" height="8" fill="#ff6ec7" />
            <rect x="12" y="2" width="2" height="10" fill="#ff6ec7" />
            <path d="M4 6 L8 4 L12 2" stroke="#39ff14" strokeWidth="1" fill="none" />
          </svg>
        </div>
      );

    case 'collection':
      return (
        <div className={baseClasses}>
          {/* Diamond Pixel Art */}
          <svg viewBox="0 0 16 16" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
            <path d="M8 1 L14 6 L8 14 L2 6 Z" fill="#00ffff" />
            <rect x="7" y="4" width="2" height="2" fill="#ffffff" opacity="0.8" />
            <rect x="9" y="6" width="2" height="2" fill="#ffffff" opacity="0.6" />
            {hovered && (
              <rect x="5" y="5" width="1" height="1" fill="#ffffff" className="animate-pulse" />
            )}
          </svg>
        </div>
      );

    case 'win':
      return (
        <div className={baseClasses}>
          {/* Target Pixel Art */}
          <svg viewBox="0 0 16 16" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
            <circle cx="8" cy="8" r="7" fill="#ff6ec7" />
            <circle cx="8" cy="8" r="5" fill="#ffffff" />
            <circle cx="8" cy="8" r="3" fill="#ff6ec7" />
            <circle cx="8" cy="8" r="1" fill="#ffff00" />
            {(frame % 4 === 0 || hovered) && (
              <rect x="0" y="7" width="16" height="1" fill="#ffffff" opacity="0.5" className="animate-pulse" />
            )}
          </svg>
        </div>
      );

    case 'shop':
      return (
        <div className={baseClasses}>
          {/* Shopping Cart Pixel Art */}
          <svg viewBox="0 0 16 16" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
            <rect x="1" y="4" width="12" height="4" fill="#39ff14" />
            <rect x="0" y="6" width="1" height="4" fill="#39ff14" />
            <rect x="15" y="6" width="1" height="4" fill="#39ff14" />
            <circle cx="3" cy="12" r="2" fill="#888888" />
            <circle cx="11" cy="12" r="2" fill="#888888" />
          </svg>
        </div>
      );

    case 'collect':
      return (
        <div className={baseClasses}>
          {/* Trophy Pixel Art */}
          <svg viewBox="0 0 16 16" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
            <rect x="2" y="1" width="10" height="5" fill="#ffff00" />
            <rect x="5" y="6" width="6" height="5" fill="#ffff00" />
            <rect x="3" y="12" width="10" height="2" fill="#ffff00" />
            <rect x="4" y="14" width="8" height="1" fill="#ffff00" />
            {hovered && (
              <rect x="6" y="3" width="1" height="1" fill="#ffffff" className="animate-pulse" />
            )}
          </svg>
        </div>
      );

    case 'quest':
      return (
        <div className={baseClasses}>
          {/* Quest Marker Pixel Art */}
          <svg viewBox="0 0 16 16" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
            <path d="M8 14 L2 6 L8 3 L14 6 Z" fill="#ff6ec7" />
            <rect x="6" y="5" width="4" height="8" fill="#ff6ec7" />
            <rect x="7" y="3" width="2" height="2" fill="#ffffff" opacity="0.8" />
          </svg>
        </div>
      );

    default:
      return <div>❓</div>;
  }
}
