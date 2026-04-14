import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";

export function generateMetadata({ params }: { params: { slug?: string } }) {
  const slug = params?.slug as string || '';
  const titles: Record<string, string> = {
    '': 'JobBoard - Find Your Dream Job',
    'jobs': 'Browse Jobs - JobBoard',
    'jobs/create': 'Post a Job - JobBoard',
    'login': 'Sign In - JobBoard',
    'register': 'Sign Up - JobBoard',
  };

  return {
    title: titles[slug] || 'JobBoard',
    description: 'Find the best job opportunities. Browse thousands of job listings from top companies.',
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
