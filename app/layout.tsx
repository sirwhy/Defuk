import '@rainbow-me/rainbowkit/styles.css';
import './globals.css';
import { Inter, EB_Garamond, JetBrains_Mono, Press_Start_2P } from 'next/font/google';
import Providers from './providers';
import Header from './components/Header';
import Footer from './components/Footer';


// FarmCats fonts
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-farm-sans',
});

const ebGaramond = EB_Garamond({ 
  subsets: ['latin'],
  variable: '--font-farm-serif',
  weight: ['400', '500', '600', '700', '800'],
});

const jetBrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-farm-mono',
});

const pressStart2P = Press_Start_2P({ 
  subsets: ['latin'],
});

export const metadata = {
  title: 'DEFUK - Lobster NFT Marketplace',
  description: 'Fresh seafood-quality NFTs. FarmCats-inspired design.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ebGaramond.variable} ${jetBrainsMono.variable} font-sans`}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
