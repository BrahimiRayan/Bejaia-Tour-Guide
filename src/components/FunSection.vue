<template lang="">
 <section class="parallax" >
    <div class="parallax-inner">
      <h2>Anecdote amusante sur <em>Béjaïa</em></h2>
      <p>Saviez-vous que le mot bougie 🕯️ apparaît en français au tout début du XIVe siècle (vers 1300). Il dérive du nom de la ville de <span>Béjaïa</span> , qui était un grand fournisseur de cire pour l'Europe à cette époque . Le mot a ensuite donné des équivalents dans d'autres langues, comme l'espagnol bujía et l'italien bugía .</p>
    </div>
  </section>
</template>

<style scoped>
.parallax {
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background:
    linear-gradient(180deg, rgba(18, 23, 28, .7), rgba(18, 23, 28, .7)),
    url('https://www.lejourdalgerie.com/wp-content/uploads/2025/03/bejaia.jpg') center/cover fixed;
}
span{
  color: var(--deepBlue);
  text-decoration: wavy;
  font-style: bold;
}
.parallax-inner {
  max-width: 640px;
  padding: 0 20px;
}

.parallax-inner h2 {
  font-size: 2rem;
  letter-spacing: -1px;
  margin-bottom: 20px;
  color: white;
}

.parallax-inner h2 em {
  color: var(--deepBlue);
  font-style: italic;
  font-weight: 400
}

.parallax-inner p {
  color: white;
  font-size: 16px;
  line-height: 1.8
}
</style>