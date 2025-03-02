<template>
 <div ref="mapContainer" id="map">

 </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import L from 'leaflet'
const mapContainer = ref('');
const map = ref(); 
const props = defineProps({
    long : Number ,
    lat : Number, 
    nom : String,
})



onMounted(()=>{
    map.value = L.map(mapContainer.value).setView([props.lat , props.long],12);
    
    L.marker([props.lat , props.long]).addTo(map.value).bindPopup(props.nom).openPopup();  
    L.circle([props.lat , props.long], {
    color: '#009afa',
    fillColor: '#009afa83',
    fillOpacity: 0.5,
    radius: 100
}).addTo(map.value);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map.value);


})

</script>

<style scoped>
#map{
    width: 510px;
    height: 290px;

}

@media (width <525px) {
    #map{
        width: 370px;
        height: 230px;
    }
}

@media (width < 325px) {
    #map{
        width: 290px;
        height: 170px;
    }
}
</style>