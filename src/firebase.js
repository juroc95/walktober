import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCoKmeyLCWdjWgu5gXLFJjyLi1JsveYanQ",
  authDomain: "psuwalktober.firebaseapp.com",
  projectId: "psuwalktober",
  storageBucket: "psuwalktober.appspot.com",
  messagingSenderId: "949612719811",
  appId: "1:949612719811:web:1c3329349a6538e6197c76",
  measurementId: "G-Q4NLD3BN06"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);