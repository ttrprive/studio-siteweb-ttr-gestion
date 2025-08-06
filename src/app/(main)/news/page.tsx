import type { Metadata } from 'next';
import NewsClientPage from '@/components/news-client-page';

export const metadata: Metadata = {
  title: 'Actualités et Mises à Jour',
  description: 'Suivez les dernières nouveautés, améliorations et annonces concernant TTR Gestion. Restez informé des évolutions de votre outil de gestion.',
};

export default function NewsPage() {
  return (
    <main className="w-full">
      <NewsClientPage />
    </main>
  );
}
