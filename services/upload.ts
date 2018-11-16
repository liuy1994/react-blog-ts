import axios from '../utils/axios'
console.log(axios)
export default (file: any) => {
  return axios.post('file/getPolicy').then((data: any) => {
    const formData = new FormData()
    for (const key in data) {
      if (key !== 'host') {
        formData.append(key, data[key])
      }
    }
    formData.append('name', file.name)
    formData.append('key', data.dir + '/' + file.name)
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
        console.log(`${data.host}/blog/${file.name}`)
        resolve(`${data.host}/blog/${file.name}`)
      }
      xhr.open('post', data.host, true)
      xhr.send(formData)
    })
  })
}