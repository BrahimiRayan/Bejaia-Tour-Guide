<template>
    <div>
        <div class="me">
            <div class="Text">
                <h1>BRAHIMI Rayan</h1>
                <p>Bienvenue sur Bejaia Tour Guide <span class="New" title="Des modifications ont été apportées à cette application web par rapport à la version 1.0. Désormais, vous pouvez créer un compte, aimer des contenus, sauvegarder des lieux que vous souhaitez visiter à l'avenir, ajouter vos avis sur ces lieux, ainsi que profiter d'optimisations pour améliorer la facilité et la rapidité d'utilisation. Soyez les bienvenus sur BEJAIA TOUR GUID ! ">V2.0</span>! Je m'appelle BRAHIMI Rayan, un étudiant en informatique passionné par ma ville, Bejaia. Ce site est né de mon désir de partager la beauté et la richesse culturelle de notre région avec le monde entier.</p>
            </div>
            <div class="imageHolder">
                <img src="@/assets/pics/Brahimi_Rayan.png" alt="">
            </div>
        </div>

        <div class="Aboutweb">
            <div>
                <h2>Notre Mission</h2>
                <p>Bejaia Tour Guide est un projet personnel, conçu comme un guide touristique gratuit et accessible pour aider les visiteurs à découvrir notre magnifique ville. Ce site n'a aucun but lucratif ; il s'agit avant tout d'une expérience enrichissante pour moi et d'un service pour les voyageurs et les amoureux de la nature.</p>
            </div>
            <div>
                <h2>Pourquoi ce site ?</h2>
                <p>En tant qu'étudiant en informatique, j'ai voulu créer un projet qui combine ma passion pour le développement web et mon amour pour ma région. Bejaia est une ville avec une histoire riche, des paysages époustouflants et une culture unique. Ce site est une manière pour moi de contribuer modestement à sa promotion, tout en offrant aux touristes une ressource utile pour planifier leur visite.</p>
            </div>
            <div>
                <h2>Ce que vous trouverez ici</h2>
                <p>Sur Bejaia Tour Guide, vous trouverez une sélection de lieux touristiques de notre ville, chacun accompagné d'une photo, d'une description détaillée, ainsi que de sa localisation sur la carte. Le site propose également une section dédiée à l'histoire de Bejaia. En plus de cela, la version V2.0 vous permet désormais de créer un compte, d'aimer des contenus, de sauvegarder des lieux que vous souhaitez visiter à l'avenir, et d'ajouter vos avis sur ces lieux. De nombreuses optimisations ont également été mises en place pour améliorer la facilité et la rapidité d'utilisation. Mon objectif reste le même : vous offrir un guide simple et pratique pour explorer notre magnifique ville et en découvrir tous les secrets.</p>
            </div>
            <div>
                <h2>Contactez-moi</h2>
                <p>Si vous avez des questions, des suggestions ou simplement envie d'échanger, n'hésitez pas à me contacter. Je suis toujours heureux de discuter de notre belle région et d'améliorer ce site pour qu'il soit encore plus utile pour les visiteurs.</p>
            </div>
        </div>

        <div class="remerciment">
            <h2>Remerciements Spéciaux</h2>
            <p>Je souhaite exprimer ma profonde gratitude à mes amis <a href="https://www.instagram.com/salah_meradi/">MERADI Salah</a> et <a href="https://www.facebook.com/mouhamed.yedjed">Mohamed Ydjedd</a> pour leur précieuse contribution de certaines des magnifiques images présentées sur ce site. Leur soutien a été essentiel pour rendre Bejaia Tour Guide encore plus visuellement attrayant.</p>
            <div class="contactAmis">
                <div class="ami"><a href="https://www.instagram.com/salah_meradi/"><AnOutlinedInstagram class="ami-icn1"/>MERADI Salah</a></div>
                <div class="ami"><a href="https://www.facebook.com/mouhamed.yedjed"><BxFacebookCircle class="ami-icn2"/> Mohamed Ydjedd</a></div>
                
            </div>
        </div>

        <div class="RDA">
            <h2>Respect des Droits d'Auteur</h2>
            <p>Toutes les images utilisées sur ce site ont été obtenues légalement à partir de sources ouvertes, soit sous licence Creative Commons, soit dans le domaine public. Conformément aux règles de droit d'auteur, ces images sont utilisées sans violation des droits des créateurs. Pour plus d'informations sur les règles de droit d'auteur et les conditions d'utilisation des œuvres, vous pouvez consulter les articles pertinents sur Creative Commons ou sur le site de l'OMPI <a href="https://www.wipo.int/portal/en/index.html">(wipo.int)</a>.</p>
        </div>
    </div>
