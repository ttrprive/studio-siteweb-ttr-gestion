import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique d\'Utilisation',
  description: 'Consultez nos conditions d\'utilisation pour comprendre les règles et directives d\'utilisation de TTR Gestion.',
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
                    En accédant et en utilisant l'application TTR Gestion ("le Service"), vous acceptez d'être lié par les présentes conditions d'utilisation ("les Conditions"). Ces Conditions s'appliquent à tous les visiteurs, utilisateurs et autres personnes qui accèdent ou utilisent le Service. Si vous n'êtes pas d'accord avec une partie des conditions, vous ne pouvez pas accéder au Service.
                </p>
            </Section>

            <Section title="2. Description du Service">
                <p>
                    TTR Gestion est une application de gestion d'entreprise qui fournit des outils pour la trésorerie, la gestion des clients, des stocks, des prestations, et plus encore. Le Service est fourni "en l'état" et "selon la disponibilité". Nous nous réservons le droit de modifier, suspendre ou cesser le Service à tout moment, avec ou sans préavis.
                </p>
            </Section>

            <Section title="3. Comptes Utilisateurs">
                <p>
                    Pour utiliser certaines fonctionnalités du Service, vous devez créer un compte. Vous vous engagez à fournir des informations exactes, complètes et à jour lors de votre inscription. Vous êtes entièrement responsable de la protection de votre mot de passe et de la sécurité de votre compte. Vous devez nous informer immédiatement de toute violation de sécurité ou de toute utilisation non autorisée de votre compte. Nous ne serons pas responsables des pertes que vous pourriez subir du fait que quelqu'un d'autre utilise votre mot de passe ou votre compte, avec ou sans votre connaissance.
                </p>
            </Section>

            <Section title="4. Utilisation Autorisée et Restrictions">
                <p>
                    Vous vous engagez à utiliser le Service uniquement à des fins légales et conformément à ces Conditions. Vous êtes responsable de toutes les données, informations et contenus que vous saisissez, téléchargez ou transmettez via l'application ("Contenu Utilisateur"). Vous ne devez pas :
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li>Utiliser le Service d'une manière qui pourrait l'endommager, le désactiver, le surcharger ou porter atteinte à tout autre utilisateur.</li>
                    <li>Tenter d'obtenir un accès non autorisé à tout compte d'utilisateur, système informatique ou réseau.</li>
                    <li>Utiliser le Service pour stocker ou transmettre du matériel illégal, diffamatoire, frauduleux ou malveillant.</li>
                    <li>Effectuer de l'ingénierie inverse, décompiler ou désassembler toute partie du Service.</li>
                </ul>
            </Section>

            <Section title="5. Abonnements et Facturation">
                <p>
                    Certaines parties du Service sont facturées sur la base d'un abonnement. Vous serez facturé à l'avance, de manière récurrente et périodique ("Cycle de Facturation"). Les cycles de facturation sont définis sur une base mensuelle ou annuelle, en fonction du type de plan d'abonnement que vous sélectionnez.
                </p>
                <p>
                    À la fin de chaque Cycle de Facturation, votre abonnement sera automatiquement renouvelé dans les mêmes conditions, sauf si vous l'annulez ou si TTR Gestion l'annule. Vous pouvez annuler le renouvellement de votre abonnement via la page de gestion de votre compte ou en contactant le support client.
                </p>
            </Section>
            
            <Section title="6. Propriété Intellectuelle">
                <p>
                    Le Service et son contenu original (à l'exclusion du Contenu Utilisateur), ses caractéristiques et ses fonctionnalités sont et resteront la propriété exclusive de TTR Gestion et de ses concédants de licence. Le Service est protégé par le droit d'auteur, les marques de commerce et d'autres lois de France et des pays étrangers. Nos marques ne peuvent être utilisées en relation avec un produit ou service sans le consentement écrit préalable de TTR Gestion.
                </p>
            </Section>

            <Section title="7. Contenu Utilisateur">
                 <p>
                    Vous conservez tous vos droits sur votre Contenu Utilisateur que vous soumettez, publiez ou affichez sur ou via le Service. En soumettant votre Contenu, vous nous accordez une licence mondiale, non exclusive et libre de droits pour utiliser, stocker, reproduire et traiter ce Contenu uniquement dans le but de vous fournir le Service.
                </p>
            </Section>

            <Section title="8. Résiliation">
                <p>
                    Nous pouvons résilier ou suspendre votre compte immédiatement, sans préavis ni responsabilité, pour quelque raison que ce soit, y compris, sans s'y limiter, si vous ne respectez pas les Conditions. En cas de résiliation, votre droit d'utiliser le Service cessera immédiatement. Si vous souhaitez résilier votre compte, vous pouvez simplement cesser d'utiliser le Service et annuler votre abonnement.
                </p>
            </Section>

            <Section title="9. Limitation de Responsabilité">
                <p>
                    En aucun cas TTR Gestion, ni ses directeurs, employés, partenaires, agents, fournisseurs ou affiliés, ne pourront être tenus responsables de tout dommage indirect, fortuit, spécial, consécutif ou punitif, y compris, sans s'y limiter, la perte de profits, de données, d'utilisation, de clientèle ou d'autres pertes immatérielles, résultant de (i) votre accès ou utilisation ou incapacité d'accéder ou d'utiliser le Service ; (ii) toute conduite ou contenu d'un tiers sur le Service ; (iii) tout contenu obtenu à partir du Service ; et (iv) l'accès, l'utilisation ou l'altération non autorisés de vos transmissions ou de votre contenu, que ce soit sur la base d'une garantie, d'un contrat, d'un délit (y compris la négligence) ou de toute autre théorie juridique.
                </p>
            </Section>

            <Section title="10. Modifications des Conditions">
                 <p>
                    Nous nous réservons le droit, à notre seule discrétion, de modifier ou de remplacer ces Conditions à tout moment. Si une révision est importante, nous nous efforcerons de fournir un préavis d'au moins 30 jours avant l'entrée en vigueur des nouvelles conditions. Ce qui constitue un changement important sera déterminé à notre seule discrétion.
                </p>
            </Section>

             <Section title="11. Loi Applicable">
                <p>
                    Ces Conditions seront régies et interprétées conformément aux lois françaises, sans égard à ses dispositions en matière de conflit de lois.
                </p>
            </Section>
        </div>
    </main>
  );
}
