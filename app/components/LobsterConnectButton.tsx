'use client';

import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';

interface LobsterConnectButtonProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export default function LobsterConnectButton({
  className = '',
  size = 'md',
  text = 'CONNECT'
}: LobsterConnectButtonProps) {
  // Size mapping
  const sizeStyles = {
    sm: {
      padding: '10px 20px',
      fontSize: '10px',
      lineHeight: '1',
      letterSpacing: '1px'
    },
    md: {
      padding: '14px 28px',
      fontSize: '12px',
      lineHeight: '1',
      letterSpacing: '2px'
    },
    lg: {
      padding: '18px 36px',
      fontSize: '14px',
      lineHeight: '1',
      letterSpacing: '2px'
    }
  };

  return (
    <div className={`lobster-connect-btn-wrapper ${className}`}>
      <RainbowConnectButton.Custom>
        {({ account, chain, openConnectModal, mounted }) => {
          const connected = mounted && account && chain;

          return (
            <div
              onClick={openConnectModal}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: '700',
                cursor: mounted ? 'pointer' : 'default',
                ...sizeStyles[size],
                background: connected ? '#006994' : '#ff4500',
                color: connected ? '#ffffff' : '#ffffff',
                borderRadius: '0',
                border: `4px solid ${connected ? '#005072' : '#cc3700'}`,
                boxShadow: `4px 4px 0px ${connected ? '#005072' : '#cc3700'}`,
                transition: 'all 0.1s',
                textTransform: 'uppercase',
                letterSpacing: size === 'sm' ? '1px' : '2px',
                minHeight: '42px',
                minWidth: '120px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = connected ? '#40e0d0' : '#ff6b35';
                e.currentTarget.style.boxShadow = `6px 6px 0px ${connected ? '#005072' : '#cc3700'}`;
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = connected ? '#006994' : '#ff4500';
                e.currentTarget.style.boxShadow = `4px 4px 0px ${connected ? '#005072' : '#cc3700'}`;
                e.currentTarget.style.transform = 'translate(0, 0)';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translate(2px, 2px)';
                e.currentTarget.style.boxShadow = `2px 2px 0px ${connected ? '#005072' : '#cc3700'}`;
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
              }}
            >
              {connected ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    background: '#40e0d0',
                    borderRadius: '0'
                  }} />
                  {account.addressSlice ? `${account.addressSlice.slice(0, 4)}...${account.addressSlice.slice(-4)}` : 'CONNECTED'}
                </span>
              ) : (
                <span>{text}</span>
              )}
            </div>
          );
        }}
      </RainbowConnectButton.Custom>
    </div>
  );
}
