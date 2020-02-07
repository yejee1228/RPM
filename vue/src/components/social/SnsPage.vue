<template>
  <div class= "snsPage">
    <link rel="stylesheet" href="https://blackrockdigital.github.io/startbootstrap-agency/css/agency.min.css">
    <link rel="stylesheet" href="https://blackrockdigital.github.io/startbootstrap-agency/vendor/fontawesome-free/css/all.min.css">

    <section class="bg-light page-section" style="padding: 20px 0;" id="portfolio">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h2 class="section-heading text- uppercase">INSTARPM</h2>
            <h3 class="section-subheading text-muted" style="margin:0"></h3>
          </div>
          <div class="btn-edit">
            <button class="btn btn-primary" @click="write" type="button">
              <i class="fas fa-edit"></i> 글쓰기</button>
          </div>
        </div>
        <div class="row-contents">

          <div v-for="(item, index) in boardList" :key="index" class="col-md-4 col-sm-6 portfolio-item">
            <a class="portfolio-link"  @click="goDetail(item.boardSeq)" active-class="active">
              <div class="portfolio-hover">
                <div class="portfolio-hover-content">
                  <i class="fas fa-plus fa-3x"></i>
                </div>
              </div>
              <img class="img-fluid" :src="item.boardImg" alt="">
            </a>
            <div class="btn-like-comment">
              <a class="btn-like" v-if="thumbed(item.boardSeq)" style="color:#E81919"><h6><i class="fas fa-heart" ></i>좋아요  {{item.thumbCount}} 개</h6></a>
              <a class="btn-like" v-else><h6><i class="far fa-heart"></i> 좋아요  {{item.thumbCount}} 개</h6></a>
            </div>
            <div class="portfolio-caption1">
              <p class="userNamePlace">{{item.userName}}</p> <h6>{{item.carName}}</h6>
            </div>
          </div>
        </div>
        <div style="text-align: center;" class="btn-edit" >
          <button class="btn btn-primary"  v-if="hasMore" style="float:right" @click="loadData"><i class="fas fa-angle-down"></i></button>
          <h4 v-if="noMore">더이상의 게시물이 없습니다.</h4>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import axios from "axios"
  const url = "http://localhost:8080"
  export default {
    data() {
      return {
        loadedData:'',
        boardList:[],
        page: 1,
        hasMore:true,
        noMore: false,
        empty:true,
        fall:false,
        thumbedboard:[],
      }
    },
    created(){
      this.loadData()
    },
    computed: {
      thumbed(){
        return(b)=>{
          return this.thumbedboard.some(i=>i==b)
        }
      }
    },
    methods: {
      loadData(){
        let userid = (this.$store.state.user.auth===false)?"ghest":this.$store.state.user.user.userid
        axios
                .get(`${url}/viewList/${this.page}/${userid}`)
                .then(res => {
                  if (res.data.boardList.length) {
                    if(res.data.thumbedboard!=null){
                      this.thumbedboard.push(...res.data.thumbedboard)
                    }
                    this.boardList.push(...res.data.boardList)
                    if(res.data.length<12){
                      this.noMore = true
                      this.hasMore = false
                    }
                  } else {
                    this.noMore = true
                    this.hasMore = false
                  }
                })
                .catch(()=>{
                  alert('loadData axios error')
                })

        this.page += 1
      },
      write() {
        this.$router.push({path: '/snswrite'})
      },
      goDetail(boardSeq){
        localStorage.setItem('storedData', boardSeq)
        this.$router.push({path: '/snsdetail'})
      }

    }
  }

