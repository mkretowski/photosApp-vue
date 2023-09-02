<template>
  <div ref="catalog" class="catalog">
    <!-- photos list -->
    <photos-list
      v-if="!photosStore.photosRequest.pending || currentPage >= 2"
      :photos="photosStore.photos"
      @vote="vote"
    />
    <div class="loader" v-show="photosStore.photosRequest.pending">
      <progress-spinner />
    </div>
    <div v-show="photosStore.photosRequest.error">
      <Message severity="warn">Error! Try again…</Message>
    </div>
  </div>
</template>

<script>
import PhotosList from '../shared/PhotosList.vue'
import ProgressSpinner from 'primevue/progressspinner'
import Message from 'primevue/message'
import { useStore } from 'vuex'
import { ref, onMounted, computed, reactive } from 'vue'

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

  setup(props) {
    const currentPage = ref(1)
    const store = useStore()
    const catalogRef = ref(document.querySelector('.catalog'))
    const photosStore = reactive({
      photos: computed(() => store.state.Photos.photos),
      photosRequest: computed(() => store.state.Photos.photosRequest),
      allPhotosLoaded: computed(() => store.state.Photos.allPhotosLoaded)
    })

    const fetchPhotos = (page) => store.dispatch('Photos/fetchPhotos', page)
    const fetchCategoryPhotos = () => {
      store.dispatch('Photos/fetchCategoryPhotos', {
        category: props.category,
        page: currentPage.value
      })
    }
    const addVote = (photoId) => store.dispatch('Photos/addVote', photoId)

    const loadPhotos = () => {
      if (!photosStore.allPhotosLoaded) {
        currentPage.value++
        if (!props.category) {
          fetchPhotos(currentPage.value)
        } else {
          fetchCategoryPhotos({
            category: props.category,
            page: currentPage.value
          })
        }
      }
    }
    const prepareScroll = () => {
      catalogRef.value.addEventListener('scroll', () => {
        handleScroll()
      })
    }
    const handleScroll = () => {
      const bottomOfWindow =
        Math.ceil(catalogRef.value.scrollTop) >=
        catalogRef.value.scrollHeight - catalogRef.value.offsetHeight

      if (bottomOfWindow && !photosStore.photosRequest.pending) {
        loadPhotos()
      }
    }
    const vote = (index) => {
      addVote(index)
    }
    onMounted(() => {
      catalogRef.value = document.querySelector('.catalog')
      if (!props.category) {
        fetchPhotos()
      } else {
        fetchCategoryPhotos()
      }
      prepareScroll()
    })

    return {
      currentPage,
      vote,
      photosStore
    }
  }
}
</script>
<style lang="scss">
.catalog {
  height: 800px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 15px;
  margin-bottom: 15px;
}
</style>
