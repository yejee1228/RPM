<template>
    <div id="magazineArticle">
        <link rel="stylesheet" type="text/css"  href="css/magazine.css">
        <div id="content">
            <div class="main_content">
                <div class="mc_wide_searchbox">
                    <div class="area_section">
                        <div class="wrap_section">
                            <ul class="list_tab">
                                <li class="on"><a href="/abouthyundai" class="link_tab"></a></li>
                                <li><a href="/abouthyundai?order=view" class="link_tab"></a></li>
                            </ul>
                            <ul class="list_1boon" id="timelinesView" data-order="published">
                                <li class="fst" v-for="article of  this.$store.state.magazine.articleList " :key="article.aricleId" >
                                    <a :href="article.articleHref" class=" link_1boon">
                                            <span class="thumb_g">
                                                                            <img :src="article.articleImg" data-loaded="true" style="" class="lazyimg img_thumb lazy-loaded">
                                                                    </span>
                                        <div class="detail_sub">
                                            <strong class="tit_thumb">{{article.subject}}</strong>
                                            <span class="txt_number txt_new"><span class="txt_g">{{article.writer}} | {{article.writeDate}} </span></span>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "magazineArticle"
    }
</script>

<style scoped>
    .mc_wide_search{margin-bottom: 57px; }
    .mc_wide_searchbox{  width:1200px; background: #ffffff;height:603px;position:relative;display:inline-block; z-index:2; margin-bottom:27px;}
    .mc_wide_searchbox .searchbg{ margin-top: 50px; width:100%; background:url( https://www.kcar.com/resources/images/index/search_bg.png) center no-repeat; opacity: 0.97; display:inline-block;}
    .mc_wide_searchbox .searchbg .mc_search{margin: 0px auto 0 auto; }
    .mc_search .selectric-items .selectric-scroll {
        overflow-x: hidden;
        overflow-y: auto;
    }
    .fst{
        opacity: 0.97; display:inline-block; background-color: white; margin-bottom: 10px;
    }
    .wrap_section{max-width:1112px;margin:0 auto}
    .area_section {background-color: aliceblue; margin-top: 100px;}
    .list_1boon {
        overflow: hidden;
        margin: 0 auto;
        padding-top: 6px;
    }
    .list_1boon .thumb_g .img_thumb {
        display: block;
        overflow: hidden;
        position: relative;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
        height: 192px;

    }
    .list_1boon .detail_sub {
        overflow: hidden;
        padding: 0 25px 23px;
    }
    .list_1boon li {
        float: left;
        width: 25%;
    }
    .list_1boon .tit_thumb {
        display: block;
        display: -webkit-box;
        overflow: hidden;
        height: 50px;
        margin-top: 20px;
        font-size: 17px;
        line-height: 25px;
        color: #27282d;
        letter-spacing: -1px;
        word-break: break-all;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }
    .list_1boon .txt_number {
        display: block;
        overflow: hidden;
        height: 30px;
        margin-top: 35px;
        font-size: 14px;
        line-height: 30px;
        color: #848992;
        white-space: nowrap;
        text-overflow: ellipsis;
        letter-spacing: -0.05em;
    }
</style>