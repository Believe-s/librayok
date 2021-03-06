import Vue from 'vue'
import App from './App.vue'

// 即可 默认加载索引文件 index.js
// 在vue-cli创建的项目中 @的前缀 代表的是根路径 src目录
import router from '@/router'

// 导入ui
import ElementUI from 'element-ui'
// 引入样式
import 'element-ui/lib/theme-chalk/index.css'
// 在全局范围注册组件(注册element-ui 组件库)

import axios from '@/api/axios'
// // 基准路径
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// // 请求头
// axios.defaults.headers = {
//   // token 认证需要的字段 值:注意需要加上前缀 Bearer后面加上一个空格
//   Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('libray')).token
// }
import comments from '@/components'

// 引入全局样式
import '@/styles/index.less'

Vue.use(comments)
Vue.prototype.$http = axios

Vue.use(ElementUI)

Vue.config.productionTip = false

// 职责1: 依赖项目需要的资源(js模块 css资源 ...)
// 职责2: 实例化根实例 render() vue实例中的一个选项 渲染App组件,然后挂载到#app的容器内
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
