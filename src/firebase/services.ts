
// src/firebase/services.ts
import { db } from './config';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, serverTimestamp, where, updateDoc, limit, getDoc, setDoc, onSnapshot, Query } from 'firebase/firestore';
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
      name: review.name,
      role: review.role,
      review: review.review,
      rating: review.rating,
      createdAt: serverTimestamp(),
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
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const reviews: Testimonial[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      reviews.push({
        id: doc.id,
        name: data.name,
        role: data.role,
        avatar: data.avatar || '',
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

export const getNews = async (max?: number): Promise<NewsItem[]> => {
  if (!db) {
    console.error("Firestore is not initialized.");
    return [];
  }
  try {
    let q: Query;
    if (max) {
      q = query(collection(db, 'news'), orderBy('createdAt', 'desc'), limit(max));
    } else {
      q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
    }

    const querySnapshot = await getDocs(q);
    
    const news: NewsItem[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const createdAt = data.createdAt?.seconds ? new Date(data.createdAt.seconds * 1000) : new Date();
      
      news.push({
        id: doc.id,
        title: data.title,
        description: data.description,
        category: data.category,
        date: createdAt.toISOString(),
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


// Real-time listener for news
export const getNewsRealtime = (
  callback: (news: NewsItem[]) => void,
  onError: (error: Error) => void
) => {
  if (!db) {
    const error = new Error("Firestore is not initialized.");
    console.error(error.message);
    onError(error);
    return () => {}; // Return an empty unsubscribe function
  }
  
  const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
  
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const news: NewsItem[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const createdAt = data.createdAt?.seconds ? new Date(data.createdAt.seconds * 1000) : new Date();
      
      news.push({
        id: doc.id,
        title: data.title,
        description: data.description,
        category: data.category,
        date: createdAt.toISOString(),
        imageUrl: data.imageUrl,
        createdAt: data.createdAt,
      });
    });
    callback(news);
  }, (error) => {
    console.error("Erreur lors de l'écoute des actualités en temps réel : ", error);
    onError(error);
  });

  return unsubscribe; // Return the unsubscribe function
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

// ====== SITE SETTINGS ======
const settingsDocRef = doc(db, 'settings', 'siteControls');

export const getNewsBadgeStatus = async (): Promise<boolean> => {
    if (!db) {
        console.error("Firestore is not initialized.");
        return false;
    }
    try {
        const docSnap = await getDoc(settingsDocRef);
        if (docSnap.exists()) {
            return docSnap.data().showNewsBadge || false;
        }
        return false;
    } catch (error) {
        console.error("Erreur lors de la récupération du statut du badge : ", error);
        return false;
    }
};

export const setNewsBadgeStatus = async (status: boolean): Promise<void> => {
    if (!db) {
        console.error("Firestore is not initialized.");
        throw new Error("La base de données n'est pas configurée.");
    }
    try {
        await setDoc(settingsDocRef, { showNewsBadge: status });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du statut du badge : ", error);
        throw new Error("Impossible de mettre à jour le statut du badge.");
    }
};
