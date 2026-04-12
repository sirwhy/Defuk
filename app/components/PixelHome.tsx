'use client';

import Link from 'next/link';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import PixelHeader from './PixelHeader';
import PixelEmoticon from './PixelEmoticon';

// Retro gaming features
const features: Array<{
  emoticonType: 'game' | 'shop' | 'collection' | 'win' | 'mint' | 'trading' | 'collect' | 'quest';
  emoticonAnimation: 'bounce' | 'idle' | 'spin' | 'pulsing' | 'shake' | 'floating';
  title: string;
  description: string;
  color: string;
  bgColor: string;
}> = [
  {
    emoticonType: 'mint',
    emoticonAnimation: 'pulsing',
    title: 'MINT IT',
    description: 'Upload art. Press START. BOOM - NFT minted!',
    color: '#39ff14',
    bgColor: 'rgba(57, 255, 20, 0.1)'
  },
  {
    emoticonType: 'trading',
    emoticonAnimation: 'floating',
    title: 'TRADE IT',
    description: 'Buy & sell. No middleman. Pure P2P.',
    color: '#ff6ec7',
    bgColor: 'rgba(255, 110, 199, 0.1)'
  },
  {
    emoticonType: 'collection',
    emoticonAnimation: 'idle',
    title: 'COLLECT IT',
    description: 'Build collection. Become LEGENDARY.',
    color: '#00ffff',
    bgColor: 'rgba(0, 255, 255, 0.1)'
  },
  {
    emoticonType: 'win',
    emoticonAnimation: 'bounce',
    title: 'WIN IT',
    description: 'Low fees on Base. Keep more GAINS.',
    color: '#ffff00',
    bgColor: 'rgba(255, 255, 0, 0.1)'
  },
];

