import { HorizontalBar } from './baseCharts'

export default {
  extends: HorizontalBar,
  props:['BarGraphDataSetup'],
  created(){
      this.renderChart({
        labels:  ['January' , 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ] ,
        datasets: [
          {
            label:  'CSV 파일을 올려주세요 ',
            borderColor: '#005276',
            data:  [10,10,10,10,10,10,10,10,10,10,10,10],
            backgroundColor: ['#ccd8ff', '#b9d0d6', '#b9d0d6', '#5d7381', '#ccd8ff', '#b9d0d6', '#b9d0d6', '#5d7381', '#ccd8ff', '#b9d0d6', '#b9d0d6', '#5d7381'],
            hoverBorderColor: 'red',
            offset: true
          }
        ]
      }, {responsive: true, maintainAspectRatio: false})
    },
  methods:{
    dataInit(data){
      this.renderChart({
        labels: data.labels,
        datasets: [
          {
            label: data.title,
            backgroundColor: '#005276',
            borderColor: '#005276',
            data: data.barGraphRowData,
            borderCapStyle: 'butt',
            lineTension: 0.0,
            fill: false
          }
        ]
      }, {responsive: true, maintainAspectRatio: false})

    },

  },

}