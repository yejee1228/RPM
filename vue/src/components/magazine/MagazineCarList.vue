<template>
    <div id="magazineCarList">
        <link rel="stylesheet" type="text/css"  href="css/re_import.css">
        <link rel="stylesheet" type="text/css"   href="css/re_trade.css">
        <div id="content">
            <div id="sub_content">
                <div class="carSearch_cont">
        <div class="result_box_wrap">
            <div class="mc_wide_common">
                <div class="mc_carlist"><h2>키워드 자동차 <a class="more">더보기 </a></h2>
                    <div class="listwrap header_new1">
                        <div class="banner_box1">
                            <div class="banner_inner_box1" id="divRecommendPromotionArea">
                                <div class="bx-wrapper" style="max-width: 1182px;">
                                    <div class="bx-viewport"
                                         style="width: 100%; overflow: hidden; position: relative; height: 389px;">
                                        <ul class="ulRecommendedCar"
                                            style="width: 2215%; position: relative; transition-duration: 0s; transform: translate3d(-1198px, 0px, 0px);">
                                            <li style="float: left; list-style: none; position: relative; width: 279.5px; margin-right: 18px;"
                                                class="bx-clone" v-for="car of this.$store.state.magazine.carsList" :key="car.carcd">
                                                <a  href="/car/info/car_info_detail.do?i_sCarCd=EC60310068"
                                                    target="_blank"> <img :src="car.middleImg"
                                                    data-original="car.middleImg"
                                                    class="lazy" width="280" height="187" alt="car"
                                                    style="display: inline;"> </a> <a href="/" target="_blank"> <span class="model">{{car.truckName}}</span> </a> <span class="year">{{ car.mfrDate | mfrDateFormatter }} &nbsp; &nbsp;&nbsp; &nbsp;{{ car.milage | thousandFormatter }}km </span> <span class="money">{{ car.price | thousandFormatter }}만원</span> <a
                                                    href="javascript:;"><span  class="monthly"></span></a> <span class="mark"><span class="tip_list tip_10"><button type="button" class="tip_btn" onclick=";">1인소유</button>
                                                <span  class="tip_hot none"><b>1인소유<a  href="javascript:closeHotMarkToolTip(this);" class="tip_cl">닫기</a></b><i>소유자 변경 이력이 없는 차량(대여 이력 및 법인 명의 차량 제외)</i></span></span>
                                                <span class="tip_list tip_19"><button type="button"  class="tip_btn"
                                                                                    onclick="openHotMarkToolTip(this);">짧은Km</button> <span class="tip_hot none"><b>짧은Km<a  href="javascript:;" class="tip_cl">닫기</a></b><i>연 10,000km 이내 주행 차량</i></span></span>   </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="bx-controls bx-has-pager bx-has-controls-direction">
                                        <div class="bx-controls-direction"><a class="bx-prev"  @click="prev()">Prev</a><a
                                                class="bx-next"  @click="next()">Next</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "magazineCarList",
        data() {
            return {
                OriginCarsList : this.$store.state.magazine.carsList,
                startIndex : 0 ,
                carsList : this.$store.state.magazine.carsList.slice(1,4)
            }
        },
        computed : {

        },
        methods : {
            prev () {
                this.startIndex = this.startIndex - 4
                this.carsList = this.OriginCarsList.substr(this.startIndex  , 4)
            },
            next () {
                this.startIndex = this.startIndex + 4
                this.carsList = this.OriginCarsList.substr(this.startIndex  , 4)
            }
        },
        filters : {
            mfrDateFormatter: function (value) {
                if (!value) return ''
                value = value.toString()
                return value.slice(2, 4) + `년` + value.slice(4, 6) + `월식`
            },
            beginYearFormatter: function (value) {
                if (!value) return ''
                value = value.toString()
                return value.slice(2, 4) + ``
            },
            thousandFormatter: function (value) {
                if (!value) return ''
                if (value.toString().length === 3) return value
                value = value.toString()
                return value.slice(0, value.length - 3) + `,` + value.slice(-3, value.length)
            }
        }
    }
</script>

<style scoped>
    .carSearch_cont .result_box_wrap {
        float: left;
        width: 880px;
    }
    #content{
        margin-bottom: 0px;
    }

</style>