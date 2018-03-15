import * as Constants from './constants'
import ajax from './handleFetch.js'

// 信贷API主体
let api = {}

// 信贷API一些请求参数约定
let post = function (key, data, isQuiet) {
    // 发送post请求，并且返回请求结果
    return ajax.postData(key, data, isQuiet)
}

// Proxy ：这样我访问api.fuck('shift')的时候，fuck就会作为key传过来，而shift就会作为data传过来。
if (typeof(Proxy) == 'function') {
    api = new Proxy({}, {
        get: (target, key, receiver) => (data, isQuiet = false) => { 
            return post(key, data, isQuiet)
        }
    })
// 兼容不支持Proxy的情况，直接将所有API塞入数组中
} else {
    for (let [index,ele] of xd_api_list.entries()) {
        api[ele] = (data, isQuiet = false) => { 
          return post(ele, data, isQuiet)
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
