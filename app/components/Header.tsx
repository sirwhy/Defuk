'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { usePathname } from 'next/navigation';
import LobsterIcon from './LobsterIcon';
import LobsterConnectButton from './LobsterConnectButton';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/marketplace', label: 'Market' },
  { href: '/mint', label: 'Mint' },
  { href: '/collection', label: 'Collection' },
];

export default function Header() {
  const pathname = usePathname();
  const { address } = useAccount();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Format address for display
  const formatAddress = (addr: string | undefined) => {
    if (!addr) return '';
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-100 ${
      scrolled 
        ? 'bg-farm-bg/92 backdrop-blur-xl border-b border-farm-line' 
        : 'bg-farm-bg/92 backdrop-blur-xl border-b border-farm-line'
    }`} style={{ height: '58px' }}>
      <div className="nav-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Logo */}
        <Link href="/" className="nav-logo">
          <div 
            className="nav-logo-icon"
            style={{
              background: 'linear-gradient(135deg, #191918 0%, #222221 100%)',
              border: '1px solid var(--line)',
              boxShadow: '0 0 20px rgba(255, 190, 14, 0.1)'
            }}
          >
            <LobsterIcon type="lobster" size="md" className="pixel-art" />
          </div>
          <span 
            className="nav-logo-name"
            style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: '14px',
              background: 'linear-gradient(135deg, var(--gold) 0%, var(--cream) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            DEFUK
          </span>
        </Link>

        {/* Nav Links */}
        <div className="nav-links hidden md:flex">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href}
              className={`nav-link ${pathname === link.href ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="nav-right">
          {/* Network Badge */}
          <div className="tempo-badge">
            <span className="tempo-dot"></span>
            <span>TOKI</span>
          </div>

          {/* Connect Wallet */}
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              const ready = mounted && authenticationStatus !== 'loading';
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus || authenticationStatus === 'authenticated');

              return (
                <div
                  style={{
                    display: 'flex',
                    gap: 8,
                    alignItems: 'center',
                  }}
                >
                  {!ready || !connected ? (
                    <button
                      onClick={openConnectModal}
                      type="button"
                      className="nav-icon-btn"
                      style={{
                        background: 'transparent',
                        border: '1px solid var(--gold)',
                        color: 'var(--gold)',
                        padding: '8px 16px',
                        fontSize: '12px',
                        fontWeight: '600',
                        fontFamily: 'var(--fsans)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                      }}
                    >
                      Connect
                    </button>
                  ) : (
                    <div
                      onClick={openAccountModal}
                      style={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <div
                        style={{
                          padding: '6px 12px',
                          background: 'var(--bg1)',
                          border: '1px solid var(--line)',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontFamily: 'var(--mono)',
                          color: 'var(--txt)',
                          fontWeight: '500',
                        }}
                      >
                        {formatAddress(address)}
                      </div>
                    </div>
                  )}

                  {/* Chain selector */}
                  {chain && (
                    <button
                      onClick={openChainModal}
                      type="button"
                      className="nav-icon-btn"
                      style={{ padding: '6px' }}
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '20px',
                            height: '20px',
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              style={{ width: '20px', height: '20px' }}
                            />
                          )}
                        </div>
                      )}
                    </button>
                  )}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </div>
    </nav>
  );
}
