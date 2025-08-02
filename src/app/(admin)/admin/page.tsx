
"use client";

import AdminNewsManager from '@/components/admin-news-manager';
import AdminCarouselManager from '@/components/admin-carousel-manager';
import AdminSupportManager from '@/components/admin-support-manager';

export default function AdminPage() {
  
  // Note: La logique d'authentification et de vérification des droits admin
  // devra être ajoutée ici pour sécuriser l'accès à cette page.

  return (
    <main className="container mx-auto px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Panneau d'Administration
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
            Gérez le contenu et les interactions de votre site.
            </p>
        </div>
        
        <div className="flex flex-col gap-8">
            <AdminNewsManager />
            <AdminCarouselManager />
            <AdminSupportManager />
        </div>
      </div>
    </main>
  );
}
