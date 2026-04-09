'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESSES, MARKETPLACE_ABI } from '../wagmi';

interface NFT {
  id: number;
  image: string;
  name: string;
  collection: string;
  isListed: boolean;
  price?: number;
}

const mockUserNFTs: NFT[] = [
  { id: 77682, image: '🎨', name: 'ArbitrumDAO #77682', collection: 'ArbitrumDAO', isListed: false },
  { id: 77683, image: '🎨', name: 'ArbitrumDAO #77683', collection: 'ArbitrumDAO', isListed: true, price: 0.003 },
];

export default function Collection() {
  const { isConnected } = useAccount();
  const [nfts] = useState<NFT[]>(mockUserNFTs);
  const [activeTab, setActiveTab] = useState<'all' | 'listed' | 'unlisted'>('all');
  const [listingModal, setListingModal] = useState<NFT | null>(null);
  const [listPrice, setListPrice] = useState('');

  const { data: hash, writeContract } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  const filteredNFTs = nfts.filter(nft => {
    if (activeTab === 'listed') return nft.isListed;
    if (activeTab === 'unlisted') return !nft.isListed;
    return true;
  });

  const handleList = (nft: NFT) => {
    if (!listPrice) return;
    
    writeContract({
      address: CONTRACT_ADDRESSES.marketplace as `0x${string}`,
      abi: MARKETPLACE_ABI,
      functionName: 'createListing',
      args: [CONTRACT_ADDRESSES.nft as `0x${string}`, BigInt(nft.id), BigInt(parseFloat(listPrice) * 1e18)],
    });
    
    setListingModal(null);
    setListPrice('');
  };

  const handleDelist = (nft: NFT) => {
    writeContract({
      address: CONTRACT_ADDRESSES.marketplace as `0x${string}`,
      abi: MARKETPLACE_ABI,
      functionName: 'cancelListing',
      args: [BigInt(nft.id)],
    });
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">🔐</div>
          <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">My Collection</h1>
        
        <div className="flex gap-2 mb-8 p-1 bg-[#11111a] rounded-xl w-fit">
          {(['all', 'listed', 'unlisted'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-sm font-medium ${
                activeTab === tab ? 'bg-[#8b5cf6] text-white' : 'text-[rgba(248,250,252,0.5)]'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredNFTs.map((nft) => (
            <div key={nft.id} className="glass-card overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-[#1a1a25] to-[#11111a] flex items-center justify-center">
                <span className="text-6xl">{nft.image}</span>
                {nft.isListed && (
                  <div className="absolute top-3 right-3 px-3 py-1 bg-green-500/20 rounded-full text-xs text-green-400">Listed</div>
                )}
              </div>
              <div className="p-4">
                <p className="font-semibold">{nft.name}</p>
                {nft.isListed && nft.price && <p className="text-lg font-bold text-[#8b5cf6]">Ξ {nft.price}</p>}
                <div className="flex gap-2 mt-3">
                  {nft.isListed ? (
                    <button onClick={() => handleDelist(nft)} className="flex-1 btn btn-ghost text-sm py-2">Delist</button>
                  ) : (
                    <button onClick={() => setListingModal(nft)} className="flex-1 btn btn-primary text-sm py-2">List for Sale</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {listingModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="glass-card p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">List NFT for Sale</h3>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Price (ETH)</label>
                <input type="number" step="0.001" value={listPrice} onChange={(e) => setListPrice(e.target.value)} placeholder="0.00" className="w-full" />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setListingModal(null)} className="flex-1 btn btn-ghost">Cancel</button>
                <button onClick={() => handleList(listingModal)} disabled={!listPrice} className="flex-1 btn btn-primary disabled:opacity-50">List Now</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
