<template>
    <div class="cinematic-profile">
        
        <!-- HERO SECTION -->
        <section class="hero-section">
            <div class="hero-bg"></div>
            <div class="hero-gradient"></div>
            
            <div class="hero-content">
                <div class="profile-avatar">
                    <img :src="img || defaultImg" alt="" loading="lazy" @error="onImageError">
                </div>
                
                <div class="profile-titles">
                    <h1>{{ isAuthed.displayName }}</h1>
                    <div class="stats-row">
                        <div class="stat">
                            <span class="num">{{ liked.length }}</span>
                            <span class="lbl">Coups de cœur</span>
                        </div>
                        <div class="divider"></div>
                        <div class="stat">
                            <span class="num">{{ saved.length }}</span>
                            <span class="lbl">Dans le panier</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div class="content-area">
            
            <!-- LIKED POSTS ROW -->
            <section class="media-row">
                <div class="row-header">
                    <h3>Vos coups de cœur</h3>
                    <div class="scroll-controls" v-if="liked.length > 3">
                        <button @click="scrollLeft"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
                        <button @click="scrollRight"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
                    </div>
                </div>

                <div class="media-scroller" ref="postsContainer">
                    <template v-if="liked.length !== 0">
                        <RouterLink 
                            v-for="post in liked" 
                            :key="post.id" 
                            :to="{name :'place' , params : { id : post.id}}"
                            class="media-card"
                        >
                            <div class="card-img">
                                <img :src="`${post.img.toLowerCase()}.jpg`" :alt="post.nom" loading="lazy">
                                <div class="card-overlay">
                                    <span>{{ post.nom }}</span>
                                </div>
                            </div>
                        </RouterLink>
                    </template>
                    <div v-else class="empty-message">
                        <p>Aucun coup de cœur pour le moment.</p>
                    </div>
                </div>
            </section>

            <!-- SAVED POSTS ROW -->
            <section class="media-row">
                <div class="row-header">
                    <h3>Votre panier de voyage</h3>
                    <div class="scroll-controls" v-if="saved.length > 3">
                        <button @click="scrollLeft2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
                        <button @click="scrollRight2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
                    </div>
                </div>

                <div class="media-scroller" ref="postsContainer2">
                    <template v-if="saved.length !== 0">
                        <RouterLink 
                            v-for="post in saved" 
                            :key="post.id" 
                            :to="{name :'place' , params : { id : post.id}}"
                            class="media-card"
                        >
                            <div class="card-img">
                                <img :src="`${post.img.toLowerCase()}.jpg`" :alt="post.nom" loading="lazy">
                                <div class="card-overlay">
                                    <span>{{ post.nom }}</span>
                                </div>
                            </div>
                        </RouterLink>
                    </template>
                    <div v-else class="empty-message">
                        <p>Votre panier est vide.</p>
                    </div>
                </div>
            </section>

        </div>
    </div>
</template>

<script setup>
import { isAuthed } from '@/composables/LogicAuth';
import { RouterLink } from 'vue-router';
import { img } from '@/composables/LogicAuth';
import useLike from '@/composables/useLikesManagement';
import { computed, onMounted, ref } from 'vue';
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

const { fetchUserLikes, fetchUserSaves } = useLike();
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

const liked = computed(() => {
    if (userLikes.value.length === 0 || places.value.length === 0) {
        return [];
    }
    const likedSet = new Set(userLikes.value);
    return places.value.filter(place => likedSet.has(place.id));
});

const saved = computed(() => {
    if (userSaves.value.length === 0 || places.value.length === 0) {
        return [];
    }
    const SavedSet = new Set(userSaves.value);
    return places.value.filter(place => SavedSet.has(place.id));
});
</script>

<style scoped>

