<template>
    <div class="btnContainer">
        <button class="searchBtn" :class="{ isActive: isActive === 'tout' }" @click="SearchTerm('tout')"><CaAlignHorizontalLeft class="navicons"/>Tout</button>
        <button class="searchBtn" :class="{ isActive: isActive === 'plage'}" @click="SearchTerm('plage')"><FlBeach class="navicons"/>Plages</button>
        <button class="searchBtn" :class="{ isActive: isActive === 'historique'}" @click="SearchTerm('historique')"><MaHistoric class="navicons"/>Historique</button> 
        <button class="searchBtn" :class="{ isActive: isActive === 'ville'}" @click="SearchTerm('ville')"><MaTown class="navicons"/>Villes</button> 
        <button class="searchBtn" :class="{ isActive: isActive === 'cascade'}" @click="SearchTerm('cascade')"><MaWaterfall class="navicons"/>Cascades</button> 
        <button class="searchBtn" :class="{ isActive: isActive === 'nature'}" @click="SearchTerm('nature')"><MdOutlinedForest class="navicons"/>Nature</button> 
    </div>
</template>

<style scoped>
.btnContainer{
    display: flex;
    flex-wrap: wrap;
    gap: .5rem .8rem;
}

.navicons{
    text-align: center;
    margin: 0 5px;
}
.searchBtn{
    border-radius: 8px;
    border: none;
    outline: 1px solid white;
    color: white;
    font-weight: 500;
    background-color: var(--mainColor);
    padding:  0.5rem 0.8rem;
    font-size: .9rem;
}
.searchBtn:hover{
    cursor: pointer;
    outline: 2px solid var(--secondaryColor);
}
.isActive{
    background-color: var(--secondaryColor);
    font-weight: 800;
    transition: background-color 300ms ease-in-out;
    
}
.isActive:hover{
    outline: 2px solid white;
}
@media (width < 375px) {
    .searchBtn{
        border-radius: 8px;
        padding:  0.3rem;
        font-size: .8rem;
    }   

}
</style>

<script setup>
import {ref } from 'vue';
import { FlBeach ,CaAlignHorizontalLeft ,MaHistoric,MaTown ,MaWaterfall ,MdOutlinedForest} from '@kalimahapps/vue-icons';


const isActive = ref('tout');
// Step 1: Define the event you want to emit
const emit = defineEmits(['term']);
const SearchTerm = (term)=>{
    isActive.value = term;
    emit('term', term);
}
</script>