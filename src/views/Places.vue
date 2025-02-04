<template>
<div v-if="places">
    <Slider/>

    <section class="places">
        <div class="filter">
            <h3>Afficher : </h3>
            <NavigationButtons @term="recivedterm"/>
        </div>
        <div v-if="places.length !== 0" v-for="(place, index) in places" :key="index">

            <span v-if="categorie === 'tout'">
            <!-- Tablet & Pc version -->
            <div class="placeHolder-left" v-if="index % 2 === 0 && widthOfScreen >= 769">
                <div class="place-description">
                    <h2><RouterLink class="post-name" :to="{name : 'place' , params : { id : place.id}}">{{ place.nom }} <img src="@/assets/pics/click.svg" alt="" loading="lazy"></RouterLink> <a :href="`https://www.google.com/maps?q=${place.location.latitude},${place.location.longitude}`" target="_blank" class="location1"><LaMapMarkedAltSolid class="Mapicon"/></a></h2>                    
                    <p>{{ place.description }}</p>
                </div>
                <div class="placeImg">
                    <img :src="`${place.img.toLowerCase()}.jpg`" :alt="place.nom" :title="place.nom" @click="openImage(index)" loading="lazy">
                    <FlArrowExpand class="expandIcon" @click="openImage(index)"/>
                </div>
                <ImageResizer 
                    v-if="place.isOpen"
                    :isVisible="place.isOpen" 
                    :imgsrc="`${place.img.toLowerCase()}.jpg`"
                    @close="closeImage(index)" 
                />
                <PostSocial :postID="place.id"/>
            </div>

            <div class="placeHolder" v-if="index % 2 !== 0 && widthOfScreen >= 769">
                <div class="placeImg">
                    <img :src="`${place.img.toLowerCase()}.jpg`" :alt="place.nom" :title="place.nom" @click="openImage(index)" loading="lazy">
                    <FlArrowExpand class="expandIcon" @click="openImage(index)"/>
                </div>
                <div class="place-description">
                    <h2><RouterLink class="post-name" :to="{name : 'place' , params : { id : place.id}}">{{ place.nom }} <img src="@/assets/pics/click.svg" alt="" loading="lazy"></RouterLink> <a :href="`https://www.google.com/maps?q=${place.location.latitude},${place.location.longitude}`" target="_blank" class="location1"><LaMapMarkedAltSolid class="Mapicon"/></a></h2>                    
                    <p>{{ place.description }}</p>
                </div>
                <ImageResizer 
                    v-if="place.isOpen"
                    :isVisible="place.isOpen" 
                    :imgsrc="`${place.img.toLowerCase()}.jpg`"
                    @close="closeImage(index)" 
                />
                <PostSocial :postID="place.id"/>
            </div>

            <!-- Phone version -->
            <div class="phone-placeHolder" v-if="widthOfScreen < 769">
                <div class="phone-placeImg">
                    <img :src="`${place.img.toLowerCase()}.jpg`" :alt="place.nom" :title="place.nom" @click="openImage(index)" loading="lazy">
                    <FlArrowExpand class="expandIcon" @click="openImage(index)"/>
                </div>
                <div class="phone-place-description">
                    <h2><RouterLink class="post-name" :to="{name : 'place' , params : { id : place.id}}">{{ place.nom }} <img src="@/assets/pics/click.svg" alt="" loading="lazy"></RouterLink> <a :href="`https://www.google.com/maps?q=${place.location.latitude},${place.location.longitude}`" target="_blank" class="location"><LaMapMarkedAltSolid class="Mapicon"/></a></h2>                    
                    <p>{{ place.description }}</p>
                    <RouterLink class="read-more" :to="{name : 'place' , params : { id : place.id}}"> Lire plus</RouterLink> 
                </div>
                <ImageResizer 
                    v-if="place.isOpen"
                    :isVisible="place.isOpen" 
                    :imgsrc="`${place.img.toLowerCase()}.jpg`"
                    @close="closeImage(index)" 
                />
                <PostSocial :postID="place.id"/>
            </div>
        </span>

        <span v-else>
            <div class="placeHolder" v-if="place.categorie === categorie && widthOfScreen >= 769">
                <div class="placeImg">
                    <img :src="`${place.img.toLowerCase()}.jpg`" :alt="place.nom" :title="place.nom" @click="openImage(index)" loading="lazy">
                    <FlArrowExpand class="expandIcon" @click="openImage(index)"/>
                </div>
                <div class="place-description">
                    <h2><RouterLink class="post-name" :to="{name : 'place' , params : { id : place.id}}">{{ place.nom }} <img src="@/assets/pics/click.svg" alt="" loading="lazy"></RouterLink>  <a :href="`https://www.google.com/maps?q=${place.location.latitude},${place.location.longitude}`" target="_blank" class="location1"><LaMapMarkedAltSolid class="Mapicon"/></a></h2>                    
                    <p>{{ place.description }}</p>
                </div>
                <ImageResizer 
                    v-if="place.isOpen"
                    :isVisible="place.isOpen" 
                    :imgsrc="`${place.img.toLowerCase()}.jpg`"
                    @close="closeImage(index)" 
                />
                <PostSocial :postID="place.id"/>
            </div>

             <!-- Phone version -->
             <div class="phone-placeHolder" v-if="place.categorie === categorie && widthOfScreen < 769">
                <div class="phone-placeImg">
                    <img :src="`${place.img.toLowerCase()}.jpg`" :alt="place.nom" :title="place.nom" @click="openImage(index)" loading="lazy">
                    <FlArrowExpand class="expandIcon" @click="openImage(index)"/>
                </div>
                <div class="phone-place-description">
                    <h2><RouterLink class="post-name" :to="{name : 'place' , params : { id : place.id}}">{{ place.nom }} <img src="@/assets/pics/click.svg" alt="" loading="lazy"> </RouterLink> <a :href="`https://www.google.com/maps?q=${place.location.latitude},${place.location.longitude}`" target="_blank" class="location"><LaMapMarkedAltSolid class="Mapicon"/></a></h2>                    
                    <p>{{ place.description }}</p>
                    <RouterLink class="read-more" :to="{name : 'place' , params : { id : place.id}}"> Lire plus</RouterLink> 
                </div>
                <ImageResizer 
                    v-if="place.isOpen"
                    :isVisible="place.isOpen" 
                    :imgsrc="`${place.img.toLowerCase()}.jpg`"
                    @close="closeImage(index)" 
                />
                <PostSocial :postID="place.id"/>
            </div>
            
        </span>

        </div>

        <div v-else id="loading-screen">
            <img src="../../spinner.gif" alt="">
            <h2>Chargement en cours...</h2>
        </div>


    </section>
