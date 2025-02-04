import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider ,onAuthStateChanged , signInWithPopup, signOut} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey ,
  authDomain: "bejaia-tour-guide.firebaseapp.com",
  projectId: "bejaia-tour-guide",
  storageBucket: "bejaia-tour-guide.firebasestorage.app",
  messagingSenderId: "961077622912",
  appId: "1:961077622912:web:9a5cfab0070044ac224e65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// fire store functionalities 
const db = getFirestore(app);
const auth = getAuth(app) ;
auth.useDeviceLanguage();
const provider = new GoogleAuthProvider();

export {db , auth , provider}