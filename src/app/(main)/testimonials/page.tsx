import { getReviews } from '@/firebase/services';
import TestimonialsClientPage from './client-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Avis Clients et Témoignages sur TTR Gestion',
    description: 'Découvrez les avis authentiques de nos utilisateurs. Professionnels, artisans et PME partagent leur expérience avec notre logiciel de gestion tout-en-un.',
};

export default async function TestimonialsPage() {
    const testimonials = await getReviews();
    
    return <TestimonialsClientPage testimonials={testimonials} />;
}
