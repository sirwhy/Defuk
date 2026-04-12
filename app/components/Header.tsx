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
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '50px',
            height: '50px',
            background: 'linear-gradient(135deg, #39ff14, #ff6ec7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
          }}>
            🎮
          </div>
          <span style={{
            fontFamily: 'Silkscreen, cursive',
            fontSize: '18px',
            color: '#ffffff',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            DE<span style={{ color: '#39ff14' }}>FUK</span>
          </span>
        </Link>

        <nav style={{ display: 'flex', gap: '8px' }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: '8px 16px',
                fontSize: '8px',
                fontFamily: '"Press Start 2P", cursive',
                background: pathname === link.href ? '#39ff14' : '#1a1a1a',
                color: pathname === link.href ? '#0d0d0d' : '#39ff14',
                border: '4px solid ' + (pathname === link.href ? '#39ff14' : '#333'),
                cursor: 'pointer',
                textTransform: 'uppercase',
                boxShadow: pathname === link.href 
                  ? '2px 2px 0 #39ff14, -2px -2px 0 #ff6ec7' 
                  : '4px 4px 0 #333',
                transition: 'all 0.1s'
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div>
          <ConnectButton.ShowBalance={false} />
        </div>
      </div>
    </header>
  );
}