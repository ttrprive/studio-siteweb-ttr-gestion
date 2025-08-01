import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import CornerDecoration from '@/components/corner-decoration';


export const metadata: Metadata = {
  title: 'TRIX Business',
  description: 'Découvrez TRIX Business, votre assistant IA personnel pour des stratégies et des conseils pratiques pour votre entreprise.',
};

export default function IAPage() {
  return (
    <main className="container mx-auto px-4 py-12 md:px-6 md:py-20 relative overflow-hidden">
        <CornerDecoration src="/photobleu.png" position="top-right" className="translate-x-1/3 -translate-y-1/3" />
        <CornerDecoration src="/photoblanc.png" position="bottom-left" className="-translate-x-1/3 translate-y-1/3" />
        <div className="mx-auto max-w-4xl text-center">
            <div className="flex justify-center mb-6">
                <div className="size-[100px] bg-card border rounded-lg shadow-sm"></div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            TRIX Business
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
            Votre consultant IA personnel. Posez des questions sur le marketing, la finance, ou la gestion et obtenez des stratégies et des conseils pratiques pour votre entreprise. TRIX Business est conçu pour être votre copilote, vous aidant à prendre des décisions éclairées et à accélérer votre croissance.
            </p>
            <div className="mt-12">
                <Badge variant="secondary" className="text-lg py-2 px-4">Disponible Bientôt</Badge>
            </div>
        </div>
    </main>
  );
}
