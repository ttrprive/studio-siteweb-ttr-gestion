"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function AdminPage() {
  
  // La logique d'authentification a été retirée. 
  // Cette page est actuellement accessible publiquement.
  // Il faudra mettre en place une nouvelle méthode de protection si nécessaire.

  return (
    <main className="container mx-auto px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-4">
          Panneau d'Administration
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          Bienvenue. Gérez le contenu de votre site ici.
        </p>
        
        <div className="grid gap-8 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Gérer les actualités</CardTitle>
                    <CardDescription>Ajoutez, modifiez ou supprimez des actualités.</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Le contenu pour la gestion des actualités viendra ici */}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Gérer les images</CardTitle>
                    <CardDescription>Mettez à jour les photos du site.</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Le contenu pour la gestion des images viendra ici */}
                </CardContent>
            </Card>
        </div>
      </div>
    </main>
  );
}
