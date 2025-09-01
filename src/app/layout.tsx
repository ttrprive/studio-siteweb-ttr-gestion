
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { LoaderProvider } from '@/context/loader-context';
import GlobalLoader from '@/components/global-loader';

const siteUrl = 'https://ttrgestion.site';

export const metadata: Metadata = {
  title: {
    default: 'TTR Gestion – Plateforme de gestion d’entreprise et hôtellerie',
    template: '%s | TTR GESTION',
  },
  description: 'TTR Gestion est une solution complète pour gérer les entreprises, hôtels, abonnements et comptabilité. Accessible, intuitive et puissante. Essayez gratuitement.',
  keywords: ['TTR Gestion', 'ttrgestion.site', 'logiciel de gestion', 'application hôtelière', 'comptabilité', 'gestion d’entreprise', 'CRM', 'ERP', 'France', 'SaaS', 'abonnement', 'plateforme de gestion', 'facturation', 'gestion de stock', 'auto-entrepreneur', 'TPE', 'PME', 'restauration', 'BTP', 'santé', 'commerce de détail', 'freelance', 'consultant', 'gestion financière', 'tableau de bord', 'assistant IA', 'TRIX Business', 'Gemini', 'Copilot', 'ChatGPT', 'alternative logiciel gestion'],
  authors: [{ name: 'TTR GESTION', url: siteUrl }],
  creator: 'TTR GESTION',
  publisher: 'TTR GESTION',
  robots: 'index, follow',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  // IMPORTANT: Ajoutez votre code de vérification Google ici pour que Google puisse indexer votre site.
  // Remplacez "VOTRE_CODE_DE_VERIFICATION_GOOGLE" par la valeur fournie par Google Search Console.
  verification: {
    google: 'VOTRE_CODE_DE_VERIFICATION_GOOGLE',
  },
  openGraph: {
    title: 'TTR Gestion – Gérez votre entreprise avec efficacité',
    description: 'Plateforme intuitive pour la gestion hôtelière, comptable et commerciale. Essayez gratuitement dès maintenant.',
    url: siteUrl,
    siteName: 'TTR GESTION',
    images: [
      {
        url: '/og-image.jpg', // L'image doit être dans le dossier public
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
    '@type': 'SoftwareApplication',
    name: 'TTR Gestion',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      description: 'Essai gratuit disponible pour tester toutes les fonctionnalités.',
    },
    creator: {
      '@type': 'Organization',
      name: 'TTR Gestion',
      url: siteUrl,
      logo: `${siteUrl}/favicon.png`
    },
    description: "TTR Gestion est une application web complète pour gérer les entreprises, les hôtels, les abonnements et la comptabilité. Accessible à tous, sans installation.",
    keywords: "TTR Gestion, ttrgestion.site, logiciel de gestion, application hôtelière, comptabilité, gestion d’entreprise, CRM, ERP, plateforme SaaS, abonnement, facturation, TPE, PME",
  };

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
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
