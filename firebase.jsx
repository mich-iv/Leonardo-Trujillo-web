import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc, getDocs, getDoc, doc} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAejP1sLxR7Ny-bmVonQefSq_ef8ItOTME",
  authDomain: "pruebasitio-21d00.firebaseapp.com",
  projectId: "pruebasitio-21d00",
  storageBucket: "pruebasitio-21d00.appspot.com",
  messagingSenderId: "524799552667",
  appId: "1:524799552667:web:ea50f1e84ea199c931aa3e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

//inicializamos la base de datos
const bd = getFirestore(app); 

export {auth, provider, bd, collection, addDoc, getDocs, doc, getDoc};