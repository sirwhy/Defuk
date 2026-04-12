'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { usePathname } from 'next/navigation';
import LobsterIcon from './LobsterIcon';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/marketplace', label: 'Ocean' },
  { href: '/mint', label: 'Mint' },
  { href: '/collection', label: 'My Treasure' },
];

export default function Header() {
  const pathname = usePathname();
  const { isConnected } = useAccount();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-100 pixel-art ${
        scrolled 
          ? 'bg-[#0a1929]/95 backdrop-blur-md border-b-4 border-[#40e0d0]/30' 
          : 'bg-[#0a1929]/95 border-b-4 border-[#40e0d0]/30'
      }`}
    >
      <div className="container" style={{ padding: '0 20px' }}>
        <nav className="flex items-center justify-between" style={{ height: '80px' }}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <LobsterIcon 
              type="lobster" 
              size="lg" 
              animation="swim"
              className="group-hover:rotate-12 transition-transform pixel-art"
            />
            <div className="flex flex-col">
              <span style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: 'clamp(18px, 4vw, 24px)',
                fontWeight: '800',
                background: 'linear-gradient(135deg, var(--lobster-red) 0%, var(--lobster-orange) 50%, var(--shell-gold) 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'ocean-flow 8s ease infinite',
                letterSpacing: '2px'
              }}>
                DE<span style={{ WebkitTextFillColor: 'var(--lobster-orange)' }}>FUK</span>
              </span>
              <span style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: '9px',
                color: 'var(--ocean-teal)',
                letterSpacing: '3px',
                textTransform: 'uppercase'
              }}>
                OCEAN NFT
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className="lobster-nav-btn"
                style={{
                  background: pathname === link.href 
                    ? 'var(--ocean-teal)' 
                    : 'rgba(64, 224, 208, 0.1)',
                  color: pathname === link.href 
                    ? 'var(--ocean-deep)' 
                    : 'var(--ocean-teal)',
                  borderColor: pathname === link.href
                    ? 'var(--ocean-teal)'
                    : 'var(--ocean-teal)'
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Connect Wallet Button */}
          <div className="hidden md:block">
            {isConnected ? (
              <div className="flex items-center gap-2">
                <span style={{
                  fontFamily: '"Montserrat", sans-serif',
                  fontSize: '10px',
                  color: 'var(--ocean-teal)',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}>
                  WALLET CONNECTED
                </span>
                <div style={{
                  width: '8px',
                  height: '8px',
                  background: 'var(--ocean-teal)',
                  borderRadius: 0,
                  boxShadow: '0 0 10px var(--ocean-teal)'
                }} />
              </div>
            ) : (
              <ConnectButton 
                showBalance={false}
                accountStatus="address"
              />
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden lobster-btn"
            style={{
              padding: '10px',
              fontSize: '16px',
              background: 'var(--ocean-teal)',
              color: 'var(--ocean-deep)'
            }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden" style={{
            padding: '16px 0',
            borderTop: '2px solid var(--ocean-teal)/30'
          }}>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className="lobster-nav-btn"
                  style={{
                    background: pathname === link.href 
                      ? 'var(--ocean-teal)' 
                      : 'rgba(64, 224, 208, 0.1)',
                    color: pathname === link.href 
                      ? 'var(--ocean-deep)' 
                      : 'var(--ocean-teal)'
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
