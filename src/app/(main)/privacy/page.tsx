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
            
            <Section title="1. Introduction">
                <p>
                    Bienvenue sur TTR Gestion. Nous nous engageons à protéger la vie privée de nos utilisateurs. Cette politique de confidentialité explique quelles informations nous collectons, comment nous les utilisons, et quels sont vos droits concernant vos données personnelles.
                </p>
            </Section>

            <Section title="2. Collecte des Données">
                <p>
                    Nous collectons les informations que vous nous fournissez directement, telles que votre nom, votre adresse e-mail et les informations de votre entreprise lors de la création de votre compte. Nous collectons également les données que vous générez en utilisant notre application, comme les transactions financières, les fiches clients et les données de stock.
                </p>
            </Section>

            <Section title="3. Utilisation des Données">
                <p>
                    Vos données sont utilisées exclusivement pour :
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li>Fournir, maintenir et améliorer nos services.</li>
                    <li>Vous permettre d'utiliser les fonctionnalités de l'application (facturation, gestion, etc.).</li>
                    <li>Communiquer avec vous, notamment pour le support client et les annonces importantes.</li>
                    <li>Assurer la sécurité de notre plateforme.</li>
                </ul>
                <p>
                    <strong>Nous ne vendons et ne vendrons jamais vos données à des tiers.</strong>
                </p>
            </Section>

            <Section title="4. Sécurité des Données">
                <p>
                    La sécurité de vos données est notre priorité absolue. Nous utilisons des mesures de sécurité de pointe, incluant le chiffrement des données en transit et au repos, et nous hébergeons nos services sur l'infrastructure sécurisée de Google. L'accès à vos données est strictement contrôlé.
                </p>
            </Section>

            <Section title="5. Vos Droits">
                <p>
                    Conformément à la réglementation en vigueur, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Vous pouvez exercer ces droits à tout moment en nous contactant via notre page de support.
                </p>
            </Section>

            <Section title="6. Modifications de cette Politique">
                <p>
                    Nous pouvons être amenés à modifier cette politique de confidentialité. Toute modification sera publiée sur cette page, et si les changements sont importants, nous vous en informerons par e-mail ou via une notification dans l'application.
                </p>
            </Section>
        </div>
    </main>
  );
}
