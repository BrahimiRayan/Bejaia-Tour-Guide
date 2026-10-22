<template>
  <div class="map-wrapper">
    <div ref="mapContainer" id="map"></div>

    <div class="layer-switcher">
      <button 
        :class="{ active: currentView === 'plan' }" 
        @click="switchLayer('plan')"
      >
        Plan
      </button>
      <button 
        :class="{ active: currentView === 'satellite' }" 
        @click="switchLayer('satellite')"
      >
        Satellite
      </button>
    </div>

    <a
      :href="`https://www.google.com/maps/dir/?api=1&destination=${props.lat},${props.long}`"
      target="_blank"
      rel="noopener"
      class="directions-btn"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="2.2"
           stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
      Itinéraire
    </a>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import L from 'leaflet';

const mapContainer = ref('');
const map = ref();

const planLayer = ref(null);
const satelliteLayer = ref(null);
const currentView = ref('plan');

const props = defineProps({
    long: Number,
    lat: Number,
    nom: String,
});

const switchLayer = (view) => {
    if (view === 'plan') {
        map.value.removeLayer(satelliteLayer.value);
        map.value.addLayer(planLayer.value);
        currentView.value = 'plan';
    } else {
        map.value.removeLayer(planLayer.value);
        map.value.addLayer(satelliteLayer.value);
        currentView.value = 'satellite';
    }
};

onMounted(() => {
    map.value = L.map(mapContainer.value).setView([props.lat, props.long], 17);

    planLayer.value = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    satelliteLayer.value = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: '&copy; Esri'
    });

    planLayer.value.addTo(map.value);

    L.marker([props.lat, props.long])
        .addTo(map.value)
        .bindPopup(props.nom)
        .openPopup();

    L.circle([props.lat, props.long], {
        color: '#009afa',
        fillColor: '#009afa83',
        fillOpacity: 0.5,
        radius: 100,
    }).addTo(map.value);

    setTimeout(() => {
        map.value.invalidateSize();
    }, 200);
});
</script>

<style scoped>
.map-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
}

#map {
    width: 100%;
    height: 100%;
    z-index: 1;
}

.layer-switcher {
    position: absolute;
    bottom: 15px;
    left: 15px;
    z-index: 500;
    display: flex;
    background: rgba(13, 17, 23, 0.85);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 30px;
    padding: 4px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}

.layer-switcher button {
    background: transparent;
    color: #d1d5db;
    border: none;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Inter', sans-serif;
}

.layer-switcher button.active {
    background: #009afa;
    color: white;
    box-shadow: 0 2px 8px rgba(0, 154, 250, 0.4);
}

.layer-switcher button:not(.active):hover {
    color: white;
}

.directions-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 500;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    background: #009afa;
    color: #ffffff;
    text-decoration: none;
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.3px;
    border-radius: 30px;
    box-shadow: 0 4px 16px rgba(0, 154, 250, 0.45);
    transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
}

.directions-btn:hover {
    background: #ffffff;
    color: #009afa;
    transform: translateY(-2px);
    box-shadow: 0 6px 22px rgba(0, 154, 250, 0.6);
}

.directions-btn svg {
    flex-shrink: 0;
}
</style>