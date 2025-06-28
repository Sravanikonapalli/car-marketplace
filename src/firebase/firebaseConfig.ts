import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA1Z4vZLlWGm3rgXlOucn5eB27dEJLiG1M",
  authDomain: "carmarketplace-8eed9.firebaseapp.com",
  projectId: "carmarketplace-8eed9",
  storageBucket: "carmarketplace-8eed9.appspot.com", 
  messagingSenderId: "373306346579",
  appId: "1:373306346579:web:550ccd1c4bf3ae7fa50aa6",
  measurementId: "G-NVD5HCY4SW",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
