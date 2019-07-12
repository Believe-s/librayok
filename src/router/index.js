// 创建路由对象,配置路由规则和其他路由配置
import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome }
      ] },
    // 路径如果能够走到这个位置,证明没有任何程序去处理这个程序
    { path: '*', name: '404', component: NotFound }
  ]
})

// 注册一个全局的前置导航守卫
router.beforeEach((to, from, next) => {
  // 如果不去主动的触发,resolve (next   下一步)会一直等待
  // console.log('ok')
  // 如果是登陆页面  放行
  if (to.path === '/login') return next()
  // 判断登录状态
  const user = window.sessionStorage.getItem('libray')
  if (user) {
    next()
  } else {
    next('/login')
  }
  // const user = window.sessionStorage.getItem('libray')
  // if (to.path !== '/login' && !user) return next('/login')
  // next()
})
export default router
