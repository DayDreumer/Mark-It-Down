import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import NotFound from '../views/NotFound'
import Blog from '../views/User/Blog'
import wtiteBlog from "../views/User/writeBlog";
import showBlog from "../views/User/showBlog";
import DocumentManage from '../views/PersonalCenter/DocumentManage'
import Center from "../views/PersonalCenter/Center"
import Account from "../views/PersonalCenter/Account"
import myBlog from "../views/User/myBlog";
import Calendar from "../views/Calendar"


Vue.use(VueRouter)

const router = new VueRouter({
  mode:'history',
  routes : [
    {
      path: '/',
      redirect: '/user/blog'
    },
    {
      path: '/personalcenter/center',
      redirect: '/personalcenter/account'
    },
    {
      path: '/home',
      redirect: '/user/blog'
    },
    {
      // 主页
      path:'/home',
      name:'Home',
      
      component: Home,
      children:[
        {
          // 日历展示
          path:'/calendar',
          name:"Calendar",
          
          component: Calendar
        },
        {
          // 我的博客
          path: '/user/blog',
          name: 'Blog',
          
          component: Blog
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
