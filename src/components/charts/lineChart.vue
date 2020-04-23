<script>
	import { Line } from 'vue-chartjs'
	export default {
		extends: Line,
		props:{
			closingPriceArray: Array,
			maxPriceArray: Array,
			minPriceArray: Array,
			days: Array,
			symbol: String
		},
	data(){
		return {
				formatting:{
					fill:false,
					lineTension: 0.3,
					borderCapStyle: 'butt',
					borderDash: [],
					borderWidth: 2,
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: "rgba(75,192,192,1)",
					pointBackgroundColor: "#fff",
					pointBorderWidth: 1,
					pointHoverRadius: 10,
					pointHoverBackgroundColor: "rgba(75,192,192,1)",
					pointHoverBorderColor: "rgba(220,220,220,1)",
					pointHoverBorderWidth: 2,
					pointRadius: 3,
					pointHitRadius: 10,
				}
			}
		},
		watch:{
			days(){
				this.renderChart(this.chartData, this.options)
			}
		},
		computed:{
				options(){
					return {
					legend: {
						position:'top'
					},
					title:{
						display: true,
						text: `Price History(${this.symbol})`
					},
					responsive: true, 
					maintainAspectRatio: false
				}
				},
			chartData() {
				return {
					//labels: ['x','y','z'],
					labels: this.days,
      				datasets: [
        				{
							label: 'Closing Price',
							...this.formatting,
							borderColor: "rgb(30,144,255)",
							data: this.closingPriceArray
						},
						{
							label: 'Max Price',
							...this.formatting,
							borderColor: "green",
							data: this.maxPriceArray,
							hidden: true
						},
						{
							label: 'Min Price',
							...this.formatting,
							borderColor: "red",
							data: this.minPriceArray,
							hidden: true
        				}
      				]

				}
		},
		},
		mounted () {
			this.renderChart(this.chartData,this.options)
		}
	}
</script>