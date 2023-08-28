<template>
  <Dialog
    :closable="false"
    :visible="true"
    :modal="true"
    :style="{ minWidth: '25vw' }"
  >
    <div v-if="singlePhoto" class="flex flex-column align-items-center">
      <div class="image-container" style="height: 400px">
        <div
          class="votes text-white text-xl m-1 p-1 flex flex-row align-items-center"
        >
          <p class="mx-1">{{ singlePhoto.votes }}</p>
          <Button
            size="large"
            class="text-white"
            icon="pi pi-star"
            link
            rounded
          />
        </div>
        <image-item
          :src="singlePhoto.src"
          style="object-fit: contain"
          class="h-full"
        />
      </div>

      <div class="description flex flex-column my-3 w-full">
        <div class="flex align-items-center justify-content-between">
          <SmallTitle>{{ singlePhoto.title }}</SmallTitle>
          <Button
            class="text-sm"
            icon="pi pi-bookmark"
            :label="singlePhoto.category"
            rounded
            outlined
          />
        </div>
        <p>by {{ singlePhoto.author }}</p>
        <p>{{ singlePhoto.description }}</p>
      </div>
      <Button
        class="p-button-rounded"
        label="Close"
        icon="pi pi-times"
        @click="$router.go(-1)"
        autofocus
      />
    </div>

    <div v-else class="flex justify-content-center align-items-center h-full">
      <ProgressSpinner />
    </div>
  </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog'
import ProgressSpinner from 'primevue/progressspinner'
import ImageItem from '../layouts/ImageItem.vue'
import Button from 'primevue/button'
import SmallTitle from '../layouts/SmallTitle.vue'
import { mapState, mapActions, mapMutations } from 'vuex'

// fix version inconsistence
Dialog.methods.removeStylesFromMask = () => {}

export default {
  name: 'SinglePhoto',
  computed: {
    ...mapState('Photos', ['singlePhoto', 'voteRequest']),
    photoId() {
      return this.$route.params.photoId
    }
  },
  components: { Dialog, ProgressSpinner, ImageItem, Button, SmallTitle },
  methods: {
    ...mapActions('Photos', ['fetchSinglePhoto']),
    ...mapMutations({ resetPhoto: 'Photos/SET_SINGLE_PHOTO' })
  },
  created() {
    this.resetPhoto(null)
    this.fetchSinglePhoto(this.photoId)
  }
}
</script>

<style lang="scss" scoped>
.p-dialog-mask {
  pointer-events: auto;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.4);
}

.image-container {
  position: relative;
}

.image-container .votes {
  position: absolute;
  right: 0;
}

.image-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(155, 89, 182, 0.3);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.description > :nth-child(3)::before {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 18px 0;
}
</style>
