import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyClMosCrYdKnKzSdsw4AvChA_RX205OI0o",
  authDomain: "bejaia-tour-guide.firebaseapp.com",
  projectId: "bejaia-tour-guide",
  storageBucket: "bejaia-tour-guide.appspot.com",
  messagingSenderId: "961077622912",
  appId: "1:961077622912:web:9a5cfab0070044ac224e65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}