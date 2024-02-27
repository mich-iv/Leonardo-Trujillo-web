import { initializeApp } from "firebase/app";
import{ getAuth, GoogleAuthProvider } from "firebase/auth";

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
export {auth, provider};