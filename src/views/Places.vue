<template>
    <Slider/>
    <section class="places">
        <div v-if="places.length !== 0" v-for="(place, index) in places" :key="index">
  
            <!-- Tablet & Pc version -->
            <div class="placeHolder-left" v-if="index % 2 === 0 && widthOfScreen >= 769">
                <div class="place-description">
                    <h2>{{ place.nom }} <a :href="`https://www.google.com/maps?q=${place.location.latitude},${place.location.longitude}`" target="_blank" class="location1"><LaMapMarkedAltSolid class="Mapicon"/></a></h2>                    
                    <p>{{ place.description }}</p>
                </div>
                <div class="placeImg">
                    <img :src="`src/assets/pics/images/${place.img}.jpg`" :alt="place.nom" :title="place.nom">
                </div>
            </div>

            <div class="placeHolder" v-if="index % 2 !== 0 && widthOfScreen >= 769">
                <div class="placeImg">
                    <img :src="`src/assets/pics/images/${place.img}.jpg`" :alt="place.nom" :title="place.nom">
                </div>
                <div class="place-description">
                    <h2>{{ place.nom }} <a :href="`https://www.google.com/maps?q=${place.location.latitude},${place.location.longitude}`" target="_blank" class="location1"><LaMapMarkedAltSolid class="Mapicon"/></a></h2>                    
                    <p>{{ place.description }}</p>
                </div>
            </div>

            <!-- Phone version -->
            <div class="phone-placeHolder" v-if="widthOfScreen < 769">
                <div class="phone-placeImg">
                    <img :src="`src/assets/pics/images/${place.img}.jpg`" :alt="place.nom" :title="place.nom">
                </div>
                <div class="phone-place-description">
                    <h2>{{ place.nom }} <a :href="`https://www.google.com/maps?q=${place.location.latitude},${place.location.longitude}`" target="_blank" class="location"><LaMapMarkedAltSolid class="Mapicon"/></a></h2>                    
                    <p>{{ place.description }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { LaMapMarkedAltSolid } from '@kalimahapps/vue-icons';
import Slider from '@/components/Slider.vue'
import { db } from '@/Firebase/firebase.js';
import { onSnapshot, collection } from 'firebase/firestore';
import { onMounted, ref } from 'vue';
const widthOfScreen = ref(window.innerWidth);
window.addEventListener('resize',()=>{
    widthOfScreen.value = window.innerWidth;
})

const places = ref([]);

// Function to get the correct image URL



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
            };
            p.push(place);
        });
        places.value = p;
    });
});
</script>

<style scoped>
/* VS , S ,L< SCREENS */
.phone-placeHolder{
    width: 95%;
    height: max-content;
    padding: 10px;
    border: 4px solid var(--secondaryColor);
    border-radius: 12px;
    margin: 12px auto;
    position :relative;
}

.phone-placeHolder .phone-placeImg {
    align-self: center;
}
.places .phone-placeHolder .phone-placeImg img {
    width: 99%;
    border: 1px solid rgb(226, 228, 226);
    border-radius: 8px;
}

.phone-place-description h2 {
    font-size: 2rem;
    color: var(--secondaryColor);
    display: flex;
    flex-direction: column;
    gap: 1rem;

}

.phone-place-description h2 .location {
    border-radius: 5px;
    overflow: hidden;
    text-decoration: none;
    color: rgb(249, 233, 243);
}

.phone-place-description p {
    line-height: 1.6crem;
    font-size: 1rem;
    padding-right: 1rem;
    color: var(--mainTextcolor);
}
/* L & XL SCREENS */
.Mapicon{
    height: 30px;
    width: 30px;
    
}

.places {
    margin-bottom: 30px;
}

.places .placeHolder-left {
    width: 95%;
    height: max-content;
    padding: 10px;
    border: 4px solid var(--secondaryColor);
    border-radius: 12px;
    display: grid;
    grid-template-columns: 45% 55%;
    margin: 12px auto;
    position :relative;
}
.places .placeHolder-left .placeImg {
    
    align-self: center;
}

.places .placeHolder {
    width: 95%;
    height: max-content;
    padding: 10px;
    border: 4px solid var(--secondaryColor);
    border-radius: 12px;
    display: grid;
    grid-template-columns: 55% 45%;
    margin: 12px auto;
    position : relative;
}


.places .placeHolder .placeImg {
    margin-right: 20px;
    align-self: center;
    
}

.places .placeHolder-left .placeImg img {
    width: 99%;
    border: 1px solid rgb(226, 228, 226);
    border-radius: 8px;
}


.places .placeHolder .placeImg img {
    width: 99%;
    border: 1px solid rgb(116, 167, 116);
    border-radius: 8px;
}

.place-description h2 {
    font-size: 2.9rem;
    color: var(--secondaryColor);
    display: flex;
    flex-direction: column;
    gap: 8px;
}


.place-description p {
    margin: 10% auto;
    line-height: 2rem;
    font-size: 1.3rem;
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

</style>
