import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Paintbrush, Megaphone, Code, Search } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import LoaderLink from '@/components/loader-link';

export const metadata: Metadata = {
  title: 'Services sur Mesure',
  description: 'Développez votre activité avec nos services premium : création de sites web, publicité ciblée, développement d\'applications spécifiques et optimisation SEO.',
};


const services = [
  {
    slug: "creation-site-web",
    icon: <Paintbrush className="size-10 mb-4 text-primary" />,
    title: "Création de Sites Web Premium",
    description: "Un site vitrine sur-mesure, élégant et performant pour refléter l'excellence de votre marque. Conçu pour captiver et convertir.",
    price: "À partir de 1 200 €",
    features: [
      "Design unique et personnalisé",
      "Optimisé pour le mobile (Responsive)",
      "Performances de chargement rapides",
      "Interface d'administration simple"
    ],
    cta: "Demander un devis"
  },
  {
    slug: "publicite-ciblee",
    icon: <Megaphone className="size-10 mb-4 text-primary" />,
    title: "Publicité Ciblée & Gestion de Campagnes",
    description: "Atteignez vos clients idéaux là où ils se trouvent. Nous créons et gérons des campagnes publicitaires efficaces sur les réseaux sociaux et Google.",
    price: "À partir de 450 € / mois",
    features: [
      "Stratégie publicitaire sur-mesure",
      "Création des visuels et textes publicitaires",
      "Ciblage précis de l'audience",
      "Rapports de performance mensuels"
    ],
    cta: "Lancer ma campagne"
  },
  {
    slug: "developpement-application",
    icon: <Code className="size-10 mb-4 text-primary" />,
    title: "Développement d'Applications Spécifiques",
    description: "Un besoin métier unique ? Nous développons des outils et applications web sur-mesure pour automatiser vos processus et améliorer votre productivité.",
    price: "Sur devis",
    features: [
      "Analyse de vos besoins et cahier des charges",
      "Développement agile et itératif",
      "Intégration avec vos outils existants",
      "Maintenance et support évolutif"
    ],
    cta: "Discuter de mon projet"
  },
  {
    slug: "seo",
    icon: <Search className="size-10 mb-4 text-primary" />,
    title: "Optimisation pour les Moteurs de Recherche (SEO)",
    description: "Améliorez votre visibilité sur Google et attirez plus de trafic qualifié. Nous optimisons votre site pour le classer en haut des résultats de recherche.",
    price: "À partir de 600 € / mois",
    features: [
      "Audit technique complet",
      "Recherche de mots-clés stratégiques",
      "Optimisation du contenu et de la structure",
      "Création de liens (Netlinking)"
    ],
    cta: "Améliorer mon SEO"
  }
];

export default function ServicesPage() {
  return (
    <main className="container mx-auto px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-4xl text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Développez votre activité avec nos services sur mesure.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          En plus de notre application de gestion, nous mettons notre expertise technique à votre service pour vous aider à grandir, innover et atteindre vos objectifs.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.title} className="flex flex-col border-border/40 hover:border-primary/60 transition-colors duration-300 hover:shadow-lg">
            <CardHeader className="text-center items-center">
              {service.icon}
              <CardTitle className="text-2xl">{service.title}</CardTitle>
              <CardDescription className="px-6">{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3 text-muted-foreground">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckCircle className="size-5 mr-3 mt-0.5 shrink-0 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col items-center gap-4 p-6 bg-card-foreground/5 rounded-b-lg">
              <p className="text-xl font-semibold">{service.price}</p>
              <Button asChild size="lg" className="w-full">
                <LoaderLink href={`/services/${service.slug}`}>{service.cta}</LoaderLink>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-20 text-center bg-muted/50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold tracking-tight">Un projet en tête ?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Nous sommes à votre écoute pour discuter de vos idées et trouver la solution la plus adaptée à vos ambitions.</p>
          <div className="mt-8">
              <Button size="lg" asChild>
                  <LoaderLink href="/support">Contactez-nous</LoaderLink>
              </Button>
          </div>
      </div>
    </main>
  );
}
