'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/marketplace', label: 'SHOP' },
  { href: '/mint', label: 'MINT' },
  { href: '/collection', label: 'COLLECTION' },
];

export default function Header() {
  const pathname = usePathname();

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

        {/* Connect - RainbowKit - Custom Show */}
        <div>
          <ConnectButton.ShowBalance={false} />
        </div>
      </div>
    </header>
  );
}