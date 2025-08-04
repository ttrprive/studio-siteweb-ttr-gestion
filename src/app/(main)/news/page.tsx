import type { Metadata } from 'next';
import NewsClientPage from '@/components/news-client-page';
import { getNews } from '@/firebase/services';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Actualités et Mises à Jour',
  description: 'Suivez les dernières nouveautés, améliorations et annonces concernant TTR Gestion. Restez informé des évolutions de votre outil de gestion.',
};

export default async function NewsPage() {
  const newsItems = await getNews();

  return (
    <main className="w-full">
      <NewsClientPage initialNews={newsItems} />
    </main>
  );
}
