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
                if(data.result == "success") {
                    commit('LOGIN_COMMIT', data)
                    localStorage.setItem('auth',data.user.auth)
                    localStorage.setItem("token", data.token)
                    localStorage.setItem("userId",data.user.userid)
                    if(data.user.auth==0) {
                        if(data.mycar){localStorage.setItem("mycar", JSON.stringify(data.mycar))
                            if(data.record){localStorage.setItem("record", JSON.stringify(data.record))}
                        }
                        router.push('/')
                    }else{
                        router.push('/companyHome')
                    }
                }else{
                    commit('fail_commit')
                }
            })
            .catch(()=>{
                alert('axios fail')
            })
    },
    async logout({commit}){
        commit('LOGOUT_COMMIT')
        localStorage.removeItem("token")
        localStorage.removeItem("mycar")
        localStorage.removeItem("record")
        localStorage.removeItem("userId")

    },
    async getUserInfo({commit}){
        let token = localStorage.getItem("token")
        let headers = {  'authorization': 'JWT fefege..',
            'Accept' : 'application/json',
            'Content-Type': 'application/json'}
        axios.post('http://localhost:8080/getUserInfo/'+token , headers)
            .then(({data})=>{
                if(data.result === "success"){
                    commit('LOGIN_COMMIT', data)
                }else{
                    commit('LOGOUT_COMMIT')

                }
            })
    }
}
const mutations = {
    LOGIN_COMMIT(state, data){
        state.auth = true
        state.user = data.user
    },

    LOGOUT_COMMIT(state){
        state.auth = false
        state.member  = {}
        console.log('로그아웃' + state.auth)
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