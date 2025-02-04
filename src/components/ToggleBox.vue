<template>
  <div v-if="!isAuthed">
    <div v-if="isBoxVisible" class="user-infos-signed">
      <h2 class="email-txt">Spectateur </h2>
      <button class="sign-btn sign-in" @click="signIn">Connecter</button>
      <button class="sign-btn sign-up" @click="signIn">Inscrire</button>
    </div>
  </div>

  <!-- user is signed in -->
  <div v-else>
    <div v-if="isBoxVisible" class="user-infos-signed">
      <h2 class="email-txt-s">{{ email }}</h2>
      <RouterLink class="profile-link" to="/profile">
        <button class="sign-btn profile">Mon Profile</button>
      </RouterLink>
      <button class="sign-btn sign-out" @click="logOut">Déconnecter</button>
    </div>
  </div>
</template>

<script setup>
import useAuth from "@/composables/LogicAuth";
import { ref, onMounted, onUnmounted, watchEffect } from "vue";
// import { defineEmits } from "vue";

// DISTRUCTURING
const { logOut , signIn ,isAuthed , name , img} = useAuth() ;

// Front-end props
const props = defineProps({
  isBoxVisible: Boolean,
  accountRef: Object,
});

// Formatting email
const email = ref("");
const formatString = (s) => {
  if(s){
  if (!typeof(s) === String) {
    s.toString();
  }

  if (s.length > 20) {
    const formatedS = s.slice(0, 19).concat("..");
    return formatedS;
  } else {
    return s;
  }
}else {
  return "No Name"
}};
// FOLLOW THE NAME OF THE USER
watchEffect(() => {
  if (name.value) {
    email.value = formatString(name.value);
  } else {
    email.value = 'No user'
  }
});

// Event emitter
const emit = defineEmits(["closeBox"]);

// Close when clicking outside
const handleClickOutside = (event) => {
  if (props.accountRef && !props.accountRef.contains(event.target)) {
    emit("closeBox"); 
  }
};
// MOUNT AND UNMOUNT THE EVENT
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});


</script>



<style scoped>
.sign-out , .profile , .sign-in , .sign-up{
    background-color: var(--secondaryColor);
  
    background-image: url('@/assets/pics/sign-out.svg');
    border : none ; 
    outline : none ;
    border-radius: .4rem;
    background-position: 3% ;
    background-size: 1.4rem;
    color: white;
    font-size: .9rem;
    font-weight: 500;
    background-repeat: no-repeat;
    cursor: pointer;
}
.email-txt-s{
    font-size: 1rem ;
    font-weight: 700; 
    text-align: center;
    margin-top: 1rem;
    color: var(--secondaryColor);
}

.profile{
    background-color: rgb(255, 255, 255);
    color: rgb(36, 35, 35);
    background-image: url('@/assets/pics/my-profile.svg');
    background-size: 1.4rem;
    background-position-x: 6%;
    background-position-y: 40% ;

}

.sign-in{
    background-color: aliceblue;
    color: black;
    background-image: url('@/assets/pics/sign-in.svg');
    background-size: 1.5rem;
}
.sign-up{
    background-color: rgb(210, 143, 8);
    background-image: url('@/assets/pics/sign-up.svg');
    background-size: 1.5rem;
}
.profile-link{
    text-decoration: none;
}
.email-txt{
    font-size: 1.1rem ;
    font-weight: 600;
    color: rgb(231, 155, 4);
    text-align: center;
    margin-top: 1rem;
}
.sign-btn {

    display: block;
    height: 3rem;
    width: 80%;
    margin:  1rem auto ;;
}
.user-infos-signed{
   
    width: 200px;
    height: 200px;
    border: 2px solid var(--secondaryColor);
    border-radius: 1rem;
    background-color: rgba(255, 255, 255, 0.678);
    position: absolute;
    backdrop-filter: blur(5px);
    z-index: 1000;
    right: 0%;
    top: 110%;  
}
</style>