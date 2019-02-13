import axios from 'axios'
import {message} from 'antd'
import reducer from '../redux'
import cookie from '../utils/cookie'
function unlogin() {
    reducer.dispatch({
        type: 'LOGOUT'
    })
    cookie.removeItem('max_blog')
    window.location.href = '#/sign/in'
}

// axios.defaults.baseURL = '/blog'
axios.interceptors.response.use(
    (response: any): any => {
        let res
        if (response.data === undefined) {
            res = JSON.parse(response.request.responseText)
        } else {
            res = response.data
        }
        if ('4001, 4002'.includes(res.code)) {
            unlogin()
            return Promise.reject(res)
        }
        if (res.code === '0000') {
            return res
        } else {
            message.error(res.msg)
            return Promise.reject(res)
        }
    },
    (err: any) => {
        let msg = err.response.statusText || '请求错误'
        message.error(msg)
        switch (err.response.status) {
            case 401:
                unlogin()
        }
        return Promise.reject(msg) // 返回接口返回的错误信息
    }
)
export default axios