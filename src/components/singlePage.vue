<template>
<v-container class="mt-5">
     <v-btn @click="$router.go(-1)">Back</v-btn>
    
    <v-row>
        <v-col cols="12" md="4">
            <v-select v-model="selectedCompany" 
                hint="Pick a company to see its charts"
                persistent-hint
                :items="companiesSortedArray">
                <template slot="selection" slot-scope="data">
                    {{ data.item.symbol }} - {{ data.item.name }}
                </template>
                <template slot="item" slot-scope="data">
                    {{ data.item.symbol }} - {{ data.item.name }}
                </template>
            </v-select>
    
    <v-card
    class="mx-auto mt-5"
    max-width="344"
    outlined
    shaped
  >
    <v-list-item three-line>
      <v-list-item-content>
                <v-list-item-title>{{ selectedCompany.symbol }}
                    <span>
                <v-icon v-if="!isaddedToWatchList" @click="addToWatchlist(selectedCompany)" title="Add to watch list">mdi-heart-outline</v-icon> 
                <v-icon color="pink" v-else title="on your  watch list">mdi-heart</v-icon>  
                </span>
                </v-list-item-title>
        <v-list-item-subtitle> {{ selectedCompany.name }}</v-list-item-subtitle>
       
      </v-list-item-content>
    </v-list-item>
          <v-btn text color="blue">Add to Portfolio</v-btn>  
    
  </v-card>
    </v-col>
        <v-col cols="12" md="8">
            <v-card class="mt-5">
                <lineChart :symbol="selectedCompany.symbol" 
                    :closingPriceArray="closingPriceArray"
                    :maxPriceArray="maxPriceArray"
                    :minPriceArray="minPriceArray" 
                    :days="dayArray"  
                    
                />
                <customBarChart class="mt-5"
                    :days="dayArray"
                    :volumeArray="volumeArray" />
                <!-- supports and resistance -->
            </v-card>
        </v-col>
    </v-row>
</v-container>   
</template>

<script>
const axios = require('axios');

import lineChart from './charts/lineChart';
import customBarChart from './customBarChart'
import { mapState } from 'vuex';
export default {
    name:'singlePage',
    data(){
        return {
            historyData:[],
            days:['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            companies:[
                {
                    name: "agriculture development bank",
                    symbol: "ADBL"
                }
            ],
            selectedCompany:{
                name: '',
                symbol: this.$route.params.symbol
            },
            symbol:this.$route.params.symbol
            
        }
    },
    computed:{
        ...mapState(['userDetails','watchlist']),
        isaddedToWatchList(){
            return this.watchlist.some((watchStock)=>{
                return watchStock.symbol == this.selectedCompany.symbol
            })
        },
        dayArray(){
            return this.historyData.map((price)=>{
                return price.today.split('-').slice(1,3).join('-')
            })

        },
        closingPriceArray(){
            return this.historyData.map((price)=>{
                return price.closingPrice
            })
        },
        maxPriceArray(){
            return this.historyData.map((price)=>{
                return price.maxPrice
            })
        },
        minPriceArray(){
            return this.historyData.map((price)=>{
                return price.minPrice
            })
        },
        volumeArray(){
            return this.historyData.map((price)=>{
                return price.tradedShares
            })
        },
        companiesSortedArray(){
            return this.companies.slice().sort((company1,company2)=>{
                return company1.name > company2.name
            })
        }
    },
    methods:{
        getHistroyFromSymbol(){
            axios.get(`https://g1y4zxy8vf.execute-api.us-east-2.amazonaws.com/dev/getHistoryBySymbol/${this.selectedCompany.symbol}`)
                .then(({data})=>{
                    this.historyData = data.history
                })

        },
        getCompanyList(){
            return axios.get(' https://g1y4zxy8vf.execute-api.us-east-2.amazonaws.com/dev/getCompanyFromDb')
                .then(({data})=> {
                    this.companies = data.company
                })

        },
        changeRoute(){
            this.$router.push({name:'singlePage',params:{symbol:this.selectedCompany.symbol}})
        },
        addToWatchlist(selectedCompany){
            if(this.userDetails){
                let formData = {
                "email":this.userDetails.email,
                "symbol":selectedCompany.symbol
            }
            axios.post(' https://r7ytk8m6dj.execute-api.us-east-2.amazonaws.com/dev/api/watchlist/create',formData).then(()=>{
                        this.$store.dispatch('getUserDetails',{email: this.userDetails.email})
                    })
            }

            else {
                this.$store.commit('addToWatchlist',[...this.watchlist,{symbol:selectedCompany.symbol}])
            }
        }

    },
    watch:{
        "selectedCompany.symbol"(newValue,oldValue){
            if(oldValue != newValue) {
                this.changeRoute()
                //this.symbol = this.selectedCompany.symbol
                this.getHistroyFromSymbol()
            }
                
        }
    },
    mounted(){
        this.getHistroyFromSymbol()
        this.getCompanyList().then(()=>{
            this.selectedCompany = this.companies.find((company)=>{
                return company.symbol == this.selectedCompany.symbol
            })
        })
    },
    components:{
        lineChart,
        customBarChart
    }

    
}
</script>