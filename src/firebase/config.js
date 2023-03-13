import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/getFirestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCr-4aTEDeUIR05P4dlxusLhDxruIVzGmM",
  authDomain: "house-marketplace-14948.firebaseapp.com",
  projectId: "house-marketplace-14948",
  storageBucket: "house-marketplace-14948.appspot.com",
  messagingSenderId: "762238448812",
  appId: "1:762238448812:web:60d87d0acc6b2efa839b09",
};

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export { auth, db, storage };
