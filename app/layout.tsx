import '@rainbow-me/rainbowkit/styles.css';
import './globals.css';
import Providers from './providers';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  title: 'DEFUK - Ocean NFT Marketplace',
  description: 'Fresh seafood-quality NFTs. Mint It Fresh, Trade Big Claws, Collect Bubbles.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}