<template>
    <div id="Wraper">
        <div class="contact">
            <h1>Contacts</h1>
            <ul>
                <li><a :href="fb" target="_blank"><IcFacebookTag class="icon"/><p>Facebook</p></a></li>
                <li><a :href="`to:${email}`" target="_blank"><SiMinutemailer class="icon"/><p>Email</p></a></li>
                <li><a :href="`phone:${phone}`" target="_blank"><MdOutlinedAddIcCall class="icon"/><p>Telephone</p></a></li>
                <li><a :href="linkdin" target="_blank"><AkLinkedinV1Fill class="icon"/><p>linkedin</p></a></li>
            </ul>
        </div>

        <div class="problem">
            <h1>Signaler un problem </h1>
            <a :href="`mailto:${email}`" class="EmailLink">
                <div class="submitBtn">
                    Click ici <CoSend class="SendIcon" />
                </div>
             </a>
        </div>

        <div class="navigation">
            <h1>Menu</h1>
            <ul>
                <li><RouterLink class="links" :to="{name : 'places'}">Places</RouterLink></li>
                <li><RouterLink class="links" :to="{name : 'histoire'}">Histoire</RouterLink></li>
                <li><RouterLink class="links" :to="{name : 'about'}">Sur Nous</RouterLink></li>
            </ul>

        </div>
        <RouterLink to="/" class="menu-nav"><div class="logo"></div></RouterLink>
    </div>

    <div class="licence">
        <p>Released under the <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer"> MIT License</a></p>
        <p>&copy; 2024 Bejaia Tour Guide. All rights reserved.</p>
    </div>
</template>

<script setup>
import { IcFacebookTag } from '@kalimahapps/vue-icons';
import { SiMinutemailer } from '@kalimahapps/vue-icons';
import { MdOutlinedAddIcCall } from '@kalimahapps/vue-icons';
import { AkLinkedinV1Fill } from '@kalimahapps/vue-icons';
import { CoSend } from '@kalimahapps/vue-icons';
var email = import.meta.env.VITE_mon_email;
var fb = import.meta.env.VITE_mon_Fb;
var linkdin = import.meta.env.VITE_mon_linkdin;
var phone = import.meta.env.VITE_mon_tlfn;


</script>

<style scoped>

*{color: aliceblue;}
.licence{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: .8rem;
    padding: 1rem;
}


#Wraper{
    margin: 6px auto;
    background: var(--mainColor);
    max-width: var(--maxscreenwidth);
    display: grid;
    padding: 1.5rem 1rem;
    grid-template-columns: repeat(3, 1fr) 150px;
}


.contact h1{
    font-size: 1.75rem;
    font-weight: 600;    
}
.contact ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: .5rem;
}
.contact ul li a {
    display: flex;
    align-items: center;
    text-decoration: none;
}


.contact ul li{
    margin-top: .7rem;
}

.problem h1 {
    font-size: 1.72rem;
    margin-bottom: 0.9rem;
}

.SendIcon{
    margin-left: 10px;
    width: 20px;
    height: 20px;
}
.submitBtn{
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    height: 3rem;
    align-self: center;
    border-radius: 20px;
    border: none;
    margin: 3rem 2rem;
    background: var(--secondaryColor);
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    
}
.EmailLink{
    color: rgb(255, 255, 255);
    text-decoration: none;
}
.submitBtn:hover{
    background-color: rgb(2, 123, 204);
    scale: 1.05;
}
.icon{
    height: 25px ;
    width: 25px ;
    margin-right: 0.4rem;
}

.navigation{
    
    margin-left: 50%;
}


.navigation h1{
    margin-bottom: 1rem;
}

.navigation ul{
    list-style: none;

}
.navigation ul li {
    margin-left: 5px;
    transition: all 0.3s ease-in-out;
}
.navigation ul li .links{
 
    color: var(--secondaryColor);
    text-decoration: none;
    font-size: 1rem;
    font-weight: 600;
   
}
.navigation ul li:hover{
    color: rgb(76, 76, 204);
    scale: 1.05;
}
.logo {
    height:100%;
    width: 100%;
    background-image: url('@/assets/pics/Logo!.jpg');
    background-repeat: no-repeat;
    background-size: contain;
}


@media (width < 768px) {
    #Wraper{
    background: var(--mainColor);
    display: grid;
    padding: 1.5rem 1rem;
    grid-template-columns: repeat(1, 1fr);
    gap: 2rem;
}

.navigation h2{
    margin-bottom: 2rem;
}

.navigation ul{
    display: flex; 
    list-style: none;
}

.navigation ul li .links{
    color: var(--secondaryColor);
    text-decoration: none;
    font-size: .9rem;
    font-weight: 600;
    margin-left: 30px;

}

.menu-nav{
    display: none;
}

.submitBtn{
    width: 200px;
}



.navigation{
    margin-left: 0;
}

}
@media (769px<width<1070px) {
    .problem h1 , .contact h1, .navigation h1 {
    font-size: 1.12rem;
    margin-bottom: 0.9rem;
}
}

</style>