<template>
    <div class="container">
        <div>
            <div id="autodanawa_wrap">
                <header>
                    <div class="compHead">
                        <div id="autodanawa_header_mini">
                            <ul class="right">
                            </ul>
                        </div>
                    </div>
                    <div class="compTop">
                        <div class="cont">

                            <h2 class="logo_compare">
                                <a href="/" target="_blank"><span class="screen_behind">모델비교</span></a>
                            </h2>

                        </div>
                    </div>
                </header>
                <main>
                    <div class="compBox">
                        <div class="compLeft">
                            <table class="tableComp left head" cellspacing="0" id="compLeftHead">
                                <tbody>
                                <tr>
                                    <th>모델</th>
                                </tr>
                                </tbody>
                            </table>
                            <table class="tableComp left body" cellspacing="0" id="compLeftBody">
                                <tbody>

                                <tr v-for="col of columns" :key="col">
                                    <td>{{col}}</td>
                                </tr>

                                </tbody>
                            </table>

                        </div>
                        <div class="compRight">
                            <table class="tableComp right head" cellspacing="0" id="compRightHead" style="width: 900px;">
                                <tbody>
                                <tr id="unitPhoto" cont="index">
                                    <td id="Photo_1" v-for="row of rows" :key="row.rowNum">
                                       <!-- <button type="button" id="addBtn" v-if="row.button"></button>-->
                                        <img class="compare_img" :src="row.imageUrl" alt="" v-if="row.image">
                                    </td>

                                </tr>
                                </tbody>
                            </table>
                            <table class="tableComp right body" cellspacing="0" id="compRightBody" style="width: 900px;">
                                <tbody>

                                <tr class="compare_row" type="gapSpec" v-for="compare of compares" :key="compare">
                                    <td class="compare_col" v-for="row of compare" :key="row" >{{row}}</td>
                                </tr>


                                </tbody>
                            </table>

                        </div>
                    </div>

                </main>

                <footer>

                </footer>
            </div>
        </div>

    </div>
</template>
<script>
    export default {
        data:function(){
            return {
                    columns:[
                       '제조사', '기종', '가격','연식','주행거리','연료','변속기'
                    ],
                rows:[
                    {rowNum:0,button:true,image:false,imageUrl:''},
                    {rowNum:1,button:true,image:false,imageUrl:''},
                    {rowNum:2,button:true,image:false,imageUrl:''},
                    {rowNum:3,button:true,image:false,imageUrl:''},
                    {rowNum:4,button:true,image:false,imageUrl:''},
                ],
                compares: [ [],[],[],[],[],[],[]],
                send:{userid:'kangsj24',centercode:'114',carcodeList:[]}


            }
        },props : [
            'checkedList',
        ],methods : {



        },
        created() {

            for(let i=0; i<6;i++){

                if(i<this.checkedList.length) {
                    this.rows[i].button=false
                    this.rows[i].image=true
                    this.rows[i].imageUrl=this.checkedList[i].middleImg
                    this.compares[0].push(this.checkedList[i].makenm)
                    this.compares[1].push(this.checkedList[i].modelnm)
                    this.compares[2].push(this.checkedList[i].price)
                    this.compares[3].push(this.checkedList[i].beginYear)
                    this.compares[4].push(this.checkedList[i].milage)
                    this.compares[5].push(this.checkedList[i].fuleTypedName)
                    this.compares[6].push(this.checkedList[i].transmissioncdName)
                    this.send.carcodeList.push(this.checkedList[i].carcd)
                } else{
                    this.compares[0].push('')
                    this.compares[1].push('')
                    this.compares[2].push('')
                    this.compares[3].push('')
                    this.compares[4].push('')
                    this.compares[5].push('')
                    this.compares[6].push('')
                }
            }


        },
    }
</script>
<style>

   #addBtn {
        display: inline-block;
       background: #188ff8;
       border-color: #007ae7;
       color: #fff;
        width: 150px;
        height: 45px;
        line-height: 43px;
        margin-left: 2px;
        border: 1px solid #000;
        text-align: center;
        font-size: 13px;
       font-weight: bold;
    }
    .compare_img{
        width: 140px;
        height: 100px;
    }
    .compare_col{

        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        background: #ffffff;
        text-align: center;

    }

</style>