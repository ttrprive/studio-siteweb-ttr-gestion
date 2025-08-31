
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Handshake, Info, Shield, FileText, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import LoaderLink from "@/components/loader-link";
import CornerDecoration from "@/components/corner-decoration";
import { useRouter } from "next/navigation";
import { addSupportMessage } from "@/firebase/services";


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
      question: "TTR Gestion est-il adapté à mon secteur d'activité ?",
      answer: "Absolument. TTR Gestion a été conçu pour être incroyablement flexible. Que vous soyez dans la restauration, la santé, le commerce de détail, l'artisanat ou consultant, notre application s'adapte à vos besoins spécifiques. Vous pouvez même personnaliser les types de prestations pour qu'ils correspondent parfaitement à votre métier.",
      link: "/sectors"
    },
    {
      value: "item-2",
      question: "En quoi TTR Gestion peut-il simplifier ma gestion financière ?",
      answer: "Notre module 'Trésorerie' centralise toutes vos entrées et sorties d'argent. En un coup d'œil, vous suivez vos revenus, vos dépenses et connaissez votre solde de caisse en temps réel. Fini les tableurs compliqués, vous avez une vue claire et instantanée de votre santé financière.",
      link: "/manual#tresorerie"
    },
    {
      value: "item-3",
      question: "Comment l'assistant IA 'TRIX Business' peut-il m'aider concrètement ?",
      answer: "TRIX Business est comme avoir un consultant personnel disponible 24/7. Posez-lui des questions sur vos stratégies marketing, financières ou de gestion, et il vous fournira des conseils pratiques et des analyses basées sur les meilleures pratiques. C'est un véritable copilote pour accélérer votre croissance.",
      link: "/ia"
    },
    {
      value: "item-4",
      question: "La gestion de plusieurs employés est-elle possible ?",
      answer: "Oui, notre mode administrateur vous permet de créer des comptes pour vos employés et de gérer leurs permissions d'accès. Vous pouvez décider qui a accès à la trésorerie, à la gestion des clients, etc. C'est une solution idéale pour les équipes en croissance.",
      link: "/manual#utilisateurs"
    },
    {
      value: "item-5",
      question: "Est-ce que mes données sont en sécurité ?",
      answer: "La sécurité est notre priorité absolue. Vos données sont hébergées sur l'infrastructure sécurisée de Google. L'architecture de TTR Gestion garantit que vous êtes la seule personne à pouvoir accéder à vos informations. De plus, le journal d'activité vous offre une traçabilité complète de chaque action effectuée.",
      link: "/privacy"
    },
    {
      value: "item-6",
      question: "Comment puis-je suivre les paiements de mes clients ?",
      answer: "La section 'Clients' est faite pour ça. Chaque fiche client affiche un solde en temps réel (total facturé vs total payé). Vous pouvez enregistrer des paiements partiels ou complets directement depuis leur profil, ce qui simplifie énormément le suivi des créances.",
      link: "/manual#clients"
    },
    {
      value: "item-7",
      question: "Je vends des produits. Y a-t-il une gestion de stock ?",
      answer: "Oui ! Notre module de gestion de stock vous permet de suivre votre inventaire, d'ajuster les quantités et de définir des seuils d'alerte pour ne jamais être en rupture. C'est un outil puissant pour optimiser vos commandes et éviter les pertes.",
      link: "/manual#stock"
    },
    {
        value: "item-8",
        question: "Puis-je essayer TTR Gestion avant de m'engager ?",
        answer: "Bien sûr. Nous proposons une période d'essai gratuite complète, sans carte de crédit requise. Vous pouvez explorer toutes les fonctionnalités et voir par vous-même comment l'application peut transformer votre quotidien. Créez votre compte en quelques clics et commencez dès maintenant.",
        link: "#"
    },
    {
        value: "item-9",
        question: "L'application est-elle compliquée à prendre en main ?",
        answer: "Pas du tout. La simplicité est au cœur de notre conception. L'interface est pensée pour être intuitive, même sans aucune connaissance technique. De plus, notre manuel d'utilisation détaillé et nos tutoriels vidéo sont là pour vous guider à chaque étape.",
        link: "/manual"
    },
    {
        value: "item-10",
        question: "Quels sont les avantages par rapport à un simple tableur ?",
        answer: "TTR Gestion va bien au-delà d'un tableur. Il automatise les calculs, centralise vos données (clients, ventes, stock), offre une vue d'ensemble en temps réel avec des graphiques, sécurise vos informations et vous fait gagner un temps précieux en évitant la double saisie et les erreurs. C'est un système intégré pour piloter, et non juste lister.",
        link: "/details"
    }
]

