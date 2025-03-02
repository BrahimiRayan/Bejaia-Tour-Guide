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
            <form :action="`mailto:${email}`" class="ErrForm" method="post" enctype="text/plain">
                <label for="name">Nom:</label>
                <input type="text" placeholder="Votre Nom" id="name" name="name" required>
                <label for="email">Email:</label>
                <input type="email" placeholder="Votre email" id="email" name="email" required>
                <label for="message">Message:</label>
                <textarea id="message" placeholder="Votre Probleme a signaler..." name="message" required></textarea>
                <button type="submit" class="submitBtn"><CoSend class="SendIcon"/> Envoyer</button>
            </form>

        </div>

        <div class="navigation">
            <h2>Menu</h2>
            <ul>
                <li><RouterLink class="links" :to="{name : 'places'}">Places</RouterLink></li>
                <li><RouterLink class="links" :to="{name : 'histoire'}">Histoire</RouterLink></li>
                <li><RouterLink class="links" :to="{name : 'about'}">Sur Nous</RouterLink></li>
            </ul>

            <RouterLink to="/" class="menu-nav"><div class="logo"></div></RouterLink>
        </div>
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
    margin-top: 6px;
    margin: 6px auto;
    background: var(--mainColor);
    max-width: var(--maxscreenwidth);
    display: grid;
    padding: 1.5rem 1rem;
    grid-template-columns: repeat(3, 1fr);
    box-shadow: rgba(0, 0, 0, 0.384) 0px 2px 4px 0px;
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



.ErrForm{
    display: flex;
    flex-direction: column;
    gap: .5rem;
}

.ErrForm input{
    padding: .5rem;
    color: var(--mainColor);
    font-size: .9rem;
    border-radius: 6px;
    border: 2px solid var(--secondaryColor);
}
#message{
    
    padding: .3rem .5rem;
    border-radius: 6px;
    border: 2px solid var(--secondaryColor);
}
.SendIcon{
    width: 30px;
    height: 30px;
}
.submitBtn{
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    font-weight: 600;
    height: 3rem;
    align-self: center;
    border-radius: 20px;
    border: none;
    margin-top: .5rem;
    background: var(--secondaryColor);
}

.icon{
    height: 25px ;
    width: 25px ;
    margin-right: 0.4rem;
}

.navigation{
    margin-left: 2rem;
}


.navigation h2{
    margin-bottom: 1rem;
}

.navigation ul{
    list-style: none;

}

.navigation ul li .links{
    color: white;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 600;

}

.logo {
    height:50%;
    width: 50%;
    /* margin-left: 10%; */
    /* text-align: center; */
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
    color: white;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 600;
    margin-left: 30px;

}

.menu-nav{
    display: none;
}

.ErrForm input{
    width: 80%;
}
#message{
    width: 80%;
}
.SendIcon{
    width: 30px;
    height: 30px;
}

.submitBtn{
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    font-weight: 600;
    height: 3rem;
    /* align-self: center; */
    border-radius: 20px;
    border: none;
    margin-top: .5rem;
    background: var(--secondaryColor);
}

.navigation{
    margin-left: 0;
}

}


</style>