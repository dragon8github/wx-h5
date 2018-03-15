import * as Constants from './constants'
import ajax from './handleFetch.js'

// 信贷API主体
let api = {}

// 信贷API列表
const xd_api_list =  [
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
    'wechat_CheckFindPwdCode',
]

// 信贷API一些请求约定
let xd_rule_post = function (key, data, isQuiet) {
    // 后端的格式要求：如果data只有一个数据的时候，那么不需要写key
    if (data && Object.keys(data).length === 1) { data = Object.values(data)[0] == null ? '' : Object.values(data)[0].toString() }
    // 后端的格式要求：data参数必须是字符串
    if (data && typeof(data) === 'object') { data = JSON.stringify(data) }
    // 发送post请求，并且返回请求结果
    return ajax.postData({ 'MethodName': key, 'Data': data }, isQuiet)
}

// Proxy ，这样我访问api.fuck('shift')的时候， fuck就会作为key传过来，而shift就会作为data传过来。
if (typeof(Proxy) == 'function') {
    api =  new Proxy({}, {
        get: (target, key, receiver) => (data, isQuiet = false) => { 
            return xd_rule_post(key,data, isQuiet)
        }
    })
// 兼容不支持Proxy的情况
} else {
    for (let [index,ele] of xd_api_list.entries()) {
        api[ele] = (data, isQuiet = false) => { 
          return xd_rule_post(ele, data, isQuiet)
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
