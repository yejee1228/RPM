<template>
    <div>

        <div>


            <div class="align_field">
                <div class="all_check">
                    <div class="checker" id="uniform-allCheck">
                        <span :class="{checked:allchecked}" @click="allcheck(cars)" :key="allchecked"><input type="checkbox" name="allCheck" id="allCheck" class="uniform" title="전체체크"></span>
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
                                <span  :class="{checked:car.checked}" @click="check(car)" @change='updateCheckall(cars)' >
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
                            <span class="md_year">연식:{{car.beginYear}}년 &nbsp;<br>주행거리:{{car.milage|thousandFormatter}}km</span>
                            <span class="price">가격{{car.price|thousandFormatter}}만원 </span>
                        </td>
                        <td class="car_opt">
                            <ul class="opt_list">
                                <li>
                                    <span class="pt"> {{car.recCommentCd|acident}}</span>
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
                <a @click.prevent="removeData()" href="" class="delete" >선택삭제</a>


            </div>
            <pagination :pagination="List" @movePage="movePageBlock" ref="pagination"></pagination>


        </div>
    </div>
</template>
<script>
    import {checkBox} from "../mixins/checkBox";
    import axios from'axios'
    import pagination from "../common/Pager";
    export default {
        components:{
            pagination
        },
        data(){
            return {
                context:'http://localhost:8080',
                allchecked:false,
                List:[],
                checkedList:[],
                cars:[]

            }
        },
        methods: {
            movePageBlock(pagination){
                this.cars= pagination
            },
            addHistory( carItem ){
                this.$store.dispatch( 'contents/addSeenHistory' , carItem )
            },
            productClick(carItem){
                this.addHistory(carItem)
                this.$store.dispatch('contents/setProduct',carItem)
                this.$router.push('/product')
            },
            priceAsc(){
                this.List.sort(function (a,b) {
                    return a.price-b.price;
                })
                this.$refs.pagination.first()
            },
            priceDesc(){
                this.List.sort(function (a,b){
                    return b.price -a.price
                })
                this.$refs.pagination.first()

            },
            milageAsc(){
                this.List.sort(function (a,b) {
                    return a.milage-b.milage;
                })
                this.$refs.pagination.first()
            },
            milageDesc(){
                this.List.sort(function (a,b){
                    return b.milage -a.milage
                })
                this.$refs.pagination.first()

            },
            beginYearAsc(){
                this.List.sort(function (a,b) {
                    return a.beginYear-b.beginYear;
                })
                this.$refs.pagination.first()
            },
            beginYearDesc(){
                this.List.sort(function (a,b){
                    return b.beginYear -a.beginYear
                })
                this.$refs.pagination.first()

            },
            removeData(){
                for(let i=0;i<this.cars.length;i++) {
                    if (this.cars[i].checked == true) {
                        this.checkedList.push(this.cars[i])
                    }
                }
                axios
                    .post(`${this.context}/company/carRemove`,this.checkedList)
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
        created(){
            axios
                .get(`${this.context}/company/carList/`+localStorage.getItem("userId"))
                .then(res=>{
                    res.data.result.forEach(el=>{
                        el.checked=false
                        this.List.push(el)
                    })
                    this.$refs.pagination.first()

                })
                .catch(e=>{
                    alert(`axios fail${e}`)
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

</style>