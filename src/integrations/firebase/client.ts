import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore, getFirestore, setLogLevel } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Default fallback configuration from provisioned Firebase project
const DEFAULT_FIREBASE_CONFIG = {
  projectId: "decent-antonym-4tsmh",
  appId: "1:723102852389:web:70585b4544fe17c535a6cc",
  apiKey: "AIzaSyAWl1kIOpWFAh8qD6xNm0JMeL9XllBnpXA",
  authDomain: "decent-antonym-4tsmh.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-monutricion-a342607c-9aa7-4e3e-8084-10aa98921944",
  storageBucket: "decent-antonym-4tsmh.firebasestorage.app",
  messagingSenderId: "723102852389",
};

// Set Firestore log level to avoid transient connection warning logs in preview environments
try {
  setLogLevel("error");
} catch {
  // ignore
}

// Read Firebase configuration securely from environment variables, with safe fallback
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || DEFAULT_FIREBASE_CONFIG.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || DEFAULT_FIREBASE_CONFIG.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || DEFAULT_FIREBASE_CONFIG.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || DEFAULT_FIREBASE_CONFIG.storageBucket,
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || DEFAULT_FIREBASE_CONFIG.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || DEFAULT_FIREBASE_CONFIG.appId,
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore: use provisioned database with force long polling for sandbox/iframe stability
const firestoreDbId =
  import.meta.env.VITE_FIREBASE_DATABASE_ID || DEFAULT_FIREBASE_CONFIG.firestoreDatabaseId;


function createFirestore() {
  const targetDb = firestoreDbId && firestoreDbId !== "(default)" ? firestoreDbId : undefined;
  try {
    return initializeFirestore(app, { experimentalForceLongPolling: true }, targetDb);
  } catch {
    return targetDb ? getFirestore(app, targetDb) : getFirestore(app);
  }
}

export const db = createFirestore();

export const auth = getAuth(app);

export default app;
