
import { getNewsBadgeStatus } from '@/firebase/services';
import MainLayoutClient from '@/components/main-layout-client';
import React from 'react';

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
