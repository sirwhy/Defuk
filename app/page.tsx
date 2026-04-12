'use client';

import Link from 'next/link';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import AnimatedEmoticon from './components/AnimatedEmoticon';

// Retro gaming features with animated emoticons
const features = [
  {
    emoticonType: 'mint',
    title: 'Mint It',
    description: 'Upload art. Press START. Boom - NFT minted!',
    color: 'var(--neon-green)',
    animation: 'pulse',
    size: 'lg'
  },
  {
    emoticonType: 'trading',
    title: 'Trade It',
    description: 'Buy & sell on marketplace. No middleman.',
    color: 'var(--neon-pink)',
    animation: 'float',
    size: 'lg'
  },
  {
    emoticonType: 'collection',
    title: 'Collect It',
    description: 'Build collection. Become legendary.',
    color: 'var(--neon-cyan)',
    animation: 'glow',
    size: 'lg'
  },
  {
    emoticonType: 'win',
    title: 'Win It',
    description: 'Low fees on Base. Keep more gains.',
    color: 'var(--neon-yellow)',
    animation: 'sparkle',
    size: 'lg'
  },
];

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-dark)' }}>
      
      {/* Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(13,13,13,0.95)',
        borderBottom: '2px solid #333',
        backdropFilter: 'blur(10px)'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px'
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <AnimatedEmoticon 
              type="game" 
              size="md" 
              animation="bounce"
              className="transform hover:scale-110 transition-transform"
            />
            <span className="retro-title" style={{ fontSize: '18px' }}>
              DE<span style={{ color: 'var(--neon-green)' }}>FUK</span>
            </span>
          </Link>

          {/* Nav */}
          <nav style={{ display: 'flex', gap: '8px' }}>
            <Link href="/" className="pixel-btn" style={{ padding: '8px 16px', fontSize: '8px' }}>
              HOME
            </Link>
            <Link href="/marketplace" className="pixel-btn" style={{ padding: '8px 16px', fontSize: '8px' }}>
              SHOP
            </Link>
            <Link href="/mint" className="pixel-btn" style={{ padding: '8px 16px', fontSize: '8px' }}>
              MINT
            </Link>
          </nav>

          {/* Connect - RainbowKit */}
          <div>
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        paddingTop: '140px',
        paddingBottom: '80px',
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* Background Grid */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(57, 255, 20, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(57, 255, 20, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          opacity: 0.5
        }} />

        <div className="container" style={{ position: 'relative' }}>
          {/* Subtitle */}
          <div style={{
            display: 'inline-block',
            padding: '8px 16px',
            border: '2px solid var(--neon-cyan)',
            color: 'var(--neon-cyan)',
            fontFamily: 'var(--font-pixel)',
            fontSize: '10px',
            marginBottom: '24px',
            animation: 'pulse 2s ease-in-out infinite'
          }}>
            ▸ POWERED BY BASE NETWORK
          </div>

          {/* Animated Hero Icon */}
          <div style={{ marginBottom: '24px' }}>
            <AnimatedEmoticon 
              type="game" 
              size="xl" 
              animation="bounce"
              className="mx-auto"
            />
          </div>

          {/* Main Title */}
          <h1 style={{
            fontFamily: 'var(--font-silkscreen)',
            fontSize: 'clamp(32px, 8vw, 72px)',
            color: 'var(--text-bright)',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '4px'
          }}>
            CREATE YOUR
            <br />
            <span className="neon-green" style={{ textShadow: '0 0 20px var(--neon-green)' }}>
              DIGITAL REALITY
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontFamily: 'var(--font-retro)',
            fontSize: '24px',
            color: 'var(--text-muted)',
            maxWidth: '600px',
            margin: '0 auto 32px',
            lineHeight: 1.4
          }}>
            No boring paperwork. No complicated steps. 
            Just upload, mint, and trade. That's it.
          </p>

          {/* CTA Buttons with animated emoticons */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
            {isConnected ? (
              <>
                <Link href="/mint" className="pixel-btn" style={{ background: 'var(--neon-green)', color: 'var(--bg-dark)', borderColor: 'var(--neon-green)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AnimatedEmoticon type="mint" size="sm" animation="lightning" />
                  START MINTING
                </Link>
                <Link href="/marketplace" className="pixel-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AnimatedEmoticon type="trading" size="sm" animation="float" />
                  EXPLORE
                </Link>
              </>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ConnectButton />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features with Animated Emoticons */}
      <section style={{ padding: '80px 0', background: '#111' }}>
        <div className="container">
          <h2 style={{
            fontFamily: 'var(--font-silkscreen)',
            fontSize: '24px',
            textAlign: 'center',
            marginBottom: '40px',
            color: 'var(--text-bright)'
          }}>
            <span style={{ color: 'var(--neon-pink)' }}>▣</span> GAME FEATURES
          </h2>

          <div className="grid-cards">
            {features.map((feature, i) => (
              <div key={i} className="retro-card" style={{ cursor: 'pointer' }}>
                <AnimatedEmoticon 
                  type={feature.emoticonType}
                  size="lg"
                  animation={feature.animation}
                  className="mx-auto"
                />
                <h3 style={{
                  fontFamily: 'var(--font-silkscreen)',
                  fontSize: '18px',
                  color: feature.color,
                  marginBottom: '12px',
                  marginTop: '16px'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-retro)',
                  fontSize: '20px',
                  color: 'var(--text-muted)',
                  lineHeight: 1.4
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
        background: 'linear-gradient(180deg, #111 0%, var(--bg-dark) 100%)'
      }}>
        <div className="container">
          <div style={{ marginBottom: '24px' }}>
            <AnimatedEmoticon 
              type="quest"
              size="xl"
              animation="pulse"
              className="mx-auto"
            />
          </div>
          
          <h2 style={{
            fontFamily: 'var(--font-silkscreen)',
            fontSize: '28px',
            color: 'var(--text-bright)',
            marginBottom: '16px'
          }}>
            READY TO <span className="neon-green">PLAY</span>?
          </h2>
          <p style={{
            fontFamily: 'var(--font-retro)',
            fontSize: '22px',
            color: 'var(--text-muted)',
            marginBottom: '32px'
          }}>
            Join thousands of players in the NFT universe.
          </p>
          
          {isConnected ? (
            <Link href="/mint" className="pixel-btn" style={{ background: 'var(--neon-green)', color: 'var(--bg-dark)', borderColor: 'var(--neon-green)', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto' }}>
              <AnimatedEmoticon type="quest" size="sm" animation="pulse" />
              START YOUR QUEST
            </Link>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <ConnectButton />
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '40px 0',
        borderTop: '2px solid #222',
        textAlign: 'center'
      }}>
        <div className="container">
          <p style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '8px',
            color: '#444'
          }}>
            © 2026 DEFUK NFT MARKETPLACE. ALL RIGHTS RESERVED.
            <br />
            <span style={{ color: 'var(--neon-green)' }}>BUILT ON BASE</span> • <span style={{ color: 'var(--neon-pink)' }}>POWERED BY YOU</span>
          </p>
        </div>
      </footer>
    </div>
  );
}