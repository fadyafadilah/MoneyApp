// Import Firebase libraries
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApSMO5EPMAdYyUdptRdItCvAqNY3ly9BY",
  authDomain: "debtbook-77519.firebaseapp.com",
  databaseURL: "https://debtbook-77519-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "debtbook-77519",
  storageBucket: "debtbook-77519.firebasestorage.app",
  messagingSenderId: "654691884656",
  appId: "1:654691884656:web:9d7854b2cbd6f6ca475eb5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);
export default app;
