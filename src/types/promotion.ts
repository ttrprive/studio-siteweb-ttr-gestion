export type PromotionType = 'image' | 'video';

export interface Promotion {
  id: string;
  type: PromotionType;
  title: string;
  description: string;
  src: string;
  alt?: string;
  createdAt?: any;
}

export interface PromotionCreate {
  type: PromotionType;
  title: string;
  description: string;
  src: string;
  alt?: string;
}
