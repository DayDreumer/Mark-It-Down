import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
