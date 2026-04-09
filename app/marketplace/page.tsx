'use client';

import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import Link from 'next/link';

interface NFT {
  id: number;
  image: string;
  name: string;
  collection: string;
  price: number;
  seller: string;
}

const mockListings: NFT[] = [
  { id: 1, image: '🎨', name: 'Cosmic Dreams #42', collection: 'Cosmic Dreams', price: 0.015, seller: '0x742...' },
  { id: 2, image: '🚀', name: 'Space Voyager #18', collection: 'Space Voyagers', price: 0.028, seller: '0x123...' },
  { id: 3, image: '🌟', name: 'Pixel Star #99', collection: 'Pixel Stars', price: 0.012, seller: '0x456...' },
  { id: 4, image: '🦋', name: 'Digital Butterfly #7', collection: 'Digital Butterflies', price: 0.035, seller: '0x789...' },
  { id: 5, image: '🔥', name: 'Fire Element #23', collection: 'Elements', price: 0.022, seller: '0xabc...' },
  { id: 6, image: '💎', name: 'Crystal Gems #56', collection: 'Crystal Gems', price: 0.045, seller: '0xdef...' },
  { id: 7, image: '🌊', name: 'Ocean Wave #11', collection: 'Ocean Series', price: 0.019, seller: '0x987...' },
  { id: 8, image: '🍀', name: 'Lucky Clover #3', collection: 'Lucky Collection', price: 0.008, seller: '0x654...' },
];

export default function Marketplace() {
  const { isConnected } = useAccount();
  const [listings] = useState<NFT[]>(mockListings);
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high'>('newest');

  const { writeContract } = useWriteContract();

  const sortedListings = [...listings].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return b.id - a.id;
  });

  const handleBuy = (listing: NFT) => {
    // Placeholder - add actual contract call
    alert('Buy functionality will work after deploying contracts!');
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Marketplace</h1>
            <p className="text-[rgba(248,250,252,0.5)]">Discover and collect unique NFTs</p>
          </div>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#11111a] border border-white/[0.1] rounded-lg px-4 py-2 text-sm"
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedListings.map((listing) => (
            <div key={listing.id} className="glass-card overflow-hidden group">
              <div className="aspect-square bg-gradient-to-br from-[#1a1a25] to-[#11111a] flex items-center justify-center">
                <span className="text-8xl transform group-hover:scale-110 transition-transform duration-500">{listing.image}</span>
              </div>
              <div className="p-4">
                <p className="text-xs text-[rgba(248,250,252,0.4)] mb-1">{listing.collection}</p>
                <h3 className="font-semibold mb-3">{listing.name}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[rgba(248,250,252,0.4)]">Price</p>
                    <p className="text-lg font-bold text-[#8b5cf6]">Ξ {listing.price}</p>
                  </div>
                  <button
                    onClick={() => handleBuy(listing)}
                    disabled={!isConnected}
                    className="btn btn-primary text-sm px-4 py-2 disabled:opacity-50"
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
