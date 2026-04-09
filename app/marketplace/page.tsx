'use client';

import { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESSES, MARKETPLACE_ABI } from '../wagmi';
import Link from 'next/link';

interface NFT {
  id: number;
  image: string;
  name: string;
  collection: string;
  price: number;
  seller: string;
}

export default function Marketplace() {
  const { user, authenticated } = usePrivy();
  const [buying, setBuying] = useState<number | null>(null);
  
  // Get address from Privy embedded wallet
  const address = user?.wallet?.address;

  // Mock listings - in production, fetch from marketplace contract
  const [listings] = useState<NFT[]>([
    { id: 1, image: '🎨', name: 'Cosmic Dreams #42', collection: 'Cosmic Dreams', price: 0.015, seller: '0x742d35Cc6634C0532925a3b844Bc9e7595f...' },
    { id: 2, image: '🚀', name: 'Space Voyager #18', collection: 'Space Voyagers', price: 0.028, seller: '0x123d35Cc6634C0532925a3b844Bc9e7595f...' },
    { id: 3, image: '🌟', name: 'Pixel Star #99', collection: 'Pixel Stars', price: 0.012, seller: '0x456d35Cc6634C0532925a3b844Bc9e7595f...' },
    { id: 4, image: '🦋', name: 'Digital Butterfly #7', collection: 'Digital Butterflies', price: 0.035, seller: '0x789d35Cc6634C0532925a3b844Bc9e7595f...' },
    { id: 5, image: '🔥', name: 'Fire Element #23', collection: 'Elements', price: 0.022, seller: '0xabcd35Cc6634C0532925a3b844Bc9e7595f...' },
    { id: 6, image: '💎', name: 'Crystal Gems #56', collection: 'Crystal Gems', price: 0.045, seller: '0xdefd35Cc6634C0532925a3b844Bc9e7595f...' },
  ]);

  const { writeContract } = useWriteContract();

  const handleBuy = async (listing: NFT) => {
    if (!address) {
      alert('Please connect wallet first');
      return;
    }

    setBuying(listing.id);
    
    try {
      // Buy listing - send ETH equal to price
      writeContract({
        address: CONTRACT_ADDRESSES.marketplace as `0x${string}`,
        abi: MARKETPLACE_ABI,
        functionName: 'buyListing',
        args: [BigInt(listing.id)],
        value: BigInt(Math.floor(listing.price * 1e18)),
      });
    } catch (error) {
      console.error('Buy error:', error);
      alert('Failed to buy NFT');
    }
    
    setBuying(null);
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container">
        <h1 className="text-4xl font-bold text-center mb-4">NFT Marketplace</h1>
        <p className="text-[rgba(248,250,252,0.6)] text-center mb-12">
          Buy and sell unique digital assets
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings.map((nft) => (
            <div
              key={nft.id}
              className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 hover:border-[#8b5cf6]/30 transition-all"
            >
              <div className="aspect-square bg-gradient-to-br from-[#8b5cf6]/20 to-[#ec4899]/20 rounded-xl mb-4 flex items-center justify-center text-6xl">
                {nft.image}
              </div>
              <h3 className="font-medium mb-1">{nft.name}</h3>
              <p className="text-sm text-[rgba(248,250,252,0.4)] mb-3">{nft.collection}</p>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-[#8b5cf6] font-bold">{nft.price} ETH</span>
                <span className="text-xs text-[rgba(248,250,252,0.4)]">
                  {nft.seller.slice(0, 6)}...
                </span>
              </div>

              <button
                onClick={() => handleBuy(nft)}
                disabled={buying === nft.id || !authenticated}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] text-white font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {buying === nft.id ? 'Buying...' : 'Buy Now'}
              </button>
            </div>
          ))}
        </div>

        {listings.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[rgba(248,250,252,0.6)]">No listings available</p>
          </div>
        )}
      </div>
    </div>
  );
}