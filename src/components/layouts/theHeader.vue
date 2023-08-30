<template>
  <header class="header p-mt-2 p-mb-2">
    <div class="flex flex-row align-items-center justify-content-between">
      <a href="/" class="flex flex-row align-items-center gap-1">
        <SmallTitle>PhotosApp |</SmallTitle>
        <p>share your moments</p>
      </a>
      <router-link :to="'/add-photo'">
        <Button icon="pi pi-plus" label="Submit" rounded />
      </router-link>
    </div>
    <div>
      <CategoriesList></CategoriesList>
    </div>
  </header>
</template>

<script>
import Button from 'primevue/button'
import SmallTitle from './SmallTitle.vue'
import CategoriesList from '../features/CategoriesList.vue'
export default {
  name: 'AppHeader',
  components: {
    Button,
    SmallTitle,
    CategoriesList
  }
}
</script>
<style>
.header > :nth-child(2)::before {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 18px 0;
}
</style>
