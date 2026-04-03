"use client";

import React from 'react';
import { AppFooter } from '@/components/app-footer';
import NewsTicker from './news-ticker';
import { getNews } from '@/firebase/services';
import type { NewsItem } from '@/types/news';
import { AppHeader } from './app-header';
import ShareholderCta from './shareholder-cta';
import { Marquee, WhatsAppIcon } from './marquee';
import { AmbassadorModal } from './ambassador-modal';

export default function MainLayoutClient({
  children,
  showNewsBadge,
}: Readonly<{
  children: React.ReactNode;
  showNewsBadge: boolean;
}>) {
  const [latestNews, setLatestNews] = React.useState<NewsItem[]>([]);

  React.useEffect(() => {
    if (showNewsBadge) {
      const fetchNews = async () => {
        const newsItems = await getNews(5); // Fetch latest 5 news items
        setLatestNews(newsItems);
      };
      fetchNews();
    }
  }, [showNewsBadge]);

  return (
    <>
      <AmbassadorModal />
      <AppHeader showNewsBadge={showNewsBadge} />
      <Marquee />
      <div className="w-full bg-blue-600/10 dark:bg-blue-400/10 py-1.5 flex justify-center items-center gap-2 border-b border-blue-200 dark:border-blue-900 shadow-sm">
        <a 
          href="https://wa.me/22899974389" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="text-blue-600 dark:text-blue-400">
            <WhatsAppIcon />
          </div>
          <span className="text-sm font-bold text-blue-700 dark:text-blue-300">Contactez-nous : +228 99 97 43 89</span>
        </a>
      </div>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">{children}</main>
        <AppFooter />
      </div>
      <ShareholderCta />
      {showNewsBadge && latestNews.length > 0 && <NewsTicker newsItems={latestNews} />}
    </>
  );
}
