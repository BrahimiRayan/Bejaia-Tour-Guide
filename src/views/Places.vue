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
                <div v-if="places.length !== 0" v-for="(place, index) in places" :key="index">

                    <span v-if="categorie === 'tout'">
                        <div class="placeHolder-left" v-if="widthOfScreen >= 769">
                            <div class="place-description">
                                <div class="titleBlock">
                                
                                <h2>
                                    <RouterLink class="post-name" :to="{ name: 'place', params: { id: place.id } }">{{
                                        place.nom }} <img src="@/assets/pics/click.svg" alt="" loading="lazy">
                                    </RouterLink> 
                                </h2>

                                <a
                                    :href="`https://www.google.com/maps?q=${place.location.latitude},${place.location.longitude}`"
                                    target="_blank" class="location1">
                                    <SiGooglemaps class="Mapicon" />
                                </a>
                               </div> 
                                <p>{{ place.description.substring(0,200) }}...
                                    <RouterLink class="MoreInfo" :to="{ name: 'place', params: { id: place.id } }">plus➜</RouterLink>
                                </p>
                            </div>
                            <div class="placeImg">

                                <img :src="`${place.img.toLowerCase()}.jpg`" :alt="place.nom" :title="place.nom"
                                    @click="openImage(index)" loading="lazy">
                                <FlArrowExpand class="expandIcon" @click="openImage(index)" />
                            </div>
                            <ImageResizer v-if="place.isOpen" :isVisible="place.isOpen"
                                :imgsrc="`${place.img.toLowerCase()}.jpg`" @close="closeImage(index)" />
                            <PostSocial :postID="place.id" class="is"/>
                        </div>


                        <div class="phone-placeHolder" v-if="widthOfScreen < 769">
                            <div class="phone-placeImg">
                                <img :src="`${place.img.toLowerCase()}.jpg`" :alt="place.nom" :title="place.nom"
                                    @click="openImage(index)" loading="lazy">
                                <FlArrowExpand class="expandIcon" @click="openImage(index)" />
                            </div>
                            <div class="phone-place-description">
                                <h2>
                                    <RouterLink class="post-name" :to="{ name: 'place', params: { id: place.id } }">{{
                                        place.nom }} <img src="@/assets/pics/click.svg" alt="" loading="lazy">
                                    </RouterLink> <a
                                        :href="`https://www.google.com/maps?q=${place.location.latitude},${place.location.longitude}`"
                                        target="_blank" class="location">
                                        <SiGooglemaps class="Mapicon" />
                                    </a>
                                </h2>
                                <p>{{ place.description }}</p>
                                <RouterLink class="read-more" :to="{ name: 'place', params: { id: place.id } }"> Lire
                                    plus</RouterLink>
                            </div>
                            <ImageResizer v-if="place.isOpen" :isVisible="place.isOpen"
                                :imgsrc="`${place.img.toLowerCase()}.jpg`" @close="closeImage(index)" />
                            <PostSocial :postID="place.id" />
                        </div>
                    </span>

                    <span v-else>
                        <div class="placeHolder-left" v-if="place.categorie === categorie && widthOfScreen >= 769">
                            <div class="place-description">
                                <div class="titleBlock">
                                
                                <h2>
                                    <RouterLink class="post-name" :to="{ name: 'place', params: { id: place.id } }">{{
                                        place.nom }} <img src="@/assets/pics/click.svg" alt="" loading="lazy">
                                    </RouterLink> 
                                </h2>

                                <a
                                    :href="`https://www.google.com/maps?q=${place.location.latitude},${place.location.longitude}`"
                                    target="_blank" class="location1">
                                    <SiGooglemaps class="Mapicon" />
                                </a>
                               </div> 
                                <p>{{ place.description.substring(0,200) }}...
                                    <RouterLink class="MoreInfo" :to="{ name: 'place', params: { id: place.id } }">plus➜</RouterLink>
                                </p>
                            </div>
                            <div class="placeImg">

                                <img :src="`${place.img.toLowerCase()}.jpg`" :alt="place.nom" :title="place.nom"
                                    @click="openImage(index)" loading="lazy">
                                <FlArrowExpand class="expandIcon" @click="openImage(index)" />
                            </div>
                            <ImageResizer v-if="place.isOpen" :isVisible="place.isOpen"
                                :imgsrc="`${place.img.toLowerCase()}.jpg`" @close="closeImage(index)" />
                            <PostSocial :postID="place.id" />
                        </div>>

                        <div class="phone-placeHolder" v-if="place.categorie === categorie && widthOfScreen < 769">
                            <div class="phone-placeImg">
                                <img :src="`${place.img.toLowerCase()}.jpg`" :alt="place.nom" :title="place.nom"
                                    @click="openImage(index)" loading="lazy">
                                <FlArrowExpand class="expandIcon" @click="openImage(index)" />
                            </div>
                            <div class="phone-place-description">
                                <h2>
                                    <RouterLink class="post-name" :to="{ name: 'place', params: { id: place.id } }">{{
                                        place.nom }} <img src="@/assets/pics/click.svg" alt="" loading="lazy">
                                    </RouterLink> <a
                                        :href="`https://www.google.com/maps?q=${place.location.latitude},${place.location.longitude}`"
                                        target="_blank" class="location">
                                        <SiGooglemaps class="Mapicon" />
                                    </a>
                                </h2>
                                <p>{{ place.description }}</p>
                                <RouterLink class="read-more" :to="{ name: 'place', params: { id: place.id } }"> Lire
                                    plus</RouterLink>
                            </div>
                            <ImageResizer v-if="place.isOpen" :isVisible="place.isOpen"
                                :imgsrc="`${place.img.toLowerCase()}.jpg`" @close="closeImage(index)" />
                            <PostSocial :postID="place.id" />
                        </div>

                    </span>

                </div>

                <div v-else id="loading-screen">
                    <img src="../../spinner.gif" alt="">
                    <h2>Chargement en cours...</h2>
                </div>
            </div>

        </section>
    </div>

    <FunSection/>
