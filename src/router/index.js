import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import NotFound from '../views/NotFound'
import Blog from '../views/User/Blog'
import ClassSchedule from '../views/User/ClassSchedule'
import wtiteBlog from "../views/User/writeBlog";
import showBlog from "../views/User/showBlog";
import DocumentManage from '../views/PersonalCenter/DocumentManage'
import Center from "../views/PersonalCenter/Center"
import Account from "../views/PersonalCenter/Account"
import myBlog from "../views/User/myBlog";
import HomgePage from "../views/HomePage"


Vue.use(VueRouter)

const router = new VueRouter({
  mode:'history',
  routes : [
    {
      path: '/',
      redirect: '/homepage'
    },
    {
      path: '/personalcenter/center',
      redirect: '/personalcenter/account'
    },
    {
      path: '/home',
      redirect: '/homepage'
    },
    {
      // 主页
      path:'/home',
      name:'Home',
      component: Home,
      children:[
        {
          // 首页展示
          path:'/homepage',
          name:"HomePage",
          component: HomgePage
        },
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
          // 写博客
          path: '/User/writeBlog',
          name: 'writeBlog',
          component: wtiteBlog
        },{
          //看博客
          path: '/User/showBlog',
          name: 'showBlog',
          component: showBlog
        },
        {
          //我的博客
          path: '/User/myBlog',
          name: 'myBlog',
          component: myBlog
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
