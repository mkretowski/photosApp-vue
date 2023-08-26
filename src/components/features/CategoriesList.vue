<template>
  <ul class="flex flex-row align-items-center justify-content-start gap-3">
    <Button
      :key="index"
      v-for="(category, index) in categories"
      :label="category.name"
      rounded
      outlined
    />
  </ul>
</template>

<script>
import Button from 'primevue/button'
import { mapGetters } from 'vuex'
export default {
  name: 'CategoriesList',
  components: { Button },
  computed: mapGetters({ categories: 'categories' })
}
</script>
