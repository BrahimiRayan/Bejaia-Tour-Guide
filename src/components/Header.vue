<template>
  <header>
        <RouterLink to="/" class="logo-link"><div class="logo" ></div></RouterLink>
        <nav>
            <ul>
                <li><RouterLink class="link" :to="{name : 'places'}">Lieux</RouterLink></li>
                <li><RouterLink class="link" :to="{name : 'histoire'}">Histoire</RouterLink></li>
                <li><RouterLink class="link" :to="{name : 'about'}">Infos</RouterLink></li>
                <li class="user">
                    <div class="img" ref="accountRef" @click.stop="toggleBox">
                        <img v-if="!img" src="@/assets/pics/user.png" class="bg-user" loading="lazy">
                        <img v-else :src="img || defaultImg"  class="bg-user" alt="" loading="lazy" @error="onImageError">
                    </div>
                    <ToggleBox :isBoxVisible="isBoxVisible" :accountRef="accountRef" @closeBox="isBoxVisible = false" />
                </li>
            </ul>
        </nav>
       
    </header>
  
</template>



<script setup>

import { ref } from "vue";
import ToggleBox from "@/components/ToggleBox.vue";
import { img } from "@/composables/LogicAuth";
import { RouterLink } from "vue-router";
import defaultImg from '@/assets/pics/user.png';

const onImageError = (event) => {
    // If the image fails to load, set it to the default image
    event.target.src = defaultImg;
};
const isBoxVisible = ref(false);
const accountRef = ref(null);
const toggleBox = () => {
  isBoxVisible.value = !isBoxVisible.value;
};
</script>



<style scoped>
.user{
    position: relative;
    padding-left: 30px;
}
.img{
    width: 2.4rem;
    height: 2.4rem;
    background-color: #ecf0f3;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 3px var(--secondaryColor);
    transition: box-shadow 300ms ease-in-out , transform 400ms ease-in-out;
   
}

.img:hover{
    box-shadow: 0px 0px 8px var(--secondaryColor);
    transform: translateY(-5px);
}

.bg-user{
    
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
}

.link{
    color: var(--secondaryColor);
    text-decoration : none;
    font-weight: 700;
    padding-left: 20px;
}

.router-link-active{
    text-decoration: underline;
    text-underline-offset: 6px;
    text-decoration-thickness: 2px;
    text-decoration-color: rgb(210, 143, 8);
    position: relative;
}

header{
    height: 70px;
    width: 100%;
    max-width: var(--maxscreenwidth);
    background: var(--mainColor);
    margin: 0 auto 5px auto;

    display: flex;
    align-items: center;
    justify-content: space-between;
    /* justify-content: center; */
    border-radius: 10px;
    position: sticky;
    top: 0;
    z-index: 2000;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px 0px;
}

header .logo {
    height: 80px;
    width: 80px;

    text-align: center;
    background-image: url('@/assets/pics/Logo!.jpg');
    background-repeat: no-repeat;
    background-size: contain;
}
.logo-link{
    margin-left: 10%;
}
header nav{
    margin-right: 5%;
}

header nav ul{
    list-style: none;
    display: flex;
    align-items: center;

    color: var(--secondaryColor);
}

header nav ul li{
    /* width: fit-content; */
    font-size: 1.2rem;
    margin-left: 2rem;
}


@media (width < 631px) {
    .img , .bg-user{
    width: 1.9rem;
    height: 1.9rem;
   
}
    .link{
    padding-left: 0px;
}

header .logo {
    height: 70px;
    width: 70px;
    
}
.logo-link{
    margin-left: 0;
}
header nav ul li{
    /* width: fit-content; */
    font-size: 0.9rem;
    margin-left: 1.3rem;

}

header{
    border-radius: 0px;
}

}


@media(width < 375px){
    header nav ul li{
    font-size: 0.76rem;
    margin-left: 1rem;
}
}

@media (width < 1380px) {
    header{
    border-radius: 0px;
}
}

</style>