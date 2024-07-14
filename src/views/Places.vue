<template>
    <Slider/>
    <section class="places">
        <div v-if="places.length !== 0" v-for="(place, index) in places" :key="index">
            <div class="placeHolder-left" v-if="index % 2 === 0">
                <div class="place-description">
                    <h2>{{ place.nom }}</h2>
                    <p>{{ place.description }}</p>
                    <a :href="`https://www.google.com/maps?q=${place.location.latitude},${place.location.longitude}`" target="_blank" class="location"><img src="@/assets/pics/svg/location.svg" class="svg" alt=""> OVRIRE DANS LA MAP</a>
                </div>
                <div class="placeImg">
                    <img :src="`src/assets/pics/images/${place.img}.jpg`" alt="">
                </div>
            </div>
            <div class="placeHolder" v-else>
                <div class="placeImg">
                    <img :src="`src/assets/pics/images/${place.img}.jpg`" alt="">
                </div>
                <div class="place-description">
                    <h2>{{ place.nom }}</h2>
                    <p>{{ place.description }}</p>
                    <a :href="`https://www.google.com/maps?q=${place.location.latitude},${place.location.longitude}`" target="_blank" class="location"><img src="@/assets/pics/svg/location.svg" class="svg" alt=""> OVRIRE DANS LA MAP</a>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import Slider from '@/components/Slider.vue'
import { db } from '@/Firebase/firebase.js';
import { onSnapshot, collection } from 'firebase/firestore';
import { onMounted, ref } from 'vue';


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
        console.log(places.value);
    });
});
</script>

<style scoped>

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
}


.places .placeHolder .placeImg {
    margin-right: 20px;
    align-self: center;
}
.places .placeHolder-left .placeImg img {
    width: 100%;
    border: 1px solid rgb(226, 228, 226);
    border-radius: 8px;
}


.places .placeHolder .placeImg img {
    width: 100%;
    border: 1px solid rgb(226, 228, 226);
    border-radius: 8px;
}
.place-description h2 {
    font-size: 2.9rem;
    color: var(--secondaryColor);
}
.place-description p {
    margin: 10% auto;
    line-height: 2rem;
    font-size: 1.3rem;
    color: var(--mainTextcolor);
}
.place-description .location {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    text-align: center;
    padding: 20px;
    background-color: var(--secondaryColor);

    color: rgb(249, 233, 243);
    width: 70%;
    border-radius: 12px;
    font-size: 1.2rem;
}

.svg{
    height: 22px;
    width: 22px;
    margin-right: 8px;
}

</style>
