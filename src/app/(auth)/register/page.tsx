
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const countries = [
    // Afrique
    { value: "DZ", label: "Algérie" },
    { value: "BJ", label: "Bénin" },
    { value: "BF", label: "Burkina Faso" },
    { value: "CM", label: "Cameroun" },
    { value: "CD", label: "Congo (RDC)" },
    { value: "CG", label: "Congo (Brazzaville)" },
    { value: "CI", label: "Côte d'Ivoire" },
    { value: "GA", label: "Gabon" },
    { value: "GN", label: "Guinée" },
    { value: "MG", label: "Madagascar" },
    { value: "ML", label: "Mali" },
    { value: "MA", label: "Maroc" },
    { value: "NE", label: "Niger" },
    { value: "SN", label: "Sénégal" },
    { value: "TD", label: "Tchad" },
    { value: "TG", label: "Togo" },
    { value: "TN", label: "Tunisie" },
    // Europe
    { value: "DE", label: "Allemagne" },
    { value: "BE", label: "Belgique" },
    { value: "ES", label: "Espagne" },
    { value: "FR", label: "France" },
    { value: "IT", label: "Italie" },
    { value: "LU", label: "Luxembourg" },
    { value: "PT", label: "Portugal" },
    { value: "GB", label: "Royaume-Uni" },
    { value: "CH", label: "Suisse" },
    // Amérique
    { value: "CA", label: "Canada" },
    { value: "US", label: "États-Unis" },
    // Reste du monde
    { value: "CN", label: "Chine" },
    { value: "AE", label: "Émirats Arabes Unis" },
    { value: "OTHER", label: "Autre" }
];


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
                <Label htmlFor="country">Pays</Label>
                <Select>
                    <SelectTrigger id="country">
                        <SelectValue placeholder="Sélectionnez votre pays" />
                    </SelectTrigger>
                    <SelectContent>
                        {countries.map((country) => (
                            <SelectItem key={country.value} value={country.value}>
                                {country.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
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
