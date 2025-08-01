
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

export default function LoginPage() {
  // TODO: Remplacez les href par les liens que vous souhaitez
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
          <div className="grid gap-4">
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
            <Button asChild className="w-full">
              <Link href="#">Se connecter</Link>
            </Button>
             <Button variant="outline" className="w-full" asChild>
                <Link href="#">Se connecter avec une autre méthode</Link>
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Vous n'avez pas de compte?{" "}
            <Link href="#" className="underline">
              S'inscrire
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
