<template>
  <PageTitle>Photos</PageTitle>
  <PhotosCatalog />
  <router-view />
</template>

<script>
import PhotosCatalog from '@/components/features/PhotosCatalog.vue'
import PageTitle from '../components/layouts/PageTitle.vue'
export default {
  name: 'HomePage',
  components: {
    PageTitle,
    PhotosCatalog
  }
}
</script>
