// 封装axios
import axios from 'axios'
import JSONBig from 'json-bigint'
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  // headers: {
  //   Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('libray')).token
  // }
  transformResponse: [(data) => {
    // 处理格式--
    // data 可能没有数据 null 严谨判断
    if (data) {
      return JSONBig.parse(data)
    }
    // 如果data存在,使用jsonbig.parse专程json字符串,没有就return
    return data
  }]
})

// 请求拦截器
instance.interceptors.request.use(config => {
  // config 请求配置对象
  // 修改 config
  const user = window.sessionStorage.getItem('libray')
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, error => {
  // 创建promise对象的方式 new promise() 结果可能成功可能失败
  // promise.resolve() 创建一个成功的promise
  // promise.reject() 创建一个失败的promise
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(response => {
  return response
}, error => {
  // 做自己的事情 错误的时候
  // 如果响应状态码是401 拦截到登陆页面
  // error.response.status 状态码
  if (error.response && error.response.status === 401) {
    // hash 是location提供获取操作 地址栏的#后的地址的属性
    location.hash = '#/login'
  }
  // console.log(error)
  return Promise.reject(error)
})
export default instance
