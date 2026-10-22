<template>
    <div v-if="place" class="place-page">
        
        <header class="place-header">
            <div class="category-tag">
                Catégorie <span>{{ place.categorie }}</span>
            </div>
            <h1 class="place-name">{{ place.nom }}</h1>
        </header>

        <div class="hero-container">
            <Transition name="fade-img-map" mode="out-in">
                <img 
                    v-if="!toogled" 
                    class="hero-media" 
                    :src="`/${place.img.toLowerCase()}.jpg`" 
                    :title="place.nom"
                >
                <div v-else class="hero-media map-wrapper">
                    <Map 
                        :nom="place.nom" 
                        :lat="place.location.latitude" 
                        :long="place.location.longitude"
                        class="map-element" 
                    />
                </div>
            </Transition>

            <div class="floating-tools">
                <a :href="`/${place.img.toLowerCase()}.jpg`" :download="`${place.nom}.jpg`" class="tool-btn" title="Télécharger">
                    <img src="../assets/pics/download.svg" alt="" loading="lazy">
                </a>
                <button @click="copyLink" class="tool-btn" title="Copier le lien">
                    <img src="../assets/pics/copy.svg" alt="" loading="lazy">
                </button>
                <button @click="toggleShow" class="tool-btn" title="Voir la carte">
                    <Transition name="fade" mode="out-in">
                        <img v-if="toogled" src="../assets/pics/socials/map-open.svg" alt="">
                        <img v-else src="../assets/pics/socials/map-close.svg" alt="">
                    </Transition>
                </button>
            </div>
        </div>

        <main class="place-content">
            
            <div class="action-bar" v-if="isAuthed">
                <button class="action-btn" @click="handleLike">
                    <Transition name="fade" mode="out-in">
                        <img v-if="liked" src="@/assets/pics/socials/like-click.svg" alt="">
                        <img v-else src="@/assets/pics/socials/like-unclick.svg" alt="">
                    </Transition>
                    <span>J'aime</span>
                </button>

                <a href="#jump" class="action-btn">
                    <img src="@/assets/pics/socials/comment.svg" alt="">
                    <span>Commenter</span>
                </a>

                <button class="action-btn" @click="handleSave">
                    <img v-if="save" src="@/assets/pics/socials/save-active.svg" alt="">
                    <img v-else src="@/assets/pics/socials/save-no-active.svg" alt="">
                    <span>Panier</span>
                </button>
            </div>

            <p class="place-description" id="jump">{{ place.description }}</p>

            <div class="comments-wrapper">
                <Comments :post_id="postId" />
            </div>

        </main>
    </div>

    <div v-else id="loading-screen">
        <img src="../../spinner.gif" alt="">
        <h2>Chargement en cours...</h2>
    </div>
</template>

<script setup>
import { db } from '@/Firebase/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { isAuthed } from '@/composables/LogicAuth';
import useLike from '@/composables/useLikesManagement';
import notify from '@/composables/useNotify';
import Comments from '@/components/Comments.vue';
import Map from '@/components/Map.vue';

const { toggleLike, fetchUserLikes, toggleSave, fetchUserSaves } = useLike();

const copied = ref(false);
const route = useRoute();
const postId = route.params.id;
const place = ref(null);
const liked = ref(false);
const save = ref(false);
const toogled = ref(false);

const toggleShow = () => {
    toogled.value = !toogled.value;
}

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
        save.value = userSaves.includes(postId);
    }

    return unsubscribe;
});

const handleLike = async () => {
    await toggleLike(postId);
    liked.value = !liked.value;
};

const handleSave = async () => {
    await toggleSave(postId)
    save.value = !save.value;
};

const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
        notify('Le lien est copié avec succès', 'success')
    });
};

setTimeout(() => {
    if (!isAuthed.value) {
        notify('Vous devez être connecté pour liker, commenter et accéder à d\'autres fonctionnalités.', 'warning');
    }
}, 3000);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Signika:wght@300..700&family=Smooch+Sans:wght@100..900&display=swap');

* {
    scroll-behavior: smooth;
}

