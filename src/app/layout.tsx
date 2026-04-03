
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { LoaderProvider } from '@/context/loader-context';
import GlobalLoader from '@/components/global-loader';

const siteUrl = 'https://ttrgestion.site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'TTR Gestion (Tech renovation) – Le logiciel GRATUIT n°1 en Afrique',
    template: '%s | TTR GESTION (Tech renovation)',
  },
  description: 'TTR Gestion, la marque TTR signifiant "Tech renovation" (Togo Tech Renove), offre la solution GRATUITE n°1 pour les entrepreneurs africains. Gérez votre boutique, hôtel ou entreprise avec simplicité. Rien à voir avec le transport, 100% Technologie.',
  keywords: ['TTR Gestion', 'Tech renovation', 'Togo Tech Renove', 'Afrique', 'Togo', 'Bénin', 'Côte d’Ivoire', 'logiciel de gestion d’entreprise', 'TTR GROUPE', 'TTR Studio', 'Togo Tech Renove gestion', 'ERP gratuit Afrique', 'CRM gratuit Afrique', 'gestion africaine Technologie', 'Tech Renove Togo'],
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
    title: 'TTR Gestion – Le logiciel GRATUIT pour les entrepreneurs en Afrique',
    description: 'Simplifiez la gestion de votre business partout en Afrique avec TTR Gestion. Comptabilité, stocks et CRM 100% Gratuit.',
    url: siteUrl,
    siteName: 'TTR GESTION Afrique',
    images: [
      {
        url: 'https://res.cloudinary.com/dnnufnxb7/image/upload/v1774108579/logos_ttr_dol0kp.png',
        width: 1200,
        height: 630,
        alt: 'TTR GESTION - Logo officiel',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TTR Gestion Afrique – Gérez votre entreprise gratuitement',
    description: 'La plateforme de référence pour les entreprises au Togo, au Bénin et partout en Afrique. 100% Gratuit.',
    images: ['https://res.cloudinary.com/dnnufnxb7/image/upload/v1774108579/logos_ttr_dol0kp.png'], 
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: 'https://res.cloudinary.com/dnnufnxb7/image/upload/v1774108579/logos_ttr_dol0kp.png',
    apple: 'https://res.cloudinary.com/dnnufnxb7/image/upload/v1774108579/logos_ttr_dol0kp.png',
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
    name: 'TTR Gestion (Tech Renovation)',
    alternateName: ['Togo Tech Renove', 'TTR Tech Renove'],
    description: 'TTR (Tech Renovation) est le leader de la gestion d’entreprise au Togo et en Afrique. Notre plateforme GRATUITE simplifie la transformation numérique des PME sans aucun lien avec les services de transport.',
    url: siteUrl,
    logo: 'https://res.cloudinary.com/dnnufnxb7/image/upload/v1774108579/logos_ttr_dol0kp.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+228 99 97 43 89',
      contactType: 'customer service',
      areaServed: ['TG', 'BJ', 'CI', 'SN', 'BF', 'CM', 'Africa'],
      availableLanguage: ['French']
    },
    hasPart: [
      {
        '@type': 'WebPage',
        name: 'Manuel de formation TTR Gestion',
        url: `${siteUrl}/manual`,
        description: 'Guide complet et manuel d’utilisation pour maîtriser TTR Gestion.'
      },
      {
        '@type': 'WebPage',
        name: 'Programme Ambassadeur TTR Gestion',
        url: 'https://ambassadeur.ttrgestion.site/',
        description: 'Gagnez de l’argent en ligne en devenant ambassadeur officiel de TTR Gestion. Partagez la solution et touchez des commissions sur chaque recommandation.'
      }
    ],
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
