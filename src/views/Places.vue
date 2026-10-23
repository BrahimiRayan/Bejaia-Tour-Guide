<template>
    <div class="cnt" v-if="places">

        <Slider />
        <button :class="{ 'animatedtglHalper': !openHelper, 'tglHelper': openHelper }"
            @click="openHelper = !openHelper">
            <Transition name="turn" mode="out-in">
                <img v-if="!openHelper" src="../assets/pics/ChatHelper/ChatGuide.png" alt="">
                <img v-else src="../assets/pics/ChatHelper/close.svg" alt="">
            </Transition>
        </button>
        <span v-if="openHelper">
            <ChatHelper :places="places" />
        </span>

        <Description />

        <section class="places">
            <div class="filter">
                <NavigationButtons @term="recivedterm" />
            </div>
            <div class="Grid">
                <div v-for="place in visiblePlaces" :key="place.id">

                    <span v-if="categorie === 'tout'">

                        <div class="placeHolder-left" v-if="widthOfScreen >= 769">
                            <div class="place-description">
                                <div class="titleBlock">

                                    <h2>
                                        <RouterLink class="post-name" :to="{ name: 'place', params: { id: place.id } }">
                                            {{
                                                place.nom }} <img src="@/assets/pics/click.svg" alt="" loading="lazy">
                                        </RouterLink>
                                    </h2>

                                    <a :href="`https://www.google.com/maps?q=${place.location.latitude},${place.location.longitude}`"
                                        target="_blank" class="location1">
                                        <SiGooglemaps class="Mapicon" />
                                    </a>
                                </div>
                                <p>{{ place.description.substring(0, 200) }}...
                                    <RouterLink class="MoreInfo" :to="{ name: 'place', params: { id: place.id } }">plus➜
                                    </RouterLink>
                                </p>
                            </div>
                            <div class="placeImg">

                                <img :src="`${place.img.toLowerCase()}.jpg`" :alt="place.nom" :title="place.nom"
                                    @click="openImage(place)" loading="lazy">
                                <FlArrowExpand class="expandIcon" @click="openImage(place)" />
                            </div>
                            <ImageResizer v-if="place.isOpen" :isVisible="place.isOpen"
                                :imgsrc="`${place.img.toLowerCase()}.jpg`" @close="closeImage(place)" />
                            <PostSocial :postID="place.id" class="PostSocial" />
                        </div>


                        <div class="phone-placeHolder" v-if="widthOfScreen < 769">
                            <div class="phone-placeImg">
                                <img :src="`${place.img.toLowerCase()}.jpg`" :alt="place.nom" :title="place.nom"
                                    @click="openImage(place)" loading="lazy">
                                <FlArrowExpand class="expandIcon" @click="openImage(place)" />
                            </div>
                            <div class="phone-place-description">
                                <div class="mobile-title-block">
                                    <h2>
                                        <RouterLink class="post-name" :to="{ name: 'place', params: { id: place.id } }">
                                            {{ place.nom }}
                                        </RouterLink>
                                    </h2>
                                    <a :href="`https://www.google.com/maps?q=${place.location.latitude},${place.location.longitude}`"
                                        target="_blank" class="mobile-location-btn">
                                        <SiGooglemaps class="Mapicon" />
                                    </a>
                                </div>
                                <p>{{ place.description }}</p>
                                <RouterLink class="read-more" :to="{ name: 'place', params: { id: place.id } }">
                                    Lire la suite
                                </RouterLink>
                            </div>
                            <ImageResizer v-if="place.isOpen" :isVisible="place.isOpen"
                                :imgsrc="`${place.img.toLowerCase()}.jpg`" @close="closeImage(place)" />
                            <PostSocial :postID="place.id" />
                        </div>
                    </span>

                    <span v-else>

                        <div class="placeHolder-left" v-if="place.categorie === categorie && widthOfScreen >= 769">
                            <div class="place-description">
                                <div class="titleBlock">

                                    <h2>
                                        <RouterLink class="post-name" :to="{ name: 'place', params: { id: place.id } }">
                                            {{
                                                place.nom }} <img src="@/assets/pics/click.svg" alt="" loading="lazy">
                                        </RouterLink>
                                    </h2>

                                    <a :href="`https://www.google.com/maps?q=${place.location.latitude},${place.location.longitude}`"
                                        target="_blank" class="location1">
                                        <SiGooglemaps class="Mapicon" />
                                    </a>
                                </div>
                                <p>{{ place.description.substring(0, 200) }}...
                                    <RouterLink class="MoreInfo" :to="{ name: 'place', params: { id: place.id } }">plus➜
                                    </RouterLink>
                                </p>
                            </div>
                            <div class="placeImg">

                                <img :src="`${place.img.toLowerCase()}.jpg`" :alt="place.nom" :title="place.nom"
                                    @click="openImage(place)" loading="lazy">
                                <FlArrowExpand class="expandIcon" @click="openImage(place)" />
                            </div>
                            <ImageResizer v-if="place.isOpen" :isVisible="place.isOpen"
                                :imgsrc="`${place.img.toLowerCase()}.jpg`" @close="closeImage(place)" />
                            <PostSocial :postID="place.id" class="PostSocial" />
                        </div>


                        <div class="phone-placeHolder" v-if="place.categorie === categorie && widthOfScreen < 769">
                            <div class="phone-placeImg">
                                <img :src="`${place.img.toLowerCase()}.jpg`" :alt="place.nom" :title="place.nom"
                                    @click="openImage(place)" loading="lazy">
                                <FlArrowExpand class="expandIcon" @click="openImage(place)" />
                            </div>
                            <div class="phone-place-description">
                                <div class="mobile-title-block">
                                    <h2>
                                        <RouterLink class="post-name" :to="{ name: 'place', params: { id: place.id } }">
                                            {{ place.nom }}
                                        </RouterLink>
                                    </h2>
                                    <a :href="`https://www.google.com/maps?q=${place.location.latitude},${place.location.longitude}`"
                                        target="_blank" class="mobile-location-btn">
                                        <SiGooglemaps class="Mapicon" />
                                    </a>
                                </div>
                                <p>{{ place.description }}</p>
                                <RouterLink class="read-more" :to="{ name: 'place', params: { id: place.id } }">
                                    Lire la suite
                                </RouterLink>
                            </div>
                            <ImageResizer v-if="place.isOpen" :isVisible="place.isOpen"
                                :imgsrc="`${place.img.toLowerCase()}.jpg`" @close="closeImage(place)" />
                            <PostSocial :postID="place.id" />
                        </div>

                    </span>

                </div>

                <div v-if="places.length === 0" id="loading-screen">
                    <img src="../../spinner.gif" alt="">
                    <h2>Chargement en cours...</h2>
                </div>
            </div>

        </section>
    </div>

    <FunSection />
