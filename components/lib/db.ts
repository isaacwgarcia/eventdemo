import firebaseConfig from "../firebaseConfig";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
