'use client';

import { useState, useCallback } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { CONTRACT_ADDRESSES, NFT_ABI } from '../wagmi';

export default function Mint() {
  const { isConnected } = useAccount();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [attributes, setAttributes] = useState<{ trait_type: string; value: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [mintedTokenId, setMintedTokenId] = useState<number | null>(null);

  const { data: hash, writeContract, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ 
    hash 
  });

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const addAttribute = () => {
    setAttributes([...attributes, { trait_type: '', value: '' }]);
  };

  const updateAttribute = (index: number, field: 'trait_type' | 'value', value: string) => {
    const newAttrs = [...attributes];
    newAttrs[index][field] = value;
    setAttributes(newAttrs);
  };

  const removeAttribute = (index: number) => {
    setAttributes(attributes.filter((_, i) => i !== index));
  };

  const handleMint = async () => {
    if (!name) return;
    setLoading(true);

    try {
      // In production: Upload to IPFS first, then get URI
      // For now: Use placeholder URI
      const placeholderURI = `ipfs://placeholder/${Date.now()}`;
      
      writeContract({
      chainId: 8453,
        address: CONTRACT_ADDRESSES.nft,
        abi: NFT_ABI,
        functionName: 'mint',
        args: [isConnected ? '0x742d35Cc6634C0532925a3b844Bc9e7595f0fE' : '0x', BigInt(1)],
      });
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">🔐</div>
          <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="text-[rgba(248,250,252,0.5)]">Please connect your wallet to mint NFTs</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Mint Your <span className="gradient-text">NFT</span>
            </h1>
            <p className="text-[rgba(248,250,252,0.5)]">
              Create and mint your unique digital collectible
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left - Image Upload */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Upload Image</h3>
              
              {!preview ? (
                <label className="border-2 border-dashed border-white/[0.1] rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-[#8b5cf6] transition-colors group">
                  <div className="w-16 h-16 rounded-full bg-white/[0.05] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-[rgba(248,250,252,0.4)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <p className="text-[rgba(248,250,252,0.6)] mb-2">Click to upload</p>
                  <p className="text-xs text-[rgba(248,250,252,0.3)]">PNG, JPG, GIF, SVG • Max 10MB</p>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative group">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="w-full aspect-square object-cover rounded-xl"
                  />
                  <button 
                    onClick={() => { setImage(null); setPreview(''); }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Right - Details */}
            <div className="space-y-6">
              {/* Name */}
              <div className="glass-card p-6">
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="My Amazing NFT"
                  className="w-full"
                />
              </div>

              {/* Description */}
              <div className="glass-card p-6">
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your NFT..."
                  rows={4}
                  className="w-full resize-none"
                />
              </div>

              {/* Attributes */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium">Attributes</label>
                  <button 
                    onClick={addAttribute}
                    className="text-sm text-[#8b5cf6] hover:text-[#a855f7] transition-colors"
                  >
                    + Add Trait
                  </button>
                </div>
                
                {attributes.map((attr, i) => (
                  <div key={i} className="flex gap-3 mb-3">
                    <input
                      type="text"
                      placeholder="Type"
                      value={attr.trait_type}
                      onChange={(e) => updateAttribute(i, 'trait_type', e.target.value)}
                      className="flex-1"
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      value={attr.value}
                      onChange={(e) => updateAttribute(i, 'value', e.target.value)}
                      className="flex-1"
                    />
                    <button 
                      onClick={() => removeAttribute(i)}
                      className="p-3 text-red-400 hover:text-red-300"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Mint Button */}
              <button
                onClick={handleMint}
                disabled={!name || isPending || isConfirming}
                className="w-full btn btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? 'Confirm in Wallet...' : isConfirming ? 'Minting...' : isSuccess ? '🎉 Minted!' : 'Mint NFT'}
              </button>

              {hash && (
                <a 
                  href={`https://basescan.org/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-sm text-[rgba(248,250,252,0.4)] hover:text-[#8b5cf6] transition-colors"
                >
                  View Transaction →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}