
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
  { value: "FM", label: "Micronésie" },
  { value: "MD", label: "Moldavie" },
  { value: "MC", label: "Monaco" },
  { value: "MN", label: "Mongolie" },
  { value: "ME", label: "Monténégro" },
  { value: "MS", label: "Montserrat" },
  { value: "MZ", label: "Mozambique" },
  { value: "MM", label: "Myanmar" },
  { value: "NA", label: "Namibie" },
  { value: "NR", label: "Nauru" },
  { value: "NP", label: "Népal" },
  { value: "NI", label: "Nicaragua" },
  { value: "NE", label: "Niger" },
  { value: "NG", label: "Nigéria" },
  { value: "NU", label: "Niue" },
  { value: "NO", label: "Norvège" },
  { value: "NC", label: "Nouvelle-Calédonie" },
  { value: "NZ", label: "Nouvelle-Zélande" },
  { value: "OM", label: "Oman" },
  { value: "UG", label: "Ouganda" },
  { value: "UZ", label: "Ouzbékistan" },
  { value: "PK", label: "Pakistan" },
  { value: "PW", label: "Palaos" },
  { value: "PS", label: "Palestine" },
  { value: "PA", label: "Panama" },
  { value: "PG", label: "Papouasie-Nouvelle-Guinée" },
  { value: "PY", label: "Paraguay" },
  { value: "NL", label: "Pays-Bas" },
  { value: "PE", label: "Pérou" },
  { value: "PH", label: "Philippines" },
  { value: "PN", label: "Îles Pitcairn" },
  { value: "PL", label: "Pologne" },
  { value: "PF", label: "Polynésie française" },
  { value: "PR", label: "Porto Rico" },
  { value: "PT", label: "Portugal" },
  { value: "QA", label: "Qatar" },
  { value: "RE", label: "La Réunion" },
  { value: "RO", label: "Roumanie" },
  { value: "GB", label: "Royaume-Uni" },
  { value: "RU", label: "Russie" },
  { value: "RW", label: "Rwanda" },
  { value: "EH", label: "Sahara occidental" },
  { value: "BL", label: "Saint-Barthélemy" },
  { value: "KN", label: "Saint-Kitts-et-Nevis" },
  { value: "SM", label: "Saint-Marin" },
  { value: "MF", label: "Saint-Martin (partie française)" },
  { value: "SX", label: "Saint-Martin (partie néerlandaise)" },
  { value: "PM", label: "Saint-Pierre-et-Miquelon" },
  { value: "VC", label: "Saint-Vincent-et-les-Grenadines" },
  { value: "SH", label: "Sainte-Hélène" },
  { value: "LC", label: "Sainte-Lucie" },
  { value: "SV", label: "Salvador" },
  { value: "WS", label: "Samoa" },
  { value: "AS", label: "Samoa américaines" },
  { value: "ST", label: "Sao Tomé-et-Principe" },
  { value: "SN", label: "Sénégal" },
  { value: "RS", label: "Serbie" },
  { value: "SC", label: "Seychelles" },
  { value: "SL", label: "Sierra Leone" },
  { value: "SG", label: "Singapour" },
  { value: "SK", label: "Slovaquie" },
  { value: "SI", label: "Slovénie" },
  { value: "SO", label: "Somalie" },
  { value: "SD", label: "Soudan" },
  { value: "SS", label: "Soudan du Sud" },
  { value: "LK", label: "Sri Lanka" },
  { value: "SE", label: "Suède" },
  { value: "CH", label: "Suisse" },
  { value: "SR", label: "Suriname" },
  { value: "SJ", label: "Svalbard et Jan Mayen" },
  { value: "SZ", label: "Eswatini" },
  { value: "SY", label: "Syrie" },
  { value: "TJ", label: "Tadjikistan" },
  { value:-1, label: "Tanzanie" },
  { value: "TD", label: "Tchad" },
  { value: "CZ", label: "Tchéquie" },
  { value: "TF", label: "Terres australes et antarctiques françaises" },
  { value: "IO", label: "Territoire britannique de l'océan Indien" },
  { value: "TH", label: "Thaïlande" },
  { value: "TL", label: "Timor oriental" },
  { value: "TG", label: "Togo" },
  { value: "TK", label: "Tokelau" },
  { value: "TO", label: "Tonga" },
  { value: "TT", label: "Trinité-et-Tobago" },
  { value: "TN", label: "Tunisie" },
  { value: "TM", label: "Turkménistan" },
  { value: "TR", label: "Turquie" },
  { value: "TV", label: "Tuvalu" },
  { value: "UA", label: "Ukraine" },
  { value: "UY", label: "Uruguay" },
  { value: "VU", label: "Vanuatu" },
  { value: "VA", label: "Vatican" },
  { value: "VE", label: "Venezuela" },
  { value: "VN", label: "Viêt Nam" },
  { value: "WF", label: "Wallis-et-Futuna" },
  { value: "YE", label: "Yémen" },
  { value: "ZM", label: "Zambie" },
  { value: "ZW", label: "Zimbabwe" },
];

const formSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  email: z.string().email("L'adresse email est invalide."),
  country: z.string().nonempty("Veuillez sélectionner votre pays."),
  company: z.string().optional(),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères."),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "Vous devez accepter les termes et conditions.",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function ServicePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const service = servicesData[slug as keyof typeof servicesData];
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      country: "",
      company: "",
      message: "",
      acceptTerms: false,
    },
  });

  if (!service) {
    return <div>Service non trouvé.</div>;
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const subject = `Demande de service: ${service.title}`;
      await addSupportMessage({ ...data, subject });
      toast({
        title: "Demande envoyée !",
        description: "Merci pour votre intérêt. Notre équipe vous recontactera très prochainement.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-12 md:px-6 md:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          {service.icon}
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {service.title}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">{service.description}</p>
        </div>

        <Card className="mb-16">
          <CardHeader>
            <CardTitle>Vos avantages avec ce service</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {service.advantages.map((advantage, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="size-5 mr-3 mt-1 shrink-0 text-green-500" />
                  <span className="text-muted-foreground">{advantage}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Intéressé(e) ? Contactez-nous</CardTitle>
            <CardDescription>Remplissez ce formulaire pour obtenir un devis ou plus d'informations. C'est simple, rapide et sans engagement.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom complet</FormLabel>
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
                        <FormLabel>Adresse e-mail</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="email@exemple.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Pays</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez votre pays" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {countries.map(c => <SelectItem key={c.value} value={c.label}>{c.label}</SelectItem>)}
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Société (Optionnel)</FormLabel>
                            <FormControl>
                            <Input placeholder="Nom de votre entreprise" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Votre projet en quelques mots</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Décrivez-nous votre besoin, vos objectifs, votre audience cible..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          J'accepte les termes et conditions.
                        </FormLabel>
                        <FormDescription>
                          En soumettant ce formulaire, vous acceptez notre politique de confidentialité.
                        </FormDescription>
                         <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" disabled={isSubmitting}>
                   {isSubmitting ? "Envoi en cours..." : "Obtenir mon devis"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

    