'use client';

import Link from 'next/link';

const footerLinks = {
  Platform: [
    { href: '/marketplace', label: 'Marketplace' },
    { href: '/mint', label: 'Mint NFT' },
    { href: '/collection', label: 'My Collection' },
  ],
  Resources: [
    { href: '#', label: 'Docs' },
    { href: '#', label: 'Support' },
  ],
  Legal: [
    { href: '#', label: 'Terms' },
    { href: '#', label: 'Privacy' },
  ],
};

export default function Footer() {
  return (
    <footer style={{
      padding: '40px 0',
      borderTop: '2px solid #222',
      background: '#111',
      textAlign: 'center'
    }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '30px',
          marginBottom: '30px'
        }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 2' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', marginBottom: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, var(--neon-green), var(--neon-pink))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                🎮
              </div>
              <span className="retro-title" style={{ fontSize: '16px' }}>
                DE<span style={{ color: 'var(--neon-green)' }}>FUK</span>
              </span>
            </Link>
            <p style={{
              fontFamily: 'var(--font-retro)',
              fontSize: '18px',
              color: 'var(--text-muted)'
            }}>
              Create, collect & trade NFTs on Base.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '10px',
                color: 'var(--text-muted)',
                marginBottom: '12px',
                textTransform: 'uppercase'
              }}>
                {title}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {links.map((link) => (
                  <li key={link.href + link.label} style={{ marginBottom: '8px' }}>
                    <Link 
                      href={link.href}
                      style={{
                        fontFamily: 'var(--font-retro)',
                        fontSize: '16px',
                        color: 'var(--text-primary)',
                        transition: 'color 0.2s'
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{
          paddingTop: '20px',
          borderTop: '2px solid #222',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}>
          <p style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '8px',
            color: '#444'
          }}>
            © {new Date().getFullYear()} DEFUK NFT MARKETPLACE. ALL RIGHTS RESERVED.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ color: 'var(--neon-green)', fontSize: '12px' }}>BUILT ON BASE</span>
            <span style={{ color: 'var(--neon-pink)', fontSize: '12px' }}>POWERED BY YOU</span>
          </div>
        </div>
      </div>
    </footer>
  );
}