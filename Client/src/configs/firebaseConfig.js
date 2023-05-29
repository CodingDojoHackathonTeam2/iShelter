// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMZf7B1hHaPzsna8JIOSp6stiEUhm8yFU",
  authDomain: "ishelter-cbb94.firebaseapp.com",
  projectId: "ishelter-cbb94",
  storageBucket: "ishelter-cbb94.appspot.com",
  messagingSenderId: "222185605397",
  appId: "1:222185605397:web:f57ead80c573123bccc11c",
  measurementId: "G-M4RW922LMZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);

export const storage = getStorage(app);

const analytics = getAnalytics(app);