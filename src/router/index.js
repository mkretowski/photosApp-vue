import { createRouter, createWebHistory } from 'vue-router'
import CategoryPhotosPage from '../pages/CategoryPhotosPage.vue'
import AddPhotoPage from '../pages/AddPhotoPage.vue'
import SinglePhotoPage from '../pages/SinglePhotoPage.vue'
import SinglePhoto from '../components/features/SinglePhoto.vue'
import HomePage from '../pages/HomePage.vue'
const routes = [
  {
    path: '/add-photo',
    name: 'AddPhotoPage',
    component: AddPhotoPage
  },
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    children: [
      {
        path: ':photoId',
        name: 'SinglePhoto',
        component: SinglePhoto
      }
    ]
  },

  {
    path: '/photos/:category',
    name: 'CategoryPhotosPage',
    component: CategoryPhotosPage,
    children: [
      {
        path: ':photoId',
        name: 'SinglePhotoPage',
        component: SinglePhotoPage
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
