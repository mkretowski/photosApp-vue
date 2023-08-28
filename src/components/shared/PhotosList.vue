<template>
  <ul class="grid">
    <PhotoSummary
      :key="index"
      v-for="(photo, index) in photos"
      :id="photo._id"
      :author="photo.author"
      :email="photo.email"
      :title="photo.title"
      :src="photo.src"
      :votes="photo.votes"
      :category="photo.category"
      @vote="$emit('vote', photo._id)"
    />
  </ul>
</template>
<script>
import PhotoSummary from './PhotoSummary.vue'
export default {
  name: 'PhotosList',
  props: {
    photos: {
      type: Array
    }
  },
  components: {
    PhotoSummary
  }
}
</script>
