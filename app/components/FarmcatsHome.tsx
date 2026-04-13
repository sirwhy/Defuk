'use client';

import Link from 'next/link';
import { useAccount } from 'wagmi';
import LobsterIcon from './LobsterIcon';

// FarmCats-style stats
const stats = [
  { label: 'Total Volume', value: '1,234', suffix: 'ETH', color: 'gold' },
  { label: 'Items', value: '8,542', suffix: '', color: 'blue' },
  { label: 'Owners', value: '3,421', suffix: '', color: 'green' },
  { label: 'Floor Price', value: '0.089', suffix: 'ETH', color: 'gold' },
];

// FarmCats-style collections
const collections = [
  {
    id: 1,
    name: 'DEFUK Lobster #001',
    image: '🦞',
    price: '0.15',
    seller: '0x71C...9A23',
  },
  {
    id: 2,
    name: 'DEFUK Lobster #042',
    image: '🦞',
    price: '0.12',
    seller: '0x8B4...C112',
  },
  {
    id: 3,
    name: 'DEFUK Lobster #089',
    image: '🦞',
    price: '0.18',
    seller: '0x3F2...D445',
  },
  {
    id: 4,
    name: 'DEFUK Lobster #156',
    image: '🦞',
    price: '0.10',
    seller: '0x9E1...B678',
  },
  {
    id: 5,
    name: 'DEFUK Lobster #203',
    image: '🦞',
    price: '0.14',
    seller: '0x4A7...E234',
  },
  {
    id: 6,
    name: 'DEFUK Lobster #278',
    image: '🦞',
    price: '0.16',
    seller: '0x6D3...F567',
  },
];

