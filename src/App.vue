<template>
  <div id="app">
    <div class="container p-p-4">
      <app-header />

      <main>
        <router-view v-slot="{ Component }">
          <SlideFadeAnimation>
            <div :key="$route.fullPath">
              <component :is="Component" />
            </div>
          </SlideFadeAnimation>
        </router-view>
      </main>

      <app-footer />
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/layouts/theHeader'
import AppFooter from '@/components/layouts/theFooter'
import { mapActions } from 'vuex'
import SlideFadeAnimation from './components/layouts/SlideFadeAnimation.vue'
export default {
  name: 'App',
  components: {
    AppFooter,
    AppHeader,
    SlideFadeAnimation
  },
  methods: {
    ...mapActions('Categories', ['fetchCategories']),
    getComponentName(Component) {
      console.log(Component.type.name)
      return Component.type.name
    }
  },
  created() {
    this.fetchCategories()
  }
}
</script>

<style lang="scss">
.container {
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
  padding: 2rem;
}
</style>
