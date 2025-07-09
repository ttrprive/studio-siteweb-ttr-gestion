"use client";

import React, { useEffect } from 'react';
import AOS from 'aos';
import Image from 'next/image';
import Link from 'next/link';
import { BarChartBig, Calculator, FolderKanban, Building2, Store, User, Globe, Youtube, Facebook } from 'lucide-react';

import ThreeDCard from "@/components/three-d-card";
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: <BarChartBig className="size-8 text-primary" />,
    title: "📊 Suivi complet des finances",
    description: "Surveillez vos revenus, dépenses, dettes, marges en temps réel. Un tableau de bord épuré, toujours à jour.",
    image: "https://placehold.co/600x400.png",
    imageHint: "dashboard analytics"
  },
  {
    icon: <Calculator className="size-8 text-primary" />,
    title: "🧮 Planification stratégique",
    description: "Créez des prévisions, comparez des scénarios, gérez vos liquidités. TTR GESTION vous aide à anticiper l’avenir.",
    image: "https://placehold.co/600x400.png",
    imageHint: "financial planning"
  },
  {
    icon: <FolderKanban className="size-8 text-primary" />,
    title: "📁 Organisation par entité ou projet",
    description: "Gérez plusieurs boutiques, comptes ou divisions depuis un seul espace, avec des options filtrées intelligentes.",
    image: "https://placehold.co/600x400.png",
    imageHint: "project management"
  }
];

const audience = [
  {
    icon: <Building2 className="size-8 text-primary" />,
    title: "🏢 Grandes entreprises",
    description: "Coordonnez plusieurs antennes, services ou départements, avec suivi consolidé et délégué.",
    image: "https://placehold.co/600x400.png",
    imageHint: "corporate building"
  },
  {
    icon: <Store className="size-8 text-primary" />,
    title: "🛍️ Petites boutiques",
    description: "Gardez le contrôle sur votre activité, sans tracas ni jargon complexe. Un tableau de bord simple et visuel.",
    image: "https://placehold.co/600x400.png",
    imageHint: "small boutique"
  },
  {
    icon: <User className="size-8 text-primary" />,
    title: "👤 Indépendants & freelances",
    description: "Visualisez vos revenus et dépenses, préparez vos déclarations, gérez vos clients sereinement.",
    image: "https://placehold.co/600x400.png",
    imageHint: "freelancer desk"
  },
  {
    icon: <Globe className="size-8 text-primary" />,
    title: "🌍 Tous les métiers",
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
          Que fait TTR GESTION&nbsp;?
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

const TiktokIcon = ({ className }: { className?: string }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("size-6", className)}
    fill="currentColor"
  >
     <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.84-.95-6.43-2.8-1.59-1.87-2.32-4.2-1.86-6.33.36-1.74 1.25-3.33 2.8-4.37.91-.6 1.97-.95 3.02-1.01.03-2.17 0-4.34 0-6.51 0-.36.01-.72.04-1.08.08-1.03.49-2.02 1.2-2.82.91-1.01 2.12-1.51 3.48-1.54Z"/>
  </svg>
);

const AppFooter = () => (
    <footer className="w-full py-20 px-4 md:px-8 border-t border-border/20 bg-card">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 text-center">
            <div data-aos="fade-up">
                <Button size="lg" className="animate-pulse" asChild>
                  <Link href="/details">VOUS N'AVEZ PAS TOUT COMPRIS ? ON VOUS EXPLIQUE</Link>
                </Button>
            </div>
             <div data-aos="fade-up" data-aos-delay="100" className="flex justify-center items-center gap-6">
                <a href="#" aria-label="Youtube" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Youtube className="size-6" />
                </a>
                <a href="#" aria-label="Tiktok" className="text-muted-foreground hover:text-foreground transition-colors">
                    <TiktokIcon />
                </a>
                <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Facebook className="size-6" />
                </a>
            </div>
            <p data-aos="fade-up" data-aos-delay="200" className="text-xs text-muted-foreground">&copy; 2025 TTR GESTION — L’intelligence au service de chaque métier</p>
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
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-center p-4">
        <div className="absolute inset-0 z-0 flex items-center justify-center">
           <div className="absolute size-[800px] rounded-full bg-blue-500/20 blur-[200px]" />
           <div
                style={{
                    width: '1000px',
                    height: '1000px',
                    background:
                        'radial-gradient(circle, rgba(0, 119, 255, 0.5) 0%, rgba(0, 119, 255, 0) 60%)',
                    position: 'absolute',
                    zIndex: -1,
                    transform: 'translateZ(-100px)',
                    pointerEvents: 'none',
                }}
            />
        </div>
        <div className="relative z-10 flex flex-col items-center">
            <div data-aos="fade-down" className="scale-90 md:scale-100">
                <ThreeDCard />
            </div>

            <h1 data-aos="fade-up" data-aos-delay="100" className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4 mt-8">
              TTR GESTION
            </h1>
            <p data-aos="fade-up" data-aos-delay="200" className="text-lg text-muted-foreground mb-8 max-w-2xl">
              La nouvelle ère de la gestion.
            </p>

            <div data-aos="fade-up" data-aos-delay="300" className="flex flex-wrap items-center justify-center gap-4">
                <Button asChild>
                    <Link href="/login">Se connecter</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/register">Créer un nouveau compte</Link>
                </Button>
                <Button variant="secondary">
                    Vérification
                </Button>
            </div>
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
