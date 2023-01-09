import firebase, { initializeApp } from "firebase/app";
import "firebase/database";
import { getFirestore } from "firebase/firestore";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8gEZTNYMrdVUxfCPNhQSMxuBjamXdKW4",
  authDomain: "gestao-de-fluxo-clientes.firebaseapp.com",
  projectId: "gestao-de-fluxo-clientes",
  storageBucket: "gestao-de-fluxo-clientes.appspot.com",
  messagingSenderId: "697869107823",
  appId: "1:697869107823:web:412492846c7141eb1a839a",
  measurementId: "G-RWVBTCZTKD",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

