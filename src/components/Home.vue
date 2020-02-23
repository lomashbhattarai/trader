<template>

    <v-card dark>
       <v-card-title>
      Today's Price
      <v-btn @click="getData" fab title="Refresh">
        <v-icon  class="blue--text" >mdi-refresh</v-icon>
      </v-btn>
      
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchKey"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
      <v-data-table dense dark :loading="loaders.todaysPrice"
        :headers="headers"
        :search="searchKey"
        :items="todaysPrice"
        :items-per-page="20"
        class="elevation-1"
        @click:row="handleRowClick"
      >
        <template v-slot:item.name="{ item }">
          <span :class="getColor(item.difference)+'--text'">{{ item.name }}</span>
        </template>
        <template v-slot:item.difference="{ item }">
          <span :class="getColor(item.difference)+'--text'">{{ item.difference }}</span>
        </template>
      
      
      </v-data-table>
        <v-card-actions>
        <v-btn text icon color="pink" @click="addToWatchlist(company)">
                <v-icon title="Add to watch list">mdi-heart-outline</v-icon>
          </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
  const axios = require('axios');
  
  export default {
    name: 'Home',
    data: () => ({
      searchKey:'',
     todaysPrice:[],
     loaders:{
       todaysPrice: false
     },
     headers: [
          {
            text: 'Name',
            align: 'left',
            //sortable: false,
            value: 'name',
          },
          { text: 'Symbol', value: 'symbol' },
          { text: 'Max Price', value: 'maxPrice' },
          { text: 'Min Price', value: 'minPrice' },
          { text: 'Closing Price', value: 'closingPrice' },
          { text: 'Traded Shares', value: 'tradedShares' },
          { text: 'Difference', value: 'difference' },
        ],
    
    }),
    mounted(){
      this.getData()
    },
    methods:{

      getData(){
        this.loaders.todaysPrice = true
      axios.get('https://g1y4zxy8vf.execute-api.us-east-2.amazonaws.com/dev/todaysPrice')
        .then(({data})=>{
          console.log(data.prices)
          this.loaders.todaysPrice = false
          this.todaysPrice = data.prices
        })
        .catch((err) => {
          this.loaders.todaysPrice = false
          console.log(err)
        })

      },
      addToWatchlist(company){
        this.$store.commit('addToWatchlist',company)
      },
      handleRowClick(value){
        this.$router.push({name:'singlePage',params:{id:value.sn}})
      },
      getColor(difference){
         
        if (difference < 0) return 'red'
        else if(difference > 0) return 'green'
        else return 'orange'
      }

    }
  }
</script>
