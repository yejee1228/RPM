import Vue from 'vue'
import Router from 'vue-router'
import SearchMain from '@/components/contents/SearchMain.vue'
import Home from '@/components/cmm/Home.vue'
import Join from '@/components/user/Join.vue'
import Login from '@/components/user/Login.vue'
import Product from '@/components/contents/Product.vue'
import Sale from '@/components/contents/Sale.vue'
import Magazine from '@/components/magazine/Magazine.vue'
import ChartMaker from '@/components/magazine/Datacenter.vue'
import UserUpdate from '@/components/user/UserUpdate.vue'
import SeenCar from '@/components/contents/SeenCar.vue'
import Condition from "@/components/recommend/Condition.vue"
import RecommendContent from "@/components/recommend/RecommendContent.vue"
import CarList from "@/components/company/CarList.vue"
import CompanyHome from "@/components/company/CompanyHome.vue"
import CustomerDetail from "@/components/company/CustomerDetail.vue"
import CustomerDetailRight from "@/components/company/CustomerDetail_right.vue"
import BestCarList from "@/components/company/BestCarList.vue"
import CompanyMain from "@/components/company/CompanyMain.vue"
import CustomerList from "@/components/company/CustomerList.vue"
import RecommendHome from "@/components/recommend/RecommendHome.vue"
import SnsPage from "@/components/social/SnsPage.vue"
import SnsDetail from "@/components/social/SnsDetail.vue"
import SnsModify from "@/components/social/SnsModify.vue"
import SnsWrite from "@/components/social/SnsWrite.vue"
import Payment from '@/components/contents/Payment.vue'
import axios from 'axios'
Vue.use(Router)




export default new Router({
    mode: 'history',
    base:process.env.BASE_URL,
    routes : [
        {path: '/searchmain', name: 'searchmain', component: SearchMain},
        {path:'/', name:'home', component : Home},
        {path:'/join', name:'join', component : Join},
        {path:'/login', name:'login', component : Login},
        {path:'/product', name:'product', component : Product},
        {path:'/updateuser', name:'updateUser', component : UserUpdate},
        {path:'/seencar', name:'seencar', component : SeenCar},
        {path:'/magazine', name:'magazine', component : Magazine},
        {path:'/chartMaker', name:'chartMaker', component : ChartMaker},
        {path:'/sale', name:'sale', component : Sale},
        {path:'/sns', name:'snspage', component : SnsPage},
        {path:'/snsdetail', name:'snsdetail', component : SnsDetail},
        {path:'/snsmodify', name:'snsmodify', component : SnsModify},
        {path:'/snswrite', name:'snswrite', component : SnsWrite},
        {path:'/payment', name:'payment', component : Payment},
        {path: '/customerDetail', component:CustomerDetail,children:
        [
            {path: '', component:CustomerDetailRight },
            {path: 'bestCarList',name: 'bestCarList', component:BestCarList }
        ]
        },
        {path: '/companyHome', beforeEnter : (to, from, next)=>{
            const token = localStorage.getItem("token")
let headers = {headers : {
        'Accept' : 'application/json',
    }}
axios.post('http://localhost:8080/getAuth',token,headers)
    .then(({data})=>{
        if(data.result && data.auth === 'ADMIN'){
            return next();
        }else{
            alert(`권한이 없습니다!`)
            return next('/login');
        }
    })
    .catch(()=>{
        return next('/login')
    })
}, component:CompanyHome ,children:
                [
                    {path: '', name: 'companyMain', component:CompanyMain },
                    {path: 'customerList',name: 'CustomerList', component: CustomerList},
                    {path: 'carList',name: 'CarList', component: CarList}]},
        {path: '/recommendHome', component:RecommendHome, children:[
                {path: '',name: 'RecommendContent', component: RecommendContent},
                {path: 'condition',name: 'Condition', component: Condition}]}
    ]
})