</script>
<style scoped>
  body{
    overflow: visible;
  }
  .row-contents{
    text-align: center;
    display: inline-flex;
    width: 100%;
    flex-wrap: wrap;
  }
  #portfolio .portfolio-item .portfolio-link .portfolio-hover {
    background: #0d124f78;
  }
  h2 {
    font-size: 14px;
    position: relative;
    color: #fac200;
  }

  .btn-primary {
    color: #fff;
    background-color: #010876 !important;
    border-color: #010876!important;
    margin: 30px;
  }
  .btn btn-primary:hover {
    color: #fff;
    background-color: #0d124f !important;
    border-color: #0d124f!important;
    margin: 30px;
  }
  #main_layout{
    padding-top: 10px;
  }
  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
    font-weight: 700;
    font-family: Montserrat,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
  }

  h3 {
    font-size: 1.75rem;
  }

  h4 {
    font-size: 1rem;
  }

  h5 {
    font-size: 1.25rem;
  }

  h6 {
    font-size: 1rem;

  }

  hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  .img-fluid {
    max-width: 100%;
    height: 280px;
    inline-size: -webkit-fill-available;
  }

  #portfolio .portfolio-item {
    right: 0;
    margin: 0 0 15px;
    box-shadow: 0 3px 5px rgba(116, 187, 248, 0.11), 0 3px 5px rgba(185, 208, 214, 0.24);
    /*box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);*/
  }
  #portfolio .portfolio-item:hover {
    /*box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);*/
    box-shadow: 0 14px 28px rgba(47, 72, 119, 0.25), 0 10px 10px rgba(84, 112, 248, 0.22);
  }

  .container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }

  @media (min-width: 1200px) {
    .container {
      max-width: 1140px;
    }
  }

  .row {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
  }

  .no-gutters > [class*="col-"] {
    padding-right: 0;
    padding-left: 0;
  }

  .col-sm-6, .col-md-4, .col-lg-12 {
    position: relative;
    width: 100%;
    padding-right: 16px;
    padding-left: 16px;
    padding-top: 10px;

  }
  .col-sm-6 {
    max-width: 22%;
  }
  .col-md-4 {
    max-width: 22%;
  }
  .col-lg-12 {
    max-width: 100%;
  }
  .btn {
    display: inline-block;
    font-weight: 400;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  @media (prefers-reduced-motion: reduce) {
    .btn {
      transition: none;
    }
  }

  .btn:hover {
    color: #212529;
    text-decoration: none;
  }

  .btn:focus, .btn.focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  .btn.disabled, .btn:disabled {
    opacity: 0.65;
  }

  a.btn.disabled,
  fieldset:disabled a.btn {
    pointer-events: none;
  }

  .btn-primary {
    color: #fff;
  }

  .btn-primary:hover {
    color: #fff;
  }

  .btn-primary.disabled, .btn-primary:disabled {
    color: #fff;
  }
  .text-center {
    text-align: center !important;
  }
  @media print {
    *,
    *::before,
    *::after {
      text-shadow: none !important;
      box-shadow: none !important;
    }
    a:not(.btn) {
      text-decoration: underline;
    }
    abbr[title]::after {
      content: " (" attr(title) ")";
    }
    tr,
    img {
      page-break-inside: avoid;
    }
    p,
    h2,
    h3 {
      orphans: 3;
      widows: 3;
    }
    h2,
    h3 {
      page-break-after: avoid;
    }
    @page {
      size: a3;
    }
    body {
      min-width: 992px !important;
    }
    .container {
      min-width: 992px !important;
    }
  }
  .btn-edit {
    margin-left: auto;
    margin-bottom: 20px;
  }
  .btn-like-comment a{
    margin: 5px;
    margin-top: 15px;
    color: rgba(215, 87, 138, 0.87);
    font-size: 15px;
    float: left;
  }
  .btn-primary{
    background-color: #fed136;
    border-color: #fed136;
  }
  .btn-like-comment a:hover {
    text-decoration: dashed;
  }
 .portfolio-caption1 {
    max-width: 100%;
    margin: 0px auto;
    padding: 0px 0px 20px 0px;
    text-align: left;
     background-color: #fff;
     display: inline-block;
  }
  .userNamePlace{
    text-align: left;
    font-size: 14px;
  }
</style>