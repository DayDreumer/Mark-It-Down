import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import NotFound from '../views/NotFound'
import Blog from '../views/User/Blog'
import ClassSchedule from '../views/User/ClassSchedule'
import Register from '../views/Register'

Vue.use(VueRouter)

const router = new VueRouter({
  mode:'history',
  routes : [
    {
      path: '/',
      redirect: '/Home'
    },
    {
      // 登录页
      path:'/login',
      name:'Login',
      component: Login
    },
    {
      // 注册页
      path:'/register',
      name:'Register',
      component:Register
    },
    {
      // 主页
      path:'/home',
      name:'Home',
      component: Home,
      children:[
        {
          // 我的博客
          path: '/User/Blog',
          name: 'Blog',
          component: Blog
        },
        {
          // 我的课程表
          path: '/User/ClassSchedule',
          name: 'ClassSchedule',
          component: ClassSchedule
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
