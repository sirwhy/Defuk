'use client';

import Link from 'next/link';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import LobsterIcon from './LobsterIcon';

// Lobster Ocean features
const features: Array<{
  iconType: 'lobster' | 'claw' | 'bubble' | 'ocean' | 'fresh' | 'premium';
  iconAnimation: 'swim' | 'wave' | 'pulse' | 'float' | 'bubble-up' | 'wave-slow' | 'fresh' | 'glow';
  title: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  bgColor: string;
}> = [
  {
    iconType: 'lobster',
    iconAnimation: 'swim',
    title: 'MINT IT FRESH',
    description: 'Upload your art. Fresh minting. Seafood quality guaranteed!',
    primaryColor: '#ff4500',
    secondaryColor: '#ffb6c1',
    bgColor: 'rgba(255, 69, 0, 0.1)'
  },
  {
    iconType: 'claw',
    iconAnimation: 'wave',
    title: 'TRADE BIG CLAWS',
    description: 'Buy & sell with big moves. No middlemen, pure ocean P2P.',
    primaryColor: '#ff6b35',
    secondaryColor: '#ffd700',
    bgColor: 'rgba(255, 107, 53, 0.1)'
  },
  {
    iconType: 'bubble',
    iconAnimation: 'bubble-up',
    title: 'COLLECT BUBBLES',
    description: 'Build your bubble collection. Become the ocean legend.',
    primaryColor: '#40e0d0',
    secondaryColor: '#f0f8ff',
    bgColor: 'rgba(64, 224, 208, 0.1)'
  },
  {
    iconType: 'fresh',
    iconAnimation: 'fresh',
    title: 'FRESH LOW FEES',
    description: 'Super fresh on Base. Keep more of your seafood profits.',
    primaryColor: '#006994',
    secondaryColor: '#40e0d0',
    bgColor: 'rgba(0, 105, 148, 0.1)'
  },
];

