// src/firebaseConfig.ts
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqvVNNUeggoZMKQ0qOZ8T8Wv7Oyp6h2Dw",
  authDomain: "performance-tracker-for-magare.firebaseapp.com",
  projectId: "performance-tracker-for-magare",
  storageBucket: "performance-tracker-for-magare.firebasestorage.app",
  messagingSenderId: "457527851733",
  appId: "1:457527851733:web:de62b6253af5f19882c05c",
  measurementId: "G-NC3PJK15Q2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
