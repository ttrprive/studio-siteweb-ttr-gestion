import Link from 'next/link';
import {
  HeartPulse,
  UtensilsCrossed,
  Store,
  Truck,
  Building,
  Wrench,
  GraduationCap,
  Leaf,
  Palette,
  Briefcase,
  Dumbbell,
  Landmark,
  Plane,
  Home,
  Users
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const sectors = [
  {
    icon: <HeartPulse className="size-8 text-primary" />,
    title: "Santé & Bien-être",
    description: "Cabinets médicaux, dentistes, thérapeutes, coachs sportifs. Gérez vos patients, rendez-vous et facturations."
  },
  {
    icon: <UtensilsCrossed className="size-8 text-primary" />,
    title: "Restauration & Hôtellerie",
    description: "Restaurants, cafés, hôtels. Suivez vos réservations, stocks d'ingrédients, et analysez vos ventes par plat."
  },
  {
    icon: <Store className="size-8 text-primary" />,
    title: "Commerce de détail",
    description: "Boutiques, e-commerce. Maîtrisez votre inventaire, gérez vos fournisseurs et analysez les performances de vos produits."
  },
  {
    icon: <Wrench className="size-8 text-primary" />,
    title: "Artisanat & Services",
    description: "Plombiers, électriciens, coiffeurs, réparateurs. Planifiez vos interventions, facturez vos clients et suivez vos chantiers."
  },
  {
    icon: <Building className="size-8 text-primary" />,
    title: "BTP & Construction",
    description: "Suivi de chantiers, gestion des sous-traitants, contrôle des coûts et des matériaux pour les entreprises du bâtiment."
  },
  {
    icon: <Briefcase className="size-8 text-primary" />,
    title: "Consultants & Freelances",
    description: "Suivez vos missions, gérez votre temps, facturez vos prestations et gardez une vue claire sur votre trésorerie."
  },
  {
    icon: <GraduationCap className="size-8 text-primary" />,
    title: "Éducation & Formation",
    description: "Écoles, centres de formation. Gérez les inscriptions, suivez les paiements et planifiez les cours."
  },
  {
    icon: <Leaf className="size-8 text-primary" />,
    title: "Agriculture",
    description: "Exploitations agricoles. Suivez vos cultures, gérez vos stocks de semences et d'équipements, et analysez vos rendements."
  },
  {
    icon: <Palette className="size-8 text-primary" />,
    title: "Créatifs & Artistes",
    description: "Photographes, designers, artistes. Gérez vos projets, vos droits d'auteur et vos ventes d'œuvres."
  },
  {
    icon: <Dumbbell className="size-8 text-primary" />,
    title: "Sport & Loisirs",
    description: "Salles de sport, clubs, associations. Gérez les adhésions, les réservations de terrains et les événements."
  },
  {
    icon: <Users className="size-8 text-primary" />,
    title: "Associations",
    description: "Gérez vos membres, suivez les cotisations, organisez des événements et gérez votre budget de fonctionnement."
  },
  {
    icon: <Truck className="size-8 text-primary" />,
    title: "Transport & Logistique",
    description: "Suivez votre flotte de véhicules, planifiez les livraisons, gérez la maintenance et facturez les transports."
  },
  {
    icon: <Home className="size-8 text-primary" />,
    title: "Immobilier",
    description: "Agences, gestionnaires de biens. Suivez vos mandats, gérez les loyers et les charges, et planifiez les visites."
  },
  {
    icon: <Plane className="size-8 text-primary" />,
    title: "Tourisme & Voyages",
    description: "Agences de voyages, guides. Gérez les dossiers clients, les réservations de vols et d'hôtels, et les circuits."
  },
  {
    icon: <Landmark className="size-8 text-primary" />,
    title: "Secteur Public",
    description: "Mairies, collectivités. Suivez les budgets, gérez les services aux citoyens et les projets d'infrastructure."
  },
];

export default function SectorsPage() {
  return (
    <main className="container mx-auto px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Une solution pour chaque secteur d'activité
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          TTR Gestion est conçu pour s'adapter aux réalités de votre métier. Découvrez comment notre application peut transformer la gestion de votre entreprise, quel que soit votre domaine.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {sectors.map((sector, index) => (
            <Card key={index} className="flex flex-col h-full hover:border-primary/60 transition-colors duration-300 hover:shadow-lg">
              <CardHeader>
                {sector.icon}
                <CardTitle>{sector.title}</CardTitle>
                 <CardDescription>{sector.description}</CardDescription>
              </CardHeader>
            </Card>
        ))}
      </div>
      
      <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Votre secteur n'est pas listé ?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">La flexibilité de TTR Gestion lui permet de s'adapter à de nombreux autres métiers. Contactez-nous pour discuter de vos besoins spécifiques.</p>
          <div className="mt-8">
              <Button size="lg" asChild>
                  <Link href="/support">Contactez-nous</Link>
              </Button>
          </div>
      </div>
    </main>
  );
}
