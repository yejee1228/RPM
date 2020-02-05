<template>
    <div class="Chart">
        <bar-chart :data="data" ref="bar"/>
    </div>

</template>

<script>
    import BarChart from '@/components/contents/contentsJs/BarChart'
    export default {
        name: "RecommendChart",
        components : {BarChart},
        data() {
            return {data : []}
        },
        created() {
                this.data = {x : this.$store.state.contents.recommendBySearchWordList[0],
                    y : this.$store.state.contents.recommendBySearchWordList[1]}
        }
    }
</script>

<style scoped>

</style>