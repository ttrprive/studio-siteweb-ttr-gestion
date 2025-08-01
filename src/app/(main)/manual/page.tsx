
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';
import LoaderLink from '@/components/loader-link';

export const metadata: Metadata = {
  title: "Manuel d'Utilisation",
  description: "Le guide complet pour maîtriser TTR Gestion. Découvrez le fonctionnement de chaque section, de la connexion à la gestion des paramètres.",
};

const Section = ({ id, title, children }: { id: string, title: string, children: React.ReactNode }) => (
    <section id={id} className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4 pb-2 border-b-2 border-primary/20">{title}</h2>
        {children}
    </section>
);

const SectionContent = ({ text, imageHint1, imageHint2, imageHint3 }: { text: string, imageHint1: string, imageHint2: string, imageHint3: string }) => (
    <>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{text}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card p-2 rounded-lg border border-border/20 shadow-lg aspect-video flex items-center justify-center">
                <Image src="https://placehold.co/600x400.png" alt="Exemple 1" width={600} height={400} data-ai-hint={imageHint1} className="rounded-md w-full object-cover" />
            </div>
            <div className="bg-card p-2 rounded-lg border border-border/20 shadow-lg aspect-video flex items-center justify-center">
                <Image src="https://placehold.co/600x400.png" alt="Exemple 2" width={600} height={400} data-ai-hint={imageHint2} className="rounded-md w-full object-cover" />
            </div>
            <div className="bg-card p-2 rounded-lg border border-border/20 shadow-lg aspect-video flex items-center justify-center">
                <Image src="https://placehold.co/600x400.png" alt="Exemple 3" width={600} height={400} data-ai-hint={imageHint3} className="rounded-md w-full object-cover" />
            </div>
        </div>
        <p className="text-md text-muted-foreground italic">
            Chaque clic est une action puissante qui simplifie votre gestion. L'interface est conçue pour être intuitive, vous permettant d'accomplir des tâches complexes avec une facilité déconcertante.
        </p>
    </>
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

            <div className="max-w-4xl mx-auto">
                <Section id="connexion" title="Connexion et Gestion de Compte">
                    <SectionContent 
                        text="Créez votre compte administrateur et votre espace de travail. Connectez-vous en tant qu'administrateur ou employé. Pour plus de sécurité et de rapidité, activez la connexion par code PIN dans les paramètres. La puissance de TTR Gestion commence par un accès sécurisé et personnalisé, vous donnant le contrôle total dès la première seconde."
                        imageHint1="login screen"
                        imageHint2="workspace creation"
                        imageHint3="user profile settings"
                    />
                </Section>

                <Section id="dashboard" title="Tableau de Bord">
                    <SectionContent 
                        text="Votre cockpit. Obtenez une vue d'ensemble instantanée de votre activité : statistiques clés (réservations, dépenses), actions rapides, conseil du jour personnalisé par l'IA et activité récente. Chaque clic sur le tableau de bord vous donne une information vitale, transformant des données brutes en décisions éclairées."
                        imageHint1="dashboard analytics chart"
                        imageHint2="quick actions buttons"
                        imageHint3="activity feed"
                    />
                </Section>

                <Section id="trix-business" title="TRIX Business (Assistant IA)">
                    <SectionContent 
                        text="Votre consultant IA personnel. Posez des questions sur le marketing, la finance, ou la gestion et obtenez des stratégies et des conseils pratiques pour votre entreprise. Un simple clic vous connecte à une intelligence artificielle de pointe, prête à propulser votre stratégie au niveau supérieur."
                        imageHint1="ai chat interface"
                        imageHint2="marketing strategy report"
                        imageHint3="financial advice"
                    />
                </Section>
                
                <Section id="prestations" title="Gestion des Prestations (Réservations, Ventes...)">
                    <SectionContent 
                        text="Le cœur de votre activité. Enregistrez et suivez toutes vos prestations (réservations, commandes, ventes) avec un statut clair. Imprimez des reçus professionnels pour vos clients. Chaque prestation enregistrée est un pas de plus vers une organisation sans faille, rendue possible par un simple clic."
                        imageHint1="booking calendar"
                        imageHint2="sales list"
                        imageHint3="printable receipt"
                    />
                </Section>

                <Section id="clients" title="Gestion des Clients">
                    <SectionContent 
                        text="Centralisez les informations de vos clients. Créez des fiches détaillées, suivez les soldes (total facturé vs total payé) et encaissez des paiements directement depuis leur profil. Un clic sur un client vous ouvre un univers d'informations, simplifiant la relation et la gestion financière."
                        imageHint1="client list directory"
                        imageHint2="client profile page"
                        imageHint3="payment form"
                    />
                </Section>
                
                <Section id="tresorerie" title="Trésorerie">
                     <SectionContent 
                        text="Maîtrisez vos finances. Suivez toutes les entrées (revenus rapides, paiements clients) et sorties d'argent (dépenses) pour connaître votre solde de caisse en temps réel. La clarté financière est à portée de clic, vous donnant une tranquillité d'esprit inégalée."
                        imageHint1="cash flow statement"
                        imageHint2="income expense chart"
                        imageHint3="add expense form"
                    />
                </Section>

                <Section id="stock" title="Gestion de Stock">
                    <SectionContent 
                        text="Suivez votre inventaire, définissez des seuils d'alerte pour éviter les ruptures, et ajustez facilement les quantités lors des réapprovisionnements ou des ventes. La gestion de stock, autrefois complexe, devient un jeu d'enfant avec des mises à jour en un clic."
                        imageHint1="inventory list"
                        imageHint2="low stock alert"
                        imageHint3="update stock quantity"
                    />
                </Section>

                <Section id="investissements" title="Suivi des Investissements">
                    <SectionContent 
                        text="Planifiez et suivez la rentabilité de vos projets de développement. Évaluez le retour sur investissement attendu et prenez des décisions éclairées pour votre croissance. Chaque clic vous rapproche de vos objectifs financiers à long terme."
                        imageHint1="investment portfolio"
                        imageHint2="roi calculator"
                        imageHint3="project growth chart"
                    />
                </Section>

                <Section id="parrainage" title="Programme de Parrainage">
                    <SectionContent 
                        text="Gagnez des récompenses en recommandant TTR Gestion. Partagez votre code, suivez vos filleuls, consultez votre solde de commissions et utilisez-le pour payer votre abonnement. Monétisez votre réseau d'un simple clic de partage."
                        imageHint1="referral code"
                        imageHint2="referral dashboard"
                        imageHint3="commission balance"
                    />
                </Section>

                <Section id="utilisateurs" title="Gestion des Utilisateurs (Admin)">
                    <SectionContent 
                        text="En tant qu'administrateur, ajoutez, modifiez ou désactivez les comptes de vos employés et gérez leurs permissions d'accès aux différentes fonctionnalités. La gestion de votre équipe est simplifiée, sécurisée et contrôlable en quelques clics."
                        imageHint1="user management table"
                        imageHint2="edit user permissions"
                        imageHint3="add new user"
                    />
                </Section>

                <Section id="journal" title="Journal d'Activité">
                    <SectionContent 
                        text="Une traçabilité complète pour la sécurité. Consultez un historique détaillé de chaque action effectuée dans l'application : qui a fait quoi, et quand. La transparence totale est accessible d'un clic, garantissant la sécurité et la responsabilité."
                        imageHint1="activity log feed"
                        imageHint2="audit trail"
                        imageHint3="security event"
                    />
                </Section>

                <Section id="pub" title="Faire une PUB">
                    <SectionContent 
                        text="Un raccourci pour nous contacter afin de mettre en place des campagnes publicitaires ciblées pour augmenter la visibilité et les ventes de votre entreprise. Un clic vous connecte directement à des opportunités de croissance exponentielle."
                        imageHint1="contact form advertising"
                        imageHint2="marketing campaign brief"
                        imageHint3="advertising agency"
                    />
                </Section>

                <Section id="conseils" title="Conseils & Inspirations">
                    <SectionContent 
                        text="Une sélection de proverbes et de citations sur l'entrepreneuriat pour vous motiver et vous inspirer au quotidien. Un clic pour recevoir votre dose quotidienne de motivation."
                        imageHint1="inspirational quote"
                        imageHint2="entrepreneurship book"
                        imageHint3="motivational speech"
                    />
                </Section>

                <Section id="jeux" title="Espace Jeux">
                    <SectionContent 
                        text="Une section de détente pour vous et vos employés. Des jeux de réflexion comme les échecs ou 2048 pour stimuler l'esprit et faire une pause productive. La performance passe aussi par la détente, accessible en un clic."
                        imageHint1="chess board game"
                        imageHint2="2048 game"
                        imageHint3="brain teaser"
                    />
                </Section>

                <Section id="tutoriels" title="Tutoriels Vidéo">
                    <SectionContent 
                        text="Accédez à des guides vidéo pour maîtriser rapidement l'application, découvrir les nouvelles fonctionnalités et optimiser votre utilisation. L'apprentissage visuel est à portée de clic pour vous rendre expert de l'outil."
                        imageHint1="video tutorials library"
                        imageHint2="playing video tutorial"
                        imageHint3="feature showcase"
                    />
                </Section>

                <Section id="parametres" title="Paramètres">
                    <SectionContent 
                        text="Personnalisez l'application : modifiez les infos de votre entreprise, gérez les accès, créez vos propres types de prestations, et gérez vos espaces de travail. Façonnez l'application à l'image de votre entreprise, clic après clic."
                        imageHint1="settings page"
                        imageHint2="company profile form"
                        imageHint3="manage access"
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
