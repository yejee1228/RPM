<template>
    <div>
        <h1 style="text-align:center;">Linechart</h1>
        <line-example  ref="monthRevenue" v-if="isLineGraph === true"/>
        <horizontal-bar-example  ref="modelRevenue" v-if="isLineGraph === false"/>
    </div>
</template>

<script>
    import LineExample from './chartjs/lineExample'
    import HorizontalBarExample from './chartjs/horizontalBarExample'
    import { mapState } from 'vuex';
    import { EventBus } from "./chartjs/event-bus";

    export default {
        name: 'datacenterGraph',
        components: {
            'line-example' : LineExample,
            'horizontal-bar-example': HorizontalBarExample
        },
        computed: {
            ...mapState({
                labels: state => state.decenter.labels,
                rowData : state => state.decenter.rowData ,
                title: state => state.decenter.title,
                Domestic: state => state.decenter.Domestic,
                Export: state => state.decenter.Export,
                mainCategoryItem: state => state.decenter.mainCategoryItem,
                subCategoryItem: state => state.decenter.subCategoryItem,
                GrandTotal: state => state.decenter.GrandTotals,
                isLineGraph : state => state.decenter.isLineGraph,
                GraphItem : state => state.decenter.GraphItem,
                lineGraphLabels : state => state.decenter.lineGraphLabels,
                barGraphLabels  : state => state.decenter.barGraphLabels ,
                lineGraphRowData : state => state.decenter.lineGraphRowData ,
                barGraphRowData  : state => state.decenter.barGraphRowData
            }),
            monthRevenue : function (){
                return this.$refs.monthRevenue.dataInit({ title : this.title, labels : this.lineGraphLabels, lineGraphRowData : this.lineGraphRowData})
            }
        },
        data: function() {
            return {
                dataPoints: null,
                height    : 20,
                datacollection: {
                    labels: ['January' , 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'Total' ] ,
                    datasets: [
                        {
                            label: '',
                            backgroundColor: '#44b0f8',
                            pointBackgroundColor: 'white',
                            borderWidth: 1,
                            pointBorderColor: '#249EBF',
                            data: []//[ this.GrandTotal.Jan, this.GrandTotal.Feb , this.GrandTotal.Mar , this.GrandTotal.Apr , this.GrandTotal.May , this.GrandTotal.Jun , this.GrandTotal.Jul , this.GrandTotal.Aug , this.GrandTotal.Sep , this.GrandTotal.Oct , this.GrandTotal.Nov , this.GrandTotal.Dec , this.GrandTotal.Total]
                        }
                    ]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            },
                            gridLines: {
                                display: true
                            }
                        }],
                        xAxes: [ {
                            gridLines: {
                                display: false
                            }
                        }]
                    },
                    legend: {
                        display: true
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            }
        },
        methods : {
          fillData() {
              EventBus.$on('dataSettup',()=>{
                  this.$refs.modelRevenue.hi()
                  //this.$refs.monthRevenue.dataInit({ title : this.title, labels : this.lineGraphLabels, lineGraphRowData : this.lineGraphRowData})
                  this.$refs.modelRevenue.dataInit({ title : this.title, labels : this.barGraphLabels, barGraphRowData : this.barGraphRowData})
              })
          }
        },
        created(){
            EventBus.$on('dataSettup',()=>{
                this.$refs.modelRevenue.hi()
                //this.$refs.monthRevenue.dataInit({ title : this.title, labels : this.lineGraphLabels, lineGraphRowData : this.lineGraphRowData})
                this.$refs.modelRevenue.dataInit({ title : this.title, labels : this.barGraphLabels, barGraphRowData : this.barGraphRowData})
            })
           /* this.$refs.monthRevenue.dataInit({ title : 'lineGraph' , labels : ['January' , 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'Total' ]
                , lineGraphRowData : [ 10 , 10 , 10 , 10 , 10 , 10 , 10 , 10 , 10 , 10 , 10 , 10 , 10] })
            this.$refs.modelRevenue.dataInit({ title : 'barGraph' , labels : ['January' , 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'Total' ] , barGraphRowData : [ 10 , 10 , 10 , 10 , 10 , 10 , 10 , 10 , 10 , 10 , 10 , 10 , 10]})*/
        }
    }
</script>

<style scoped>

</style>