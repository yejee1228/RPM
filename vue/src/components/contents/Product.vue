<template>
    <div>
        <form name="frm" method="post" action="">
            <div id="content" class="sub_content">
                <div class="car_detail_cont">
                    <div class="head_field">
                        <div class="wrapper">
                            <div class="tit_area">
                                <div class="top_field">
                                    <h3><span>{{this.$store.state.contents.carItem.truckName}}</span></h3>
                                    <p class="desc">
                                        <span><strong>{{recCommentCd}}</strong></span>
                                        <span>{{this.$store.state.contents.carItem.mfrDate | mfrDateFormatter}}</span>
                                        <span>{{this.$store.state.contents.carItem.milage|thousandFormatter}}km</span>
                                        <span>{{this.$store.state.contents.carItem.fuelTypedName}}</span>
                                        <span>{{this.$store.state.contents.carItem.exteriorColordnm}}</span>
                                        <span>{{this.$store.state.contents.carItem.transmissioncdName}}</span>
                                        <span>{{this.$store.state.contents.carItem.centerName}}</span>
                                    </p>
                                </div>

                                <div class="price">
                               <!--     <a href="" class="int_price fix">월 23만원</a>-->
                                    <p class="pay"><strong>{{this.$store.state.contents.carItem.price | thousandFormatter}}</strong>만원</p>
                                </div>
                            </div>
                            <div class="btn_area">
                                <a @click="goPayment" class="online" id="onlineBuy"><span class="onlinebuy_txt">온라인 구매</span></a>
                            </div>
                        </div>
                    </div>
                    <div class="view_field">
                        <div class="view_bg">
                            <div class="wrapper">

                                <div class="carImg_imgArea">
                                    <p class="attr">{{this.$store.state.contents.carItem.simpleComment}}</p>
                                    <div class="visual_wrap">
                                        <div class="visual_area">
                                            <a href="">
                                                <div class="visual" :style="`display:block`">
                                                    <img :src="elanPath"
                                                         alt="차량이미지">
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="until_area">
                                        <ul class="ico_area">
                                            <li><a href="" class="down"><span class="blind">다운</span></a></li>
                                            <li><a href="" class="mail"><span class="blind">메일</span></a></li>
                                            <li><a href="" class="print"><span class="blind">인쇄</span></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="carInfo_area">
                                    <div class="staff_box">
                                        <div class="img">
                                            <img src="@/assets/image/seller_profile.jpg"
                                                 alt="직원사진">
                                        </div>
                                        <div class="info">
                                            <p class="store">K Car {{this.$store.state.contents.carItem.centerName}}</p>
                                            <p class="name">{{this.$store.state.contents.carItem.usernm}} 차량평가사<br><span class="num">010-5051-0997</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div class="info_article">
                                        <ul class="state">
                                            <li class="list01">
                                                <a href="">
                                                    <span class="blank">
                                                        <span class="ico"><img
                                                                src="https://www.kcar.com/resources/images/content/buy/detail_info_ico01.png"
                                                                alt="케이카 상세진단서">
                                                        </span>
                                                        <p>K Car 상세진단서</p>
                                                    </span>
                                                </a>
                                            </li>
                                            <li class="list02">
                                                <a href=""><span class="blank">
                                                    <span class="ico"><img
                                                            src="https://www.kcar.com/resources/images/content/buy/detail_info_ico02.png"
                                                            alt="성능·상태 점검기록부">
                                                    </span>
                                                    <p>성능·상태 점검기록부</p>
                                                </span>
                                                </a>
                                            </li>
                                            <li class="list03">

                                                <a href="">
                                                    <span class="blank">
                                                        <span class="ico"><img
                                                                src="https://www.kcar.com/resources/images/content/buy/detail_info_ico03.png"
                                                                alt="보험 이력">
                                                        </span>
                                                        <p>보험 이력</p>
                                                    </span>
                                                </a>
                                            </li>
                                            <li class="list04">
                                                <a href="javascript:;"
                                                   onclick="try{mobileTasEvent.callTasEvent('car_keep',{'sCarCd': 'EC60306284'});}catch(e){} infoNormal.fnWindowPop('keep_pop','630','650','transfer','yes','i_iInstMonth=36&amp;i_iInstRate=6.5');">
<span class="blank">
<span class="ico"><img src="https://www.kcar.com/resources/images/content/buy/detail_info_ico04.png"
                       alt="총 비용 계산기"></span>
