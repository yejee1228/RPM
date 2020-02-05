import { Line } from './baseCharts'

export default {
  extends: Line,
  props: ['LineGraphDataSetup'],
  methods: {
    dataInit() {
      console.log(this.LineGraphDataSetup.title+this.LineGraphDataSetup.lineGraphLabels.length + this.LineGraphDataSetup.lineGraphRowData.length)
      this.renderChart({
        labels: this.LineGraphDataSetup.labels,
        datasets: [
          {
            label: this.LineGraphDataSetup.title,
            borderColor: '#005276',
            data: this.LineGraphDataSetup.lineGraphRowData,
            borderCapStyle: 'butt',
            lineTension: 0.2,
            fill: false
          }
        ]
      }, {responsive: true, maintainAspectRatio: false})
    }
  }
}