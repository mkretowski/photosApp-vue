<template>
  <div ref="catalog" class="catalog">
    <!-- photos list -->
    <photos-list
      v-show="!photosRequest.pending"
      :photos="photos"
      @vote="vote"
    />
    <div class="loader" v-show="photosRequest.pending">
      <progress-spinner />
    </div>
    <div v-show="photosRequest.error">
      <Message severity="warn">Error! Try again…</Message>
    </div>
  </div>
</template>
<script>
import PhotosList from '../shared/PhotosList.vue'
import ProgressSpinner from 'primevue/progressspinner'
import Message from 'primevue/message'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'PhotosCatalog',
  props: {
    category: {
      type: String
    }
  },
  components: {
    PhotosList,
    ProgressSpinner,
    Message
  },
  data: () => ({
    currentPage: 1
  }),
  methods: {
    ...mapActions(['fetchPhotos', 'fetchCategoryPhotos', 'addVote']),
    loadPhotos() {
      this.currentPage++
      if (!this.category) {
        this.fetchPhotos(this.currentPage)
      } else {
        this.fetchCategoryPhotos({
          category: this.category,
          page: this.currentPage
        })
      }
    },
    prepareScroll() {
      this.$refs.catalog.addEventListener('scroll', () => {
        this.handleScroll()
      })
    },
    handleScroll() {
      const elem = this.$refs.catalog
      const bottomOfWindow =
        Math.ceil(elem.scrollTop) >= elem.scrollHeight - elem.offsetHeight

      if (bottomOfWindow) this.loadPhotos()
    },
    vote(index) {
      this.addVote(index)
    }
  },
  created() {
    if (!this.category) this.fetchPhotos(1)
    else this.fetchCategoryPhotos({ category: this.category, page: 1 })
  },
  mounted() {
    this.prepareScroll()
  },
  computed: {
    ...mapGetters({ photos: 'photos' }),
    ...mapState(['photosRequest'])
  }
}
</script>
<style lang="scss">
.catalog {
  max-height: 1000px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 15px;
  margin-bottom: 15px;
}
</style>