</template>

<script setup>
import { SiGooglemaps, FlArrowExpand } from '@kalimahapps/vue-icons';
import Slider from '@/components/Slider.vue';
import NavigationButtons from '@/components/NavigationButtons.vue';
import { db } from '@/Firebase/firebase.js';
import { onSnapshot, collection } from 'firebase/firestore';
import ImageResizer from '@/components/imageResizer.vue';
import { onMounted, ref, watch } from 'vue';
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

const recivedterm = (value) => {
    categorie.value = value;
}

const openImage = (index) => {
    places.value[index].isOpen = true;
    document.body.style.overflow = 'hidden';
};

const closeImage = (index) => {
    places.value[index].isOpen = false;
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

.is{
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
.MoreInfo{
    color: var(--deepBlue);
    text-decoration: none;
    text-align: center;
}
#loading-screen h2 {
    color: #009afa;
    margin-top: 1rem;
}

.phone-placeHolder {
    width: 95%;
    height: max-content;
    padding: 10px;
    border: 3px solid var(--secondaryColor);
    border-radius: 12px;
    margin: 12px auto;
    position: relative;
}

.phone-placeHolder .phone-placeImg {
    align-self: center;
    position: relative;
}

.places .phone-placeHolder .phone-placeImg img {
    cursor: pointer;
    width: 99%;
    border: 1px solid rgb(226, 228, 226);
    border-radius: 8px;
}

.phone-place-description h2 {
    font-size: 1.4rem;
    font-weight: 900;
    display: flex;
    flex-direction: column;
    gap: 1rem;

}

.phone-place-description h2>.post-name {
    text-decoration: none;
    color: var(--secondaryColor);
    

}

.phone-place-description h2 .location {
    width: fit-content;
    border-radius: 5px;
    overflow: hidden;
    text-decoration: none;
    color: rgb(249, 233, 243);
}

.phone-place-description p {
    line-height: 1.6rem;
    font-size: 1rem;
    padding-right: 1rem;
    color: var(--mainTextcolor);
}

.read-more {
    display: none;
}

.Mapicon {
    height: 20px;
    width: 20px;
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
.places .placeHolder-left .placeImg:hover img{
    transform:scale(1.08);
    filter:brightness(1)
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

.titleBlock{
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.place-description h2>.post-name {
    text-decoration: none;
    color: var(--secondaryColor);
    text-shadow:0 0 5px rgba(6, 6, 6, 0.871);
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


.place-description h2 .location2 {
    width: max-content;
    border-radius: 30%;
    text-decoration: none;
    padding: .5rem;
    color: rgb(249, 233, 243);
    font-size: 0.9rem;
    transition: background 500ms ease;
}

.place-description h2 .location2:hover {
    background: rgb(226, 154, 19);
}

.places .placeHolder .place-description .location {

    right: 1rem;
}

.svg {
    height: 22px;
    width: 22px;
    margin-right: 8px;
}

@media (width < 375px) {
    .read-more {
        display: inline;
        color: rgb(219, 219, 219);
        background-color: var(--secondaryColor);
        text-decoration: none;
        border-radius: 10px;
        padding: 4px;
        font-size: .7rem;
        font-weight: 800;
    }

    .phone-place-description p {
        display: -webkit-box;
        line-height: 1.2rem;
        margin-bottom: 1rem;
        font-size: .8rem;
        letter-spacing: 1px;
        line-clamp: 5;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
        overflow: hidden;
    }

    .phone-place-description h2 {
        font-size: 1.2em;
    }

    .filter h3 {

        font-size: 0.9rem;
    }

    #loading-screen h2 {
        font-size: .9rem;
    }
}

@media (width<536px) {

    .tglHelper,
    .animatedtglHalper {
        width: 35px;
        height: 35px;
    }
}
</style>
