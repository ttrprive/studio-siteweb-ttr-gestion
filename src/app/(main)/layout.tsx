"use client";

import { AppFooter } from '@/components/app-footer';
import { MainSidebar } from '@/components/main-sidebar';
import { Sidebar, SidebarInset, SidebarProvider, SidebarRail } from '@/components/ui/sidebar';
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
        className="h-[320px] z-50"
      >
        <MainSidebar />
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">{children}</main>
          <AppFooter />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
