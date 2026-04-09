'use client';

import Link from 'next/link';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const features = [
  {
    icon: '🎨',
    title: 'Easy Minting',
    description: 'Upload your artwork and mint NFTs in seconds with our simple interface.'
  },
  {
    icon: '🛒',
    title: 'Instant Trading',
    description: 'Buy and sell NFTs instantly at fixed prices with secure transactions.'
  },
  {
    icon: '🔒',
    title: 'Secure',
    description: 'Smart contracts ensure safe and transparent transactions.'
  },
  {
    icon: '⚡',
    title: 'Low Fees',
    description: 'Built on Base network for minimal gas fees.'
  },
];

const stats = [
  { value: '10K+', label: 'NFTs Listed' },
  { value: '5K+', label: 'Active Users' },
  { value: '50K+', label: 'Transactions' },
];

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#8b5cf6]/20 blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#ec4899]/15 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center stagger-children">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.1] mb-8">
              <span className="w-2 h-2 rounded-full bg-[#8b5cf6] animate-pulse" />
              <span className="text-sm text-[rgba(248,250,252,0.7)]">Powered by Base Network</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              Create & Trade
              <br />
              <span className="gradient-text">Digital Assets</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-[rgba(248,250,252,0.6)] max-w-2xl mx-auto mb-10 leading-relaxed">
              The next-generation NFT marketplace. Mint your own NFTs, discover unique digital art, 
              and trade with confidence on a secure platform.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              {isConnected ? (
                <>
                  <Link href="/mint" className="btn btn-primary text-lg px-8 py-4">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Mint NFT
                  </Link>
                  <Link href="/marketplace" className="btn btn-ghost text-lg px-8 py-4">
                    Explore Marketplace
                  </Link>
                </>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <ConnectButton />
                  <p className="text-[rgba(248,250,252,0.4)] text-sm">Connect wallet to get started</p>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 md:gap-16">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-sm text-[rgba(248,250,252,0.4)]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#0a0a0f]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-[rgba(248,250,252,0.5)] max-w-xl mx-auto">
              A complete platform for creating and trading digital collectibles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div 
                key={i}
                className="glass-card p-6 group hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-[rgba(248,250,252,0.5)] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8b5cf6]/5 to-transparent" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center glass-card p-12 lg:p-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Ready to Start?
            </h2>
            <p className="text-[rgba(248,250,252,0.5)] mb-8 max-w-lg mx-auto">
              Join thousands of creators and collectors. 
              Your digital assets await.
            </p>
            {isConnected ? (
              <Link href="/mint" className="btn btn-primary text-lg px-10 py-4">
                Start Creating
              </Link>
            ) : (
              <ConnectButton />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}