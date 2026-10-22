<template >
    <section>
    <div class="wrapper">
        <div class="subTitle">
            <div class="line"></div>
            <span> Bienvenue</span>
        </div>
        <h1>Une ville entre <span> mer</span> et <span> montagne</span></h1>
        <p>Béjaïa, l'ancienne Saldae romaine, est une ville où l'histoire millénaire dialogue avec les vagues. Du mont Gouraya aux plages des Aiguades, chaque recoin raconte une histoire.</p>
    </div>
    </section>
</template>
<script>

</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');
    section {
        padding: 5rem;
    }
    .wrapper{
        margin: 0 auto;
        text-align: center;
        color: rgb(207, 207, 207);
        font-family: "Roboto Mono" , monospace;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: rgba(65, 64, 64, 0.451);
        padding: 2rem;
        border-radius: 1rem;
    }
    span {
        color: var(--deepBlue);
    }
    .subTitle{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
    }
    .subTitle span {
        letter-spacing: 2px;
        
    }
    p{
        max-width: 37rem;
    }
    .line{
        height: 1px;
        width: 2rem;
        background-color: var(--deepBlue);
    }

    h1 span {
        font-style: italic;
    }
    h1{
        font-size: 2.4rem;
    }
</style>