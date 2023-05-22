import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIJaVcjx7xWLi2z93oHQVbM03kVzvkKVY",
  authDomain: "messenger-app-cdcc3.firebaseapp.com",
  projectId: "messenger-app-cdcc3",
  storageBucket: "messenger-app-cdcc3.appspot.com",
  messagingSenderId: "48023109527",
  appId: "1:48023109527:web:8310253bfa74d1d5f24ed2",
  measurementId: "G-L75P07RCWJ"
};

export const app = initializeApp(firebaseConfig);
export const auth=getAuth()
export const storage = getStorage();
export const db =getFirestore();