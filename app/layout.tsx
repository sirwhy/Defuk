import '@rainbow-me/rainbowkit/styles.css';
import './globals.css';
import Providers from './providers';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  title: 'NFTCreate - Mint & Trade NFTs',
  description: 'Create, collect, and trade unique digital assets',
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