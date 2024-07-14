<template>

  <header>
        <div class="logo" ></div>
        <nav>
            <ul>
                <li><RouterLink class="link" to="/">Places</RouterLink></li>
                <li><RouterLink class="link" to="/Histoire">Histoire</RouterLink></li>
                <li><RouterLink class="link" to="/AboutUs">Sur Nous</RouterLink></li>
            </ul>
        </nav>
        
    </header>
    <main>
        
        <RouterView />
    </main>
</template>


<script setup>
import { RouterLink , RouterView } from "vue-router";

import router from '@/router/index.js'



</script>


<style scoped>

.link{
    color: var(--secondaryColor);
    text-decoration : none;
    font-weight: 700;
}

</style>
