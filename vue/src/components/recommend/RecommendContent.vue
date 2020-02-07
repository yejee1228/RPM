<template>
    <div >

        <div class="mypage_CarList interest">
            <div class="tit_area">
                <h3>추천받은 차</h3>
                <p>추천받은 차량은 최대 3개월 동안 보관되며 판매완료시 삭제됩니다.</p>

            </div>

            <div class="align_field">
                <div class="all_check">
                    <div class="checker" id="uniform-allCheck">
                        <span :class="{checked:allchecked}" @click="allcheck(recommendedCar)" :key="allchecked"><input type="checkbox" name="allCheck" id="allCheck" class="uniform" title="전체체크"></span>
                    </div>
                </div>
                <div class="align">



                    <span><a @click.prevent href="" class="txt">가격순</a><a @click.prevent="priceAsc" href="" class="down ">낮은순</a>
                                                 <a @click.prevent="priceDesc" href="" class="up ">높은순</a>
                         </span>
                    <span><a href="" class="txt">주행거리 순</a><a
                            @click.prevent="milageAsc"    href="" class="down ">낮은순</a>
                         <a @click.prevent="milageDesc" href=""
                            class="up ">높은순</a>
                         </span>
                    <span><a href="" class="txt">연식 순</a><a
                            @click.prevent="beginYearAsc" href="" class="down ">낮은순</a>
                         <a @click.prevent="beginYearDesc" href="" class="up ">높은순</a>
                         </span>
                </div>
            </div>
            <div class="result_list">

                <h1 class="emptySign" v-if="recommendedCar.length==0">등록된 차량이 없습니다</h1>
                <table>
                    <colgroup>
                        <col style="width: 55px;">
                        <col style="width: 190px;">
                        <col style="width: 485px;">
                        <col style="width: 290px;">
                        <col>
                    </colgroup>
                    <tbody v-for="car in recommendedCar" :key="car.cars.cid">
                    <tr>
                        <td class="check">
                            <div class="checker" id="uniform-interest_list_check1">
                                <span  :class="{checked:car.checked}" @click="check(car)" @change='updateCheckall(recommendedCar)' >
                                    <input type="checkbox" id="interest_list_check1" class="uniform"  >
                                </span>
                            </div>
                        </td>
                        <td class="thumb">
                            <a @click="productClick(car.cars)">
                                <img  :src="car.cars.middleImg" alt="자동차 썸네일">
                            </a>
                        </td>
                        <td class="car_info">
                            <span class="md_year">{{car.cars.centerName}}</span>
                            <a @click="productClick(car.cars)" class="name">{{car.cars.makenm}} {{car.cars.modelnm}} </a>
                            <span class="md_year">{{car.cars.beginYear}}년 주행거리 : {{car.cars.milage|thousandFormatter}} km </span>
                            <span class="price">가격 :{{car.cars.price|thousandFormatter}}만원 </span>
                        </td>
                        <td class="car_opt">
                            <ul class="opt_list">
                                <li>
                                    <span class="pt"> {{car.cars.recCommentCd|acident}}</span>
                                    <span>{{car.cars.fuleTypedName}}</span>
                                </li>
                                <li>
                                    <span>{{car.cars.exteriorColornm}}</span>
                                    <span>{{car.cars.categorynm}}</span>
                                </li>
                                <li>
                                    <span>{{car.cars.centerRegion}}</span>
                                    <span>{{car.cars.passCnt}}인승</span>
                                </li>
                            </ul>


                        </td>
                        <td class="btn_area">
                            <a href="/buycar" class="online" id="onlineBuy0">온라인 구매 </a>
                        </td>
                    </tr>


                    </tbody>
                </table>
            </div>

            <div class="btn_cont">
                <a @click.prevent="removeData()" href="" class="delete" >선택삭제</a>

                <div class="center_btn">
                    <button  href="" @click="pop_rendar">한눈에 비교하기</button>
                    <modals-container />
                </div>
            </div>

            <Pagination2 :pagination="List" @movePage="movePageBlock" ref="pagination"></Pagination2>

        </div>
    </div>