.place-page {
    background-color: var(--mainBgcolor, #0d1117);
    min-height: 100vh;
    padding-bottom: 100px;
    font-family: "Smooch Sans", sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.place-header {
    text-align: center;
    padding: 80px 20px 40px;
    max-width: 900px;
}

.category-tag {
    font-size: 1.1rem;
    color: #8b96a5;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 12px;
}

.category-tag span {
    color: #0d1117;
    background-color: var(--secondaryColor);
    padding: 4px 12px;
    border-radius: 20px;
    font-weight: 700;
    letter-spacing: 1px;
    margin-left: 8px;
}

.place-name {
    font-family: "Smooch Sans", sans-serif;
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 900;
    color: var(--secondaryColor);
    line-height: 1;
    margin: 0;
    text-shadow: 0 10px 30px rgba(0, 168, 255, 0.2);
}

.hero-container {
    position: relative;
    width: 90%;
    max-width: 1200px;
    aspect-ratio: 16/9;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.8);
    margin-bottom: 40px;
}

.hero-media {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.map-wrapper {
    background: #12171c;
}

.map-element {
    width: 100%;
    height: 100%;
    border: none;
}

.floating-tools {
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: flex;
    gap: 12px;
    z-index: 10;
}

.tool-btn {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(23, 40, 227, 0.707);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
}

.tool-btn img {
    width: 20px;
    height: 20px;
    filter: brightness(0) invert(1);
}

.tool-btn:hover {
    background: var(--secondaryColor);
    border-color: var(--secondaryColor);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 168, 255, 0.4);
}

.tool-btn:hover img {
    filter: brightness(0) invert(0);
}

.place-content {
    width: 90%;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.action-bar {
    display: flex;
    gap: 20px;
    padding: 16px 32px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 60px;
    margin-bottom: 40px;
    flex-wrap: wrap;
    justify-content: center;
}

.action-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    color: #eef2f6;
    border: none;
    cursor: pointer;
    font-family: "Smooch Sans", sans-serif;
    font-size: 1.2rem;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.3s ease;
}

.action-btn img {
    width: 22px;
    height: 22px;
    transition: transform 0.3s ease;
}

.action-btn:hover {
    color: var(--secondaryColor);
}

.action-btn:hover img {
    transform: scale(1.2);
}

.place-description {
    width: 100%;
    color: #d1d5db;
    font-size: 1.35rem;
    line-height: 1.8;
    letter-spacing: 0.5px;
    text-align: justify;
    margin-bottom: 60px;
    padding: 0 10px;
    border-left: 3px solid var(--secondaryColor);
    padding-left: 20px;
}

.comments-wrapper {
    width: 100%;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 40px;
}


.fade-enter-active,
.fade-leave-active {
    transition: transform 300ms ease-in-out, opacity 300ms ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
    transform: scale(1.5);
    opacity: 0;
}

.fade-img-map-enter-active,
.fade-img-map-leave-active {
    transition: transform 500ms ease-in-out, opacity 500ms ease-in-out;
}
.fade-img-map-enter-from,
.fade-img-map-leave-to {
    transform: scale(1.05);
    opacity: 0;
}

#loading-screen {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background: #0d1117;
}

#loading-screen img {
    width: 5rem;
    height: 5rem;
}

#loading-screen h2 {
    color: var(--secondaryColor);
    margin-top: 1rem;
    font-family: "Smooch Sans", sans-serif;
    letter-spacing: 2px;
}

@media (max-width: 768px) {
    .place-header {
        padding-top: 60px;
    }
    
    .hero-container {
        width: 95%;
        aspect-ratio: 4/3;
        border-radius: 16px;
    }

    .place-content {
        width: 95%;
    }

    .floating-tools {
        bottom: 15px;
        right: 15px;
    }

    .tool-btn {
        width: 40px;
        height: 40px;
    }

    .tool-btn img {
        width: 18px;
        height: 18px;
    }

    .action-bar {
        border-radius: 20px;
        padding: 15px;
        gap: 15px;
    }

    .place-description {
        font-size: 1.15rem;
        padding-left: 15px;
    }
}

@media (max-width: 425px) {
    .action-btn span {
        display: none;
    }
    
    .action-btn {
        padding: 10px;
    }
    
    .action-bar {
        gap: 25px;
    }
}
</style>