"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Button } from '@/components/ui/button';
import Autoplay from "embla-carousel-autoplay";
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Rocket, Lightbulb, Bug, Wrench, Star, ArrowRight } from 'lucide-react';
import LoaderLink from '@/components/loader-link';

const promotions = [
  {
    type: 'image',
    src: 'https://placehold.co/1200x600.png',
    alt: 'Promotion d\'été',
    title: 'Offre Spéciale Été',
    description: 'Profitez de -20% sur toutes nos prestations hôtelières.',
    hint: 'summer sale',
    link: '/services'
  },
  {
    type: 'video',
    src: 'https://videos.pexels.com/video-files/853877/853877-hd.mp4',
    title: 'Découvrez nos Nouveaux Services',
    description: 'Une expérience de gestion réinventée pour vous.',
    link: '/services'
  }
];

const newsItems = [
  {
    category: "Nouveauté",
    title: "Lancement de TTR Gestion !",
    date: "2024-07-20T10:00:00Z",
    description: "Nous sommes fiers de lancer la première version de TTR Gestion, votre nouvel outil pour une gestion simplifiée et intelligente. Explorez les fonctionnalités et donnez-nous votre avis !",
    icon: <Rocket className="size-5" />,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    category: "Amélioration",
    title: "Optimisation de l'affichage mobile",
    date: "2024-07-22T14:30:00Z",
    description: "L'interface a été entièrement revue pour une expérience utilisateur fluide et intuitive sur tous vos appareils mobiles.",
    icon: <Wrench className="size-5" />,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    category: "Correction",
    title: "Correction d'un bug d'affichage",
    date: "2024-07-23T09:00:00Z",
    description: "Un problème mineur qui affectait l'affichage des totaux dans le tableau de bord financier a été résolu. Les calculs sont désormais parfaitement justes.",
    icon: <Bug className="size-5" />,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    category: "Nouveauté",
    title: "Intégration de l'assistant IA (Bêta)",
    date: "2024-07-25T18:00:00Z",
    description: "Découvrez notre nouvel assistant intelligent ! Posez des questions en langage naturel sur vos données et obtenez des rapports instantanés. Fonctionnalité en cours de développement.",
    icon: <Lightbulb className="size-5" />,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
];

type FormattedNewsItem = typeof newsItems[0] & { timeAgo: string };

export default function NewsClientPage() {
  const [formattedNews, setFormattedNews] = useState<FormattedNewsItem[]>([]);
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  useEffect(() => {
    const getFormattedNews = () => {
      return newsItems
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map(item => ({
          ...item,
          timeAgo: formatDistanceToNow(new Date(item.date), { addSuffix: true, locale: fr })
        }));
    };
    setFormattedNews(getFormattedNews());
  }, []);

  return (
    <div className="flex flex-col">
      
      <div className="w-full">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {promotions.map((promo, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-video w-full h-[60vh] md:h-[70vh]">
                  {promo.type === 'image' ? (
                    <Image
                      src={promo.src}
                      alt={promo.alt}
                      fill
                      className="object-cover"
                      data-ai-hint={promo.hint}
                      priority={index === 0}
                    />
                  ) : (
                    <video
                      src={promo.src}
                      className="h-full w-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  )}
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-start justify-end p-6 md:p-12">
                    <Badge className="mb-2 bg-primary/80 border-primary text-primary-foreground backdrop-blur-sm"><Star className="mr-2 size-4" /> Promotion</Badge>
                    <h2 className="text-2xl md:text-5xl font-bold text-white max-w-3xl">{promo.title}</h2>
                    <p className="text-md md:text-xl text-white/90 mt-2 max-w-3xl">{promo.description}</p>
                    <Button asChild size="lg" className="mt-6">
                      <LoaderLink href={promo.link}>
                        Découvrir
                        <ArrowRight className="ml-2"/>
                      </LoaderLink>
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="container mx-auto max-w-5xl px-4 md:px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-green-400 bg-clip-text text-transparent">
            Quoi de neuf ?
          </h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Suivez les dernières mises à jour, améliorations et annonces concernant TTR Gestion.
          </p>
        </div>

        <div className="relative pl-8 md:pl-6">
          {/* Vertical line */}
          <div className="absolute left-[20px] md:left-[36px] top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
          
          <div className="space-y-12">
            {formattedNews.map((item, index) => (
              <div key={index} className="relative flex items-start">
                <div className={`absolute left-[-5px] md:left-0 top-1 flex size-9 items-center justify-center rounded-full border-4 border-background ${item.bgColor} ${item.color}`}>
                  {item.icon}
                </div>
                <Card className="ml-8 md:ml-12 w-full">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <Badge variant="secondary" className="w-fit">{item.category}</Badge>
                      <span className="text-sm text-muted-foreground">{item.timeAgo}</span>
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
