import { isAuthed } from '@/composables/LogicAuth';
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'places',
      component: ()=> import ('@/views/Places.vue')
    },
    {
      path: '/Histoire',
      name: 'histoire',
      component: () => import('../views/Histoire.vue')
    },
    {
      path: '/AboutUs',
      name: 'about',
      component: () => import('../views/AboutUs.vue')
    },
    {
      path:'/places/:id',
      name : 'place',
      component : () => import('../views/Place.vue') 
    },{
      path : '/profile',
      name : 'profile' ,
      component : ()=> import('../views/UserProfile.vue'),
      beforeEnter :(to , from , next)=>{
        if(isAuthed.value){
          next();
        }else{
          next('/');
        }
      }
    },
    {
      path : '/:pathMatch(.*)*',
      redirect : '/'
    },
  ],
  scrollBehavior(to , from , savedPosition){
    if(savedPosition){
      return savedPosition ;
    }else{
      return {top : 0}
    }
  }
})

export default router
