<template>
    <h4 id="comLabel">Commentaires</h4>
    <form @submit.prevent="AddComment" class="comForm">
        <input id="com" type="text" v-model="comment" placeholder="Écrire un commentaire ️‍🔥..." :disabled="isdisabled" autocomplete="off" minlength="1">
        <button v-if="isAuthed" type="submit">Publier</button>
    </form>

    <div class="Comment_section">
        <div v-if="PostComments.length > 0" class="comment" v-for="(comment,index) in PostComments" :key="comment.id">
            <div class="user_iden">
                <img :src="comment.user_img || defaultImg" alt="" width="35px" height="35px"  @error="onImageError">
                <div>
                    <h4>{{comment.user_name}}</h4>
                    <span> le : {{ comment.created_at }}</span>
                </div>
            </div>
            <button v-if="isAuthed?.uid === comment.user_id" @click="CommentDel(comment.id)"></button>
            <p class="comment-text">{{ comment.text }} </p>
        </div>

        <div v-else class="NoComments">
            <p>Aucun commentaire sur ce post...</p>
        </div>
    </div>
</template>





<script setup>
import { isAuthed } from '@/composables/LogicAuth';
import { onMounted, ref } from 'vue';
import useComments from '@/composables/useComments';
import defaultImg from '@/assets/pics/user.png';
const {Commenting ,fetchComments  , deleteComment} = useComments();
const comment =ref('');
const PostComments = ref([]);
const isdisabled = ref(true);
const props = defineProps({
    post_id : String,
})

const onImageError = (event) => {
    // If the image fails to load, set it to the default image
    event.target.src = defaultImg;
};

if(isAuthed.value){
    isdisabled.value = false ;
}else{
    isdisabled.value = true ; 
}

const CommentDel = async (comment_id)=>{
    await deleteComment(comment_id) ;
    PostComments.value = await fetchComments(props.post_id);
}

const AddComment =async ()=>{
    await Commenting(comment.value , props.post_id)
    comment.value = '';
    PostComments.value = await fetchComments(props.post_id);
}

onMounted (async ()=>{
    const cmntrs = await fetchComments(props.post_id);
    if(cmntrs){
        PostComments.value = cmntrs ;
    }else{
        PostComments.value = null 
    }
})

</script>

<style scoped>
    #comLabel{
        font-size: 1.5rem;
        color: aliceblue;
        margin-top: 2rem;
        margin-bottom: 1rem;
    }

    .comForm{
        display: grid;
        grid-template-columns: 2fr 1fr;
        align-items: center;
        /* outline: 2px solid brown; */
    }
    .comForm input {
        overflow: scroll;
        height: 50px;
        font-size: .9rem;
        border: 1px solid rgb(119, 118, 116);
        background: transparent;
        color: aliceblue; 
        text-indent: 5px;
        letter-spacing: 1px;
        border-radius: 6px;
        outline: none;
        transition: border 300ms ease-in-out;
        box-sizing: border-box;
    }
    .comForm input:hover {
        border: 1px solid rgb(208, 209, 209);
    }
    
    .comForm button {
        width: max-content;
        padding: .8rem;
        margin-left: 1rem;
        border-radius: 6px;
        border: 1px solid rgb(119, 118, 116);
        background: transparent;
        color: aliceblue; 
        font-weight: 500;
        letter-spacing: 1px;
        transition: border 300ms ease-in-out, background 300ms ease-in-out;
    }
    .comForm button:hover {
        border: 1px solid rgb(208, 209, 209);
        background: rgb(1, 84, 151);
    }

    .Comment_section{
        margin-top: 2rem;
        padding: 5px;
    }

    .comment{
        
        border: 1px solid rgba(85, 85, 85, 0.733);
        margin-bottom: 1.2rem;
        border-radius: 10px;

        padding: 1rem;
        position: relative;
    }
    .comment button{
        top: 1rem;
        right: 8px;
        position: absolute;
        width: 26px;
        height: 26px;
        background-image: url('../assets/pics/socials/trash.svg');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        background-color: rgb(184, 9, 9);
        border: none;
        outline: none;
        border-radius: 6px;
        transition: transform 300ms ease-in-out;
    }

    .comment button:hover{
        transform: translateY(-5px);
    }
    .user_iden{
        display: flex;
        align-items: center;
    }
    .user_iden img {
        margin-right: 1rem;
        border-radius: 50%;
        border: 2px solid rgb(199, 199, 199);
        transition: border 300ms ease-in-out , transform 300ms ease-in-out;

    }
    .user_iden h4{
        color: white;
        font-size: .9rem;
        margin-bottom: -7px;
    }
    .user_iden span{
        color: rgb(141, 138, 138);
        font-size: .7rem;
    }

    .user_iden img:hover{
        border: 3px solid white;
        transform: translateY(-7px);
    }

    .comment-text{
        color: rgb(216, 216, 216);
        letter-spacing: 1px;
        border: 1px solid gray;
        border-radius: 1rem;
        margin-top: .5rem;
        padding: 1rem;
    }
     
    .NoComments{
        height: 200px;
        text-align: center;
        color: aliceblue;
        font-size: 1rem;
        padding-top: 4rem;
    } 

    @media (width < 426px) {
        .comForm{
        grid-template-columns: 1fr;
        align-items: center;
        /* outline: 2px solid brown; */
    }
    .comment-text{
        font-size: 0.7rem;
    }
    .comForm button {
     margin-top: 1rem;
     margin-left: 0;
     padding: .5rem;
     font-size: .7rem;
    }

    .comForm input {
        overflow: scroll;
        height: 40px;
        font-size: .7rem;
    }
    #comLabel{
        font-size: 1.1rem;
      }
    .NoComments{
        font-size: .8rem;
    }
    }
</style>