<template>
    <div id="wrap">
        <link rel="shortcut icon" href="https://www.kcar.com/resources/images/common/favicon.ico" type="image/x-icon">
        <link rel="icon" href="https://www.kcar.com/resources/images/common/favicon.ico" type="image/x-icon">
        <link rel="apple-touch-icon-precomposed"
              href="https://www.kcar.com/resources/images/mobile/common/apple-touch-icon.png">
        <link rel="stylesheet" type="text/css"  href="css/re_import.css">
        <link rel="stylesheet" type="text/css"   href="css/re_trade.css">
        <link rel="stylesheet" type="text/css"   href="css/plugin/selectric.css">
        <div id="headerNew" class="header_new">
        </div>
        <div id="content">
            <div id="sub_content">
                <div class="carSearch_cont">
                    <div class="detail_box">
                        <div class="box_top">
                            <h3>차량 검색</h3>
                            <a href="#" id="resetBtn" class="reset" @click="reset()">초기화</a>
                        </div>
                        <div class="quick_search">
                            <div class="ip_field">
                                <input type="text" name="quickSearch" id="searchWord" v-model="searchWord" placeholder="준비중입니다.."
                                       autocomplete="off" v-on:keyup.enter="searchWithCondition()" >
                                <label for="quickSearch">검색아이콘</label>
                                <ul class="drop_box"></ul>
                            </div>
                        </div>
                        <div class="sel_field">
                            <hr/>
                        </div>
                        <ul class="search_list_wrap">
                            <li class="list_h list_h01 " id="list_h list_h01 ">
                                <a class="type"  @click="bigCategoryIsOpen(`list_h list_h01 `)" >차종 <small></small></a>
                                <div class="sub_type_list sub_type_tree" >
                                    <ul class="row_list">
                                        <li v-for="category of categoryList"
                                            :key="category.code">
                                            <div class="checker" :id="category.code"><span :class="{checked:category.checked}" @click="conditionSelector(category)">
                                                <input type="checkbox"
                                                                                                      name="categoryList"
                                                                                                      :id="category.code"
                                                                                                      class="uniform"
                                                                                                      :v-bind="category.name"
                                            ></span>
                                            </div>
                                            <label :for="category.code">{{category.name}}</label>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li class="list_h list_h02 on"  id="list_h list_h02 on">
                                <a class="type" @click="bigCategoryIsOpen(`list_h list_h02 on`)">제조사/모델<small></small></a>
                                <div class="sub_type_list sub_type_tree" >
                                    <div class="scroll-wrapper scrollbar-dynamic" style="position: relative;" >
                                        <div id="makerFrame"
                                             class="scrollbar-dynamic scroll-content scroll-sscrolly_visible"
                                             style="height: auto; margin-bottom: 0px; margin-right: 0px; max-height: 229px;">
                                            <ul class="tree" style="display: block;" >
                                                <li id="false"
                                                    v-for="maker of makerList" :key="maker.code" >
                                                    <div class="row false">
                                                    <span class="txt"><div class="checker" id="uniform-v_makecd">
                                                    <span :class="{checked:maker.checked}" @click="conditionSelector(maker)" >
                                                        <input type="checkbox" id="v_makecd0" name="v_makecd" class="uniform maker">
                                                    </span></div>
                                                    <label for="v_makecd0">{{maker.name}}</label></span><span class="count">
                                                    </span><span class="count">{{maker.count}}</span>
                                                    </div>
                                                <ul class="tree" style="display: block;" v-show="modelListIsOpen" >
                                                            <li v-for="model of modelList" :key="model.code">
                   <div class="row false">
                       <span class="txt">
                       <div class="checker" id="uniform-v_model_grp_cd0">
                           <span :class="{checked:model.checked}" @click="conditionSelector(model)" >
                               <input type="checkbox" id="v_model_grp_cd0" name="v_model_grp_cd" class="uniform maker" value="001" data-v_model_grp_cd="001" data-count="59" data-v_makecd="001" data-v_model_grp_nm="i30" data-v_makenm="현대" data-v_car_type="KOR" data-beusable-tracking="">
                           </span>
                       </div>
                       <label for="v_model_grp_cd0">{{model.name}}</label>
                       </span>
                       <span class="count">{{model.count}}</span>
                   </div>
                                                </li>
                                            </ul>

                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="list_h list_h05 on" id="list_h list_h05 on">
                                <a class="type"   @click="bigCategoryIsOpen('list_h list_h05 on')">가격<small></small></a>
                                <div class="sub_type_list" data-init="true" >
                                    <div class="selectric-wrapper selectric-selectric selectric-below selectric-hover"
                                         id="selectMinPrice"   @click="selectBoxChanger(`selectMinPrice`)" >
                                        <div class="selectric-hide-select" >
                                            <select name="wr_gt_v_mfr_date"
                                                    v-for="minPrice of minPriceList" :key="minPrice.code"
                                                    id="modelYear01" class="selectric" ata-unit="년">
                                            <option value="startYear.code"> {{minPrice.name}}</option>
                                        </select></div>
                                        <div class="selectric"><span class="label" >{{selectedMinPrice.name}}</span></div>
                                        <div class="selectric-items" tabindex="-1"  id = "minPrice" style="width: 120px; height: 300px;">
                                            <div class="selectric-scroll">
                                                <ul v-for="minPrice of minPriceList" :key="minPrice.code">
                                                    <li @click="setSelectBoxCondition(minPrice)" >{{minPrice.name}}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <input class="selectric-input" tabindex="0"></div>
                                    <span class="wave">~</span>
                                    <div class="selectric-wrapper selectric-selectric selectric-hover" id="selectMaxPrice"   @click="selectBoxChanger(`selectMaxPrice`)"  >
                                        <div class="selectric-hide-select"><select name="wr_lt_v_mfr_date"
                                                                                   id="modelYear02" class="selectric"
                                                                                   data-unit="년"
                                                                                   tabindex="-1"
                                                                                   v-for="maxPrice of maxPriceList" :key="maxPrice.code">
                                            <option value="endYear.code"> {{maxPrice.name}}</option>
                                        </select></div>
                                        <div class="selectric"><span class="label" data-beusable-tracking="">{{selectedMaxPrice.name}}</span></div>
                                        <div class="selectric-items" tabindex="-1" id = "maxPrice"  style="width: 120px; height: 300px;">
                                            <div class="selectric-scroll">
                                                <ul  v-for="maxPrice of maxPriceList" :key="maxPrice.code">
                                                    <li @click="setSelectBoxCondition(maxPrice)">{{maxPrice.name}}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <input class="selectric-input" tabindex="0"></div>
                                </div>
                            </li>
                           <li class="list_h list_h04 on" id="list_h list_h04 on">
                                <a class="type"   @click="bigCategoryIsOpen(`list_h list_h04 on`)">주행거리<small></small></a>
                                <div class="sub_type_list"  data-init="true"  >
                                    <div class="selectric-wrapper selectric-selectric selectric-below selectric-hover"
                                        id="selectMinMileage"   @click="selectBoxChanger(`selectMinMileage`)">
                                        <div class="selectric-hide-select"><select name="wr_gt_n_Milage"
                                                                                   id="distance01" class="selectric"
                                                                                   data-unit="km" data-bro="Milage"
                                                                                   v-for="minMilage of minMilages"
                                                                                   :key="minMilage.code"
                                                                                   tabindex="-1"
                                                                                   >
                                            <option :value="minMilage.code"> {{minMilage.name}} </option>
                                        </select></div>
                                        <div class="selectric"><span class="label">{{selectedMinMilage.name}}</span></div>
                                        <div class="selectric-items" tabindex="-1" id = "minMilage" style="width: 120px; height: 300px;">
                                            <div class="selectric-scroll" >
                                                <ul v-for="minMilage of minMilages" :key="minMilage.code">
                                                    <li @click="setSelectBoxCondition(minMilage)">{{minMilage.name}}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <input class="selectric-input" tabindex="0"></div>
                                    <span class="wave">~</span>
                                    <div class="selectric-wrapper selectric-selectric selectric-below selectric-hover"
                                          id="selectMaxMileage"   @click="selectBoxChanger(`selectMaxMileage`)">
                                        <div class="selectric-hide-select"><select name="wr_lt_n_Milage"
                                                                                   id="distance02" class="selectric"
                                                                                   v-for="maxMilage of maxMilages"
                                                                                   :key="maxMilage.code"
                                                                                   tabindex="-1"
                                                                                   >
                                            <option :value="maxMilage.code">{{maxMilage.name}}</option>
                                        </select></div>
                                        <div class="selectric"><span class="label">{{selectedMaxMilage.name}}</span></div>
                                        <div class="selectric-items" tabindex="-1"  id="maxMilage" style="width: 120px; height: 300px;">
                                            <div class="selectric-scroll">
                                                <ul v-for="maxMilage of maxMilages" :key="maxMilage.code">
                                                    <li @click="setSelectBoxCondition(maxMilage)"> {{maxMilage.name}}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <input class="selectric-input" tabindex="0"></div>
                                </div>
                            </li>
                            <li class="list_h list_h07" id="list_h list_h07" >
                                <a class="type" @click="bigCategoryIsOpen(`list_h list_h07`)">연료 <small></small></a>
                                <div class="sub_type_list">
                                    <ul class="row_list"  v-for="fuelType of fuelTypeList" :key="fuelType.code">
                                        <li>
                                            <div class="checker" id="uniform-carFuel1"><span :class="{checked:fuelType.checked}" @click="conditionSelector(fuelType)"><input type="checkbox"
                                                                                                    name="fuelTypeList"
                                                                                                    id="fuelTypeList"
                                                                                                    class="uniform"
                                                                                                    value="fuelType.code"></span>
                                            </div>
                                            <label for="carFuel1">{{fuelType.name}} </label>
                                        </li>
                                        <li>
                                        </li>
                                    </ul>
                    </div>
                            </li>
                            <li class="list_h list_h12" id="list_h list_h12">
                                <a class="type"   @click="bigCategoryIsOpen(`list_h list_h12`)">지역 <small></small></a>
                                <div class="sub_type_list sub_type_tree"  >
                                    <div class="scroll-wrapper scrollbar-dynamic" style="position: relative;">
                                        <div class="sscrollbar-dynamic scroll-content scroll-sscrolly_visible"
                                             style="height: 260px; margin-bottom: 0px; margin-right: 0px; max-height: none;">
                                            <ul class="tree">
                                                <li class="dep01" v-for=" region of regionList" :key="region.code">
                                                    <div class="row">
