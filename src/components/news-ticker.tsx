
"use client";

import React from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import type { NewsItem } from '@/types/news';
import { Button } from '@/components/ui/button';
import { Newspaper } from 'lucide-react';
import LoaderLink from './loader-link';
import { cn } from '@/lib/utils';

const NewsTicker = ({ newsItems }: { newsItems: NewsItem[] }) => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3">
      <div className="hidden sm:block max-w-xs p-3 rounded-lg bg-card/80 backdrop-blur-sm border shadow-lg">
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[plugin.current]}
          className="w-full h-16 overflow-hidden" // Increased height for image
        >
          <CarouselContent>
            {newsItems.map((item) => (
              <CarouselItem key={item.id} className="flex items-center gap-3">
                {item.imageUrl && (
                    <div className="relative w-12 h-12 rounded-md overflow-hidden shrink-0 bg-muted">
                        <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                    </div>
                )}
                <p className={cn("text-sm text-card-foreground truncate", !item.imageUrl && "w-full")}>
                  {item.title}
                </p>
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
