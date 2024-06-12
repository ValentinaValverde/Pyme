import { ClerkProvider } from '@clerk/nextjs';
import Providers from './providers';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './styling/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pyme',
  description: 'A multi-vendor e-commerce platform for small businesses',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body className={inter.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
