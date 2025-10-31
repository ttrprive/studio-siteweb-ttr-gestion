import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité',
  description: 'Consultez notre politique de confidentialité pour comprendre comment nous collectons, utilisons et protégeons vos données sur TTR Gestion.',
};

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-bold font-headline mb-4">{title}</h2>
        <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">{children}</div>
    </div>
);

export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 py-12 md:px-6 md:py-20">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl font-headline">
                    Politique de Confidentialité
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">Dernière mise à jour : 25 Juillet 2024</p>
            </div>
            
            <Section title="1. Notre engagement envers votre vie privée">
                <p>
                    Chez TTR Gestion ("nous", "notre"), la protection de vos données est une priorité absolue. Cette politique de confidentialité explique de manière transparente quelles informations nous collectons, pourquoi nous le faisons, et comment nous garantissons leur sécurité. En utilisant notre application, vous nous confiez vos informations, et nous prenons cette responsabilité très au sérieux.
                </p>
            </Section>

            <Section title="2. Les informations que nous collectons">
                <p>
                    Pour vous offrir un service performant, nous sommes amenés à collecter différents types d'informations :
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li>
                        <strong>Informations liées à votre compte :</strong> Lors de votre inscription, nous collectons des informations de base comme votre nom, prénom, et adresse e-mail pour créer et sécuriser votre compte.
                    </li>
                    <li>
                        <strong>Données de votre entreprise :</strong> Toutes les informations que vous saisissez dans l'application (transactions financières, fiches clients, inventaire, réservations) sont stockées de manière sécurisée pour que vous puissiez y accéder à tout moment. Elles restent votre propriété exclusive.
                    </li>
                    <li>
                        <strong>Données techniques d'utilisation :</strong> Nous pouvons collecter des informations anonymes sur l'utilisation de l'application (type de navigateur, pages visitées) afin d'améliorer la performance globale, de corriger des bugs et de renforcer la sécurité.
                    </li>
                </ul>
            </Section>

            <Section title="3. Comment nous utilisons vos données">
                <p>
                    Vos données ne sont utilisées que dans un seul et unique but : vous fournir le meilleur service possible.
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>Pour faire fonctionner l'application :</strong> Vos données sont essentielles pour que des fonctionnalités comme la trésorerie, la gestion client ou le stock fonctionnent correctement.</li>
                    <li><strong>Pour améliorer votre expérience :</strong> Analyser les tendances d'utilisation générales nous aide à développer de nouvelles fonctionnalités utiles et à rendre l'application plus intuitive.</li>
                    <li><strong>Pour vous assister :</strong> Si vous nous contactez, notre équipe de support peut avoir besoin d'accéder à certaines informations pour répondre à vos questions et résoudre efficacement vos problèmes.</li>
                    <li><strong>Pour assurer la sécurité :</strong> Nous surveillons l'activité pour prévenir la fraude, protéger votre compte et nous conformer à nos obligations légales.</li>
                </ul>
                <p>
                    <strong>Notre promesse : nous ne vendrons, ne louerons et ne partagerons jamais vos données personnelles à des tiers à des fins marketing.</strong>
                </p>
            </Section>
            
            <Section title="4. Partage et sécurité des données">
                <p>
                    Nous ne partageons vos données que lorsque cela est absolument nécessaire :
                </p>
                 <ul className="list-disc list-inside space-y-2">
                    <li><strong>Avec des partenaires techniques de confiance :</strong> Nous utilisons des services de pointe comme Google Cloud Platform pour héberger vos données de manière hautement sécurisée. Ces partenaires sont soumis à des obligations de confidentialité et de sécurité très strictes.</li>
                    <li><strong>Pour des raisons légales :</strong> Si la loi nous y oblige, nous pourrions être amenés à divulguer certaines informations pour répondre à une demande légale (par exemple, une ordonnance du tribunal) ou pour protéger nos droits et nos utilisateurs.</li>
                </ul>
                <p>
                    Nous mettons en œuvre des mesures de sécurité robustes, incluant le chiffrement des données en transit et au repos, ainsi que des contrôles d'accès stricts, pour garantir que seules les personnes autorisées puissent accéder à vos informations.
                </p>
            </Section>
            
            <Section title="5. Vos droits et le contrôle de vos données">
                <p>
                    Vous restez maître de vos informations. Conformément au RGPD, vous disposez de plusieurs droits :
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>Droit d'accès et de rectification :</strong> Vous pouvez à tout moment accéder à vos données et les modifier directement depuis les paramètres de votre compte.</li>
                    <li><strong>Droit à la portabilité :</strong> Vous pouvez demander à recevoir une copie de vos données dans un format structuré et exploitable.</li>
                     <li><strong>Droit à l'effacement :</strong> Vous avez le droit de demander la suppression de votre compte et des données qui y sont associées, sous réserve de nos obligations légales de conservation.</li>
                </ul>
                 <p>
                    Pour exercer ces droits, il vous suffit de nous contacter via notre page de support. Nous conserverons vos données tant que votre compte est actif et selon les exigences légales.
                </p>
            </Section>

            <Section title="6. Évolution de cette politique">
                <p>
                    Nous pourrons être amenés à mettre à jour cette politique pour refléter les évolutions de nos services ou de la législation. En cas de changement majeur, nous nous engageons à vous en informer directement par e-mail ou via une notification visible dans l'application.
                </p>
            </Section>
            
            <Section title="7. Contact">
                <p>
                    Pour toute question relative à cette politique de confidentialité ou à la gestion de vos données personnelles, n'hésitez pas à nous contacter via la section "Support" de notre site.
                </p>
            </Section>
        </div>
    </main>
  );
}
