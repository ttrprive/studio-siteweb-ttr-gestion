import { getNewsBadgeStatus } from '@/firebase/services';
import MainLayoutClient from '@/components/main-layout-client';
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'TTR Gestion – Logiciel de gestion d’entreprise et hôtellerie',
    template: '%s | TTR Gestion',
  },
  description: 'TTR Gestion est un logiciel tout-en-un pour entreprises et hôtels. Gérez comptabilité, clients et stocks de manière simple et intuitive. Essayez gratuitement.',
};


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
