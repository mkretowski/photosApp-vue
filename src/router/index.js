import { createRouter, createWebHistory } from 'vue-router'
import CategoryPhotosPage from '../pages/CategoryPhotosPage.vue'

const routes = [
  { path: '/', component: () => import('../pages/HomePage.vue') },
  {
    path: '/photos/:category',
    name: 'CategoryPhotosPage',
    component: CategoryPhotosPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
