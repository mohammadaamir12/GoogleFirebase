// Import the functions you need from the SDKs you need
import {getAuth} from "firebase/auth";
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAEUl3w8pnev-FUBTS32vbUE7qu0xJfuHs",
  authDomain: "fir-4c289.firebaseapp.com",
  projectId: "fir-4c289",
  storageBucket: "fir-4c289.appspot.com",
  messagingSenderId: "524529357131",
  appId: "1:524529357131:web:f69ca7b112f0e5138b58ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const db=getFirestore(app);
