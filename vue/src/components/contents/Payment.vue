<template>
    <div class="cont920pix">
        <div class="cusinfo_box">
            <p class="boxtit">계약자 정보</p>

            <ul class="padtop">
                <li>
                    <table width="750px" class="perinfo">
                        <caption>계약자 정보 </caption>
                        <colgroup>
                            <col width="140px">
                            <col width="200px">
                            <col width="140px">
                            <col width="320px">
                        </colgroup>
                        <tbody><tr>
                            <td>명의자</td>
                            <td><input name="i_arrBuyerName" type="text" maxlength="20" value="" title="명의자" style="width:155px; margin-right: 450px;"></td>

                        </tr>

                        </tbody></table>

                    <table width="750px" class="perinfo delivery_tbl">
                        <caption>배송지정보</caption>
                        <colgroup>
                            <col width="140px">
                            <col width="610px">
                        </colgroup>
                        <tbody><tr>
                            <td colspan="2" class="binspace"></td>
                        </tr>
                        <tr>
                            <td colspan="2" class="spotline"><img src="https://www.kcar.com/resources/images/homeencar/bg/bot_line_spot.png" height="1" alt="bg" repeat=""></td>
                        </tr>
                        <tr>
                            <td>수령인</td>
                            <td>
                                <input type="text" name="i_sRcpNm" title="수령인" style="width:155px">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="spotline"><img src="https://www.kcar.com/resources/images/homeencar/bg/bot_line_spot.png" height="1" alt="bg" repeat=""></td>
                        </tr>

                        <tr>
                            <td colspan="2" class="spotline"><img src="https://www.kcar.com/resources/images/homeencar/bg/bot_line_spot.png" height="1" alt="bg" repeat=""></td>
                        </tr>
                        <tr>
                            <td rowspan="2">배송지주소</td>
                            <td>
                                <input type="text" name="i_sDeliPostno" class="postno" title="우편번호" placeholder="우편번호" maxlength="5" readonly="">
                                <a href="#none" class="btn_gray"><span class="icon_search"></span>우편번호찾기</a>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <input type="text" name="i_sDeliAddr1" class="addr1" title="주소 입력" style="width:350px" placeholder="주소" maxlength="60" readonly="">
                                <input type="text" name="i_sDeliAddr2" class="addr2" title="상세주소 입력" style="width:220px" placeholder="상세주소" maxlength="80">
                            </td>
                        </tr>

                        </tbody></table>

                </li>
            </ul>
            <ul class="pads">
                <li>
                    <table width="750px" class="perinfo">
                        <caption>이메일</caption>
                        <colgroup>
                            <col width="140px">
                            <col width="610px">
                        </colgroup>
                        <tbody><tr>
                            <td>이메일</td>
                            <td>
                                <input type="text" name="i_sReqEmail1" value="" title="이메일 주소" style="width:140px">
                                <span class="email">@</span>
                                <input type="text" name="i_sReqEmail2" value="" title="이메일 도메인 주소" style="width:140px">
                                <select name="i_sReqEmail3" class="reqEmail" style="width:140px" title="이메일 도메인">

                                    <option value="직접입력">직접입력</option>

                                    <option value="daum.net">daum.net</option>

                                    <option value="naver.com">naver.com</option>

                                    <option value="nate.com">nate.com</option>

                                    <option value="chol.com">chol.com</option>

                                    <option value="dreamwiz.com">dreamwiz.com</option>

                                    <option value="empal.com">empal.com</option>

                                    <option value="freechal.com">freechal.com</option>

                                    <option value="gmail.com">gmail.com</option>

                                    <option value="hanafos.com">hanafos.com</option>

                                    <option value="hanmir.com">hanmir.com</option>

                                    <option value="hitel.net">hitel.net</option>

                                    <option value="hotmail.com">hotmail.com</option>

                                    <option value="korea.com">korea.com</option>

                                    <option value="lycos.co.kr">lycos.co.kr</option>

                                    <option value="netian.com">netian.com</option>

                                    <option value="paran.com">paran.com</option>

                                    <option value="yahoo.co.kr">yahoo.co.kr</option>

                                    <option value="chollian.net">chollian.net</option>

                                    <option value="hanmail.net">hanmail.net</option>

                                    <option value="kebi.com">kebi.com</option>

                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="padjo">※ 차량 계약시 계약서 수신 이메일 주소 </td>
                        </tr>
                        </tbody></table>
                </li>
            </ul>


            <ul class="padbot" id="personalInfo"></ul>
        </div>
        <div class="btn_ar">
            <a @click="goBack" class="btn_gry" >뒤로가기</a>
            <a @click="sendRequest" class="btn_orng">요청서 보내기</a>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Payment",
        methods : {
            goBack(){
                this.$router.go(-1)
            },
            sendRequest(){

            }
        }
    }
</script>

<style scoped>

</style>