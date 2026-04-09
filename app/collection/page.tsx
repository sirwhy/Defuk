'use client';

import { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import Link from 'next/link';

interface NFT {
  id: number;
  image: string;
  name: string;
  collection: string;
  isListed: boolean;
  price?: number;
}

export default function Collection() {
  const { user, authenticated } = usePrivy();
  
  // Get address from Privy embedded wallet
  const address = user?.wallet?.address;
  
  // Mock NFTs - in production, fetch from blockchain
  const [nfts, setNfts] = useState<NFT[]>([
    { id: 77682, image: '🎨', name: 'ArbitrumDAO #77682', collection: 'ArbitrumDAO', isListed: false },
    { id: 77683, image: '🎨', name: 'ArbitrumDAO #77683', collection: 'ArbitrumDAO', isListed: true, price: 0.003 },
  ]);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container">
        <h1 className="text-4xl font-bold text-center mb-4">My Collection</h1>
        <p className="text-[rgba(248,250,252,0.6)] text-center mb-12">
          View and manage your NFTs
        </p>

        {!authenticated ? (
          <div className="text-center py-20">
            <p className="text-[rgba(248,250,252,0.6)] mb-4">Please connect your wallet to view your collection</p>
            <Link href="/" className="text-[#8b5cf6] hover:underline">
              Go to Home to connect
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nfts.map((nft) => (
              <div
                key={nft.id}
                className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 hover:border-[#8b5cf6]/30 transition-all"
              >
                <div className="aspect-square bg-gradient-to-br from-[#8b5cf6]/20 to-[#ec4899]/20 rounded-xl mb-4 flex items-center justify-center text-6xl">
                  {nft.image}
                </div>
                <h3 className="font-medium mb-1">{nft.name}</h3>
                <p className="text-sm text-[rgba(248,250,252,0.4)] mb-3">{nft.collection}</p>
                
                {nft.isListed ? (
                  <div className="flex items-center justify-between">
                    <span className="text-green-400 font-medium">{nft.price} ETH</span>
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                      Listed
                    </span>
                  </div>
                ) : (
                  <span className="text-xs px-2 py-1 bg-[#8b5cf6]/20 text-[#8b5cf6] rounded-full">
                    Not Listed
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {address && (
          <p className="text-center mt-8 text-sm text-[rgba(248,250,252,0.4)]">
            Wallet: {address.slice(0, 6)}...{address.slice(-4)}
          </p>
        )}
      </div>
    </div>
  );
}