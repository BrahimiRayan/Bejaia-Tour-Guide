<template>
    <div class="about-page">
        
        
        <section class="hero-section">
            <div class="text-col">
                <div class="eyebrow">
                    <span>Bejaia Tour Guide · V2.1</span>
                </div>
                <h1>BRAHIMI Rayan</h1>
                <p class="hero-desc">
                    Bienvenue sur Bejaia Tour Guide ! Je suis un étudiant en informatique passionné par ma ville, Bejaia. Ce site est né de mon désir de partager la beauté et la richesse culturelle de notre région avec le monde entier.
                </p>
                
                <div class="hero-actions">
                    <div class="version-badge">
                        <span class="label">Version</span>
                        <span class="value" title="Bienvenue sur la V2.1 ! Cette mise à jour apporte un design entièrement repensé (mode sombre premium, animations fluides, nouvelle carte interactive avec vue satellite et itinéraires, gestion améliorée des commentaires et du profil). L'expérience utilisateur a été optimisée pour être plus rapide, plus belle et plus intuitive.">V2.1</span>
                    </div>

                    <a href="https://brahimirayan.netlify.app/" target="_blank" rel="noopener" class="portfolio-btn">
                        Mon Portfolio
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </a>
                </div>
            </div>
            
            <div class="visual-col">
                <div class="avatar-frame">
                    <img class="avatar-main" src="@/assets/pics/me.jpeg" alt="Brahimi Rayan">
                    <div class="avatar-glow"></div>
                </div>
            </div>
        </section>

        
        <section class="mission-grid">
            <div class="mission-card">
                <div class="card-number">01</div>
                <h2>Ma Mission</h2>
                <p>Bejaia Tour Guide est un projet personnel, conçu comme un guide touristique gratuit et accessible pour aider les visiteurs à découvrir ma magnifique ville. Ce site n'a aucun but lucratif ; il s'agit avant tout d'une expérience enrichissante pour moi et d'un service pour les voyageurs et les amoureux de la nature.</p>
            </div>

            <div class="mission-card">
                <div class="card-number">02</div>
                <h2>Pourquoi ce site ?</h2>
                <p>En tant qu'étudiant en informatique, j'ai voulu créer un projet qui combine ma passion pour le développement web et mon amour pour ma région. Bejaia est une ville avec une histoire riche, des paysages époustouflants et une culture unique. Ce site est une manière pour moi de contribuer modestement à sa promotion, tout en offrant aux touristes une ressource utile pour planifier leur visite.</p>
            </div>

            <div class="mission-card">
                <div class="card-number">03</div>
                <h2>Ce que vous trouverez ici</h2>
                <p>Une sélection de lieux touristiques de ma ville, chacun accompagné d'une photo, d'une description détaillée, ainsi que de sa localisation sur la carte. Une section dédiée à l'histoire de Bejaia. Depuis la V2.0, vous pouvez créer un compte, aimer des contenus, sauvegarder des lieux, et ajouter vos avis. Mon objectif : vous offrir un guide simple et pratique pour explorer ma magnifique ville.</p>
            </div>

            <div class="mission-card">
                <div class="card-number">04</div>
                <h2>Contactez-moi</h2>
                <p>Si vous avez des questions, des suggestions ou simplement envie d'échanger, n'hésitez pas à me contacter. Je suis toujours heureux de discuter de notre belle région et d'améliorer ce site pour qu'il soit encore plus utile pour les visiteurs.</p>
            </div>
        </section>

        
        <section class="thanks-section">
            <div class="section-header">
                <h2>Remerciements Spéciaux</h2>
                <div class="header-line"></div>
            </div>
            <p class="thanks-text">
                Je souhaite exprimer ma profonde gratitude à mes amis pour leur précieuse contribution de certaines des magnifiques images présentées sur ce site. Leur soutien a été essentiel pour rendre Bejaia Tour Guide encore plus visuellement attrayant.
            </p>
            
            <div class="friends-grid">
                <a href="https://www.instagram.com/salah_meradi/" target="_blank" rel="noopener" class="friend-card">
                    <div class="friend-icon instagram">
                        <AnOutlinedInstagram />
                    </div>
                    <div class="friend-info">
                        <span>Instagram</span>
                        <h4>MERADI Salah</h4>
                    </div>
                </a>

                <a href="https://www.facebook.com/mouhamed.yedjed" target="_blank" rel="noopener" class="friend-card">
                    <div class="friend-icon facebook">
                        <BxFacebookCircle />
                    </div>
                    <div class="friend-info">
                        <span>Facebook</span>
                        <h4>Mohamed Ydjedd</h4>
                    </div>
                </a>
            </div>
        </section>

        
        <section class="copyright-section">
            <div class="section-header">
                <h2>Respect des Droits d'Auteur</h2>
                <div class="header-line"></div>
            </div>
            <p>
                Toutes les images utilisées sur ce site ont été obtenues légalement à partir de sources ouvertes, soit sous licence Creative Commons, soit dans le domaine public. Conformément aux règles de droit d'auteur, ces images sont utilisées sans violation des droits des créateurs. Pour plus d'informations, consultez les articles pertinents sur Creative Commons ou sur le site de l'OMPI 
                <a href="https://www.wipo.int/portal/en/index.html" target="_blank" rel="noopener">(wipo.int)</a>.
            </p>
        </section>

    </div>
