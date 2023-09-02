import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
const routes = [
  {
    path: '/add-photo',
    name: 'AddPhotoPage',
    component: () => import('../pages/AddPhotoPage.vue')
  },
  {
    path: '',
    name: 'HomePage',
    component: HomePage,
    children: [
      {
        path: ':photoId',
        component: () => import('../pages/SinglePhotoPage.vue')
      }
    ]
  },

  {
    path: '/photos/:category',
    name: 'CategoryPhotosPage',
    component: () => import('../pages/CategoryPhotosPage.vue'),
    children: [
      {
        path: ':photoId',
        component: () => import('../pages/SinglePhotoPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
