import { createRouter, createWebHistory } from 'vue-router'
import CategoryPhotosPage from '../pages/CategoryPhotosPage.vue'
import AddPhotoPage from '../pages/AddPhotoPage.vue'

const routes = [
  { path: '/', component: () => import('../pages/HomePage.vue') },
  {
    path: '/photos/:category',
    name: 'CategoryPhotosPage',
    component: CategoryPhotosPage
  },
  {
    path: '/add-photo',
    name: 'AddPhotoPage',
    component: AddPhotoPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
