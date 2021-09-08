import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import axios from "axios"
import 'element-ui/lib/theme-chalk/index.css';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'


Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(mavonEditor)
axios.defaults.baseURL = "http://10.28.173.235:8008/api"

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
