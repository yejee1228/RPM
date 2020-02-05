<template>
    <div>
        <div id='app'>
            <div style="padding-top: 80px;"></div>
            <div id="content">
                <div class="main_content">
                    <!--검색-->
                    <div class="mc_wide_searchbox">
                        <img src="@/assets/image/mainhome.png" alt="">
                        <div class="searchbg">
                            <div class="mc_search">
                                <div class="search3box">
                                    <div  class="tab_want1 tab_want_menu" data-item="tab1">
                                        <h3><a id="tab1" @click="wantModel" class="on">원하는 모델이 있어요</a></h3>
                                    </div>
                                    <div id="divTabWant1" class="divTabWantGroup">
                                        <!--검색tab1 내용-->
                                        <div class="searchcont1">
                                            <ul>
                                                <li>
                                                    <span class="tit">RPM에서 판매하는 차 <strong class="all_car_cnt">총 {{this.$store.state.contents.carAllCount}}대</strong></span>
                                                    <span class="searchinput">
                              <input type="text" class="placeho modelSearchInput" name="quickSearch" id="quickSearch" @click="searchBoxOn"
                                     v-on:input="searchKeyWord=$event.target.value" @keyup="stringMatchOn"
                                     placeholder=" 모델명을 입력해주세요. 예시)아반떼" maxlength="20" autocomplete="off"><a @click="goSearch" class="hid">검색</a>
                            </span>
                                                    <!--검색기록유-->
                                                    <div id = "searchBox" class="recentlist modelSearchDiv1 modelSearchGroup" style="display:none">
                                                        <h3 class="tit">인기 모델명</h3>
                                                        <div class="recentl">
                                                            <ul v-for="(j,i) of this.$store.state.contents.searchWordRank" :key="i">
                                                                <li class="firstlist"><a @click="stringMatchClick(j.value)">{{j.name}}</a></li>
                                                            </ul>
                                                        </div>
                                                        <h3 class="tit1">최근 검색한 모델명<em>전체삭제</em><a @click="deleteRecentSearchWord('all')"
                                                                                                   class="clb"><img
                                                                src="https://www.kcar.com/resources/images/index/listclose.jpg" width="20"
                                                                height="21" alt="닫기" border="0"></a></h3>
                                                        <div v-if="this.$store.state.contents.recentSearchWord.length>0" class="recentr">
                                                            <ul>
                                                                <li v-for="(j,i) of this.$store.state.contents.recentSearchWord" :key="i">
                                                                    <a @click="stringMatchClick(j)">{{j}}</a><span><a @click="deleteRecentSearchWord('one', j)"><img
                                                                        src="https://www.kcar.com/resources/images/index/listclose.jpg"
                                                                        width="20" height="21" alt="닫기" border="0"></a></span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div v-else-if="this.$store.state.contents.recentSearchWord.length==0" class="recentr">
                                                            <ul>
                                                                <li class="noresult">최근 검색한 모델이 없습니다</li>
                                                            </ul>
                                                        </div>
                                                        <div class="btclose divSearchConHide"><a
                                                                @click="searchBoxOff(`searchBox`)"><img
                                                                src="https://www.kcar.com/resources/images/index/recentclose.jpg" width="44"
                                                                height="20" alt="닫기" border="0"></a></div>
                                                    </div>
                                                    <!--키워드 입력중-->
                                                    <div id = "stringMatch" class="recentlist modelSearchDiv2 modelSearchGroup" style="display: none">
                                                        <h3 class="tit">인기 모델명</h3>
                                                        <div class="recentl">
                                                            <ul v-for="(j,i) of this.$store.state.contents.searchWordRank" :key="i">
                                                                <li class="firstlist"><a @click="stringMatchClick(j.value)">{{j.name}}</a></li>
                                                            </ul>
                                                        </div>

                                                        <!--     <div class="recentr1">
                                                                 <ul>
                                                                     <li class="noresult">추천직영차가 없습니다</li>
                                                                 </ul>
                                                             </div>-->

                                                        <h3 class="tit1">연관 모델명</h3>
                                                        <div class="recentl1" v-if="this.$store.state.contents.stringMatchList.length>0" >
                                                            <ul v-for = "(j,i) of this.$store.state.contents.stringMatchList" :key="i"><li><a @click="stringMatchClick(j)">{{j}}</a></li>
                                                            </ul>
                                                        </div>
                                                        <div class="recentl1" v-else-if="this.$store.state.contents.stringMatchList.length==0" >
                                                            <ul ><li class="noresult">연관 모델이 없습니다</li></ul>
                                                        </div>
                                                        <div class="btclose divSearchConHide"><a @click="searchBoxOff(`stringMatch`)"><img src="https://www.kcar.com/resources/images/index/recentclose.jpg" width="44" height="20" alt="닫기" border="0"></a></div>
                                                    </div>
                                                </li>
                                                <li>
                            <span id="spanMakeType" class="btnl">
                              <a @click="korCar(`korCar`,`impCar`)" id="korCar" class="on" data-item="MAKE_TYPE010">국산차</a>
                              <a @click="impCar(`korCar`,`impCar`,`category1`)" id="impCar" data-item="MAKE_TYPE020">수입차</a>
                            </span>
                                                </li>
                                                <li class="spreset">
                                                    <div class="searchr1">
                                                        <div id="searchKey1" @click="searchKeyClick(`searchKey1`)"
                                                             class="selectric-wrapper selectric-selectric selectric-below selectric-hover">
                                                            <div class="selectric-hide-select">
                                                                <select id="makeList"
                                                                        title="제조사를 선택하세요"
                                                                        class="selectric"
                                                                        data-beusable-tracking=""
                                                                        tabindex="-1"
                                                                        v-for="category of this.$store.state.contents.category1"
                                                                        :key="category.name">
                                                                    <option data-type="MAKE_TYPE010"
                                                                            data-cnt="category.count">{{category.name}}</option>
                                                                </select></div>
                                                            <div class="selectric" ><span class="label"
                                                                                          data-beusable-tracking="" >{{keyWord1}}</span></div>
                                                            <div id = "category1" class="selectric-items" tabindex="-1">
                                                                <div class="selectric-scroll">
                                                                    <ul v-for="category of this.$store.state.contents.category1" :key="category.name">
                                                                        <li data-index="1" @click="setCategory2(category)" class="">{{category.name}}<em>{{category.count}}</em>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <input class="selectric-input" tabindex="0"></div>
                                                    </div>
                                                    <div class="searchr2">
                                                        <div id="searchKey2"  @click="searchKeyClick(`searchKey2`)"
                                                             class="selectric-wrapper selectric-selectric selectric-below selectric-hover">
                                                            <div class="selectric-hide-select"><select
                                                                    id="modelGroupList" title="모델을 선택하세요"
                                                                    class="selectric" data-beusable-tracking=""
                                                                    tabindex="-1"
                                                                    v-for="category of this.$store.state.contents.category2"
                                                                    :key="category.name">
                                                                <option data-type="MAKE_TYPE010"
                                                                        data-cnt="category.count">{{category.name}}</option>
                                                            </select></div>
                                                            <div class="selectric"><span class="label"
                                                                                         data-beusable-tracking="">{{keyWord2}}</span></div>
                                                            <div id = "category2" class="selectric-items" tabindex="-1" >
                                                                <div class="selectric-scroll">
                                                                    <ul v-for="category of this.$store.state.contents.category2" :key="category.name">
                                                                        <li data-index="1" @click="setCategory3(category)" class="">{{category.name}}<em>{{category.count}}</em>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <input class="selectric-input" tabindex="0"></div>
                                                    </div>
                                                    <div class="searchr3">
                                                        <div id="searchKey3" @click="searchKeyClick(`searchKey3`)"

                                                             class="selectric-wrapper selectric-selectric selectric-below selectric-hover">
                                                            <div class="selectric-hide-select">
                                                                <select
                                                                        id="modelList"
                                                                        title="세부모델을 선택하세요"
                                                                        class="selectric"
                                                                        data-beusable-tracking=""
                                                                        tabindex="-1"
                                                                        v-for="category of this.$store.state.contents.category3"
                                                                        :key="category.name">
                                                                    <option data-type="MAKE_TYPE010"
                                                                            data-cnt="category.count">{{category.name}}</option>
                                                                </select></div>
                                                            <div class="selectric"><span class="label"
                                                                                         data-beusable-tracking="">{{keyWord3}}</span></div>
                                                            <div class="selectric-items" tabindex="-1">
                                                                <div class="selectric-scroll">
                                                                    <ul v-for="category of this.$store.state.contents.category3" :key="category.name">
                                                                        <li data-index="1" @click="setKeyWord3(category)" class="">{{category.name}}<em>{{category.count}}</em>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <input class="selectric-input" tabindex="0"></div>
                                                    </div>
                                                </li>
                                                <li class="search_btn" id="divBtnSearch">
                                                    <a @click="goSearchWithCondition('withModel')">검색하기&nbsp;<span v-if="resultCount">({{resultCount}}대)</span></a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div  class="tab_want2 tab_want_menu" data-item="tab2">
                                        <h3><a id="tab2" @click="haveBudget">예산이 정해져 있어요</a></h3>
                                    </div>
                                    <!--검색tab2 내용-->
                                    <!---->
                                    <div id="divTabWant2" class="divTabWantGroup" style="display:none">
                                        <!--20180801 검색셀렉트박스 수정-->
                                        <div class="searchcont1">
                                            <ul>

                                                <li><span class="tit">RPM에서 판매하는 차 <strong class="all_car_cnt">총 {{this.$store.state.contents.carAllCount}}대</strong></span>

                                                </li>
                                                <li>
                            <span id="spanMakeType" class="btnl">
                              <a @click="korCar(`korCar2`,`impCar2`)" id="korCar2"  data-item="MAKE_TYPE010">국산차</a>
                              <a @click="impCar(`korCar2`,`impCar2`,`category4`)" id="impCar2" data-item="MAKE_TYPE020">수입차</a>
                            </span>
                                                </li>
                                                <li class="spreset">
                                                    <div class="searchr1">
                                                        <div id="budgetCategory" @click="searchKeyClick(`budgetCategory`)"
                                                             class="selectric-wrapper selectric-selectric selectric-below selectric-hover">
                                                            <div class="selectric-hide-select">
                                                                <select
                                                                        id="makeList"
                                                                        title="제조사를 선택하세요"
                                                                        lass="selectric"
                                                                        data-beusable-tracking=""
                                                                        tabindex="-1"
                                                                        v-for="category of this.$store.state.contents.category1"
                                                                        :key="category.name">
                                                                    <option data-type="MAKE_TYPE010"
                                                                            data-cnt="category.count">{{category.name}}</option>
                                                                </select></div>
                                                            <div class="selectric" ><span class="label"
                                                                                          data-beusable-tracking="">{{keyWord1}}</span></div>
                                                            <div id="category4" class="selectric-items" tabindex="-1">
                                                                <div class="selectric-scroll">
                                                                    <ul v-for="category of this.$store.state.contents.category1" :key="category.name">
                                                                        <li data-index="1" @click="setCategory2(category)" class="">{{category.name}}<em>{{category.count}}</em>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <input class="selectric-input" tabindex="0"></div>
                                                    </div>
                                                    <div class="searchr2">
                                                        <div id="priceDiv1" @click="searchKeyClick(`priceDiv1`)"
                                                             class="selectric-wrapper selectric-selectric selectric-below selectric-hover">
                                                            <div class="selectric-hide-select">
                                                                <select id="minCarPrice"
                                                                        title="최저가격을 선택하세요"
                                                                        class="selectric"
                                                                        tabindex="-1"
                                                                        v-for="price of prices"
                                                                        :key="price.name">
                                                                    <option value = "price.value">{{price.name}}</option>
                                                                </select></div>
                                                            <div class="selectric"><span
                                                                    class="label">{{minPrice | thousandFormatter}}</span></div>
                                                            <div class="selectric-items" tabindex="-1" style="width: 220px; height: 300px;">
                                                                <div class="selectric-scroll">
                                                                    <ul v-for="price of prices" :key="price.name">
                                                                        <li @click="setMinPrice(price.name)" data-index="price.index" class="">{{price.name | thousandFormatter}}</li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <input class="selectric-input" tabindex="0"></div>
                                                    </div>
                                                    <div class="searchr3">
                                                        <div id="priceDiv2" @click="searchKeyClick(`priceDiv2`)"
                                                             class="selectric-wrapper selectric-selectric selectric-below selectric-hover">
                                                            <div class="selectric-hide-select">
                                                                <select id="maxCarPrice"
                                                                        title="최고가격을 선택하세요"
                                                                        class="selectric"
                                                                        tabindex="-1"
                                                                        v-for="price of prices"
                                                                        :key="price.name">
                                                                    <option value = "price.value">{{price.name}}</option>
                                                                </select></div>
                                                            <div class="selectric"><span
                                                                    class="label">{{maxPrice | thousandFormatter}}</span></div>
                                                            <div class="selectric-items" tabindex="-1" style="width: 220px; height: 300px;">
                                                                <div class="selectric-scroll">
                                                                    <ul v-for="price of prices" :key="price.name">
                                                                        <li @click="setMaxPrice(price.name)" data-index="price.index" class="">{{price.name | thousandFormatter}}</li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <input class="selectric-input" tabindex="0"></div>
                                                    </div>
                                                </li>
                                                <li class="search_btn" id="divBtnSearchWithPrice"><a
                                                        @click="goSearchWithCondition('withBudget')">검색하기&nbsp;<span></span></a></li>
                                                <!--//20180801 검색셀렉트박스 수정-->
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="tab_want3 tab_want_menu" data-item="tab3">
                                        <h3><a @click="noIdea">정해진게 없어요</a></h3>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <!--추천차-->
                    <div class="mc_wide_common" style="height: 150px;">
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        data(){
            return{
                searchKeyWord : '',
                defaultKeyWord1 : '제조사를 선택하세요',
                defaultKeyWord2 : '모델을 선택하세요',
                defaultKeyWord3 : '세부모델을 선택하세요',
                defaultMinPrice : '최저가격을 선택하세요',
                defaultMaxPrice : '최고가격을 선택하세요',
                keyWord1 : '제조사를 선택하세요',
                keyWord2 : '모델을 선택하세요',
                keyWord3 : '세부모델을 선택하세요',
                minPrice : '최저가격을 선택하세요',
                maxPrice : '최고가격을 선택하세요',
                resultCount : 0
            }
        },
        methods : {
            goSearch(){},
            wantModel(){
                const divTabWant1 = document.getElementById("divTabWant1")
                const divTabWant2 = document.getElementById("divTabWant2")
                const tab1 = document.getElementById("tab1")
                const tab2 = document.getElementById("tab2")
                tab1.className = "on"
                tab2.className = ""
                divTabWant1.style.display = "block"
                divTabWant2.style.display = "none"
                this.korCar(`korCar`,`impCar`)
            },
            haveBudget(){
                const divTabWant1 = document.getElementById("divTabWant1")
                const divTabWant2 = document.getElementById("divTabWant2")
                const tab1 = document.getElementById("tab1")
                const tab2 = document.getElementById("tab2")
                tab1.className = ""
                tab2.className = "on"
                divTabWant1.style.display = "none"
                divTabWant2.style.display = "block"
                this.korCar(`korCar2`,`impCar2`)
            },
            searchBoxOn(){
                this.$store.dispatch('contents/getSearchWordRank')
                const searchBox = document.getElementById("searchBox")
                searchBox.style.display = "block"
            },
            searchBoxOff(BoxID){
                const searchBox = document.getElementById(BoxID)
                searchBox.style.display = "none"
            },
            stringMatchOn(){
                const stringMatch = document.getElementById("stringMatch")
                const searchBox = document.getElementById("searchBox")
                if(this.searchKeyWord != "") {
                    searchBox.style.display = "none"
                    stringMatch.style.display = "block"
                    this.$store.dispatch('contents/stringMatch',this.searchKeyWord)
                }else{
                    stringMatch.style.display = "none"
                    searchBox.style.display = "block"
                }
            },
            korCar(korCarID, impCarID){
                const korCar = document.getElementById(korCarID)
                const impCar = document.getElementById(impCarID)
                korCar.className = "on"
                impCar.className = ""
                this.$store.dispatch('contents/getCategory1',{'param':'KOR','column':'CAR_TYPE'})
                this.keyWord1 = this.defaultKeyWord1,
                    this.keyWord2 = this.defaultKeyWord2,
                    this.keyWord3 = this.defaultKeyWord3,
                    this.resultCount = 0

            },
            impCar(korCarID, impCarID, category1ID){
                const korCar = document.getElementById(korCarID)
                const impCar = document.getElementById(impCarID)
                const category1 = document.getElementById(category1ID)
                korCar.className = ""
                impCar.className = "on"
                category1.style.width = "220px"
                category1.style.height = "300px"
                this.$store.dispatch('contents/getCategory1',{'param':'IMP','column':'CAR_TYPE'})
                this.keyWord1 = this.defaultKeyWord1,
                    this.keyWord2 = this.defaultKeyWord2
                this.keyWord3 = this.defaultKeyWord3
                this.resultCount = 0

            },
            searchKeyClick(searchKeyID){
                const searchKey = document.getElementById(searchKeyID)
                const cate2 = document.getElementById('category2')
                if(searchKey.className === "selectric-wrapper selectric-selectric selectric-below selectric-hover"){
                    for (let elementsByClassNameElement of document.getElementsByClassName("selectric-wrapper selectric-selectric selectric-below selectric-hover selectric-open selectric-focus")) {
                        elementsByClassNameElement.className = "selectric-wrapper selectric-selectric selectric-below selectric-hover"
                    }
                    searchKey.className = "selectric-wrapper selectric-selectric selectric-below selectric-hover selectric-open selectric-focus"
                }else{
                    searchKey.className = "selectric-wrapper selectric-selectric selectric-below selectric-hover"
                }
                if(this.$store.state.contents.category2.length>=10) {
                    cate2.style.width = "220px"
                    cate2.style.height = "300px"
                }{
                    cate2.style.width = ""
                    cate2.style.height = ""
                }
            },

            setCategory2(param){
                this.keyWord2 = this.defaultKeyWord2
                this.keyWord3 = this.defaultKeyWord3
                this.keyWord1 = param.name
                this.resultCount = param.count
                this.$store.dispatch('contents/getCategory2',{'param':this.keyWord1,'column':'MAKENM'})
            },
            setCategory3(param){
                this.keyWord3 = this.defaultKeyWord3
                this.keyWord2 = param.name
                this.resultCount = param.count
                this.$store.dispatch('contents/getCategory3',{'param':this.keyWord2,'column':'MODEL_GRP_NM'})
            },
            setKeyWord3(param){
                this.keyWord3 = param.name
                this.resultCount = param.count
            },
            setMinPrice(minPrice){
                this.minPrice = minPrice

            },
            setMaxPrice(maxPrice){
                if(parseInt(this.minPrice)<=parseInt(maxPrice.replace(`만원`,''))){
                    this.maxPrice = maxPrice
                }else{
                    alert(`최저가격보다 높게 선택해주세요.`)
                }

            },
            goSearchWithCondition(condition){
                let selectedCondition = {}
                switch (condition) {
                    case 'withModel' :
                        selectedCondition =
                            { 'maker' : (this.keyWord1 === this.defaultKeyWord1) ? false : this.keyWord1
                                , 'model' : (this.keyWord2 === this.defaultKeyWord2) ? false : this.keyWord2
                                , 'modelText' : (this.keyWord3 === this.defaultKeyWord3) ? false : this.keyWord3}
                        break
                    case 'stringMatch' :
                        selectedCondition =
                            { 'maker' : (this.keyWord1 === this.defaultKeyWord1) ? false : this.keyWord1
                                , 'model' : (this.keyWord2 === this.defaultKeyWord2) ? false : this.keyWord2
                                , 'modelText' : (this.keyWord3 === this.defaultKeyWord3) ? false : this.keyWord3}
                        break
                    case 'withBudget' :
                        selectedCondition =
                            { 'maker' : (this.keyWord1 === this.defaultKeyWord1) ? false : this.keyWord1
                                , 'minPrice' : (this.minPrice === this.defaultMinPrice ) ? false : { code: this.minPrice.replace(`만원`,'') , name : this.thousandFormatter(this.minPrice.replace(`만원`,''))+ `만원`  , bigCategory : 'minPrice' }
                                , 'maxPrice' : (this.maxPrice === this.defaultMaxPrice ) ? false : { code: this.maxPrice.replace(`만원`,'') , name : this.thousandFormatter(this.maxPrice.replace(`만원`,''))+ `만원` , bigCategory : 'maxPrice' }}
                        break
                }
                if(this.keyWord1 === this.defaultKeyWord1){
                    alert(this.defaultKeyWord1)
                }else{
                    this.$store.dispatch('contents/mainSearch' , { selectedCondition : selectedCondition , condition : condition } )
                    this.$router.push('/searchMain')

                }
            },
            stringMatchClick(modelText){
                let userid = ''
                if(this.$store.state.user.auth)
                    userid = this.$store.state.user.user.userid
                else
                    userid = this.$store.state.contents.guestid
                axios
                    .get(`http://localhost:8080/stringMatchClick/`+modelText+'/'+new Date().toISOString().replace(/[^0-9]/g,"")+'/'+userid)
                    .then(({data})=>{
                        this.keyWord1 = data.maker.replace(" ", "")
                        this.keyWord2 = data.model.replace(" ", "")
                        this.keyWord3 = modelText
                        this.$store.dispatch('contents/handleRecentSearchWord' , {key : "+",modelText : modelText})
                        this.$store.dispatch('contents/getRecommendBySearchWord' , modelText)
                        this.goSearchWithCondition('stringMatch')
                    })
                    .catch(()=>{
                        alert('잘못된 요청입니다.')
                    })
            },
            thousandFormatter (value) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            deleteRecentSearchWord (key, searchWord){
                switch (key) {
                    case 'one' :
                        this.$store.dispatch('contents/handleRecentSearchWord' , {key : "-",modelText : searchWord})
                        break
                    case "all" :
                        this.$store.dispatch('contents/handleRecentSearchWord' , {key : "#"})
                        break
                }
            },
            noIdea(){
                this.$store.dispatch('contents/resetCheckedItem')
                this.$store.dispatch('contents/init')
                this.$router.push('/searchmain')
            }

        },
        computed : {
            prices : function(){
                let list = []
                for(let i=1;i<=100;i++){
                    list.push({index : i, name : `${i*100}만원` , code : i*100})
                }
                return list
            }
        },
        filters : {
            thousandFormatter: function (value) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        },
        created(){
            this.$store.dispatch('contents/init')
            this.$store.dispatch('contents/getCategory1',{'param':'KOR','column':'CAR_TYPE'})
        },

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