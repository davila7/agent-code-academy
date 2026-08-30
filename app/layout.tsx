import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Agent Code Academy',
  description: 'Technical learning paths for Claude Code, Codex, Cursor, GitHub Copilot, Antigravity and Pi.',
  openGraph: {
    title: 'Agent Code Academy',
    description: 'Technical paths for coding agents',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Agent Code Academy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent Code Academy',
    description: 'Technical paths for coding agents',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
