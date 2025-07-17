"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const { signInWithGoogle, user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Erreur de connexion Google", error);
      toast({
        title: "Erreur de connexion",
        description: "Une erreur est survenue lors de la connexion avec Google.",
        variant: "destructive",
      });
    }
  };

  if (user) {
    router.push("/");
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Connexion</CardTitle>
          <CardDescription>
            Entrez votre email ci-dessous pour vous connecter à votre compte
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
            <Button type="submit" className="w-full">
              Se connecter
            </Button>
            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
              Se connecter avec Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Vous n'avez pas de compte?{" "}
            <Link href="/register" className="underline">
              S'inscrire
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
