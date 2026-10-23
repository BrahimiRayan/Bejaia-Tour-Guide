<template>
    <div class="magazine-page">

        <header id="introduction" class="reveal">
            <div class="header-line"></div>
            <h2 translate="no">
                <span class="b-blue">Béjaïa</span>
                <span class="sep">•</span>
                <span class="b-green">ⴱⴳⴰⵢⵝ</span>
                <span class="sep">•</span>
                <span class="b-red">Bgayet</span>
                <span class="sep">•</span>
                <span class="b-yellow">بجاية</span>
            </h2>
            <p class="subtitle">L'histoire d'une perle méditerranéenne</p>
            <div class="header-line"></div>
        </header>

        <main class="content-stream">
            <article class="magazine-block reveal" v-for="(histoire, index) in histoires" :key="histoire.id"
                :class="{ 'reverse': index % 2 !== 0 }">
                <div class="text-col">
                    <div class="index-number">0{{ index + 1 }}</div>
                    <h2>{{ histoire.titre }}</h2>
                    <p>{{ histoire.content }}</p>
                </div>

                <div class="img-col" v-if="histoire.img">
                    <div class="image-wrapper" @click="openImage(index)" @mousemove="handleTilt"
                        @mouseleave="resetTilt">
                        <img :src="`${histoire.img.toLowerCase()}.jpg`" :title="histoire.img" alt="" loading="lazy">
                        <div class="img-overlay">
                            <span>Agrandir</span>
                        </div>
                    </div>
                </div>

                <Teleport to="body">
                    <ImageResizer v-if="histoire.isOpen" :isVisible="histoire.isOpen"
                        :imgsrc="`${histoire.img.toLowerCase()}.jpg`" @close="closeImage(index)" />
                </Teleport>
            </article>
        </main>
    </div>
</template>

<script setup>
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import { onMounted, ref, watch, onUnmounted } from 'vue';
import { db } from '@/Firebase/firebase.js';
import ImageResizer from '@/components/imageResizer.vue';

const histoires = ref([]);
const HistoireColectionRef = collection(db, 'histoire');
const q = query(HistoireColectionRef, orderBy('pos'));

const openImage = (index) => {
    resetTilt({ currentTarget: document.querySelectorAll('.image-wrapper')[index] });
    histoires.value[index].isOpen = true;
    document.body.style.overflow = 'hidden';
};

const closeImage = (index) => {
    histoires.value[index].isOpen = false;
    document.body.style.overflow = 'auto';
};

const handleTilt = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    card.style.boxShadow = `0 30px 60px -10px rgba(0, 168, 255, 0.2)`;
};

const resetTilt = (e) => {
    const card = e.currentTarget;
    if (card) {
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
        card.style.boxShadow = `0 20px 40px -10px rgba(0, 0, 0, 0.6)`;
    }
};

let observer = null;

onMounted(() => {
    onSnapshot(q, (querySnapshot) => {
        const p = [];
        querySnapshot.forEach((doc) => {
            const histoireObj = {
                id: doc.id,
                titre: doc.data().titre,
                content: doc.data().content,
                img: doc.data().img,
                isOpen: false
            };
            p.push(histoireObj);
        });
        histoires.value = p;

        setTimeout(() => {
            observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            }, { threshold: 0.15 });

            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        }, 100);
    });
});

onUnmounted(() => {
    if (observer) observer.disconnect();
});

watch(histoires, (newImages) => {
    const anyImageVisible = newImages.some((image) => image.isOpen);
    if (!anyImageVisible) {
        document.body.style.overflow = 'auto';
    }
});
</script>