</template>

<script setup>
import { AnOutlinedInstagram } from '@kalimahapps/vue-icons';
import { BxFacebookCircle } from '@kalimahapps/vue-icons';
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Smooch+Sans:wght@300..900&family=Inter:wght@300;400;500;600&display=swap');

.about-page {
    background-color: var(--mainBgcolor, #0d1117);
    color: #eef2f6;
    min-height: 100vh;
    padding: 3rem;
    margin-top: 3rem;
    font-family: 'Inter', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
}


.hero-section {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 60px;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    margin-bottom: 100px;
}

.eyebrow {
    display: inline-block;
    background: rgba(0, 154, 250, 0.1);
    color: var(--secondaryColor, #009afa);
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 20px;
    border: 1px solid rgba(0, 154, 250, 0.2);
}

.text-col h1 {
    font-family: 'Smooch Sans', sans-serif;
    font-size: clamp(3rem, 6vw, 5rem);
    line-height: 1;
    color: #fff;
    margin: 0 0 24px 0;
    letter-spacing: -1px;
    text-shadow: 0 10px 30px rgba(0, 154, 250, 0.15);
}

.hero-desc {
    font-size: 1.15rem;
    line-height: 1.8;
    color: #8b96a5;
    max-width: 550px;
    margin: 0 0 30px 0;
}


.hero-actions {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
}

.version-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 8px 20px;
    border-radius: 30px;
    font-size: 0.9rem;
}

.version-badge .label {
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.75rem;
}

.version-badge .value {
    color: var(--secondaryColor, #009afa);
    font-weight: 700;
    font-family: 'Smooch Sans', sans-serif;
    font-size: 1.1rem;
    cursor: help;
}

.portfolio-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: var(--secondaryColor, #009afa);
    color: #fff;
    text-decoration: none;
    padding: 10px 24px;
    border-radius: 30px;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
    box-shadow: 0 8px 20px rgba(0, 154, 250, 0.3);
}

.portfolio-btn:hover {
    background: #007acc;
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(0, 154, 250, 0.5);
}

.portfolio-btn svg {
    transition: transform 0.25s ease;
}

.portfolio-btn:hover svg {
    transform: translateX(4px);
}


.visual-col {
    display: flex;
    justify-content: center;
}

.avatar-frame {
    position: relative;
    width: 280px;
    height: 340px;
    border-radius: 160px 160px 24px 24px;
    padding: 10px;
    background: linear-gradient(160deg, rgba(0, 154, 250, 0.15), rgba(255, 255, 255, 0.02));
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.avatar-main {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 150px 150px 16px 16px;
    position: relative;
    z-index: 2;
}

.avatar-glow {
    position: absolute;
    inset: 0;
    border-radius: 160px 160px 24px 24px;
    background: var(--secondaryColor, #009afa);
    filter: blur(40px);
    opacity: 0.3;
    z-index: 1;
    transform: translateY(20px) scale(0.9);
}


.mission-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    width: 100%;
    max-width: 1200px;
    margin-bottom: 100px;
}

.mission-card {
    position: relative;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 20px;
    padding: 40px;
    transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease;
    overflow: hidden;
}

.mission-card:hover {
    transform: translateY(-5px);
    border-color: rgba(0, 154, 250, 0.3);
    background: rgba(255, 255, 255, 0.04);
}

.card-number {
    font-family: 'Smooch Sans', sans-serif;
    font-size: 4rem;
    font-weight: 900;
    color: transparent;
    -webkit-text-stroke: 1px rgba(0, 154, 250, 0.3);
    line-height: 1;
    margin-bottom: 10px;
    transition: -webkit-text-stroke 0.3s ease;
}

.mission-card:hover .card-number {
    -webkit-text-stroke: 1px rgba(0, 154, 250, 0.7);
}

.mission-card h2 {
    font-family: 'Smooch Sans', sans-serif;
    font-size: 1.8rem;
    color: var(--secondaryColor, #009afa);
    margin: 0 0 16px 0;
    font-weight: 700;
}

.mission-card p {
    color: #8b96a5;
    font-size: 1rem;
    line-height: 1.8;
    margin: 0;
}


.section-header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 30px;
}

.section-header h2 {
    font-family: 'Smooch Sans', sans-serif;
    font-size: 2.2rem;
    color: #fff;
    margin: 0;
    white-space: nowrap;
}

.header-line {
    height: 1px;
    flex: 1;
    background: linear-gradient(to right, rgba(0, 154, 250, 0.4), transparent);
}


.thanks-section {
    width: 100%;
    max-width: 1200px;
    margin-bottom: 80px;
}

.thanks-text {
    color: #8b96a5;
    font-size: 1.05rem;
    line-height: 1.8;
    margin-bottom: 40px;
    max-width: 850px;
}

.friends-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.friend-card {
    display: flex;
    align-items: center;
    gap: 20px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 20px 24px;
    text-decoration: none;
    transition: transform 0.3s ease, background 0.3s ease, border-color 0.3s ease;
}

.friend-card:hover {
    transform: translateY(-3px);
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.15);
}

.friend-icon {
    width: 50px;
    height: 50px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: transform 0.3s ease;
}

.friend-icon svg {
    width: 24px;
    height: 24px;
    color: #fff;
}

.friend-card:hover .friend-icon {
    transform: scale(1.1) rotate(-5deg);
}

.friend-icon.instagram {
    background: linear-gradient(45deg, #833ab4, #fd1d1d, #fcb045);
}

.friend-icon.facebook {
    background: #1877f2;
}

.friend-info span {
    display: block;
    font-size: 0.75rem;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 2px;
}

.friend-info h4 {
    color: #fff;
    font-size: 1.1rem;
    margin: 0;
    font-family: 'Smooch Sans', sans-serif;
    letter-spacing: 0.5px;
}


.copyright-section {
    width: 100%;
    max-width: 1200px;
    padding-top: 40px;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.copyright-section p {
    color: #8b96a5;
    font-size: 0.95rem;
    line-height: 1.8;
    max-width: 900px;
}

.copyright-section a {
    color: #fcb045;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.25s ease;
}

.copyright-section a:hover {
    color: #fff;
    text-decoration: underline;
}


@media (max-width: 1024px) {
    .hero-section {
        grid-template-columns: 1fr;
        gap: 40px;
        text-align: center;
        margin-bottom: 80px;
    }

    .hero-desc {
        margin-left: auto;
        margin-right: auto;
    }

    .hero-actions {
        justify-content: center;
    }

    .avatar-frame {
        width: 220px;
        height: 280px;
    }

    .mission-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 640px) {
    .about-page {
        padding: 40px 4vw 80px;
    }

    .text-col h1 {
        font-size: 2.5rem;
    }

    .hero-desc {
        font-size: 1rem;
    }

    .mission-card {
        padding: 30px 24px;
    }

    .card-number {
        font-size: 3rem;
    }

    .mission-card h2 {
        font-size: 1.5rem;
    }

    .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }

    .section-header h2 {
        font-size: 1.7rem;
        white-space: normal;
    }

    .header-line {
        width: 60px;
        flex: none;
    }

    .friends-grid {
        grid-template-columns: 1fr;
    }

    .avatar-frame {
        width: 180px;
        height: 230px;
    }
}
</style>