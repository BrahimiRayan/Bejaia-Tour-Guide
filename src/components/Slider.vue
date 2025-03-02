<template>
<section class="slider-container">
            <div class="slider" slyle="">
                <div class="item" style="--position:1;"><img src="@/assets/pics/bejaia 1.jpg" alt="" loading="lazy" ></div>
                <div class="item" style="--position:2;"><img src="@/assets/pics/bejaia 2.jpg" alt="" loading="lazy" ></div>
                <div class="item" style="--position:3;"><img src="@/assets/pics/bejaia 3.jpg" alt="" loading="lazy" ></div>
                <div class="item" style="--position:4;"><img src="@/assets/pics/bejaia 4.jpg" alt="" loading="lazy" ></div>
                <div class="item" style="--position:5;"><img src="@/assets/pics/bejaia 5.jpg" alt="" loading="lazy" ></div>
                <div class="item" style="--position:6;"><img src="@/assets/pics/bejaia 6.jpg" alt="" loading="lazy" ></div>
                <div class="item" style="--position:7;"><img src="@/assets/pics/bejaia 7.jpg" alt="" loading="lazy" ></div>
            </div>

            <h1 class="titlepage" data-content="Bejaia Tour Guide" translate="no">Bejaia Tour Guide</h1>
        </section>
</template>

<style scoped>

/* ANIMATIONS  */

@keyframes autoRun{
    from{
        transform: perspective(1000px) rotateX(-18deg) rotateY(0deg);
    }to{
        transform: perspective(1000px) rotateX(-18deg) rotateY(360deg);
    }
}


.slider-container{
    width: 100%;
    height: 500px;
    text-align: center;
    overflow: hidden;
    position: relative;

}
.slider-container .slider{
    position: absolute;
    width: 200px;
    height: 250px;
    top: 13%;
    left: calc(50% - 100px);
    transform-style: preserve-3d;
    transform: perspective(1000px);
    animation: autoRun 30s linear infinite;
    
    z-index: 2;
}

.slider-container .slider .item{
    
    position: absolute;
    inset: 0 0 0 0;
    transform: 
    rotateY(calc( (var(--position) - 1) * (360 / var(--SliderQuantity)) * 1deg))
    translateZ(300px);
}
.slider-container .slider .item img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50px;
}

.slider-container .titlepage{
    color: var(--secondaryColor);
    font-size: clamp(20px , 8rem , 11rem);
    position: relative;

}

.slider-container .titlepage::after{
    position: absolute;
    inset: 0 0 0 0;
    
    content: attr(data-content);
    -webkit-text-stroke: 2px white;
    
    color: transparent;

    z-index: 20;
}


@media (width < 768px) {

    @keyframes autoRun{
    from{
        transform: perspective(300px) rotateX(-18deg) rotateY(0deg);
    }to{
        transform: perspective(300px) rotateX(-18deg) rotateY(360deg);
    }
}

.slider-container{
    height: 300px;
}

.slider-container .titlepage{
    margin-top: 2rem;
    font-size: 4.3rem;
}

.slider-container .titlepage::after{
    -webkit-text-stroke: 2px rgba(255, 255, 255, 0.658);
}


}

@media (width < 425px){
    .slider-container{
        height: 330px;
    }   
}

@media (width < 375px) {
    .slider-container .titlepage{
        margin-top: 3rem;
        font-size: 3.3rem;

}
.slider-container{
    height: 250px;

}

}
</style>


<script setup>

</script>