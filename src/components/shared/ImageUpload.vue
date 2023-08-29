<template>
  <div class="input-field flex col justify-content-center">
    <div class="input-field__loader" v-if="!conditionals.imageLoaded">
      <progress-spinner />
    </div>

    <label class="image-upload col">
      <!-- file input -->
      <input type="file" name="file" id="file" @change="onFileSelected" />

      <!-- image preview -->
      <img
        v-if="image.path && conditionals.imageLoaded"
        class="image-upload__preview animated fadeIn"
        :src="image.path"
      />

      <!-- chose file button -->
      <a
        v-if="conditionals.imageLoaded"
        class="image-upload__button pi pi-camera"
      />
    </label>
  </div>
</template>

<script>
import ProgressSpinner from 'primevue/progressspinner'

export default {
  name: 'ImageUpload',
  data: () => ({
    image: {
      path: '',
      name: '',
      file: null
    },
    conditionals: {
      imageLoaded: true
    }
  }),
  methods: {
    isChosen() {
      return !!this.image.file
    },

    onFileSelected(event) {
      this.$emit('change', event)

      if (!event.target.files[0]) return false

      this.conditionals.imageLoaded = false
      const reader = new FileReader()

      // eslint-disable-next-line space-before-function-paren
      reader.onload = async (e) => {
        this.image.path = e.target.result
        this.image.file = event.target.files[0]
        this.image.name = this.image.file.name
        this.conditionals.imageLoaded = true
        this.$emit('choose', this.image.file)
      }

      reader.readAsDataURL(event.target.files[0])
    }
  },
  components: { ProgressSpinner }
}
</script>

<style lang="scss" scoped>
.input-field {
  position: relative;

  &__loader {
    position: top;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.image-upload {
  display: block;
  max-width: 100%;
  border: 2px dashed #ccc;
  border-radius: 0.5rem;
  overflow: hidden;
  opacity: 0.9;
  cursor: pointer;
  display: flex;
  position: relative;
  transition: 0.2s;
  height: 20rem;
  max-width: 20rem;
  margin: 1rem 0;

  &:hover {
    opacity: 1;
  }

  input[type='file'] {
    display: none;
  }

  &__preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
  }

  &__button {
    position: absolute;
    transform: translate(-50%, -50%);
    display: block;
    top: 50%;
    left: 50%;
    font-size: 5rem;
    color: #ccc;
  }

  &__loader {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }
}
</style>
