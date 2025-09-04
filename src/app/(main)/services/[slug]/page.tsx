"use client";

import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Paintbrush, Megaphone, Code, Search, Mail, MessageSquare, Sparkles, Video, Palette, Users, Globe } from 'lucide-react';
import { addSupportMessage } from '@/firebase/services';

const servicesData = {
  "creation-site-web": {
    icon: <Paintbrush className="size-12 mb-4 text-primary" />,
    title: "Création de Sites Web Premium",
    description: "Un site vitrine sur-mesure, élégant et performant pour refléter l'excellence de votre marque. Conçu pour captiver et convertir.",
    advantages: [
      "Une première impression inoubliable pour vos visiteurs.",
      "Optimisation pour les moteurs de recherche (SEO) dès la conception.",
      "Entièrement responsive pour une expérience parfaite sur mobile, tablette et ordinateur.",
      "Une interface d'administration simple pour gérer votre contenu en toute autonomie.",
      "Sécurité renforcée pour protéger votre site et les données de vos utilisateurs."
    ]
  },
  "publicite-ciblee": {
    icon: <Megaphone className="size-12 mb-4 text-primary" />,
    title: "Publicité Ciblée & Gestion de Campagnes",
    description: "Atteignez vos clients idéaux là où ils se trouvent. Nous créons et gérons des campagnes publicitaires efficaces sur les réseaux sociaux et Google.",
    advantages: [
      "Un retour sur investissement maximal grâce à un ciblage ultra-précis.",
      "Augmentation rapide de votre visibilité et de votre notoriété.",
      "Génération de prospects qualifiés et augmentation de vos ventes.",
      "Rapports de performance clairs et détaillés pour suivre vos résultats.",
      "Accompagnement par des experts pour optimiser continuellement vos campagnes."
    ]
  },
  "developpement-application": {
    icon: <Code className="size-12 mb-4 text-primary" />,
    title: "Développement d'Applications Spécifiques",
    description: "Un besoin métier unique ? Nous développons des outils et applications web sur-mesure pour automatiser vos processus et améliorer votre productivité.",
    advantages: [
        "Une solution parfaitement adaptée à vos processus internes.",
        "Automatisation des tâches répétitives pour un gain de temps considérable.",
        "Amélioration de la productivité et de l'efficacité de vos équipes.",
        "Une application évolutive qui grandit avec votre entreprise.",
        "Intégration possible avec vos logiciels existants (CRM, ERP, etc.)."
    ]
  },
  "seo": {
    icon: <Search className="size-12 mb-4 text-primary" />,
    title: "Optimisation pour les Moteurs de Recherche (SEO)",
    description: "Améliorez votre visibilité sur Google et attirez plus de trafic qualifié. Nous optimisons votre site pour le classer en haut des résultats de recherche.",
    advantages: [
      "Attirez un trafic organique et qualifié, réellement intéressé par vos services.",
      "Améliorez durablement votre positionnement sur les moteurs de recherche.",
      "Augmentez la confiance et la crédibilité de votre marque.",
      "Un meilleur retour sur investissement que la publicité payante à long terme.",
      "Analyse concurrentielle pour vous démarquer de vos compétiteurs."
    ]
  },
  "creation-contenu-digital": {
    icon: <Sparkles className="size-12 mb-4 text-primary" />,
    title: "Création de Contenu Digital",
    description: "Engagez votre audience avec des visuels percutants et des contenus créatifs pour vos réseaux sociaux et campagnes marketing.",
    advantages: [
      "Des publications professionnelles qui captent l'attention.",
      "Une stratégie de contenu alignée sur vos objectifs commerciaux.",
      "Des visuels (images, infographies) qui renforcent votre image de marque.",
      "Un gain de temps considérable dans la gestion de votre communication.",
      "Une augmentation de l'engagement et de l'interaction avec votre communauté."
    ]
  },
  "montage-video": {
    icon: <Video className="size-12 mb-4 text-primary" />,
    title: "Montage Vidéo Professionnel",
    description: "Transformez vos séquences brutes en vidéos dynamiques et professionnelles pour vos publicités, formations ou réseaux sociaux.",
    advantages: [
      "Un rendu cinématographique qui valorise votre message.",
      "Des vidéos optimisées pour chaque plateforme (YouTube, Instagram, TikTok).",
      "L'intégration d'animations et d'effets pour un résultat dynamique.",
      "Un sound design et une musique qui créent une véritable ambiance.",
      "Des délais de production rapides pour répondre à vos besoins marketing."
    ]
  },
  "design-graphique": {
    icon: <Palette className="size-12 mb-4 text-primary" />,
    title: "Design Graphique & Identité Visuelle",
    description: "Créez une image de marque forte et cohérente, du logo à la charte graphique, pour vous démarquer de la concurrence.",
    advantages: [
      "Un logo mémorable et professionnel qui représente vos valeurs.",
      "Une charte graphique complète pour une communication cohérente sur tous les supports.",
      "Des supports de communication (cartes de visite, flyers) percutants.",
      "Une crédibilité et une confiance accrues auprès de vos clients.",
      "Une base solide pour toutes vos futures actions de marketing."
    ]
  },
  "gestion-reseaux-sociaux": {
    icon: <Users className="size-12 mb-4 text-primary" />,
    title: "Gestion des Réseaux Sociaux",
    description: "Développez votre communauté et engagez votre audience avec une gestion professionnelle de vos comptes sociaux.",
    advantages: [
      "Stratégie de contenu et calendrier éditorial pour une communication cohérente.",
      "Création et publication de posts engageants et adaptés à chaque plateforme.",
      "Modération active et interaction avec votre communauté pour renforcer les liens.",
      "Rapports de performance mensuels pour suivre la croissance et l'engagement."
    ]
  },
  "gestion-site-web-google-ads": {
    icon: <Globe className="size-12 mb-4 text-primary" />,
    title: "Gestion de Site Web & Google Ads",
    description: "Confiez-nous la maintenance de votre site et le pilotage de vos campagnes Google Ads pour une performance optimale et continue.",
    advantages: [
      "Mises à jour techniques, de contenu et de sécurité régulières pour votre site.",
      "Optimisation continue de la vitesse et de l'expérience utilisateur.",
      "Création, gestion et optimisation de vos campagnes publicitaires sur Google Ads.",
      "Suivi précis des conversions et reporting détaillé pour maximiser votre ROI."
    ]
  }
};

const formSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  email: z.string().email("L'adresse email est invalide."),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères."),
  contactMethod: z.enum(["email", "whatsapp"], {
    required_error: "Vous devez sélectionner une méthode de contact.",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const service = servicesData[params.slug as keyof typeof servicesData];

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      contactMethod: "email",
    },
  });

  if (!service) {
    return (
      <main className="container mx-auto px-4 py-12 md:px-6 md:py-20 text-center">
        <h1 className="text-4xl font-bold">Service non trouvé</h1>
        <p className="text-lg text-muted-foreground mt-4">Le service que vous recherchez n'existe pas.</p>
      </main>
    )
  }

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);
    try {
      if (data.contactMethod === 'whatsapp') {
        const whatsappMessage = `Bonjour, je suis intéressé par le service "${service.title}".\n\nNom: ${data.name}\nEmail: ${data.email}\n\nMessage: ${data.message}`;
        const whatsappUrl = `https://wa.me/33XXXXXXXXX?text=${encodeURIComponent(whatsappMessage)}`; // Remplacez par votre numéro
        window.open(whatsappUrl, '_blank');
        toast({
          title: "Redirection vers WhatsApp",
          description: "Préparez votre message pour l'envoyer.",
        });
      } else {
        await addSupportMessage({
          name: data.name,
          email: data.email,
          subject: `Demande de service: ${service.title}`,
          message: data.message,
        });
        toast({
          title: "Message envoyé !",
          description: "Nous avons bien reçu votre demande et nous vous répondrons par email dans les plus brefs délais.",
        });
      }
      form.reset();
    } catch (error) {
       toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <main className="container mx-auto px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-4xl text-center mb-16">
        {service.icon}
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          {service.title}
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          {service.description}
        </p>
      </div>

      <div className="grid gap-16 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold mb-6">Vos avantages</h2>
          <ul className="space-y-4">
            {service.advantages.map((advantage, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="size-6 mr-4 mt-1 shrink-0 text-green-500" />
                <span className="text-muted-foreground text-lg">{advantage}</span>
              </li>
            ))}
          </ul>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Contactez-nous pour ce service</CardTitle>
            <CardDescription>Remplissez le formulaire et nous reviendrons vers vous rapidement.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Votre nom</FormLabel>
                      <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
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
                      <FormControl><Input placeholder="email@exemple.com" {...field} /></FormControl>
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
                      <FormControl><Textarea placeholder={`Bonjour, j'aimerais en savoir plus sur "${service.title}"...`} className="min-h-[100px]" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Comment nous envoyer votre message ?</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="email" /></FormControl>
                            <FormLabel className="font-normal flex items-center gap-2"><Mail className="size-4" /> Envoyer par Email</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="whatsapp" /></FormControl>
                            <FormLabel className="font-normal flex items-center gap-2"><MessageSquare className="size-4" /> Envoyer par WhatsApp</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                   {isSubmitting
                    ? "Envoi en cours..."
                    : form.getValues("contactMethod") === 'whatsapp'
                    ? "Préparer le message WhatsApp"
                    : "Envoyer le message"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
