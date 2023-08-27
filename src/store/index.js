import { createStore } from 'vuex'
import { apiUrl } from '@/config'
import axios from 'axios'
export default createStore({
  state: {
    categories: [],
    photos: [],
    photosRequest: {
      pending: false,
      error: false,
      success: false
    },
    voteRequest: {
      pending: false,
      error: false,
      success: false
    },
    allPhotosLoaded: false
  },
  getters: {
    categories(state) {
      return state.categories
    },
    categoriesAmount(state) {
      return state.categories.length
    },
    photos(state) {
      return state.photos
    }
  },
  mutations: {
    UPDATE_CATEGORIES(state, data) {
      state.categories = data
    },
    UPDATE_PHOTOS(state, data) {
      state.photos = data
    },
    ADD_PHOTOS(state, data) {
      state.photos = [...state.photos, ...data]
    },
    START_PHOTOS_REQUEST(state) {
      state.photosRequest = {
        pending: true,
        error: false,
        success: false
      }
    },
    END_PHOTOS_REQUEST(state) {
      state.photosRequest = {
        pending: false,
        error: false,
        success: true
      }
    },
    ERROR_PHOTOS_REQUEST(state) {
      state.photosRequest = {
        pending: false,
        error: true,
        success: false
      }
    },
    START_VOTE_REQUEST(state) {
      state.voteRequest = {
        pending: true,
        error: false,
        success: false
      }
    },
    END_VOTE_REQUEST(state) {
      state.voteRequest = {
        pending: false,
        error: false,
        success: true
      }
    },
    ERROR_VOTE_REQUEST(state) {
      state.voteRequest = {
        pending: false,
        error: true,
        success: false
      }
    },
    TOGGLE_ALL_PHOTOS_LOADED(state) {
      state.allPhotosLoaded = !state.allPhotosLoaded
    },
    ADD_VOTE(state, photoId) {
      const index = state.photos.findIndex((photo) => photo._id === photoId)
      if (index !== -1) {
        state.photos[index].votes += 1
      }
    }
  },
  actions: {
    async fetchCategories({ commit }) {
      const res = await axios.get(`${apiUrl}/categories`)
      commit('UPDATE_CATEGORIES', res.data)
    },
    async fetchPhotosFromAPI({ commit, state }, { url, page }) {
      try {
        // if it's first set of photos and allPhotosLoaded is true => make it default false
        if (state.allPhotosLoaded && page === 1) {
          commit('TOGGLE_ALL_PHOTOS_LOADED')
        }

        // it's not the first page and allPhotosLoaded is true? => stop function
        if (state.allPhotosLoaded) return false

        commit('START_PHOTOS_REQUEST')
        const res = await axios.get(url)
        await new Promise((resolve, reject) => {
          setTimeout(resolve, 2000)
        })
        commit('END_PHOTOS_REQUEST')

        // if the set is not full, toggle allPhotosLoaded
        if (res.data.length < 12) commit('TOGGLE_ALL_PHOTOS_LOADED')

        if (page > 1) commit('ADD_PHOTOS', res.data)
        else commit('UPDATE_PHOTOS', res.data)
      } catch (err) {
        commit('ERROR_PHOTOS_REQUEST')
      }
    },

    async fetchPhotos({ dispatch }, page) {
      dispatch('fetchPhotosFromAPI', { url: `${apiUrl}/photos/${page}`, page })
    },

    async fetchCategoryPhotos({ dispatch }, { category, page }) {
      dispatch('fetchPhotosFromAPI', {
        url: `${apiUrl}/photos/${category}/${page}`,
        page
      })
    },
    async addVote({ commit, state }, photoId) {
      try {
        commit('START_VOTE_REQUEST')
        const response = await axios.put(`${apiUrl}/photos/vote/${photoId}`)
        await new Promise((resolve, reject) => {
          setTimeout(resolve, 2000)
        })
        if (response.status === 200) {
          commit('ADD_VOTE', photoId)
          commit('END_VOTE_REQUEST')
        }
      } catch (error) {
        commit('ERROR_VOTE_REQUEST')
      }
    }
  },
  modules: {}
})
