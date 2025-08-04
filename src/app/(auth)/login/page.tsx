
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthProvider, useAuth } from "@/context/auth-context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function LoginComponent() {
    const { user, loading, signInWithGoogle } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Si l'utilisateur est déjà connecté et que le chargement est terminé, on le redirige.
        if (!loading && user) {
            router.push('/admin');
        }
    }, [user, loading, router]);

    // Note: La logique de connexion par email/mot de passe doit être implémentée
    const handleEmailLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Redirige vers la page admin pour la démo, mais devrait être remplacé par une vraie logique d'authentification
        window.location.href = "/admin"; 
    };
  
    // Affiche un état de chargement ou rien tant qu'on ne sait pas si l'utilisateur est connecté
    if (loading || user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="loading-dots flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-primary"></span>
                    <span className="h-3 w-3 rounded-full bg-primary"></span>
                    <span className="h-3 w-3 rounded-full bg-primary"></span>
                </div>
            </div>
        );
    }
  
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
          <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Connexion</CardTitle>
              <CardDescription>
                Entrez vos identifiants pour accéder à votre espace.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmailLogin} className="grid gap-4">
                 <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@exemple.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Mot de passe</Label>
                     <Link href="#" className="ml-auto inline-block text-sm underline">
                      Mot de passe oublié?
                    </Link>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                    Se connecter
                </Button>
              </form>
               <div className="my-4 flex items-center">
                    <div className="flex-grow border-t border-muted-foreground"></div>
                    <span className="mx-4 flex-shrink text-xs uppercase text-muted-foreground">Ou</span>
                    <div className="flex-grow border-t border-muted-foreground"></div>
                </div>
                <Button variant="outline" className="w-full" onClick={signInWithGoogle}>
                    Se connecter avec Google
                </Button>
            </CardContent>
          </Card>
        </div>
    );
}

export default function LoginPage() {
    return (
        <AuthProvider>
            <LoginComponent />
        </AuthProvider>
    );
}
