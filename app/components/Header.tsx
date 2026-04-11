'use client';

import Link from 'next/link';
import { usePrivy } from '@privy-io/react-auth';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/marketplace', label: 'SHOP' },
  { href: '/mint', label: 'MINT' },
  { href: '/collection', label: 'COLLECTION' },
];

export default function Header() {
  const pathname = usePathname();
  const { login, logout, user, authenticated, ready } = usePrivy();
  const address = user?.wallet?.address;
  const shortAddr = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  return (
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

        {/* Nav - Desktop */}
        <nav style={{ display: 'flex', gap: '8px' }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="pixel-btn"
              style={{
                padding: '8px 16px',
                fontSize: '8px',
                background: pathname === link.href ? 'var(--neon-green)' : 'var(--bg-card)',
                color: pathname === link.href ? 'var(--bg-dark)' : 'var(--neon-green)',
                borderColor: pathname === link.href ? 'var(--neon-green)' : '#333'
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Connect */}
        <div>
          {ready && !authenticated ? (
            <button onClick={login} className="pixel-btn">
              START GAME
            </button>
          ) : authenticated ? (
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
          ) : (
            <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px', color: '#666' }}>
              LOADING...
            </span>
          )}
        </div>
      </div>
    </header>
  );
}