'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESSES, NFT_ABI } from '../wagmi';

export default function Mint() {
  const { address, isConnected } = useAccount();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isMinting, setIsMinting] = useState(false);

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
      setIsMinting(false);
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Mint Your <span className="gradient-text">NFT</span></h1>
            <p className="text-[rgba(248,250,252,0.5)] text-sm mt-2">Note: Only owner wallet can mint on Base Sepolia testnet</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Upload Image</h3>
              {!preview ? (
                <label className="border-2 border-dashed border-white/[0.1] rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-[#8b5cf6] transition-colors">
                  <div className="w-16 h-16 rounded-full bg-white/[0.05] flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-[rgba(248,250,252,0.4)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <p className="text-[rgba(248,250,252,0.6)] mb-2">Click to upload</p>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              ) : (
                <img src={preview} alt="Preview" className="w-full aspect-square object-cover rounded-xl" />
              )}
            </div>

            <div className="space-y-6">
              <div className="glass-card p-6">
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="My Amazing NFT" className="w-full" />
              </div>

              <div className="glass-card p-6">
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your NFT..." rows={4} className="w-full resize-none" />
              </div>

              <button 
                onClick={handleMint} 
                disabled={!name || !isConnected || isConfirming || isMinting} 
                className="w-full btn btn-primary text-lg py-4 disabled:opacity-50"
              >
                {isConfirming ? 'Confirming...' : isMinting ? 'Minting...' : isConnected ? 'Mint NFT' : 'Connect Wallet First'}
              </button>
              {!isConnected && <p className="text-xs text-center mt-2 text-gray-400">Connect your wallet to mint NFTs</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