export default function LobsterHome() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(180deg, var(--ocean-deep) 0%, var(--ocean-mid) 100%)',
      fontFamily: '"Montserrat", sans-serif'
    }}>
      
      {/* Ocean Waves Background */}
      <div className="ocean-waves" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(64, 224, 208, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 107, 53, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(0, 105, 148, 0.1) 0%, transparent 70%)
        `,
        zIndex: 0
      }} />

      {/* Floating Bubbles */}
      <div className="floating-bubbles" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="bubble"
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 100}%`,
              width: `${8 + Math.random() * 12}px`,
              height: `${8 + Math.random() * 12}px`,
              background: 'rgba(240, 248, 255, 0.2)',
              borderRadius: '50%',
              animation: `bubble-up ${2 + Math.random() * 3}s ease-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Lobster Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b-4 border-ocean-teal/30 bg-ocean-deep/95 backdrop-blur-md">
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '80px',
          padding: '0 20px'
        }}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <LobsterIcon 
              type="lobster" 
              size="lg" 
              animation="swim"
              className="group-hover:rotate-12 transition-transform"
            />
            <div className="flex flex-col">
              <span className="text-3xl font-bold tracking-wider" 
                    style={{ 
                      fontFamily: '"Montserrat", sans-serif',
                      background: 'linear-gradient(135deg, var(--lobster-red) 0%, var(--lobster-orange) 50%, var(--premium-gold) 100%)',
                      backgroundSize: '200% 200%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      animation: 'ocean-flow 8s ease infinite'
                    }}>
                DE<span style={{ color: 'var(--lobster-orange)' }}>FUK</span>
              </span>
              <span className="text-sm font-light tracking-widest"
                    style={{ 
                      fontFamily: '"Montserrat", sans-serif',
                      color: 'var(--ocean-teal)',
                      letterSpacing: '4px'
                    }}>
                OCEAN NFT
              </span>
            </div>
          </Link>

          {/* Nav */}
          <nav className="flex gap-3">
            <Link href="/" className="lobster-nav-btn">
              <span className="text-xs font-semibold">HOME</span>
            </Link>
            <Link href="/marketplace" className="lobster-nav-btn">
              <span className="text-xs font-semibold">OCEAN</span>
            </Link>
            <Link href="/mint" className="lobster-nav-btn">
              <span className="text-xs font-semibold">MINT</span>
            </Link>
            <Link href="/collection" className="lobster-nav-btn">
              <span className="text-xs font-semibold">MY TREASURE</span>
            </Link>
          </nav>

          {/* Connect Wallet */}
          <div className="flex items-center gap-3">
            {isConnected ? (
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold" style={{ fontFamily: '"Montserrat", sans-serif', color: 'var(--ocean-teal)' }}>
                  WALLET CONNECTED
                </span>
                <div className="w-3 h-3 bg-ocean-teal rounded-full animate-pulse shadow-glow-soft" />
              </div>
            ) : (
              <button className="lobster-cta-btn">
                <span className="text-xs font-semibold">CONNECT</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative" style={{
        paddingTop: '160px',
        paddingBottom: '100px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="container" style={{ position: 'relative' }}>
          
          {/* Ocean Badge */}
          <div style={{
            display: 'inline-block',
            padding: '12px 32px',
            border: `3px solid var(--ocean-teal)`,
            color: 'var(--ocean-teal)',
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '3px',
            marginBottom: '40px',
            backgroundColor: 'rgba(64, 224, 208, 0.1)',
            boxShadow: '0 0 20px rgba(64, 224, 208, 0.3)',
            textTransform: 'uppercase'
          }}>
            ⚓ POWERED BY BASE NETWORK
          </div>

          {/* Animated Lobster Hero */}
          <div style={{ marginBottom: '48px' }}>
            <LobsterIcon 
              type="lobster" 
              size="3xl" 
              animation="swim"
              className="mx-auto animate-lobster-swim shadow-lobster-glow"
              style={{ filter: 'drop-shadow(0 0 40px rgba(255, 69, 0, 0.4))' }}
            />
          </div>

          {/* Main Title */}
          <h1 className="lobster-title" style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: 'clamp(48px, 10vw, 96px)',
            fontWeight: '800',
            color: 'var(--ocean-white)',
            textShadow: '4px 4px 0 rgba(0,0,0,0.3), 0 0 60px rgba(255, 69, 0, 0.4)',
            lineHeight: 1.1,
            marginBottom: '24px'
          }}>
            FRESH FROM THE
            <br />
            <span style={{ 
              background: 'linear-gradient(135deg, var(--lobster-red) 0%, var(--lobster-orange) 50%, var(--premium-gold) 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'ocean-flow 8s ease infinite',
              display: 'block'
            }}>
              OCEAN DEPTHS
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '22px',
            color: 'var(--ocean-foam-light)',
            maxWidth: '600px',
            margin: '32px auto 56px',
            lineHeight: 1.8,
            opacity: 0.9
          }}>
            Seafood-quality NFTs. 
            <br />
            Fresh minting. Big claw trading. 
            <br />
            Straight from the ocean depths to your wallet.
          </p>

          {/* CTA Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '24px', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            marginBottom: '64px' 
          }}>
            {isConnected ? (
              <>
                <Link href="/mint" className="lobster-btn lobster-btn-primary"
                       style={{
                         fontFamily: '"Montserrat", sans-serif',
                         fontSize: '16px',
                         padding: '18px 40px',
                         fontWeight: '600'
                       }}>
                  🦞 FRESH MINTING
                </Link>
                <Link href="/marketplace" className="lobster-btn lobster-btn-secondary"
                       style={{
                         fontFamily: '"Montserrat", sans-serif',
                         fontSize: '16px',
                         padding: '18px 40px',
                         fontWeight: '600'
                       }}>
                  🐚 EXPLORE OCEAN
                </Link>
              </>
            ) : (
              <ConnectButton 
                showBalance={false} 
                accountStatus="address"
                className="lobster-wallet-btn"
              />
            )}
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '60px',
            flexWrap: 'wrap'
          }}>
            <div className="ocean-stat">
              <div className="stat-number" style={{ color: 'var(--lobster-red)' }}>0</div>
              <div className="stat-label" style={{ color: 'var(--ocean-gray-muted)' }}>NFTs MINTED</div>
            </div>
            <div className="ocean-stat">
              <div className="stat-number" style={{ color: 'var(--ocean-teal)' }}>0</div>
              <div className="stat-label" style={{ color: 'var(--ocean-gray-muted)' }}>COLLECTORS</div>
            </div>
            <div className="ocean-stat">
              <div className="stat-number" style={{ color: 'var(--shell-gold)' }}>0</div>
              <div className="stat-label" style={{ color: 'var(--ocean-gray-muted)' }}>TOTAL VOLUME</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ 
        padding: '100px 0', 
        background: 'linear-gradient(180deg, var(--ocean-mid) 0%, var(--ocean-deep) 100%)',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="container" style={{ position: 'relative' }}>
          
          <h2 style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '36px',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '64px',
            color: 'var(--ocean-white)',
            textShadow: '4px 4px 0 rgba(0,0,0,0.3)'
          }}>
            <span style={{ color: 'var(--lobster-red)' }}>🦞</span> OCEAN FEATURES
          </h2>

          <div className="grid-cards" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px'
          }}>
            {features.map((feature, i) => (
              <div key={i} className="lobster-card" 
                   style={{
                     backgroundColor: 'rgba(26, 74, 110, 0.5)',
                     backdropFilter: 'blur(10px)',
                     border: `4px solid ${feature.primaryColor}`,
                     boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), 0 0 40px ${feature.primaryColor}30`
                   }}>
                {/* Corner decorations */}
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '-12px',
                  width: '24px',
                  height: '24px',
                  background: `radial-gradient(circle, ${feature.primaryColor} 0%, transparent 70%)`,
                  borderRadius: '50%'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '-12px',
                  right: '-12px',
                  width: '24px',
                  height: '24px',
                  background: `radial-gradient(circle, ${feature.secondaryColor} 0%, transparent 70%)`,
                  borderRadius: '50%'
                }} />

                <LobsterIcon 
                  type={feature.iconType}
                  size="lg"
                  animation={feature.iconAnimation}
                  style={{ filter: `drop-shadow(0 0 20px ${feature.primaryColor}60)` }}
                  className="mx-auto"
                />

                <h3 style={{
                  fontFamily: '"Montserrat", sans-serif',
                  fontSize: '18px',
                  fontWeight: '700',
                  color: feature.primaryColor,
                  marginBottom: '16px',
                  marginTop: '24px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontFamily: '"Montserrat", sans-serif',
                  fontSize: '15px',
                  color: 'var(--ocean-foam-light)',
                  lineHeight: 1.7,
                  opacity: 0.9
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
        padding: '100px 0',
        textAlign: 'center',
        background: 'linear-gradient(180deg, var(--ocean-deep) 0%, var(--ocean-mid) 100%)',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ marginBottom: '48px' }}>
            <LobsterIcon 
              type="premium"
              size="xl"
              animation="glow"
              style={{ 
                filter: 'drop-shadow(0 0 40px rgba(255, 215, 0, 0.6))',
                marginBottom: '32px'
              }}
            />
          </div>
          
          <h2 style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: 'clamp(32px, 6vw, 56px)',
            fontWeight: '800',
            color: 'var(--ocean-white)',
            marginBottom: '32px',
            textShadow: '4px 4px 0 rgba(0,0,0,0.3)'
          }}>
            READY TO <span style={{ color: 'var(--ocean-teal)' }}>DIVE IN</span>?
          </h2>
          <p style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '20px',
            color: 'var(--ocean-foam-light)',
            marginBottom: '56px',
            lineHeight: 1.8,
            opacity: 0.9
          }}>
            Join thousands of collectors in the ocean depths.
            <br />
            Fresh NFTs waiting for you.
          </p>
          
          {isConnected ? (
            <Link href="/mint" className="lobster-btn lobster-btn-premium"
                   style={{
                     fontFamily: '"Montserrat", sans-serif',
                     fontSize: '18px',
                     padding: '22px 56px',
                     display: 'inline-flex',
                     alignItems: 'center',
                     gap: '16px',
                     fontWeight: '700'
                   }}>
              <LobsterIcon 
                type="lobster"
                size="sm"
                animation="swim"
              />
              START YOUR OCEAN JOURNEY
            </Link>
          ) : (
            <ConnectButton 
              showBalance={false} 
              accountStatus="address"
              className="lobster-wallet-btn-large"
            />
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '60px 0',
        borderTop: `4px solid var(--ocean-teal)/30`,
        textAlign: 'center',
        background: 'var(--ocean-deep)',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="container">
          <div className="flex justify-center gap-8 mb-8">
            <LobsterIcon type="bubble" size="md" animation="bubble-up" />
            <LobsterIcon type="ocean" size="md" animation="wave-slow" />
            <LobsterIcon type="fresh" size="md" animation="fresh" />
          </div>
          
          <p style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '12px',
            color: 'var(--ocean-gray-muted)',
            lineHeight: 2,
            letterSpacing: '1px'
          }}>
            © 2026 DEFUK OCEAN NFT MARKETPLACE. ALL RIGHTS RESERVED.
            <br />
            <span style={{ color: 'var(--ocean-teal)' }}>⚓ BUILT ON BASE</span> • 
            <span style={{ color: 'var(--lobster-orange)', marginLeft: '24px' }}>🦞 FRESH EVERY DAY</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
