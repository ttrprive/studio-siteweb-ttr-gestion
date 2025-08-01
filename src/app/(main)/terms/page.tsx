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
                    En accédant et en utilisant l'application TTR Gestion ("le Service"), vous acceptez d'être lié par les présentes conditions d'utilisation ("les Conditions"). Si vous n'êtes pas d'accord avec une partie des conditions, vous ne pouvez pas accéder au Service.
                </p>
            </Section>

            <Section title="2. Description du Service">
                <p>
                    TTR Gestion est une application de gestion d'entreprise qui fournit des outils pour la trésorerie, la gestion des clients, des stocks, des prestations, et plus encore. Le Service est fourni "en l'état" et nous nous réservons le droit de modifier ou de cesser le Service à tout moment.
                </p>
            </Section>

            <Section title="3. Utilisation Autorisée">
                <p>
                    Vous vous engagez à utiliser le Service uniquement à des fins légales et conformément à ces Conditions. Vous êtes responsable de toutes les données et informations que vous saisissez dans l'application. Vous ne devez pas :
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li>Utiliser le service d'une manière qui pourrait l'endommager, le désactiver ou le surcharger.</li>
                    <li>Tenter d'obtenir un accès non autorisé à tout compte d'utilisateur ou système informatique.</li>
                    <li>Utiliser le service pour stocker ou transmettre du matériel illégal.</li>
                </ul>
            </Section>

            <Section title="4. Comptes Utilisateurs">
                <p>
                    Vous êtes responsable de la protection de votre mot de passe et de la sécurité de votre compte. Vous devez nous informer immédiatement de toute utilisation non autorisée de votre compte. Nous ne serons pas responsables des pertes que vous pourriez subir du fait que quelqu'un d'autre utilise votre mot de passe ou votre compte, avec ou sans votre connaissance.
                </p>
            </Section>

            <Section title="5. Propriété Intellectuelle">
                <p>
                    Le Service et son contenu original, ses caractéristiques et ses fonctionnalités sont et resteront la propriété exclusive de TTR Gestion et de ses concédants de licence.
                </p>
            </Section>

            <Section title="6. Limitation de Responsabilité">
                <p>
                    En aucun cas TTR Gestion, ni ses directeurs, employés ou partenaires, ne pourront être tenus responsables de tout dommage indirect, fortuit, spécial, consécutif ou punitif résultant de votre accès ou de votre utilisation du Service.
                </p>
            </Section>
        </div>
    </main>
  );
}
