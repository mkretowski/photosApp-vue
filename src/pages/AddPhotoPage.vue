<template>
  <PageTitle>Add Photo</PageTitle>
  <AddPhotoForm />
</template>

<script>
import PageTitle from '../components/layouts/PageTitle.vue'
import AddPhotoForm from '@/components/features/AddPhotoForm.vue'

export default {
  name: 'AddPhotoPage',
  components: {
    PageTitle,
    AddPhotoForm
  }
}
</script>
