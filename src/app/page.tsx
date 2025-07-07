"use client";

import React, { useEffect } from 'react';
import AOS from 'aos';
import Image from 'next/image';
import { BarChartBig, Calculator, FolderKanban, Building2, Store, User, Globe } from 'lucide-react';

import ThreeDCard from "@/components/three-d-card";
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

const features = [
  {
    icon: <BarChartBig className="size-8 text-primary" />,
    title: "Suivi complet des finances",
    description: "Surveillez vos revenus, dépenses, dettes, marges en temps réel. Un tableau de bord épuré, toujours à jour.",
    image: "https://placehold.co/600x400.png",
    imageHint: "dashboard analytics"
  },
  {
    icon: <Calculator className="size-8 text-primary" />,
    title: "Planification stratégique",
    description: "Créez des prévisions, comparez des scénarios, gérez vos liquidités. TTR GESTION vous aide à anticiper l’avenir.",
    image: "https://placehold.co/600x400.png",
    imageHint: "financial planning"
  },
  {
    icon: <FolderKanban className="size-8 text-primary" />,
    title: "Organisation par entité ou projet",
    description: "Gérez plusieurs boutiques, comptes ou divisions depuis un seul espace, avec des options filtrées intelligentes.",
    image: "https://placehold.co/600x400.png",
    imageHint: "project management"
  }
];

const audience = [
  {
    icon: <Building2 className="size-8 text-primary" />,
    title: "Grandes entreprises",
    description: "Coordonnez plusieurs antennes, services ou départements, avec suivi consolidé et délégué.",
    image: "https://placehold.co/600x400.png",
    imageHint: "corporate building"
  },
  {
    icon: <Store className="size-8 text-primary" />,
    title: "Petites boutiques",
    description: "Gardez le contrôle sur votre activité, sans tracas ni jargon complexe. Un tableau de bord simple et visuel.",
    image: "https://placehold.co/600x400.png",
    imageHint: "small boutique"
  },
  {
    icon: <User className="size-8 text-primary" />,
    title: "Indépendants & freelances",
    description: "Visualisez vos revenus et dépenses, préparez vos déclarations, gérez vos clients sereinement.",
    image: "https://placehold.co/600x400.png",
    imageHint: "freelancer desk"
  },
  {
    icon: <Globe className="size-8 text-primary" />,
    title: "Tous les métiers",
    description: "Que vous soyez dans la santé, le commerce, l’éducation, l’artisanat ou le conseil : TTR GESTION s’adapte.",
    image: "https://placehold.co/600x400.png",
    imageHint: "diverse professions"
  }
];


const FeaturesSection = () => (
  <section className="w-full py-20 px-4 md:px-8 bg-background">
    <div className="max-w-6xl mx-auto">
      <div className="text-center max-w-4xl mx-auto">
        <h2 data-aos="fade-down" className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
          TTR GESTION
        </h2>
        <p data-aos="fade-up" className="text-lg text-muted-foreground mb-12">
          Un outil puissant pour simplifier chaque étape de votre organisation financière
        </p>
      </div>

      <div className="space-y-20">
        {features.map((feature, index) => (
          <div key={feature.title} data-aos="fade-up" className="grid md:grid-cols-2 items-center gap-12">
            <div className={`text-left ${index % 2 === 1 ? 'md:order-last' : ''}`}>
              <div className="mb-4 flex items-center gap-4">
                {feature.icon}
                <h3 className="text-2xl font-bold">{feature.title}</h3>
              </div>
              <p className="text-muted-foreground mb-6">{feature.description}</p>
              <Button variant="link" className="p-0 h-auto">En savoir plus</Button>
            </div>
            <div className="bg-card p-2 rounded-lg border border-border/20 shadow-lg aspect-video flex items-center justify-center">
              <Image 
                src={feature.image} 
                alt={feature.title} 
                width={600} 
                height={400}
                data-ai-hint={feature.imageHint}
                className="rounded-md w-full object-cover"
              />
            </div>
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
        <h2 data-aos="fade-down" className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-green-400 bg-clip-text text-transparent mb-4">
          Pour qui est TTR GESTION ?
        </h2>
        <p data-aos="fade-up" className="text-lg text-muted-foreground mb-12">
          Une solution pensée pour tous les profils, sans distinction
        </p>
      </div>
      
      <div className="space-y-20">
        {audience.map((item, index) => (
           <div key={item.title} data-aos="fade-up" className="grid md:grid-cols-2 items-center gap-12">
            <div className={`text-left ${index % 2 === 1 ? 'md:order-last' : ''}`}>
              <div className="mb-4 flex items-center gap-4">
                {item.icon}
                <h3 className="text-2xl font-bold">{item.title}</h3>
              </div>
              <p className="text-muted-foreground mb-6">{item.description}</p>
               <Button variant="link" className="p-0 h-auto">En savoir plus</Button>
            </div>
             <div className="bg-background p-2 rounded-lg border border-border/20 shadow-lg aspect-video flex items-center justify-center">
              <Image 
                src={item.image} 
                alt={item.title} 
                width={600} 
                height={400}
                data-ai-hint={item.imageHint}
                className="rounded-md w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AppFooter = () => (
    <footer className="w-full py-8 px-4 md:px-8 border-t border-border/20 bg-card">
        <div className="max-w-4xl mx-auto text-center text-muted-foreground">
            <p>&copy; 2025 TTR GESTION — L’intelligence au service de chaque métier</p>
        </div>
    </footer>
);

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <main className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 flex items-center justify-center">
           <div className="absolute size-[500px] rounded-full bg-blue-500/10 blur-[150px]" />
           <div
                style={{
                    width: '800px',
                    height: '800px',
                    background:
                        'radial-gradient(circle, rgba(0, 119, 255, 0.4) 0%, rgba(0, 119, 255, 0) 60%)',
                    position: 'absolute',
                    zIndex: -1,
                    transform: 'translateZ(-100px)',
                    pointerEvents: 'none',
                }}
            />
        </div>
        <div className="relative z-10 scale-90 md:scale-100">
            <ThreeDCard />
        </div>
      </section>

      <FeaturesSection />

      <TargetAudienceSection />

      <AppFooter />
      
      <div className="fixed bottom-5 right-5 z-50">
        <ThemeToggle />
      </div>
    </main>
  );
}
