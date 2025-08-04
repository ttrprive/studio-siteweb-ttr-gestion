
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

function RegisterComponent() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            router.push('/admin');
        }
    }, [user, loading, router]);
    
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
    
    // TODO: Remplacez les href par les liens que vous souhaitez
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">S'inscrire</CardTitle>
          <CardDescription>
            Créez votre compte pour commencer.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">Prénom</Label>
                <Input id="first-name" placeholder="Max" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Nom</Label>
                <Input id="last-name" placeholder="Robinson" required />
              </div>
            </div>
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
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" />
            </div>
            <Button asChild className="w-full">
                <Link href="#">Créer un compte</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
                <Link href="#">S'inscrire avec une autre méthode</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


export default function RegisterPage() {
    return (
        <AuthProvider>
            <RegisterComponent />
        </AuthProvider>
    );
}
