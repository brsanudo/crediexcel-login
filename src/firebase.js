import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBw6JKRwonNxbLaxUV89V-1aMUsYCvTHT0",
  authDomain: "crediexcel.firebaseapp.com",
  projectId: "crediexcel",
  storageBucket: "crediexcel.appspot.com",
  messagingSenderId: "195118810169",
  appId: "1:195118810169:web:595a0b0fff7d33334939e8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
