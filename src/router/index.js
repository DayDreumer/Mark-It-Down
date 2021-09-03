import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import NotFound from '../views/NotFound'
import Blog from '../views/User/Blog'
import ClassSchedule from '../views/User/ClassSchedule'
import DocumentManage from '../views/PersonalCenter/DocumentManage'

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
          // 我的文件管理
          path: '/PersonalCenter/DocumentManage',
          name: 'DocumentManage',
          component: DocumentManage
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
