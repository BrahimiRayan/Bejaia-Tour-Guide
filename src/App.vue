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
    <Footer/>
</template>


<script setup>
import { RouterLink , RouterView } from "vue-router";
// console.log(process.env.VUE_APP_FIREBASE_API_KEY);
import Footer from '@/components/Footer.vue'


</script>


<style scoped>


.link{
    color: var(--secondaryColor);
    text-decoration : none;
    font-weight: 700;
    padding-left: 26px;
}

header{
    height: 70px;
    width: 100%;
    max-width: var(--maxscreenwidth);
    background: var(--mainColor);
    margin: 0 auto 10px auto;

    display: flex;
    align-items: center;
    justify-content: space-between;
    /* justify-content: center; */
    border-radius: 10px;
}

header .logo {
    height: 80px;
    width: 80px;
    margin-left: 10%;
    text-align: center;
    background-image: url('@/assets/pics/Logo!.jpg');
    background-repeat: no-repeat;
    background-size: contain;
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


</style>
