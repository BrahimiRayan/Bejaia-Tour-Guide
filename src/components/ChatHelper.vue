<template>

    <div class="chat">
       <div v-if="firstChat"> 
        <div class="chatInterface">
            <p>"Bonjour ! Je m’appelle <span class="highlater"> Bejaoui</span> et je suis votre assistant pour vous guider sur notre site 'Bejaia Tour Guide'. Mon rôle est de vous proposer des suggestions personnalisées pour rendre votre visite inoubliable. Je vais vous présenter quelques choix : sélectionnez celui qui vous correspond le mieux, et je vous recommanderai les meilleurs lieux adaptés à vos envies !"</p>
            <p class="note">(Sélectionnez votre choix, puis cliquez sur "Suivant".)</p>
        </div>
        <div class="bjaouiContainer">

            <div class="bjaoui"></div>
        </div>

        <div class="suggetions">

            <h2>Quel type de lieu recherchez-vous ?</h2>

            <label>
                <span>Plage</span>
            <input type="radio" v-model="selectedPlace" value="plage" />
            </label>
            <label>
                <span>Historique</span>
            <input type="radio" v-model="selectedPlace" value="historique" />
            </label>
            <label>
                <span>Ville</span>
            <input type="radio" v-model="selectedPlace" value="ville" />
            </label>
            <label>
                <span>Cascade</span>
            <input type="radio" v-model="selectedPlace" value="cascade" />
            </label>
            <label>
                <span>Nature</span>
            <input type="radio" v-model="selectedPlace" value="nature" />
            </label>
        </div>
        <div class="btn-container">

            <button @click="firstChat = !firstChat ; secondChat = !secondChat" class="Next-btn" :disabled="selectedPlace.length < 2"> Suivant ...</button>
        </div>
      </div>

      <div v-if="secondChat">
        <div class="chatInterface">
            <p>"J’ai trouvé quelques lieux qui correspondent à vos critères. Prenez un moment pour les découvrir et sélectionnez celui pour lequel vous souhaitez plus d’informations !"</p>
            <p class="note">(Sélectionnez votre choix, puis cliquez sur "Suivant".)</p>
        </div>
        <div class="bjaouiContainer">

              <div class="ConfusedBejaioui"></div>
        </div>
        <div class="suggetions">
            <h2>Sélectionnez un lieu !</h2>
            <span v-for="(place , index) in props.places" :key="index">
                <label v-if="place.categorie === selectedPlace">
                <input type="radio" v-model="selectedLieu" :value="place" />
                {{ place.nom }}
             </label>
            </span>

        </div>
        <div class="btn-container">

            <button @click="secondChat = !secondChat ; thirdchat = !thirdchat" class="Next-btn" :disabled="selectedLieu.length < 2"> Suivant ...</button>
        </div>
      </div>

      <div v-if="thirdchat">

        <div class="chatInterface">
            <p>Magnifique ! Vous souhaitez en savoir plus sur <span class="highlater"> {{ selectedLieu.nom }} </span> ? Voici ce que je peux vous partager :</p>
            
        </div>

        <div class="chatInterface2">
            <p>"{{ selectedLieu.description }}"</p>
            <RouterLink class="LinkToDetail" :to="{name : 'place' , params : { id : selectedLieu.id}}">Voir plus ...</RouterLink>
        </div>
        <div class="bjaouiContainer">

              <div class="explainingBejaoui"></div>
        </div>

        <div class="chatInterface">
            <h3>Localisation </h3>
            <Map id="map" :nom="selectedLieu.nom" :lat="selectedLieu.location.latitude" :long="selectedLieu.location.longitude"/>
        </div>
      </div>

    </div>



</template>

<style scoped>

#map{
    
    width: 100%; 
    border-radius: 1rem; 
    margin: 0 auto;
}

