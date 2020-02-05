<template>
    <div>
        <link rel="stylesheet" type="text/css" href="css/danawaCommon.css">
        <link rel="stylesheet" type="text/css" href="css/danawaCompare.css">
        <link rel="stylesheet" type="text/css" href="css/danawaHome.css">
        <link rel="stylesheet" type="text/css" href="css/danawaTheme.css">
        <link rel="stylesheet" type="text/css" href="css/dnawaAuto.css">
        <div class="form_area clearFix personal_info" id="formarea">
            <customerDetail_left></customerDetail_left>
                    <div class="carlist">
                        <div class="mypage_CarList interest">
                            <button @click="$router.push('/customerDetail/bestCarList')" class="best_btn">best 맞춤 차량</button>
                            <button @click="$router.push('/customerDetail')" class="best_btn">보유 차량 목록</button>
                            <router-view />
                        </div>
                    </div>

        </div>
    </div>
</template>
<script>
    import customerDetail_left from "./CustomerDetail_left";
    export default {
        components:{
            customerDetail_left
        }
    }
</script>
<style scoped>

    .carlist {
        color: #333;
        font-size: 12px;
        font-family: "돋움", Dotum, "굴림", gulim, AppleGothic, Helvetica, Sans-serif;
        float: left;
        margin: 0px 15px;
        line-height: 180%;
        padding: 10px 500px 50px 10px;
        width: 500px;

        background: #fff;

    }


</style>