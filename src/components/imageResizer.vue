<template>
<!-- <h1>{{ props.isOpen }}</h1> -->
<h2>{{ props.imgsrc }}</h2>
<div id="fullImageContainer">
    <button id="closeButton" @click="closeImage">X</button>
    <img :src="props.imgsrc" alt="Full Size Image" >
</div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
const props = defineProps({
    isVisible : Boolean,
    imgsrc : String,
});

const emit = defineEmits(['close']);

const closeImage = () => {
  emit('close');
};
</script>

<style scoped>
#fullImageContainer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.726);
    
    backdrop-filter: blur( 3px );
-webkit-backdrop-filter: blur( 3px );
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Ensure it's on top of other elements */
}

#fullImageContainer img {
    max-width: 1000px;
    width: auto;
    height: 80%;
}

@media (width < 1000px) {
    #fullImageContainer img {
    width: 94%;
    height: auto;
}
}

#closeButton {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #f00;
  color: white;
  border: none;
  /* padding: 1rem; */
  width: 42px;
  height: 42px;
  border-radius: 50%;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  z-index: 10000; 
}
</style>
