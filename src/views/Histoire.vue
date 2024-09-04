<template>
    <div id="introduction">
        <h2><span>Béjaïa</span> | <span>ⴱⴳⴰⵢⵝ</span> | <span>Bgayet</span> | <span>بجاية</span> </h2>
    </div>
    <div class="content" v-for="(histoire , index) in histoires" :key="histoire.id" >
        <h2>{{ histoire.titre }}</h2>
        <img :src="`${histoire.img.toLowerCase()}.jpg`" :title="histoire.img" alt="" v-if="histoire.img" @click="openImage(index)">
        <p>{{ histoire.content }}</p>
        <ImageResizer 
            v-if="histoire.isOpen"
            :isVisible="histoire.isOpen" 
            :imgsrc="`${histoire.img.toLowerCase()}.jpg`"
            @close="closeImage(index)" 
        />
    </div>

</template>

<script setup>
import { onSnapshot, collection , query , orderBy  } from 'firebase/firestore';
import { onMounted, ref, watch } from 'vue';
import { db } from '@/Firebase/firebase.js';
import ImageResizer from '@/components/imageResizer.vue';

const openImage = (index) => {
    histoires.value[index].isOpen = true;
    document.body.style.overflow = 'hidden'; 
};

const closeImage = (index) => {
    histoires.value[index].isOpen = false;
    document.body.style.overflow = 'auto'; 
};

const histoires = ref([]);
const HistoireColectionRef = collection(db , 'histoire')

const q = query(HistoireColectionRef , orderBy('pos'))

onMounted(() => {
    onSnapshot(q, (querySnapshot) => {
        const p = [];
        querySnapshot.forEach((doc) => {
            const histoireObj = {
                id: doc.id,
                titre: doc.data().titre,
                content: doc.data().content,
                img: doc.data().img,
                isOpen : false
            };
            p.push(histoireObj);
        });
        histoires.value = p;
    });
});


watch(histoires, (newImages) => {
  const anyImageVisible = newImages.some((image) => image.isOpen);
  if (!anyImageVisible) {
    document.body.style.overflow = 'auto'; 
  }
});
</script>


<style scoped>

#introduction {
    margin: 1rem auto;
    width: fit-content;
}

#introduction h2{
   
    font-weight: 200;
    font-size: 2.4rem;
}

#introduction h2 span:nth-child(1){
    color: #0099cc;
    text-shadow: -7px 4px 2px #0099cc22;
    -webkit-text-stroke: 2px #ffffff12;
    font-size:3rem;
    font-weight: 900;
}
#introduction h2 span:nth-child(2){
    color: #99cc33;
    text-shadow: -7px 4px 2px #99cc3322;
    -webkit-text-stroke: 2px #ffffff12;
    font-size:3rem;
    font-weight: 900;
}
#introduction h2 span:nth-child(3){
    color: #CC0033;
    text-shadow: -7px 4px 2px #CC003322;
    -webkit-text-stroke: 2px #ffffff12;
    font-size:3rem;
    font-weight: 900;
}
#introduction h2 span:nth-child(4){
    color: #FFE513;
    text-shadow: -7px 4px 2px #FFE51322;
    -webkit-text-stroke: 2px #ffffff12;
    font-size:3rem;
    font-weight: 900;
}

.content{
    width: 95%;
    margin: 20px auto ;
    border: 4px solid var(--secondaryColor);
    border-radius: 20px;
    padding: 10px;
    overflow: hidden;
    position: relative;
}

.content h2 {
    color: var(--secondaryColor);
    font-size: 2.3rem;
}

.content img {
    display: block;
    width: fit-content;
    max-width: 900px;
    margin: 10px auto;
}

.content p {
    width: 80%;
    margin: 8px auto;
    font-size: 1.4rem;
    color: var(--mainTextcolor);
    /* padding: 15px; */
}

@media (width < 769px) {
.content img {
    width: 99%;
    border: 1px solid rgb(226, 228, 226);
    border-radius: 8px;
}


.content p {
    width: 90%;
    font-size: 1.2rem;

}
}

@media (width < 426px) {
    .content p {
        font-size: 1rem;
    }

    .content h2 {
        font-size: 1.5rem;
    }
}


@media (width < 702px) {
    #introduction h2 span:nth-child(1){
        font-size: 1.3rem;        
    }

    #introduction h2 span:nth-child(2){
        font-size: 1.3rem;        
    }
    #introduction h2 span:nth-child(3){
        font-size: 1.3rem;        
    }
    #introduction h2 span:nth-child(4){
        font-size: 1.3rem;        
    }
}

@media (width < 363px) {
    #introduction h2 span:nth-child(1){
        font-size: 1rem;        
    }

    #introduction h2 span:nth-child(2){
        font-size: 1rem;        
    }
    #introduction h2 span:nth-child(3){
        font-size: 1rem;        
    }
    #introduction h2 span:nth-child(4){
        font-size: 1rem;        
    }
}
</style>