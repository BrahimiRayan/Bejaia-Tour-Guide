<template>
    <div class="user">
        <div class="background-img"></div>
        <div class="user-infos">
            <div class="informations">
                <img :src="img || defaultImg" alt="" loading="lazy" @error="onImageError">
                <h2>{{ isAuthed.displayName }}</h2>
            </div>
            <div class="user-cred">
                <div><h3>Votre Email</h3> <p> : {{ isAuthed.email }}</p></div>
                <div><h3>Vous avez aimés</h3> <p> : {{ liked.length }} posts</p></div>
                <div><h3>Vous avez dans le panier</h3> <p> : {{ saved.length }} posts</p></div>
            </div>

            <div class="liked-posts">
                <h4>Les posts que vous avez aimés 🤍.</h4>
            
                <div class="groupe-imgs">
                    <button v-if="liked.length !== 0" class="scroll-btn left" @click="scrollLeft"><img src="@/assets/pics/user/left.svg" alt=""></button>
                    <div class="posts-img" ref="postsContainer">
                        <div v-if="liked.length !== 0" v-for="post in liked" :key="post.id" class="post">
                            <img :src="`${post.img.toLowerCase()}.jpg`" :alt="post.nom" :title="post.nom" loading="lazy">
                            <RouterLink :to="{name :'place' , params : { id : post.id}}" class="visit">➟ Voire</RouterLink>
                        </div>

                        <div v-else class="NoLikes">
                            <span>Aucun post aimé trouvé...</span>
                        </div>
                    </div>
                    <button v-if="liked.length !== 0" class="scroll-btn right" @click="scrollRight"><img src="@/assets/pics/user/right.svg" alt=""></button>
            </div>
            <span v-if="liked.length > 1" class="swipe">glisser >> </span>
            </div>


            <div class="liked-posts">
                <h4>Les posts que vous avez ajoutés au panier 🧺.</h4>
               
                <div class="groupe-imgs">
                    <button v-if="saved.length !== 0" class="scroll-btn left" @click="scrollLeft2"><img src="@/assets/pics/user/left.svg" alt=""></button>
                    <div class="posts-img" ref="postsContainer2">
                        <div v-if="saved.length !== 0" v-for="post in saved" :key="post.id" class="post">
                            <img :src="`${post.img.toLowerCase()}.jpg`" :alt="post.nom" :title="post.nom" loading="lazy">
                            <RouterLink :to="{name :'place' , params : { id : post.id}}" class="visit">➟ Voire</RouterLink>
                        </div>

                        <div v-else class="NoLikes">
                            <span>Aucun post trouvé dans le panier ...</span>
                        </div>
                    </div>
                    <button v-if="saved.length !== 0" class="scroll-btn right" @click="scrollRight2"><img src="@/assets/pics/user/right.svg" alt=""></button>
            </div>
            <span v-if="saved.length > 1" class="swipe">glisser >> </span>
            </div>


        </div>
    </div>
    
</template>

