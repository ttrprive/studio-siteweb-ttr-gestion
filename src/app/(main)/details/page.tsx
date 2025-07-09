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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    icon: <LayoutDashboard className="size-8 mb-4 text-primary" />,
    title: "Tableau de Bord Centralisé : Votre tour de contrôle",
    description: "Dès la connexion, visualisez en un coup d'œil les indicateurs clés : arrivées du jour, dépenses, réservations actives et plus. Recevez des conseils stratégiques personnalisés basés sur vos données pour prendre les meilleures décisions, sans effort.",
  },
  {
    icon: <Blocks className="size-8 mb-4 text-primary" />,
    title: "Gestion des Prestations sur Mesure : Un système qui s'adapte à vous",
    description: "Que vous gériez des réservations hôtelières, commandes de restaurant, ventes en boutique ou fiches patients, notre système s'adapte. Personnalisez vos services pour que l'application parle votre langage.",
  },
  {
    icon: <Users className="size-8 mb-4 text-primary" />,
    title: "Fichier Clients (CRM) Intégré : Transformez vos clients en ambassadeurs",
    description: "Centralisez coordonnées, historique d'achats, soldes et notes personnelles. Offrez un service personnalisé qui fidélise et fait la différence.",
  },
  {
    icon: <Wallet className="size-8 mb-4 text-primary" />,
    title: "Gestion de Trésorerie Intelligente : Maîtrisez vos flux financiers",
    description: "Enregistrez chaque dépense et revenu en quelques secondes. Obtenez une vue claire et en temps réel de votre caisse. Analysez vos finances, identifiez les postes de coûts et maximisez votre rentabilité.",
  },
  {
    icon: <Warehouse className="size-8 mb-4 text-primary" />,
    title: "Gestion de Stock Simplifiée : Ne soyez plus jamais à court",
    description: "Suivez votre inventaire avec une précision redoutable. Définissez des seuils d'alerte et soyez notifié automatiquement lorsque le stock est bas pour anticiper vos commandes.",
  },
  {
    icon: <LineChart className="size-8 mb-4 text-primary" />,
    title: "Suivi des Investissements : Pilotez votre croissance future",
    description: "Un projet d'agrandissement ? L'achat de nouveau matériel ? Planifiez, suivez et analysez la rentabilité de vos investissements pour assurer le développement pérenne de votre entreprise.",
  },
  {
    icon: <UsersRound className="size-8 mb-4 text-primary" />,
    title: "Administration et Gestion d'Équipe : Collaborez en toute sécurité",
    description: "Invitez vos employés et définissez leurs rôles (administrateur, employé). Gérez les permissions d'accès et sécurisez les connexions. Chaque action est tracée pour une transparence totale.",
  },
  {
    icon: <History className="size-8 mb-4 text-primary" />,
    title: "Journal d'Activité Complet : Une traçabilité à toute épreuve",
    description: "Qui a fait quoi, et quand ? Notre journal d'activité enregistre chaque action importante. Une fonctionnalité essentielle pour la sécurité, la responsabilité et l'audit.",
  },
  {
    icon: <Bot className="size-8 mb-4 text-primary" />,
    title: "Assistant IA & Boîte à Idées",
    description: "Imaginez poser des questions en langage naturel sur vos ventes ou recevoir des suggestions marketing. Notre futur assistant IA transformera votre manière de travailler.",
    badge: "Bientôt disponible",
  },
  {
    icon: <ShieldCheck className="size-8 mb-4 text-primary" />,
    title: "Sécurité et Confidentialité Absolue : Vos données, votre forteresse",
    description: "Vos données sont hébergées sur l'infrastructure sécurisée de Google. L'architecture de TTR Gestion garantit que vous êtes la seule personne à pouvoir y accéder.",
  },
];

export default function DetailsPage() {
  return (
    <main className="container mx-auto px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Pilotez votre entreprise avec une simplicité redoutable.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Vous êtes un entrepreneur passionné, un gérant d'hôtel, de restaurant ou de boutique ? Vous savez mieux que quiconque que la gestion quotidienne peut rapidement devenir un casse-tête. C'est pourquoi nous avons créé TTR Gestion. Oubliez la complexité. Retrouvez le contrôle.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              {feature.icon}
              <CardTitle>{feature.title}</CardTitle>
              {feature.badge && <Badge variant="secondary" className="w-fit">{feature.badge}</Badge>}
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Prêt à simplifier votre quotidien ?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Libérez le potentiel de votre entreprise. Créez votre compte gratuitement dès aujourd'hui et découvrez la puissance d'une gestion intuitive.</p>
          <div className="mt-8">
              <Button size="lg" asChild>
                  <Link href="/register">Créez votre compte gratuitement</Link>
              </Button>
          </div>
      </div>
    </main>
  );
}