</template>

<script setup>
import { SiGooglemaps, FlArrowExpand } from '@kalimahapps/vue-icons';
import Slider from '@/components/Slider.vue';
import NavigationButtons from '@/components/NavigationButtons.vue';
import { db } from '@/Firebase/firebase.js';
import { onSnapshot, collection } from 'firebase/firestore';
import ImageResizer from '@/components/imageResizer.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import PostSocial from '@/components/PostSocial.vue';
import ChatHelper from '@/components/ChatHelper.vue';
import Description from '@/components/Description.vue';
import FunSection from '@/components/FunSection.vue';

var openHelper = ref(false)


const widthOfScreen = ref(window.innerWidth);
window.addEventListener('resize', () => {
    widthOfScreen.value = window.innerWidth;
})

const places = ref([]);
const categorie = ref('tout');
const visiblePlaces = computed(() => places.value.filter((place) =>
    categorie.value === 'tout' || place.categorie === categorie.value
));

const recivedterm = (value) => {
    categorie.value = value;
}

const openImage = (place) => {
    place.isOpen = true;
    document.body.style.overflow = 'hidden';
};

const closeImage = (place) => {
    place.isOpen = false;
    document.body.style.overflow = 'auto';
};

onMounted(() => {
    onSnapshot(collection(db, 'places'), (querySnapshot) => {
        const p = [];
        querySnapshot.forEach((doc) => {
            const place = {
                id: doc.id,
                nom: doc.data().nom,
                description: doc.data().description,
                img: doc.data().img,
                location: doc.data().location,
                categorie: doc.data().categorie,
                isOpen: false,
            };
            p.push(place);
        });
        places.value = p;
    });
});

