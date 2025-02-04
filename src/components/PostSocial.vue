<template>
    
    <div class="container" v-if="isAuthed">
        <button class="action" @click="IsLiked">
            <Transition name="fade" mode="out-in">
                <img v-if="liked" src="@/assets/pics/socials/like-click.svg" alt="">
                <img v-else src="@/assets/pics/socials/like-unclick.svg" alt="">
            </Transition>
                <span>J'aime</span>
            </button>
            
            <button class="action">
                <RouterLink class="comment" :to="{name : 'place' , params : { id : props.postID}}">
                <img src="@/assets/pics/socials/comment.svg" alt="">
                    <span>Commenter</span>
                </RouterLink>
                
            </button>
            
            <button class="action" @click="IsSaved">
                <Transition name="fade" mode="out-in">
                    <img v-if="saved" src="@/assets/pics/socials/save-active.svg" alt="">
                    <img v-else src="@/assets/pics/socials/save-no-active.svg" alt="">
                </Transition>
                <span>Panier</span>
            </button>
    </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease-in-out , scale 400ms ease-in-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  scale: 1.2;
}

.container{
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 1rem;
    border-top: 1px solid rgb(92, 91, 91);
}

    .action img{
            width: 28px;
            height: 28px;
            transition: transform 300ms ease-in-out;
        }

        .action img:hover{
         transform: translateY(-6px);
        }    
    .action{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: .3rem .5rem;
        background-color: transparent;
        color: aliceblue;
        border: none;
        border-radius: 6px; 
        font-size: .9rem;
        cursor: pointer;
    }

    .comment{
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        color: aliceblue;
    }

    .comment span{
        margin-left: .5rem;
    }

    @media (width<370px) {
        .action span{
            display: none;
        }
    }
</style>

<script setup>
import { onMounted, ref } from 'vue';
import useLike from '@/composables/useLikesManagement';
import { isAuthed } from '@/composables/LogicAuth';
const {fetchUserLikes , fetchUserSaves , toggleLike , toggleSave} =useLike();
const liked = ref(false);
const saved = ref(false);
const props = defineProps({
    postID : String 
})

const IsLiked =async ()=>{
    await toggleLike(props.postID);
    liked.value = !liked.value ;
}

const IsSaved = async () => {
    await toggleSave(props.postID) ;
    saved.value = !saved.value;
}

onMounted( async()=>{
    if(isAuthed.value){
        const userLikes = await fetchUserLikes() ;
        liked.value = userLikes.includes(props.postID);
        const userSaves = await fetchUserSaves();
        saved.value = userSaves.includes(props.postID);
}})
// console.log(props.postID)

</script>