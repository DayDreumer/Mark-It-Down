import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import axios from "axios"
import qs from 'qs'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.use(VueRouter);
Vue.use(ElementUI);
// var axios = require('axios')
axios.defaults.baseURL = "http://10.28.216.145:8008/api"

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
