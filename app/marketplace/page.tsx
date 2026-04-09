'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESSES, MARKETPLACE_ABI } from '../wagmi';

interface Listing {
  id: number;
  seller: string;
  nftContract: string;
  tokenId: number;
  price: string;
  active: boolean;
}

interface NFT {
  id: number;
  image: string;
  name: string;
  collection: string;
  price: number;
  seller: string;
}

// Mock data for demo
const mockListings: NFT[] = [
  { id: 1, image: '🎨', name: 'Cosmic Dreams #42', collection: 'Cosmic Dreams', price: 0.015, seller: '0x742...a3f' },
  { id: 2, image: '🚀', name: 'Space Voyager #18', collection: 'Space Voyagers', price: 0.028, seller: '0x123...b45' },
  { id: 3, image: '🌟', name: 'Pixel Star #99', collection: 'Pixel Stars', price: 0.012, seller: '0x456...c78' },
  { id: 4, image: '🦋', name: 'Digital Butterfly #7', collection: 'Digital Butterflies', price: 0.035, seller: '0x789...d90' },
  { id: 5, image: '🔥', name: 'Fire Element #23', collection: 'Elements', price: 0.022, seller: '0xabc...e12' },
  { id: 6, image: '💎', name: 'Crystal Gems #56', collection: 'Crystal Gems', price: 0.045, seller: '0xdef...f34' },
  { id: 7, image: '🌊', name: 'Ocean Wave #11', collection: 'Ocean Series', price: 0.019, seller: '0x987...g56' },
  { id: 8, image: '🍀', name: 'Lucky Clover #3', collection: 'Lucky Collection', price: 0.008, seller: '0x654...h78' },
];

export default function Marketplace() {
  const { isConnected } = useAccount();
  const [listings, setListings] = useState<NFT[]>(mockListings);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high'>('newest');
  const [buyingId, setBuyingId] = useState<number | null>(null);

  const { data: hash, writeContract } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  // Sort listings
  const sortedListings = [...listings].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return b.id - a.id;
  });

  const handleBuy = (listing: NFT) => {
    if (!isConnected) return;
    
    setBuyingId(listing.id);
    writeContract({
      chainId: 8453,
      address: CONTRACT_ADDRESSES.marketplace,
      abi: MARKETPLACE_ABI,
      functionName: 'buyListing',
      args: [BigInt(listing.id)],
      value: BigInt(listing.price * 1e18),
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Marketplace
            </h1>
            <p className="text-[rgba(248,250,252,0.5)]">
              Discover and collect unique NFTs
            </p>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-[rgba(248,250,252,0.5)]">Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#11111a] border border-white/[0.1] rounded-lg px-4 py-2 text-sm focus:border-[#8b5cf6] focus:outline-none"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/[0.06]">
          <div className="glass-card px-6 py-3">
            <span className="text-2xl font-bold gradient-text">{listings.length}</span>
            <span className="text-[rgba(248,250,252,0.4)] ml-2">Listings</span>
          </div>
          <div className="glass-card px-6 py-3">
            <span className="text-2xl font-bold">Ξ {listings.reduce((a, b) => a + b.price, 0).toFixed(3)}</span>
            <span className="text-[rgba(248,250,252,0.4)] ml-2">Total Value</span>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="glass-card p-4">
                <div className="aspect-square skeleton mb-4" />
                <div className="h-4 skeleton w-3/4 mb-2" />
                <div className="h-3 skeleton w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedListings.map((listing, i) => (
              <div 
                key={listing.id}
                className="glass-card overflow-hidden group animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {/* Image */}
                <div className="aspect-square bg-gradient-to-br from-[#1a1a25] to-[#11111a] flex items-center justify-center relative overflow-hidden">
                  <span className="text-8xl transform group-hover:scale-110 transition-transform duration-500">
                    {listing.image}
                  </span>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Info */}
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
                      disabled={!isConnected || isConfirming || buyingId === listing.id}
                      className="btn btn-primary text-sm px-4 py-2 disabled:opacity-50"
                    >
                      {buyingId === listing.id ? 'Buying...' : 'Buy'}
                    </button>
                  </div>
                  
                  <p className="text-xs text-[rgba(248,250,252,0.3)] mt-3">
                    Seller: {listing.seller}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {listings.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">📦</div>
            <h3 className="text-xl font-semibold mb-2">No Listings Yet</h3>
            <p className="text-[rgba(248,250,252,0.5)] mb-6">Be the first to list your NFT!</p>
            <a href="/mint" className="btn btn-primary">
              Mint & List NFT
            </a>
          </div>
        )}
      </div>
    </div>
  );
}