<template>
<v-container class="mt-5">
    <v-card>
        <lineChart :symbol="symbol" 
            :closingPriceArray="closingPriceArray"
            :maxPriceArray="maxPriceArray"
            :minPriceArray="minPriceArray" 
            :days="dayArray"  
            :height="125" 
        />
        <!-- supports and resistance -->
    
    </v-card>
</v-container>   
    
    
</template>

<script>
const axios = require('axios');

import lineChart from './charts/lineChart'
export default {
    data(){
        return {
            historyData:[],
            days:['January', 'February', 'March', 'April', 'May', 'June', 'July']
        }
    },
    computed:{
        symbol(){
            return this.$route.params.symbol
        },
        dayArray(){
            return this.historyData.map((price)=>{
                return price.today
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
    },
    methods:{
        getHistroyFromSymbol(){
            axios.get(`https://g1y4zxy8vf.execute-api.us-east-2.amazonaws.com/dev/getHistoryBySymbol/${this.symbol}`)
                .then(({data})=>{
                    this.historyData = data.history
                })

        }
    },
    mounted(){
        this.getHistroyFromSymbol()
    },
    components:{
        lineChart
    }

    
}
</script>