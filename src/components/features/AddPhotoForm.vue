<template>
  <Form v-slot="{ errors }" @submit="handleSubmit">
    <div class="flex flex-row">
      <div class="flex flex-column col-6 m-2">
        <!-- title -->
        <Field name="title" v-slot="{ field }" rules="required|min:10|max:60">
          <label>Title</label>
          <InputText v-bind="field" type="text" v-model="form.title" />
          <span class="error text-red-500">{{ errors.title }}</span>
        </Field>
        <!-- author -->
        <Field name="author" v-slot="{ field }" rules="required|min:3|max:30">
          <label>Author</label>
          <InputText v-bind="field" type="text" v-model="form.author" />
          <span class="error text-red-500">{{ errors.author }}</span>
        </Field>
        <!-- category -->
        <Field name="category" v-slot="{ field }" rules="required">
          <label>Category</label>
          <ListBox
            id="category"
            v-bind="field"
            v-model="form.category"
            :options="categoryOptions"
          />
          <span class="error text-red-500">{{ errors.category }}</span>
        </Field>

        <!-- description -->
        <Field name="description" v-slot="{ field }" rules="required|max:100">
          <label>Description</label>
          <Textarea
            id="description"
            rows="5"
            cols="30"
            v-bind="field"
            v-model="form.description"
          />
          <span class="error text-red-500">{{ errors.description }}</span>
        </Field>

        <div class="flex gap-2 m-2">
          <Button
            class="p-button-rounded p-button-success p-mt-3"
            type="submit"
            label="Add"
            icon="pi pi-plus"
          />
        </div>
      </div>
      <div class="flex flex-column col-6 text-center">
        <Field v-slot="{ field }" rules="required|ext:png,jpg" name="image">
          <div class="error-text text-red-500 pt-5 pb-0">
            {{ errors.image }}
          </div>
          <ImageUpload v-bind="field" @choose="handleImageChoose" />
        </Field>
      </div>
    </div>
  </Form>
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
import { Form, Field, defineRule } from 'vee-validate'
import { required, min, max, ext } from '@vee-validate/rules'
defineRule(
  'required',
  (value) => required(value) || 'This field is so so required...'
)
defineRule(
  'min',
  (value, params) => min(value, params) || `It should be longer than ${params}`
)
defineRule(
  'max',
  (value, params) => max(value, params) || `It should be shorter than ${params}`
)
defineRule(
  'ext',
  (value, params) =>
    ext(value, params) || `You should use one of these extensions: ${params}`
)

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
    Message,
    Form,
    Field
  },
  methods: {
    handleImageChoose(file) {
      this.form.file = file
    },
    async handleSubmit() {
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
