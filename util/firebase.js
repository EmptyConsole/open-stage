import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDKPBcx33ZE3S5Xu32QYKng2ZJ_seYfTgk",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "open-stage-167e7.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "open-stage-167e7",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "open-stage-167e7.firebasestorage.app",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "13925643966",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:13925643966:web:011008440fed8b2345d0ef",
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-LXYHP0VHLJ"
};

// Debug logging
console.log("Firebase config:", {
    apiKey: config.apiKey ? `${config.apiKey.substring(0, 10)}...` : 'undefined',
    authDomain: config.authDomain,
    projectId: config.projectId,
    appId: config.appId
});

// Initialize Firebase
let app;
let firestore;
let auth;

try {
    // Check if Firebase is already initialized
    if (typeof window !== 'undefined' && window.firebase) {
        console.log("Firebase already initialized");
        app = window.firebase.app();
    } else {
        app = initializeApp(config);
        console.log("Firebase app initialized");
    }
    
    firestore = getFirestore(app);
    auth = getAuth(app);
    
    console.log("Firebase initialized successfully");
    console.log("Auth instance:", auth);
    console.log("Auth app:", auth.app);
    
    // Test auth availability
    if (auth && auth.app) {
        console.log("Firebase Auth is ready");
    } else {
        console.error("Firebase Auth is not properly initialized");
    }
    
} catch (error) {
    console.error("Firebase initialization error:", error);
    console.error("Error details:", {
        code: error.code,
        message: error.message,
        stack: error.stack
    });
    
    // Create fallback auth object to prevent crashes
    auth = null;
    firestore = null;
}

export { firestore, auth };