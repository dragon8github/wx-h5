import * as Constants from './constants'
import ajax from './handleFetch.js'

let api = {}

if (typeof(Proxy) == 'function') {
  api =  new Proxy({}, {
      get: (target, key, receiver) => (data, isQuiet = false) => { 
          // 后端的格式要求：如果data只有一个数据的时候，那么不需要写key
          if (data && Object.keys(data).length === 1) { data = Object.values(data)[0] == null ? '' : Object.values(data)[0].toString() }
          // 后端的格式要求：data参数必须是字符串
          if (data && typeof(data) === 'object') { data = JSON.stringify(data) }
          // 发送post请求，并且返回请求结果
          return ajax.postData({ 'MethodName': key, 'Data': data }, isQuiet)
      }
  })
} else {
    let api_arr = [
                    'wechat_Login',
                    'wechat_SmsSend',
                    'wechat_SmsSend',
                    'wechat_SmsSend',
                    'wechat_Register',
                    'wechat_SmsSend',
                    'wechat_FindPwd',
                    'wechat_FastApplyFor',
                    'wechat_BorrowingRecord',
                    'wechat_GetRepayingList',
                  ]
    for (let [index,ele] of api_arr.entries()) {
        api[ele] = (data, isQuiet = false) => { 
          // 后端的格式要求：如果data只有一个数据的时候，那么不需要写key
          if (data && Object.keys(data).length === 1) {  data = Object.values(data)[0] == null ? '' : Object.values(data)[0].toString() }
          // 后端的格式要求：data参数必须是字符串
          if (data && typeof(data) === 'object') { data = JSON.stringify(data) }
          // 发送post请求，并且返回请求结果
          return ajax.postData({ 'MethodName': ele, 'Data': data }, isQuiet)
      }
    }
} 

/**
 * 支持两种使用形式：
 * 1、Vue 插件化
 * 2、直接import使用,主要是兼容无法使用Vue实例的场景
 */
export default {
  api,
  install (Vue) {
	  Vue.prototype.api = api
  }
}
