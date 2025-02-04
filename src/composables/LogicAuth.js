import { ref } from "vue";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "@/Firebase/firebase";
import notify from "./useNotify";
import router from "@/router";

const isAuthed = ref(null);
let name = ref('No name');
let img = ref(null);

const signIn = async () => {
  try {
    await signInWithPopup(auth, provider);

  } catch (error) {
    notify("Une erreur s'est produite, veuillez réessayer." , 'error')
    console.error("SignIn error:", error);
    router.push('/');
  }
};


const logOut = async () => {
  try {
    await signOut(auth);

  } catch (error) {
    notify("Une erreur s'est produite, veuillez réessayer." , 'error')
    console.error("Signout error:", error);
    router.push('/');
  }
};

onAuthStateChanged(auth, (currentUser) => {
  isAuthed.value = currentUser; // Updates when isAuthed logs in/out
  if(currentUser){
    name.value = currentUser.displayName;
    img.value = currentUser.photoURL ;
    notify(`Welcom , ${isAuthed.value.displayName} vous êtes connecté avec succès !`,'success');
  }else{
    name.value = null
    img.value = null
  }
});

export default function useAuth() {
  return { isAuthed, signIn, logOut , name , img };
}

export {img , isAuthed}