watch(places, (newImages) => {
    const anyImageVisible = newImages.some((placeimg) => placeimg.isOpen);
    if (!anyImageVisible) {
        document.body.style.overflow = 'auto';
    }
});

</script>

<style scoped>
.PostSocial {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 2;
}

@keyframes bating {
    0% {
        outline: 6px solid #009afa;
    }

    25% {
        outline: 4px solid #47dd21;
    }

    50% {
        outline: 2px solid yellow;
    }

    100% {
        outline: 1px solid red;
    }
}

.turn-enter-active,
.turn-leave-active {
    transition: transform 900ms ease-in-out;
}

.turn-enter-from,
.turn-leave-to {
    transform: rotate(360deg);
}

.tglHelper {
    background: rgb(169, 252, 255);
    border: none;
    outline: none;
    border-radius: 50%;
    overflow: hidden;
    width: 50px;
    height: 50px;
    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 9999;

}

.animatedtglHalper {
    background: rgb(169, 252, 255);
    border: none;
    outline: none;
    border-radius: 50%;
    overflow: hidden;
    width: 50px;
    height: 50px;
    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 9999;
    animation: bating 900ms infinite;
    animation-direction: alternate-reverse;
    animation-timing-function: ease-in-out;
}

.tglHelper img,
.animatedtglHalper img {
    width: 100%;
    aspect-ratio: 1;
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

#loading-screen img {
    margin-top: 45%;
    width: 5rem;
    height: 5rem;
}

.MoreInfo {
    color: var(--deepBlue);
    text-decoration: none;
    text-align: center;
}

#loading-screen h2 {
    color: #009afa;
    margin-top: 1rem;
}





.places {
    margin-bottom: 30px;
}

.filter {
    display: flex;
    align-items: center;
    justify-content: center;
}

.Grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: .9rem;
    padding: 2rem;
}

.filter h3 {
    color: var(--mainTextcolor);
    margin-bottom: .8rem;
    font-weight: 700;
    font-size: 1.1rem;
}


