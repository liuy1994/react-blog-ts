import axios from 'axios'
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
    if ('401,601'.includes(res.code)) {
      window.location.href = '#/sign/in'
      return Promise.reject(res)
    }
    return res.data
  },
  (err:any) => {
    if (err && err.response) {
      err.message = '请求错误'
    }
    return Promise.reject(err) // 返回接口返回的错误信息
  }
)
export default axios