
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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";


function LoginComponent() {
    const { user, loading, signInWithGoogle, signInWithEmail } = useAuth();
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!loading && user) {
            router.push('/admin');
        }
    }, [user, loading, router]);

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        
        try {
            await signInWithEmail(email, password);
        } catch (err) {
            if (err instanceof FirebaseError) {
                switch (err.code) {
                    case 'auth/invalid-credential':
                    case 'auth/wrong-password':
                    case 'auth/user-not-found':
                        setError("L'adresse e-mail ou le mot de passe est incorrect.");
                        break;
                    default:
                        setError("Une erreur est survenue. Veuillez réessayer.");
                        break;
                }
            } else {
                 setError("Une erreur inattendue est survenue.");
            }
            setIsSubmitting(false);
        }
    };
  
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
                 {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Erreur de connexion</AlertTitle>
                      <AlertDescription>
                        {error}
                      </AlertDescription>
                    </Alert>
                )}
                 <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
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
                  <Input id="password" name="password" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Connexion..." : "Se connecter"}
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
