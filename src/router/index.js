import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import NotFound from '../views/NotFound'
import Blog from '../views/User/Blog'
import ClassSchedule from '../views/User/ClassSchedule'
import DocumentManage from '../views/PersonalCenter/DocumentManage'
import Center from "../views/PersonalCenter/Center"
import Account from "../views/PersonalCenter/Account"

Vue.use(VueRouter)

const router = new VueRouter({
  mode:'history',
  routes : [
    {
      path: '/',
      redirect: '/Home'
    },
    {
      // 主页
      path:'/home',
      name:'Home',
      component: Home,
      children:[
        {
          // 我的博客
          path: '/user/blog',
          name: 'Blog',
          component: Blog
        },
        {
          // 我的课程表
          path: '/user/classSchedule',
          name: 'ClassSchedule',
          component: ClassSchedule
        },
        {
          // 个人中心
          path: '/personalcenter/center',
          name: 'Center',
          component: Center,
          children:[
            {
              // 我的文件管理
              path: '/personalcenter/documentmanage',
              name: 'DocumentManage',
              component: DocumentManage
            },
            {
              // 我的账户信息
              path: '/personalcenter/account',
              name: 'Account',
              component: Account
            }
          ]
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