<span class="txt">
<div class="checker" id="uniform-areaL1"><span :class="{checked:region.checked}" @click="conditionSelector(region)"><input type="checkbox" name="wr_in_v_center_region_code" id="areaL1"
                                                      class="uniform" value="region.code"></span></div>
<label for="areaL1">{{region.name}}</label>
</span>
</div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="scroll-element scroll-x">
                                            <div class="scroll-element_outer">
                                                <div class="scroll-element_size"></div>
                                                <div class="scroll-element_track"></div>
                                                <div class="scroll-bar"></div>
                                            </div>
                                        </div>
                                        <div class="scroll-element scroll-y">
                                            <div class="scroll-element_outer">
                                                <div class="scroll-element_size"></div>
                                                <div class="scroll-element_track"></div>
                                                <div class="scroll-bar"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>

                    </div>
                    <div class="result_box_wrap">
                        <ul class="choice_area">
                            <li v-for="checkedItem of checkedItems" :key="checkedItem.code">{{checkedItem.name}}<span class="close" @click="conditionSelector(checkedItem)">닫기</span></li>
                        </ul> <!-- 검색 선택 항목 javascript -->
                        <div class="until_box">
                            <div class="top_field">
                                <div id="totalCount" class="total">총 <strong>{{this.$store.state.contents.resultLength}}</strong>대</div>
                                <div class="hit"></div>
                                <div id="headerCustom">
                                    <div class="primary">
                                    <div class="inner1">
                                    <ul class="util_link">
                                        <li class="recent">
                                            <router-link to="/seencar">
                                                <i class="ico"></i>최근본차량
                                                <span class="badge">{{seenHistoryList.length}}</span>
                                            </router-link>
                                        </li>
                                    </ul>
                                </div>
                                </div>
                                </div>
                            </div>
                            <div class="align_field">
                                <div class="align" >
                                    <span><a href="javascript:;" class="3dview_flag txt " name="wr_eq_v_3dview_flag"><em></em> </a></span>
                                    <span class="basic" v-for=" orderBysub of orderBySubs" :key="orderBysub.index" >
                                        <a href="javascript:;" v-for=" orderBysubDetail of orderBysub.value " :key="orderBysubDetail.name" :class="orderBysubDetail.class" @click="orderBy(orderBysubDetail)" >{{orderBysubDetail.name}}</a>
                                    </span>
                                </div>
                                <div class="detail_check">
                                    <div class="count_sel">
                                        <div id="carCnt" @click="searchKeyClick(`carCnt`)"
                                             class="selectric-wrapper selectric-selectric selectric-below">
                                            <div class="selectric-hide-select"><select name="limit" id="listCount"
                                                                                       class="selectric"
                                                                                       data-beusable-tracking=""
                                                                                       tabindex="-1"
                                            v-for="limit of limits" :key="limit.name">
                                                <option value="limit">{{limit}}개</option>
                                            </select></div>
                                            <div class="selectric" style="width: 100px;"><span class="label"
                                                                         data-beusable-tracking="" >{{this.$store.state.contents.pageLimit}}개씩보기</span></div>
                                            <div class="selectric-items" tabindex="-1" style="width: 100px;">
                                                <div class="selectric-scroll">
                                                    <ul  v-for="limit of limits" :key="limit.name">
                                                        <li data-index="0" @click="clickPageLimit(limit)">{{limit}}개씩보기</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <input class="selectric-input" tabindex="0"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="result_list">
                            <table>
                                <caption>차량검색결과</caption>

                                <colgroup>table
                                    <col style="width: 190px;">
                                    <col style="width: 300px;">
                                    <col style="width: 280px;">
                                    <col>
                                </colgroup>

                                <tbody>
                                <td class="empty_result" colspan="4" v-show="searchResultEmpty"><p><span>찾으시는 조건의 차량이 없습니다!</span>다른 검색어를 입력해주세요.</p>
                                    <img src="https://www.kcar.com//resources/images/common/ico_empty.jpg" alt="차량없음 이미지">
                                </td>
                                <tr v-for="showCar of showCarList" :key="showCar.carcd" >
                                    <td class="thumb">
                                        <a href="#" >
                                            <div class="mark_area"></div>
                                            <img @click="productClick(showCar)" :src="showCar.middleImg" alt="자동차 썸네일">
                                        </a>
                                    </td>
                                    <td class="car_info">
                                        <a class="name" @click="productClick(showCar)" target="_blank">
                                        {{showCar.truckName}}
                                        </a>
                                        <span class="md_year">{{ showCar.mfrDate | mfrDateFormatter }} &nbsp; ({{ showCar.beginYear | beginYearFormatter }}년형)&nbsp;{{ showCar.milage | thousandFormatter }}km &nbsp;&nbsp;{{showCar.fuelTypecdName}}</span>
                                    <span class="price">{{ showCar.price | thousandFormatter }}만원 <em></em></span>
                                    <a href=""><span
                                            class="monthly"></span></a>
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
                                                <span>{{showCar.categorynm}}</span><span>&nbsp;</span>
                                            </li>
                                            <li>
                                                <span>{{showCar.centerRegion}}</span><span>&nbsp;</span>
                                            </li>
                                            <li>
                                                <span>{{showCar.passCnt}}  인승</span><span>&nbsp;</span>
                                            </li>
                                        </ul>
                                        <span class="online_buy">{{showCar.simpleComment}}</span>
                                    </td>
                                    <td class="btn_area">
                                        <a id="toastid0"
                                           @click="goPayment"
                                           class="oline_btn">온라인 구매</a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <pager v-if="isAny" />
                        <br>
                        <div style="text-align: center" v-if="searchWord===''?false:true">
                            <h3 @click="recommendOn" >
                                다른 유저들이 검색한 '{{searchWord}}'와 같이 검색한 모델이 궁금하세요?

                            </h3>
                            <RecommendChart v-if="recommendFlag"></RecommendChart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState , mapGetters } from 'vuex'
