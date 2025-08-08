
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import type { NewsItem, NewsCategory } from '@/types/news';
import { getNewsRealtime } from '@/firebase/services';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Sparkles, ArrowUpCircle, Wrench, Megaphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import type { Unsubscribe } from 'firebase/firestore';


const promotions = [
  {
    title: "Gestion Simplifiée",
    description: "Centralisez vos finances, clients et stocks en un seul endroit.",
    src: "/slides-images/F8.png",
    alt: "Tableau de bord de gestion d'entreprise TTR Gestion",
    hint: "dashboard analytics"
  },
  {
    title: "Assistant IA 'TRIX'",
    description: "Obtenez des conseils stratégiques pour propulser votre croissance.",
    src: "/slides-images/F9.png",
    alt: "Assistant Intelligence Artificielle TRIX Business",
    hint: "AI assistant"
  },
  {
    title: "Adapté à Votre Métier",
    description: "Que vous soyez artisan, commerçant ou consultant, l'outil s'adapte.",
    src: "/slides-images/F10.png",
    alt: "Artisan utilisant un logiciel de gestion sur tablette",
    hint: "diverse professions"
  },
  {
    title: "Suivi de Trésorerie",
    description: "Visualisez vos flux financiers en temps réel pour de meilleures décisions.",
    src: "/slides-images/F11.png",
    alt: "Graphique de suivi de trésorerie sur TTR Gestion",
    hint: "financial chart"
  },
  {
    title: "Gestion Client Intuitive",
    description: "Suivez les paiements et l'historique de chaque client sans effort.",
    src: "/slides-images/F12.png",
    alt: "Fiche client détaillée dans le CRM TTR Gestion",
    hint: "customer profile"
  },
  {
    title: "Contrôle des Stocks",
    description: "Évitez les ruptures et optimisez vos commandes avec des alertes.",
    src: "/slides-images/F13.png",
    alt: "Interface de gestion de stock sur TTR Gestion",
    hint: "inventory management"
  },
  {
    title: "Nouveaux Services",
    description: "Découvrez nos solutions de création de site web et de publicité ciblée.",
    src: "/slides-images/F14.png",
    alt: "Exemple de site web créé par les services TTR Gestion",
    hint: "website creation"
  },
  {
    title: "Sécurité Renforcée",
    description: "Vos données sont protégées avec les meilleures normes de sécurité.",
    src: "/slides-images/F15.png",
    alt: "Cadenas symbolisant la sécurité des données sur TTR Gestion",
    hint: "data security"
  },
  {
    title: "Support Réactif",
    description: "Notre équipe est là pour vous accompagner à chaque étape.",
    src: "/slides-images/F16.png",
    alt: "Équipe de support client de TTR Gestion disponible",
    hint: "customer support"
  },
  {
    title: "Rejoignez l'Aventure",
    description: "Créez votre compte et découvrez la nouvelle ère de la gestion.",
    src: "/slides-images/F17.png",
    alt: "Appel à l'action pour s'inscrire sur TTR Gestion",
    hint: "call to action"
  },
];

const categoryStyles: Record<NewsCategory, { icon: React.ElementType; className: string }> = {
  "Nouveauté": { icon: Sparkles, className: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200 dark:border-blue-700" },
  "Amélioration": { icon: ArrowUpCircle, className: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-200 dark:border-green-700" },
  "Correction": { icon: Wrench, className: "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300 border-orange-200 dark:border-orange-700" },
  "Annonce": { icon: Megaphone, className: "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 border-purple-200 dark:border-purple-700" },
};

const CategoryBadge = ({ category }: { category: NewsCategory }) => {
  const { icon: Icon, className } = categoryStyles[category] || categoryStyles["Annonce"];
  return (
    <Badge className={cn("flex items-center gap-1.5", className)}>
      <Icon className="size-3.5" />
      <span>{category}</span>
    </Badge>
  );
};


export default function NewsPage() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let unsubscribe: Unsubscribe | undefined;

        const setupListener = () => {
            try {
                unsubscribe = getNewsRealtime((newsItems) => {
                    setNews(newsItems);
                    if (loading) setLoading(false);
                });
            } catch (error) {
                console.error("Failed to set up real-time news listener:", error);
                setLoading(false);
            }
        };

        setupListener();

        // Cleanup subscription on component unmount
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [loading]); // Rerun if loading state changes (e.g. for retries, though not implemented here)

    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
    );

  return (
    <main className="w-full">
        <div className="w-full relative">
            <Carousel
                opts={{ align: "start", loop: true }}
                plugins={[plugin.current]}
                className="w-full"
            >
                <CarouselContent>
                {promotions.map((promo, index) => (
                    <CarouselItem key={index}>
                        <div className="relative w-full h-[600px] bg-muted">
                            <Image
                                src={promo.src}
                                alt={promo.alt}
                                fill
                                className="object-cover"
                                data-ai-hint={promo.hint}
                                sizes="100vw"
                                priority={index < 2}
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-end">
                                <div className="container mx-auto px-4 py-12 md:px-6 text-white">
                                    <h2 className="text-3xl md:text-4xl font-bold mb-2">{promo.title}</h2>
                                    <p className="text-lg md:text-xl max-w-3xl">{promo.description}</p>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
                </CarouselContent>
            </Carousel>
        </div>

        <div className="container mx-auto px-4 py-12 md:px-6 md:py-20">
            <div className="mx-auto max-w-4xl text-center mb-16">
                 <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Actualités et Mises à Jour
                </h1>
                <p className="mt-6 text-lg text-muted-foreground">
                    Suivez les dernières nouveautés, améliorations et annonces concernant TTR Gestion.
                </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
                {loading ? (
                    [...Array(3)].map((_, i) => (
                       <Card key={i} className="grid md:grid-cols-3 gap-6 items-center overflow-hidden">
                            <Skeleton className="relative h-48 md:h-full w-full" />
                            <div className="md:col-span-2 p-6">
                                <div className="flex items-center justify-between gap-4 mb-4">
                                    <Skeleton className="h-6 w-24 rounded-full" />
                                    <Skeleton className="h-4 w-20" />
                                </div>
                                <Skeleton className="h-8 w-3/4 mb-4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6 mt-2" />
                            </div>
                       </Card>
                    ))
                ) : news.length === 0 ? (
                    <p className="text-center text-muted-foreground">Aucune actualité pour le moment.</p>
                ) : (
                    news.map((item) => (
                        <Card key={item.id} className="grid md:grid-cols-3 gap-6 items-center overflow-hidden">
                            {item.imageUrl && (
                                <div className="relative h-48 md:h-full w-full">
                                    <Image 
                                        src={item.imageUrl} 
                                        alt={item.title} 
                                        fill 
                                        className="object-cover" 
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </div>
                            )}
                            <div className={item.imageUrl ? "md:col-span-2" : "md:col-span-3"}>
                                <CardHeader>
                                    <div className="flex items-center justify-between gap-4">
                                        <CategoryBadge category={item.category} />
                                        <time className="text-sm text-muted-foreground">
                                            {format(new Date(item.date), 'dd MMMM yyyy', { locale: fr })}
                                        </time>
                                    </div>
                                    <CardTitle className="mt-2 text-2xl">{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </CardContent>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    </main>
  );
}
