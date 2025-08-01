
"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, StarHalf, ArrowRight } from 'lucide-react';
import Autoplay from "embla-carousel-autoplay";
import LoaderLink from './loader-link';
import { Button } from './ui/button';
import { getReviews } from '@/firebase/services';
import type { Testimonial } from '@/types/testimonial';
import { Skeleton } from './ui/skeleton';

export const Rating = ({ value }: { value: number }) => {
  const fullStars = Math.floor(value);
  const halfStar = value % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1 text-yellow-400">
      {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} className="size-4 fill-current" />)}
      {halfStar && <StarHalf key="half" className="size-4 fill-current" />}
      {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} className="size-4" />)}
    </div>
  );
};


export default function TestimonialsSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
        const reviewsData = await getReviews();
        setTestimonials(reviewsData);
        setLoading(false);
    }
    fetchReviews();
  }, []);

  return (
    <section className="w-full py-20 px-4 md:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <h2 data-aos="fade-down" className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
            Ce que disent nos utilisateurs
          </h2>
          <p data-aos="fade-up" className="text-lg text-muted-foreground mb-12">
            Découvrez pourquoi des centaines d'entrepreneurs nous font confiance pour piloter leur activité.
          </p>
        </div>

        {loading ? (
             <div className="flex gap-4 -ml-4">
                 {[...Array(3)].map((_, i) => (
                    <div key={i} className="pl-4 md:basis-1/2 lg:basis-1/3 w-full">
                        <div className="p-1 h-full">
                            <Card className="h-full flex flex-col">
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <Skeleton className="h-10 w-10 rounded-full" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-[120px]" />
                                            <Skeleton className="h-4 w-[80px]" />
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-3/4" />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            className="w-full"
            >
            <CarouselContent className="-ml-4">
                {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                    <Card className="h-full flex flex-col">
                        <CardHeader>
                        <div className="flex items-center gap-4">
                            <Avatar>
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                            </div>
                        </div>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col justify-between">
                            <blockquote className="text-muted-foreground italic mb-4">
                                "{testimonial.quote}"
                            </blockquote>
                            <Rating value={testimonial.rating} />
                        </CardContent>
                    </Card>
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
            </Carousel>
        )}
        
        <div className="mt-12 text-center" data-aos="fade-up">
            <Button asChild>
                <LoaderLink href="/testimonials">
                    Voir tous les avis
                    <ArrowRight className="ml-2 size-4" />
                </LoaderLink>
            </Button>
        </div>
      </div>
    </section>
  );
}
