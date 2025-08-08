
"use client";

import React from 'react';
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
import { addNews, getNews, deleteNews, updateNews } from '@/firebase/services';
import type { NewsItem, NewsCategory, NewsItemCreate } from '@/types/news';
import { Badge } from './ui/badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Skeleton } from './ui/skeleton';
import { uploadMedia } from '@/app/actions/uploadImage';
import { Trash2, Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';

const newsSchema = z.object({
  title: z.string().min(5, "Le titre doit contenir au moins 5 caractères."),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères."),
  category: z.enum(["Nouveauté", "Amélioration", "Correction", "Annonce"]),
  image: z.any().optional(),
});

type NewsFormData = z.infer<typeof newsSchema>;

const editNewsSchema = z.object({
  title: z.string().min(5, "Le titre doit contenir au moins 5 caractères."),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères."),
});
type EditNewsFormData = z.infer<typeof editNewsSchema>;


const EditForm = ({ newsItem, onNewsUpdated, closeDialog }: { newsItem: NewsItem; onNewsUpdated: () => void; closeDialog: () => void; }) => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const form = useForm<EditNewsFormData>({
        resolver: zodResolver(editNewsSchema),
        defaultValues: {
            title: newsItem.title,
            description: newsItem.description,
        },
    });

    const onSubmit = async (data: EditNewsFormData) => {
        setIsSubmitting(true);
        try {
            await updateNews(newsItem.id, data);
            toast({
                title: "Succès",
                description: "L'actualité a été mise à jour.",
            });
            onNewsUpdated();
            closeDialog();
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Impossible de mettre à jour l'actualité.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem><FormLabel>Titre</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea className="min-h-[120px]" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <DialogFooter>
                    <DialogClose asChild><Button type="button" variant="secondary">Annuler</Button></DialogClose>
                    <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sauvegarde...' : 'Sauvegarder'}</Button>
                </DialogFooter>
            </form>
        </Form>
    );
};


const AdminNewsManager = () => {
  const { toast } = useToast();
  const [news, setNews] = React.useState<NewsItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [editingNewsItem, setEditingNewsItem] = React.useState<NewsItem | null>(null);

  const form = useForm<NewsFormData>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "Nouveauté",
      image: undefined,
    },
  });
  
  const { register } = form;

  const fetchNews = async () => {
    setLoading(true);
    const newsItems = await getNews();
    setNews(newsItems);
    setLoading(false);
  }

  React.useEffect(() => {
    fetchNews();
  }, []);
  
  const handleEditClick = (newsItem: NewsItem) => {
    setEditingNewsItem(newsItem);
  };

  const handleDelete = async (id: string) => {
      try {
          await deleteNews(id);
          toast({
              title: "Succès",
              description: "L'actualité a été supprimée.",
          });
          await fetchNews();
      } catch (error) {
          toast({
              title: "Erreur",
              description: "Impossible de supprimer l'actualité.",
              variant: "destructive",
          });
      }
  };

  const onSubmit = async (data: NewsFormData) => {
    setIsSubmitting(true);
    
    try {
        const imageFile = data.image && data.image[0] ? data.image[0] : null;

        const newsData: NewsItemCreate = {
            title: data.title,
            description: data.description,
            category: data.category as NewsCategory,
        };

        if (imageFile) {
            const formData = new FormData();
            formData.append('media', imageFile);
            formData.append('folder', 'news'); 
            const result = await uploadMedia(formData);

            if (!result.success || !result.url) {
                throw new Error(result.error || 'Échec du téléversement de l\\'image.');
            }
            newsData.imageUrl = result.url;
        }

        await addNews(newsData);

      toast({
        title: "Succès",
        description: "L'actualité a été ajoutée avec succès.",
      });
      form.reset();
      await fetchNews(); 
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
        <Dialog open={!!editingNewsItem} onOpenChange={(isOpen) => !isOpen && setEditingNewsItem(null)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Modifier l'actualité</DialogTitle>
                    <DialogDescription>
                      Modifiez les détails de l'actualité ci-dessous.
                    </DialogDescription>
                </DialogHeader>
                {editingNewsItem && (
                    <EditForm 
                        key={editingNewsItem.id} // <-- La clé unique pour forcer la réinitialisation
                        newsItem={editingNewsItem} 
                        onNewsUpdated={fetchNews} 
                        closeDialog={() => setEditingNewsItem(null)} 
                    />
                )}
            </DialogContent>
        </Dialog>
      <CardHeader>
        <CardTitle>Gérer les Actualités</CardTitle>
        <CardDescription>Ajoutez, modifiez ou supprimez les actualités du site.</CardDescription>
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
                <FormItem>
                  <FormLabel>Image (optionnel)</FormLabel>
                  <FormControl>
                    <Input 
                      type="file"
                      accept="image/*"
                      {...register("image")}
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
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
                                <div className="relative w-16 h-16 rounded-md overflow-hidden shrink-0 bg-muted">
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
                           <div className="flex flex-col">
                               <Button variant="ghost" size="icon" className="shrink-0" onClick={() => handleEditClick(item)}>
                                    <Edit className="size-4" />
                                </Button>
                               <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                      <Button variant="ghost" size="icon" className="shrink-0">
                                          <Trash2 className="size-4 text-destructive" />
                                      </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                      <AlertDialogHeader>
                                          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                                          <AlertDialogDescription>
                                              Cette action est irréversible et supprimera définitivement cette actualité.
                                          </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                                          <AlertDialogAction onClick={() => handleDelete(item.id)}>Supprimer</AlertDialogAction>
                                      </AlertDialogFooter>
                                  </AlertDialogContent>
                              </AlertDialog>
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

    
