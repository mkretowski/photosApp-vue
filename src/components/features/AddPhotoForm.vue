<template>
  <form>
    <div class="flex flex-row">
      <div class="flex flex-column col-6 m-2">
        <!-- title -->
        <div class="flex flex-column gap-2 m-2">
          <label for="title">Title</label>
          <InputText id="title" type="text" v-model="form.title" />
        </div>

        <!-- author -->
        <div class="flex flex-column gap-2 m-2">
          <label for="author">Author</label>
          <InputText id="author" type="text" v-model="form.author" />
        </div>

        <!-- category -->
        <div class="flex flex-column gap-2 m-2">
          <label for="category">Category</label>
          <ListBox
            id="category"
            v-model="form.category"
            :options="categoryOptions"
          />
        </div>

        <!-- description -->
        <div class="flex flex-column gap-2 m-2">
          <label for="description">Description</label>
          <Textarea
            id="description"
            rows="5"
            cols="30"
            v-model="form.description"
          />
        </div>
        <div class="flex gap-2 m-2">
          <Button
            class="p-button-rounded p-button-success p-mt-3"
            type="submit"
            label="Add"
            icon="pi pi-plus"
            @click="handleSubmit"
          />
        </div>
      </div>
      <div class="flex col-6 align-items-center">
        <ImageUpload class="w-full" @choose="handleImageChoose" />
      </div>
    </div>
  </form>
  <Message v-if="isSuccess" severity="success"
    >Success! Your photo has been submitted</Message
  >
  <Message v-if="isError" severity="error"
    >Oops... something went wrong...</Message
  >
</template>

<script>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import ListBox from 'primevue/listbox'
import ImageUpload from '../shared/ImageUpload.vue'
import Message from 'primevue/message'
import { mapGetters } from 'vuex'
import axios from 'axios'
import { apiUrl } from '@/config'
export default {
  name: 'AddPhotoForm',
  data: () => ({
    form: {
      title: '',
      author: '',
      description: '',
      category: '',
      file: null
    },
    isSuccess: false,
    isError: false
  }),
  components: {
    Button,
    InputText,
    Textarea,
    ListBox,
    ImageUpload,
    Message
  },
  methods: {
    handleImageChoose(file) {
      this.form.file = file
    },
    async handleSubmit(e) {
      e.preventDefault()
      this.isSuccess = false
      this.isError = false

      const formData = new FormData()
      formData.append('title', this.form.title)
      formData.append('author', this.form.author)
      formData.append('description', this.form.description)
      formData.append('category', this.form.category)

      if (this.form.file) {
        formData.append('file', this.form.file)
      }

      try {
        await axios.post(`${apiUrl}/photos`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.isSuccess = true
        this.clearForm()
      } catch (error) {
        this.isError = true
        console.log(error)
      }
    },
    clearForm() {
      this.form.title = ''
      this.form.author = ''
      this.form.description = ''
      this.form.category = ''
      this.form.file = null
    }
  },
  computed: {
    ...mapGetters({ categories: 'Categories/categories' }),
    categoryOptions() {
      return this.categories.map((category) => category.name)
    }
  }
}
</script>
