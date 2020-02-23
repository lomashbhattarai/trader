<template>
  <v-container>
    <v-row v-if="!loaders.todaysPrice">
      <v-col v-for="(company,index) in watchlist"
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
           <v-sparkline
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
  ></v-sparkline>

          
          
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
       <v-btn text icon color="pink">
              <v-icon title="Remove from watch list">mdi-heart</v-icon>
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
     todaysPrice:[],
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
        ...mapState(['watchlist'])
    },
    created(){
      
    }
  }
</script>
