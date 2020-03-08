<template>   
    <barChart :chartdata="chartData" :options="options" class="smallDiv" />         
</template>

<script>
import barChart from './charts/barChart'
export default {
    name:"AxesLessBar",
    components:{
        barChart
    },
    props:{
        volumeArray: Array,
        days: Array
    },
    computed:{
            chartData (){
                return {
                    labels: this.days ,
                    datasets: [
                        {
                            label: "Volume",
                            backgroundColor: "blue",
                            borderColor: "blue",
                            //borderWidth: 2,
                            hoverBackgroundColor: "blue",
                            hoverBorderColor: "blue",
                            data: this.volumeArray,
                        }
                    ]
                }
            },
            options() {
                return {
                responsive: true,
                maintainAspectRatio: false,
                title:{
						display: true,
                        text: 'Volume',
                        position: 'bottom'
					},
                legend: {
                    display: false
                },
                 scales: {
                    xAxes: [{
                        barPercentage: 1,
                        barThickness: 40,
                        //maxBarThickness: 8,
                        minBarLength: 2,
                        offset: false,
                        
                        gridLines: {
                            offsetGridLines: false,
                            display:false,
                            drawBorder: false,
                        },
                        ticks: {
                           display: false
                        }
                    }],
                    yAxes: [{
                        barPercentage: 0.5,
                        barThickness: 6,
                        maxBarThickness: 8,
                        minBarLength: 2,
                        offset: false,
                        gridLines: {
                            offsetGridLines: false,
                            display:true,
                            drawBorder: false,
                        },
                         ticks: {
                             display:true,
                            callback: function(value) {
                                return value/1000 +'k';
                            }
                        }
                    }]
                }
            }
        }
    }
    
}
</script>

<style>
    .smallDiv{
        height:100px;
    }
</style>