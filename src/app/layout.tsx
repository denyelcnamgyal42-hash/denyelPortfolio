import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Denyel Chokey Namgyal — AI & Machine Learning Developer',
  description:
    'Portfolio of Denyel Chokey Namgyal, a Computer Science student building projects in artificial intelligence, machine learning, NLP, computer vision and cybersecurity.',
  openGraph: {
    title: 'DENYEL — DIGITAL LAB',
    description: 'Building intelligent systems. Exploring secure ones.',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'DENYEL — DIGITAL LAB' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
