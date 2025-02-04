import { doc, setDoc, deleteDoc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/Firebase/firebase";
import { isAuthed } from "./LogicAuth";
import router from "@/router";

async function toggleLike(postId) {
    if (!isAuthed.value) return;

    const userId = isAuthed.value.uid; // Get the user ID from Firebase Auth
    const likeRef = doc(db, "Likes", `${postId}_${userId}`);

    try {
        const likeSnap = await getDoc(likeRef);
        if (likeSnap.exists()) {
            await deleteDoc(likeRef); 
        } else {
            await setDoc(likeRef, { post_id: postId, user_id: userId }); // Like added to Firestore
        }
    } catch (error) {
        console.log("Error:", error.message);
        router.push('/');
    }
}

async function fetchUserLikes() {
    if (!isAuthed.value) return [];

    const userId = isAuthed.value.uid;
    const q = query(collection(db, "Likes"), where("user_id", "==", userId));
    try {
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => doc.data().post_id);
    }
    catch (error) {
        console.log(error);
        router.push('/');
        return [];
    }

}

async function toggleSave(postId) {
    if (!isAuthed.value) return;

    const userId = isAuthed.value.uid; // Get the user ID from Firebase Auth
    const saveRef = doc(db, "Saved", `${postId}_${userId}`);

    try {
        const saveSnap = await getDoc(saveRef);
        if (saveSnap.exists()) {
            await deleteDoc(saveRef); 
        } else {
            await setDoc(saveRef, { post_id: postId, user_id: userId }); // save added to Firestore
        }
    } catch (error) {
        console.log("Error:", error.message);
        router.push('/');
    }
}

async function fetchUserSaves() {
    if (!isAuthed.value) return [];

    const userId = isAuthed.value.uid;
    const q = query(collection(db, "Saved"), where("user_id", "==", userId));
    try {
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => doc.data().post_id);
    }
    catch (error) {
        console.log(error);
        router.push('/');
        return [];
    }

}

export default function useLike() {
    return { toggleLike,fetchUserSaves ,fetchUserLikes , toggleSave};
}
