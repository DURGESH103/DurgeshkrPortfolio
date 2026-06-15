import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import { siteConfig } from '@/data/config';

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [
    'Durgesh Kumar', 'Full Stack Developer', 'Software Engineer', 'Portfolio',
    'React Developer', 'Next.js', 'Computer Science', 'Web Developer India',
  ],
  authors: [{ name: 'Durgesh Kumar', url: siteConfig.url }],
  creator: 'Durgesh Kumar',
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: 'Durgesh Kumar Portfolio',
    images: [{ url: `${siteConfig.url}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og-image.png`],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
