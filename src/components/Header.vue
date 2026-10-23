<template>
    <header>
        
        <RouterLink to="/" class="logo-link">
            <div class="logo-mark"></div>
            <div class="logo-text">Béjaïa <em>Tour Guide</em></div>
        </RouterLink>

        
        <nav>
            <ul class="nav-list">
                <li><RouterLink class="link" :to="{name : 'places'}">Lieux</RouterLink></li>
                <li><RouterLink class="link" :to="{name : 'histoire'}">Histoire</RouterLink></li>
                <li><RouterLink class="link" :to="{name : 'about'}">Infos</RouterLink></li>
                <li class="user">
                    <div class="img" ref="accountRef" @click.stop="toggleBox">
                        <img v-if="!img" src="@/assets/pics/user.png" class="bg-user" loading="lazy" alt="guest">
                        <img v-else :src="img || defaultImg" class="bg-user" alt="user avatar" loading="lazy" @error="onImageError">
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
    event.target.src = defaultImg;
};

const isBoxVisible = ref(false);
const accountRef = ref(null);

const toggleBox = () => {
    isBoxVisible.value = !isBoxVisible.value;
};
</script>

<style scoped>


header {
    height: 72px;
    width: 100%;
    max-width: var(--maxscreenwidth, 1400px);
    margin: 0 auto;
    padding: 0 4vw;

    display: flex;
    align-items: center;
    justify-content: space-between;

    background: rgba(13, 17, 23, 0.7);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2000;
}


.logo-link {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
}

.logo-mark {
    width: 42px;
    height: 42px;
    background-image: url('@/assets/pics/Logo!.jpg');
    background-size: cover;
    background-position: center;
    border-radius: 12px;
    box-shadow: 1px 2px 6px rgba(0, 154, 250, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.logo-link:hover .logo-mark {
    transform: rotate(-5deg) scale(1.05);
    box-shadow: 0 8px 22px rgba(0, 154, 250, 0.5);
}

.logo-text {
    font-family: 'Smooch Sans', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.5px;
    line-height: 1;
}

.logo-text em {
    color: var(--secondaryColor, #009afa);
    font-style: normal;
    font-weight: 500;
}


nav {
    display: flex;
    align-items: center;
}

.nav-list {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    padding: 0;
}

.nav-list li {
    display: flex;
    align-items: center;
}


.link {
    color: #cbd5e1;
    text-decoration: none;
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 30px;
    transition: color 0.25s ease, background 0.25s ease;
    position: relative;
}

.link:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.05);
}


.link.router-link-active {
    color: var(--secondaryColor, #009afa);
    background: rgba(0, 154, 250, 0.12);
    font-weight: 600;
}


.link.router-link-active::before {
    content: '';
    position: absolute;
    bottom: 1px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    background: var(--secondaryColor, #009afa);
    border-radius: 50%;
    box-shadow: 0 0 8px var(--secondaryColor, #009afa);
}


.user {
    position: relative;
    margin-left: 12px;
    padding-left: 16px;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.img {
    width: 42px;
    height: 42px;
    background-color: #ecf0f3;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 0 0 2px rgba(0, 154, 250, 0.2);
    transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.img:hover {
    box-shadow: 0 0 0 3px var(--secondaryColor, #009afa), 0 0 20px rgba(0, 154, 250, 0.5);
    transform: scale(1.05);
}

.bg-user {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
}


@media (max-width: 720px) {
    header {
        height: 64px;
        padding: 0 3vw;
    }

    .logo-mark {
        width: 36px;
        height: 36px;
    }

    .logo-text {
        font-size: 1.2rem;
    }

    .nav-list {
        gap: 2px;
    }

    .link {
        font-size: 0.85rem;
        padding: 6px 12px;
    }

    .user {
        margin-left: 6px;
        padding-left: 10px;
    }

    .img {
        width: 36px;
        height: 36px;
    }
}

@media (max-width: 480px) {
    .logo-text {
        display: none; 
    }

    .link {
        font-size: 0.8rem;
        padding: 6px 10px;
    }

    .link.router-link-active::before {
        display: none;
    }
}
</style>