.cinematic-profile {
    background-color: var(--mainBgcolor, #0d1117);
    min-height: 100vh;
    font-family: 'Inter', sans-serif;
    color: #fff;
    overflow-x: hidden;
}

/* --- HERO SECTION --- */
.hero-section {
    position: relative;
    width: 100%;
    height: 450px; /* Large cinematic banner */
    display: flex;
    align-items: flex-end;
    padding: 0 5vw 40px;
}

.hero-bg {
    position: absolute;
    inset: 0;
    background-image: url('@/assets/pics/user/user-bg.webp');
    background-size: cover;
    background-position: center 30%;
    z-index: 1;
}

.hero-gradient {
    position: absolute;
    inset: 0;
    background: 
        linear-gradient(to top, var(--mainBgcolor, #0d1117) 0%, rgba(13, 17, 23, 0.7) 40%, rgba(13, 17, 23, 0.2) 100%),
        linear-gradient(to right, rgba(13, 17, 23, 0.8) 0%, transparent 60%);
    z-index: 2;
}

.hero-content {
    position: relative;
    z-index: 3;
    display: flex;
    align-items: flex-end;
    gap: 30px;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
}

.profile-avatar {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
    flex-shrink: 0;
    background: #12171c;
}

.profile-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.profile-titles {
    padding-bottom: 10px;
}

.profile-titles h1 {
    font-family: 'Smooch Sans', sans-serif;
    font-size: clamp(3rem, 6vw, 5rem);
    line-height: 1;
    margin: 0 0 15px 0;
    letter-spacing: -1px;
    text-shadow: 0 4px 20px rgba(0,0,0,0.8);
}

/* Stats Row */
.stats-row {
    display: flex;
    align-items: center;
    gap: 20px;
}

.stat {
    display: flex;
    align-items: baseline;
    gap: 8px;
}

.stat .num {
    font-family: 'Smooch Sans', sans-serif;
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--secondaryColor, #009afa);
}

.stat .lbl {
    font-size: 0.85rem;
    color: #8b96a5;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
}

.divider {
    width: 1px;
    height: 24px;
    background: rgba(255, 255, 255, 0.2);
}

/* --- CONTENT AREA --- */
.content-area {
    padding: 40px 5vw 100px;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 4;
    margin-top: -20px;
}

.media-row {
    margin-bottom: 60px;
}

.row-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 20px;
    padding: 0 4px;
}

.row-header h3 {
    font-family: 'Smooch Sans', sans-serif;
    font-size: 1.8rem;
    margin: 0;
    color: #fff;
    letter-spacing: -0.5px;
}

.scroll-controls {
    display: flex;
    gap: 8px;
}

.scroll-controls button {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}

.scroll-controls button:hover {
    background: var(--secondaryColor, #009afa);
    border-color: var(--secondaryColor, #009afa);
}

/* --- MEDIA SCROLLER (Netflix style) --- */
.media-scroller {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    scroll-behavior: smooth;
    scrollbar-width: none;
    padding-bottom: 10px;
    padding-top: 4px;
}

.media-scroller::-webkit-scrollbar {
    display: none;
}

.media-card {
    flex: 0 0 auto;
    width: 280px;
    aspect-ratio: 16/9;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    text-decoration: none;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.media-card:hover {
    transform: scale(1.03);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    z-index: 2;
}

.card-img {
    width: 100%;
    height: 100%;
    position: relative;
}

.card-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 0.3s ease;
}

.media-card:hover .card-img img {
    filter: brightness(0.7);
}

.card-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: flex-end;
    padding: 16px;
    background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.media-card:hover .card-overlay {
    opacity: 1;
}

.card-overlay span {
    color: #fff;
    font-family: 'Smooch Sans', sans-serif;
    font-size: 1.2rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* --- EMPTY STATE --- */
.empty-message {
    width: 100%;
    padding: 40px;
    border-radius: 12px;
    border: 1px dashed rgba(255, 255, 255, 0.1);
    text-align: center;
    color: #6b7280;
}

.empty-message p {
    margin: 0;
    font-size: 0.95rem;
}

/* --- RESPONSIVE --- */
@media (max-width: 768px) {
    .hero-section {
        height: 380px;
        padding: 0 4vw 30px;
    }

    .hero-content {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }

    .profile-avatar {
        width: 100px;
        height: 100px;
    }

    .profile-titles h1 {
        font-size: 2.8rem;
    }

    .stat .num {
        font-size: 1.4rem;
    }

    .stat .lbl {
        font-size: 0.7rem;
    }

    .divider {
        height: 16px;
    }

    .content-area {
        padding: 30px 4vw 80px;
    }

    .media-card {
        width: 220px;
    }
    
    .row-header h3 {
        font-size: 1.4rem;
    }
}
</style>