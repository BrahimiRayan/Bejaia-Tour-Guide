<template>
    <footer class="site-footer">
        
        
        <div class="footer-top">
            
            
            <div class="brand-col">
                <RouterLink to="/" class="brand-logo">
                    <div class="logo-mark"></div>
                    <span>Béjaïa <em>Tour Guide</em></span>
                </RouterLink>
                <p class="brand-desc">
                    Explorez la perle de la Méditerranée. Découvrez son histoire, ses paysages et sa culture à travers une expérience unique.
                </p>
            </div>

            
            <div class="footer-col">
                <h4>Navigation</h4>
                <ul class="footer-links">
                    <li><RouterLink :to="{name : 'places'}">Lieux à visiter</RouterLink></li>
                    <li><RouterLink :to="{name : 'histoire'}">Notre histoire</RouterLink></li>
                    <li><RouterLink :to="{name : 'about'}">À propos</RouterLink></li>
                </ul>
            </div>

            
            <div class="footer-col">
                <h4>Contact</h4>
                <ul class="footer-links icon-links">
                    <li>
                        <a :href="fb" target="_blank" rel="noopener">
                            <IcFacebookTag class="icon"/>
                            <span>Facebook</span>
                        </a>
                    </li>
                    <li>
                        <a :href="`mailto:${email}`">
                            <SiMinutemailer class="icon"/>
                            <span>Email</span>
                        </a>
                    </li>
                    <li>
                        <a :href="`tel:${phone}`">
                            <MdOutlinedAddIcCall class="icon"/>
                            <span>Téléphone</span>
                        </a>
                    </li>
                    <li>
                        <a :href="linkdin" target="_blank" rel="noopener">
                            <AkLinkedinV1Fill class="icon"/>
                            <span>LinkedIn</span>
                        </a>
                    </li>
                </ul>
            </div>

            
            <div class="footer-col cta-col">
                <h4>Un souci ?</h4>
                <p class="cta-desc">Signalez un problème technique ou une information incorrecte.</p>
                <a :href="`mailto:${email}`" class="cta-btn">
                    <span>Signaler</span>
                    <CoSend class="send-icon" />
                </a>
            </div>

        </div>

        
        <div class="footer-divider"></div>

        
        <div class="footer-bottom">
            <p class="license">
                Released under the 
                <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">MIT License</a>
            </p>
            <p class="copyright">
                &copy; 2024 Béjaïa Tour Guide. Tous droits réservés.
            </p>
        </div>

    </footer>
</template>

<script setup>
import { IcFacebookTag } from '@kalimahapps/vue-icons';
import { SiMinutemailer } from '@kalimahapps/vue-icons';
import { MdOutlinedAddIcCall } from '@kalimahapps/vue-icons';
import { AkLinkedinV1Fill } from '@kalimahapps/vue-icons';
import { CoSend } from '@kalimahapps/vue-icons';

const email = import.meta.env.VITE_mon_email;
const fb = import.meta.env.VITE_mon_Fb;
const linkdin = import.meta.env.VITE_mon_linkdin;
const phone = import.meta.env.VITE_mon_tlfn;
</script>

<style scoped>

.site-footer {
    background: var(--mainColor, #12171c);
    color: #cbd5e1;
    font-family: 'Inter', sans-serif;
    position: relative;
    overflow: hidden;
}


.site-footer::before {
    content: '';
    position: absolute;
    top: -200px;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 400px;
    background: radial-gradient(circle, rgba(0, 154, 250, 0.08) 0%, transparent 70%);
    pointer-events: none;
}


.footer-top {
    max-width: var(--maxscreenwidth, 1200px);
    margin: 0 auto;
    padding: 70px 5vw 50px;
    display: grid;
    grid-template-columns: 2fr 1fr 1.2fr 1.3fr;
    gap: 40px;
    position: relative;
    z-index: 1;
}


.brand-col {
    padding-right: 20px;
}

.brand-logo {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    margin-bottom: 20px;
}

.logo-mark {
    width: 42px;
    height: 42px;
    background-image: url('@/assets/pics/Logo!.jpg');
    background-size: cover;
    background-position: center;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 154, 250, 0.3);
}

