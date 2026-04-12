'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESSES, NFT_ABI } from '../wagmi';
import LobsterIcon from '../components/LobsterIcon';

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
      <div className="min-h-screen flex items-center justify-center pixel-art" style={{
        background: 'linear-gradient(180deg, var(--ocean-deep) 0%, var(--ocean-mid) 100%)'
      }}>
        <div className="text-center max-w-md mx-4">
          <div className="flex justify-center mb-6">
            <LobsterIcon 
              type="shell" 
              size="2xl" 
              animation="pulse"
              className="pixel-art"
            />
          </div>
          <h1 style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: 'clamp(28px, 6vw, 42px)',
            fontWeight: '800',
            color: 'var(--ocean-white)',
            textShadow: '4px 4px 0 rgba(0,0,0,0.3)',
            marginBottom: '24px'
          }}>
            CONNECT WALLET
          </h1>
          <p style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '14px',
            color: 'var(--ocean-gray-muted)',
            marginBottom: '32px',
            lineHeight: 1.8,
            letterSpacing: '1px'
          }}>
            Please connect your wallet to mint NFTs
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(180deg, var(--ocean-deep) 0%, var(--ocean-mid) 100%)',
      paddingTop: '120px',
      paddingBottom: '60px'
    }}>
      <div className="container" style={{ padding: '0 20px' }}>
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <LobsterIcon 
              type="fresh" 
              size="xl" 
              animation="fresh"
              className="pixel-art"
              style={{ filter: 'drop-shadow(0 0 20px rgba(64, 224, 208, 0.6))' }}
            />
          </div>
          <h1 style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: 'clamp(32px, 6vw, 48px)',
            fontWeight: '800',
            color: 'var(--ocean-white)',
            textShadow: '4px 4px 0 rgba(0,0,0,0.3)',
            marginBottom: '16px'
          }}>
            MINT YOUR <span style={{ color: 'var(--ocean-teal)' }}>NFT</span>
          </h1>
          <p style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '12px',
            color: 'var(--ocean-gray-muted)',
            marginBottom: '8px',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            Note: Only owner wallet can mint on Base Sepolia testnet
          </p>
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 pixel-art">
            
            {/* Image Upload */}
            <div className="lobster-card">
              <h3 style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: '16px',
                fontWeight: '700',
                color: 'var(--ocean-white)',
                marginBottom: '16px',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                📷 UPLOAD IMAGE
              </h3>
              {!preview ? (
                <label className="border-2 border-dashed" style={{
                  borderColor: 'var(--ocean-teal)',
                  borderRadius: 0,
                  padding: '48px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  minHeight: '300px',
                  transition: 'all 0.1s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--lobster-orange)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--ocean-teal)'}
                >
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: 0,
                    background: 'rgba(64, 224, 208, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    <svg style={{ width: '32px', height: '32px', color: 'var(--ocean-teal)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="square" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <p style={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: '12px',
                    color: 'var(--ocean-gray-muted)',
                    marginBottom: '8px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                  }}>
                    Click to upload
                  </p>
                  <p style={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: '10px',
                    color: 'var(--ocean-gray-muted)',
                    opacity: 0.6,
                    letterSpacing: '0.5px'
                  }}>
                    PNG, JPG, GIF up to 10MB
                  </p>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              ) : (
                <div style={{
                  position: 'relative',
                  borderRadius: 0,
                  overflow: 'hidden',
                  border: `4px solid var(--ocean-teal)`
                }}>
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="w-full aspect-square object-cover pixel-art"
                    style={{ imageRendering: 'pixelated' }}
                  />
                  <button 
                    onClick={(e) => { e.preventDefault(); setPreview(''); setImage(null); }}
                    className="absolute top-2 right-2 lobster-btn"
                    style={{
                      background: '#ff4500',
                      padding: '8px',
                      fontSize: '10px',
                      border: '2px solid #cc3700'
                    }}
                  >
                    REMOVE
                  </button>
                </div>
              )}
            </div>

            {/* Details Form */}
            <div className="space-y-6">
              <div className="lobster-card">
                <label style={{
                  fontFamily: '"Montserrat", sans-serif',
                  fontSize: '12px',
                  fontWeight: '700',
                  color: 'var(--ocean-white)',
                  marginBottom: '12px',
                  display: 'block',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}>
                  🦞 NAME *
                </label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="My Amazing NFT"
                  style={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: '14px',
                    padding: '14px',
                    borderRadius: 0,
                    border: `2px solid var(--ocean-teal)`,
                    background: 'rgba(64, 224, 208, 0.05)',
                    color: 'var(--ocean-white)',
                    width: '100%',
                    outline: 'none',
                    letterSpacing: '1px'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--lobster-orange)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'var(--ocean-teal)'}
                />
              </div>

              <div className="lobster-card">
                <label style={{
                  fontFamily: '"Montserrat", sans-serif',
                  fontSize: '12px',
                  fontWeight: '700',
                  color: 'var(--ocean-white)',
                  marginBottom: '12px',
                  display: 'block',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}>
                  📝 DESCRIPTION
                </label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Describe your NFT..."
                  rows={4}
                  style={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: '14px',
                    padding: '14px',
                    borderRadius: 0,
                    border: `2px solid var(--ocean-teal)`,
                    background: 'rgba(64, 224, 208, 0.05)',
                    color: 'var(--ocean-white)',
                    width: '100%',
                    outline: 'none',
                    resize: 'none',
                    letterSpacing: '1px'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--lobster-orange)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'var(--ocean-teal)'}
                />
              </div>

              <button 
                onClick={handleMint} 
                disabled={!name || !isConnected || isConfirming || isMinting} 
                className="lobster-btn lobster-btn-primary w-full"
                style={{
                  fontFamily: '"Montserrat", sans-serif',
                  fontSize: '14px',
                  padding: '18px 32px',
                  fontWeight: '600',
                  opacity: (!name || !isConnected) ? 0.5 : 1,
                  cursor: (!name || !isConnected) ? 'not-allowed' : 'pointer'
                }}
              >
                {isConfirming ? 'Confirming...' : isMinting ? 'Minting...' : isConnected ? '🦞 MINT NFT' : 'Connect Wallet First'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
