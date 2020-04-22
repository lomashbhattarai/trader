<template>
    <div>
        <v-container>
            <v-row v-if="user">
                <v-col>
                    <PieChart :chartdata="chartdata" :options="options" />
                    <h3 class="text-xs-center mt-5">Current Valuation : Rs.{{ currentValuation }}</h3>
                    <h5 class="text-xs-center">Total Investment: Rs.{{ totalCostPrice }}</h5>     
                </v-col>
                <v-col>
                    <v-data-table dense 
                        :headers="headers"
                        :items="userDetails.portfolio"
                        :items-per-page="10"
                        class="elevation-1"
                        mobile-breakpoint="0"
                    >
                    <template v-slot:item.diff="{ item }">
                       <span :class ="getColor(item.closingPrice - item.costPrice)+'--text'"> {{ (item.closingPrice - item.costPrice)* item.numOfShares}} </span>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-icon
                            small
                            class="mr-2"
                            @click="editItem(item)"
                        >
                            mdi-pencil
                        </v-icon>
                        <v-icon
                            small
                            @click="deleteItem(item)"
                        >
                            mdi-delete
                        </v-icon>
                    </template>
                    </v-data-table>
                        <v-list>
                            <v-list-group>
                                  <template v-slot:activator>
                        <v-card-title>Add Stock to Portfolio</v-card-title>
                                  </template>
                        <v-form>
                        <v-autocomplete
                            :items="companies"
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
                
            </v-row>
            <v-row v-else>
                Login To Manage your portfolio
            </v-row>
               
        
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
          { text: 'Symbol', value: 'symbol', sortable: false },
          { text: 'Cost Price', value: 'costPrice', sortable: false },
          { text: 'Num of Shares', value: 'numOfShares', sortable: false },
          { text: 'Closing Price', value: 'closingPrice', sortable: false },
          { text: 'Gain/loss', value: 'diff' , sortable: false },
          { text: 'Actions', value: 'actions', sortable: false },
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
        ...mapState(['user','userDetails','companies','todaysPrice']),
        totalCostPrice(){
            return this.userDetails.portfolio.reduce((sum,portfolio)=>{
                    if(portfolio){
                        return sum + portfolio.costPrice * portfolio.numOfShares
                    } else {
                        return sum
                    }
                    
                },0);
        },
        currentValuation(){
            return this.userDetails.portfolio.reduce((sum,portfolio)=>{
                    if(portfolio){
                        let stockToday =  this.todaysPrice.find((stock)=>{
                            return stock.symbol == portfolio.symbol
                        })
                        if(stockToday) {
                            return sum + stockToday.closingPrice * portfolio.numOfShares
                        } else {
                            return sum
                        }
                    } else {
                        return sum
                    }
                    
                },0);
        },
        chartdata(){
            let labels,values
            if(this.userDetails){
                labels = this.userDetails.portfolio.map((portfolio)=>{
                    return portfolio.symbol
                })
                values = this.userDetails.portfolio.map((portfolio)=>{
                    //return portfolio.costPrice * portfolio.numOfShares
                    return portfolio.closingPrice * portfolio.numOfShares
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
        
        if(!this.todaysPrice.length){
        this.getTodaysPrice().then(()=>{
            this.$store.dispatch('getUserDetails',{email: this.userDetails.email})    
        })
      } else {
          this.$store.dispatch('getUserDetails',{email: this.userDetails.email})
      }
    },
    methods:{
        ...mapActions(['getCompanyList','getTodaysPrice']),
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
                        this.newEntry = {
                            symbol:'',
                            numOfShares:'',
                            costPrice:'',
                            upperStop:'',
                            lowerStop:'',
                            date:new Date().toISOString().substr(0, 10)
                        }
                    })
                }
        },
         getColor(difference){
            if (difference < 0) return 'red'
            else if(difference > 0) return 'green'
            else return 'orange'
        }
    }
    
}
</script>
<style>
.text-xs-center{
    text-align: center;
}
</style>