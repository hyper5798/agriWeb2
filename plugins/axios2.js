/**
 * 用于浏览器端ajax请求
 */

import Axios from 'axios'
import { Message } from 'iview'

// 环境变量
const env = process.env.NODE_ENV || 'development'

let baseUrl = {
  development: 'http://161.202.32.59:8000',
  test: 'https://crmfront.tiaoweilian.com',
  production: 'https://crm.youjiangliao.com'
}

let options = {
  baseURL: baseUrl[env],
  timeout: 5000,
  responseType: 'json',
  headers: {
    post: {
      'Content-Type': 'application/json'
    }
  }
}
// 创建实例
let axios = Axios.create(options)

// 拦截
axios.interceptors.response.use(
  res => {
    /* if (res.status && res.status === 200 && res.data.status === 'error') {
      return
    } */
    // console.log('axios2 res:')
    // console.log(res)
    if (res.data.responseCode != '000') {
      let msg = res.request.responseURL+ ' >> ' +res.data.responseMsg;
      console.log(msg)
      Message.error(msg || '無法取得資料')
    }
     
    return res
  },
  err => {
    console.log('axios2 err: ')
    console.log(err)
    if (err.response.status !== 200) {
      if (process.client) {
        Message.error(err.response.data.msg || '')
      }
    }
    return Promise.resolve(err.response)
  }
)
export default axios
