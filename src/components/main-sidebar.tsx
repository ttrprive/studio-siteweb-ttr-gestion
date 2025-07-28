"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Newspaper, Info, LifeBuoy, Briefcase } from "lucide-react";

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
import LoaderLink from "./loader-link";

export function MainSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      <SidebarHeader className="h-14 justify-end p-2 data-[collapsible=icon]:justify-center">
        <SidebarTrigger className="hidden md:flex" />
      </SidebarHeader>
      <SidebarContent className="h-full justify-between flex flex-col">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/")} tooltip={{children: "Accueil", side: "left"}}>
              <LoaderLink href="/">
                <Home />
                <span className="group-data-[collapsible=icon]/sidebar-wrapper:hidden">Accueil</span>
              </LoaderLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/details")} tooltip={{children: "Détails", side: "left"}}>
              <LoaderLink href="/details">
                <Info />
                <span className="group-data-[collapsible=icon]/sidebar-wrapper:hidden">Détails</span>
              </LoaderLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/news")} tooltip={{children: "Actualité", side: "left"}}>
              <LoaderLink href="/news">
                <Newspaper />
                <span className="group-data-[collapsible=icon]/sidebar-wrapper:hidden">Actualité</span>
              </LoaderLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/services")} tooltip={{children: "Services", side: "left"}}>
              <LoaderLink href="/services">
                <Briefcase />
                <span className="group-data-[collapsible=icon]/sidebar-wrapper:hidden">Services</span>
              </LoaderLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/support")} tooltip={{children: "Support", side: "left"}}>
              <LoaderLink href="/support">
                <LifeBuoy />
                <span className="group-data-[collapsible=icon]/sidebar-wrapper:hidden">Support</span>
              </LoaderLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarFooter className="data-[collapsible=icon]:items-center flex flex-col gap-2">
          <div className="flex justify-center w-full">
              <ThemeToggle />
          </div>
        </SidebarFooter>
      </SidebarContent>
    </>
  );
}
