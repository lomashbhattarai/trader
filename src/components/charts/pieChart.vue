<script>
    import { Pie } from 'vue-chartjs' 
    export default {
    extends: Pie,
    props: {
        chartdata: {
            type: Object,
            default: null
        },
        options: {
            type: Object,
            default: null
        }
  },
    data(){
        return {
            
        }
    },
    watch:{
        chartdata(){
            this.renderChart(this.chartdata, this.options)
        }
    },
    mounted () {
        this.renderChart(this.chartdata, this.options)
    }
    }
</script>