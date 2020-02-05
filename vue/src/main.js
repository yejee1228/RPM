import Vue from 'vue'
import App from './RPM.vue'
import router from '@/router'
import axios from 'axios'
import {store} from '@/store'
import vuex from 'vuex'
import VModal from 'vue-js-modal'

Vue.use(VModal, { dynamic: true })
Vue.config.productionTip = false

new Vue({
  beforeCreate(){
    if(localStorage.getItem('token')){
      this.$store.dispatch('user/getUserInfo')
      this.$store.state.auth = true
    }
  },
  render: h => h(App),
  router,
  axios,
  store,
  vuex,
}).$mount('#app')
