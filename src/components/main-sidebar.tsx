
"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Home, Newspaper, Info, LifeBuoy, Briefcase, Bot, Sparkles } from "lucide-react";

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
import LoaderLink from "./loader-link";
import { getLatestNews } from "@/firebase/services";
import { Badge } from "./ui/badge";

export function MainSidebar() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const [showNewsBadge, setShowNewsBadge] = useState(false);

  useEffect(() => {
    const checkLatestNews = async () => {
      const latestNews = await getLatestNews();
      if (latestNews) {
        const newsDate = new Date(latestNews.date);
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        if (newsDate > sevenDaysAgo) {
          setShowNewsBadge(true);
        }
      }
    };
    checkLatestNews();
  }, []);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleLinkClick = () => {
    setOpenMobile(false);
  };

  return (
    <>
      <SidebarHeader className="h-14 justify-end p-2 data-[collapsible=icon]:justify-center">
        <SidebarTrigger className="hidden md:flex" />
      </SidebarHeader>
      <SidebarContent className="flex-grow">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/")} tooltip={{children: "Accueil", side: "left"}}>
              <LoaderLink href="/" onClick={handleLinkClick}>
                <Home />
                <span className="group-data-[collapsible=icon]/sidebar-wrapper:hidden">Accueil</span>
              </LoaderLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/details")} tooltip={{children: "Détails", side: "left"}}>
              <LoaderLink href="/details" onClick={handleLinkClick}>
                <Info />
                <span className="group-data-[collapsible=icon]/sidebar-wrapper:hidden">Détails</span>
              </LoaderLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/ia")} tooltip={{children: "IA", side: "left"}}>
              <LoaderLink href="/ia" onClick={handleLinkClick}>
                <Bot />
                <span className="group-data-[collapsible=icon]/sidebar-wrapper:hidden">IA</span>
              </LoaderLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/news")} tooltip={{children: "Actualité", side: "left"}}>
              <LoaderLink href="/news" onClick={handleLinkClick} className="relative flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <Newspaper />
                  <span className="group-data-[collapsible=icon]/sidebar-wrapper:hidden">Actualité</span>
                </div>
                 {showNewsBadge && (
                    <>
                      <Badge variant="destructive" className="group-data-[collapsible=icon]/sidebar-wrapper:hidden text-xs px-1.5 py-0.5 h-auto">Nouveau</Badge>
                      <Sparkles className="absolute top-0 right-0 size-3 hidden group-data-[collapsible=icon]/sidebar-wrapper:block text-destructive animate-scintillate" />
                    </>
                )}
              </LoaderLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/services")} tooltip={{children: "Services", side: "left"}}>
              <LoaderLink href="/services" onClick={handleLinkClick}>
                <Briefcase />
                <span className="group-data-[collapsible=icon]/sidebar-wrapper:hidden">Services</span>
              </LoaderLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/support")} tooltip={{children: "Support", side: "left"}}>
              <LoaderLink href="/support" onClick={handleLinkClick}>
                <LifeBuoy />
                <span className="group-data-[collapsible=icon]/sidebar-wrapper:hidden">Support</span>
              </LoaderLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
       <SidebarFooter className="data-[collapsible=icon]:items-center flex flex-col gap-2">
          <div className="flex justify-center w-full">
            <ThemeToggle />
          </div>
        </SidebarFooter>
    </>
  );
}
