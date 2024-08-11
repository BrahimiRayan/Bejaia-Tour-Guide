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
    }
  ]
})

export default router