export default function FarmcatsHome() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen" style={{ 
      background: 'var(--bg)',
      fontFamily: 'var(--fsans)'
    }}>
      
      {/* Stats Section */}
      <div className="wrap" style={{ padding: '24px 24px 0' }}>
        <div className="market-stats">
          {stats.map((stat, i) => (
            <div key={i} className="stat-cell">
              <div className="stat-label">{stat.label}</div>
              <div className={`stat-val ${stat.color}`}>
                {stat.value}<span style={{ fontSize: '14px', marginLeft: '4px' }}>{stat.suffix}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Page Content */}
      <div className="page-wrap">
        
        {/* Page Header */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          marginBottom: '24px' 
        }}>
          <h1 style={{
            fontFamily: '"EB Garamond", serif',
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: '500',
            color: 'var(--txt)'
          }}>
            Market
          </h1>
          
          {/* Search & Filters */}
          <div style={{ 
            display: 'flex', 
            gap: '12px',
            alignItems: 'center'
          }}>
            <input 
              type="text"
              placeholder="Search..."
              style={{
                padding: '10px 16px',
                background: 'var(--bg1)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--rs)',
                color: 'var(--txt)',
                fontFamily: 'var(--fsans)',
                fontSize: '14px',
                minWidth: '200px'
              }}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-row">
          <button className="tab-btn act">All NFTs</button>
          <button className="tab-btn">Lobsters</button>
          <button className="tab-btn">Bubbles</button>
          <button className="tab-btn">Claws</button>
        </div>

        {/* NFT Grid */}
        <div className="nft-grid">
          {collections.map((nft) => (
            <div key={nft.id} className="nft-card" style={{
              transition: 'all 0.2s ease'
            }}>
              <div className="nft-img-ph" style={{
                background: 'linear-gradient(135deg, var(--bg2) 0%, var(--bg3) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '64px'
              }}>
                {nft.image}
              </div>
              <div className="nft-body">
                <div className="nft-name">{nft.name}</div>
                <div className="nft-price">
                  {nft.price} <span style={{ fontSize: '11px', color: 'var(--txt2)' }}>ETH</span>
                </div>
                <div className="nft-seller">{nft.seller}</div>
              </div>
              <div className="nft-actions">
                <button className="btn btn-gold w-full" style={{ fontSize: '12px' }}>
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '40px',
          marginBottom: '40px'
        }}>
          <button className="btn btn-out btn-lg">
            Load More
          </button>
        </div>

        {/* Features Section */}
        <div style={{
          marginTop: '80px',
          padding: '60px 0',
          background: 'var(--bg1)',
          border: `1px solid var(--line)`,
          borderRadius: 'var(--r)'
        }}>
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '48px' 
          }}>
            <h2 style={{
              fontFamily: '"EB Garamond", serif',
              fontSize: 'clamp(24px, 4vw, 36px)',
              fontWeight: '500',
              color: 'var(--txt)',
              marginBottom: '16px'
            }}>
              Why DEFUK?
            </h2>
            <p style={{
              color: 'var(--txt2)',
              fontSize: '15px',
              lineHeight: 1.7
            }}>
              Fresh NFTs from the ocean depths
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px'
          }}>
            {/* Feature 1 */}
            <div style={{ padding: '24px' }}>
              <LobsterIcon type="lobster" size="lg" animation="pulse" className="mb-4" />
              <h3 style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '18px',
                fontWeight: '600',
                color: 'var(--txt)',
                marginBottom: '12px'
              }}>
                Fresh Minting
              </h3>
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '14px',
                color: 'var(--txt2)',
                lineHeight: 1.7
              }}>
                Upload your art and mint it fresh. Seafood quality guaranteed with low fees.
              </p>
            </div>

            {/* Feature 2 */}
            <div style={{ padding: '24px' }}>
              <LobsterIcon type="claw" size="lg" animation="wave" className="mb-4" />
              <h3 style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '18px',
                fontWeight: '600',
                color: 'var(--txt)',
                marginBottom: '12px'
              }}>
                Trade Big Claws
              </h3>
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '14px',
                color: 'var(--txt2)',
                lineHeight: 1.7
              }}>
                Buy and sell with confidence. No middlemen, pure ocean P2P trading.
              </p>
            </div>

            {/* Feature 3 */}
            <div style={{ padding: '24px' }}>
              <LobsterIcon type="bubble" size="lg" animation="bubble-up" className="mb-4" />
              <h3 style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '18px',
                fontWeight: '600',
                color: 'var(--txt)',
                marginBottom: '12px'
              }}>
                Collect Bubbles
              </h3>
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '14px',
                color: 'var(--txt2)',
                lineHeight: 1.7
              }}>
                Build your unique collection. Become the ocean legend with rare NFTs.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{
          marginTop: '80px',
          padding: '80px 0',
          textAlign: 'center',
          background: 'linear-gradient(135deg, var(--bg1) 0%, var(--bg2) 100%)',
          border: `1px solid var(--line)`,
          borderRadius: 'var(--r)'
        }}>
          <LobsterIcon type="premium" size="xl" animation="glow" style={{ marginBottom: '32px' }} />
          
          <h2 style={{
            fontFamily: '"EB Garamond", serif',
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: '500',
            color: 'var(--txt)',
            marginBottom: '24px'
          }}>
            Ready to <em>mint</em>?
          </h2>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '16px',
            color: 'var(--txt2)',
            marginBottom: '40px',
            lineHeight: 1.7
          }}>
            Join thousands of collectors in the ocean depths
          </p>
          
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link href="/mint" className="btn btn-gold btn-lg">
              Start Minting
            </Link>
            <Link href="/marketplace" className="btn btn-primary btn-lg">
              Explore Market
            </Link>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer style={{
        padding: '60px 0',
        borderTop: `1px solid var(--line)`,
        marginTop: '80px'
      }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '13px',
            color: 'var(--txt3)',
            marginBottom: '16px'
          }}>
            © 2026 DEFUK. Built on <em>TOKI</em> Network.
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            fontSize: '13px'
          }}>
            <Link href="#" style={{ color: 'var(--txt2)' }}>Twitter</Link>
            <Link href="#" style={{ color: 'var(--txt2)' }}>Discord</Link>
            <Link href="#" style={{ color: 'var(--txt2)' }}>Docs</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
