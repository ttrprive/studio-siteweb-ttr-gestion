
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
import { addPromotion, getPromotions, deletePromotion, updatePromotion } from '@/firebase/services';
import { uploadMedia } from '@/app/actions/uploadImage';
import type { Promotion, PromotionType } from '@/types/promotion';
import { Skeleton } from './ui/skeleton';
import { Trash2, Edit } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';

const promotionSchema = z.object({
  title: z.string().min(5, "Le titre doit contenir au moins 5 caractères."),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères."),
  type: z.enum(["image", "video"]),
  media: z.instanceof(File).refine(file => file.size > 0, "Un fichier est requis."),
});

type PromotionFormData = z.infer<typeof promotionSchema>;

const editPromotionSchema = z.object({
  title: z.string().min(5, "Le titre doit contenir au moins 5 caractères."),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères."),
});
type EditPromotionFormData = z.infer<typeof editPromotionSchema>;

const EditPromotionDialog = ({ promotion, onPromotionUpdated, open, onOpenChange }: { promotion: Promotion | null, onPromotionUpdated: () => void, open: boolean, onOpenChange: (open: boolean) => void }) => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const form = useForm<EditPromotionFormData>({
        resolver: zodResolver(editPromotionSchema),
        defaultValues: {
            title: promotion?.title || "",
            description: promotion?.description || "",
        },
    });

    React.useEffect(() => {
        if (promotion) {
            form.reset({
                title: promotion.title || "",
                description: promotion.description || "",
            });
        }
    }, [promotion, form, open]);
    
    const onSubmit = async (data: EditPromotionFormData) => {
        if (!promotion) return;

        setIsSubmitting(true);
        try {
            await updatePromotion(promotion.id, data);
            toast({
                title: "Succès",
                description: "La promotion a été mise à jour.",
            });
            onPromotionUpdated();
            onOpenChange(false);
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Impossible de mettre à jour la promotion.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Modifier la promotion</DialogTitle>
                </DialogHeader>
                {promotion && (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField control={form.control} name="title" render={({ field }) => (
                                <FormItem><FormLabel>Titre</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="description" render={({ field }) => (
                                <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <DialogFooter>
                                <DialogClose asChild><Button type="button" variant="secondary">Annuler</Button></DialogClose>
                                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sauvegarde...' : 'Sauvegarder'}</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                )}
            </DialogContent>
        </Dialog>
    );
};

const AdminCarouselManager = () => {
    const { toast } = useToast();
    const [promotions, setPromotions] = React.useState<Promotion[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [editingPromotion, setEditingPromotion] = React.useState<Promotion | null>(null);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    const form = useForm<PromotionFormData>({
        resolver: zodResolver(promotionSchema),
        defaultValues: {
            title: "",
            description: "",
            type: "image",
        },
    });

    const fetchPromotions = async () => {
        setLoading(true);
        const promoItems = await getPromotions();
        setPromotions(promoItems);
        setLoading(false);
    }

    React.useEffect(() => {
        fetchPromotions();
    }, []);

    const handleEditClick = (promotion: Promotion) => {
        setEditingPromotion(promotion);
        setIsDialogOpen(true);
    };

    const handleDialogChange = (open: boolean) => {
        setIsDialogOpen(open);
        if (!open) {
            setEditingPromotion(null);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deletePromotion(id);
            toast({
                title: "Succès",
                description: "La promotion a été supprimée.",
            });
            await fetchPromotions();
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Impossible de supprimer la promotion.",
                variant: "destructive",
            });
        }
    }

    const onSubmit = async (data: PromotionFormData) => {
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('media', data.media);
            formData.append('folder', 'promotions'); // Spécifie le dossier pour Cloudinary
            const result = await uploadMedia(formData);

            if (!result.success || !result.url) {
                throw new Error(result.error || 'Échec du téléversement du média.');
            }

            await addPromotion({
                title: data.title,
                description: data.description,
                type: data.type as PromotionType,
                src: result.url,
                alt: data.title,
            });

            toast({
                title: "Succès",
                description: "La promotion a été ajoutée avec succès.",
            });
            form.reset();
            const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
            if(fileInput) fileInput.value = "";
            await fetchPromotions();
        } catch (error) {
            console.error("Erreur lors de la soumission :", error);
            toast({
                title: "Erreur",
                description: error instanceof Error ? error.message : "Une erreur est survenue.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="flex flex-col">
            <EditPromotionDialog
                promotion={editingPromotion}
                onPromotionUpdated={fetchPromotions}
                open={isDialogOpen}
                onOpenChange={handleDialogChange}
            />
            <CardHeader>
                <CardTitle>Gérer le Carrousel</CardTitle>
                <CardDescription>Ajoutez, modifiez ou supprimez les promotions de la page d'accueil.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-8 md:grid-cols-2">
                <div>
                    <h3 className="text-lg font-medium mb-4">Ajouter une promotion</h3>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField control={form.control} name="title" render={({ field }) => (
                                <FormItem><FormLabel>Titre</FormLabel><FormControl><Input placeholder="Offre Spéciale..." {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                             <FormField control={form.control} name="description" render={({ field }) => (
                                <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="Description de la promotion..." {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="type" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type de Média</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            <SelectItem value="image">Image</SelectItem>
                                            <SelectItem value="video">Vidéo</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />
                             <FormField control={form.control} name="media" render={({ field: { onChange, ...rest } }) => (
                                <FormItem>
                                    <FormLabel>Fichier Média</FormLabel>
                                    <FormControl><Input type="file" accept="image/*,video/*" onChange={(e) => { const file = e.target.files?.[0]; if(file) onChange(file); }} {...rest} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Ajout en cours..." : "Ajouter la promotion"}</Button>
                        </form>
                    </Form>
                </div>
                <div>
                    <h3 className="text-lg font-medium mb-4">Promotions existantes</h3>
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                        {loading ? (
                            [...Array(2)].map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-lg" />)
                        ) : promotions.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-8">Aucune promotion à afficher.</p>
                        ) : (
                            promotions.map(item => (
                                <div key={item.id} className="p-3 rounded-lg border bg-card flex gap-4 items-center">
                                    <div className="relative w-24 h-16 rounded-md overflow-hidden shrink-0 bg-muted">
                                        {item.type === 'image' ? (
                                            <Image src={item.src} alt={item.title} fill className="object-cover" />
                                        ) : (
                                            <video src={item.src} className="w-full h-full object-cover" muted />
                                        )}
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-semibold leading-tight">{item.title}</p>
                                        <p className="text-sm text-muted-foreground truncate">{item.description}</p>
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
                                                        Cette action est irréversible et supprimera définitivement la promotion.
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

export default AdminCarouselManager;
