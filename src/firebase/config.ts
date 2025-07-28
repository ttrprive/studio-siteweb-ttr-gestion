import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

// IMPORTANT: Remplacez les chaînes de caractères vides par vos propres clés Firebase.
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

let app: FirebaseApp;
let auth: Auth;

// Vérifie si les clés sont fournies avant d'initialiser Firebase
// Cela empêche l'application de planter si les clés ne sont pas configurées
if (firebaseConfig.apiKey) {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
} else {
  console.warn("Configuration Firebase manquante. Les fonctionnalités d'authentification seront désactivées.");
  // Fournir des objets factices pour éviter les erreurs dans le reste de l'application
  app = {} as FirebaseApp;
  auth = {} as Auth;
}


export { app, auth };