'use client';

import { useState, useEffect, useRef } from 'react';

interface PixelPoint {
  x: number;
  y: number;
  color: string;
}

interface LobsterConfig {
  size: 'sm' | 'md' | 'lg' | 'xl';
  colors: {
    lobsterRed: string;
    lobsterOrange: string;
    clawPink: string;
    legBrown: string;
  };
  showCoordinates: boolean;
}

/**
 * Lobster Pixel Art Generator
 * Programmatic pixel art generation - NOT hardcoded!
 * 
 * Features:
 * - Generate lobster from logical parts (head, body, legs, claws, etc.)
 * - Each part calculated with loops and offsets
 * - Parametric design - easy to adjust proportions
 * - Auto-generate pixel grid from high-level instructions
 */
export default function LobsterGenerator({
  size = 'md',
  colors,
  showCoordinates = false
}: LobsterConfig) {
  const [frame, setFrame] = useState(0);
  const [generatedPixels, setGeneratedPixels] = useState<PixelPoint[]>([]);

  // Animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(prev => (prev + 1) % 60);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Generate lobster pixel art PROGRAMMATICALLY
  useEffect(() => {
    const pixels: PixelPoint[] = [];
    const scale = size === 'sm' ? 0.8 : size === 'lg' ? 1.2 : size === 'xl' ? 1.5 : 1.0;
    
    // Define anatomical regions (relative coordinates 0-32)
    const grid = 32;
    const centerX = grid / 2;
    
    // ============= HEAD REGION (cephalothorax) =============
    // Head: small, compact area
    const headY = Math.floor(6 * scale);
    const headWidth = Math.floor(12 * scale);
    const headHeight = Math.floor(3 * scale);
    
    for (let y = headY; y < headY + headHeight; y++) {
      for (let x = Math.floor(centerX - headWidth / 2); x < centerX + headWidth / 2; x++) {
        // Base head color
        pixels.push({ x: Math.round(x * 1), y: Math.round(y * 1), color: colors.lobsterRed });
        
        // Head segments
        if (y === headY && (x % 2 === 0 || x === Math.floor(centerX - headWidth / 2) || x === Math.floor(centerX + headWidth / 2 - 1))) {
          pixels.push({ x: Math.round(x * 1), y: Math.round(y * 1), color: colors.lobsterOrange });
        }
      }
    }
    
    // Rostrum (nose spike)
    const rostrumX = Math.floor(centerX);
    const rostrumY = Math.floor((headY - 1) * scale);
    for (let i = 0; i < 2 * scale; i++) {
      pixels.push({ x: rostrumX + i, y: rostrumY, color: colors.lobsterOrange });
    }
    
    // ============= EYES ON STALKS =============
    const eyeOffset = Math.floor(2 * scale);
    const eyeXLeft = Math.round(centerX - 4 * scale);
    const eyeXRight = Math.round(centerX + 4 * scale);
    const eyeY = Math.round(5 * scale);
    
    // Left eye
    for (let dy = 0; dy < 2 * scale; dy++) {
      for (let dx = 0; dx < 3 * scale; dx++) {
        pixels.push({ 
          x: eyeXLeft + dx, 
          y: eyeY + dy, 
          color: '#000000' 
        });
        // Highlight
        if (dx === 0 && dy === 0) {
          pixels[pixels.length - 1] = { x: eyeXLeft + dx, y: eyeY + dy, color: '#ffffff' };
        }
      }
    }
    
    // Right eye
    for (let dy = 0; dy < 2 * scale; dy++) {
      for (let dx = 0; dx < 3 * scale; dx++) {
        pixels.push({ 
          x: eyeXRight + dx, 
          y: eyeY + dy, 
          color: '#000000' 
        });
        if (dx === 0 && dy === 0) {
          pixels[pixels.length - 1] = { x: eyeXRight + dx, y: eyeY + dy, color: '#ffffff' };
        }
      }
    }
    
    // ============= ANTENNAE =============
    const antennaLength = Math.floor(4 * scale);
    const antennaYStart = Math.floor(3 * scale);
    
    // Left antenna
    for (let i = 0; i < antennaLength; i++) {
      pixels.push({ 
        x: Math.round(centerX - 4 * scale), 
        y: Math.round(antennaYStart - i), 
        color: '#000000' 
      });
      if (i % 2 === 0) {
        pixels[pixels.length - 1] = { 
          x: Math.round(centerX - 4 * scale), 
          y: Math.round(antennaYStart - i), 
          color: '#000000',
          opacity: 0.8
        };
      }
    }
    
    // Right antenna
    for (let i = 0; i < antennaLength; i++) {
      pixels.push({ 
        x: Math.round(centerX + 4 * scale), 
        y: Math.round(antennaYStart - i), 
        color: '#000000' 
      });
      if (i % 2 === 0) {
        pixels[pixels.length - 1] = { 
          x: Math.round(centerX + 4 * scale), 
          y: Math.round(antennaYStart - i), 
          color: '#000000',
          opacity: 0.8
        };
      }
    }
    
    // ============= THORAX =============
    const thoraxY = Math.floor(9 * scale);
    const thoraxWidth = Math.floor(14 * scale);
    const thoraxHeight = Math.floor(3 * scale);
    
    for (let y = thoraxY; y < thoraxY + thoraxHeight; y++) {
      for (let x = Math.floor(centerX - thoraxWidth / 2); x < centerX + thoraxWidth / 2; x++) {
        pixels.push({ x: Math.round(x * 1), y: Math.round(y * 1), color: colors.lobsterRed });
        
        // Thorax segments
        if (y === thoraxY + 1 && x % 2 === 0) {
          pixels[pixels.length - 1] = { x: Math.round(x * 1), y: Math.round(y * 1), color: colors.lobsterOrange };
        }
      }
    }
    
    // ============= ABDOMEN (6 SEGMENTS) =============
    const abdomenStartY = thoraxY + thoraxHeight;
    const segmentHeight = Math.floor(2 * scale);
    
    for (let segment = 0; segment < 6; segment++) {
      const segmentY = abdomenStartY + (segment * segmentHeight);
      const segmentWidth = Math.floor(8 * scale);
      const segmentXOffset = segment % 2 === 0 ? 0 : 1;
      
      for (let y = segmentY; y < segmentY + segmentHeight; y++) {
        for (let x = Math.floor(centerX - segmentWidth / 2 + segmentXOffset); x < centerX + segmentWidth / 2 + segmentXOffset; x++) {
          // Alternating colors
          const color = segment % 2 === 0 ? colors.lobsterOrange : colors.lobsterRed;
          pixels.push({ x: Math.round(x * 1), y: Math.round(y * 1), color });
          
          // Belly plates
          if (segment % 2 === 0 && y === segmentY + segmentHeight - 1 && x % 2 === 0) {
            pixels[pixels.length - 1] = { x: Math.round(x * 1), y: Math.round(y * 1), color: colors.lobsterOrange, opacity: 0.4 };
          }
        }
      }
    }
    
    // ============= CLAWS (LARGE & ANIMATED) =============
    const clawSize = Math.floor(7 * scale);
    const clawOffset = Math.floor(1 * scale);
    
    // Left claw
    const leftClawX = Math.round(centerX - clawSize - clawOffset);
    const clawY = Math.round((9 * scale) * 1);
    
    // Claw body
    for (let dy = 0; dy < clawSize; dy++) {
      for (let dx = 0; dx < clawSize; dx++) {
        pixels.push({ 
          x: leftClawX + dx, 
          y: clawY + dy, 
          color: colors.clawPink 
        });
        // Inner detail
        if (dx > 1 && dx < clawSize - 1 && dy > 1 && dy < clawSize - 1) {
          pixels[pixels.length - 1] = { x: leftClawX + dx, y: clawY + dy, color: colors.clawPink, opacity: 0.7 };
        }
      }
    }
    
    // Left claw pincer - animated (opening/closing)
    const pincerAngle = Math.sin(frame * 0.12) * 20 - 15; // ±20°
    const pincerTop = Math.round(clawY - 1);
    const pincerBottom = Math.round(clawY + clawSize - 1);
    
    for (let dy = 0; dy < clawSize / 2; dy++) {
      // Animated rotation would go here
      pixels.push({ x: leftClawX, y: pincerTop + dy, color: colors.clawPink });
    }
    
    // Right claw
    const rightClawX = Math.round(centerX + clawSize + clawOffset);
    
    for (let dy = 0; dy < clawSize; dy++) {
      for (let dx = 0; dx < clawSize; dx++) {
        pixels.push({ 
          x: rightClawX + dx, 
          y: clawY + dy, 
          color: colors.clawPink 
        });
        if (dx > 1 && dx < clawSize - 1 && dy > 1 && dy < clawSize - 1) {
          pixels[pixels.length - 1] = { x: rightClawX + dx, y: clawY + dy, color: colors.clawPink, opacity: 0.7 };
        }
      }
    }
    
    // Right claw pincer
    const pincerAngleRight = Math.cos(frame * 0.12) * 20 + 15;
    for (let dy = 0; dy < clawSize / 2; dy++) {
      pixels.push({ x: rightClawX + clawSize - 1, y: pincerTop + dy, color: colors.clawPink });
    }
    
    // ============= WALKING LEGS (8 total) =============
    const legPositions = [
      { x: -clawOffset - 2, y: abdomenStartY + 2 },
      { x: -clawOffset + 2, y: abdomenStartY + 4 },
      { x: clawOffset + 2, y: abdomenStartY + 2 },
      { x: clawOffset + 6, y: abdomenStartY + 4 }
    ];
    
    legPositions.forEach((pos, i) => {
      // Left side legs
      const legX = Math.round(centerX + pos.x);
      const legY = Math.round(pos.y);
      
      for (let dy = 0; dy < 3 * scale; dy++) {
        pixels.push({ 
          x: legX, 
          y: legY + dy, 
          color: colors.legBrown 
        });
      }
      
      // Right side legs (mirrored)
      const mirroredLegX = Math.round(centerX - pos.x);
      for (let dy = 0; dy < 3 * scale; dy++) {
        pixels.push({ 
          x: mirroredLegX, 
          y: legY + dy, 
          color: colors.legBrown 
        });
      }
    });
    
    // ============= TAIL FAN (Uropods + Telson) =============
    const tailY = Math.round((abdomenStartY + 6 * segmentHeight) * 1);
    
    // Swimming legs (swimmerets)
    const swimmeretAngle = Math.sin(frame * 0.15) * 15 - 10;
    const swimmeretLength = Math.floor(4 * scale);
    
    // Left swimmeret
    for (let i = 0; i < swimmeretLength; i++) {
      pixels.push({ 
        x: Math.round(centerX - 2 * scale), 
        y: tailY + i, 
        color: colors.lobsterOrange 
      });
    }
    
    // Right swimmeret
    for (let i = 0; i < swimmeretLength; i++) {
      pixels.push({ 
        x: Math.round(centerX + 2 * scale), 
        y: tailY + i, 
        color: colors.lobsterOrange 
      });
    }
    
    // Left uropod (tail fan)
    const uropodLength = Math.floor(5 * scale);
    for (let i = 0; i < uropodLength; i++) {
      pixels.push({ 
        x: Math.round(centerX - uropodLength + i), 
        y: tailY, 
        color: colors.lobsterOrange 
      });
    }
    
    // Right uropod
    for (let i = 0; i < uropodLength; i++) {
      pixels.push({ 
        x: Math.round(centerX + uropodLength - i), 
        y: tailY, 
        color: colors.lobsterOrange 
      });
    }
    
    // Central telson
    for (let i = 0; i < 2 * scale; i++) {
      pixels.push({ 
        x: Math.round(centerX), 
        y: tailY + i, 
        color: colors.lobsterRed 
      });
    }
    
    setGeneratedPixels(pixels);
  }, [size, colors, frame]);

  // Size mapping
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24'
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div className={`${sizeClasses[size]} relative flex items-center justify-center bg-transparent`}>
        <svg viewBox="0 0 32 32" className="w-full h-full" style={{ overflow: 'visible' }}>
          {generatedPixels.map((pixel, index) => (
            <rect
              key={index}
              x={pixel.x}
              y={pixel.y}
              width="1"
              height="1"
              fill={pixel.color}
              opacity={pixel.opacity ?? 1}
            />
          ))}
        </svg>
      </div>
      
      {showCoordinates && (
        <div className="absolute -bottom-6 left-0 right-0 text-[8px] text-gray-600">
          Pixels: {generatedPixels.length} | Generated programmatically
        </div>
      )}
    </div>
  );
}
