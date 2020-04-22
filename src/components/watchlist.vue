<template>
  <v-container fluid>
    <v-row v-if="!loaders.todaysPrice">
      <v-col v-for="(company,index) in watchlistDetails"
      :key="index" cols="12" md="4">
      <v-card
      outlined
      class="mx-auto"
      max-width="344"
      shaped
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-row>
            <v-col cols="4">
          <v-list-item-title>{{ company.symbol }} 
            <span :class="company.difference >0 ? 'green--text':'red--text'" class="caption"> 
              <v-icon color="green" small v-if="company.difference >0">mdi-arrow-up</v-icon>
              <v-icon color="red" small v-else>mdi-arrow-down</v-icon>
              {{company.difference }}
              </span>
            </v-list-item-title>
            </v-col>
            <v-col cols="8">
          
       <v-btn small text @click="removeFromWatchlist(company)" outlined class="mr-2" color="pink">
              Remove
          </v-btn>
          <v-btn small ripple @click="goToSinglePage(company)" outlined text color="blue">
              See Chart
          </v-btn>
          
            </v-col>
          </v-row>
          <v-list-item-subtitle class="overline">{{ company.name }}</v-list-item-subtitle>
          <span>
          <label class="subtitle-2">closing Price:</label> {{company.closingPrice }},
          <label class="subtitle-2">max:</label> {{company.maxPrice }},
          <label class="subtitle-2">min:</label> {{company.minPrice }}
          </span>
<!--           
  <span><label>Traded Shares:</label> {{company.tradedShares }}</span> -->
          <!-- <span><label>difference:</label> {{company.difference }}</span> -->
          <!-- <v-sparkline
          :value="value"
          :gradient="gradient"
          :smooth="radius || false"
          :padding="padding"
          :line-width="width"
          :stroke-linecap="lineCap"
          :gradient-direction="gradientDirection"
          :fill="fill"
          :type="type"
          :auto-line-width="autoLineWidth"
          auto-draw
          ></v-sparkline> -->

          
          
        </v-list-item-content>
      </v-list-item>

      
    </v-card>
      </v-col>
      
    </v-row>
    <v-row v-else>
      <v-col v-for="i in 5" :key="i">
         <v-skeleton-loader
        ref="skeleton"
        :boilerplate="false"
        type="article"
        :tile="false"
        class="mx-auto"
      ></v-skeleton-loader>
      </v-col>
    </v-row>

    
  </v-container>
</template>

<script>
const axios = require('axios');

    import {mapState} from 'vuex';
   const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
  ]

  export default {
    name: 'Home',

    data: () => ({
     loaders:{
       todaysPrice: false
     },
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      gradient: gradients[5],
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      gradientDirection: 'top',
      gradients,
      fill: false,
      type: 'trend',
      autoLineWidth: false,
    }),
    computed:{
        ...mapState(['userDetails','watchlist','todaysPrice']),
        watchlistDetails(){
          return this.watchlist.map((stock) => {
            let x =  this.todaysPrice.find((stockToday) =>{
              return stockToday.symbol == stock.symbol
            })
            if(x){
              x['watchListId'] = stock._id
            return x
            } else {
              return []
            }
            
          })
        }
    },
    created(){
      
    },
    methods:{
      goToSinglePage(company){
        this.$router.push({name:'singlePage',params:{symbol:company.symbol}})
      },
      removeFromWatchlist(company){
        if(this.userDetails){
                let formData = {
                "email":this.userDetails.email,
                "id":company.watchListId
              }
        axios.post(' https://r7ytk8m6dj.execute-api.us-east-2.amazonaws.com/dev/api/watchlist/delete',formData).then(()=>{
                        this.$store.dispatch('getUserDetails',{email: this.userDetails.email})
                    })
        } else {
          let filteredArray = this.watchlist.filter((stock) =>{
            return stock.symbol !=  company.symbol
          })
          this.$store.commit('addToWatchlist',filteredArray)
        }
      }
    },
  }
</script>
