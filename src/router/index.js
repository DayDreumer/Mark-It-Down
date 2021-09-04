import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import MomentDeliver from '../views/Moment/MomentDeliver'
import MomentFollow from '../views/Moment/MomentFollow'
import NotFound from '../views/NotFound'
import MyDocument from '../views/PersonalCenter/MyDocument'
import Blog from '../views/User/Blog'
import ClassSchedule from '../views/User/ClassSchedule'
import Register from '../views/Register'
import wtiteBlog from "../views/User/wtiteBlog";
import showBlog from "../views/User/showBlog";

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
        },
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
        },
        {
          // 写博客
          path: '/User/writeBlog',
          name: 'writeBlog',
          component: wtiteBlog
        },{
          //看博客
          path: '/User/showBlog',
          name: 'showBlog',
          component: showBlog
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
