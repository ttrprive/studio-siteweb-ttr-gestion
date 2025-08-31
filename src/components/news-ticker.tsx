
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import type { NewsItem } from '@/types/news';
import { Button } from '@/components/ui/button';
import { Newspaper, X } from 'lucide-react';
import LoaderLink from './loader-link';
import { cn } from '@/lib/utils';

const NewsTicker = ({ newsItems }: { newsItems: NewsItem[] }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Le widget n'est visible que si l'utilisateur ne l'a pas fermé pendant la session
    if (sessionStorage.getItem('newsTickerClosed') !== 'true') {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('newsTickerClosed', 'true');
  };
  
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3 animate-float">
      <div className="hidden sm:block max-w-xs p-3 rounded-lg bg-card/80 backdrop-blur-sm border shadow-lg relative">
        <Button
            variant="ghost"
            size="icon"
            className="absolute top-1 right-1 h-6 w-6 rounded-full"
            onClick={handleClose}
            aria-label="Fermer le widget d'actualités"
        >
            <X className="h-4 w-4" />
        </Button>
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[plugin.current]}
          className="w-full h-16 overflow-hidden" 
        >
          <CarouselContent>
            {newsItems.map((item) => (
              <CarouselItem key={item.id} className="flex items-center gap-3">
                {item.imageUrl && (
                    <div className="relative w-12 h-12 rounded-md overflow-hidden shrink-0 bg-muted">
                        <Image src={item.imageUrl} alt={item.title} fill className="object-cover" sizes="48px" />
                    </div>
                )}
                <div className={cn("overflow-hidden flex-grow", !item.imageUrl && "w-full")}>
                    <p className="text-sm font-semibold text-card-foreground truncate">
                        {item.title}
                    </p>
                     {item.description && (
                        <p className="text-xs text-muted-foreground truncate mt-1">
                            {item.description}
                        </p>
                    )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <Button asChild size="icon" className="rounded-full h-14 w-14 shadow-lg animate-pulse">
        <LoaderLink href="/news">
          <Newspaper className="h-7 w-7" />
        </LoaderLink>
      </Button>
    </div>
  );
};

export default NewsTicker;
