<template>
  <div id="app">
    <div class="container p-p-4">
      <app-header />

      <main>
        <router-view v-slot="{ Component }">
          <SlideFadeAnimation name="custom-transition" mode="out-in"
            ><div :key="getComponentName(Component)">
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
      if (Component) {
        return Component.type.name
      } else return false
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
.nicee-enter-active {
  position: absolute;
  animation: opacityFromZero 0.4s ease-out;
}
.nicee-leave-active {
  animation: opacityFromZero 0.4s ease-out reverse;
}

@keyframes opacityFromZero {
  from {
    left: -100%;
  }
  to {
    left: 0;
  }
}
</style>
