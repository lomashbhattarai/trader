<template>

    <v-card dark>
       <v-card-title>
      Today's Price
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchKey"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
      <v-card-subtitle v-if="todaysPrice.length">
      As of {{ todaysPrice[0].today.replace(/-/g,' ') }}
      <v-btn text icon @click="getData" color="green" title="Refresh">
        <v-icon>mdi-cached</v-icon>
      </v-btn>
    </v-card-subtitle>


    <v-chip
      class="ma-2"
      text-color="green"
    >
   
        {{ dataSummary.positive }}    Positive
    </v-chip>

    <v-chip
      class="ma-2"
      text-color="red"
    >
       {{ dataSummary.negative }} Negative
    </v-chip>

    <v-chip
      class="ma-2"
      text-color="orange"
    >
      {{ dataSummary.neutral }} Neutral
    </v-chip>
    

      <v-data-table dense dark :loading="loaders.todaysPrice"
        :headers="headers"
        :search="searchKey"
        :items="todaysPrice"
        :items-per-page="200"
        class="elevation-1"
        @click:row="handleRowClick"
      >
        <template v-slot:item.name="{ item }">
          <span :class="getColor(item.difference)+'--text'">{{ item.name }}</span>
        </template>
        <template v-slot:item.symbol="{ item }">
          <span :class="getColor(item.difference)+'--text'">{{ item.symbol }}</span>
        </template>
        <template v-slot:item.difference="{ item }">
          <span :class="getColor(item.difference)+'--text'">{{ item.difference }}</span>
        </template>
        <template v-slot:item.percentDiff="{ item }">
          <span :class="getColor(item.difference)+'--text'">{{ item.percentDiff }} </span>
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
    data() {
      return {
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
          { text: 'Traded Shares', value: 'tradedShares' },
          { text: 'Max Price', value: 'maxPrice' },
          { text: 'Min Price', value: 'minPrice' },
          { text: 'Closing Price', value: 'closingPrice' },
          { text: 'Prev Closing', value: 'prevClosingPrice' },
          { text: 'Difference', value: 'difference' },
          { text: '% Diff', value: 'percentDiff' },

          

        ],
    
    }
    },
    created(){
      if(!this.todaysPrice.length){
        this.getData()
      }
      
    },

    computed:{
      dataSummary(){
        let dataSummary = {
          positive: 0,
          negative: 0,
          neutral: 0
        }

        if(this.todaysPrice.length){
          this.todaysPrice.map(company => {
            if(company.difference > 0){
              dataSummary['positive']++
            } 
            else if (company.difference < 0) {
              dataSummary['negative']++
            } 
            else {
              dataSummary['neutral']++
            }
          })
        }

        return dataSummary
      }
    },
    methods:{

      getData(){
        this.loaders.todaysPrice = true
      axios.get('https://g1y4zxy8vf.execute-api.us-east-2.amazonaws.com/dev/getTodaysPrice')
        .then(({data})=>{
          this.loaders.todaysPrice = false
          data.prices.map((item,index) => {
            data.prices[index].percentDiff = this.calcPercentDiff(item)
          })
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
        this.$router.push({name:'singlePage',params:{symbol:value.symbol}})
      },
      getColor(difference){
         
        if (difference < 0) return 'red'
        else if(difference > 0) return 'green'
        else return 'orange'
      },
      calcPercentDiff(item){
        let num = item.difference*100/item.prevClosingPrice 
        return +num.toFixed(2)
      }
      

    }
  }
</script>

<style>
.v-data-table .v-data-table__mobile-row {
    height: initial;
    min-height: 23px;
}

.v-data-table__mobile-row__header {
    font-weight: 450;
}


</style>
