// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-6e8f2.firebaseapp.com",
  projectId: "mern-estate-6e8f2",
  storageBucket: "mern-estate-6e8f2.firebasestorage.app",
  messagingSenderId: "611981392809",
  appId: "1:611981392809:web:3e4df16ab740a25a3f22b8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
