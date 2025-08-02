import React from 'react';
import { Button } from '@/components/ui/button';
import LoaderLink from '@/components/loader-link';
import { LogOut, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-lg">TTR Gestion</div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" size="sm" asChild>
              <LoaderLink href="/">
                <ArrowLeft className="mr-2 size-4" />
                Retourner au site
              </LoaderLink>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="#">
                 <LogOut className="mr-2 size-4" />
                 Déconnexion
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-grow">{children}</main>
    </div>
  );
}
