<template>
    <div id="Wraper">
        <div class="contact">
            <h1>Contacts</h1>
        </div>

        <div class="problem">
            <h1>Signaler un problem ou Corrige d'information</h1>
        </div>

        <div class="navigation">
            <ul>
                <li>Accueil</li>
                <li>Histoire</li>
                <li>About Us</li>
            </ul>

            <div class="logo">Logo</div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
*{color: aliceblue;}
#Wraper{
    margin-top: 20px;
    background: yellow;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}
</style>