</div>
</template>

<script setup>
import { LaMapMarkedAltSolid ,FlArrowExpand} from '@kalimahapps/vue-icons';
import Slider from '@/components/Slider.vue';
import NavigationButtons from '@/components/NavigationButtons.vue';
import { db } from '@/Firebase/firebase.js';
import { onSnapshot, collection } from 'firebase/firestore';
import ImageResizer from '@/components/imageResizer.vue';
import { onMounted, ref, watch } from 'vue';
import { RouterLink} from 'vue-router';
import PostSocial from '@/components/PostSocial.vue';
// watch the width of the screen for the mobile version :)
const widthOfScreen = ref(window.innerWidth);
window.addEventListener('resize',()=>{
    widthOfScreen.value = window.innerWidth;
})

// this is watching the selection by the user...
const places = ref([]);
const categorie = ref('tout');

const recivedterm = (value)=>{
    categorie.value = value;
}

// the functionalitty of opening and closing the images ... 

const openImage = (index) => {
    places.value[index].isOpen = true;
    document.body.style.overflow = 'hidden'; 
};

const closeImage = (index) => {
    places.value[index].isOpen = false;
    document.body.style.overflow = 'auto'; 
};

// fetching the data
onMounted(() => {
    onSnapshot(collection(db, 'places'), (querySnapshot) => {
        const p = [];
        querySnapshot.forEach((doc) => {
            const place = {
                id: doc.id,
                nom: doc.data().nom,
                description: doc.data().description,
                img: doc.data().img,  // Image name from Firestore
                location: doc.data().location,
                categorie : doc.data().categorie,
                isOpen : false,
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
        margin-top: 45%;
        width: 5rem;
        height: 5rem;
      }
      #loading-screen h2{
        color: #009afa;
        margin-top: 1rem;
      }
/* VS , S ,L< SCREENS */
.phone-placeHolder{
    width: 95%;
    height: max-content;
    padding: 10px;
    border: 3px solid var(--secondaryColor);
    border-radius: 12px;
    margin: 12px auto;
    position :relative;
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
.phone-place-description h2 >.post-name{
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
.read-more{
    display: none;
}

/* L & XL SCREENS */
.Mapicon{
    height: 30px;
    width: 30px;
}

.places {
    margin-bottom: 30px;
}
.filter{
    
    margin-left: 2.9%;
}

.filter h3{
    color: var(--mainTextcolor);
    margin-bottom: .8rem;
    font-weight: 700;
    font-size: 1.1rem;
}


.places .placeHolder-left {
    width: 95%;
    height: max-content;
    padding: 10px;
    border: 3px solid var(--secondaryColor);
    border-radius: 12px;
    display: grid;
    grid-template-columns: 45% 55%;
    margin: 12px auto;
    position :relative;
}
.places .placeHolder-left .placeImg {
    position: relative;
    align-self: center;
}
.expandIcon{
    background-color: rgba(0, 0, 0, 0.425);
    color: aliceblue;
    position: absolute;
    bottom: 10px;
    right: 10px;
}
.places .placeHolder {
    width: 95%;
    height: max-content;
    padding: 10px;
    border: 3px solid var(--secondaryColor);
    border-radius: 12px;
    display: grid;
    grid-template-columns: 55% 45%;
    margin: 12px auto;
    position : relative;
}


.places .placeHolder .placeImg {
    margin-right: 20px;
    align-self: center;
    position: relative;
}

.places .placeHolder-left .placeImg img {
    cursor: pointer;
    width: 99%;
    max-height: 480px;
    border: 1px solid rgb(255, 255, 255);
    border-radius: 8px;
}


.places .placeHolder .placeImg img {
    cursor: pointer;
    width: 99%;
    max-height: 480px;
    border: 1px solid rgb(255, 255, 255);
    border-radius: 8px;
}

.place-description h2 {
    font-size: 1.8rem;
    display: flex;
    font-weight: 900;
    flex-direction: column;
    gap: 8px;
}
.place-description h2 >.post-name{
    text-decoration: none;
    color: var(--secondaryColor);
} 
.post-name img{
    width: 1.4rem;
    height: 1.4rem;
}
.place-description p {
    margin: 3% auto;
    line-height: 2rem;
    font-size: 1.2rem;
    padding-right: 1rem;
    color: var(--mainTextcolor);
}


.place-description h2 .location1 { 
    width: max-content;
    border-radius: 30%;
    text-decoration: none;
    padding: .5rem;
    color: rgb(249, 233, 243);
    font-size: 0.9rem;
    transition: background 500ms ease;
}

.place-description h2 .location1:hover { 
    background: rgb(226, 154, 19);
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

.svg{
    height: 22px;
    width: 22px;
    margin-right: 8px;
}
@media (width < 375px) {
    .read-more{
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
.filter h3{

    font-size: 0.9rem;
}
}
</style>
