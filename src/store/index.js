import { createStore } from 'vuex'
import { apiUrl } from '@/config'
import axios from 'axios'
export default createStore({
  state: {
    categories: []
  },
  getters: {
    categories(state) {
      return state.categories
    },
    categoriesAmount(state) {
      return state.categories.length
    }
  },
  mutations: {
    UPDATE_CATEGORIES(state, data) {
      state.categories = data
    }
  },
  actions: {
    async fetchCategories({ commit }) {
      const res = await axios.get(`${apiUrl}/categories`)
      commit('UPDATE_CATEGORIES', res.data)
    }
  },
  modules: {}
})
