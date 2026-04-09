import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base, baseSepolia } from 'wagmi/chains';
import { http } from 'viem';

export const wagmiConfig = getDefaultConfig({
  appName: 'NFTCreate Marketplace',
  projectId: 'YOUR_PROJECT_ID',
  chains: [base, baseSepolia],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});

export const CONTRACT_ADDRESSES = {
  nft: (process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000') as `0x${string}`,
  marketplace: (process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000') as `0x${string}`,
};

// ABI fragments
export const NFT_ABI = [
  { inputs: [{ name: 'to', type: 'address' }, { name: 'quantity', type: 'uint256' }], name: 'mint', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [{ name: 'account', type: 'address' }], name: 'balanceOf', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ name: 'tokenId', type: 'uint256' }], name: 'ownerOf', outputs: [{ name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'totalMinted', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
] as const;

export const MARKETPLACE_ABI = [
  { inputs: [{ name: 'nftContract', type: 'address' }, { name: 'tokenId', type: 'uint256' }, { name: 'price', type: 'uint256' }], name: 'createListing', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [{ name: 'listingId', type: 'uint256' }], name: 'buyListing', outputs: [], stateMutability: 'payable', type: 'function' },
  { inputs: [{ name: 'listingId', type: 'uint256' }], name: 'cancelListing', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [{ name: 'listingId', type: 'uint256' }], name: 'getListing', outputs: [{ name: 'seller', type: 'address' }, { name: 'nftContract', type: 'address' }, { name: 'tokenId', type: 'uint256' }, { name: 'price', type: 'uint256' }, { name: 'active', type: 'bool' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'listingIdCounter', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
] as const;