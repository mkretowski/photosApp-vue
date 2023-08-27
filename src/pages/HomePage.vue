<template>
  <PageTitle>Photos</PageTitle>
  <PhotosCatalog />
</template>

<script>
import PageTitle from '../components/layouts/PageTitle.vue'
import PhotosCatalog from '@/components/features/PhotosCatalog.vue'
export default {
  name: 'HomePage',
  components: {
    PageTitle,
    PhotosCatalog
  }
}
</script>
