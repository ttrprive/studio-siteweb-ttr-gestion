"use client";

import { AppFooter } from '@/components/app-footer';
import { MainSidebar } from '@/components/main-sidebar';
import { Sidebar, SidebarInset, SidebarProvider, SidebarRail } from '@/components/ui/sidebar';
import React, { useState, useEffect } from 'react';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <SidebarProvider>
      {isClient && (
        <Sidebar
          collapsible="icon"
          variant="floating"
          side="right"
          className="hidden h-[320px] md:flex"
        >
          <MainSidebar />
          <SidebarRail />
        </Sidebar>
      )}
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">{children}</main>
          <AppFooter />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