export default function PixelHome() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen" style={{ 
      background: 'var(--pixel-black)',
      fontFamily: '"VT323", monospace'
    }}>
      
      {/* CRT Scanline Effect */}
      <div className="pixel-scanline" />

      {/* Pixel Header */}
      <PixelHeader />

      {/* Hero Section */}
      <section className="relative" style={{
        paddingTop: '140px',
        paddingBottom: '80px',
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* Background Grid */}
        <div className="pixel-grid" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.5
        }} />

        <div className="container" style={{ position: 'relative' }}>
          {/* Subtitle */}
          <div style={{
            display: 'inline-block',
            padding: '12px 24px',
            border: '3px solid var(--pixel-cyan)',
            color: 'var(--pixel-cyan)',
            fontFamily: '"Press Start 2P", cursive',
            fontSize: '10px',
            marginBottom: '32px',
            backgroundColor: 'rgba(0, 255, 255, 0.1)',
            boxShadow: '0 0 10px var(--pixel-cyan)'
          }}>
            ▸ POWERED BY BASE NETWORK
          </div>

          {/* Animated Hero Pixel Icon */}
          <div style={{ marginBottom: '32px' }}>
            <PixelEmoticon 
              type="game" 
              size="2xl" 
              animation="bounce"
              pixelSize={6}
              className="mx-auto animate-pixel-bounce-hard"
            />
          </div>

          {/* Main Title */}
          <h1 className="pixel-title" style={{
            fontFamily: '"Silkscreen", cursive',
            textShadow: '4px 4px 0 #000000, 0 0 20px var(--pixel-green)'
          }}>
            CREATE YOUR
            <br />
            <span className="pixel-neon-green">
              DIGITAL REALITY
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontFamily: '"VT323", monospace',
            fontSize: '28px',
            color: 'var(--pixel-gray-muted)',
            maxWidth: '600px',
            margin: '24px auto 40px',
            lineHeight: 1.6,
            textShadow: '2px 2px 0 #000000'
          }}>
            No boring paperwork. No complicated steps. 
            Just upload, mint, and trade. That's it.
          </p>

          {/* CTA Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '20px', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            marginBottom: '48px' 
          }}>
            {isConnected ? (
              <>
                <Link href="/mint" className="pixel-btn pixel-btn-primary" 
                       style={{
                         fontFamily: '"VT323", monospace',
                         fontSize: '20px',
                         padding: '16px 32px'
                       }}>
                  ⚡ START MINTING
                </Link>
                <Link href="/marketplace" className="pixel-btn pixel-btn-secondary"
                       style={{
                         fontFamily: '"VT323", monospace',
                         fontSize: '20px',
                         padding: '16px 32px'
                       }}>
                  🛒 EXPLORE
                </Link>
              </>
            ) : (
              <ConnectButton showBalance={false} accountStatus="address" />
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ 
        padding: '80px 0', 
        background: 'var(--pixel-dark)',
        position: 'relative'
      }}>
        {/* Background Grid */}
        <div className="pixel-grid" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.3
        }} />

        <div className="container" style={{ position: 'relative' }}>
          <h2 style={{
            fontFamily: '"Silkscreen", cursive',
            fontSize: '28px',
            textAlign: 'center',
            marginBottom: '48px',
            color: 'var(--pixel-white)',
            textShadow: '4px 4px 0 #000000'
          }}>
            <span style={{ color: 'var(--pixel-pink)' }}>▣</span> GAME FEATURES
          </h2>

          <div className="grid-cards">
            {features.map((feature, i) => (
              <div key={i} className="pixel-card" 
                   style={{
                     backgroundColor: feature.bgColor,
                     border: `4px solid ${feature.color}`,
                     boxShadow: `0 0 20px ${feature.color}40`
                   }}>
                {/* Top-left corner pixel */}
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  left: '-8px',
                  width: '20px',
                  height: '20px',
                  background: feature.color,
                  border: '4px solid var(--pixel-black)'
                }} />
                
                {/* Bottom-right corner pixel */}
                <div style={{
                  position: 'absolute',
                  bottom: '-8px',
                  right: '-8px',
                  width: '20px',
                  height: '20px',
                  background: 'var(--pixel-pink)',
                  border: '4px solid var(--pixel-black)'
                }} />

                <PixelEmoticon 
                  type={feature.emoticonType}
                  size="lg"
                  animation={feature.emoticonAnimation}
                  pixelSize={5}
                  className="mx-auto"
                />

                <h3 style={{
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '14px',
                  color: feature.color,
                  marginBottom: '16px',
                  marginTop: '20px',
                  textShadow: '2px 2px 0 #000000',
                  lineHeight: 1.5
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontFamily: '"VT323", monospace',
                  fontSize: '22px',
                  color: 'var(--pixel-gray-light)',
                  lineHeight: 1.6,
                  textShadow: '1px 1px 0 #000000'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 0',
        textAlign: 'center',
        background: `linear-gradient(180deg, var(--pixel-dark) 0%, var(--pixel-black) 100%)`,
        position: 'relative'
      }}>
        <div className="container">
          <div style={{ marginBottom: '32px' }}>
            <PixelEmoticon 
              type="quest"
              size="xl"
              animation="pulsing"
              pixelSize={6}
              className="mx-auto"
            />
          </div>
          
          <h2 style={{
            fontFamily: '"Silkscreen", cursive',
            fontSize: 'clamp(28px, 6vw, 48px)',
            color: 'var(--pixel-white)',
            marginBottom: '24px',
            textShadow: '4px 4px 0 #000000',
            textTransform: 'uppercase'
          }}>
            READY TO <span className="pixel-neon-green">PLAY</span>?
          </h2>
          <p style={{
            fontFamily: '"VT323", monospace',
            fontSize: '24px',
            color: 'var(--pixel-gray-muted)',
            marginBottom: '40px',
            lineHeight: 1.6,
            textShadow: '2px 2px 0 #000000'
          }}>
            Join thousands of players in the NFT universe.
          </p>
          
          {isConnected ? (
            <Link href="/mint" className="pixel-btn pixel-btn-primary"
                   style={{
                     fontFamily: '"VT323", monospace',
                     fontSize: '22px',
                     padding: '20px 48px',
                     display: 'flex',
                     alignItems: 'center',
                     gap: '12px',
                     margin: '0 auto'
                   }}>
              <PixelEmoticon 
                type="quest"
                size="sm"
                animation="pulsing"
                pixelSize={4}
              />
              START YOUR QUEST
            </Link>
          ) : (
            <ConnectButton showBalance={false} accountStatus="address" />
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '40px 0',
        borderTop: `4px solid var(--pixel-gray)`,
        textAlign: 'center',
        background: 'var(--pixel-dark)'
      }}>
        <div className="container">
          <p style={{
            fontFamily: '"Press Start 2P", cursive',
            fontSize: '8px',
            color: 'var(--pixel-gray-muted)',
            lineHeight: 1.8,
            textShadow: '1px 1px 0 #000000'
          }}>
            © 2026 DEFUK NFT GAME MARKETPLACE. ALL RIGHTS RESERVED.
            <br />
            <span className="pixel-neon-green">BUILT ON BASE</span> • 
            <span className="pixel-neon-pink" style={{ marginLeft: '16px' }}>POWERED BY YOU</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
