import { base, baseSepolia } from 'wagmi/chains';
import { http, createConfig } from 'wagmi';

// Wagmi config for Privy (defined in providers.tsx)
// This file just keeps the contracts and ABIs

export const wagmiConfig = createConfig({
  chains: [base, baseSepolia],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});

// Deployed on Base Sepolia Testnet (or Mainnet if env vars set)
export const CONTRACT_ADDRESSES = {
  nft: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || '0x2D03F6b9bFc84ee6C7d8cC4313B6833eDB8f6011',
  marketplace: process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS || '0xF22d0FB68f542E681344B0130Bf284c3Fe2ddc7E',
};

// Complete ABI - MyNFT (simplified - main functions)
export const NFT_ABI = [
  { "inputs": [{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"string","name":"_baseURI","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},
  { "anonymous": false, "inputs": [{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"approved","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name": "Approval", "type": "event" },
  { "anonymous": false, "inputs": [{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"operator","type":"address"},{"indexed":false,"name":"approved","type":"bool"}],"name": "ApprovalForAll", "type": "event" },
  { "anonymous": false, "inputs": [{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name": "Transfer", "type": "event" },
  { "inputs": [{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name": "approve", "outputs": [], "stateMutability":"payable","type":"function" },
  { "inputs": [{"internalType":"address","name":"owner","type":"address"}],"name": "balanceOf", "outputs": [{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function" },
  { "inputs": [], "name": "baseURI", "outputs": [{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function" },
  { "inputs": [{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name": "batchMint", "outputs": [], "stateMutability":"nonpayable","type":"function" },
  { "inputs": [{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name": "getApproved", "outputs": [{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function" },
  { "inputs": [{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name": "isApprovedForAll", "outputs": [{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function" },
  { "inputs": [], "name": "maxSupply", "outputs": [{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function" },
  { "inputs": [{"internalType":"uint256","name":"quantity","type":"uint256"}],"name": "mint", "outputs": [], "stateMutability":"payable","type":"function" },
  { "inputs": [], "name": "name", "outputs": [{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function" },
  { "inputs": [], "name": "owner", "outputs": [{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function" },
  { "inputs": [{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name": "ownerOf", "outputs": [{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function" },
  { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability":"nonpayable","type":"function" },
  { "inputs": [{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name": "safeTransferFrom", "outputs": [], "stateMutability":"payable","type":"function" },
  { "inputs": [{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name": "safeTransferFrom", "outputs": [], "stateMutability":"payable","type":"function" },
  { "inputs": [{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name": "setApprovalForAll", "outputs": [], "stateMutability":"nonpayable","type":"function" },
  { "inputs": [{"internalType":"string","name":"_baseURI","type":"string"}],"name": "setBaseURI", "outputs": [], "stateMutability":"nonpayable","type":"function" },
  { "inputs": [{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name": "supportsInterface", "outputs": [{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function" },
  { "inputs": [], "name": "symbol", "outputs": [{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function" },
  { "inputs": [{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name": "tokenURI", "outputs": [{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function" },
  { "inputs": [], "name": "totalMinted", "outputs": [{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function" },
  { "inputs": [], "name": "totalSupply", "outputs": [{"internalType":"uint256","name":"result","type":"uint256"}],"stateMutability":"view","type":"function" },
  { "inputs": [{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name": "transferFrom", "outputs": [], "stateMutability":"payable","type":"function" },
  { "inputs": [{"internalType":"address","name":"newOwner","type":"address"}],"name": "transferOwnership", "outputs": [], "stateMutability":"nonpayable","type":"function" },
] as const;

// Complete ABI - NFTMarketplace
export const MARKETPLACE_ABI = [
  { "anonymous": false, "inputs": [{"indexed":true,"name":"listingId","type":"uint256"}],"name": "ListingCancelled", "type": "event" },
  { "anonymous": false, "inputs": [{"indexed":true,"name":"listingId","type":"uint256"},{"indexed":true,"name":"seller","type":"address"},{"indexed":false,"name":"nftContract","type":"address"},{"indexed":false,"name":"tokenId","type":"uint256"},{"indexed":false,"name":"price","type":"uint256"}],"name": "ListingCreated", "type": "event" },
  { "anonymous": false, "inputs": [{"indexed":true,"name":"listingId","type":"uint256"},{"indexed":true,"name":"buyer","type":"address"},{"indexed":false,"name":"price","type":"uint256"}],"name": "NFTBought", "type": "event" },
  { "inputs": [{"internalType":"uint256","name":"listingId","type":"uint256"}],"name": "buyListing", "outputs": [], "stateMutability":"payable","type":"function" },
  { "inputs": [{"internalType":"uint256","name":"listingId","type":"uint256"}],"name": "cancelListing", "outputs": [], "stateMutability":"nonpayable","type":"function" },
  { "inputs": [{"internalType":"address","name":"nftContract","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"}],"name": "createListing", "outputs": [], "stateMutability":"nonpayable","type":"function" },
  { "inputs": [], "name": "getActiveListings", "outputs": [{"components":[{"internalType":"address","name":"seller","type":"address"},{"internalType":"address","name":"nftContract","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"internalType":"struct NFTMarketplace.Listing[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function" },
  { "inputs": [{"internalType":"uint256","name":"listingId","type":"uint256"}],"name": "getListing", "outputs": [{"components":[{"internalType":"address","name":"seller","type":"address"},{"internalType":"address","name":"nftContract","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"internalType":"struct NFTMarketplace.Listing","name":"","type":"tuple"}],"stateMutability":"view","type":"function" },
  { "inputs": [{"internalType":"address","name":"user","type":"address"}],"name": "getUserListings", "outputs": [{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function" },
  { "inputs": [], "name": "listingIdCounter", "outputs": [{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function" },
  { "inputs": [{"internalType":"uint256","name":"","type":"uint256"}],"name": "listings", "outputs": [{"internalType":"address","name":"seller","type":"address"},{"internalType":"address","name":"nftContract","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function" },
  { "inputs": [], "name": "platformFee", "outputs": [{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function" },
  { "inputs": [{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name": "userListings", "outputs": [{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function" },
] as const;
