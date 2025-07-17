"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Newspaper, Info, LifeBuoy, Briefcase, User, LogOut, Shield } from "lucide-react";

import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  Sidebar as AppSidebar
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/context/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

const ADMIN_EMAIL = "emapms@gmail.com";

export function MainSidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      <SidebarHeader className="h-14 justify-end p-2 data-[collapsible=icon]:justify-center">
        <SidebarTrigger className="hidden md:flex" />
      </SidebarHeader>
      <SidebarContent className="h-full justify-between">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/")} tooltip={{children: "Accueil", side: "left"}}>
              <Link href="/">
                <Home />
                <span className="group-data-[collapsible=icon]/sidebar-wrapper:hidden">Accueil</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/details")} tooltip={{children: "Détails", side: "left"}}>
              <Link href="/details">
                <Info />
                <span className="group-data-[collapsible=icon]/sidebar-wrapper:hidden">Détails</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/news")} tooltip={{children: "Actualité", side: "left"}}>
              <Link href="/news">
                <Newspaper />
                <span className="group-data-[collapsible=icon]/sidebar-wrapper:hidden">Actualité</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/services")} tooltip={{children: "Services", side: "left"}}>
              <Link href="/services">
                <Briefcase />
                <span className="group-data-[collapsible=icon]/sidebar-wrapper:hidden">Services</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/support")} tooltip={{children: "Support", side: "left"}}>
              <Link href="/support">
                <LifeBuoy />
                <span className="group-data-[collapsible=icon]/sidebar-wrapper:hidden">Support</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarFooter className="data-[collapsible=icon]:items-center flex flex-col gap-2">
          {user && (
            <div className="flex justify-center w-full">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 p-2 rounded-md hover:bg-sidebar-accent">
                    <Avatar className="size-8">
                      <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
                      <AvatarFallback>{user.displayName?.charAt(0) ?? 'U'}</AvatarFallback>
                    </Avatar>
                    <span className="group-data-[collapsible=icon]/sidebar-wrapper:hidden text-sm font-medium">{user.displayName}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="end">
                  <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user.email === ADMIN_EMAIL && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">
                        <Shield className="mr-2 h-4 w-4" />
                        Admin
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          <div className="flex justify-center w-full">
              <ThemeToggle />
          </div>
        </SidebarFooter>
      </SidebarContent>
    </>
  );
}