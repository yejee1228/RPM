<template>
    <div>
        <div id='app'>
            <link rel="stylesheet" type="text/css"  href="css/magazine.css">
            <link rel="stylesheet" type="text/css"  href="css/re_import.css">
            <link rel="stylesheet" type="text/css"   href="css/re_trade.css">
           <div ></div>
            <div id="content">
                <div class="main_content">
                    <!--검색-->
                    <div class = "mc_header">
                    <div class="mc_wide_searchbox">
                        <vue-word-cloud
                                :words="wordList"
                                font-family="맑은 고딕"
                                :enter-animation="enterAnimation"
                                :color="([, weight]) => weight > 19 ? colorItems[Math.floor(Math.random()*11+1)] : weight > 16 ? colorItems[Math.floor(Math.random()*11+1)] : weight > 12 ? colorItems[Math.floor(Math.random()*11+1)] : weight > 8 ?  colorItems[Math.floor(Math.random()*11+1)] : weight > 4 ? colorItems[Math.floor(Math.random()*11+1)] : colorItems[Math.floor(Math.random()*11+1)]"
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
                                               <li >
                                                    <span class="tit">
                                                        <strong class="all_car_cnt">{{selectedItem}}{{Math.floor(Math.random()*11+1)}}</strong></span>
                                               </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="result_list" >
                            <table>
                                <caption>관심차량</caption>
                                <colgroup>
                                    <col style="width: 55px;">
                                    <col style="width: 190px;">
                                    <col style="width: 485px;">
                                    <col style="width: 290px;">
                                    <col>
                                </colgroup>

                                <tbody>
                                <tr v-for="car of this.$store.state.magazine.carsList" :key="car.carcd">
                                    <td class="thumb">
                                        <a href="#" >
                                            <div class="mark_area"></div>
                                            <img :src="car.middleImg" alt="자동차 썸네일">
                                        </a>
                                    </td>
                                    <td class="car_info">
                                        <ul>
                                            <li>
                                                <router-link to="/product" target="_blank"  >
                                                    <a class="name" @click="addHistory(car)">
                                                        {{car.truckName}}
                                                    </a>
                                                </router-link>
                                            </li>
                                            <li>
                                                <span class="price">{{ car.price | thousandFormatter }}만원 <em></em></span>
                                            </li>
                                            <li>
                                                <span class="md_year">{{ car.mfrDate | mfrDateFormatter }} &nbsp; ({{ car.beginYear | beginYearFormatter }}년형)&nbsp;{{ car.milage | thousandFormatter }}km &nbsp;&nbsp;{{car.fuelTypecdName}}</span>
                                            </li>
                                            <li>
                                                <b>열람 시간 : </b><span class="seenTime"> {{ car.seenTime }} </span>
                                            </li>
                                        </ul>
                                    </td>
                                    <td class="car_opt">
                                        <div class="mark">
                                            <span class="tip_list tip_09"><button type="button" class="tip_btn">특옵션</button> </span>
                                            <span class="tip_list tip_10"><button type="button" class="tip_btn">1인소유</button> <span
                                                    class="tip_hot none"></span></span>
                                            <span class="tip_list tip_26"><button type="button" class="tip_btn">제조사AS</button> <span
                                                    class="tip_hot none"></span></span>
                                        </div>
                                        <ul class="opt_list">
                                            <li>
                                                <span>{{car.categorynm}}</span><span>&nbsp;</span>
                                            </li>
                                            <li>
                                                <span>{{car.centerRegion}}</span><span>&nbsp;</span>
                                            </li>
                                            <li>
                                                <span>{{car.passCnt}}  인승</span><span>&nbsp;</span>
                                            </li>
                                        </ul>
                                        <span class="online_buy">{{car.simpleComment}}</span>
                                    </td>
                                    <td class="btn_area">
                                        <a id="toastid0" href="" class="oline_btn">온라인 구매</a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
                        <div class="area_section">
                            <div class="wrap_section">
                                <ul class="list_tab">
                                    <li class="on"><a href="/abouthyundai" class="link_tab"></a></li>
                                    <li><a href="/abouthyundai?order=view" class="link_tab"></a></li>
                                </ul>
                                <ul class="list_1boon" id="timelinesView" data-order="published">
                                    <li class="fst" v-for="article of  this.$store.state.magazine.articleList " :key="article.aricleId" >
                                        <a :href="article.articleHref" class=" link_1boon">
                                            <span class="thumb_g">
                                                                            <img :src="article.articleImg" data-loaded="true" style="">
                                                                    </span>
                                            <div class="detail_sub">
                                                <strong class="tit_thumb">{{article.subject}}</strong>
                                                <span class="txt_number txt_new"><span class="txt_g">{{article.writer}} | {{article.writeDate}} </span></span>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    let enterAnimation = {opacity: 0, transform: 'scale3d(0.3,0.3,0.3)'};
    import VueWordCloud from 'vuewordcloud';
    import { mapState } from 'vuex'
    export default {
        components: {
            VueWordCloud: VueWordCloud,
        },
        data() {
            return {
                enterAnimation: enterAnimation,
                selectedItem: '',
                colorItems: ['#ffd077', '#3bc4c7', '#3a9eea', '#ff4e69', '#461e47','#31a50d', '#d1b022', '#74482a','#d99cd1', '#c99cd1', '#b99cd1', '#a99cd1']
            }
        },
        computed : {
            ...mapState( {
                wordList : state => state.magazine.wordList,
                articleList : state => state.articleList,
                carsList : state => state.carsList
            })
        },
        methods: {
            onWordClick(item) {
                    this.selectedItem = item
                    this.$store.dispatch('magazine/aiEditor' , item )
            }
        },
        filters: {
            mfrDateFormatter: function (value) {
                if (!value) return ''
                value = value.toString()
                return value.slice(2,4)+`년` + value.slice(4,6)+`월식`
            },
            beginYearFormatter: function (value) {
                if (!value) return ''
                value = value.toString()
                return value.slice(2,4)+``
            },
            thousandFormatter: function (value) {
                if (!value) return ''
                if(value.toString().length === 3) return value
                value = value.toString()
                return value.slice( 0 , value.length-3)+`,`+ value.slice(-3,value.length)
            },
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
    .mc_wide_search{margin-bottom: 57px; }
    .mc_wide_searchbox{  width:1100px; background: #ffffff; height:603px; position:relative; display:inline-block; z-index:2; margin-bottom:27px;}
    .mc_wide_searchbox .searchbg{ margin-top: 50px; width:100%; background:url( https://www.kcar.com/resources/images/index/search_bg.png) center no-repeat; opacity: 0.97; display:inline-block;}
    .mc_wide_searchbox .searchbg .mc_search{margin: 0px auto 0 auto; }
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