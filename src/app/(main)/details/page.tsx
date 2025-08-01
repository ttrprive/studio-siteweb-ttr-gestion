import Link from 'next/link';
import {
  LayoutDashboard,
  Blocks,
  Users,
  Wallet,
  Warehouse,
  LineChart,
  UsersRound,
  History,
  Bot,
  ShieldCheck,
  Award,
  Megaphone,
  BookOpen,
  Gamepad2,
  Video,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Metadata } from 'next';
import LoaderLink from '@/components/loader-link';
import CornerDecoration from '@/components/corner-decoration';


export const metadata: Metadata = {
  title: 'Détail des Fonctionnalités',
  description: 'Explorez en détail chaque module de TTR Gestion. De la gestion des clients à l\'assistant IA, découvrez la puissance de notre outil tout-en-un.',
};

const features = [
  {
    icon: <LayoutDashboard className="size-8 mb-4 text-primary" />,
    title: "Tableau de Bord",
    description: "Votre cockpit. Obtenez une vue d'ensemble instantanée de votre activité.",
    link: "/manual#dashboard"
  },
  {
    icon: <Bot className="size-8 mb-4 text-primary" />,
    title: "TRIX Business (Assistant IA)",
    description: "Votre consultant IA personnel pour des stratégies et conseils pratiques.",
    link: "/manual#trix-business"
  },
  {
    icon: <Blocks className="size-8 mb-4 text-primary" />,
    title: "Gestion des Prestations",
    description: "Le cœur de votre activité. Enregistrez et suivez toutes vos prestations.",
    link: "/manual#prestations"
  },
  {
    icon: <Users className="size-8 mb-4 text-primary" />,
    title: "Gestion des Clients",
    description: "Centralisez les informations de vos clients, suivez les soldes et encaissez les paiements.",
    link: "/manual#clients"
  },
  {
    icon: <Wallet className="size-8 mb-4 text-primary" />,
    title: "Trésorerie",
    description: "Maîtrisez vos finances. Suivez toutes les entrées et sorties d'argent.",
    link: "/manual#tresorerie"
  },
  {
    icon: <Warehouse className="size-8 mb-4 text-primary" />,
    title: "Gestion de Stock",
    description: "Suivez votre inventaire et définissez des seuils d'alerte pour éviter les ruptures.",
    link: "/manual#stock"
  },
  {
    icon: <LineChart className="size-8 mb-4 text-primary" />,
    title: "Suivi des Investissements",
    description: "Planifiez et suivez la rentabilité de vos projets de développement.",
    link: "/manual#investissements"
  },
   {
    icon: <Award className="size-8 mb-4 text-primary" />,
    title: "Programme de Parrainage",
    description: "Gagnez des récompenses en recommandant TTR Gestion.",
    link: "/manual#parrainage"
  },
  {
    icon: <UsersRound className="size-8 mb-4 text-primary" />,
    title: "Gestion des Utilisateurs",
    description: "En tant qu'administrateur, gérez les comptes et permissions de vos employés.",
    link: "/manual#utilisateurs"
  },
  {
    icon: <History className="size-8 mb-4 text-primary" />,
    title: "Journal d'Activité",
    description: "Une traçabilité complète de chaque action pour une sécurité optimale.",
    link: "/manual#journal"
  },
  {
    icon: <Megaphone className="size-8 mb-4 text-primary" />,
    title: "Faire une PUB",
    description: "Contactez-nous pour lancer des campagnes publicitaires ciblées.",
    link: "/manual#pub"
  },
  {
    icon: <BookOpen className="size-8 mb-4 text-primary" />,
    title: "Conseils & Inspirations",
    description: "Une sélection de citations sur l'entrepreneuriat pour vous motiver.",
    link: "/manual#conseils"
  },
  {
    icon: <Gamepad2 className="size-8 mb-4 text-primary" />,
    title: "Espace Jeux",
    description: "Une section de détente pour stimuler l'esprit et faire une pause productive.",
    link: "/manual#jeux"
  },
  {
    icon: <Video className="size-8 mb-4 text-primary" />,
    title: "Tutoriels Vidéo",
    description: "Accédez à des guides vidéo pour maîtriser rapidement l'application.",
    link: "/manual#tutoriels"
  },
   {
    icon: <Settings className="size-8 mb-4 text-primary" />,
    title: "Paramètres",
    description: "Personnalisez l'application, gérez les accès et vos espaces de travail.",
    link: "/manual#parametres"
  },
];

export default function DetailsPage() {
  return (
    <main className="container mx-auto px-4 py-12 md:px-6 md:py-20 relative overflow-hidden">
      <CornerDecoration src="/photobleu.png" position="top-left" className="-translate-x-1/3 -translate-y-1/3" />
      <CornerDecoration src="/photoblanc.png" position="bottom-right" className="translate-x-1/3 translate-y-1/3" />
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Un écosystème complet pour votre entreprise
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          TTR Gestion est conçu pour être un outil tout-en-un, simple et puissant. Explorez chaque module pour maîtriser pleinement votre application.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <LoaderLink key={index} href={feature.link} className="block h-full">
            <Card className="flex flex-col h-full hover:border-primary/60 transition-colors duration-300 hover:shadow-lg">
              <CardHeader>
                {feature.icon}
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          </LoaderLink>
        ))}
      </div>
      
      <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Prêt à simplifier votre quotidien ?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Libérez le potentiel de votre entreprise. Créez votre compte gratuitement dès aujourd'hui et découvrez la puissance d'une gestion intuitive.</p>
          <div className="mt-8">
              <Button size="lg" asChild>
                  <LoaderLink href="/register">Créez votre compte gratuitement</LoaderLink>
              </Button>
          </div>
      </div>
    </main>
  );
}
