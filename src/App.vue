<template>

    <Header/>
    
    <main>
        <RouterView/>
    </main>
    <Footer/>
</template>


<script setup>
import { RouterView } from "vue-router";
import Footer from '@/components/Footer.vue'
import Header from "@/components/Header.vue";

</script>


<style scoped>
/* Slide transition */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: opacity 500ms ease-out;
}

.slide-fade-enter, .slide-fade-leave-to {
  opacity: 0;
}
</style>