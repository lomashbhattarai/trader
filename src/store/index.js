import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    watchlist:[]
  },
  mutations: {
    addToWatchlist(state,payload) {
      state.watchlist.push(payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
