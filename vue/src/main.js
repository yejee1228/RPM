import Vue from 'vue'
import App from './RPM.vue'
import router from '@/router'
import axios from 'axios'
import {store} from '@/store'
import vuex from 'vuex'
import VModal from 'vue-js-modal'

Vue.use(VModal, { dynamic: true })
Vue.config.productionTip = false
axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

new Vue({
  beforeCreate(){
    if(localStorage.getItem('token')!=undefined&&this.$store.state.user.auth==false){
      this.$store.dispatch('user/getUserInfo')
    }
  },
  render: h => h(App),
  router,
  axios,
  store,
  vuex,
}).$mount('#app')
