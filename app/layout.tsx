import './globals.css';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';

export const metadata: Metadata = {
  title: 'Peaceful Life Index',
  description: 'Peaceful Life Index based on The Happiness Blueprint: The 10 Golden Rules.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main className="container-shell py-10">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
