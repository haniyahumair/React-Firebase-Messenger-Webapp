// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFpRr0DNMCWMpbyYLuOrj_HM1eyRrwOWo",
  authDomain: "react-basic-messenger.firebaseapp.com",
  projectId: "react-basic-messenger",
  storageBucket: "react-basic-messenger.firebasestorage.app",
  messagingSenderId: "867905706284",
  appId: "1:867905706284:web:61e638a5a3e82b8893b489",
  measurementId: "G-GPGX9SHQFY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()