# NFT Marketplace V2 - Deployment Guide

## Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment
Create `.env.local`:
```env
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_ALCHEMY_API_KEY=your-alchemy-key
```

### 3. Run Development
```bash
npm run dev
```

### 4. Deploy to Vercel
```bash
npm run build
# Deploy to Vercel (free)
```

---

## Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Landing page |
| Marketplace | `/marketplace` | Browse & buy NFTs |
| Mint | `/mint` | Create new NFT |
| Collection | `/collection` | My NFTs & listings |

---

## Design Features

- **Dark Synthwave** aesthetic with purple/pink accents
- **Glassmorphism** cards with blur effects
- **Smooth animations** - fade up, scale in, stagger
- **Responsive** - mobile, tablet, desktop
- **Wallet connect** via RainbowKit

---

## Smart Contracts (V1)

Located in `/root/.openclaw/workspace/nft-marketplace/contracts/`:
- `MyNFT.sol` - ERC-721A NFT contract
- `NFTMarketplace.sol` - Marketplace contract

Deploy dengan Hardhat ke Base:
```bash
cd contracts
npx hardhat run scripts/deploy.js --network base
```