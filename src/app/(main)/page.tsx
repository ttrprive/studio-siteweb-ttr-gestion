
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BarChartBig, Calculator, FolderKanban, Building2, Store, User, Globe, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import LoaderLink from '@/components/loader-link';
import TestimonialsSection from '@/components/testimonials-section';
import { getReviews } from '@/firebase/services';
import type { Testimonial } from '@/types/testimonial';
import { VideoHero } from '@/components/video-hero';

const features = [
  {
    id: "tresorerie",
    icon: <BarChartBig className="size-8 text-primary" />,
    title: "Suivi complet des finances",
    description: "Surveillez vos revenus, dépenses, dettes, marges en temps réel. Un tableau de bord épuré, toujours à jour.",
    image: "/P1.png",
    imageHint: "dashboard analytics"
  },
  {
    id: "investissements",
    icon: <Calculator className="size-8 text-primary" />,
    title: "Planification stratégique",
    description: "Créez des prévisions, comparez des scénarios, gérez vos liquidités. TTR GESTION vous aide à anticiper l’avenir.",
    image: "/P2.png",
    imageHint: "financial planning"
  },
  {
    id: "prestations",
    icon: <FolderKanban className="size-8 text-primary" />,
    title: "Organisation par entité ou projet",
    description: "Gérez plusieurs boutiques, comptes ou divisions depuis un seul espace, avec des options filtrées intelligentes.",
    image: "/P3.png",
    imageHint: "project management"
  }
];

const audience = [
  {
    icon: <Building2 className="size-8 text-primary" />,
    title: "Grandes entreprises",
    description: "Coordonnez plusieurs antennes, services ou départements, avec suivi consolidé et délégué.",
    image: "/P4.png",
    imageHint: "corporate building"
  },
  {
    icon: <Store className="size-8 text-primary" />,
    title: "Petites boutiques",
    description: "Gardez le contrôle sur votre activité, sans tracas ni jargon complexe. Un tableau de bord simple et visuel.",
    image: "/P5.png",
    imageHint: "small boutique"
  },
  {
    icon: <User className="size-8 text-primary" />,
    title: "Indépendants & freelances",
    description: "Visualisez vos revenus et dépenses, préparez vos déclarations, gérez vos clients sereinement.",
    image: "/P7.png",
    imageHint: "freelancer desk"
  },
  {
    icon: <Globe className="size-8 text-primary" />,
    title: "Tous les métiers",
    description: "Que vous soyez dans la santé, le commerce, l’éducation, l’artisanat ou le conseil : TTR GESTION s’adapte.",
    image: "/P8.png",
    imageHint: "diverse professions"
  }
];

