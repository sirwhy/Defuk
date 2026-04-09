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

// Simple ABIs
export const NFT_ABI = [
  'function mint(address to, uint256 quantity)',
  'function balanceOf(address account) view returns (uint256)',
  'function ownerOf(uint256 tokenId) view returns (address)',
] as const;

export const MARKETPLACE_ABI = [
  'function createListing(address nftContract, uint256 tokenId, uint256 price)',
  'function buyListing(uint256 listingId) payable',
  'function cancelListing(uint256 listingId)',
  'function getListing(uint256 listingId) view returns (address seller, address nftContract, uint256 tokenId, uint256 price, bool active)',
] as const;
