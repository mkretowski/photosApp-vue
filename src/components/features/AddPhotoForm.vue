<template>
  <Form v-slot="{ errors }" ref="anyname" @submit="handleSubmit">
    <div class="flex flex-row">
      <div class="flex flex-column col-6 m-2">
        <!-- title -->
        <Field
          name="title"
          type="text"
          v-model="form.title"
          v-slot="{ field }"
          rules="required|min:10|max:60"
        >
          <label>Title</label>
          <InputText v-bind="field" />
          <span class="error text-red-500">{{ errors.title }}</span>
        </Field>
        <!-- author -->
        <Field
          name="author"
          type="text"
          v-model="form.author"
          v-slot="{ field }"
          rules="required|min:3|max:30"
        >
          <label>Author</label>
          <InputText v-bind="field" />
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
        <Field
          name="description"
          v-model="form.description"
          v-slot="{ field }"
          rules="required|max:100"
        >
          <label>Description</label>
          <Textarea id="description" rows="5" cols="30" v-bind="field" />
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
          <ImageUpload
            v-bind="field"
            @choose="handleImageChoose"
            ref="imageUploadRef"
          />
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
import { ref, computed, reactive } from 'vue'
import axios from 'axios'
import { apiUrl } from '@/config'
import { Form, Field, defineRule } from 'vee-validate'
import { required, min, max, ext } from '@vee-validate/rules'
import { useStore } from 'vuex'
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

  setup() {
    const store = useStore()
    const initialState = {
      title: '',
      author: '',
      description: '',
      category: '',
      file: null
    }
    const form = reactive({
      ...initialState
    })
    const isSuccess = ref(false)
    const isError = ref(false)
    const imageUploadRef = ref(null)
    const handleImageChoose = (file) => {
      form.file = file
    }

    // eslint-disable-next-line space-before-function-paren
    const handleSubmit = async () => {
      isSuccess.value = false
      isError.value = false
      const formData = new FormData()
      formData.append('title', form.title)
      formData.append('author', form.author)
      formData.append('description', form.description)
      formData.append('category', form.category)

      if (form.file) {
        formData.append('file', form.file)
      }

      try {
        await axios.post(`${apiUrl}/photos`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        isSuccess.value = true
        clearForm()
      } catch (error) {
        isError.value = true
        console.error(error)
      }
    }

    const clearForm = () => {
      Object.assign(form, initialState)
      imageUploadRef.value.clearFileInput()
    }

    const categories = computed(() => store.state.Categories.categories)
    const categoryOptions = computed(() => {
      return categories.value.map((category) => category.name)
    })

    return {
      form,
      isSuccess,
      isError,
      handleImageChoose,
      handleSubmit,
      categories,
      categoryOptions,
      clearForm,
      imageUploadRef
    }
  }
}
</script>
