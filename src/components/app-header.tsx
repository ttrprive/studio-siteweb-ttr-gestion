
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Newspaper, Info, LifeBuoy, Briefcase, Bot, Menu, X, Sparkles, Compass, LogIn, Gift } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import LoaderLink from "./loader-link";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

const navItems = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/details", label: "Détails", icon: Info },
  { href: "/ia", label: "IA", icon: Bot },
  { href: "/sectors", label: "Découvrir", icon: Compass },
  { href: "/news", label: "Actualité", icon: Newspaper, badge: true },
  { href: "/services", label: "Services", icon: Briefcase, special: true },
  { href: "/support", label: "Support", icon: LifeBuoy },
];

const NavLink = ({ href, label, icon: Icon, isActive, showNewsBadge, isSpecial, onClick, isExternal = false }: any) => {
    const Component = isExternal ? 'a' : LoaderLink;
    return (
        <Component
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            onClick={onClick}
            className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            isActive && "text-primary bg-muted"
            )}
        >
            <div className="relative">
                <Icon className="h-4 w-4" />
                {label === "Actualité" && showNewsBadge && (
                    <Sparkles className="absolute -top-1.5 -right-1.5 size-4 text-yellow-400 fill-yellow-400 animate-scintillate" />
                )}
            </div>
            {label}
            {isSpecial && (
                <Gift className="size-4 text-primary opacity-80" />
            )}
            {label === "Actualité" && showNewsBadge && (
                <Badge variant="destructive" className="text-xs px-1.5 py-0.5 h-auto ml-auto hidden sm:inline-flex">Nouveau</Badge>
            )}
        </Component>
    );
};


export function AppHeader({ showNewsBadge }: { showNewsBadge: boolean }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base mr-4">
          <span className="font-bold">TTR GESTION</span>
        </Link>
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            isActive={pathname === item.href}
            showNewsBadge={item.badge && showNewsBadge}
            isSpecial={item.special}
          />
        ))}
      </nav>

      {/* Mobile Menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
              <span className="font-bold">TTR GESTION</span>
            </Link>
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                isActive={pathname === item.href}
                showNewsBadge={item.badge && showNewsBadge}
                isSpecial={item.special}
                onClick={() => setIsMobileMenuOpen(false)}
              />
            ))}
             <div className="border-t pt-4">
                 <NavLink
                    href="https://app.ttrgestion.site/login"
                    label="Connexion"
                    icon={LogIn}
                    isExternal={true}
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            </div>
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
         <div className="md:hidden">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
                <span className="font-bold">TTR GESTION</span>
            </Link>
        </div>
        <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" asChild>
                <a href="https://app.ttrgestion.site/login" target="_blank" rel="noopener noreferrer">
                    <LogIn className="size-4 mr-2"/>
                    Connexion
                </a>
            </Button>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
