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
                    Bienvenue sur TTR Gestion ("nous", "notre", "nos"). Nous nous engageons à protéger la vie privée de nos utilisateurs ("vous"). Cette politique de confidentialité explique quelles informations nous collectons lorsque vous utilisez notre application et nos services, comment nous les utilisons et les protégeons, et quels sont vos droits concernant vos données personnelles. En utilisant TTR Gestion, vous acceptez les pratiques décrites dans ce document.
                </p>
            </Section>

            <Section title="2. Collecte des Données Personnelles">
                <p>
                    Nous collectons des informations de plusieurs manières pour fournir et améliorer nos services :
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li>
                        <strong>Informations fournies directement par vous :</strong> Lors de la création de votre compte, nous collectons des informations telles que votre nom, prénom, adresse e-mail, et mot de passe. Vous pouvez également nous fournir des informations sur votre entreprise (nom, adresse, secteur d'activité).
                    </li>
                    <li>
                        <strong>Données générées par l'utilisation du service :</strong> Lorsque vous utilisez TTR Gestion, vous générez des données que nous traitons et stockons. Cela inclut, sans s'y limiter : les transactions financières (revenus, dépenses), les fiches clients (coordonnées, historique des prestations), les données de stock (produits, quantités), les réservations, les ventes, et les informations sur vos employés.
                    </li>
                    <li>
                        <strong>Données de connexion et d'utilisation :</strong> Nous collectons des informations techniques lorsque vous interagissez avec notre service, telles que votre adresse IP, le type de navigateur, le système d'exploitation, les pages visitées et l'heure de vos actions. Ces données nous aident à assurer la sécurité et à améliorer la performance de l'application.
                    </li>
                </ul>
            </Section>

            <Section title="3. Utilisation de Vos Données">
                <p>
                    Vos données sont utilisées exclusivement pour des finalités légitimes et définies :
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>Fourniture du service :</strong> Permettre le fonctionnement de toutes les fonctionnalités de l'application, comme la gestion de la trésorerie, le suivi client, la gestion de stock, etc.</li>
                    <li><strong>Amélioration et personnalisation :</strong> Analyser l'utilisation de nos services pour corriger des bugs, développer de nouvelles fonctionnalités et personnaliser votre expérience.</li>
                    <li><strong>Communication :</strong> Vous envoyer des communications importantes concernant votre compte (maintenance, mises à jour de sécurité, modifications de nos politiques) ou des informations sur nos services, si vous y avez consenti.</li>
                    <li><strong>Support client :</strong> Répondre à vos questions et résoudre les problèmes que vous rencontrez.</li>
                    <li><strong>Sécurité et conformité :</strong> Protéger notre service contre la fraude et les abus, et nous conformer à nos obligations légales.</li>
                </ul>
                <p>
                    <strong>Nous nous engageons formellement à ne jamais vendre, louer ou échanger vos données personnelles à des tiers à des fins de marketing.</strong>
                </p>
            </Section>
            
            <Section title="4. Partage et Divulgation des Données">
                <p>
                    Nous ne partageons vos données que dans des circonstances limitées :
                </p>
                 <ul className="list-disc list-inside space-y-2">
                    <li><strong>Avec des prestataires de services :</strong> Nous faisons appel à des tiers de confiance pour des services tels que l'hébergement (Google Cloud Platform), la maintenance et l'analyse. Ces prestataires n'ont accès à vos données que pour effectuer ces tâches en notre nom et sont tenus de ne pas les divulguer ou les utiliser à d'autres fins.</li>
                    <li><strong>Pour des raisons légales :</strong> Nous pouvons divulguer vos informations si nous estimons en toute bonne foi que cela est nécessaire pour (a) se conformer à une obligation légale, (b) protéger nos droits ou notre propriété, (c) prévenir une fraude ou un abus, ou (d) protéger la sécurité personnelle de nos utilisateurs ou du public.</li>
                </ul>
            </Section>

            <Section title="5. Sécurité des Données">
                <p>
                    La sécurité de vos données est notre priorité absolue. Nous mettons en œuvre des mesures techniques et organisationnelles robustes pour protéger vos informations contre l'accès non autorisé, la perte, la destruction ou l'altération.
                </p>
                 <ul className="list-disc list-inside space-y-2">
                    <li><strong>Hébergement sécurisé :</strong> Vos données sont hébergées sur l'infrastructure sécurisée de Google, qui bénéficie de protections de pointe.</li>
                    <li><strong>Chiffrement :</strong> Toutes les données sont chiffrées en transit (via TLS/SSL) et au repos.</li>
                    <li><strong>Contrôle d'accès :</strong> L'accès à vos données est strictement limité au personnel autorisé qui en a besoin pour accomplir ses missions. Nous utilisons des systèmes d'authentification forte.</li>
                </ul>
            </Section>
            
            <Section title="6. Conservation des Données">
                <p>
                    Nous conservons vos données personnelles aussi longtemps que votre compte est actif ou que nécessaire pour vous fournir nos services. Nous pouvons également conserver certaines informations pour nous conformer à nos obligations légales, résoudre des litiges et faire appliquer nos accords. Après la suppression de votre compte, vos données seront supprimées de manière sécurisée de nos systèmes dans un délai raisonnable.
                </p>
            </Section>


            <Section title="7. Vos Droits sur Vos Données">
                <p>
                    Conformément au RGPD et à la législation en vigueur, vous disposez de plusieurs droits concernant vos données :
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>Droit d'accès :</strong> Vous pouvez demander une copie des données personnelles que nous détenons à votre sujet.</li>
                    <li><strong>Droit de rectification :</strong> Vous pouvez demander la correction des informations inexactes ou incomplètes.</li>
                    <li><strong>Droit à l'effacement ("droit à l'oubli") :</strong> Vous pouvez demander la suppression de vos données personnelles, sous réserve de nos obligations légales de conservation.</li>
                    <li><strong>Droit à la limitation du traitement :</strong> Vous pouvez demander de limiter la manière dont nous utilisons vos données.</li>
                    <li><strong>Droit à la portabilité :</strong> Vous pouvez demander à recevoir vos données dans un format structuré et lisible par machine.</li>
                </ul>
                 <p>
                    Vous pouvez exercer ces droits à tout moment en nous contactant via notre page de support.
                </p>
            </Section>

            <Section title="8. Modifications de cette Politique">
                <p>
                    Nous pouvons être amenés à modifier cette politique de confidentialité pour refléter des changements dans nos pratiques ou pour des raisons opérationnelles, légales ou réglementaires. Toute modification sera publiée sur cette page avec une date de mise à jour. Si les changements sont importants, nous vous en informerons par e-mail ou via une notification dans l'application.
                </p>
            </Section>
            
            <Section title="9. Nous Contacter">
                <p>
                    Si vous avez des questions, des préoccupations ou des demandes concernant cette politique de confidentialité ou vos données personnelles, veuillez nous contacter via la section "Support" de notre site web.
                </p>
            </Section>
        </div>
    </main>
  );
}
