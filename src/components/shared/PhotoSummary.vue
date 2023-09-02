<template>
  <div class="col-12 md:col-4 lg:col-2">
    <Card class="p-shadow-4 h-full">
      <template #content>
        <div class="flex flex-column h-full">
          <div
            @click="$emit('vote')"
            class="image-container"
            style="height: 400px"
          >
            <a class="layer"
              ><div class="loader" v-show="voteRequest.pending">
                <progress-spinner />
              </div>
              <i class="pi pi-star"></i
            ></a>
            <div
              class="votes text-white text-xl m-1 p-1 flex flex-row align-items-center"
            >
              <p class="mx-1">{{ votes }}</p>
              <Button
                size="large"
                class="text-white"
                icon="pi pi-star"
                link
                rounded
              />
            </div>
            <image-item :src="src" class="h-full" style="object-fit: cover" />
          </div>

          <div class="flex flex-column my-auto cursor-pointer">
            <a @click="redirect">
              <SmallTitle>{{ title }}</SmallTitle>
              <p>by {{ author }}</p></a
            >
          </div>

          <div class="flex mt-auto align-items-start">
            <Button
              class="text-sm p-2 m-3"
              icon="pi pi-bookmark"
              :label="category"
              rounded
              outlined
            />
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
<script>
import ImageItem from '../layouts/ImageItem.vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import { mapState } from 'vuex'
import SmallTitle from '../layouts/SmallTitle.vue'
export default {
  name: 'PhotoSummary',
  props: {
    id: {
      type: String
    },
    author: {
      type: String
    },
    email: {
      type: String
    },
    src: {
      type: String
    },
    title: {
      type: String
    },
    votes: {
      type: Number
    },
    category: {
      type: String
    }
  },
  components: {
    ImageItem,
    Card,
    Button,
    ProgressSpinner,
    SmallTitle
  },
  computed: {
    ...mapState('Photos', ['voteRequest'])
  },
  methods: {
    redirect() {
      if (this.$route.fullPath === '/') this.$router.push(`${this.id}`)
      else this.$router.push(`${this.$route.fullPath}/${this.id}`)
    }
  }
}
</script>
<style>
.p-card .p-card-body {
  padding: 0;
  height: 100%;
}

.p-card .p-card-content {
  padding: 0;
  height: 100%;
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
  cursor: pointer;
}
.image-container .layer {
  position: absolute;
  opacity: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
}
.image-container .layer .loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.image-container .layer i {
  font-size: 150px;
}
.image-container:hover::after {
  opacity: 1;
}
.image-container:hover .layer {
  opacity: 1;
}
.info {
  cursor: pointer;
}
</style>
