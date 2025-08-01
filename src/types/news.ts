export type NewsCategory = "Nouveauté" | "Amélioration" | "Correction" | "Annonce";

export interface NewsItem {
  id: string;
  category: NewsCategory;
  title: string;
  description: string;
  date: string; // ISO string
  createdAt?: any; // for Firestore serverTimestamp
}

export interface NewsItemCreate {
  category: NewsCategory;
  title: string;
  description: string;
}
