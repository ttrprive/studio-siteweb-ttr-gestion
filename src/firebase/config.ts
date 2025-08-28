import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

// IMPORTANT: Remplacez les chaînes de caractères vides par vos propres clés Firebase.
// Ce projet utilise Cloud Firestore, et non la Realtime Database.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

// Vérifie si toutes les clés nécessaires sont fournies avant d'initialiser Firebase.
// Cela empêche l'application de planter si les clés ne sont pas configurées.
const isFirebaseConfigured =
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId;

if (isFirebaseConfigured) {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  // Initialisation de Cloud Firestore
  db = getFirestore(app);
} else {
  console.warn("Configuration Firebase manquante. Veuillez vérifier vos variables d'environnement. Les fonctionnalités d'authentification et de base de données seront désactivées.");
  // Fournir des objets factices pour éviter les erreurs dans le reste de l'application
  app = {} as FirebaseApp;
  auth = {} as Auth;
  db = {} as Firestore;
}


export { app, auth, db };
