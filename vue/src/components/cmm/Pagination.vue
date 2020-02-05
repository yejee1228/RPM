<template>
    <div class="cm_pagination">
        <span class="move prev" v-if="existPrev"><a @click="previous">◀</a></span>
        <ul class="pagination" v-for="page of pageList" :key="page.number">
            <li :class="page.class"><a @click="pageClick(page.number)">{{page.number}}</a></li>
        </ul>
        <span class="move next" v-if="existNext"><a @click = "next">▶</a></span>
    </div>
</template>

<script>
    export default {
        name: "pagination",
        data(){
            return{
                totalCount : 0,
                pageSize : 0,
                pageNum : 0,
                blockSize : 10,
                pageCount : 0,
                startRow : 0,
                endRow : 0,
                blockCount : 0,
                blockNum : 0,
                startPage : 0,
                endPage : 0,
                existPrev : true,
                existNext : true
            }
        },
        computed : {
            pageList : function(){
                this.init()
                let pageList = []
                for(let i = this.startPage; i<= this.endPage; i++){
                    if (i == this.$store.state.contents.pageNum)
                        pageList.push({number : i, class : "num on"})
                    else
                        pageList.push({number : i, class : "num"})
                }
                return pageList
            }

        },
        methods : {
            pageClick(number){
                this.$store.dispatch('contents/pageNumSetting', number)
                this.init()
                this.$store.dispatch('contents/pageClick', {start : this.startRow,end : this.endRow})

            },
            init(){
                this.totalCount = this.$store.state.contents.resultLength
                this.pageSize = this.$store.state.contents.pageLimit
                this.pageNum = this.$store.state.contents.pageNum
                this.startRow = (this.pageNum-1)*this.pageSize
                this.endRow = (this.pageNum==this.pageCount)
                    ? this.totalCount
                    : this.startRow+this.pageSize
                this.pageCount = (this.totalCount % this.pageSize == 0)
                    ? parseInt(this.totalCount / this.pageSize)
                    : parseInt(this.totalCount / this.pageSize)+1
                this.blockCount = ((this.pageCount % this.blockSize) == 0)
                    ? parseInt(this.pageCount / this.blockSize)
                    : parseInt(this.pageCount / this.blockSize)+1
                this.blockNum = Math.ceil(this.pageNum / this.blockSize)
                this.startPage = ((this.blockNum-1) * this.blockSize)+1
                this.endPage = (this.blockNum == this.blockCount)
                    ? this.pageCount
                    : this.startPage + this.blockSize-1
                this.existPrev = (this.blockNum != 1)
                this.existNext = !(this.blockNum == this.blockCount)
            },
            previous(){
                this.$store.dispatch('contents/pageNumSetting', this.startPage-1)
                this.init()
                this.$store.dispatch('contents/pageClick', {start : this.startRow,end : this.endRow})
            },
            next(){
                this.$store.dispatch('contents/pageNumSetting', this.startPage+this.blockSize)
                this.init()
                this.$store.dispatch('contents/pageClick', {start : this.startRow,end : this.endRow})
            }
        },
        created() {
            this.init()
        }


    }
</script>

<style scoped>

</style>