
"use client";

import React from 'react';
import { AppFooter } from '@/components/app-footer';
import { MainSidebar } from '@/components/main-sidebar';
import { Sidebar, SidebarInset, SidebarProvider, SidebarRail, SidebarTrigger, Sheet, SheetContent } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import NewsTicker from './news-ticker';
import { getNews } from '@/firebase/services';
import type { NewsItem } from '@/types/news';

export default function MainLayoutClient({
  children,
  showNewsBadge,
}: Readonly<{
  children: React.ReactNode;
  showNewsBadge: boolean;
}>) {
  const isMobile = useIsMobile();
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
    <SidebarProvider>
        {isMobile ? (
          <Sheet>
            <Sidebar>
                <SheetContent side="right" className="p-0 w-[280px]">
                    <MainSidebar showNewsBadge={showNewsBadge} />
                </SheetContent>
            </Sidebar>
          </Sheet>
        ) : (
            <Sidebar
                collapsible="icon"
                variant="floating"
                side="right"
                className="h-[420px] z-50"
            >
                <MainSidebar showNewsBadge={showNewsBadge} />
                <SidebarRail />
            </Sidebar>
        )}

      <SidebarInset>
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm md:hidden">
          <span className="font-bold">TTR GESTION</span>
          <SidebarTrigger />
        </header>

        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">{children}</main>
          <AppFooter />
        </div>
        {showNewsBadge && latestNews.length > 0 && <NewsTicker newsItems={latestNews} />}
      </SidebarInset>
    </SidebarProvider>
  );
}
