
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Handshake, Info, Shield, FileText, ChevronRight } from "lucide-react";
import type { Metadata } from 'next';
import { useEffect } from "react";
import LoaderLink from "@/components/loader-link";
import CornerDecoration from "@/components/corner-decoration";

// Note: Dynamic metadata generation is commented out as this is a client component.
// For full SEO, this page could be refactored into a Server Component.
// export const metadata: Metadata = {
//   title: 'Support & Aide',
//   description: 'Contactez notre équipe pour toute question ou demande d\'assistance. Trouvez des réponses rapides dans notre FAQ et le manuel d\'utilisation.',
// };


const formSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  email: z.string().email("L'adresse email est invalide."),
  subject: z.string().min(5, "L'objet doit contenir au moins 5 caractères."),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères."),
});

type FormData = z.infer<typeof formSchema>;

const faqItems = [
  {
    value: "item-1",
    question: "Comment démarrer avec TTR Gestion ?",
    answer: "Pour commencer, explorez le tableau de bord pour avoir un aperçu de vos activités. Notre manuel complet vous guide à chaque étape.",
    link: "/manual#dashboard"
  },
  {
    value: "item-2",
    question: "Comment ajouter un nouveau client ?",
    answer: "Rendez-vous dans la section 'Clients' et cliquez sur le bouton 'Ajouter'. Pour plus de détails, consultez le manuel.",
    link: "/manual#clients"
  },
  {
    value: "item-3",
    question: "Où puis-je voir mes revenus et dépenses ?",
    answer: "La section 'Trésorerie' vous donne une vue détaillée de vos finances. Le manuel explique comment interpréter les données.",
    link: "/manual#tresorerie"
  },
  {
    value: "item-4",
    question: "Est-ce que mes données sont en sécurité ?",
    answer: "Absolument. Vos données sont hébergées sur l'infrastructure sécurisée de Google. L'architecture de TTR Gestion garantit que vous êtes la seule personne à pouvoir y accéder. Plus d'informations dans la section sécurité du manuel.",
    link: "/manual#securite"
  }
]

export default function SupportPage() {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  
  useEffect(() => {
    document.title = 'Support & Aide | TTR GESTION';
  }, []);


  function onSubmit(data: FormData) {
    console.log(data);
    toast({
      title: "Message envoyé !",
      description: "Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.",
    });
    form.reset();
  }

  return (
    <main className="container mx-auto px-4 py-12 md:px-6 md:py-20 relative overflow-hidden">
      <CornerDecoration src="/photoblanc.png" position="top-right" className="translate-x-1/3 -translate-y-1/3" />
      <CornerDecoration src="/photobleu.png" position="bottom-left" className="-translate-x-1/3 translate-y-1/3" />
      <div className="mx-auto max-w-4xl text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Support & Aide
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Besoin d'aide ou une question ? Nous sommes là pour vous aider.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-5">
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Envoyez-nous un message</CardTitle>
              <CardDescription>Remplissez le formulaire ci-dessous et notre équipe vous recontactera.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Votre nom</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Votre email</FormLabel>
                          <FormControl>
                            <Input placeholder="email@exemple.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Objet</FormLabel>
                        <FormControl>
                          <Input placeholder="Question sur la facturation" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Votre message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Bonjour, j'aimerais savoir..." className="min-h-[120px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Envoyer le message</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8 md:col-span-2">
           <Card>
            <CardHeader>
              <CardTitle>Nos coordonnées</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Mail className="size-5 text-muted-foreground" />
                <a href="mailto:support@exemple.com" className="hover:underline">support@exemple.com</a>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="size-5 text-muted-foreground" />
                <span>+33 1 23 45 67 89</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Ressources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
                <LoaderLink href="#" className="flex items-center justify-between p-2 -m-2 rounded-md hover:bg-muted">
                    <div className="flex items-center gap-3">
                        <Handshake className="size-5 text-muted-foreground" />
                        <span className="text-sm">Devenir actionnaire</span>
                    </div>
                    <ChevronRight className="size-4 text-muted-foreground" />
                </LoaderLink>
                <LoaderLink href="#" className="flex items-center justify-between p-2 -m-2 rounded-md hover:bg-muted">
                    <div className="flex items-center gap-3">
                        <Info className="size-5 text-muted-foreground" />
                        <span className="text-sm">À propos de TTR Gestion</span>
                    </div>
                    <ChevronRight className="size-4 text-muted-foreground" />
                </LoaderLink>
                <LoaderLink href="#" className="flex items-center justify-between p-2 -m-2 rounded-md hover:bg-muted">
                    <div className="flex items-center gap-3">
                        <Shield className="size-5 text-muted-foreground" />
                        <span className="text-sm">Politique de confidentialité</span>
                    </div>
                    <ChevronRight className="size-4 text-muted-foreground" />
                </LoaderLink>
                <LoaderLink href="#" className="flex items-center justify-between p-2 -m-2 rounded-md hover:bg-muted">
                    <div className="flex items-center gap-3">
                        <FileText className="size-5 text-muted-foreground" />
                        <span className="text-sm">Politique d'utilisation</span>
                    </div>
                    <ChevronRight className="size-4 text-muted-foreground" />
                </LoaderLink>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-20">
        <div className="mx-auto max-w-4xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Manuel d'utilisation & FAQ</h2>
            <p className="mt-4 text-lg text-muted-foreground">Les réponses à vos questions les plus courantes.</p>
        </div>
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {faqItems.map(item => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
              <AccordionContent>
                <p className="mb-4">{item.answer}</p>
                <Button variant="link" asChild className="p-0 h-auto">
                  <LoaderLink href={item.link}>Voir le manuel détaillé</LoaderLink>
                </Button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  );
}
