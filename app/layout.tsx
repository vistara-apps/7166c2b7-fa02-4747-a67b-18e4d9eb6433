import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KnowYourRights AI',
  description: 'Instant legal guidance in your pocket',
  keywords: ['legal rights', 'AI guidance', 'state laws', 'legal help'],
  authors: [{ name: 'KnowYourRights AI Team' }],
  openGraph: {
    title: 'KnowYourRights AI',
    description: 'Instant legal guidance in your pocket',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KnowYourRights AI',
    description: 'Instant legal guidance in your pocket',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
