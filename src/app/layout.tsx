import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/context/auth-context';
import { LoaderProvider } from '@/context/loader-context';
import GlobalLoader from '@/components/global-loader';

export const metadata: Metadata = {
  title: {
    default: 'TTR GESTION - La nouvelle ère de la gestion d’entreprise',
    template: '%s | TTR GESTION',
  },
  description: 'TTR GESTION est une application tout-en-un pour simplifier la gestion de votre entreprise : finances, clients, stocks, et plus encore. Adapté à tous les secteurs.',
  keywords: ['gestion entreprise', 'logiciel de gestion', 'facturation', 'trésorerie', 'gestion de stock', 'ERP', 'CRM', 'auto-entrepreneur', 'TPE', 'PME'],
  authors: [{ name: 'TTR GESTION' }],
  creator: 'TTR GESTION',
  publisher: 'TTR GESTION',
  robots: 'index, follow',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
  openGraph: {
    title: 'TTR GESTION - La nouvelle ère de la gestion d’entreprise',
    description: 'Simplifiez la gestion de votre entreprise avec notre outil tout-en-un.',
    url: 'https://ttrgestion.app', // Replace with your actual domain
    siteName: 'TTR GESTION',
    images: [
      {
        url: 'https://ttrgestion.app/og-image.png', // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: 'TTR GESTION - Gestion d’entreprise simplifiée',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <AuthProvider>
          <LoaderProvider>
            <GlobalLoader />
            {children}
            <Toaster />
          </LoaderProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
