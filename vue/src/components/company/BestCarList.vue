<template>
    <div>

        <div>



            <div class="align_field">
                <div class="all_check">
                    <div class="checker" id="uniform-allCheck">
                        <span :class="{checked:allchecked}" @click="allcheck(cars)" :key="allchecked"><input type="checkbox" name="allCheck" id="allCheck" class="uniform" title="전체체크"></span>
                    </div>
                </div>
                <h1 class="best_title"> 요구사항에 가장 적합한 보유차량</h1>
            </div>
            <div class="result_list">
                <table>
                    <caption>관심차량</caption>

                    <colgroup>
                        <col style="width: 55px;">
                        <col style="width: 190px;">
                        <col style="width: 485px;">
                        <col style="width: 290px;">
                        <col>
                    </colgroup>

                    <tbody  v-for="car of cars" :key="car.carcd">
                    <tr>
                        <td class="check">
                            <div class="checker" id="uniform-interest_list_check1">
                                <span  :class="{checked:car.checked}" @click="check(car)" @change='updateCheckall(cars)'>
                                    <input type="checkbox" id="interest_list_check1" class="uniform"  >
                                </span>
                            </div>
                        </td>
                        <td class="thumb">
                            <a  >
                                <img @click="productClick(car)" :src="car.middleImg" alt="자동차 썸네일">
                            </a>
                        </td>
                        <td class="car_info">
                            <a @click="productClick(car)" class="name">모델명:{{car.modelnm}} </a>
                            <span class="md_year">연식:{{car.beginYear}}년 &nbsp;<br>주행거리:{{car.milage}}km</span>
                            <span class="price">가격{{car.price}}만원 </span>
                        </td>
                        <td class="car_opt">
                            <ul class="opt_list">
                                <li>
                                    <span class="pt">사고 : {{car.recCommentCd}}</span>
                                    <span>{{car.fuleTypedName}}</span>
                                </li>
                                <li>
                                    <span>{{car.exteriorColornm}}</span>
                                    <span>{{car.categorynm}}</span>
                                </li>
                                <li>
                                    <span>{{car.centerRegion}}</span>
                                    <span>{{car.passCnt}}인승</span>
                                </li>
                            </ul>


                        </td>

                    </tr>


                    </tbody>
                </table>
            </div>

            <div class="btn_cont">
                <button @click="pop_rendar" class="delete" >추가</button>
                <modals-container />
            </div>


        </div>
    </div>
</template>
<script>
    import {checkBox} from "../mixins/checkBox";

    import axios from "axios";
    import sendCarPop from "./SendCarPop";
    export default {
        data(){
            return {
                context:'http://localhost:8080/',
                allchecked:false,
                List:[],
                checkedList:[],
                cars:[]

            }
        },
        methods: {


            productClick(carItem){
                this.$store.dispatch('contents/setProduct',carItem)
                this.$router.push('/product')
            },
            pop_rendar(){

                for(let i=0;i<this.cars.length;i++) {

                    if (!this.$store.state.recommend.recommendedCar.length<5&&this.cars[i].checked == true) {
                        this.$store.dispatch('recommend/inputCar',this.cars[i])
                    }else if(this.$store.state.recommend.recommendedCar.length==5){
                        alert('최대 5개까지 가능합니다')
                    }
                }
                this.$modal.show(sendCarPop,{
                    // checkedList : this.checkedList,
                    modal : this.$modal},{
                    name: 'dynamic-modal',
                    width : '980px',
                    height : '680px',
                    draggable: true,
                },{closed:this.checkedList=[]})
            }

        },
        mixins:[checkBox],
        created(){

            axios
                .post('/company/bestCarList', JSON.parse( localStorage.getItem("customerDetail")))
                .then(res=> {
                    res.data.forEach(el=>{
                        el.checked=false
                        this.cars.push(el)
                    })

                })
                .catch(e=>{
                    alert('erorr'+e)
                })
        },

    }


</script>
<style>
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
    .best_title{
        margin: 10px;
        text-align: center;
        font-size: large;
        font-weight: bold;
    }
</style>