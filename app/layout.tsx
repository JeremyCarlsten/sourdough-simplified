import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sourdough Simplified',
  description: 'A simple tool to help you make sourdough bread with ease.',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          data-website-id="67ffa9ec046e7f0941a90c30"
          data-domain="sourdoughsimplified.net"
          src="https://datafa.st/js/script.js"
        ></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
