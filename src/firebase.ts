import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// https://firebase.google.com/docs/web/setup?hl=ko
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: 'mobile-wedding-24472.firebaseapp.com',
  projectId: 'mobile-wedding-24472',
  storageBucket: 'mobile-wedding-24472.appspot.com',
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_APP_FIREBASE_DATABASE_URL,
};

export const firebaseApp = initializeApp(firebaseConfig);
export const database = getDatabase(firebaseApp);
