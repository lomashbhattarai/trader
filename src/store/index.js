import Vue from 'vue'
import Vuex from 'vuex'
const axios = require('axios');

const calcPercentDiff=(item) =>  {
  let num = item.difference*100/item.prevClosingPrice 
  return +num.toFixed(2)
}
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    watchlist:[],
    tokens:'',
    user:'',
    userDetails: '',
    companies:[],
    todaysPrice:[]
  },
  mutations: {
    addToWatchlist(state,payload) {
      state.watchlist=payload
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
    setTodaysPrice(state,payload){
      state.todaysPrice = payload
    }
    
  },
  actions: {
    getCompanyList({commit}) {
      axios.get('https://2e39214vbk.execute-api.us-east-2.amazonaws.com/dev/getCompanyFromDb')
                .then(({data})=> {
                  commit('setCompanies',data.company)
                })
    },
    getUserDetails({commit,state},{email}){
      //need to change the url
      axios.get(' https://r7ytk8m6dj.execute-api.us-east-2.amazonaws.com/dev/api/portfolio/get',{
        params: {
          email: email
        }
      }).then(({data})=> {
        data.user.portfolio.map((stock,index)=>{
          let todayStock = state.todaysPrice.find((stockToday)=>{
            return stockToday.symbol == stock.symbol
          })
          if(todayStock){
            data.user.portfolio[index]['closingPrice'] = todayStock.closingPrice
          }
        })
        commit('setUserDetails',data.user)
        commit('addToWatchlist',data.user.watchlist)
      })
    },
    getTodaysPrice({commit}){
      return axios.get('https://2e39214vbk.execute-api.us-east-2.amazonaws.com/dev/getTodaysPrice')
        .then(({data})=>{
          data.prices.map((item,index) => {
            data.prices[index].percentDiff = calcPercentDiff(item)
          })
          commit("setTodaysPrice",data.prices)
        })
        .catch((err) => {
          console.log(err)
        })

    }
  },
  modules: {
  }
})