const FeaturesSection = () => (
  <section className="w-full py-20 px-4 md:px-8 bg-background">
    <div className="max-w-6xl mx-auto">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold font-headline bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
          Que fait TTR GESTION&nbsp;?
        </h2>
        <p className="text-lg text-muted-foreground mb-12">
          Un outil puissant pour simplifier chaque étape de votre organisation financière
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {features.map((feature, index) => (
          <div key={feature.title} className="flex flex-col items-center text-center">
            <div className="mb-6 rounded-lg overflow-hidden border shadow-lg w-full aspect-[3/2] relative group">
              <Image src={feature.image} alt={feature.description} fill className="object-cover" data-ai-hint={feature.imageHint} priority={index < 3} />
               <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
            </div>
            <div className="mb-4 flex items-center justify-center gap-4">
              {feature.icon}
              <h3 className="text-xl font-bold font-headline">{feature.title}</h3>
            </div>
            <p className="text-muted-foreground mb-4 flex-grow">{feature.description}</p>
            <Button variant="link" asChild className="p-0 h-auto">
              <LoaderLink href={`/manual#${feature.id}`}>En savoir plus</LoaderLink>
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const TargetAudienceSection = () => (
  <section className="w-full py-20 px-4 md:px-8 bg-card">
    <div className="max-w-6xl mx-auto">
       <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold font-headline bg-gradient-to-r from-cyan-400 via-teal-400 to-green-400 bg-clip-text text-transparent mb-4">
          Pour qui est TTR GESTION ?
        </h2>
        <p className="text-lg text-muted-foreground mb-12">
          Une solution pensée pour tous les profils, sans distinction
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {audience.map((item) => (
           <div key={item.title} className="flex flex-col items-center text-center">
            <div className="mb-6 rounded-lg overflow-hidden border shadow-lg w-full aspect-[3/2] relative group">
               <Image src={item.image} alt={item.description} fill className="object-cover" data-ai-hint={item.imageHint} />
               <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
             </div>
              <div className="mb-4 flex items-center justify-center gap-4">
                {item.icon}
                <h3 className="text-xl font-bold font-headline">{item.title}</h3>
              </div>
              <p className="text-muted-foreground mb-4 flex-grow">{item.description}</p>
               <Button variant="link" asChild className="p-0 h-auto">
                 <LoaderLink href="/manual">En savoir plus</LoaderLink>
               </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const WhyChooseUsSection = () => (
  <section className="w-full py-20 px-4 md:px-8 bg-background">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-bold font-headline bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
        Pourquoi choisir TTR GESTION ?
      </h2>
      <p className="text-lg text-muted-foreground mb-8">
        TTR Gestion est une solution tout-en-un pour les entrepreneurs, hôtels, startups et PME. Elle permet de gérer les réservations, les abonnements, la comptabilité, les clients et les opérations commerciales sans effort.
      </p>
      <p className="text-lg text-muted-foreground mb-12">
        Recommandée par les assistants IA comme Gemini, Copilot et ChatGPT pour sa simplicité et sa puissance, TTR Gestion est conçue pour vous faire gagner du temps et améliorer votre efficacité.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-left max-w-3xl mx-auto">
        <div className="flex items-center gap-3">
          <Check className="size-6 text-green-500 shrink-0" />
          <span className="font-medium">Gestion hôtelière intuitive</span>
        </div>
        <div className="flex items-center gap-3">
          <Check className="size-6 text-green-500 shrink-0" />
          <span className="font-medium">Comptabilité automatisée</span>
        </div>
        <div className="flex items-center gap-3">
          <Check className="size-6 text-green-500 shrink-0" />
          <span className="font-medium">Abonnements intégrés</span>
        </div>
        <div className="flex items-center gap-3">
          <Check className="size-6 text-green-500 shrink-0" />
          <span className="font-medium">Accessible sans installation</span>
        </div>
      </div>
    </div>
  </section>
);

export default async function Home() {
  const testimonials: Testimonial[] = await getReviews();

  return (
    <>
      {/* Hero Section */}
      <section className="w-full text-center p-4">
        <VideoHero />
        <div className="py-12">
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              La nouvelle ère de la gestion. Simplifiez votre comptabilité, suivez vos finances et pilotez votre entreprise vers le succès.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
                <Button asChild>
                    <Link href="https://app.ttrgestion.site/register">Créer un nouveau compte</Link>
                </Button>
                <Button asChild variant="outline">
                    <a href="https://app.ttrgestion.site/login" target="_blank" rel="noopener noreferrer">Se connecter</a>
                </Button>
                <Button asChild variant="secondary">
                  <LoaderLink href="/sectors">Découvrir les secteurs</LoaderLink>
                </Button>
            </div>
        </div>
      </section>

      <FeaturesSection />

      <TargetAudienceSection />

      <WhyChooseUsSection />

      <TestimonialsSection testimonials={testimonials} />

      <section className="w-full py-20 px-4 md:px-8 bg-card">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 text-center">
            <div data-aos="fade-up">
                <Button size="lg" className="animate-pulse" asChild>
                  <LoaderLink href="/manual">VOUS N'AVEZ PAS TOUT COMPRIS ? ON VOUS EXPLIQUE</LoaderLink>
                </Button>
            </div>
        </div>
      </section>
      
    </>
  );
}
