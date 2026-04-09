'use client';

import * as React from 'react';
import { PrivyProvider } from '@privy-io/react-auth';
import { PrivyWagmiConnector } from '@privy-io/wagmi-connector';
import { base, baseSepolia } from 'wagmi/chains';
import { http, createConfig } from 'viem';

const wagmiConfig = createConfig({
  chains: [base, baseSepolia],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});

const privyConfig = {
  // Replace with your Privy App ID from https://dashboard.privy.io
  // Get your free app ID at https://privy.io
  appId: process.env.NEXT_PUBLIC_PRIVY_APP_ID || 'YOUR_PRIVY_APP_ID',
  appearance: {
    theme: 'dark',
    accentColor: '#8b5cf6',
    logo: 'https://your-logo-url.com/logo.png',
  },
  embeddedWallets: {
    createOnLogin: 'all-users',
  },
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      config={privyConfig}
    >
      <PrivyWagmiConnector wagmiConfig={wagmiConfig}>
        {children}
      </PrivyWagmiConnector>
    </PrivyProvider>
  );
}