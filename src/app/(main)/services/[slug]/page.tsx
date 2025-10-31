
"use client";

import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Paintbrush, Megaphone, Code, Search, Mail, MessageSquare, Sparkles, Video, Palette, Users, Globe } from 'lucide-react';
import { addSupportMessage } from '@/firebase/services';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

const countries = [
  { value: "AF", label: "Afghanistan" },
  { value: "ZA", label: "Afrique du Sud" },
  { value: "AL", label: "Albanie" },
  { value: "DZ", label: "Algérie" },
  { value: "DE", label: "Allemagne" },
  { value: "AD", label: "Andorre" },
  { value: "AO", label: "Angola" },
  { value: "AI", label: "Anguilla" },
  { value: "AQ", label: "Antarctique" },
  { value: "AG", label: "Antigua-et-Barbuda" },
  { value: "SA", label: "Arabie saoudite" },
  { value: "AR", label: "Argentine" },
  { value: "AM", label: "Arménie" },
  { value: "AW", label: "Aruba" },
  { value: "AU", label: "Australie" },
  { value: "AT", label: "Autriche" },
  { value: "AZ", label: "Azerbaïdjan" },
  { value: "BS", label: "Bahamas" },
  { value: "BH", label: "Bahreïn" },
  { value: "BD", label: "Bangladesh" },
  { value: "BB", label: "Barbade" },
  { value: "BE", label: "Belgique" },
  { value: "BZ", label: "Belize" },
  { value: "BJ", label: "Bénin" },
  { value: "BM", label: "Bermudes" },
  { value: "BT", label: "Bhoutan" },
  { value: "BY", label: "Biélorussie" },
  { value: "BO", label: "Bolivie" },
  { value: "BA", label: "Bosnie-Herzégovine" },
  { value: "BW", label: "Botswana" },
  { value: "BR", label: "Brésil" },
  { value: "BN", label: "Brunei Darussalam" },
  { value: "BG", label: "Bulgarie" },
  { value: "BF", label: "Burkina Faso" },
  { value: "BI", label: "Burundi" },
  { value: "KH", label: "Cambodge" },
  { value: "CM", label: "Cameroun" },
  { value: "CA", label: "Canada" },
  { value: "CV", label: "Cap-Vert" },
  { value: "CF", label: "République centrafricaine" },
  { value: "CL", label: "Chili" },
  { value: "CN", label: "Chine" },
  { value: "CY", label: "Chypre" },
  { value: "CO", label: "Colombie" },
  { value: "KM", label: "Comores" },
  { value: "CG", label: "Congo" },
  { value: "CD", label: "Congo (RDC)" },
  { value: "KR", label: "Corée du Sud" },
  { value: "KP", label: "Corée du Nord" },
  { value: "CR", label: "Costa Rica" },
  { value: "CI", label: "Côte d'Ivoire" },
  { value: "HR", label: "Croatie" },
  { value: "CU", label: "Cuba" },
  { value: "CW", label: "Curaçao" },
  { value: "DK", label: "Danemark" },
  { value: "DJ", label: "Djibouti" },
  { value: "DM", label: "Dominique" },
  { value: "EG", label: "Égypte" },
  { value: "AE", label: "Émirats arabes unis" },
  { value: "EC", label: "Équateur" },
  { value: "ER", label: "Érythrée" },
  { value: "ES", label: "Espagne" },
  { value: "EE", label: "Estonie" },
  { value: "US", label: "États-Unis" },
  { value: "ET", label: "Éthiopie" },
  { value: "FJ", label: "Fidji" },
  { value: "FI", label: "Finlande" },
  { value: "FR", label: "France" },
  { value: "GA", label: "Gabon" },
  { value: "GM", label: "Gambie" },
  { value: "GE", label: "Géorgie" },
  { value: "GH", label: "Ghana" },
  { value: "GI", label: "Gibraltar" },
  { value: "GR", label: "Grèce" },
  { value: "GD", label: "Grenade" },
  { value: "GL", label: "Groenland" },
  { value: "GP", label: "Guadeloupe" },
  { value: "GU", label: "Guam" },
  { value: "GT", label: "Guatemala" },
  { value: "GG", label: "Guernesey" },
  { value: "GN", label: "Guinée" },
  { value: "GQ", label: "Guinée équatoriale" },
  { value: "GW", label: "Guinée-Bissau" },
  { value: "GY", label: "Guyana" },
  { value: "GF", label: "Guyane française" },
  { value: "HT", label: "Haïti" },
  { value: "HN", label: "Honduras" },
  { value: "HK", label: "Hong Kong" },
  { value: "HU", label: "Hongrie" },
  { value: "IM", label: "Île de Man" },
  { value: "CX", label: "Île Christmas" },
  { value: "NF", label: "Île Norfolk" },
  { value: "AX", label: "Îles Åland" },
  { value: "KY", label: "Îles Caïmans" },
  { value: "CC", label: "Îles Cocos" },
  { value: "CK", label: "Îles Cook" },
  { value: "FO", label: "Îles Féroé" },
  { value: "FK", label: "Îles Malouines" },
  { value: "MP", label: "Îles Mariannes du Nord" },
  { value: "MH", label: "Îles Marshall" },
  { value: "SB", label: "Îles Salomon" },
  { value: "TC", label: "Îles Turques-et-Caïques" },
  { value: "VG", label: "Îles Vierges britanniques" },
  { value: "VI", label: "Îles Vierges américaines" },
  { value: "IN", label: "Inde" },
  { value: "ID", label: "Indonésie" },
  { value: "IR", label: "Iran" },
  { value: "IQ", label: "Irak" },
  { value: "IE", label: "Irlande" },
  { value: "IS", label: "Islande" },
  { value: "IL", label: "Israël" },
  { value: "IT", label: "Italie" },
  { value: "JM", label: "Jamaïque" },
  { value: "JP", label: "Japon" },
  { value: "JE", label: "Jersey" },
  { value: "JO", label: "Jordanie" },
  { value: "KZ", label: "Kazakhstan" },
  { value: "KE", label: "Kenya" },
  { value: "KG", label: "Kirghizistan" },
  { value: "KI", label: "Kiribati" },
  { value: "KW", label: "Koweït" },
  { value: "LA", label: "Laos" },
  { value: "LS", label: "Lesotho" },
  { value: "LV", label: "Lettonie" },
  { value: "LB", label: "Liban" },
  { value: "LR", label: "Libéria" },
  { value: "LY", label: "Libye" },
  { value: "LI", label: "Liechtenstein" },
  { value: "LT", label: "Lituanie" },
  { value: "LU", label: "Luxembourg" },
  { value: "MO", label: "Macao" },
  { value: "MK", label: "Macédoine du Nord" },
  { value: "MG", label: "Madagascar" },
  { value: "MY", label: "Malaisie" },
  { value: "MW", label: "Malawi" },
  { value: "MV", label: "Maldives" },
  { value: "ML", label: "Mali" },
  { value: "MT", label: "Malte" },
  { value: "MA", label: "Maroc" },
  { value: "MQ", label: "Martinique" },
  { value: "MU", label: "Maurice" },
  { value: "MR", label: "Mauritanie" },
  { value: "YT", label: "Mayotte" },
  { value: "MX", label: "Mexique" },
  { value'use client'

import {
  useState,
  useEffect
} from 'react'
import {
  type Testimonial
} from '@/types/testimonial'
import {
  Card,
  CardContent,
  CardHeader
} from '@/components/ui/card'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Button
} from '@/components/ui/button'
import {
  Input
} from '@/components/ui/input'
import {
  Label
} from '@/components/ui/label'
import {
  Textarea
} from '@/components/ui/textarea'
import {
  Star
} from 'lucide-react'
import {
  addReview
} from '@/firebase/services'
import {
  useToast
} from '@/hooks/use-toast'
import {
  useRouter
} from 'next/navigation'
import {
  Rating
} from '@/components/testimonials-section'
const AddReviewForm = ({
  onReviewAdded
}: {
  onReviewAdded: () => void
}) => {
  const {
    toast
  } = useToast()
  const [rating, setRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [open, setOpen] = useState(false)
  const handleSubmit = async (event: React.FormEvent < HTMLFormElement > ) => {
    event.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string
    const role = formData.get('role') as string
    const review = formData.get('review') as string
    if (rating === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une note.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }
    try {
      await addReview({
        name,
        role,
        review,
        rating
      })
      toast({
        title: "Avis ajouté !",
        description: "Merci pour votre retour.",
      })
      setOpen(false)
      onReviewAdded();
      (event.target as HTMLFormElement).reset()
      setRating(0)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  return ( <
    Dialog open = {
      open
    }
    onOpenChange = {
      setOpen
    } >
    <
    DialogTrigger asChild >
    <
    Button size = "lg" > Ajouter mon avis < /Button> <
    /DialogTrigger> <
    DialogContent className = "sm:max-w-[425px]" >
    <
    DialogHeader >
    <
    DialogTitle className = "font-headline" > Partagez votre avis < /DialogTitle> <
    DialogDescription >
    Laissez un commentaire sur votre expérience avec TTR Gestion. <
    /DialogDescription> <
    /DialogHeader> <
    form onSubmit = {
      handleSubmit
    }
    className = "space-y-4" >
    <
    div className = "grid gap-2" >
    <
    Label htmlFor = "name" > Votre nom < /Label> <
    Input id = "name"
    name = "name"
    placeholder = "John Doe"
    required / >
    <
    /div> <
    div className = "grid gap-2" >
    <
    Label htmlFor = "role" > Votre rôle / métier < /Label> <
    Input id = "role"
    name = "role"

    placeholder = "Gérant de boutique"
    required / >
    <
    /div> <
    div className = "grid gap-2" >
    <
    Label > Votre note < /Label> <
    div className = "flex items-center gap-2" > {
      [...Array(5)].map((_, index) => {
        const starValue = index + 1
        return ( <
          Star key = {
            starValue
          }
          className = {
            `size-6 cursor-pointer transition-colors ${
starValue <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'
}`
          }
          onClick = {
            () => setRating(starValue)
          }
          />
        )
      })
    } <
    /div> <
    /div> <
    div className = "grid gap-2" >
    <
    Label htmlFor = "review" > Votre avis < /Label> <
    Textarea id = "review"
    name = "review"
    placeholder = "TTR Gestion est incroyable..."
    required / >
    <
    /div> <
    DialogFooter >
    <
    Button type = "submit"
    disabled = {
      isSubmitting
    } > {
      isSubmitting ? 'Envoi en cours...' : 'Envoyer mon avis'
    } <
    /Button> <
    /DialogFooter> <
    /form> <
    /DialogContent> <
    /Dialog>
  )
}
export default function TestimonialsClientPage({
  testimonials
}: {
  testimonials: Testimonial[]
}) {
  const router = useRouter()
  const handleReviewAdded = () => {
    router.refresh()
  }
  return ( <
    main className = "container mx-auto px-4 py-12 md:px-6 md:py-20" >
    <
    div className = "mx-auto max-w-4xl text-center mb-16" >
    <
    h1 className = "text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl font-headline bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent" >
    Ce que nos utilisateurs pensent de nous <
    /h1> <
    p className = "mt-6 text-lg text-muted-foreground" >
    Les avis authentiques de ceux qui utilisent TTR Gestion au quotidien. <
    /p> <
    /div> <
    div className = "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" > {
      testimonials.map((testimonial) => ( <
        Card key = {
          testimonial.id
        }
        className = "h-full flex flex-col" >
        <
        CardHeader >
        <
        div className = "flex items-center gap-4" >
        <
        Avatar className = "border-2 border-border" >
        <
        AvatarImage src = {
          testimonial.avatar
        }
        alt = {
          testimonial.name
        }
        /> <
        AvatarFallback > {
          testimonial.name.charAt(0)
        } < /AvatarFallback> <
        /Avatar> <
        div >
        <
        p className = "font-semibold" > {
          testimonial.name
        } < /p> <
        p className = "text-sm text-muted-foreground" > {
          testimonial.role
        } < /p> <
        /div> <
        /div> <
        /CardHeader> <
        CardContent className = "flex-grow flex flex-col justify-between" >
        <
        blockquote className = "text-muted-foreground italic mb-4" >
        "{testimonial.quote}" <
        /blockquote> <
        Rating value = {
          testimonial.rating
        }
        /> <
        /CardContent> <
        /Card>
      ))
    } <
    /div> <
    div className = "mt-20 text-center" >
    <
    h2 className = "text-3xl font-bold tracking-tight font-headline" > Vous aussi, partagez votre expérience! < /h2> <
    p className = "mx-auto mt-4 max-w-2xl text-muted-foreground" >
    Votre avis est précieux.Il nous aide à nous améliorer et guide les futurs utilisateurs. <
    /p> <
    div className = "mt-8" >
    <
    AddReviewForm onReviewAdded = {
      handleReviewAdded
    }
    /> <
    /div> <
    /div> <
    /main>
  )
}
