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

// Deployed on Base Sepolia Testnet
export const CONTRACT_ADDRESSES = {
  nft: '0xf257E51Fec807FbFd2AbEC462CCaa6A234B33F79',
  marketplace: '0xF22d0FB68f542E681344B0130Bf284c3Fe2ddc7E',
};

// Simple ABIs
export const NFT_ABI = [
  'function mint(address to, uint256 quantity)',
  'function balanceOf(address account) view returns (uint256)',
  'function ownerOf(uint256 tokenId) view returns (address)',
];

export const MARKETPLACE_ABI = [
  'function createListing(address nftContract, uint256 tokenId, uint256 price)',
  'function buyListing(uint256 listingId) payable',
  'function cancelListing(uint256 listingId)',
  'function getListing(uint256 listingId) view returns (address, address, uint256, uint256, bool)',
];
