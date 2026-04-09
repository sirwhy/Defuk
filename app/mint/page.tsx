'use client';

import { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESSES, NFT_ABI } from '../wagmi';

export default function Mint() {
  const { user, authenticated } = usePrivy();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isMinting, setIsMinting] = useState(false);

  // Get address from Privy embedded wallet
  const address = user?.wallet?.address;
  
  const { writeContract } = useWriteContract();
  const { data: hash } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleMint = async () => {
    if (!name) {
      alert('Please enter NFT name');
      return;
    }
    
    if (!address) {
      alert('Please connect wallet first');
      return;
    }
    
    setIsMinting(true);
    
    try {
      // Public mint - free mint (0 ETH)
      writeContract({
        address: CONTRACT_ADDRESSES.nft as `0x${string}`,
        abi: NFT_ABI,
        functionName: 'mint',
        args: [1n],
      });
    } catch (error) {
      console.error('Mint error:', error);
      alert('Failed to mint NFT. Please check your wallet connection.');
    }
    setIsMinting(false);
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container">
        <h1 className="text-4xl font-bold text-center mb-4">Mint Your NFT</h1>
        <p className="text-[rgba(248,250,252,0.6)] text-center mb-12">
          Create and mint your unique digital artwork
        </p>

        <div className="max-w-2xl mx-auto">
          {!authenticated ? (
            <div className="text-center py-20">
              <p className="text-[rgba(248,250,252,0.6)] mb-4">Please connect your wallet to mint NFTs</p>
              <p className="text-sm text-[rgba(248,250,252,0.4)]">Use email, phone, or social login - no MetaMask required!</p>
            </div>
          ) : (
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8">
              {/* Image Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Upload Image</label>
                <div className="border-2 border-dashed border-white/[0.1] rounded-xl p-8 text-center">
                  {preview ? (
                    <div className="relative">
                      <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                      <button
                        onClick={() => { setImage(null); setPreview(''); }}
                        className="absolute top-2 right-2 p-2 bg-red-500 rounded-full text-white"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                      <div className="text-4xl mb-2">📁</div>
                      <p className="text-[rgba(248,250,252,0.6)]">Click to upload image</p>
                      <p className="text-xs text-[rgba(248,250,252,0.4)] mt-1">PNG, JPG, GIF up to 10MB</p>
                    </label>
                  )}
                </div>
              </div>

              {/* Name */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">NFT Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter NFT name"
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.1] rounded-xl focus:outline-none focus:border-[#8b5cf6]"
                />
              </div>

              {/* Description */}
              <div className="mb-8">
                <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your NFT"
                  rows={3}
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.1] rounded-xl focus:outline-none focus:border-[#8b5cf6]"
                />
              </div>

              {/* Mint Button */}
              <button
                onClick={handleMint}
                disabled={isMinting || !name}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] text-white font-bold text-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isMinting ? 'Minting...' : isConfirming ? 'Confirming...' : 'Mint NFT (Free)'}
              </button>

              {hash && (
                <p className="mt-4 text-sm text-green-400">
                  Transaction submitted: {hash.slice(0, 10)}...
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}