</template>
<script>
    import comparePop from "./ComparePop";
    import {checkBox} from "../mixins/checkBox";
    import axios from 'axios';
    import Pagination2 from "../common/Pager";

    export default {
        components:{
            Pagination2
        },
        data(){
            return {
                allchecked:false,
                List:[],
                checkedList:[

                ],
                recommendedCar:[]

            }
        },
        methods: {

            pop_rendar(){

                for(let i=0;i<this.recommendedCar.length;i++) {
                    if (this.recommendedCar[i].checked == true) {
                        this.checkedList.push(this.recommendedCar[i].cars)
                    }
                }
                this.$modal.show(comparePop,{
                    checkedList : this.checkedList,
                    modal : this.$modal},{
                    name: 'dynamic-modal',
                    width : '800px',
                    height : '650px',
                    draggable: true,
                },{closed:this.checkedList=[]})
            },
            addHistory( carItem ){
                this.$store.dispatch( 'contents/addSeenHistory' , carItem )
            },
            productClick(carItem){
                this.addHistory(carItem)
                this.$store.dispatch('contents/setProduct',carItem)
                this.$router.push('/product')
            },
            movePageBlock(pagination){
                this.recommendedCar=pagination
            },
            priceAsc(){
                this.List.sort(function (a,b) {
                    return a.cars.price-b.cars.price;
                })
                this.$refs.pagination.first()
            },
            priceDesc(){
                this.List.sort(function (a,b){
                    return b.cars.price -a.cars.price
                })
                this.$refs.pagination.first()

            },
            milageAsc(){
                this.List.sort(function (a,b) {
                    return a.cars.milage-b.cars.milage;
                })
                this.$refs.pagination.first()
            },
            milageDesc(){
                this.List.sort(function (a,b){
                    return b.cars.milage -a.cars.milage
                })
                this.$refs.pagination.first()

            },
            beginYearAsc(){
                this.List.sort(function (a,b) {
                    return a.cars.beginYear-b.cars.beginYear;
                })
                this.$refs.pagination.first()
            },
            beginYearDesc(){
                this.List.sort(function (a,b){
                    return b.cars.beginYear -a.cars.beginYear
                })
                this.$refs.pagination.first()

            },
            removeData(){
                for(let i=0;i<this.recommendedCar.length;i++) {
                    if (this.recommendedCar[i].checked == true) {
                        this.checkedList.push(this.recommendedCar[i])
                    }
                }
                axios
                    .post(`http://localhost:8080//recommendedCar/recommendedCarRemove`,this.checkedList)
                    .then(()=>{
                        alert('삭제완료')
                        location.reload()
                    })
                    .catch(e=>{
                        alert(`axios fail${e}`)
                    })
            }




        },
        filters : {
            thousandFormatter: function (value) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            acident(value){
                switch (value) {
                    case '001': value='무사고';break;
                    case '002': value='단순교환';break;
                    case '003': value='단순사고(접촉)';break;
                    case '004': value='사고';break;
                }
                return value
            }

        },
        mixins:[checkBox],
        created() {
            axios
                .get(`http://localhost:8080//recommendedCar/getRecommendedCar/`+localStorage.getItem("userId"))
                .then(({data})=>{
                    data.forEach(el=>{
                        el.checked=false
                        this.List.push(el)
                    })
                    this.$refs.pagination.first()
                })
                .catch(e=>{
                    alert(`axios fail${e}`)
                })
        }
    }


</script>
<style>
    .emptySign{
        font-size: large;
        text-align: center;
        padding: 50px;
    }
    .center_btn button{
        display: inline-block;
        width: 217px;
        height: 45px;
        line-height: 43px;
        margin-left: 2px;
        border: 1px solid #000;
        text-align: center;
        font-size: 13px;
    }
</style>