<p>총 비용 계산기</p>
</span>
                                                </a>
                                            </li>
                                        </ul>
                                        <ul class="noti">
                                            <li class="list02"><a href="" target="_blank">동일 모델 입고 알림받기</a></li>
                                            <li class="list01"><a href="" target="_blank">찾아 오시는 길</a></li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="buy_cap" id="cap_area">
                        <h3>사고 싶은 이 차, 월 얼마면 될까? <span>목돈은 아껴두고 할부로 구매하세요.</span></h3>
                        <div class="cap_bx">
                            <div class="le">
                                <div class="captab tabcom">
                                    <h4>선수금 <span class="txt">(최초 30%)</span></h4>
                                    <div class="captab_input"><input type="text" class="" id="advancePay" maxlength="5">
                                        &nbsp;{{this.$store.state.contents.carItem.price*0.3}}만원
                                    </div>
                                </div>
                                <div class="captab tabcom">
                                    <h4>할부기간</h4>
                                    <ul class="captab1" >
                                        <li v-for="interestMonth of interestMonthList" :key="interestMonth.value">
                                            <a href="#none"  :class="interestMonth.class" @click="setInterest(interestMonth)">{{interestMonth.value}}개월</a></li>
                                    </ul>
                                </div>
                                <div class="captab tabcom">
                                    <h4>금리<b class="monfin_info"><b>금리 정보</b><span class="ly_tip">금리는 고객님의 이해를 돕기 위한 예시로 신용등급별 금리를 나타내는 것은 아닙니다.</span></b>
                                    </h4>
                                    <ul class="captab2" >
                                        <li v-for="interestRate of interestRateList" :key="interestRate.value">
                                            <a href="#none"  :class="interestRate.class" @click="setInterest(interestRate)">{{interestRate.value*100}}% {{interestRate.month}}만원</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="ri">
                                <div class="cap_month">
                                    <p class="tit">월 납입금<b class="monfin_info"><b>월 납입금 정보</b><span class="ly_tip">월 납입금은 예시이며 이용 조건 및 고객님의 신용등급에 따라 변경될 수 있습니다. </span></b>
                                    </p>
                                    <strong class="cap_money">
                                        <span id="monthPrice">  <animated-number
                                                :value="interest"
                                                :formatValue='function (value) {return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");}'
                                                :duration="300"
                                                :round = "1"/>
                                        </span>
                                        <span>원</span>
                                    </strong>
                                    <ul class="cap_total">
                                        <li>
                                            <span>1년 할부이자</span>
                                            <span class="ct_mon" id="yearIntertest">{{yearInterest | thousandFormatter}}원</span>
                                        </li>
                                        <li>
                                            <span>총비용</span>
                                            <span class="ct_mon" id="totalPay">{{interest*interestMonth+(this.$store.state.contents.carItem.price*10000*0.3) | thousandFormatter}}원</span>
                                        </li>
                                    </ul>
                                    <a href="#none" class="cap_link">내 한도금액 간편 확인 <span class="ly_tip">rpm 캐피탈에서 고객님의 신용조회 및 한도 산출을 진행합니다. </span></a>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="detail_info_body">
                        <div class="wrapper">
                            <div class="acticle acticle01">
                                <div class="article_tit">
                                    <h4 id="secMenu01" class="sec_menu">옵션 정보</h4>
                                </div>
                                <table class="op_tb">
                                    <caption>옵션정보</caption>
                                    <colgroup>
                                        <col style="width: 25%;">
                                        <col style="width: 25%;">
                                        <col style="width: 25%;">
                                        <col style="width: 25%;">
                                    </colgroup>
                                    <thead>
                                    <tr style="text-align: center;">
                                        <th>외관</th>
                                        <th>내장</th>
                                        <th>안전</th>
                                        <th>편의</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <ul v-for="option of optionList1" :key="option">
                                                <li><a>{{option}}</a>
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <ul v-for="option of optionList2" :key="option">
                                                <li><a>{{option}}</a>
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <ul v-for="option of optionList3" :key="option">
                                                <li><a>{{option}}</a>
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <ul v-for="option of optionList4" :key="option">
                                                <li><a>{{option}}</a>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="acticle acticle04">
                                <div class="row">
                                    <div class="piece piece01">
                                        <div class="article_tit">
                                            <h4>차량기본정보</h4>
                                            <ul>
                                                <li>
                                                    <span class="type">차량번호</span>
                                                    <span class="txt">{{this.$store.state.contents.carItem.carNumber}}</span>
                                                </li>
                                                <li>
                                                    <span class="type">차종</span>
                                                    <span class="txt">{{this.$store.state.contents.carItem.categorynm}}</span>
                                                </li>

                                                <li>
                                                    <span class="type">인승</span>
                                                    <span class="txt">{{this.$store.state.contents.carItem.passCnt}}</span>
                                                </li>
                                                <li>
                                                    <span class="type">압류/저당</span>
                                                    <span class="txt">없음</span>
                                                </li>
                                                <li>
                                                    <span class="type">제시신고번호</span>
                                                    <span class="txt">제 {{this.$store.state.contents.carItem.eccRegDtm}}호</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="cont920pix">
                                    <div class="cusinfo_box">
                                <div class="btn_ar">
                                    <a @click="goBack" class="btn_gry" >뒤로가기</a>
                                </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>



    </div>