<style scoped>
.magazine-page {
    background-color: var(--mainBgcolor, #0d1117);
    color: var(--mainTextcolor, #8b96a5);
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    padding-bottom: 100px;
    overflow-x: hidden;
}

.reveal {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: opacity, transform;
}

.reveal.is-visible {
    opacity: 1;
    transform: translateY(0);
}

#introduction {
    text-align: center;
    padding: 100px 20px 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.header-line {
    width: 100px;
    height: 2px;
    background: var(--secondaryColor, #00a8ff);
    opacity: 0.5;
}

#introduction h2 {
    font-family: 'Playfair Display', serif;
    font-weight: 200;
    font-size: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;
    letter-spacing: 2px;
}

#introduction .sep {
    color: var(--mainTextcolor, #8b96a5);
    font-size: 1.5rem;
    opacity: 0.3;
}

.b-blue {
    color: #0099cc;
    text-shadow: 0 0 20px #0099cc44;
    font-weight: 700;
}

.b-green {
    color: #99cc33;
    text-shadow: 0 0 20px #99cc3344;
    font-weight: 700;
}

.b-red {
    color: #CC0033;
    text-shadow: 0 0 20px #CC003344;
    font-weight: 700;
}

.b-yellow {
    color: #FFE513;
    text-shadow: 0 0 20px #FFE51344;
    font-weight: 700;
}

.subtitle {
    font-size: 1.1rem;
    letter-spacing: 4px;
    text-transform: uppercase;
    opacity: 0.7;
}

.content-stream {
    max-width: 90%;
    margin: 0 auto;
    padding: 5vw;
    display: flex;
    flex-direction: column;
    gap: 120px;
    position: relative;
}

.content-stream::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 1px;
    background: linear-gradient(to bottom, transparent, rgba(0, 168, 255, 0.3), transparent);
    transform: translateX(-50%);
    z-index: 0;
}

.magazine-block {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
    position: relative;
    z-index: 1;
}

.magazine-block.reverse .text-col {
    order: 2;
}

.magazine-block.reverse .img-col {
    order: 1;
}

.text-col {
    position: relative;
}

.index-number {
    font-family: 'Playfair Display', serif;
    font-size: 8rem;
    font-weight: 900;
    color: transparent;
    -webkit-text-stroke: 1px rgba(0, 168, 255, 0.2);
    position: absolute;
    top: -60px;
    left: -30px;
    z-index: 0;
    user-select: none;
    transition: all 0.6s ease;
    
}

.magazine-block.is-visible .index-number {
    -webkit-text-stroke: 1px rgba(0, 168, 255, 0.5);
    transform: translateX(10px) translateY(-10px);
}

.text-col h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(28px, 3vw, 42px);
    color: #fff;
    line-height: 1.2;
    margin-bottom: 24px;
    position: relative;
    z-index: 1;
}

.text-col p {
    font-size: 1.1rem;
    line-height: 1.9;
    margin-bottom: 30px;
    position: relative;
    color: white;
    z-index: 1;
}

.img-col {
    position: relative;
}

.image-wrapper {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.05);
    transform-style: preserve-3d;
    transition: box-shadow 0.3s ease;
}

.image-wrapper img {
    width: 100%;
    height: auto;
    aspect-ratio: 4/3;
    object-fit: cover;
    display: block;
    pointer-events: none;
}

.img-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
}

.image-wrapper:hover .img-overlay {
    opacity: 1;
}

.img-overlay span {
    color: #fff;
    font-size: 1rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    border: 1px solid #fff;
    padding: 8px 16px;
    border-radius: 30px;
    transform: translateY(10px);
    transition: transform 0.3s ease;
}

.image-wrapper:hover .img-overlay span {
    transform: translateY(0);
}

@media (max-width: 900px) {
    .content-stream::before {
        display: none;
        
    }

    .magazine-block {
        grid-template-columns: 1fr;
        gap: 30px;
    }

    .magazine-block.reverse .text-col {
        order: 1;
    }

    .magazine-block.reverse .img-col {
        order: 2;
    }

    .content-stream {
        gap: 80px;
        padding: 4rem 1rem;
    }

    .index-number {
        font-size: 5rem;
        top: -30px;
        left: 0;
    }

    .text-col h2 {
        padding-top: 10px;
    }
}

@media (max-width: 770px) {
    .content-stream{
        max-width: 100%;
    }
    #introduction h2 {
        font-size: 1.2rem;
        gap: 8px;
    }

    #introduction .sep {
        display: none;
    }

    .subtitle {
        font-size: 0.8rem;
    }
    .text-col p {
    font-size: 1rem;
    line-height: 1.2;
    margin-bottom: 30px;
    
    }
    .text-col h2 {
        color : rgb(27, 182, 194);
        text-shadow: 3px 0 0 rgba(15, 15, 15, 0.632);
    }
}
</style>