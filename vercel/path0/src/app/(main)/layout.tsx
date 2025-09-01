
import { getNewsBadgeStatus } from '@/firebase/services';
import MainLayoutClient from '@/components/main-layout-client';
import React from 'react';
import type { Metadata, ResolvingMetadata } from 'next';

// Définition des métadonnées par défaut
const defaultMetadata = {
  title: {
    default: 'TTR Gestion – Plateforme de gestion d’entreprise et hôtellerie',
    template: '%s | TTR GESTION',
  },
  description: 'TTR Gestion (Togo Tech Renove) est une solution complète pour gérer les entreprises, hôtels, abonnements et comptabilité. Créée par TTR Studio, elle est accessible, intuitive et puissante. Essayez gratuitement.',
};

// Map des métadonnées spécifiques à chaque page
const pageMetadata: { [key: string]: Metadata } = {
  '/support': {
    title: 'Support & Aide | TTR GESTION',
    description: "Besoin d'aide ou une question ? Consultez notre FAQ ou contactez notre équipe. Nous sommes là pour vous aider.",
  },
  // Ajoutez d'autres pages ici au besoin
};

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Récupérer les métadonnées parentes
  const parentMetadata = await parent;
  const pathname = (parentMetadata.alternates?.canonical ?? '/').toString();
  
  // Obtenir les métadonnées spécifiques à la page actuelle
  const specificMetadata = pageMetadata[pathname] || {};

  // Fusionner les métadonnées
  return {
    ...defaultMetadata,
    ...specificMetadata,
    title: specificMetadata.title ?? defaultMetadata.title,
    description: specificMetadata.description ?? defaultMetadata.description,
  };
}


export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const showNewsBadge = await getNewsBadgeStatus();

  return (
    <MainLayoutClient showNewsBadge={showNewsBadge}>
      {children}
    </MainLayoutClient>
  );
}
