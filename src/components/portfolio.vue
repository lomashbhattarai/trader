<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                    <v-data-table dense 
                        :headers="headers"
                        :items="userDetails.portfolio"
                        :items-per-page="10"
                        class="elevation-1"
                    > </v-data-table>
                </v-col>
                <v-col>
                    <PieChart :chartdata="chartdata" :options="options" />
                </v-col>
            </v-row>
            <v-col>
                        <v-list>
                            <v-list-group>
                                  <template v-slot:activator>
                        <v-card-title>Add Stock to Portfolio</v-card-title>
                                  </template>
                        <v-form>
                        <v-autocomplete
                            :items="companies"
                            :filter="customFilter"
                            v-model="newEntry.symbol"
                            color="white"
                            item-text="name"
                            item-value="symbol"
                            label="Stocks"
                        >
                            <template  v-slot:item="data">
                                {{`${data.item.name}(${data.item.symbol})`}}
                            </template>
                        </v-autocomplete>
                        <v-row>
                            <v-col>
                                <v-text-field v-model="newEntry.numOfShares" label="No of Shares"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field v-model="newEntry.costPrice" label="Cost Price"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-slider
                            v-model="max"
                            label="Upper Sell Stop"
                        ></v-slider>
                            </v-col>
                            <v-col>
                                <v-slider
                            v-model="max"
                            label="Lower Sell Stop"
                        ></v-slider>
                            </v-col>
                        </v-row>
                        
                        <v-date-picker v-model="newEntry.date" no-title @input="menu1 = false"></v-date-picker>

                        <v-file-input multiple label="Receipt of Purchase"></v-file-input>
                         <v-btn
                            color="success"
                            class="mr-4"
                            @click="addEntryToPortfolio"
                            >
                            Add To Portfolio
                        </v-btn>
                        </v-form>
                            </v-list-group>
                        </v-list>
                </v-col>
               
        
        </v-container>
    </div>
</template>

<script>
import PieChart from './charts/pieChart'
import { mapState, mapActions } from 'vuex'
const axios = require('axios')
export default {
    components:{
        PieChart
    },
    data(){
        return {
            headers: [
          { text: 'Symbol', value: 'symbol' },
          { text: 'Cost Price', value: 'costPrice' },
          { text: 'Num of Shares', value: 'numOfShares' },
          { text: 'Current Value', value: 'difference' },
          { text: 'Gain/loss', value: 'percentDiff' },
        ],
            newEntry:{
                symbol:'',
                numOfShares:'',
                costPrice:'',
                upperStop:'',
                lowerStop:'',
                date:new Date().toISOString().substr(0, 10)

            },
            options:{
                responsive: true, 
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'My Portfolio'
                },
                pieceLabel: {
                    mode: 'percentage',
                    precision: 1
                }
            }
        }
    },
    watch:{
        newEntry(value){
            this.newEntry.upperStop = value.costPrice
            this.newEntry.lowerStop = value.costPrice

        }
    },
    computed:{
        ...mapState(['userDetails','companies']),
        chartdata(){
            let labels,values
            if(this.userDetails){
                labels = this.userDetails.portfolio.map((portfolio)=>{
                    return portfolio.symbol
                })
                values = this.userDetails.portfolio.map((portfolio)=>{
                    return portfolio.costPrice * portfolio.numOfShares
                })
            }
             
            return {
                labels: labels,
                datasets: [
                    {
                    backgroundColor: [
                        '#007CC3',
                        '#F47A1F',
                        '#FDBB2F',
                        '#377B2B',
                        ' #b03a2e',
                        '#7AC142',
                        '#1abc9c',
                        '#8e44ad'
                        
                    ],
                    data: values
                    }
                ]
            }
        }
    },
    mounted(){
        this.getCompanyList()
    },
    methods:{
        ...mapActions(['getCompanyList']),
        addEntryToPortfolio(){
            if(this.userDetails && this.newEntry.symbol 
                && this.newEntry.costPrice && this.newEntry.numOfShares){
                    let formData = {
                        "email":this.userDetails.email,
                        "symbol":this.newEntry.symbol,
                        "costPrice":this.newEntry.costPrice,
                        "numOfShares":this.newEntry.numOfShares
                    } 
                    axios.post(' https://r7ytk8m6dj.execute-api.us-east-2.amazonaws.com/dev/api/portfolio/create',formData).then(()=>{
                        this.$store.dispatch('getUserDetails',{email: this.userDetails.email})
                    })
                }
        }
    }
    
}
</script>