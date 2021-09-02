import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import MomentDeliver from '../views/Moment/MomentDeliver'
import MomentFollow from '../views/Moment/MomentFollow'
import NotFound from '../views/NotFound'
import MyDocument from '../views/PersonalCenter/MyDocument'

Vue.use(VueRouter)

const router = new VueRouter({
  mode:'history',
  routes : [
    {
      path: '/',
      redirect: '/login'
    },
    {
      // 登录页
      path:'/login',
      name:'Login',
      component: Login
    },
    {
      // 主页
      path:'/home',
      name:'Home',
      component: Home,
      children:[
        {
          // 关注人的动态
          path: '/moment/follow',
          name: 'MomentFollow',
          component: MomentFollow
        },
        {
          // 发出的动态
          path: '/moment/deliver/:num',
          name: 'MomentDeliver',
          component: MomentDeliver,
          props: true
        },
        {
          // 我的资料管理
          path: '/PersonalCenter/Mydocument',
          name: 'MyDocument',
          component: MyDocument
        }

      ]
    },
    {
      // 404 Not Found
      path: '*',
      component:NotFound
    },
  ]
})

export default router
