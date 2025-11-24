"use client";

import React from 'react';
import { AppFooter } from '@/components/app-footer';
import NewsTicker from './news-ticker';
import { getNews } from '@/firebase/services';
import type { NewsItem } from '@/types/news';
import { AppHeader } from './app-header';
import ShareholderCta from './shareholder-cta';
import { Marquee } from './marquee';

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
      <AppHeader showNewsBadge={showNewsBadge} />
      <Marquee />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">{children}</main>
        <AppFooter />
      </div>
      <ShareholderCta />
      {showNewsBadge && latestNews.length > 0 && <NewsTicker newsItems={latestNews} />}
    </>
  );
}
