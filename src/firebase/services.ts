// src/firebase/services.ts
import { db } from './config';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, where } from 'firebase/firestore';
import type { Testimonial } from '@/types/testimonial';

export const addReview = async (review: { name: string; rating: number; review: string; role: string; }) => {
  try {
    await addDoc(collection(db, 'reviews'), {
      ...review,
      createdAt: serverTimestamp(),
      approved: false, // Les avis devront être approuvés
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'avis : ", error);
    throw new Error("Impossible d'ajouter l'avis.");
  }
};

export const getReviews = async (): Promise<Testimonial[]> => {
  try {
    const q = query(
      collection(db, 'reviews'),
      where('approved', '==', true),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const reviews: Testimonial[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      reviews.push({
        id: doc.id,
        name: data.name,
        role: data.role,
        avatar: data.avatar || `https://i.pravatar.cc/150?u=${doc.id}`, // Placeholder avatar
        rating: data.rating,
        quote: data.review,
      });
    });
    return reviews;
  } catch (error) {
    console.error("Erreur lors de la récupération des avis : ", error);
    return []; // Retourne un tableau vide en cas d'erreur
  }
};
