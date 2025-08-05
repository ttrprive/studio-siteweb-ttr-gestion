
// src/firebase/services.ts
import { db } from './config';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, serverTimestamp, where, updateDoc } from 'firebase/firestore';
import type { Testimonial } from '@/types/testimonial';
import type { NewsItem, NewsItemCreate } from '@/types/news';
import type { Promotion, PromotionCreate } from '@/types/promotion';
import type { SupportMessage, SupportMessageCreate } from '@/types/support';

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
      approved: true,
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
    // Correction pour éviter l'erreur d'index composite.
    // On récupère les documents triés par date, puis on filtre côté client.
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const reviews: Testimonial[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // On filtre ici pour ne garder que les avis approuvés.
      if (data.approved === true) {
        reviews.push({
          id: doc.id,
          name: data.name,
          role: data.role,
          avatar: data.avatar || `https://i.pravatar.cc/150?u=${doc.id}`,
          rating: data.rating,
          quote: data.review,
        });
      }
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

export const deleteNews = async (id: string) => {
  if (!db) {
    console.error("Firestore is not initialized.");
    throw new Error("La base de données n'est pas configurée.");
  }
  try {
    await deleteDoc(doc(db, 'news', id));
  } catch (error) {
    console.error("Erreur lors de la suppression de l'actualité : ", error);
    throw new Error("Impossible de supprimer l'actualité.");
  }
};

export const updateNews = async (id: string, data: { title: string; description: string; }) => {
  if (!db) {
    console.error("Firestore is not initialized.");
    throw new Error("La base de données n'est pas configurée.");
  }
  try {
    const newsRef = doc(db, 'news', id);
    await updateDoc(newsRef, data);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'actualité : ", error);
    throw new Error("Impossible de mettre à jour l'actualité.");
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


// ====== SUPPORT MESSAGES ======

export const addSupportMessage = async (message: SupportMessageCreate) => {
  if (!db) {
    console.error("Firestore is not initialized.");
    throw new Error("La base de données n'est pas configurée.");
  }
  try {
    await addDoc(collection(db, 'supportMessages'), {
      ...message,
      createdAt: serverTimestamp(),
      read: false,
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi du message de support : ", error);
    throw new Error("Impossible d'envoyer le message.");
  }
};

export const getSupportMessages = async (): Promise<SupportMessage[]> => {
  if (!db) {
    console.error("Firestore is not initialized.");
    return [];
  }
  try {
    const q = query(collection(db, 'supportMessages'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const messages: SupportMessage[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      messages.push({
        id: doc.id,
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        read: data.read,
        createdAt: data.createdAt,
      });
    });
    return messages;
  } catch (error) {
    console.error("Erreur lors de la récupération des messages de support : ", error);
    return [];
  }
};

export const updateSupportMessageReadStatus = async (id: string, read: boolean) => {
  if (!db) {
    console.error("Firestore is not initialized.");
    throw new Error("La base de données n'est pas configurée.");
  }
  try {
    const messageRef = doc(db, 'supportMessages', id);
    await updateDoc(messageRef, { read });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du message : ", error);
    throw new Error("Impossible de mettre à jour le message.");
  }
};
