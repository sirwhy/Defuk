'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePrivy } from '@privy-io/react-auth';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/mint', label: 'Mint' },
  { href: '/collection', label: 'My Collection' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { login, logout, user, isAuthenticated, ready } = usePrivy();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get wallet address from user
  const walletAddress = user?.wallet?.address;
  const shortAddress = walletAddress 
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : '';

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#030712]/80 backdrop-blur-xl border-b border-white/[0.06]' 
          : 'bg-transparent'
      }`}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold font-[var(--font-display)]">
              NFT<span className="text-[#8b5cf6]">Create</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? 'bg-white/[0.08] text-white'
                    : 'text-[rgba(248,250,252,0.6)] hover:text-white hover:bg-white/[0.04]'
                }}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Connect Button - Privy */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              {ready && !isAuthenticated ? (
                <button
                  onClick={login}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] text-white font-medium text-sm hover:opacity-90 transition-opacity"
                >
                  Connect Wallet
                </button>
              ) : isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1.5 rounded-full bg-white/[0.08] text-white text-sm font-medium">
                    {shortAddress}
                  </span>
                  <button
                    onClick={logout}
                    className="px-3 py-1.5 rounded-full border border-white/[0.15] text-[rgba(248,250,252,0.6)] text-sm font-medium hover:text-white hover:bg-white/[0.04] transition-all"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  disabled
                  className="px-5 py-2.5 rounded-full bg-white/[0.08] text-white/50 text-sm font-medium cursor-not-allowed"
                >
                  Loading...
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/[0.06] animate-fade-up">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    pathname === link.href
                      ? 'bg-white/[0.08] text-white'
                      : 'text-[rgba(248,250,252,0.6)] hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                {ready && !isAuthenticated ? (
                  <button
                    onClick={login}
                    className="w-full px-5 py-2.5 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] text-white font-medium text-sm"
                  >
                    Connect Wallet
                  </button>
                ) : isAuthenticated ? (
                  <button
                    onClick={logout}
                    className="w-full px-5 py-2.5 rounded-full border border-white/[0.15] text-white font-medium text-sm"
                  >
                    Disconnect ({shortAddress})
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}