export default function SupportPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  
  const messageValue = form.watch("message");

  useEffect(() => {
    if (messageValue === "TTRGESTION77@connectme") {
      router.push("/login");
    }
  }, [messageValue, router]);
  
  useEffect(() => {
    document.title = 'Support & Aide | TTR GESTION';

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };

    let script = document.getElementById('faq-schema') as HTMLScriptElement | null;
    if (!script) {
        script = document.createElement('script');
        script.id = 'faq-schema';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
    }
    script.innerHTML = JSON.stringify(jsonLd);
    
    // Cleanup script on component unmount
    return () => {
        const scriptToRemove = document.getElementById('faq-schema');
        if (scriptToRemove) {
            document.head.removeChild(scriptToRemove);
        }
    };
  }, []);


  async function onSubmit(data: FormData) {
    setIsSubmitting(true);
    try {
      await addSupportMessage(data);
      toast({
        title: "Message envoyé !",
        description: "Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.",
      });
      form.reset();
    } catch (error) {
       toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                  </Button>
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
                <a href="mailto:support@ttrgestion.site" className="hover:underline">support@ttrgestion.site</a>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Ressources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
                <LoaderLink href="/shareholder" className="flex items-center justify-between p-2 -m-2 rounded-md hover:bg-muted">
                    <div className="flex items-center gap-3">
                        <Handshake className="size-5 text-muted-foreground" />
                        <span className="text-sm">Devenir actionnaire</span>
                    </div>
                    <ChevronRight className="size-4 text-muted-foreground" />
                </LoaderLink>
                <LoaderLink href="/about" className="flex items-center justify-between p-2 -m-2 rounded-md hover:bg-muted">
                    <div className="flex items-center gap-3">
                        <Info className="size-5 text-muted-foreground" />
                        <span className="text-sm">À propos de TTR Gestion</span>
                    </div>
                    <ChevronRight className="size-4 text-muted-foreground" />
                </LoaderLink>
                <LoaderLink href="/privacy" className="flex items-center justify-between p-2 -m-2 rounded-md hover:bg-muted">
                    <div className="flex items-center gap-3">
                        <Shield className="size-5 text-muted-foreground" />
                        <span className="text-sm">Politique de confidentialité</span>
                    </div>
                    <ChevronRight className="size-4 text-muted-foreground" />
                </LoaderLink>
                <LoaderLink href="/terms" className="flex items-center justify-between p-2 -m-2 rounded-md hover:bg-muted">
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
            <h2 className="text-3xl font-bold tracking-tight">Questions fréquentes (FAQ)</h2>
            <p className="mt-4 text-lg text-muted-foreground">Trouvez les réponses à vos questions les plus courantes.</p>
        </div>
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {faqItems.map(item => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger className="text-left text-lg">{item.question}</AccordionTrigger>
              <AccordionContent>
                <p className="mb-4 text-base text-muted-foreground leading-relaxed">{item.answer}</p>
                <Button variant="link" asChild className="p-0 h-auto">
                  <LoaderLink href={item.link}>En savoir plus <ChevronRight className="ml-1 size-4" /></LoaderLink>
                </Button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  );
}
