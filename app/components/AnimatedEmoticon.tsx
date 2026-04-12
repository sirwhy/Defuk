'use client';

import { useState, useEffect } from 'react';

interface AnimatedEmoticonProps {
  type: 'game' | 'shop' | 'collection' | 'win' | 'mint' | 'trading' | 'collect' | 'quest';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animation?: 'bounce' | 'rotate' | 'pulse' | 'sparkle' | 'glow' | 'float' | 'lightning';
  onClick?: () => void;
  className?: string;
}

/**
 * Animated Emoticon Component
 * Uses Higgsfield.ai & MotionSite.ai generated videos
 * 
 * Types:
 * - game: 🎮 Gaming controller with glow
 * - shop: 🛒 Shopping cart with sparkles
 * - collection: 💎 Diamond with pulse
 * - win: 🎯 Target with hit effect
 * - mint: ⚡ Lightning bolt
 * - trading: 📈 Trading chart with movement
 * - collect: 🏆 Trophy with celebration
 * - quest: 🗡️ Quest marker with pulse
 */
export default function AnimatedEmoticon({
  type,
  size = 'md',
  animation = 'bounce',
  onClick,
  className = ''
}: AnimatedEmoticonProps) {
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Get appropriate video URL based on type and animation
  const getVideoUrl = () => {
    // These would be replaced with actual Higgsfield.ai / MotionSite.ai URLs
    const videoPaths: Record<string, string> = {
      'game-bounce': 'https://higgsfield-ai.storage.googleapis.com/animated/game_controller_bounce.mp4',
      'game-rotate': 'https://higgsfield-ai.storage.googleapis.com/animated/game_controller_rotate.mp4',
      'shop-bounce': 'https://higgsfield-ai.storage.googleapis.com/animated/shopping_cart_bounce.mp4',
      'shop-pulse': 'https://higgsfield-ai.storage.googleapis.com/animated/shopping_cart_pulse.mp4',
      'collection-bounce': 'https://higgsfield-ai.storage.googleapis.com/animated/diamond_bounce.mp4',
      'collection-glow': 'https://higgsfield-ai.storage.googleapis.com/animated/diamond_glow.mp4',
      'win-bounce': 'https://higgsfield-ai.storage.googleapis.com/animated/target_bounce.mp4',
      'win-sparkle': 'https://higgsfield-ai.storage.googleapis.com/animated/target_sparkle.mp4',
      'mint-pulse': 'https://higgsfield-ai.storage.googleapis.com/animated/lightning_pulse.mp4',
      'mint-glow': 'https://higgsfield-ai.storage.googleapis.com/animated/lightning_glow.mp4',
      'trading-float': 'https://higgsfield-ai.storage.googleapis.com/animated/trading_float.mp4',
      'trading-animate': 'https://higgsfield-ai.storage.googleapis.com/animated/trading_animate.mp4',
      'collect-bounce': 'https://higgsfield-ai.storage.googleapis.com/animated/trophy_bounce.mp4',
      'collect-sparkle': 'https://higgsfield-ai.storage.googleapis.com/animated/trophy_sparkle.mp4',
      'quest-pulse': 'https://higgsfield-ai.storage.googleapis.com/animated/quest_pulse.mp4',
      'quest-glow': 'https://higgsfield-ai.storage.googleapis.com/animated/quest_glow.mp4',
    };

    return videoPaths[`${type}-${animation}`] || videoPaths[`${type}-bounce`];
  };

  // Size mapping
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  // Animation classes
  const animationClasses = {
    bounce: 'animate-bounce-hover',
    rotate: 'animate-spin-slow',
    pulse: 'animate-pulse-glow',
    sparkle: 'animate-sparkle',
    glow: 'animate-glow-pulse',
    float: 'animate-float',
    lightning: 'animate-lightning'
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Video background */}
      <video
        className={`absolute inset-0 w-full h-full object-cover ${sizeClasses[size]} ${animationClasses[animation]} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={() => setLoaded(true)}
      >
        <source src={getVideoUrl()} type="video/mp4" />
        {/* Fallback to emoji if video fails */}
        <img
          src={`https://img.icons8.com/emoji/${size === 'sm' ? '48' : size === 'md' ? '72' : size === 'lg' ? '96' : '128'}/${getEmojiIcon(type)}.png`}
          alt={type}
          className="w-full h-full object-cover"
        />
      </video>

      {/* Fallback emoji */}
      {!loaded && (
        <div className={`w-full h-full flex items-center justify-center ${sizeClasses[size]}`}>
          {getEmojiIcon(type)}
        </div>
      )}

      {/* Hover overlay effect */}
      {hovered && (
        <div className={`absolute inset-0 w-full h-full ${sizeClasses[size]} rounded-lg bg-gradient-to-r from-neon-green/20 to-neon-pink/20 blur-lg animate-pulse-glow`} />
      )}
    </div>
  );
}

// Helper function to get emoji fallback
function getEmojiIcon(type: string): string {
  const emojiMap: Record<string, string> = {
    game: '🎮',
    shop: '🛒',
    collection: '💎',
    win: '🎯',
    mint: '⚡',
    trading: '📈',
    collect: '🏆',
    quest: '🗡️'
  };
  return emojiMap[type] || '✨';
}
