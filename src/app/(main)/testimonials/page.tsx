
import { getReviews } from '@/firebase/services';
import TestimonialsClientPage from './client-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Avis et Témoignages',
    description: 'Découvrez ce que nos utilisateurs pensent de TTR Gestion. Des avis authentiques de professionnels de tous secteurs.',
};

export default async function TestimonialsPage() {
    const testimonials = await getReviews();
    
    return <TestimonialsClientPage testimonials={testimonials} />;
}
