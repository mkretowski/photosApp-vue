<template>
  <div>
    <PageTitle>{{ category }}</PageTitle>
    <PhotosCatalog :category="category" />
    <router-view />
  </div>
</template>

<script>
import PageTitle from '../components/layouts/PageTitle.vue'
import PhotosCatalog from '@/components/features/PhotosCatalog.vue'
export default {
  name: 'CategoryPhotosPage',
  components: {
    PageTitle,
    PhotosCatalog
  },
  computed: {
    category() {
      return this.$route.params.category
    }
  }
}
</script>
