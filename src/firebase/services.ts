// src/firebase/services.ts
import { db } from './config';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, serverTimestamp, where } from 'firebase/firestore';
import type { Testimonial } from '@/types/testimonial';
import type { NewsItem, NewsItemCreate } from '@/types/news';
import type { Promotion, PromotionCreate } from '@/types/promotion';

// ====== REVIEWS ======

export const addReview = async (review: { name: string; rating: number; review: string; role: string; }) => {
  if (!db) {
    console.error("Firestore is not initialized.");
    throw new Error("La base de données n'est pas configurée.");
  }
  try {
    await addDoc(collection(db, 'reviews'), {
      ...review,
      createdAt: serverTimestamp(),
      approved: false,
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'avis : ", error);
    throw new Error("Impossible d'ajouter l'avis.");
  }
};

export const getReviews = async (): Promise<Testimonial[]> => {
  if (!db) {
    console.error("Firestore is not initialized.");
    return [];
  }
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
        avatar: data.avatar || `https://i.pravatar.cc/150?u=${doc.id}`,
        rating: data.rating,
        quote: data.review,
      });
    });
    return reviews;
  } catch (error) {
    console.error("Erreur lors de la récupération des avis : ", error);
    return [];
  }
};


// ====== NEWS ======

export const addNews = async (newsItem: NewsItemCreate) => {
  if (!db) {
    console.error("Firestore is not initialized.");
    throw new Error("La base de données n'est pas configurée.");
  }
  try {
    await addDoc(collection(db, 'news'), {
      ...newsItem,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'actualité : ", error);
    throw new Error("Impossible d'ajouter l'actualité.");
  }
};

export const getNews = async (): Promise<NewsItem[]> => {
  if (!db) {
    console.error("Firestore is not initialized.");
    return [];
  }
  try {
    const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const news: NewsItem[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      news.push({
        id: doc.id,
        title: data.title,
        description: data.description,
        category: data.category,
        date: new Date(data.createdAt.seconds * 1000).toISOString(),
        imageUrl: data.imageUrl,
        createdAt: data.createdAt,
      });
    });
    return news;
  } catch (error) {
    console.error("Erreur lors de la récupération des actualités : ", error);
    return [];
  }
};

// ====== PROMOTIONS (CAROUSEL) ======

export const addPromotion = async (promotion: PromotionCreate) => {
  if (!db) {
    console.error("Firestore is not initialized.");
    throw new Error("La base de données n'est pas configurée.");
  }
  try {
    await addDoc(collection(db, 'promotions'), {
      ...promotion,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout de la promotion : ", error);
    throw new Error("Impossible d'ajouter la promotion.");
  }
};

export const getPromotions = async (): Promise<Promotion[]> => {
  if (!db) {
    console.error("Firestore is not initialized.");
    return [];
  }
  try {
    const q = query(collection(db, 'promotions'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const promotions: Promotion[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      promotions.push({
        id: doc.id,
        title: data.title,
        description: data.description,
        type: data.type,
        src: data.src,
        link: data.link,
        alt: data.alt,
        createdAt: data.createdAt,
      });
    });
    return promotions;
  } catch (error) {
    console.error("Erreur lors de la récupération des promotions : ", error);
    return [];
  }
};

export const deletePromotion = async (id: string) => {
  if (!db) {
    console.error("Firestore is not initialized.");
    throw new Error("La base de données n'est pas configurée.");
  }
  try {
    await deleteDoc(doc(db, 'promotions', id));
  } catch (error) {
    console.error("Erreur lors de la suppression de la promotion : ", error);
    throw new Error("Impossible de supprimer la promotion.");
  }
};