<style scoped>
.swipe{
    display: none;
}
.user{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.background-img{
    width: 85%;
    height: 300px;
    background-image: url('@/assets/pics/user/user-bg.webp');
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 8px;
}
.user-infos{
    width: 80%;
}
.informations{
    display: flex;
    gap: 1rem;
}
.informations img{
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    margin-top: -6%;
    border: 5px solid var(--mainColor);
}

.informations h2{
    color: rgb(231, 231, 231);
    font-size: 1.5rem;
}

.user-cred{
    width: 60%;
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    border-top:  2px solid rgba(92, 91, 91, 0.349);
}
.user-cred div{
    display: grid;
    grid-template-columns: 250px 1fr;
    border-bottom: 2px solid rgba(92, 91, 91, 0.349);
    padding-block: .5rem;
}

.user-cred div h3,.user-cred div p {
    font-size: .9rem;
    font-weight: 500;
    color: rgb(231, 231, 231);
}
.user-cred div p{
    color : var(--secondaryColor);
}

.liked-posts{
    width: 100%;
    margin-top: 2rem;

}
.liked-posts h4 {
    color: aliceblue;
    font-size: 1.2rem;
   
}
.posts-img{
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    width: 100%;
    overflow-x: scroll;
    scrollbar-width: none;
}

.post{
    margin: 1rem;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    height: 100%;
    border-radius: 1rem;
    border: 2px solid var(--secondaryColor);
}
.visit{
    /* height: 2rem; */
    width: max-content;
    padding: 8px;
    background-color: var(--secondaryColor);
    text-decoration: none;
    color: white;
    border-radius: 1rem;
    margin-top: 1rem;
    text-align: center;
}
.post img {
    border-radius: 1rem;
    width: 350px;
    aspect-ratio: 2/1;
}
.groupe-imgs{
    display: flex;
    align-items: center;
    gap :1rem;
}

.groupe-imgs button{
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 1px -1px 8px var(--secondaryColor);
    background-color: transparent;
    width: 2.6rem;
    height: 2.6rem;
    border: none;
    outline: none;
    border-radius: 8px;
    border: 1px solid var(--secondaryColor);
}

.groupe-imgs button img {
    height: 1.8rem;
    width: 1.8rem;
    transition: transform 300ms ease-in-out;
}

.right img:hover{
    transform: translateX(7px);
}
.left img:hover{
    transform: translateX(-7px);
}
.NoLikes{
    height: 300px;
    width: 100%;
    /* border: 1px solid lime; */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: whitesmoke;
}

@media (width < 923px) {
    .user-cred{
        width: 90%;
    }
}

@media(width<590px){
    .swipe{
        display: block;
        font-size: .8rem;
        font-weight: 700;
        color: var(--secondaryColor);
    }
    .post img {
        width: 320px;
    }
    .liked-posts{
        margin-bottom: 3rem;
    }
    .liked-posts h4 {
        font-size: 1rem;
    }
    .NoLikes{
        font-size: 1.1rem;
    }
    .groupe-imgs button{
        display: none;
    }

    .informations{
        display: flex;
        gap: .5rem;
    }
    .informations img{
        width: 7rem;
        height: 7rem;
        margin-top: -8%;
    }

    .informations h2{
        color: rgb(231, 231, 231);
        font-size: 1.5rem;
    }

    .user-infos{
        width: 95%;
    }
    .background-img{
        width: 100%;
        height: 200px;
    }


    .user-cred{
        width: 100%;
    }
    .user-cred div{
        grid-template-columns: 1fr 1fr;
    }

    .user-cred div h3,.user-cred div p {
        font-size: .77rem;
    }

}
@media (width <376px) {
    .post img {
        width: 280px;
    }
    .liked-posts h4 {
        font-size: .8rem;
    }
}
@media (width<322px) {
    .post img{
        width: 250px;
    }
}
</style>



<script setup>
import { isAuthed } from '@/composables/LogicAuth';
import { RouterLink } from 'vue-router';
import { img } from '@/composables/LogicAuth';
import useLike from '@/composables/useLikesManagement';
import { computed, onMounted, ref, watch } from 'vue';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/Firebase/firebase';
import router from '@/router';
import defaultImg from '@/assets/pics/user.png';

const onImageError = (event) => {
    event.target.src = defaultImg;
};



const postsContainer = ref(null);
const postsContainer2 = ref(null);

const scrollLeft = () => {
  if (postsContainer.value) {
    postsContainer.value.scrollBy({ left: -350, behavior: "smooth" });
  }
};
const scrollLeft2 = () => {
  if (postsContainer2.value) {
    postsContainer2.value.scrollBy({ left: -350, behavior: "smooth" });
  }
};
const scrollRight = () => {
  if (postsContainer.value) {
    postsContainer.value.scrollBy({ left: 350, behavior: "smooth" });
  }
};

const scrollRight2 = () => {
  if (postsContainer2.value) {
    postsContainer2.value.scrollBy({ left: 350, behavior: "smooth" });
  }
};
const { fetchUserLikes , fetchUserSaves} = useLike();
const userLikes = ref([]);
const userSaves = ref([]);
const places = ref([]);

onMounted(async () => {
    try {
        userLikes.value = await fetchUserLikes();
        userSaves.value = await fetchUserSaves();
        onSnapshot(collection(db, 'places'), (querySnapshot) => {
            places.value = querySnapshot.docs.map(doc => ({
                id: doc.id,
                nom: doc.data().nom,
                img: doc.data().img,
            }));
        });
    } catch (error) {
        console.log("Error fetching data:", error);
        router.push('/');
    }
});

// ✅ Computed property that automatically updates
const liked = computed(() => {
    if (userLikes.value.length === 0 || places.value.length === 0) {
        return [];
    }
    const likedSet = new Set(userLikes.value); // O(1) lookups
    return places.value.filter(place => likedSet.has(place.id));
});

const saved = computed(() => {
    if (userSaves.value.length === 0 || places.value.length === 0) {
        return [];
    }
    const SavedSet = new Set(userSaves.value); // O(1) lookups
    return places.value.filter(place => SavedSet.has(place.id));
});

</script>