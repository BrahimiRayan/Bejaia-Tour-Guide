<template>
    <Slider/>

    <section class="places">
        <!-- <div class="filter">
            <label for="categories">Afficher : </label>
            <select name="categories" id="categories" @change="handelChange">
            <option value="tout">Tout</option>
            <option value="plage">Plages</option>
            <option value="historique">Historique</option>
            <option value="ville">Villes | régions</option>
            <option value="cascade">Cascades</option>
            <option value="nature">Nature</option>
        </select>
        
        </div> -->
        <div class="filter">
            <h3>Afficher : </h3>
            <NavigationButtons @term="recivedterm"/>
        </div>
        <div v-if="places.length !== 0" v-for="(place, index) in places" :key="index">

            <span v-if="categorie === 'tout'">
            <!-- Tablet & Pc version -->
            <div class="placeHolder-left" v-if="index % 2 === 0 && widthOfScreen >= 769">
                <div class="place-description">
                    <h2>{{ place.nom }} <a :href="`https://www.google.com/maps?q=${place.location.latitude},${place.location.longitude}`" target="_blank" class="location1"><LaMapMarkedAltSolid class="Mapicon"/></a></h2>                    
                    <p>{{ place.description }}</p>
                </div>
                <div class="placeImg">
                    <img :src="`${place.img.toLowerCase()}.jpg`" :alt="place.nom" :title="place.nom" @click="openImage(index)">
                    <FlArrowExpand class="expandIcon" @click="openImage(index)"/>
                </div>
                <ImageResizer 
                    v-if="place.isOpen"
                    :isVisible="place.isOpen" 
                    :imgsrc="`${place.img.toLowerCase()}.jpg`"
                    @close="closeImage(index)" 
                />
            </div>

            <div class="placeHolder" v-if="index % 2 !== 0 && widthOfScreen >= 769">
                <div class="placeImg">
                    <img :src="`${place.img.toLowerCase()}.jpg`" :alt="place.nom" :title="place.nom" @click="openImage(index)">
                    <FlArrowExpand class="expandIcon" @click="openImage(index)"/>
                </div>
                <div class="place-description">
                    <h2>{{ place.nom }} <a :href="`https://www.google.com/maps?q=${place.location.latitude},${place.location.longitude}`" target="_blank" class="location1"><LaMapMarkedAltSolid class="Mapicon"/></a></h2>                    
                    <p>{{ place.description }}</p>
                </div>
                <ImageResizer 
                    v-if="place.isOpen"
                    :isVisible="place.isOpen" 
                    :imgsrc="`${place.img.toLowerCase()}.jpg`"
                    @close="closeImage(index)" 
                />
            </div>

            <!-- Phone version -->
            <div class="phone-placeHolder" v-if="widthOfScreen < 769">
                <div class="phone-placeImg">
                    <img :src="`${place.img.toLowerCase()}.jpg`" :alt="place.nom" :title="place.nom" @click="openImage(index)">
                    <FlArrowExpand class="expandIcon" @click="openImage(index)"/>
                </div>
                <div class="phone-place-description">
                    <h2>{{ place.nom }} <a :href="`https://www.google.com/maps?q=${place.location.latitude},${place.location.longitude}`" target="_blank" class="location"><LaMapMarkedAltSolid class="Mapicon"/></a></h2>                    
                    <p>{{ place.description }}</p>
                </div>
                <ImageResizer 
                    v-if="place.isOpen"
                    :isVisible="place.isOpen" 
                    :imgsrc="`${place.img.toLowerCase()}.jpg`"
                    @close="closeImage(index)" 
                />
            </div>
        </span>

        <span v-else>
            <div class="placeHolder" v-if="place.categorie === categorie && widthOfScreen >= 769">
                <div class="placeImg">
                    <img :src="`${place.img.toLowerCase()}.jpg`" :alt="place.nom" :title="place.nom" @click="openImage(index)">
                    <FlArrowExpand class="expandIcon" @click="openImage(index)"/>
                </div>
                <div class="place-description">
                    <h2>{{ place.nom }} <a :href="`https://www.google.com/maps?q=${place.location.latitude},${place.location.longitude}`" target="_blank" class="location1"><LaMapMarkedAltSolid class="Mapicon"/></a></h2>                    
                    <p>{{ place.description }}</p>
                </div>
                <ImageResizer 
                    v-if="place.isOpen"
                    :isVisible="place.isOpen" 
                    :imgsrc="`${place.img.toLowerCase()}.jpg`"
                    @close="closeImage(index)" 
                />
            </div>

             <!-- Phone version -->
             <div class="phone-placeHolder" v-if="place.categorie === categorie && widthOfScreen < 769">
                <div class="phone-placeImg">
                    <img :src="`${place.img.toLowerCase()}.jpg`" :alt="place.nom" :title="place.nom" @click="openImage(index)">
                    <FlArrowExpand class="expandIcon" @click="openImage(index)"/>
                </div>
                <div class="phone-place-description">
                    <h2>{{ place.nom }} <a :href="`https://www.google.com/maps?q=${place.location.latitude},${place.location.longitude}`" target="_blank" class="location"><LaMapMarkedAltSolid class="Mapicon"/></a></h2>                    
                    <p>{{ place.description }}</p>
                </div>
                <ImageResizer 
                    v-if="place.isOpen"
                    :isVisible="place.isOpen" 
                    :imgsrc="`${place.img.toLowerCase()}.jpg`"
                    @close="closeImage(index)" 
                />
            </div>
        </span>
        </div>

    </section>
</template>

<script setup>
import { LaMapMarkedAltSolid ,FlArrowExpand} from '@kalimahapps/vue-icons';
import Slider from '@/components/Slider.vue';
import NavigationButtons from '@/components/NavigationButtons.vue';
import { db } from '@/Firebase/firebase.js';
import { onSnapshot, collection } from 'firebase/firestore';
import ImageResizer from '@/components/imageResizer.vue';
import { onMounted, ref, watch } from 'vue';
// watch the width of the screen for the mobile version :)
const widthOfScreen = ref(window.innerWidth);
window.addEventListener('resize',()=>{
    widthOfScreen.value = window.innerWidth;
})

// this is watching the selection by the user...
const places = ref([]);
const categorie = ref('tout');
// const handelChange = (e)=>{
//     categorie.value = e.target.value
// }

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
    line-height: 1.6rem;
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
.filter{
    
    margin-left: 2.9%;
}

.filter h3{
    color: var(--mainTextcolor);
    margin-bottom: .8rem;
    font-weight: 700;
    font-size: 1.1rem;
}

#categories{
    /* margin-left: 2.5%; */
    background: var(--mainColor);
    color: var(--mainTextcolor);
    border: 2px solid var(--secondaryColor);
    font-size: 1.1rem;
    border-radius: 10px;
    height: 2.3rem;
    width: max-content;
    text-indent: 3px;
    transition: border 300ms ease;
    outline: none;
}

@media (width < 768px) {
    #categories{
        font-size: 0.9rem;
    }
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
    color: var(--secondaryColor);
    display: flex;
    font-weight: 900;
    flex-direction: column;
    gap: 8px;
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

</style>
