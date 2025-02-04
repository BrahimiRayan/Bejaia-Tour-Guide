import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider ,onAuthStateChanged , signInWithPopup, signOut} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: "bejaia-tour-guide",
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// fire store functionalities 
const db = getFirestore(app);
const auth = getAuth(app) ;
auth.useDeviceLanguage();
const provider = new GoogleAuthProvider();

export {db , auth , provider}