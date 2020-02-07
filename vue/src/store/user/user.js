import axios from 'axios'
import router from '@/router'

const state = {
    user : {},
    auth: false,
    fail: false
}
const getters = {
    getMember : state=>state.user,
    getIsAuth : state=>state.auth,
    getFail : state=> state.fail
}

const actions = {
    async login({commit}, loginData ){
        let url = `http://localhost:8080/login`
        let headers ={  'authorization': 'JWT fefege..',
            'Accept' : 'application/json',
            'Content-Type': 'application/json'}
        axios.post(url, loginData , headers )
            .then(({data})=>{
                if(data.result) {
                    commit('LOGIN_COMMIT', data)
                }else{
                    commit('fail_commit')
                }
            })
            .catch(()=>{
                state.fail = true
            })
    },
    async logout({commit}){
        commit('LOGOUT_COMMIT')
    },
    async getUserInfo({commit}){
        const token = localStorage.getItem("token")
        let headers = {headers : {
                'Accept' : 'application/json',
            }}
        axios.post('http://localhost:8080/getUserInfo',token,headers)
            .then(({data})=>{
                if(data.result){
                    commit('LOGIN_COMMIT', data)
                }else{
                    commit('LOGOUT_COMMIT')
                    alert(`로그인을 다시 해주세요!`)
                    router.push('/login')
                }
            })
    }
}
const mutations = {
    LOGIN_COMMIT(state, data){
        state.fail = false
        state.auth = true
        state.user = data.user
        localStorage.setItem("token", data.token)
        localStorage.setItem("userId",data.user.userid)
        if(data.user.auth==="USER") {
            if(data.mycar!=undefined){
                localStorage.setItem("mycar", JSON.stringify(data.mycar))
                if(data.record!=undefined){
                    localStorage.setItem("record", JSON.stringify(data.record))
                }
            }
            router.push('/')
        }else{
            router.push('/companyHome')
        }
    },

    LOGOUT_COMMIT(state){
        localStorage.clear()
        state.fail = false
        state.auth = false
        state.user  = {}
    },
    fail_commit(state){
        state.fail = true
    }
}
export default {
    name: 'user',
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}