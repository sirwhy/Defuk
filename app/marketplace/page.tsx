'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import LobsterIcon from '../components/LobsterIcon';

export default function Marketplace() {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center pixel-art" style={{
        background: 'linear-gradient(180deg, var(--ocean-deep) 0%, var(--ocean-mid) 100%)'
      }}>
        <div className="text-center max-w-md mx-4">
          <div className="flex justify-center mb-6">
            <LobsterIcon 
              type="claw" 
              size="2xl" 
              animation="wave"
              className="pixel-art"
            />
          </div>
          <h1 style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: 'clamp(28px, 6vw, 42px)',
            fontWeight: '800',
            color: 'var(--ocean-white)',
            textShadow: '4px 4px 0 rgba(0,0,0,0.3)',
            marginBottom: '24px'
          }}>
            OCEAN MARKETPLACE
          </h1>
          <p style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '14px',
            color: 'var(--ocean-gray-muted)',
            marginBottom: '32px',
            lineHeight: 1.8,
            letterSpacing: '1px'
          }}>
            Connect your wallet to explore NFTs for sale
          </p>
          <Link href="/" className="lobster-btn lobster-btn-secondary"
                 style={{
                   fontFamily: '"Montserrat", sans-serif',
                   fontSize: '12px',
                   padding: '14px 28px',
                   fontWeight: '600',
                   display: 'inline-block'
                 }}>
            ← BACK TO HOME
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(180deg, var(--ocean-deep) 0%, var(--ocean-mid) 100%)',
      paddingTop: '120px',
      paddingBottom: '60px'
    }}>
      <div className="container" style={{ padding: '0 20px' }}>
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <LobsterIcon 
              type="ocean" 
              size="lg" 
              animation="wave-slow"
              className="pixel-art"
            />
          </div>
          <h1 style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: 'clamp(32px, 6vw, 48px)',
            fontWeight: '800',
            color: 'var(--ocean-white)',
            textShadow: '4px 4px 0 rgba(0,0,0,0.3)',
            marginBottom: '16px'
          }}>
            OCEAN MARKETPLACE
          </h1>
          <p style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '15px',
            color: 'var(--ocean-gray-muted)',
            marginBottom: '32px',
            lineHeight: 1.8,
            letterSpacing: '1px'
          }}>
            No NFTs listed yet. Be the first to mint and list your NFT!
          </p>
          <Link href="/mint" className="lobster-btn lobster-btn-primary"
                 style={{
                   fontFamily: '"Montserrat", sans-serif',
                   fontSize: '14px',
                   padding: '16px 32px',
                   fontWeight: '600',
                   display: 'inline-flex',
                   alignItems: 'center',
                   gap: '12px'
                 }}>
            <LobsterIcon 
              type="lobster" 
              size="sm" 
              animation="swim"
              className="pixel-art"
            />
            MINT YOUR FIRST NFT →
          </Link>
        </div>

      </div>
    </div>
  );
}