.note{
    margin-top: .5rem;
    font-size: .8rem;
    color: red;
    
}
.chat{
    position: fixed;
    overflow-y: scroll;
    scrollbar-width: none;
    width: 400px;
    z-index: 9999;
    height: 500px;
    bottom: 60px;
    right:50px;
    /* background: var(--secondaryColor); */
    background-color: #009afaf1;
    
    /* backdrop-filter: blur(5px); */
    padding: 1rem;
    border: 1px solid white;
    border-radius: 1rem;
}
.chatInterface,.chatInterface2{

    padding: 1rem;
    border: 2px solid white;
    border-radius: 2rem;
    color: white;
    font-size: 0.9rem;
}
.chatInterface2{
    margin-top: .9rem;
}

.chatInterface2 p {
    margin-bottom :1.3rem;
}
.bjaouiContainer{
    /* border: 1px solid ; */
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.bjaoui,.explainingBejaoui,.ConfusedBejaioui{
    /* border: 1px solid saddlebrown; */
    width: 100px;
    height: 70px;
    background-image: url('../assets/pics/ChatHelper/bejaoui.gif');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    
}

.ConfusedBejaioui{
    background-image: url('../assets/pics/ChatHelper/ConfusedBejaioui.gif');
}

.explainingBejaoui{
    background-size: contain;
    background-image: url('../assets/pics/ChatHelper/explaining.gif');
}
.btn-container{
    display: flex;
    justify-content: center;
}
.Next-btn{
    width: 50%;
    padding: .8rem;
    font-size: .9rem;
    background: rgb(91, 223, 91);
    color: rgb(95, 93, 93);
    border-radius: 8px;
    outline: none;
    border: 2px solid transparent;
    transition: all 300ms ease-in-out;
    scroll-snap-align: start;
}
.Next-btn:hover{
    background: rgb(42, 233, 42);
    color: black;
    border: 2px solid wheat;
}
.suggetions{
    
    display: flex;
    flex-direction: column;
    align-items: center;
}
.suggetions span{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.suggetions h2 {
    align-self: flex-start;
    font-size: 1.1rem;
    color: #ffffff;
    margin-bottom: 1rem;
}

.suggetions label {
    padding: 1rem;
    width: 80%;
    position: relative;
    margin-bottom: 1.3rem;
    background: white;
    border-radius: 1rem;
    font-weight: 600;
    border: 2px solid rgb(167, 167, 170);
    color: var(--mainColor);
    font-size: .8rem;
    transition: border 300ms ease-in-out 
    , background-color 300ms ease-in-out
    , color 300ms ease-in-out;
}

.suggetions label:hover{
    border: 2px solid rgb(35, 218, 18);
}

.suggetions label:focus-within{
    color: white;
    background-color: rgb(86, 190, 16);
}
.suggetions label input{
    position: absolute;
    right: 10px;
    top :  10px;
}

.special{
    color: rgb(103, 207, 17);
    font-weight: 600;
}

.LinkToDetail{
    background: rgb(86, 233, 86);

    padding: .5rem;
    border-radius: 20px;
    font-size: .8rem;
    color: rgb(255, 255, 255);
    text-decoration: none;
    /* margin-top: 1rem; */
}


@media (width < 536px) {
    .chat{
        width: 90%;
        height: 80%;
        right: 20px;
    }
}
@media(width<410px){
    .chatInterface,.chatInterface2{
        font-size: .7rem;
    }
    .suggetions h2 {
        font-size: .8rem;
    }

    .suggetions label {
        padding: .7rem;
        margin-bottom: 1rem;
        border-radius: 8px;
        font-weight: 400;
    }
    .special{
    font-size: .9rem;
}
.note{
    font-size: .7rem;
}

.Next-btn{
    padding: .4rem .8rem;
}
}
</style>

<script setup>
import { ref } from 'vue';
import Map from './Map.vue';

const props = defineProps({
    places : Array
})

const firstChat = ref(true);
const secondChat = ref(false)
const thirdchat = ref(false)
const selectedPlace = ref('')
const selectedLieu = ref('');
</script>