import Pager from '@/components/cmm/Pagination'
import axios from "axios"
import RecommendChart from "./RecommendChart";

export default {
    name: 'searchMain',
    components : { Pager,RecommendChart},
    data() {
        return {
            searchWord: '',
            carcd: '',
            limits : [15,30,45,60],
            orderBySubs : [{index : 1 , value : [{name : "기본정렬", sub : 'default' , selected : true , class : 'txt default' }]},
                { index : 2 , value : [{name : "가격순", sub : 'priceDFT' , selected : false , class : 'txt' },
                {name : "낮은순", sub : 'priceDESC' , selected : false , class : 'down ' },
                {name : "높은순", sub : 'priceASC' , selected : false , class : 'up ' }]},
                { index : 3 , value : [{name : "주행거리순", sub : 'mileageDFT' , selected : false , class : 'txt' },
                {name : "낮은순", sub : 'mileageDESC' , selected : false , class : 'down ' },
                {name : "높은순", sub : 'mileageASC' , selected : false , class : 'up ' }]} ,
                { index : 4 , value : [{name : "연식순", sub : 'beginyearDFT' , selected : false , class : 'txt' },
                {name : "낮은순", sub : 'beginyearDESC' , selected : false , class : 'down ' },
                {name : "높은순", sub : 'beginyearASC' , selected : false , class :  'up ' }]}],
            orderByName : '기본정렬',
            minDefault : { code: 'minDefault' ,name : ` 최 소 ` , bigCategory : 'minDefault' },
            maxDefault : { code: 'maxDefault' ,name : ` 최 대 `, bigCategory : 'maxDefault'  },
            selectedMinPrice : { code: 'selectedMinPrice' , name : ` 최 소 ` , bigCategory : 'minDefault' },
            selectedMaxPrice : { code: 'selectedMaxPrice' , name : ` 최 대 ` , bigCategory : 'maxDefault' },
            selectedMinMilage : { code: 'selectedMinMilage' , name : ` 최 소 ` , bigCategory : 'minDefault' },
            selectedMaxMilage : { code: 'selectedMaxMilage' , name : ` 최 대 ` , bigCategory : 'maxDefault' },
            recommendFlag : false
        }
    },
    computed: {
        ...mapState({
            showCarList : state => state.contents.showCarList,
            categoryList: state => state.contents.categoryList,
            makerList: state => state.contents.makerList,
            fuelTypeList: state => state.contents.fuelTypeList,
            regionList: state => state.contents.regionList,
            searchResultEmpty : state => state.contents.searchResultEmpty,
            checkedItems : state => state.contents.checkedItems,
            seenHistoryList : state => state.contents.seenHistoryList,
            modelListIsOpen : state => state.contents.modelListIsOpen,
            modelList : state => state.contents.modelList
        }),
        ...mapGetters( 'cmm' , {
            initFlag : 'initFlag'
        }),
        isAny : function(){
            return (this.$store.state.contents.showCarList.length>0)
        },
        minPriceList : function(){
            let list = [this.minDefault]
            for( let i = 1 ; i <= 20 ; i++ ){
                list.push({ code : `${i*100}` , name : this.thousandFormatter(i*100)+`만원`, bigCategory : 'minPrice' })
            }
            return list
        },
        maxPriceList : function(){
            let list = [this.maxDefault]
            for( let i = 1 ; i <= 20 ; i++ ){
                list.push({ code : `${i*100}` , name : this.thousandFormatter(i*100)+`만원`, bigCategory : 'maxPrice' })
            }
            return list
        },
        minMilages : function(){
            let list = [this.minDefault]
            for( let i = 1 ; i <= 20 ; i++ ){
                list.push({ code : `${i*1000}` , name : `${i}0,000km`, bigCategory : 'minMilage' })
            }
            return list
        },
        maxMilages : function(){
            let list = [this.maxDefault]
            for( let i = 1 ; i <= 20 ; i++ ){
                list.push({ code : `${i*1000}` , name : `${i}0,000km`, bigCategory : 'maxMilage' })
            }
            return list
        }
    },
    methods: {
        conditionSelector( targetItem ){
            this.searchWord =  ''
            if ( targetItem.bigCategory === 'makerList' ) this.$store.dispatch( 'contents/treeConditionControl' , targetItem )
            this.$store.dispatch('contents/conditionSelector', targetItem , { root: true })
            if ( targetItem.bigCategory.indexOf( 'Range' ) > 0 ) this.resettingSelectBox( targetItem.bigCategory )
            this.searchWithCondition()
        },

        searchKeyClick( searchKeyID ) {
            const searchKey = document.getElementById( searchKeyID )
            searchKey.className = (searchKey.className === "selectric-wrapper selectric-selectric selectric-below")
                        ? "selectric-wrapper selectric-selectric selectric-below selectric-open"
                        : "selectric-wrapper selectric-selectric selectric-below"
        },
        setSelectBoxCondition ( param ) {
            switch ( param.bigCategory ) {
                case 'minPrice' :
                    this.selectedMinPrice = param
                    break
                case 'maxPrice' :
                    this.selectedMaxPrice = param
                    break
                case 'minMilage' :
                    this.selectedMinMilage = param
                    break
                case 'maxMilage' :
                    this.selectedMaxMilage = param
                    break
            }
            this.selectBoxRangeSetter()
            this.searchWithCondition()
        },
        selectBoxChanger( targetItem ){
            const searchKey = document.getElementById( targetItem )
            if(searchKey.className === "selectric-wrapper selectric-selectric selectric-below selectric-hover"){
                for (let elementsByClassNameElement of document.getElementsByClassName("selectric-wrapper selectric-selectric selectric-below selectric-hover selectric-open selectric-focus")) {
                    elementsByClassNameElement.className = "selectric-wrapper selectric-selectric selectric-below selectric-hover"
                }
                searchKey.className = "selectric-wrapper selectric-selectric selectric-below selectric-hover selectric-open selectric-focus"
            }else{
                searchKey.className = "selectric-wrapper selectric-selectric selectric-below selectric-hover"
            }

        },
        addHistory( carItem ){
            this.$store.dispatch( 'contents/addSeenHistory' , carItem )
        },
        productClick(carItem){
            let userid = ''
            if(this.$store.state.user.auth)
                userid = this.$store.state.user.user.userid
            else
                userid = this.$store.state.contents.guestid
            axios
                .get(`http://localhost:8080/setProduct/`+carItem.carcd+'/'+new Date().toISOString().replace(/[^0-9]/g,"")+'/'+userid)
                .then(()=>{
                    this.addHistory(carItem)
                    this.$store.dispatch('contents/setProduct',carItem)
                    this.$router.push('/product')
                })
                .catch(()=>{
                    alert('잘못된 요청입니다.')
                })

        },
        bigCategoryIsOpen( categoryType ) {
            const searchConditionCategory = document.getElementById( categoryType )
            searchConditionCategory.className = ( searchConditionCategory.className.substr(-2, 2) === 'on')
                        ? (searchConditionCategory.className.replace(' on' , '' ))
                        : searchConditionCategory.className = searchConditionCategory.className + " on"
        },
        searchWithCondition() {
            let checkedCategoryList = []
            let checkedModelList = []
            let checkedFuelTypeList = []
            let checkedRegionList = []
            let maker = ''

            this.$store.state.contents.checkedItems.forEach( item => {
                switch ( item.bigCategory ) {
                    case 'categoryList':
                        checkedCategoryList.push( item )
                        break
                    case 'makerList':
                        maker = item
                        break
                    case 'fuelTypeList':
                        checkedFuelTypeList.push( item )
                        break
                    case 'regionList':
                        checkedRegionList.push( item )
                        break
                    case 'modelList':
                        checkedModelList.push( item )
                        break
                }
            })

            let selectedConditionData = {
                    categoryList : checkedCategoryList,
                    modelList : checkedModelList,
                    fuelTypeList : checkedFuelTypeList,
                    regionList : checkedRegionList,
                    carcd : this.carcd,
                    pageLimit : this.$store.state.contents.pageLimit,
                    maker : maker.code,
                    orderBySub : this.$store.state.contents.orderBySub,
                    minPrice : this.selectedMinPrice,
                    maxPrice : this.selectedMaxPrice,
                    minMilage : this.selectedMinMilage,
                    maxMilage : this.selectedMaxMilage,
                    modelText : this.searchWord
            }

            this.$store.dispatch( 'contents/searchWithCondition', selectedConditionData )
        },
        selectBoxRangeSetter () {
            console.log(this.selectedMinPrice.bigCategory + this.selectedMinPrice.name)
            if ( this.selectedMinPrice.bigCategory.indexOf('Default') < 0  ) {
                this.$store.dispatch('contents/conditionSelectorBySelectBox', this.selectedMinPrice , { root: true })
            }
            if ( this.selectedMaxPrice.bigCategory.indexOf('Default') < 0  ) {
                this.$store.dispatch('contents/conditionSelectorBySelectBox', this.selectedMaxPrice , { root: true })
            }
            if ( this.selectedMinMilage.bigCategory.indexOf('Default') < 0  ) {
                this.$store.dispatch('contents/conditionSelectorBySelectBox', this.selectedMinMilage , { root: true })
            }
            if ( this.selectedMaxMilage.bigCategory.indexOf('Default') < 0  ) {
                this.$store.dispatch('contents/conditionSelectorBySelectBox', this.selectedMaxMilage , { root: true })
            }
        },
        clickPageLimit( pageLimit ){
            this.$store.dispatch('contents/pageLimitSetting', pageLimit)
            this.searchWithCondition()
        },
        orderBy(orderByValue){
            let selectedOrderCondition = '';
            for (let i = 0; i < this.orderBySubs.length ; i++) {
                for (let j = 0; j < this.orderBySubs[i].value.length ; j++) {
                    if ( this.orderBySubs[i].value[j].sub === this.orderByName) this.orderBySubs[i].value[j].class = this.orderBySubs[i].value[j].class.replace( 'on' , '')
                }
            }

            if ( orderByValue.sub === 'default' ) {
                selectedOrderCondition = 'default'
            } else if ( orderByValue.sub.indexOf('DFT') > 0 ) {
                switch (orderByValue.sub.replace('DFT', '')) {
                    case 'price' :
                        if (this.orderBySubs[1].value[1].sub != this.orderByName && this.orderBySubs[1].value[2].sub != this.orderByName) {
                            this.orderBySubs[1].value[1].class += 'on'
                            selectedOrderCondition = this.orderBySubs[1].value[1].sub
                        } else if (this.orderBySubs[1].value[1].sub === this.orderByName) {
                            this.orderBySubs[1].value[2].class += 'on'
                            selectedOrderCondition = this.orderBySubs[1].value[2].sub
                        } else {
                            this.orderBySubs[1].value[1].class += 'on'
                            selectedOrderCondition = this.orderBySubs[1].value[1].sub
                        }
                        break
                    case 'mileage' :
                        if (this.orderBySubs[2].value[1].sub != this.orderByName && this.orderBySubs[2].value[2].sub != this.orderByName) {
                            this.orderBySubs[2].value[1].class += 'on'
                            selectedOrderCondition = this.orderBySubs[2].value[1].sub
                        } else if (this.orderBySubs[2].value[1].sub === this.orderByName) {
                            this.orderBySubs[2].value[2].class += 'on'
                            selectedOrderCondition = this.orderBySubs[2].value[2].sub
                        } else {
                            this.orderBySubs[2].value[1].class += 'on'
                            selectedOrderCondition = this.orderBySubs[2].value[1].sub
                        }
                        break
                    case 'beginyear' :
                        if (this.orderBySubs[3].value[1].sub != this.orderByName && this.orderBySubs[3].value[2].sub != this.orderByName ) {
                            this.orderBySubs[3].value[1].class += 'on'
                            selectedOrderCondition = this.orderBySubs[3].value[1].sub
                        } else if (this.orderBySubs[3].value[1].sub === this.orderByName) {
                            this.orderBySubs[3].value[2].class += 'on'
                            selectedOrderCondition = this.orderBySubs[3].value[2].sub
                        } else {
                            this.orderBySubs[3].value[1].class += 'on'
                            selectedOrderCondition = this.orderBySubs[3].value[1].sub
                        }
                        break
                    }
                } else if (orderByValue.sub.indexOf('DFT') < 0) {
                        orderByValue.class += 'on'
                        selectedOrderCondition = orderByValue.sub
                }
                    this.orderByName = selectedOrderCondition
                    this.$store.dispatch('contents/orderBySubSetting', this.orderByName)
                    //this.searchWord =  ''
                    this.searchWithCondition()
        },

        setStartOrmaxPrice ( param ) {
            switch ( param.bigCategory ) {
                case 'minPrice' :
                    this.selectedMinPrice = param
                    break
                case 'maxPrice' :
                    this.selectedMaxPrice = param
                    break
            }
            this.searchWord =  ''
            this.searchWithCondition()
        },
        setStartOrmaxMilage ( param ) {
            switch ( param.bigCategory ) {
                case 'minMilage' :
                    this.selectedMinMilage = param
                    break
                case 'maxMilage' :
                    this.selectedMaxMilage = param
                    break
            }
            this.searchWord =  ''
            this.searchWithCondition()
        },

        reset () {
            this.searchWord =  ''
            this.recommendFlag = false
            this.resettingSelectBox( 'All' )
            this.$store.dispatch('contents/resetCheckedItem')
            this.$store.dispatch('contents/init')
        },
        resettingSelectBox ( target ) {
            if ( target === 'PriceRange' ) {
                this.selectedMinPrice = this.minDefault
                this.selectedMaxPrice = this.maxDefault
            } else if ( target === 'MilageRange' ) {
                this.selectedMinMilage = this.minDefault
                this.selectedMaxMilage = this.maxDefault
            } else {
                this.selectedMinPrice = this.minDefault
                this.selectedMaxPrice = this.maxDefault
                this.selectedMinMilage = this.minDefault
                this.selectedMaxMilage = this.maxDefault
            }
        },
        thousandFormatter ( value ) {
            if ( !value ) return ''
            if( value.toString().length === 3) return value
            value = value.toString()
            return value.slice( 0 , value.length-3)+`,`+ value.slice(-3,value.length)
        },
        goPayment(){
            if(this.$store.state.user.auth)
                this.$router.push('/payment')
            else{
                alert(`로그인이 필요한 서비스입니다.`)
                this.$router.push('/login')
            }
        },
        recommendOn(){
            this.recommendFlag = true
        }
    },
    filters: {
        mfrDateFormatter: function ( value ) {
            if ( !value ) return ''
            value = value.toString()
            return value.slice(2,4)+`년` + value.slice(4,6)+`월식`
        },
        beginYearFormatter: function ( value ) {
            if ( !value ) return ''
            value = value.toString()
            return value.slice(2,4)+``
        },
        thousandFormatter: function ( value ) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    },
    created() {
        if (!this.$store.state.contents.initFlag)
            this.$store.dispatch('contents/init')

        let mainConditionSettingFlag = this.$store.state.contents.mainConditionSettingFlag
        if ( mainConditionSettingFlag !== false) {
            switch ( mainConditionSettingFlag ) {
                case 'withModel' :
                    this.searchWord = this.$store.state.contents.modelTextFromMain
                    break
                case 'withBudget' :
                    this.selectedMinPrice = this.$store.state.contents.minPriceFromMain
                    this.selectedMaxPrice = this.$store.state.contents.maxPriceFromMain
                    this.selectBoxRangeSetter()
                    break
                case 'stringMatch' :
                    this.searchWord = this.$store.state.contents.modelTextFromMain
                    break
            }
            this.searchWithCondition()
            if ( mainConditionSettingFlag === 'stringMatch' ) this.$store.dispatch('contents/stringMatchModelCHecker')
            }
        },
    destroyed(){
        this.reset()
    }
}    

</script>
<style scoped>
    .main_content{
        padding-bottom: 50px;
    }
    #searchbg{
        padding-bottom: 300px;
    }
    .mc_wide_searchbox{width:100%;background:#191b1a /*#F1F2F4 url( /resources/images/index/pc_index_visual_1112.jpg) top center no-repeat*/;opacity: 0.97;height:903px;position:relative;display:inline-block; z-index:1; margin-bottom:57px;}
    .mc_wide_searchbox .searchbg{width:100%;background:url( https://www.kcar.com/resources/images/index/search_bg.png) center no-repeat; opacity: 0.97; display:inline-block;}
    .mc_wide_searchbox .searchbg .mc_search{    margin: 0px auto 0 auto; }
    .mc_search .selectric-items .selectric-scroll {
        overflow-x: hidden;
        overflow-y: auto;
    }

</style>
