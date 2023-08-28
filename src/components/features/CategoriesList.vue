<template>
  <ul class="flex flex-row align-items-center justify-content-start gap-3">
    <router-link
      :key="index"
      v-for="(category, index) in categories"
      :to="`/photos/${category.name}`"
    >
      <Button :label="category.name" rounded outlined />
    </router-link>
  </ul>
</template>

<script>
import Button from 'primevue/button'
import { mapGetters } from 'vuex'

export default {
  name: 'CategoriesList',
  components: { Button },
  computed: mapGetters({ categories: 'Categories/categories' })
}
</script>
