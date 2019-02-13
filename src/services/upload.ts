import axios from '../utils/axios'
import {AxiosResponse} from 'axios'
export interface File {
  name: string,
  size: number,
  type: string,
}
export default (file: Blob & File) => {
  return axios.post('file/getPolicy').then((res: AxiosResponse) => {
    const formData = new FormData()
    for (const key in res.data) {
      if (key !== 'host') {
        formData.append(key, res.data[key])
      }
    }
    formData.append('name', file.name)
    formData.append('key', res.data.dir + '/' + file.name)
    formData.append('file', file)
    formData.append('success_action_status', '200')
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onerror = function error(e) {
        reject(e)
      }
      xhr.onload = function onload() {
        if (xhr.status < 200 || xhr.status >= 300) {
          reject(xhr.status)
        }
        console.log(`${res.data.host}/blog/${file.name}`)
        resolve(`${res.data.host}/blog/${file.name}`)
      }
      xhr.open('post', res.data.host, true)
      xhr.send(formData)
    })
  })
}