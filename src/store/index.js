import Vue from 'vue'
import Vuex from 'vuex'
const axios = require('axios');


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    watchlist:[],
    tokens:'',
    user:'',
    userDetails:'',
    companies:[]
  },
  mutations: {
    addToWatchlist(state,payload) {
      state.watchlist.push(payload)
    },
    addToken(state,payload) {
      state.tokens= payload
    },
    setUser(state,payload) {
      state.user= payload
    },
    setUserDetails(state,payload) {
      state.userDetails= payload
    },
    setCompanies(state,payload) {
      state.companies= payload
    },
  },
  actions: {
    getCompanyList({commit}) {
      axios.get(' https://g1y4zxy8vf.execute-api.us-east-2.amazonaws.com/dev/getCompanyFromDb')
                .then(({data})=> {
                  commit('setCompanies',data.company)
                })
    },
    getUserDetails({commit},{email}){
      axios.get(' https://r7ytk8m6dj.execute-api.us-east-2.amazonaws.com/dev/api/portfolio/get',{
        params: {
          email: email
        }
      }).then(({data})=> {
        commit('setUserDetails',data.user)
      })

    }
  },
  modules: {
  }
})
