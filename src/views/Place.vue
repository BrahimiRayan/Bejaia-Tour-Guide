<template >
    <div v-if="place" class="place">
        <h1 class="place-name"> {{ place.nom }}</h1>
        <div class="place-image-container">
            <img class="place-img" :src="`/${place.img.toLowerCase()}.jpg`" :title="place.nom" >
            <div class="btns-holder" >
                <a :href="`/${place.img.toLowerCase()}.jpg`" :download="`${place.nom}.jpg`" class="download-btn" title="Télécharger">
                    <button>
                        <img src="../assets/pics/download.svg" alt="" loading="lazy">
                    </button> 
                </a>
                <button @click="copyLink" class="share-btn" title="Copier le lien">
                    <img src="../assets/pics/copy.svg" alt="" loading="lazy">
                </button>
            </div>
            <span v-if="copied" class="copy-msg">Link copied!</span>
        </div>
        <div class="action-btns" v-if="isAuthed">
            <button class="action" @click="handleLike">
                <Transition name="fade" mode="out-in">
                    <img v-if="liked" src="@/assets/pics/socials/like-click.svg" alt="">
                    <img v-else src="@/assets/pics/socials/like-unclick.svg" alt="">
                </Transition>
                    <span>J'aime</span>
            </button>
            
            <a href="#jump" class="action">
                <img src="@/assets/pics/socials/comment.svg" alt="">
                <span>Commenter</span>
            </a>
            <button class="action" @click="handleSave">
                <img v-if="save" src="@/assets/pics/socials/save-active.svg" alt="">
                <img v-else src="@/assets/pics/socials/save-no-active.svg" alt="">
                <span>Panier</span>
            </button>

            <a :href="`https://www.google.com/maps?q=${place.location.latitude},${place.location.longitude}`" target="_blank" class="action">
                <LaMapMarkedAltSolid class="Mapicon"/>
                 <span>Map</span>
            </a>

        </div>
        <p class="place-description" id="jump">{{ place.description }}</p>
        <h2 class="place-cat">categorie : <span>{{ place.categorie }}</span></h2>

        <div class="comments-section">
            <Comments :post_id ="postId"/>
        </div>


    </div>
    <div v-else id="loading-screen">
            <img src="../../spinner.gif" alt="">
            <h2>Chargement en cours...</h2>
    </div>
</template>

<script setup>
import { LaMapMarkedAltSolid} from '@kalimahapps/vue-icons';
import { db } from '@/Firebase/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { isAuthed } from '@/composables/LogicAuth';
import useLike from '@/composables/useLikesManagement';
import notify from '@/composables/useNotify';
import Comments from '@/components/Comments.vue';
const { toggleLike, 
        fetchUserLikes,
        toggleSave ,
        fetchUserSaves
      } = useLike();
const copied = ref(false);
const route = useRoute();
const postId = route.params.id;
const place = ref(null);
const liked = ref(false);
const save = ref(false);

onMounted(async () => {
  const docRef = doc(db, 'places', postId);
  
  const unsubscribe = onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
        place.value = docSnap.data();
    } else {
        place.value = null;
        console.log("Doc doesn't exist");
    }
  });

  if (isAuthed.value) {
      const userLikes = await fetchUserLikes();
      liked.value = userLikes.includes(postId);
      const userSaves = await fetchUserSaves();
      save.value =userSaves.includes(postId);
  }

  return unsubscribe;
});



const handleLike = async () => {
    await toggleLike(postId);
    liked.value = !liked.value;
};

// still the save methode needs to be added
const handleSave = async () => {
    await toggleSave(postId)
    save.value = !save.value;
};

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href).then(() => {
    notify('Le lien est copier avec succès' , 'success')
  });
};
setTimeout(()=>{
    if(!isAuthed.value){
    console.log("you are not authinticated !!")
    notify('Vous devez être connecté pour liker, commenter et accéder à d\'autres fonctionnalités.' , 'warning');
}},3000)

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Signika:wght@300..700&family=Smooch+Sans:wght@100..900&display=swap');
*{
    scroll-behavior: smooth;
}