.places .placeHolder-left {
    height: max-content;
    border-radius: 12px;
    margin: 12px auto;
    position: relative;
    aspect-ratio: 16/9;
    overflow: hidden;
    background: linear-gradient(135deg, #1c232b 0%, #223244 100%);
}

.expandIcon {
    background-color: rgba(0, 0, 0, 0.425);
    color: aliceblue;
    position: absolute;
    top: 10px;
    right: 10px;
}

.places .placeHolder-left .placeImg img {
    cursor: pointer;
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform .7s ease, filter .5s;
    filter: brightness(.75) blur(1px);
}

.places .placeHolder-left .placeImg:hover img {
    transform: scale(1.08);
    filter: brightness(1)
}

.places .placeHolder .placeImg img {
    cursor: pointer;
    width: 99%;
    max-height: 480px;
    border: 1px solid rgb(255, 255, 255);
    border-radius: 8px;
}

.place-description {
    position: absolute;
    inset: 9rem 0 0 0;
    padding: 24px;
    background: linear-gradient(180deg, transparent, rgba(0, 0, 0, .85));
    z-index: 1;
}

.place-description h2 {
    font-size: 1.3rem;
    display: flex;
    font-weight: 900;
    flex-direction: column;
    gap: 8px;
}

.titleBlock {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.place-description h2>.post-name {
    text-decoration: none;
    color: var(--secondaryColor);
    text-shadow: 0 0 5px rgba(6, 6, 6, 0.871);
}

.post-name img {
    width: 1.4rem;
    height: 1.4rem;
}

.place-description p {
    font-size: 1rem;
    padding-inline: 1rem;
    color: var(--mainTextcolor);
}


.location1 {
    width: max-content;
    border-radius: 30%;
    text-decoration: none;
    padding: .5rem;
    color: rgb(255, 121, 68);
    font-size: 0.9rem;
    transition: background 500ms ease;
}

.svg {
    height: 22px;
    width: 22px;
    margin-right: 8px;
}






.phone-placeHolder {
    width: 92%;
    margin: 20px auto;
    background: #161c22;
    border-radius: 24px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    flex-direction: column;
}

.phone-placeHolder .phone-placeImg {
    position: relative;
    width: 100%;
    aspect-ratio: 4/3;
    overflow: hidden;
}

.phone-placeHolder .phone-placeImg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
    transition: transform 0.5s ease;
    border: none;
}

.phone-placeHolder .phone-placeImg:active img {
    transform: scale(1.05);
}

.phone-placeHolder .expandIcon {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 34px;
    height: 34px;
    padding: 6px;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
    border-radius: 10px;
    color: white;
    cursor: pointer;
    z-index: 5;
    box-sizing: border-box;
}

.phone-place-description {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.mobile-title-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
}

.mobile-title-block h2 {
    margin: 0;
    flex: 1;
}

.mobile-title-block .post-name {
    text-decoration: none;
    color: #fff;
    font-family: 'Smooch Sans', sans-serif;
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1.2;
    display: block;
}

.mobile-location-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: rgba(0, 154, 250, 0.15);
    border-radius: 12px;
    color: var(--secondaryColor);
    flex-shrink: 0;
    transition: background 0.3s;
}

.mobile-location-btn:active {
    background: var(--secondaryColor);
    color: white;
}

.mobile-location-btn .Mapicon {
    width: 22px;
    height: 22px;
}

.phone-place-description p {
    color: #8b96a5;
    font-size: 1rem;
    line-height: 1.6;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.read-more {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    align-self: flex-start;
    background: var(--secondaryColor);
    color: #fff;
    text-decoration: none;
    padding: 10px 22px;
    border-radius: 30px;
    font-size: 0.9rem;
    font-weight: 600;
    margin-top: 5px;
    transition: transform 0.2s, background 0.2s;
}

.read-more:active {
    transform: scale(0.95);
    background: #007acc;
}

@media (769px< width <1300px) {
    .Mapicon {
        width: 2rem;
        height: 2rem;
    }

    .place-description {
        position: absolute;
        inset: 53% 0 0 0;
        padding: 1rem;
        color: aqua;

    }

    .Grid {

        grid-template-columns: 1fr;
    }
}

@media (width < 769px) {
    .Grid {
        display: block;
        padding: 0;
    }

    .placeHolder-left {
        display: none;
    }

    .PostSocial {
        position: relative;
        margin-top: -5px;
        background: #161c22;
        border-top: 1px solid rgba(255, 255, 255, 0.05);
        padding: 10px;
    }
}

@media (width < 536px) {

    .tglHelper,
    .animatedtglHalper {
        width: 40px;
        height: 40px;
        bottom: 15px;
        right: 15px;
    }

    .phone-placeHolder {
        width: 95%;
        border-radius: 20px;
    }

    .mobile-title-block .post-name {
        font-size: 1.4rem;
    }
}

@media (width < 375px) {
    .phone-place-description p {
        font-size: 0.9rem;
        line-clamp: 4;
    }

    .filter h3 {
        font-size: 0.9rem;
    }

    #loading-screen h2 {
        font-size: .9rem;
    }
}
</style>