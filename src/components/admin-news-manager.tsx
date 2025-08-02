
"use client";

import React, { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { addNews, getNews } from '@/firebase/services';
import type { NewsItem, NewsCategory } from '@/types/news';
import { Badge } from './ui/badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Skeleton } from './ui/skeleton';
import { uploadMedia } from '@/app/actions/uploadImage';


const newsSchema = z.object({
  title: z.string().min(5, "Le titre doit contenir au moins 5 caractères."),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères."),
  category: z.enum(["Nouveauté", "Amélioration", "Correction", "Annonce"]),
  image: z.instanceof(File).optional(),
});

type NewsFormData = z.infer<typeof newsSchema>;

const AdminNewsManager = () => {
  const { toast } = useToast();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<NewsFormData>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "Nouveauté",
    },
  });
  
  const fetchNews = async () => {
    setLoading(true);
    const newsItems = await getNews();
    setNews(newsItems);
    setLoading(false);
  }

  useEffect(() => {
    fetchNews();
  }, []);

  const onSubmit = async (data: NewsFormData) => {
    setIsSubmitting(true);
    let imageUrl: string | undefined = undefined;

    try {
        if (data.image && data.image.size > 0) {
            const formData = new FormData();
            formData.append('media', data.image);
            const result = await uploadMedia(formData);

            if (!result.success || !result.url) {
                throw new Error(result.error || 'Échec du téléversement de l\'image.');
            }
            imageUrl = result.url;
        }

        await addNews({
            title: data.title,
            description: data.description,
            category: data.category as NewsCategory,
            imageUrl: imageUrl,
        });

      toast({
        title: "Succès",
        description: "L'actualité a été ajoutée avec succès.",
      });
      form.reset();
      await fetchNews(); // Refresh the list
    } catch (error) {
        console.error("Erreur lors de la soumission :", error);
        toast({
            title: "Erreur",
            description: error instanceof Error ? error.message : "Une erreur est survenue lors de l'ajout de l'actualité.",
            variant: "destructive",
        });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Gérer les Actualités</CardTitle>
        <CardDescription>Ajoutez ou supprimez les actualités du site.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-medium mb-4">Ajouter une actualité</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre</FormLabel>
                    <FormControl><Input placeholder="Lancement de la v2..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catégorie</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez une catégorie" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="Nouveauté">Nouveauté</SelectItem>
                            <SelectItem value="Amélioration">Amélioration</SelectItem>
                            <SelectItem value="Correction">Correction</SelectItem>
                            <SelectItem value="Annonce">Annonce</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl><Textarea placeholder="Décrivez la nouvelle actualité ici..." className="min-h-[100px]" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormLabel>Image (optionnel)</FormLabel>
                    <FormControl>
                      <Input 
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if(file) onChange(file);
                        }} 
                        {...rest} 
                       />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Ajout en cours..." : "Ajouter l'actualité"}
              </Button>
            </form>
          </Form>
        </div>
        <div>
            <h3 className="text-lg font-medium mb-4">Actualités existantes</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {loading ? (
                    [...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-4">
                            <Skeleton className="h-12 w-12 rounded-lg" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                    ))
                ) : news.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">Aucune actualité à afficher.</p>
                ) : (
                    news.map(item => (
                        <div key={item.id} className="p-3 rounded-lg border bg-card flex gap-4 items-start">
                           {item.imageUrl && (
                                <div className="relative w-16 h-16 rounded-md overflow-hidden shrink-0">
                                    <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                                </div>
                           )}
                           <div className="flex-grow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <Badge variant="secondary" className="mb-2">{item.category}</Badge>
                                        <p className="font-semibold leading-tight">{item.title}</p>
                                    </div>
                                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                                        {format(new Date(item.date), 'dd/MM/yyyy', { locale: fr })}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                           </div>
                        </div>
                    ))
                )}
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminNewsManager;