</template>
<script>
    import AnimatedNumber from "animated-number-vue";
    export default{
        components : {
            AnimatedNumber
        },
        data(){
            return{
                elanPath : this.$store.state.contents.carItem.elanPath,
                list : this.$store.state.contents.carItem.optioncdName.split('|'),
                interestRate : 0.065,
                interestMonth : 36,
                interestMonthIndex : 3

            }
        },
        methods: {
            setInterest(interestValue){
                if(interestValue.value>=1){
                    this.interestMonth = interestValue.value
                    this.interestMonthIndex = interestValue.index
                }else{
                    this.interestRate = interestValue.value
                }

            },
            goPayment(){
                if(this.$store.state.user.auth)
                    this.$router.push('/payment')
                else{
                    alert(`로그인이 필요한 서비스입니다.`)
                    this.$router.push('/login')
                }
            },
            goBack(){
                this.$router.go(-1)
            }
        },
        computed:{
            recCommentCd : function(){
                let recCommentCd = ''
                switch (this.$store.state.contents.carItem.recCommentCd) {
                    case '001':
                        recCommentCd = '무사고'
                        break;
                    case '002':
                        recCommentCd = '단순교환'
                        break;
                    case '003':
                        recCommentCd = '단순사고(접촉)'
                        break;
                    case '004':
                        recCommentCd = '사고'
                        break;

                }
                return recCommentCd
            },
            optionList1 : function(){
                return this.list.slice(0,this.list.length*0.1)
            },
            optionList2 : function(){
                let list = this.$store.state.contents.carItem.optioncdName.split('|')
                return list.slice(this.list.length*0.1,this.list.length*0.3)
            },
            optionList3 : function(){
                let list = this.$store.state.contents.carItem.optioncdName.split('|')
                return list.slice(this.list.length*0.3,this.list.length*0.6)
            },
            optionList4 : function(){
                let list = this.$store.state.contents.carItem.optioncdName.split('|')
                return list.slice(this.list.length*0.6,this.list.length)
            },
            interestRateList : function(){
                let interestRateList = []
                let defaultRate = 0.065
                let price = this.$store.state.contents.carItem.price*10000*0.7
                let monthPrice = 0
                for(let i =0;i<5;i++){
                    monthPrice = Math.round((price)*((defaultRate/12)*Math.pow(1+(defaultRate/12),this.interestMonth)
                                                /(Math.pow(1+(defaultRate/12),this.interestMonth)-1))).toString()
                    if(defaultRate == this.interestRate)
                        interestRateList.push({class : 'on', value : defaultRate, month : monthPrice.slice(0,-4)})
                    else
                        interestRateList.push({class : '', value : defaultRate,  month : monthPrice.slice(0,-4)})
                    defaultRate += 0.015
                }
                return interestRateList
            },
            interestMonthList : function(){
                let interestMonthList = []
                let defaultMonth = 12
                for(let i =0;i<5;i++){
                    if(defaultMonth == this.interestMonth)
                        interestMonthList.push({class : 'on', value : defaultMonth, index : i+1})
                    else
                        interestMonthList.push({class : '', value : defaultMonth, index : i+1})
                    defaultMonth += 12
                }

                    return interestMonthList
            },
            interest : function(){
                let rate = this.interestRate/12
                let month = this.interestMonth
                return Math.round((this.$store.state.contents.carItem.price*10000*0.7)*(rate*Math.pow(1+rate,month)
                                        /(Math.pow(1+rate,month)-1)))
            },
            yearInterest : function(){
                return Math.round(((this.interest*this.interestMonth+(this.$store.state.contents.carItem.price*10000*0.3))-this.$store.state.contents.carItem.price*10000)/this.interestMonthIndex)
            }
        },
        filters: {
            mfrDateFormatter: function (value) {
                if (!value) return ''
                value = value.toString()
                return value.slice(2,4)+`년` + value.slice(4,6)+`월식`
            },
            thousandFormatter: function (value) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }

        },

    }
</script>
<style scoped>
    #content {
        padding-top: 10px;
    }
</style>