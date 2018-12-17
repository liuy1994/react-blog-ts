import axios from 'axios'
import { message } from 'antd'
import docCookies from './docCookies'
import store from '../redux'
function unlogin() {
  store.dispatch({
    type: 'LOGOUT'
  })
  docCookies.removeItem('max_blog')
  window.location.href = '#/sign/in'
}
axios.defaults.baseURL = '/blog'
axios.interceptors.request.use(
  (config: any) => {
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  (response: any) => {
    let res
    // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
    if (response.data === undefined) {
      res = JSON.parse(response.request.responseText)
    } else {
      res = response.data
    }
    // 根据返回的code值来做不同的处理（和后端约定）
    if ('4001, 4002'.includes(res.code)) {
      unlogin()
      return Promise.reject(res)
    }
    if (res.code === '0000') {
      return res.data
    } else {
      message.error(res.msg)
      return Promise.reject(res)
    }
  },
  (err:any) => {
    let message = err.response.statusText || '请求错误'
    switch (err.response.status) {
      case 401:
        unlogin()
    }
    // message.error(message)
    return Promise.reject(message) // 返回接口返回的错误信息
  }
)
export default axios