#loading-screen {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background: #2B3332;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 20px;
          font-weight: bold;
      }
      #loading-screen img{
        margin-top: 15%;
        width: 5rem;
        height: 5rem;
      }
      #loading-screen h2{
        color: #009afa;
        margin-top: 1rem;
      }
      .fade-enter-active, .fade-leave-active {
        transition: transform 500ms ease-in-out;
        }
    .fade-enter-from, .fade-leave-to {
        /* opacity: 0; */
        transform: scale(2);
        }
      .comments-section{
        width: 70%;
      }

    .action-btns{
        margin-top: 2rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        border: 1px solid rgb(124, 124, 124);
        border-left: none;
        border-right: none;
        width: 70%;
        padding-block: .5rem;
    }
    .action-btns .action img , .Mapicon{
        width: 24px;
        height: 24px;
       
    }
    .action-btns .action{
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
    }
    .action-btns a {
        text-decoration: none;
    }
    .place{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .place-cat{
        font-family: "Smooch sans";
        font-size: 1rem;
        color: aliceblue;
        align-self: flex-start;
        margin-left: 15.5%;
        margin-bottom: .3rem;
    }

    .place-cat span {
        
        font-family: "Smooch sans";
        padding-inline: .4rem;
        border-radius: 8px;
        font-weight: 800;
        letter-spacing: 1px;
        background-color: var(--secondaryColor);
        box-shadow: 2px 2px 8px rgb(68, 65, 65);

    }

    .place-name{
        font-family:"Smooch Sans";
        margin-bottom: 1rem;
        text-align: center;
        font-size: 5rem;
        color: var(--secondaryColor);
    }

    .place-description{
        width: 70%;
        color: white;
        margin-top: 1rem;
        font-size: 1.4rem;
        font-weight: 600;
        word-spacing: 3px;
        letter-spacing: 1px;
        /* border: 2px solid white; */
        padding: 1rem .5rem;
        text-indent: .8rem;
        font-family:"Smooch Sans";
        text-align: left;
    }

    .place-img{
        border-radius: 1rem;
        margin-right: 1rem;
        box-shadow: 3px 2px 9px rgb(32, 32, 32);
        transition: transform 400ms ease-in-out;
    }

    .place-img:hover{
        transform: scale(1.04);
    }

    .place-image-container{
        display: flex;
    }

    .btns-holder{
        display: flex; 
        flex-direction: column;
        height: fit-content;
        margin-top: 20%;

    }
    .download-btn , .share-btn {
        width: 100%;
        height: 2rem;
        margin-top: 1rem;  
        text-decoration: none;
        
    }
    .download-btn button , .share-btn {
        background-color: rgba(51, 38, 38, 0.568);
        backdrop-filter: blur(6px);
        height: 2rem;
        width: 2rem;
        border: none;
        border-radius: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 0px 3px var(--secondaryColor);
        transition: box-shadow 300ms ease-in-out , transform 400ms ease-in-out;
   
    }

    .download-btn button img  , .share-btn img{
        height: 1.4rem;
        width: 1.4rem;
        border-radius: 50%;
    }

    .download-btn button:hover , .share-btn:hover{
        box-shadow: 0px 0px 8px var(--secondaryColor);
        transform: translateY(-5px);
    }



    @media (width < 575px) {
        .action-btns .action{
        font-size: .8rem;
    }
        .action-btns{
            margin-top: 1rem;
            width: 99%;
        }

        .place-cat{
            margin-left: 3%;
        }
        .place-name{
            font-size: 3rem;
        }
        .place-description{
            width: 96%;
            font-size: 1.2rem;
        }
        .place-img{
            align-self: center;
            width: 90%;
            margin-right: 0;
        }
        .place-image-container{
            flex-direction: column;

         }
         .btns-holder{
            flex-direction: row;
            margin-top: 0;
            margin-left: 70%;
            width: fit-content;
            /* border: 1px solid salmon; */
        }
        .share-btn {
            width: 3rem;
        }
        .comments-section{
        width: 96%;
      }

    }   

    @media (width < 425px) {
        .action-btns span{
            display: none;
        }
    }
    @media (575px<=width <895px) {
        .place-description{
            width: 90%;
            font-size: 1.2rem;
        }
        .place-cat{
            margin-left: 6%;
        }
    }

    @media (width < 375px) {
        .place-description{
            width: 98%;
            font-size: 1rem;
        }
    }
</style>