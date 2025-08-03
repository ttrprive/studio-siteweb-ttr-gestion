
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Rocket, Wrench, Bug, Megaphone, Star, Annoyed, ImageIcon } from 'lucide-react';
import type { NewsItem } from '@/types/news';
import { getNews } from '@/firebase/services';
import { Skeleton } from './ui/skeleton';

const categoryStyles = {
    "Nouveauté": { icon: <Rocket className="size-5" />, color: "text-blue-500", bgColor: "bg-blue-500/10" },
    "Amélioration": { icon: <Wrench className="size-5" />, color: "text-green-500", bgColor: "bg-green-500/10" },
    "Correction": { icon: <Bug className="size-5" />, color: "text-red-500", bgColor: "bg-red-500/10" },
    "Annonce": { icon: <Megaphone className="size-5" />, color: "text-purple-500", bgColor: "bg-purple-500/10" }
};

type FormattedNewsItem = NewsItem & { timeAgo: string };

// Les slides sont maintenant directement intégrées ici.
// Remplacez les `src` par les chemins vers vos images dans le dossier `public/slide-images`.
// Exemple: src: "/slide-images/mon-image-1.jpg"
const staticPromotions = [
  { id: '1', title: 'Titre de la Diapositive 1', description: 'Description pour la diapositive 1.', src: 'https://placehold.co/1280x720.png', alt: 'Diapositive 1', type: 'image', imageHint: 'business meeting' },
  { id: '2', title: 'Titre de la Diapositive 2', description: 'Description pour la diapositive 2.', src: 'https://placehold.co/1280x720.png', alt: 'Diapositive 2', type: 'image', imageHint: 'data analytics' },
  { id: '3', title: 'Titre de la Diapositive 3', description: 'Description pour la diapositive 3.', src: 'https://placehold.co/1280x720.png', alt: 'Diapositive 3', type: 'image', imageHint: 'team collaboration' },
  { id: '4', title: 'Titre de la Diapositive 4', description: 'Description pour la diapositive 4.', src: 'https://placehold.co/1280x720.png', alt: 'Diapositive 4', type: 'image', imageHint: 'project planning' },
  { id: '5', title: 'Titre de la Diapositive 5', description: 'Description pour la diapositive 5.', src: 'https://placehold.co/1280x720.png', alt: 'Diapositive 5', type: 'image', imageHint: 'financial growth' },
  { id: '6', title: 'Titre de la Diapositive 6', description: 'Description pour la diapositive 6.', src: 'https://placehold.co/1280x720.png', alt: 'Diapositive 6', type: 'image', imageHint: 'customer support' },
  { id: '7', title: 'Titre de la Diapositive 7', description: 'Description pour la diapositive 7.', src: 'https://placehold.co/1280x720.png', alt: 'Diapositive 7', type: 'image', imageHint: 'office workspace' },
  { id: '8', title: 'Titre de la Diapositive 8', description: 'Description pour la diapositive 8.', src: 'https://placehold.co/1280x720.png', alt: 'Diapositive 8', type: 'image', imageHint: 'mobile application' },
  { id: '9', title: 'Titre de la Diapositive 9', description: 'Description pour la diapositive 9.', src: 'https://placehold.co/1280x720.png', alt: 'Diapositive 9', type: 'image', imageHint: 'security technology' },
  { id: '10', title: 'Titre de la Diapositive 10', description: 'Description pour la diapositive 10.', src: 'https://placehold.co/1280x720.png', alt: 'Diapositive 10', type: 'image', imageHint: 'global network' },
];

export default function NewsClientPage() {
  const [news, setNews] = useState<FormattedNewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  useEffect(() => {
    const fetchNews = async () => {
        setLoadingNews(true);
        const newsItems = await getNews();
        const formatted = newsItems.map(item => ({
            ...item,
            timeAgo: formatDistanceToNow(new Date(item.date), { addSuffix: true, locale: fr })
        }));
        setNews(formatted);
        setLoadingNews(false);
    };
    fetchNews();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <section className="w-full">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {staticPromotions.map((promo, index) => (
                <CarouselItem key={promo.id}>
                  <div className="relative aspect-video w-full h-[50vh] md:h-[70vh]">
                    {promo.type === 'image' ? (
                      <Image
                        src={promo.src}
                        alt={promo.alt ?? 'Promotion'}
                        fill
                        className="object-cover"
                        priority={index === 0}
                        data-ai-hint={promo.imageHint}
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
                      <h2 className="text-xl md:text-5xl font-bold text-white max-w-3xl">{promo.title}</h2>
                      <p className="text-sm md:text-xl text-white/90 mt-2 max-w-3xl">{promo.description}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
      </section>

      <div className="container mx-auto max-w-5xl px-4 md:px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-green-400 bg-clip-text text-transparent">
            Quoi de neuf ?
          </h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Suivez les dernières mises à jour, améliorations et annonces concernant TTR Gestion.
          </p>
        </div>

        <div className="relative pl-6">
          {/* Vertical line */}
          <div className="absolute left-[12px] top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
          
          <div className="space-y-12">
            {loadingNews ? (
                [...Array(3)].map((_, i) => (
                    <div key={i} className="relative flex items-start">
                        <div className="absolute left-[-12px] top-1 flex size-9 items-center justify-center rounded-full border-4 border-background bg-muted">
                           <Skeleton className="size-5 rounded-full" />
                        </div>
                        <Card className="ml-6 w-full">
                            <CardHeader>
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-1/4" />
                                    <Skeleton className="h-6 w-3/4" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3 mt-2" />
                            </CardContent>
                        </Card>
                    </div>
                ))
            ) : news.length === 0 ? (
                <Card className="ml-6 w-full text-center py-12">
                    <CardContent>
                        <Annoyed className="size-12 mx-auto text-muted-foreground" />
                        <p className="mt-4 text-muted-foreground">Aucune actualité pour le moment.</p>
                    </CardContent>
                </Card>
            ) : (
                news.map((item) => {
                  const style = categoryStyles[item.category];
                  return (
                    <div key={item.id} className="relative flex items-start">
                      <div className={`absolute left-[-12px] top-1 flex size-9 items-center justify-center rounded-full border-4 border-background ${style.bgColor} ${style.color}`}>
                        {item.imageUrl ? <ImageIcon className="size-5" /> : style.icon}
                      </div>
                      <Card className="ml-6 w-full">
                        {item.imageUrl && (
                            <div className="relative w-full aspect-video rounded-t-lg overflow-hidden">
                                <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                            </div>
                        )}
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
                  );
                })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
