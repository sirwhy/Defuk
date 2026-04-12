'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import Link from 'next/link';

export default function Collection() {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🔐</div>
          <h1 className="text-4xl font-bold mb-4">My Collection</h1>
          <p className="text-[rgba(248,250,252,0.5)] mb-6">Connect your wallet to view your NFTs</p>
          <Link href="/" className="btn btn-primary text-sm px-6 py-3">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container">
        <div className="text-center mb-16">
          <div className="text-6xl mb-4">🎮</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Collection</h1>
          <p className="text-[rgba(248,250,252,0.5)] text-lg max-w-xl mx-auto">
            You haven't minted any NFTs yet. Start your collection by minting your first NFT!
          </p>
          <div className="mt-8">
            <Link href="/mint" className="btn btn-primary text-lg px-8 py-4">
              Mint Your First NFT →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
