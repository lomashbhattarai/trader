import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    watchlist:[],
    tokens:'',
    user:''
  },
  mutations: {
    addToWatchlist(state,payload) {
      state.watchlist.push(payload)
    },
    addToken(state,payload) {
      state.tokens= payload
    },
    setUserDetails(state,payload) {
      state.user= payload
    },
  },
  actions: {
  },
  modules: {
  }
})
