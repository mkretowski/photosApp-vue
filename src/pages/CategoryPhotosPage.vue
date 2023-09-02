<template>
  <div>
    <PageTitle>{{ category }}</PageTitle>
    <SlideFadeAnimation name="custom-transition" mode="out-in">
      <PhotosCatalog :category="category" :key="category"
    /></SlideFadeAnimation>
    <router-view />
  </div>
</template>

<script>
import PageTitle from '../components/layouts/PageTitle.vue'
import PhotosCatalog from '@/components/features/PhotosCatalog.vue'
import SlideFadeAnimation from '@/components/layouts/SlideFadeAnimation.vue'
export default {
  name: 'CategoryPhotosPage',
  components: {
    PageTitle,
    PhotosCatalog,
    SlideFadeAnimation
  },
  computed: {
    category() {
      return this.$route.params.category
    }
  }
}
</script>
