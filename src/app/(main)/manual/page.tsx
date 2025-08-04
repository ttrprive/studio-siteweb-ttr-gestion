
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Manuel d'Utilisation",
  description: "Le guide complet pour maîtriser TTR Gestion. Découvrez le fonctionnement de chaque section, de la connexion à la gestion des paramètres.",
};

const Section = ({ id, title, children }: { id: string, title: string, children: React.ReactNode }) => (
    <section id={id} className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6 pb-2 border-b-2 border-primary/20">{title}</h2>
        {children}
    </section>
);

const SectionContent = ({ text, customText }: { text: string, customText: string }) => (
    <div className="max-w-3xl mx-auto text-center">
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{text}</p>
        <p className="text-md text-muted-foreground italic">
            {customText}
        </p>
    </div>
);


export default function ManualPage() {
    return (
        <main className="container mx-auto px-4 py-12 md:px-6 md:py-20">
            <div className="mx-auto max-w-4xl text-center mb-16">
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Manuel d'Utilisation
                </h1>
                <p className="mt-6 text-lg text-muted-foreground">
                    Un écosystème complet pour votre entreprise. TTR Gestion est conçu pour être un outil tout-en-un, simple et puissant. Découvrez ci-dessous le détail de chaque module pour maîtriser pleinement votre application.
                </p>
            </div>

            <div className="max-w-5xl mx-auto">
                <Section id="connexion" title="Connexion et Gestion de Compte">
                    <SectionContent 
                        text="Créez votre compte administrateur et votre espace de travail. Connectez-vous en tant qu'administrateur ou employé. Pour plus de sécurité et de rapidité, activez la connexion par code PIN dans les paramètres. La puissance de TTR Gestion commence par un accès sécurisé et personnalisé, vous donnant le contrôle total dès la première seconde."
                        customText="La première étape vers une gestion maîtrisée est un accès simple et sécurisé à votre univers de travail."
                    />
                </Section>

                <Section id="dashboard" title="Tableau de Bord">
                    <SectionContent 
                        text="Votre cockpit. Obtenez une vue d'ensemble instantanée de votre activité : statistiques clés (réservations, dépenses), actions rapides, conseil du jour personnalisé par l'IA et activité récente. Chaque élément du tableau de bord vous donne une information vitale, transformant des données brutes en décisions éclairées."
                        customText="Ici, chaque information est une opportunité, transformant la complexité en clarté pour un pilotage optimal."
                    />
                </Section>

                <Section id="trix-business" title="TRIX Business (Assistant IA)">
                    <SectionContent 
                        text="Votre consultant IA personnel. Posez des questions sur le marketing, la finance, ou la gestion et obtenez des stratégies et des conseils pratiques pour votre entreprise. Une simple interaction vous connecte à une intelligence artificielle de pointe, prête à propulser votre stratégie au niveau supérieur."
                        customText="Laissez l'intelligence artificielle devenir votre alliée stratégique pour prendre des décisions plus éclairées et innovantes."
                    />
                </Section>
                
                <Section id="prestations" title="Gestion des Prestations (Réservations, Ventes...)">
                    <SectionContent 
                        text="Le cœur de votre activité. Enregistrez et suivez toutes vos prestations (réservations, commandes, ventes) avec un statut clair. Imprimez des reçus professionnels pour vos clients. Chaque prestation enregistrée est un pas de plus vers une organisation sans faille."
                        customText="Organisez le pilier de votre chiffre d'affaires avec une fluidité qui libère votre temps pour l'essentiel : vos clients."
                    />
                </Section>

                <Section id="clients" title="Gestion des Clients">
                    <SectionContent 
                        text="Centralisez les informations de vos clients. Créez des fiches détaillées, suivez les soldes (total facturé vs total payé) et encaissez des paiements directement depuis leur profil. Consulter un profil client vous ouvre un univers d'informations, simplifiant la relation et la gestion financière."
                        customText="Transformez votre base de données clients en un véritable atout pour une relation personnalisée et un suivi financier impeccable."
                    />
                </Section>
                
                <Section id="tresorerie" title="Trésorerie">
                     <SectionContent 
                        text="Maîtrisez vos finances. Suivez toutes les entrées (revenus rapides, paiements clients) et sorties d'argent (dépenses) pour connaître votre solde de caisse en temps réel. La clarté financière est à portée de main, vous donnant une tranquillité d'esprit inégalée."
                        customText="La santé de votre entreprise se reflète dans ses chiffres ; visualisez-la avec une simplicité déconcertante."
                    />
                </Section>

                <Section id="stock" title="Gestion de Stock">
                    <SectionContent 
                        text="Suivez votre inventaire, définissez des seuils d'alerte pour éviter les ruptures, et ajustez facilement les quantités lors des réapprovisionnements ou des ventes. La gestion de stock, autrefois complexe, devient un jeu d'enfant avec des mises à jour rapides."
                        customText="Anticipez les besoins et optimisez vos ressources pour que votre inventaire travaille pour vous, et non l'inverse."
                    />
                </Section>

                <Section id="investissements" title="Suivi des Investissements">
                    <SectionContent 
                        text="Planifiez et suivez la rentabilité de vos projets de développement. Évaluez le retour sur investissement attendu et prenez des décisions éclairées pour votre croissance. Chaque analyse vous rapproche de vos objectifs financiers à long terme."
                        customText="Prenez des décisions audacieuses basées sur des données fiables pour construire l'avenir de votre entreprise."
                    />
                </Section>

                <Section id="parrainage" title="Programme de Parrainage">
                    <SectionContent 
                        text="Gagnez des récompenses en recommandant TTR Gestion. Partagez votre code, suivez vos filleuls, consultez votre solde de commissions et utilisez-le pour payer votre abonnement. Monétisez votre réseau en toute simplicité."
                        customText="Faites de votre satisfaction un levier de croissance partagée et récoltez les fruits de votre confiance."
                    />
                </Section>

                <Section id="utilisateurs" title="Gestion des Utilisateurs (Admin)">
                    <SectionContent 
                        text="En tant qu'administrateur, ajoutez, modifiez ou désactivez les comptes de vos employés et gérez leurs permissions d'accès aux différentes fonctionnalités. La gestion de votre équipe est simplifiée, sécurisée et contrôlable en quelques actions."
                        customText="Déléguez en toute confiance en attribuant les bons outils aux bonnes personnes, pour une productivité d'équipe maximale."
                    />
                </Section>

                <Section id="journal" title="Journal d'Activité">
                    <SectionContent 
                        text="Une traçabilité complète pour la sécurité. Consultez un historique détaillé de chaque action effectuée dans l'application : qui a fait quoi, et quand. La transparence totale est accessible, garantissant la sécurité et la responsabilité."
                        customText="Assurez la sécurité et la transparence de vos opérations grâce à un historique complet de chaque action."
                    />
                </Section>

                <Section id="pub" title="Faire une PUB">
                    <SectionContent 
                        text="Un raccourci pour nous contacter afin de mettre en place des campagnes publicitaires ciblées pour augmenter la visibilité et les ventes de votre entreprise. Une simple prise de contact vous connecte à des opportunités de croissance exponentielle."
                        customText="Passez à la vitesse supérieure en activant des leviers marketing puissants, directement depuis votre outil de gestion."
                    />
                </Section>

                <Section id="conseils" title="Conseils & Inspirations">
                    <SectionContent 
                        text="Une sélection de proverbes et de citations sur l'entrepreneuriat pour vous motiver et vous inspirer au quotidien. Une ressource pour recevoir votre dose quotidienne de motivation."
                        customText="Nourrissez votre esprit d'entrepreneur avec des pensées qui ont forgé des succès."
                    />
                </Section>

                <Section id="jeux" title="Espace Jeux">
                    <SectionContent 
                        text="Une section de détente pour vous et vos employés. Des jeux de réflexion comme les échecs ou 2048 pour stimuler l'esprit et faire une pause productive. La performance passe aussi par la détente."
                        customText="Parce que les meilleures idées naissent souvent d'un esprit reposé, faites une pause stratégique."
                    />
                </Section>

                <Section id="tutoriels" title="Tutoriels Vidéo">
                    <SectionContent 
                        text="Accédez à des guides vidéo pour maîtriser rapidement l'application, découvrir les nouvelles fonctionnalités et optimiser votre utilisation. L'apprentissage visuel est à votre disposition pour vous rendre expert de l'outil."
                        customText="Maîtrisez chaque facette de l'outil à votre rythme grâce à des guides visuels clairs et concis."
                    />
                </Section>

                <Section id="parametres" title="Paramètres">
                    <SectionContent 
                        text="Personnalisez l'application : modifiez les infos de votre entreprise, gérez les accès, créez vos propres types de prestations, et gérez vos espaces de travail. Façonnez l'application à l'image de votre entreprise."
                        customText="Configurez l'application pour qu'elle s'adapte parfaitement à vos processus et devienne une extension de votre marque."
                    />
                </Section>

                 <div className="mt-20 text-center">
                    <h2 className="text-3xl font-bold tracking-tight">Prêt à transformer votre gestion ?</h2>
                    <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Chaque fonctionnalité est pensée pour vous donner le pouvoir. Il est temps de l'utiliser.</p>
                    <div className="mt-8">
                        <Button size="lg" asChild>
                            <Link href="#">Commencez gratuitement</Link>
                        </Button>
                    </div>
                </div>

            </div>
        </main>
    );
}
