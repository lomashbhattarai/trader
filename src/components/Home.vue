<template>
  <v-container>
    <v-row v-if="!loaders.todaysPrice">
      <v-col v-for="(company,index) in todaysPrice"
      :key="index" cols="4">
          <v-card
      
      class="mx-auto"
      max-width="344"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">{{ company.name }}</div>
          <v-list-item-title class="headline mb-1">{{ company.symbol }}</v-list-item-title>
          <span><label>Max Price:</label> {{company.maxPrice }}</span>
          <span><label>Min Price:</label> {{company.minPrice }}</span>
          <span><label>Closing Price:</label> {{company.closingPrice }}</span>
          <span><label>Traded Shares:</label> {{company.tradedShares }}</span>
          <span><label>difference:</label> {{company.difference }}</span>          
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
       <v-btn text icon color="pink" @click="addToWatchlist(company)">
              <v-icon title="Add to watch list">mdi-heart-outline</v-icon>
        </v-btn>
      </v-card-actions>
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


  export default {
    name: 'Home',

    data: () => ({
     todaysPrice:[],
     loaders:{
       todaysPrice: false
     },
    
    }),
    created(){
      this.loaders.todaysPrice = true
      axios.get('https://g1y4zxy8vf.execute-api.us-east-2.amazonaws.com/dev/todaysPrice')
        .then(({data})=>{
          console.log(data.prices)
          this.loaders.todaysPrice = false
          this.todaysPrice = data.prices
        })
        .catch((err) => {
          this.loaders.todaysPrice = false
          alert(err)
        })
    },
    methods:{
      addToWatchlist(company){
        this.$store.commit('addToWatchlist',company)
      }
    }
  }
</script>
