import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conditions Générales d\'Utilisation de TTR Gestion',
  description: 'Consultez nos conditions d\'utilisation. Ce document régit votre accès et votre utilisation de l\'application TTR Gestion, nos services, et nos responsabilités mutuelles.',
};

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">{children}</div>
    </div>
);

export default function TermsPage() {
  return (
    <main className="container mx-auto px-4 py-12 md:px-6 md:py-20">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                    Politique d'Utilisation
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">Dernière mise à jour : 25 Juillet 2024</p>
            </div>
            
            <Section title="1. Acceptation des Conditions">
                <p>
                    En utilisant l'application TTR Gestion ("le Service"), vous acceptez d'être lié par les présentes conditions d'utilisation ("les Conditions"). Elles définissent notre relation et les règles du jeu. Si vous n'êtes pas d'accord avec l'une de ces conditions, nous vous prions de ne pas utiliser le Service.
                </p>
            </Section>

            <Section title="2. Description du Service">
                <p>
                    TTR Gestion est une application conçue pour simplifier la gestion d'entreprise. Le Service est fourni "en l'état" et "selon la disponibilité". Nous travaillons constamment à son amélioration. Cela signifie que nous nous réservons le droit de le modifier, par exemple pour ajouter de nouvelles fonctionnalités. En cas d'opérations de maintenance importantes, nous nous efforcerons de vous en informer à l'avance.
                </p>
            </Section>

            <Section title="3. Votre Compte Utilisateur">
                <p>
                    Pour utiliser le Service, vous devez créer un compte en fournissant des informations exactes. Vous êtes responsable de la sécurité de votre mot de passe et de toute activité sur votre compte. Il est crucial de nous informer immédiatement si vous suspectez une utilisation non autorisée de votre compte. La sécurité de vos données commence par la protection de vos accès.
                </p>
            </Section>

            <Section title="4. Utilisation du Service">
                <p>
                    Nous vous faisons confiance pour utiliser TTR Gestion de manière responsable et légale. Vous êtes responsable du contenu que vous saisissez dans l'application. En retour, nous vous demandons de ne pas :
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li>Utiliser le Service d'une manière qui pourrait nuire à son fonctionnement ou à d'autres utilisateurs.</li>
                    <li>Tenter d'accéder sans autorisation à des comptes ou des données qui ne sont pas les vôtres.</li>
                    <li>Utiliser notre plateforme pour des activités illégales ou malveillantes.</li>
                    <li>Tenter de décompiler ou de copier le code de notre application.</li>
                </ul>
            </Section>

            <Section title="5. Abonnements et Facturation">
                <p>
                    Certaines fonctionnalités sont accessibles via un abonnement payant. Les frais sont facturés à l'avance, sur une base mensuelle ou annuelle, selon le plan que vous choisissez. Votre abonnement se renouvellera automatiquement à la fin de chaque période, sauf si vous l'annulez depuis votre espace de gestion ou en contactant notre support.
                </p>
            </Section>
            
            <Section title="6. Propriété Intellectuelle">
                <p>
                    Le Service, son design, son code et ses fonctionnalités originales sont la propriété exclusive de TTR Gestion. Vous restez, bien entendu, l'unique propriétaire de toutes les données et contenus que vous saisissez dans l'application. Nous n'utilisons vos données que pour vous fournir le service, et pour rien d'autre.
                </p>
            </Section>

            <Section title="7. Résiliation">
                <p>
                    Vous êtes libre de cesser d'utiliser notre service et de supprimer votre compte à tout moment. De notre côté, nous nous réservons le droit de suspendre ou de résilier votre accès si vous ne respectez pas les présentes Conditions, notamment en cas d'utilisation abusive ou illégale du service. En cas de résiliation, votre droit d'utiliser le Service cessera immédiatement.
                </p>
            </Section>

            <Section title="8. Limitation de Responsabilité">
                <p>
                    Nous nous efforçons de fournir un service fiable et performant, mais nous ne pouvons garantir qu'il sera exempt d'erreurs ou d'interruptions. TTR Gestion ne pourra être tenu responsable des dommages indirects (comme une perte de profits ou de données) résultant de votre utilisation du Service. Notre responsabilité sera, en tout état de cause, limitée au montant que vous nous avez payé au cours des douze derniers mois.
                </p>
            </Section>

            <Section title="9. Modifications des Conditions">
                 <p>
                    Le monde évolue, et notre service aussi. Nous pourrons donc être amenés à modifier ces Conditions. Si un changement est important, nous vous en informerons au moins 30 jours à l'avance. En continuant à utiliser le Service après l'entrée en vigueur des modifications, vous acceptez les nouvelles conditions.
                </p>
            </Section>

             <Section title="10. Loi Applicable">
                <p>
                    Ces Conditions sont régies par le droit français. Tout litige sera soumis à la compétence des tribunaux français.
                </p>
            </Section>
        </div>
    </main>
  );
}
