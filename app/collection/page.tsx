'use client';

import { useState, useEffect } from 'react';
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

// Mock user NFTs
const mockUserNFTs: NFT[] = [
  { id: 77682, image: '🎨', name: 'ArbitrumDAO #77682', collection: 'ArbitrumDAO', isListed: false },
  { id: 77683, image: '🎨', name: 'ArbitrumDAO #77683', collection: 'ArbitrumDAO', isListed: true, price: 0.003 },
  { id: 77686, image: '🎨', name: 'ArbitrumDAO #77686', collection: 'ArbitrumDAO', isListed: false },
  { id: 77687, image: '🎨', name: 'ArbitrumDAO #77687', collection: 'ArbitrumDAO', isListed: false },
  { id: 77688, image: '🎨', name: 'ArbitrumDAO #77688', collection: 'ArbitrumDAO', isListed: true, price: 0.003 },
  { id: 77689, image: '🎨', name: 'ArbitrumDAO #77689', collection: 'ArbitrumDAO', isListed: false },
];

export default function Collection() {
  const { isConnected, address } = useAccount();
  const [nfts, setNfts] = useState<NFT[]>(mockUserNFTs);
  const [activeTab, setActiveTab] = useState<'all' | 'listed' | 'unlisted'>('all');
  const [listingModal, setListingModal] = useState<NFT | null>(null);
  const [listPrice, setListPrice] = useState('');
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const { data: hash, writeContract } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  const filteredNFTs = nfts.filter(nft => {
    if (activeTab === 'listed') return nft.isListed;
    if (activeTab === 'unlisted') return !nft.isListed;
    return true;
  });

  const handleList = (nft: NFT) => {
    if (!listPrice || !address) return;
    
    setActionLoading(nft.id);
    writeContract({
      address: CONTRACT_ADDRESSES.marketplace,
      abi: MARKETPLACE_ABI,
      functionName: 'createListing',
      args: [CONTRACT_ADDRESSES.nft, BigInt(nft.id), BigInt(parseFloat(listPrice) * 1e18)],
    });
    
    // Close modal and update status (in real app, wait for tx confirmation)
    setTimeout(() => {
      setNfts(nfts.map(n => 
        n.id === nft.id ? { ...n, isListed: true, price: parseFloat(listPrice) } : n
      ));
      setListingModal(null);
      setListPrice('');
      setActionLoading(null);
    }, 1000);
  };

  const handleDelist = (nft: NFT) => {
    if (!address) return;
    
    setActionLoading(nft.id);
    writeContract({
      address: CONTRACT_ADDRESSES.marketplace,
      abi: MARKETPLACE_ABI,
      functionName: 'cancelListing',
      args: [BigInt(nft.id)],
    });

    setTimeout(() => {
      setNfts(nfts.map(n => 
        n.id === nft.id ? { ...n, isListed: false, price: undefined } : n
      ));
      setActionLoading(null);
    }, 1000);
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">🔐</div>
          <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="text-[rgba(248,250,252,0.5)]">View your NFT collection</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            My Collection
          </h1>
          <p className="text-[rgba(248,250,252,0.5)]">
            Manage your NFT collection
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-4">
            <p className="text-xs text-[rgba(248,250,252,0.4)] mb-1">Total NFTs</p>
            <p className="text-2xl font-bold">{nfts.length}</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-xs text-[rgba(248,250,252,0.4)] mb-1">Listed</p>
            <p className="text-2xl font-bold text-green-400">{nfts.filter(n => n.isListed).length}</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-xs text-[rgba(248,250,252,0.4)] mb-1">Unlisted</p>
            <p className="text-2xl font-bold text-[#8b5cf6]">{nfts.filter(n => !n.isListed).length}</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-xs text-[rgba(248,250,252,0.4)] mb-1">Total Value</p>
            <p className="text-2xl font-bold">
              Ξ {nfts.reduce((a, b) => a + (b.price || 0), 0).toFixed(3)}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 p-1 bg-[#11111a] rounded-xl w-fit">
          {(['all', 'listed', 'unlisted'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab 
                  ? 'bg-[#8b5cf6] text-white' 
                  : 'text-[rgba(248,250,252,0.5)] hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filteredNFTs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">📭</div>
            <h3 className="text-xl font-semibold mb-2">No NFTs Found</h3>
            <p className="text-[rgba(248,250,252,0.5)]">
              {activeTab === 'all' ? "You don't own any NFTs yet" : 
               activeTab === 'listed' ? "No NFTs listed for sale" : "All your NFTs are listed!"}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredNFTs.map((nft, i) => (
              <div 
                key={nft.id}
                className="glass-card overflow-hidden animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="aspect-square bg-gradient-to-br from-[#1a1a25] to-[#11111a] flex items-center justify-center relative">
                  <span className="text-6xl">{nft.image}</span>
                  
                  {nft.isListed && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-xs text-green-400">
                      Listed
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <p className="text-xs text-[rgba(248,250,252,0.4)] mb-1">{nft.collection}</p>
                  <h3 className="font-semibold mb-2">{nft.name}</h3>
                  
                  {nft.isListed && nft.price && (
                    <p className="text-lg font-bold text-[#8b5cf6] mb-3">Ξ {nft.price}</p>
                  )}
                  
                  <div className="flex gap-2">
                    {nft.isListed ? (
                      <button
                        onClick={() => handleDelist(nft)}
                        disabled={actionLoading === nft.id}
                        className="flex-1 btn btn-ghost text-sm py-2"
                      >
                        {actionLoading === nft.id ? '...' : 'Delist'}
                      </button>
                    ) : (
                      <button
                        onClick={() => setListingModal(nft)}
                        className="flex-1 btn btn-primary text-sm py-2"
                      >
                        List for Sale
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Listing Modal */}
        {listingModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="glass-card p-6 w-full max-w-md animate-scale-in">
              <h3 className="text-xl font-bold mb-4">List NFT for Sale</h3>
              
              <div className="flex items-center gap-4 mb-6 p-4 bg-[#11111a] rounded-xl">
                <span className="text-4xl">{listingModal.image}</span>
                <div>
                  <p className="font-semibold">{listingModal.name}</p>
                  <p className="text-sm text-[rgba(248,250,252,0.4)]">ID: {listingModal.id}</p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Price (ETH)</label>
                <input
                  type="number"
                  step="0.001"
                  min="0"
                  value={listPrice}
                  onChange={(e) => setListPrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setListingModal(null)}
                  className="flex-1 btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleList(listingModal)}
                  disabled={!listPrice || actionLoading === listingModal.id}
                  className="flex-1 btn btn-primary disabled:opacity-50"
                >
                  {actionLoading === listingModal.id ? 'Processing...' : 'List Now'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}