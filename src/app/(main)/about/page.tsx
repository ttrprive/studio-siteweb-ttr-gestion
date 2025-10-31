import type { Metadata } from 'next';
import { Users, Target, Rocket } from 'lucide-react';
import CornerDecoration from '@/components/corner-decoration';
import { TrixBusinessLogo } from '@/components/trix-business-logo';

export const metadata: Metadata = {
  title: 'À Propos de TTR Gestion',
  description: 'Découvrez notre mission, notre vision et l\'histoire derrière TTR Gestion (Togo Tech Renove). Nous simplifions la gestion d\'entreprise pour tous les métiers.',
};

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-12 md:px-6 md:py-20 relative overflow-hidden">
        <CornerDecoration src="/photobleu.png" position="top-right" className="translate-x-1/3 -translate-y-1/3" />
        <CornerDecoration src="/photoblanc.png" position="bottom-left" className="-translate-x-1/3 translate-y-1/3" />
        
        <div className="mx-auto max-w-4xl text-center mb-16">
            <div className="flex justify-center mb-6">
                <div className="size-[150px] md:size-[200px]">
                  <TrixBusinessLogo />
                </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl font-headline bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                À Propos de TTR Gestion
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
                L’intelligence au service de chaque métier. Filiale de TTR GROUPE, TTR Gestion (Togo Tech Renove) a été créé avec une conviction : chaque entrepreneur, quelle que soit sa taille ou son secteur, mérite des outils puissants, simples et accessibles pour piloter son activité.
            </p>
        </div>

        <div className="max-w-5xl mx-auto grid gap-12 md:grid-cols-3">
            <div className="text-center flex flex-col items-center">
                <Rocket className="size-12 mb-4 text-primary" />
                <h2 className="text-2xl font-bold font-headline mb-2">Notre Mission</h2>
                <p className="text-muted-foreground">
                    Fournir une solution de gestion tout-en-un qui simplifie la complexité administrative, libère du temps et fournit des informations claires pour aider les entreprises à prospérer. Nous voulons être le copilote de votre croissance.
                </p>
            </div>
            <div className="text-center flex flex-col items-center">
                <Target className="size-12 mb-4 text-primary" />
                <h2 className="text-2xl font-bold font-headline mb-2">Notre Vision</h2>
                <p className="text-muted-foreground">
                    Devenir la plateforme de gestion de référence pour les TPE, PME et indépendants en Europe, en intégrant les meilleures technologies, notamment l'intelligence artificielle, pour offrir des conseils et des automatisations qui font vraiment la différence.
                </p>
            </div>
            <div className="text-center flex flex-col items-center">
                <Users className="size-12 mb-4 text-primary" />
                <h2 className="text-2xl font-bold font-headline mb-2">Notre Équipe</h2>
                <p className="text-muted-foreground">
                    Nous sommes une équipe de développeurs, de designers et de stratèges passionnés par l'entrepreneuriat. Frustrés par les outils existants, nous avons décidé de construire la solution dont nous rêvions : flexible, intelligente et centrée sur l'utilisateur.
                </p>
            </div>
        </div>
    </main>
  );
}
