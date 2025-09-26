// firebase.js
// Centralized Firebase initialization and exports for Firestore & Auth

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// --- Firebase configuration ---
// Use NEXT_PUBLIC_ prefixed environment variables so they're available client-side.
// The fallback values let you run locally without a .env file (replace with your own).
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDKPBcx33ZE3S5Xu32QYKng2ZJ_seYfTgk",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "open-stage-167e7.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "open-stage-167e7",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "open-stage-167e7.appspot.com", // ✅ must end with .appspot.com
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "13925643966",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:13925643966:web:011008440fed8b2345d0ef",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-LXYHP0VHLJ",
};

// --- Initialize Firebase ---
// initializeApp can be called exactly once per app instance
const app = initializeApp(firebaseConfig);

// --- Export commonly used services ---
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };
