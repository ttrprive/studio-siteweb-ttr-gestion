"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Newspaper, Info, LifeBuoy } from "lucide-react";

import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";

export function MainSidebar() {
  const pathname = usePathname();
  const { setOpen } = useSidebar();

  React.useEffect(() => {
    setOpen(false);
  }, [setOpen]);

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      <SidebarHeader className="h-14 justify-between px-3 data-[collapsible=icon]:justify-center">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="font-bold text-lg text-foreground group-data-[collapsible=icon]/sidebar-wrapper:hidden">TTR GESTION</span>
        </div>
        <SidebarTrigger className="hidden md:flex" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/")} tooltip="Accueil">
              <Link href="/">
                <Home />
                <span className="group-data-[collapsible=icon]/sidebar-wrapper:hidden">Accueil</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/details")} tooltip="Détails">
              <Link href="/details">
                <Info />
                <span className="group-data-[collapsible=icon]/sidebar-wrapper:hidden">Détails</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/news")} tooltip="Actualité">
              <Link href="/news">
                <Newspaper />
                <span className="group-data-[collapsible=icon]/sidebar-wrapper:hidden">Actualité</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/support")} tooltip="Support">
              <Link href="/support">
                <LifeBuoy />
                <span className="group-data-[collapsible=icon]/sidebar-wrapper:hidden">Support</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="data-[collapsible=icon]:items-center">
        <ThemeToggle />
      </SidebarFooter>
    </>
  );
}
