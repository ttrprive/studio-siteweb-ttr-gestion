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
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";

const LogoSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 141.75 141.75" className="size-8 text-foreground shrink-0">
        <g fill="currentColor">
            <path d="M45,45h13.6v56.4H45V45z"/>
            <path d="M63.9,45h13.6v56.4H63.9V45z"/>
            <path d="M45,34.5h13.6v10.7H45V34.5z"/>
            <path d="M38.9,57.1h44.5v11.1H38.9V57.1z"/>
            <path d="M63.9,34.5h13.6v10.7H63.9V34.5z"/>
        </g>
        <g fill="hsl(var(--primary))">
            <path d="M83.4,70.8h13.6v30.5H83.4V70.8z"/>
            <path d="M95.4,57.1h13.6v11.1H95.4V57.1z"/>
            <path d="M83.4,57.1h13.6v15H83.4V57.1z"/>
        </g>
    </svg>
);


export function MainSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      <SidebarHeader className="h-14 justify-between px-3 data-[collapsible=icon]:justify-center">
        <div className="flex items-center gap-2 overflow-hidden">
          <LogoSvg />
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
