
export interface SupportMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: any; // Firestore ServerTimestamp
  read: boolean;
}

export interface SupportMessageCreate {
  name: string;
  email: string;
  subject: string;
  message: string;
}
