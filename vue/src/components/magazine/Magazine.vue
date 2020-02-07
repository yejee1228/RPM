<template>
    <div>
        <div id='app'>
           <div ></div>
            <div id="content">
                <div class="main_content">
                    <div class = "mc_header">
                    <div class="mc_wide_searchbox">
                        <vue-word-cloud
                                :words="wordList"
                                font-family="Roboto"
                                :color="([, weight]) => weight > 19 ? colorItems[Math.floor(Math.random()*11+1)] : weight > 18 ? colorItems[Math.floor(Math.random()*11+1)] : weight > 15 ? colorItems[Math.floor(Math.random()*11+1)] : weight > 12 ?  colorItems[Math.floor(Math.random()*11+1)] : weight > 10 ? colorItems[Math.floor(Math.random()*11+1)] : colorItems[Math.floor(Math.random()*11+1)]"
                                :rotation="([, weight]) => weight > 19 ? rotationItems[0] : weight > 18 ? rotationItems[Math.floor(Math.random()*2)] : weight > 17 ? rotationItems[Math.floor(Math.random()*2)] : weight > 16 ?  rotationItems[Math.floor(Math.random()*2)] : weight > 15 ? rotationItems[Math.floor(Math.random()*2)] : rotationItems[Math.floor(Math.random()*2)]"
                                :spacing = spacing
                                :enter-animation = enterAnimation
                                :animation-duration = 5000
                        >
                            <template slot-scope="{text, weight , word}" >
                                <div :title="word" style="cursor: pointer;" @click="onWordClick(text)">
                                    {{ text }}
                                </div>
                            </template>
                        </vue-word-cloud>

                        <div class="searchbg">
                            <div class="mc_search">

                                <div class="search3box">
                                    <div id="divTabWant1" class="divTabWantGroup">
                                        <div class="searchcont1">
                                            <ul >
                                               <li v-if="isAnyCar">
                                                   <span style="font-size: 25px">선택하신 키워드 : <b>{{selectedItem}}</b></span><br/>
                                                   <span  style="font-size: 20px">  <b>제품</b> 관련 키워드로 <b>RPM 보유 상품</b>을 우선으로 보여 드립니다.</span><br/>
                                               </li>
                                                <li v-if="isAnyArticle && !isAnyCar">
                                                    <span style="font-size: 25px"> 선택하신 키워드 : <b>{{selectedItem}}</b></span><br/>
                                                    <span style="font-size: 20px">  <b>기사</b> 관련 키워드로 <b>기사</b>를 보여 드립니다.</span><br/>
                                               </li>
                                                <li v-if="!isAnyArticle && !isAnyCar">
                                                   <span style="font-size: 25px">  최근 2년간 기사의 형태소를 분석하여 워드 크라우드로 보여드립니다.</span><br/>
                                                    <span style="font-size: 15px"> 관심있는 <b>키워드</b>를 선택하시면 관련 내용을 확인하실 수 있습니다. </span>
                                               </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <CarList v-if="isAnyCar" />
                    <ArticleList v-if="isAnyArticle" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import CarList from '@/components/magazine/MagazineCarList'
    import ArticleList from '@/components/magazine/MagazineArticle'
    let enterAnimation = {opacity: 0, transform: 'scale3d(0.3,0.3,0.3)'};
    import VueWordCloud from 'vuewordcloud';
    import { mapState } from 'vuex';

    export default {
        components: {
            VueWordCloud: VueWordCloud,
            CarList,
            ArticleList
        },
        data() {
            return {
                enterAnimation: enterAnimation,
                selectedItem: '',
                colorItems: ['#ffd077', '#3bc4c7', '#3a9eea', '#ff4e69', '#461e47','#31a50d', '#d1b022', '#74482a','#d99cd1', '#c99cd1', '#b99cd1', '#a99cd1'],
                rotationItems : [0, 3/4],
                spacingValues: [0, 1/4, 1/2, 1, 2]

            }
        },
        computed : {
            ...mapState( {
                wordList : state => state.magazine.wordList,
                articleList : state => state.articleList,
                carsList : state => state.carsList
            }),
            isAnyCar : function(){
                return (this.$store.state.magazine.carsList.length>0)
            },
            isAnyArticle : function(){
                return (this.$store.state.magazine.articleList.length>0)
            },
            spacing: function() {
                return this.spacingValues[1];
            }
        },
        methods: {
            onWordClick(item) {
                    this.selectedItem = item
                    this.$store.dispatch('magazine/aiEditor' , item )
            }
        },
        created() {
            this.$store.dispatch('magazine/getExtractWord')
            let vue = document.createElement('script')
            let vue2 = document.createElement('script')
            vue.setAttribute('src', 'https://unpkg.com/vue')
            vue2.setAttribute('src', 'https://unpkg.com/vuewordcloud')
            document.head.appendChild(vue)
            document.head.appendChild(vue2)

        }
    }
</script>
<style scoped>
    .main_content{
        padding-bottom: 50px; text-align: center;
    }
    .mc_header{
        max-height:800px;
    }
    .mc_wide_searchbox{  width:1212px; background: #ffffff;height:603px;position:relative;display:inline-block; z-index:2; margin-bottom:50px;}
    .mc_wide_searchbox .searchbg{ margin-top: 50px; width:100%; background:url( https://www.kcar.com/resources/images/index/search_bg.png) center no-repeat; opacity: 0.97; display:inline-block;}
    .mc_wide_searchbox .searchbg .mc_search{margin: 0px auto 0 auto;z-index:2; }
    .mc_search .selectric-items .selectric-scroll {
        overflow-x: hidden;
        overflow-y: auto;
    }
    .fst{
        opacity: 0.97; display:inline-block;
    }
    .wrap_section{max-width:1112px;margin:0 auto}
    .area_section {background-color: aliceblue; margin-top: 150px;}
</style>