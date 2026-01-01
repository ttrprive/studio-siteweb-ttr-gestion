
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { LoaderProvider } from '@/context/loader-context';
import GlobalLoader from '@/components/global-loader';

const siteUrl = 'https://ttrgestion.site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'TTR Gestion – Logiciel de gestion d’entreprise et hôtellerie',
    template: '%s | TTR GESTION',
  },
  description: 'TTR Gestion est un logiciel tout-en-un pour entreprises et hôtels. Gérez comptabilité, clients et stocks de manière simple et intuitive. Essayez gratuitement.',
  keywords: ['TTR Gestion', 'TTR Studio', 'Togo Tech Renove', 'TTR GROUPE', 'ttrgestion.site', 'logiciel de gestion', 'application hôtelière', 'comptabilité', 'gestion d’entreprise', 'CRM', 'ERP', 'France', 'SaaS', 'abonnement', 'plateforme de gestion', 'facturation', 'gestion de stock', 'auto-entrepreneur', 'TPE', 'PME', 'restauration', 'BTP', 'santé', 'commerce de détail', 'freelance', 'consultant', 'gestion financière', 'tableau de bord', 'assistant IA', 'TRIX Business', 'Gemini', 'Copilot', 'ChatGPT', 'alternative logiciel gestion'],
  authors: [{ name: 'TTR GESTION', url: siteUrl }],
  creator: 'TTR Studio',
  publisher: 'TTR GESTION',
  robots: 'index, follow',
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'eRqixi-mnh7fV3kHRdtBlGZ5JkHNdRqXihCerbs6j-g',
  },
  openGraph: {
    title: 'TTR Gestion – Gérez votre entreprise avec efficacité',
    description: 'Plateforme intuitive pour la gestion hôtelière, comptable et commerciale. Essayez gratuitement dès maintenant.',
    url: siteUrl,
    siteName: 'TTR GESTION',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`, // L'image doit être dans le dossier public
        width: 1200,
        height: 630,
        alt: 'TTR GESTION - Gestion d’entreprise simplifiée',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TTR Gestion – Plateforme de gestion tout-en-un',
    description: 'Gérez vos hôtels, abonnements et comptabilité avec TTR Gestion. Simple, rapide, efficace.',
    images: [`${siteUrl}/twitter-card.jpg`], 
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TTR Gestion',
    alternateName: 'Togo Tech Renove',
    description: 'TTR Gestion (Togo Tech Renove) est une filiale de TTR GROUPE, offrant une solution complète pour la gestion d’entreprise, la comptabilité et la gestion hôtelière.',
    url: siteUrl,
    logo: `${siteUrl}/favicon.png`,
    sameAs: [
      "https://www.youtube.com/@ttrgestion",
      "https://x.com/ttrgestion",
      "https://www.facebook.com/profile.php?id=61578837105446"
    ]
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string',
    },
  };


  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="eRqixi-mnh7fV3kHRdtBlGZ5JkHNdRqXihCerbs6j-g" />
        <meta name="google-site-verification" content="djLBD9J-mg8N9y3C-8aHUwtPCWAQBQkRzAy4vTGb1Ss" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@700;800;900&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <LoaderProvider>
          <GlobalLoader />
          {children}
          <Toaster />
        </LoaderProvider>
      </body>
    </html>
  );
}
