import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore, getFirestore, setLogLevel } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import appletConfig from "../../../firebase-applet-config.json";

// Set Firestore log level to avoid transient connection warning logs in preview environments
try {
  setLogLevel("error");
} catch {
  // ignore
}

// Read Firebase configuration securely from environment variables, with fallback to firebase-applet-config.json
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || appletConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || appletConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || appletConfig.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || appletConfig.storageBucket,
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || appletConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || appletConfig.appId,
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore: use provisioned database with force long polling for sandbox/iframe stability
const firestoreDbId = import.meta.env.VITE_FIREBASE_DATABASE_ID || appletConfig.firestoreDatabaseId;

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
