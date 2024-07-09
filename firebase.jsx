import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc, getDocs, getDoc, doc, orderBy, query, deleteDoc} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD6m848l9wtAoxgD_oih2J4L0caEUI0xas",
  authDomain: "leonardo-trujillo.firebaseapp.com",
  projectId: "leonardo-trujillo",
  storageBucket: "leonardo-trujillo.appspot.com",
  messagingSenderId: "499508165807",
  appId: "1:499508165807:web:1a51f8d965342964cc685a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

//inicializamos la base de datos
const bd = getFirestore(app); 

export {auth, provider, bd, collection, addDoc, getDocs, doc, getDoc, orderBy, query, deleteDoc};