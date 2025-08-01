
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { testimonials, Rating } from '@/components/testimonials-section';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Star } from 'lucide-react';

const AddReviewForm = () => {
    const { toast } = useToast();
    const [rating, setRating] = useState(0);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Here you would typically send the data to a server
        console.log("Avis soumis !");
        toast({
            title: "Avis envoyé !",
            description: "Merci pour votre retour. Votre avis est en cours de validation.",
        });
        // Close the dialog after submission - this needs to be handled by the parent component
    };
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
                <Label htmlFor="name">Votre nom</Label>
                <Input id="name" placeholder="John Doe" required />
            </div>
            <div className="grid gap-2">
                <Label>Votre note</Label>
                <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, index) => {
                        const starValue = index + 1;
                        return (
                            <Star
                                key={starValue}
                                className={`size-6 cursor-pointer transition-colors ${
                                    starValue <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'
                                }`}
                                onClick={() => setRating(starValue)}
                            />
                        );
                    })}
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="review">Votre avis</Label>
                <Textarea id="review" placeholder="TTR Gestion est incroyable..." required />
            </div>
            <DialogFooter>
                <Button type="submit">Envoyer mon avis</Button>
            </DialogFooter>
        </form>
    );
};

export default function TestimonialsPage() {
  return (
    <main className="container mx-auto px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-4xl text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Ce que nos utilisateurs pensent de nous
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Les avis authentiques de ceux qui utilisent TTR Gestion au quotidien.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="h-full flex flex-col">
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
        ))}
      </div>

      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Vous aussi, partagez votre expérience !</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Votre avis est précieux. Il nous aide à nous améliorer et guide les futurs utilisateurs.
        </p>
        <div className="mt-8">
            <Dialog>
                <DialogTrigger asChild>
                    <Button size="lg">Ajouter mon avis</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Partagez votre avis</DialogTitle>
                        <DialogDescription>
                            Laissez un commentaire sur votre expérience avec TTR Gestion.
                        </DialogDescription>
                    </DialogHeader>
                    <AddReviewForm />
                </DialogContent>
            </Dialog>
        </div>
      </div>
    </main>
  );
}
