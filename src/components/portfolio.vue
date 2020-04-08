<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                        <v-list>
                            <v-list-group>
                                  <template v-slot:activator>
                        <v-card-title>Add Stock to Portfolio</v-card-title>
                                  </template>
                        <v-form>
                        <v-autocomplete
                            :items="[]"
                            :filter="customFilter"
                            color="white"
                            item-text="name"
                            label="Stocks"
                        ></v-autocomplete>
                        <v-row>
                            <v-col>
                                <v-text-field label="No of Shares"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field label="Cost Price"></v-text-field>
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
                        
                        <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>

                        <v-file-input multiple label="Receipt of Purchase"></v-file-input>
                        
                        </v-form>
                            </v-list-group>
                        </v-list>
                        
                
                </v-col>
                <v-col>
                    <PieChart :chartdata="chartdata" :options="options" />
                </v-col>
        
            </v-row>
        
        </v-container>
    </div>
</template>

<script>
import PieChart from './charts/pieChart'
export default {
    components:{
        PieChart
    },
    data(){
        return {
            chartdata :{
                labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
                datasets: [
                    {
                    backgroundColor: [
                        '#007CC3',
                        '#F47A1F',
                        '#FDBB2F',
                        '#377B2B',
                        '#007CC3',
                        '#7AC142',
                        
                    ],
                    data: [40, 40, 50, 10]
                    }
                ]
            },
            options:{
                responsive: true, 
                maintainAspectRatio: false,
                pieceLabel: {
                    mode: 'percentage',
                    precision: 1
                }
            }
        }
    }
    
}
</script>