'use client';

import Link from 'next/link';
import LobsterIcon from './LobsterIcon';

export default function Footer() {
  return (
    <footer style={{
      padding: '40px 0',
      borderTop: `4px solid var(--ocean-teal)/30`,
      background: 'var(--ocean-deep)',
      textAlign: 'center',
      position: 'relative',
      zIndex: 1
    }}>
      <div className="container" style={{ padding: '0 20px' }}>
        
        {/* Lobster decorations */}
        <div className="flex justify-center gap-6 mb-8 pixel-art">
          <LobsterIcon type="bubble" size="md" animation="bubble-up" className="pixel-art" />
          <LobsterIcon type="ocean" size="md" animation="wave-slow" className="pixel-art" />
          <LobsterIcon type="fresh" size="md" animation="fresh" className="pixel-art" />
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '30px',
          marginBottom: '30px',
          textAlign: 'left'
        }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 2' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center', marginBottom: '16px' }}>
              <LobsterIcon 
                type="lobster" 
                size="lg" 
                animation="swim"
                className="pixel-art"
              />
              <span style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: '18px',
                fontWeight: '800',
                background: 'linear-gradient(135deg, var(--lobster-red) 0%, var(--lobster-orange) 50%, var(--shell-gold) 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '2px'
              }}>
                DE<span style={{ WebkitTextFillColor: 'var(--lobster-orange)' }}>FUK</span>
              </span>
            </Link>
            <p style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: '11px',
              color: 'var(--ocean-gray-muted)',
              lineHeight: 1.8,
              letterSpacing: '1px'
            }}>
              Create, collect & trade NFTs on Base.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: '10px',
              color: 'var(--ocean-teal)',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>
              Platform
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '8px' }}>
                <Link 
                  href="/marketplace"
                  style={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: '11px',
                    color: 'var(--ocean-foam-light)',
                    transition: 'color 0.1s',
                    letterSpacing: '1px'
                  }}
                >
                  Ocean
                </Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Link 
                  href="/mint"
                  style={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: '11px',
                    color: 'var(--ocean-foam-light)',
                    transition: 'color 0.1s',
                    letterSpacing: '1px'
                  }}
                >
                  Mint NFT
                </Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Link 
                  href="/collection"
                  style={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: '11px',
                    color: 'var(--ocean-foam-light)',
                    transition: 'color 0.1s',
                    letterSpacing: '1px'
                  }}
                >
                  My Treasure
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: '10px',
              color: 'var(--ocean-teal)',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>
              Legal
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '8px' }}>
                <Link 
                  href="#"
                  style={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: '11px',
                    color: 'var(--ocean-foam-light)',
                    transition: 'color 0.1s',
                    letterSpacing: '1px'
                  }}
                >
                  Terms
                </Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Link 
                  href="#"
                  style={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: '11px',
                    color: 'var(--ocean-foam-light)',
                    transition: 'color 0.1s',
                    letterSpacing: '1px'
                  }}
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          paddingTop: '20px',
          borderTop: `2px solid var(--ocean-teal)/20`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}>
          <p style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '10px',
            color: 'var(--ocean-gray-muted)',
            letterSpacing: '1px'
          }}>
            © {new Date().getFullYear()} DEFUK OCEAN NFT MARKETPLACE. ALL RIGHTS RESERVED.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span style={{ 
              color: 'var(--ocean-teal)', 
              fontSize: '10px',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              ⚓ BUILT ON BASE
            </span>
            <span style={{ 
              color: 'var(--lobster-orange)', 
              fontSize: '10px',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              🦞 FRESH EVERY DAY
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
