
"use client";

import { AppFooter } from '@/components/app-footer';
import { MainSidebar } from '@/components/main-sidebar';
import { Sidebar, SidebarInset, SidebarProvider, SidebarRail, SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <Sidebar
        collapsible="icon"
        variant="floating"
        side="right"
        className="h-[420px] z-50"
      >
        <MainSidebar />
        <SidebarRail />
      </Sidebar>
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
      </SidebarInset>
    </SidebarProvider>
  );
}
