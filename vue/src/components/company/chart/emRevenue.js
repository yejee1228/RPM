import { HorizontalBar } from './baseCharts'

export default {
  extends: HorizontalBar,
  props:['data'],
  data(){
    return{
      name:[],
      revenue:[]
    }
  },
  methods:{
    dataInit(revenue){
      this.renderChart({
        labels: Object.keys(revenue),
        datasets: [
          {
            label: '월 판매액(단위 : 만원)',
            backgroundColor: '#99ccff',
            data: Object.values(revenue)
          }
        ]
      }, {responsive: true, maintainAspectRatio: false})

    },

  },

}