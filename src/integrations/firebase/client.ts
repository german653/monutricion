import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Read Firebase configuration securely from environment variables, with fallback
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA7HxCQ7STnlWrRoZ_-W9K7b1BwdQ_RxD4",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "nutricion-meli-b20a8.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "nutricion-meli-b20a8",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "nutricion-meli-b20a8.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "324309820165",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:324309820165:web:db540977f5ee81c7504d6c",
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore: default database for standard Firebase projects
const firestoreDbId = import.meta.env.VITE_FIREBASE_DATABASE_ID;

export const db =
  firestoreDbId && firestoreDbId !== "(default)"
    ? getFirestore(app, firestoreDbId)
    : getFirestore(app);

export const auth = getAuth(app);

export default app;
