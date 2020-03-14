<template>
<v-container class="mt-5">
    <router-link :to="{name:'home'}"><v-btn>Back</v-btn></router-link>
    <v-select v-model="selectedCompany" 
        hint="Pick a company to see its charts"
        persistent-hint
        :items="companiesSortedArray" @change="changeRoute()">
         <template slot="selection" slot-scope="data">
             {{ data.item.symbol }} - {{ data.item.name }}
        </template>
        <template slot="item" slot-scope="data">
            {{ data.item.symbol }} - {{ data.item.name }}
        </template>
    </v-select>
    <v-card class="mt-5">
        <lineChart :symbol="symbol" 
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
</v-container>   
    
    
</template>

<script>
const axios = require('axios');

import lineChart from './charts/lineChart';
import customBarChart from './customBarChart'
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
            }
            
        }
    },
    computed:{
        symbol(){
            return this.$route.params.symbol
        },
        dayArray(){
            return this.historyData.map((price)=>{
                return price.today.split('-').slice(0,3).join('-')
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
            axios.get(`https://g1y4zxy8vf.execute-api.us-east-2.amazonaws.com/dev/getHistoryBySymbol/${this.symbol}`)
                .then(({data})=>{
                    this.historyData = data.history
                })

        },
        getCompanyList(){
            axios.get(' https://g1y4zxy8vf.execute-api.us-east-2.amazonaws.com/dev/getCompanyFromDb')
                .then(({data})=> {
                    this.companies = data.company

                })

        },
        changeRoute(){
            this.$router.push({name:'singlePage',params:{symbol:this.selectedCompany.symbol}})
        }
    },
    watch:{
        symbol(newValue,oldValue){
            if(oldValue != newValue) {
                
                this.getHistroyFromSymbol()
            }
                
        }
    },
    mounted(){
        this.getHistroyFromSymbol()
        this.getCompanyList()
    },
    components:{
        lineChart,
        customBarChart
    }

    
}
</script>