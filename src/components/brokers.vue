<template>
  <v-container>
    <v-text-field
        v-model="searchKey"
        append-icon="mdi-magnify"
        label="Search by Name, Address or Code"
        single-line
        hide-details
      ></v-text-field>
    <v-row v-if="!loaders.brokers">
      <v-col v-for="(company,index) in fileredBrokers"
      :key="index" cols="12" md="4">
          <v-card
      
      class="mx-auto"
      max-width="344"
      outlined
    >
    
      <v-list-item three-line>
        
        <v-list-item-content>
          <v-row>
              <v-col>
                <v-avatar color="teal" size="58">
                    <span class="white--text">{{company.code }}</span>
                </v-avatar>
              </v-col>
            
          <v-col class="overline mb-4">{{ company.name }}</v-col>  
          </v-row>
         
          <span class="subtitle-2"><label class="font-weight-medium overline mb-1">address: </label>{{ company.address }}</span>
          <span class="subtitle-2"><label class="font-weight-medium overline mb-1">telephone:</label> {{company.telephone }}</span>
          <span class="subtitle-2"><label class="font-weight-medium overline mb-1">email:</label> {{company.email }}</span>
          <span class="subtitle-2"><label class="font-weight-medium overline mb-1">website:</label> {{company.website }}</span>
          <span class="subtitle-2"><label class="font-weight-medium overline mb-1">person:</label> {{company.person }}</span>          
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
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
     brokers:[],
     searchKey:'',
     loaders:{
       brokers: false
     },
    }),
    computed:{
      fileredBrokers(){
        if(this.brokers.length){
          console.log("yes")
          return this.brokers.filter((broker) => {
            console.log()
            return broker.name.toLowerCase().includes(this.searchKey.toLowerCase())
              || broker.code.toLowerCase().includes(this.searchKey.toLowerCase())
              || broker.address.toLowerCase().includes(this.searchKey.toLowerCase())
        })
        } else {
          return []
        }
        
      }
    },
    created(){
      this.loaders.brokers = true
      axios.get('https://g1y4zxy8vf.execute-api.us-east-2.amazonaws.com/dev/getBrokers')
        .then(({data})=>{
          console.log(data.prices)
          this.loaders.brokers = false
          this.brokers = data.brokers
        })
        .catch((err) => {
          this.loaders.brokers = false
          alert(err)
        })
    }
  }
</script>
