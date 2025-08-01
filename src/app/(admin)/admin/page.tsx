"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AdminPage() {
  
  // Note: La logique d'authentification et de vérification des droits admin
  // devra être ajoutée ici pour sécuriser l'accès à cette page.

  return (
    <main className="container mx-auto px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Panneau d'Administration
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
            Gérez le contenu et les interactions de votre site.
            </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle>Gérer les Actualités</CardTitle>
                    <CardDescription>Ajoutez, modifiez ou supprimez les actualités du site.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                   {/* Le contenu pour la gestion des actualités viendra ici */}
                   <p className="text-sm text-muted-foreground">Prochainement : Affichez la liste des actualités et ajoutez-en de nouvelles.</p>
                </CardContent>
                <div className="p-6 pt-0">
                    <Button className="w-full" disabled>Ajouter une actualité</Button>
                </div>
            </Card>
            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle>Gérer le Carrousel</CardTitle>
                    <CardDescription>Mettez à jour les images et vidéos promotionnelles.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                   {/* Le contenu pour la gestion du carrousel viendra ici */}
                    <p className="text-sm text-muted-foreground">Prochainement : Gérez les diapositives du carrousel de la page d'accueil.</p>
                </CardContent>
                 <div className="p-6 pt-0">
                    <Button className="w-full" disabled>Modifier le carrousel</Button>
                </div>
            </Card>
            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle>Messagerie de Support</CardTitle>
                    <CardDescription>Consultez les messages envoyés depuis le site.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    {/* Le contenu pour la messagerie viendra ici */}
                    <p className="text-sm text-muted-foreground">Prochainement : Visualisez les demandes de contact et les questions des utilisateurs.</p>
                </CardContent>
                 <div className="p-6 pt-0">
                    <Button className="w-full" disabled>Voir les messages</Button>
                </div>
            </Card>
        </div>
      </div>
    </main>
  );
}
