import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité',
  description: 'Consultez notre politique de confidentialité pour comprendre comment nous collectons, utilisons et protégeons vos données sur TTR Gestion.',
};

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">{children}</div>
    </div>
);

export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 py-12 md:px-6 md:py-20">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                    Politique de Confidentialité
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">Dernière mise à jour : 25 Juillet 2024</p>
            </div>
            
            <Section title="1. Notre engagement envers votre vie privée">
                <p>
                    Chez TTR Gestion ("nous", "notre"), la protection de vos données est une priorité. Cette politique de confidentialité vous explique de manière transparente quelles informations nous collectons, pourquoi nous le faisons, et comment nous garantissons leur sécurité. En utilisant notre application, vous nous faites confiance avec vos informations, et nous prenons cette responsabilité très au sérieux.
                </p>
            </Section>

            <Section title="2. Les informations que nous collectons">
                <p>
                    Pour vous offrir un service performant, nous collectons différents types de données :
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li>
                        <strong>Informations de votre compte :</strong> Lors de votre inscription, nous vous demandons des informations de base comme votre nom, prénom, et adresse e-mail pour créer et sécuriser votre compte.
                    </li>
                    <li>
                        <strong>Données de votre entreprise :</strong> Toutes les informations que vous saisissez dans l'application (transactions financières, fiches clients, inventaire, réservations) sont stockées de manière sécurisée pour que vous puissiez y accéder à tout moment.
                    </li>
                    <li>
                        <strong>Données techniques :</strong> Nous collectons des informations anonymes sur l'utilisation de l'application (type de navigateur, pages visitées) pour améliorer la performance, corriger des bugs et renforcer la sécurité.
                    </li>
                </ul>
            </Section>

            <Section title="3. Comment nous utilisons vos données">
                <p>
                    Vos données sont utilisées dans un seul but : vous fournir le meilleur service possible.
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>Faire fonctionner l'application :</strong> Vos données sont essentielles pour que les fonctionnalités comme la trésorerie, la gestion client ou le stock fonctionnent correctement.</li>
                    <li><strong>Améliorer votre expérience :</strong> Analyser l'utilisation générale nous aide à développer de nouvelles fonctionnalités utiles et à rendre l'application plus intuitive.</li>
                    <li><strong>Vous assister :</strong> Notre équipe de support peut avoir besoin d'accéder à certaines informations pour répondre à vos questions et résoudre efficacement vos problèmes.</li>
                    <li><strong>Assurer la sécurité :</strong> Nous surveillons l'activité pour prévenir la fraude, protéger votre compte et nous conformer aux obligations légales.</li>
                </ul>
                <p>
                    <strong>Point essentiel : nous ne vendrons, ne louerons et ne partagerons jamais vos données personnelles à des tiers à des fins marketing. C'est une promesse.</strong>
                </p>
            </Section>
            
            <Section title="4. Partage et sécurité des données">
                <p>
                    Nous ne partageons vos données que lorsque c'est absolument nécessaire :
                </p>
                 <ul className="list-disc list-inside space-y-2">
                    <li><strong>Avec des partenaires techniques de confiance :</strong> Nous utilisons des services de pointe comme Google Cloud Platform pour héberger vos données de manière sécurisée. Ces partenaires sont soumis à des obligations de confidentialité strictes.</li>
                    <li><strong>Pour des raisons légales :</strong> Si la loi nous y oblige, nous pourrions être amenés à divulguer certaines informations pour répondre à une demande légale ou protéger nos utilisateurs.</li>
                </ul>
                <p>
                    Nous mettons en œuvre des mesures de sécurité robustes, incluant le chiffrement des données et des contrôles d'accès stricts, pour garantir que seules les personnes autorisées puissent y accéder.
                </p>
            </Section>
            
            <Section title="5. Vos droits et le contrôle de vos données">
                <p>
                    Vous restez maître de vos informations. Conformément au RGPD, vous disposez de plusieurs droits :
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>Droit d'accès et de rectification :</strong> Vous pouvez à tout moment accéder à vos données et les modifier directement depuis l'application.</li>
                    <li><strong>Droit à l'effacement ("droit à l'oubli") :</strong> Vous pouvez demander la suppression complète de votre compte et de vos données.</li>
                    <li><strong>Droit à la portabilité :</strong> Vous pouvez demander à recevoir une copie de vos données dans un format exploitable.</li>
                </ul>
                 <p>
                    Pour exercer ces droits, il vous suffit de nous contacter via notre page de support. Nous conserverons vos données tant que votre compte est actif. Si vous décidez de le fermer, nous les supprimerons de manière sécurisée.
                </p>
            </Section>

            <Section title="6. Évolution de cette politique">
                <p>
                    Nous pourrons mettre à jour cette politique pour refléter les évolutions de nos services ou de la législation. En cas de changement majeur, nous vous en informerons directement par e-mail ou via une notification dans l'application.
                </p>
            </Section>
            
            <Section title="7. Contact">
                <p>
                    Pour toute question relative à cette politique ou à vos données personnelles, n'hésitez pas à nous contacter via la section "Support" de notre site.
                </p>
            </Section>
        </div>
    </main>
  );
}
