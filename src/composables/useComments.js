import { db } from "@/Firebase/firebase";
import { img, isAuthed } from "./LogicAuth";
import { collection, addDoc, Timestamp, query, where, getDocs, orderBy, deleteDoc, doc } from "firebase/firestore";
import router from "@/router";
import notify from "./useNotify";

const Commenting = async (comment, post) => {
    if (comment.trim().length < 1) return;
    const timestamp = Timestamp.now();
    const date = timestamp.toDate();
    
    // Adjust the date to the local time zone by getting the local date
    const formattedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0];
    
    const data = {
        user_id: isAuthed.value.uid,
        user_name: isAuthed.value.displayName,
        user_img: img.value,
        text: comment.trim(),
        post_id: post,
        created_at: formattedDate,
    };
    

    try {
        await addDoc(collection(db, "Comments"), data);
        notify("Le commentaire a été ajouté." , 'success')
    } catch (error) {
        console.log("Erreur de sauvegarde :", error);
        return null;
    }
};

const fetchComments = async (post_id)=>{
    const q = query(collection(db , 'Comments') , where("post_id" , "==" , post_id) , orderBy("created_at" , "desc"));

    try {
        const querySnapshot = await getDocs(q);
        const value = [];
        querySnapshot.docs.map(doc =>
             value.push({id : doc.id , ...doc.data()}));
        return value ;
    }
    catch (error) {
        console.log(error);
        router.push('/');
        return [];
    }
}


const deleteComment = async (comment_id)=>{
    try {
        await deleteDoc(doc(db , "Comments" ,comment_id));    
    } catch (error) {
        console.log("error while trying to delete post" , error);
    }
}






export default function useComments(){
    return {Commenting , fetchComments , deleteComment}
}