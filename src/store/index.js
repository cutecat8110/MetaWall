import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoading: false,
    user: {},
    headers: {}
  },
  getters: {},
  mutations: {
    Load(state, status) {
      state.isLoading = status
    },
    headers(state, headers) {
      state.headers = headers
    },
    user(state, user) {
      state.user = user
    }
  },
  actions: {},
  modules: {}
})

