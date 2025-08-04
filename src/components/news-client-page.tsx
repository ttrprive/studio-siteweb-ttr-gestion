
"use client";

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";

const promotions = [
  {
    title: "Gestion Simplifiée",
    description: "Centralisez vos finances, clients et stocks en un seul endroit.",
    src: "/slides-images/F8.png",
    alt: "Tableau de bord de gestion",
  },
  {
    title: "Assistant IA 'TRIX'",
    description: "Obtenez des conseils stratégiques pour propulser votre croissance.",
    src: "/slides-images/F9.png",
    alt: "Assistant Intelligence Artificielle",
  },
  {
    title: "Adapté à Votre Métier",
    description: "Que vous soyez artisan, commerçant ou consultant, l'outil s'adapte.",
    src: "/slides-images/F10.png",
    alt: "Différents secteurs d'activité",
  },
  {
    title: "Suivi de Trésorerie",
    description: "Visualisez vos flux financiers en temps réel pour de meilleures décisions.",
    src: "/slides-images/F11.png",
    alt: "Graphique de trésorerie",
  },
  {
    title: "Gestion Client Intuitive",
    description: "Suivez les paiements et l'historique de chaque client sans effort.",
    src: "/slides-images/F12.png",
    alt: "Fiche client détaillée",
  },
  {
    title: "Contrôle des Stocks",
    description: "Évitez les ruptures et optimisez vos commandes avec des alertes.",
    src: "/slides-images/F13.png",
    alt: "Inventaire de stock",
  },
  {
    title: "Nouveaux Services",
    description: "Découvrez nos solutions de création de site web et de publicité ciblée.",
    src: "/slides-images/F14.png",
    alt: "Création de site web",
  },
  {
    title: "Sécurité Renforcée",
    description: "Vos données sont protégées avec les meilleures normes de sécurité.",
    src: "/slides-images/F15.png",
    alt: "Cadenas de sécurité",
  },
  {
    title: "Support Réactif",
    description: "Notre équipe est là pour vous accompagner à chaque étape.",
    src: "/slides-images/F16.png",
    alt: "Équipe de support client",
  },
  {
    title: "Rejoignez l'Aventure",
    description: "Créez votre compte et découvrez la nouvelle ère de la gestion.",
    src: "/slides-images/F17.png",
    alt: "Appel à l'action",
  },
];


export default function NewsClientPage() {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    );

  return (
    <div className="w-full relative">
        <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
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
  );
}