</template>

<script setup>
import { AnOutlinedInstagram } from '@kalimahapps/vue-icons';
import { BxFacebookCircle } from '@kalimahapps/vue-icons';
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Signika:wght@300..700&display=swap');
*{
    font-family: Signika ,'Poppins', sans-serif;;
}

.New{
    background-color: rgb(197, 33, 33);
    padding: 2px;
    border-radius: 6px;
    cursor: pointer;
    text-decoration: underline;
}

.contactAmis{
    margin-top: 1rem;
    width: max-content;

}

.ami > a{
    display: flex;
    align-items: center;
    margin-top: 5px;
    color: aliceblue;
    text-decoration: none;
}
.ami > a >.ami-icn2{
    margin-right: 1rem;
    width: 25px;
    height: 25px;

    background: #1a56fb;
    border-radius: 13%;
    color: #ffffff;
}

.ami > a >.ami-icn1{
    margin-right: 1rem;
    width: 25px;
    height: 25px;
    border-radius: 30%;
    background: #833ab4;
    background: linear-gradient(
    to right,
    #833ab4,#fd1d1d,#fcb045
  );
}
.remerciment{
    width: 90%;
    margin: 1rem auto;
    border: 2px solid rgb(18, 184, 18);
    padding: 2rem;
    border-radius: 2rem;
}

.remerciment h2 {
    color: var(--secondaryColor);
    font-size: 2rem;
}

.remerciment p {
    color: var(--mainTextcolor);
    margin-top: 1rem;
    line-height: 1.8rem;
}
.remerciment p a{
    color: rgb(77, 189, 12);
    font-weight: 600;
}
.RDA{
    width: 90%;
    margin: 1rem auto;
    border: 2px solid rgb(255, 230, 0);
    padding: 2rem;
    border-radius: 2rem;
}

.RDA h2 {
    color: var(--secondaryColor);
    font-size: 2rem;
}

.RDA p {
    color: var(--mainTextcolor);
    margin-top: 1rem;
    line-height: 1.8rem;
}
.RDA p a{
    color: lightcoral;
    font-weight: 600;
}

.me{
        display: flex;
        margin-top: 3rem;
        padding-inline: 2rem;
        position: relative;
        
    }

    .imageHolder{
        width: 600px;
        height: 300px;
        background: rgb(150, 229, 255);
        border-radius:50px ;
        text-align: center;
    }
    .imageHolder img{
        width: 70%;
    }
    .Text{
        /* border: 1px solid lime; */
        width: fit-content;
        padding: 1rem 2rem;
    }
    .Text h1{
        color: var(--secondaryColor);
        font-size: 3rem;
    }

    .Text p{
        font-size: 1.1rem;
        color: var(--mainTextcolor);
        margin-top: 3rem;
        line-height: 1.6rem;
        /* width: 70%; */
    }

    .Aboutweb{
        display: grid;
        grid-template-columns: repeat(4 ,1fr);
        margin-top: 3rem;
        margin-bottom: 3rem;
    }

    .Aboutweb> div {
        border: 2px solid var(--secondaryColor);
        margin-inline: 10px;
        padding: 1rem;
        border-radius: 2rem;
    }

    .Aboutweb> div h2 {
        font-size: 1.9rem;
        color: var(--secondaryColor);
    }

    .Aboutweb>div p {
        color: var(--mainTextcolor);
        margin-top: 1rem;
    }

    @media (width <1024px) {

        .me{
            padding-inline: 0;
        }
        .imageHolder{
            margin-right: 1rem
        
        }
        .Aboutweb{
 
        grid-template-columns: repeat(2,1fr);

    }

    .Aboutweb> div {
        margin-top: 1rem;
    }
    }


    @media (width < 768px) {
        .Aboutweb{
             grid-template-columns: repeat(1,1fr);
        }
        .me{
        display: block;
        margin-top: 1rem;
        }
        .imageHolder{
        width: 90%;
        height: 300px;
        margin: 0 auto;
        background: rgb(150, 229, 255);
        border-radius:50px ;
        text-align: center;
    }
    .imageHolder img{
        width: 60%;    
    }
    .Text p{
        margin-top: 1rem;
        /* width: 70%; */
    }
    .Text h1{
        font-size: 2.5rem;
        /* width: 70%; */
    }
    }
</style>
