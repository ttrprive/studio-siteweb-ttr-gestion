import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, LineChart, Handshake } from 'lucide-react';
import LoaderLink from '@/components/loader-link';

export const metadata: Metadata = {
  title: 'Devenir Actionnaire',
  description: 'Rejoignez l\'aventure TTR Gestion et investissez dans le futur de la gestion d\'entreprise. Découvrez notre vision et nos ambitions.',
};

export default function ShareholderPage() {
  return (
    <main className="container mx-auto px-4 py-12 md:px-6 md:py-20">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Investissez dans le Futur de la Gestion d'Entreprise
                </h1>
                <p className="mt-6 text-lg text-muted-foreground">
                    TTR Gestion est plus qu'une application, c'est une révolution pour des milliers d'entrepreneurs. Nous ouvrons nos portes à des partenaires qui partagent notre vision et souhaitent participer à notre croissance exponentielle.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 mb-16">
                <div className="text-center flex flex-col items-center">
                    <Rocket className="size-12 mb-4 text-primary" />
                    <h2 className="text-2xl font-bold mb-2">Une Mission Forte</h2>
                    <p className="text-muted-foreground">
                        Simplifier radicalement la vie des entrepreneurs pour leur permettre de se concentrer sur ce qui compte vraiment : leur métier.
                    </p>
                </div>
                 <div className="text-center flex flex-col items-center">
                    <LineChart className="size-12 mb-4 text-primary" />
                    <h2 className="text-2xl font-bold mb-2">Un Marché Vaste</h2>
                    <p className="text-muted-foreground">
                        Des millions de TPE, PME et indépendants en Europe sont encore sous-équipés. Le potentiel de croissance est immense.
                    </p>
                </div>
                <div className="text-center flex flex-col items-center">
                    <Handshake className="size-12 mb-4 text-primary" />
                    <h2 className="text-2xl font-bold mb-2">Une Vision Claire</h2>
                    <p className="text-muted-foreground">
                        Devenir le leader de la gestion intelligente en intégrant l'IA au cœur de notre produit pour offrir une valeur inégalée.
                    </p>
                </div>
            </div>
            
            <Card className="bg-muted/50">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl">Rejoignez l'Aventure</CardTitle>
                </CardHeader>
                <CardContent className="text-center max-w-2xl mx-auto">
                    <p className="text-lg text-muted-foreground mb-8">
                        Nous recherchons des investisseurs visionnaires pour nous accompagner dans notre prochaine phase de développement, d'expansion internationale et d'innovation produit. Si vous souhaitez en savoir plus sur cette opportunité unique, contactez notre équipe de relations investisseurs.
                    </p>
                    <Button size="lg" asChild>
                        <LoaderLink href="/support">Prendre contact</LoaderLink>
                    </Button>
                </CardContent>
            </Card>
        </div>
    </main>
  );
}