.brand-logo span {
    font-family: 'Smooch Sans', sans-serif;
    font-size: 1.7rem;
    color: #fff;
    font-weight: 700;
    letter-spacing: -0.5px;
}

.brand-logo em {
    color: var(--secondaryColor, #009afa);
    font-style: normal;
}

.brand-desc {
    font-size: 0.95rem;
    line-height: 1.7;
    color: #8b96a5;
    max-width: 340px;
}


.footer-col h4 {
    font-family: 'Smooch Sans', sans-serif;
    font-size: 1.15rem;
    color: #fff;
    margin: 0 0 22px 0;
    letter-spacing: 0.5px;
    position: relative;
    padding-bottom: 10px;
}

.footer-col h4::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 24px;
    height: 2px;
    background: var(--secondaryColor, #009afa);
    border-radius: 2px;
}

.footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.footer-links li a {
    color: #8b96a5;
    text-decoration: none;
    font-size: 0.95rem;
    transition: color 0.25s ease;
    position: relative;
    display: inline-block;
    padding-bottom: 2px;
}

.footer-links li a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--secondaryColor, #009afa);
    transition: width 0.3s ease;
}

.footer-links li a:hover {
    color: #fff;
}

.footer-links li a:hover::after {
    width: 100%;
}


.icon-links li a {
    display: inline-flex;
    align-items: center;
    gap: 10px;
}

.icon-links .icon {
    width: 18px;
    height: 18px;
    color: var(--secondaryColor, #009afa);
    transition: transform 0.25s ease;
}

.icon-links li a:hover .icon {
    transform: translateX(3px) scale(1.1);
}


.cta-desc {
    font-size: 0.9rem;
    line-height: 1.6;
    color: #8b96a5;
    margin: 0 0 20px 0;
}

.cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: var(--secondaryColor, #009afa);
    color: #fff;
    text-decoration: none;
    padding: 12px 24px;
    border-radius: 30px;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
    box-shadow: 0 8px 20px rgba(0, 154, 250, 0.3);
}

.cta-btn:hover {
    background: #007acc;
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(0, 154, 250, 0.5);
}

.send-icon {
    width: 16px;
    height: 16px;
    transition: transform 0.25s ease;
}

.cta-btn:hover .send-icon {
    transform: translateX(4px) translateY(-1px);
}


.footer-divider {
    max-width: var(--maxscreenwidth, 1200px);
    margin: 0 auto;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent);
}


.footer-bottom {
    max-width: var(--maxscreenwidth, 1200px);
    margin: 0 auto;
    padding: 25px 5vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    font-size: 0.82rem;
    color: #6b7280;
    position: relative;
    z-index: 1;
}

.footer-bottom p {
    margin: 0;
}

.license a {
    color: var(--secondaryColor, #009afa);
    text-decoration: none;
    transition: color 0.25s ease;
}

.license a:hover {
    color: #fff;
    text-decoration: underline;
}


@media (max-width: 1024px) {
    .footer-top {
        grid-template-columns: 1fr 1fr;
        gap: 40px 30px;
    }

    .brand-col {
        grid-column: 1 / -1;
        padding-right: 0;
    }
}

@media (max-width: 640px) {
    .footer-top {
        grid-template-columns: 1fr;
        padding: 50px 6vw 30px;
        gap: 35px;
    }

    .footer-col h4::after {
        width: 20px;
    }

    .footer-bottom {
        flex-direction: column;
        text-align: center;
        padding: 25px 6vw;
    }

    .brand-logo span {
        font-size: 1.5rem;
    }

    .logo-mark {
        width: 38px;
        height: 38px;
    }

    .cta-btn {
        width: 100%;
        justify-content: center;
    }
}

</style>