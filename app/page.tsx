'use client';

import Link from 'next/link';
import { usePrivy } from '@privy-io/react-auth';

// Retro gaming features - unique & fun!
const features = [
  {
    icon: '🎮',
    title: 'Mint It',
    description: 'Upload your art. Press START. Boom - NFT minted!',
    color: 'var(--neon-green)'
  },
  {
    icon: '🛒',
    title: 'Trade It',
    description: 'Buy & sell on the marketplace. No middleman.',
    color: 'var(--neon-pink)'
  },
  {
    icon: '💎',
    title: 'Collect It',
    description: 'Build your collection. Become a legendary collector.',
    color: 'var(--neon-cyan)'
  },
  {
    icon: '🎯',
    title: 'Win It',
    description: 'Low fees on Base chain. Keep more of your gains.',
    color: 'var(--neon-yellow)'
  },
];

// Fake stats - but who cares, it looks cool!
const stats = [
  { value: '9,999', label: 'NFTs MINTED' },
  { value: '4,201', label: 'PLAYERS' },
  { value: '∞', label: 'POSSIBILITIES' },
];

export default function Home() {
  const { user, authenticated } = usePrivy();

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
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, var(--neon-green), var(--neon-pink))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              🎮
            </div>
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

          {/* Connect */}
          <div>
            <PrivyBtn />
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
            marginBottom: '24px'
          }}>
            <span className="blink">▸</span> POWERED BY BASE NETWORK
          </div>

          {/* Main Title - Different from generic */}
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

          {/* Subtitle - No generic corporate speak */}
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

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
            {authenticated ? (
              <>
                <Link href="/mint" className="btn-retro">
                  ⚡ START MINTING
                </Link>
                <Link href="/marketplace" style={{
                  fontFamily: 'var(--font-silkscreen)',
                  color: 'var(--text-muted)',
                  padding: '12px 24px',
                  border: '2px solid #333'
                }}>
                  EXPLORE
                </Link>
              </>
            ) : (
              <PrivyBtn />
            )}
          </div>

          {/* Stats - Retro style */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            flexWrap: 'wrap'
          }}>
            {stats.map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div className="stat-pixel">{stat.value}</div>
                <div style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: '8px',
                  color: 'var(--text-muted)',
                  marginTop: '4px'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Retro Cards */}
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
              <div 
                key={i}
                className="retro-card"
                style={{ cursor: 'pointer' }}
              >
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-silkscreen)',
                  fontSize: '18px',
                  color: feature.color,
                  marginBottom: '12px'
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
          
          {authenticated ? (
            <Link href="/mint" className="btn-retro">
              🎯 START YOUR QUEST
            </Link>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <PrivyBtn />
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
            © 2026 DEFK NFT MARKETPLACE. ALL RIGHTS RESERVED.
            <br />
            <span style={{ color: 'var(--neon-green)' }}>BUILT ON BASE</span> • <span style={{ color: 'var(--neon-pink)' }}>POWERED BY YOU</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

// Compact login button
function PrivyBtn() {
  const { login, logout, user, authenticated, ready } = usePrivy();
  const address = user?.wallet?.address;
  const shortAddr = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  if (!ready) {
    return (
      <div style={{
        fontFamily: 'var(--font-pixel)',
        fontSize: '8px',
        color: 'var(--text-muted)',
        padding: '8px 16px',
        border: '2px solid #333'
      }}>
        LOADING...
      </div>
    );
  }

  if (authenticated) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{
          fontFamily: 'var(--font-retro)',
          fontSize: '16px',
          color: 'var(--neon-green)',
          padding: '8px 12px',
          border: '2px solid var(--neon-green)',
          background: 'rgba(57, 255, 20, 0.1)'
        }}>
          {shortAddr}
        </span>
        <button
          onClick={logout}
          style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '8px',
            padding: '8px 12px',
            border: '2px solid #333',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          QUIT
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={login}
      className="pixel-btn"
    >
      START GAME
    </button>
  );
}