'use client';

import Link from 'next/link';
import { useAccount } from 'wagmi';
import PixelEmoticon from './components/PixelEmoticon';

// Retro gaming features
const features = [
  {
    emoticonType: 'mint',
    emoticonAnimation: 'pulsing',
    title: 'MINT IT',
    description: 'Upload art. Press START. BOOM - NFT minted!',
    color: '#39ff14'  // Neon green
  },
  {
    emoticonType: 'trading',
    emoticonAnimation: 'floating',
    title: 'TRADE IT',
    description: 'Buy & sell. No middleman. Pure P2P.',
    color: '#ff6ec7'  // Neon pink
  },
  {
    emoticonType: 'collection',
    emoticonAnimation: 'idle',
    title: 'COLLECT IT',
    description: 'Build collection. Become LEGENDARY.',
    color: '#00ffff'  // Neon cyan
  },
  {
    emoticonType: 'win',
    emoticonAnimation: 'bounce',
    title: 'WIN IT',
    description: 'Low fees on Base. Keep more GAINS.',
    color: '#ffff00'  // Neon yellow
  },
];

export default function PixelHeader() {
  const { isConnected } = useAccount();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b-4 border-[#39ff14] bg-[#0d0d0d]/95 backdrop-blur-sm">
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px',
        padding: '0 20px'
      }}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <PixelEmoticon 
            type="game" 
            size="md" 
            animation="idle"
            pixelSize={5}
          />
          <div className="flex flex-col">
            <span className="text-2xl font-[var(--font-pixel)] tracking-wider" 
                  style={{ 
                    fontFamily: '"Press Start 2P", cursive',
                    color: '#ffffff',
                    textShadow: '4px 4px 0 #000000'
                  }}>
              DE<span style={{ color: '#39ff14' }}>FUK</span>
            </span>
            <span className="text-xs font-[var(--font-retro)] tracking-widest"
                  style={{ 
                    fontFamily: '"VT323", monospace',
                    color: '#ff6ec7'
                  }}>
              NFT GAME
            </span>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex gap-2">
          <Link href="/" className="pixel-nav-btn">
            <span className="text-xs font-[var(--font-pixel)]">HOME</span>
          </Link>
          <Link href="/marketplace" className="pixel-nav-btn">
            <span className="text-xs font-[var(--font-pixel)]">SHOP</span>
          </Link>
          <Link href="/mint" className="pixel-nav-btn">
            <span className="text-xs font-[var(--font-pixel)]">MINT</span>
          </Link>
          <Link href="/collection" className="pixel-nav-btn">
            <span className="text-xs font-[var(--font-pixel)]">MY NFTs</span>
          </Link>
        </nav>

        {/* Connect Wallet */}
        <div className="flex items-center gap-2">
          {isConnected ? (
            <div className="flex items-center gap-2">
              <span className="text-xs font-[var(--font-retro)]" style={{ fontFamily: '"VT323", monospace', color: '#39ff14' }}>
                WALLET CONNECTED
              </span>
              <div className="w-3 h-3 bg-[#39ff14] rounded-sm animate-pixel-pulse" />
            </div>
          ) : (
            <button className="pixel-cta-btn">
              <span className="text-xs font-[var(--font-pixel)]">CONNECT</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
