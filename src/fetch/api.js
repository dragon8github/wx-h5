import * as Constants from './constants'
import ajax from './handleFetch.js'

// 信贷API主体
let api = {}

// 汽车拍卖api主体
let carapi = {}

// 信贷API列表
const xd_api_list =  [
    // 登录
    'wechat_Login',
    // 注册
    'wechat_Register',
    // 找回密码
    'wechat_FindPwd',
    // 快速申请
    'wechat_FastApplyFor',
    // 我的借款
    'wechat_BorrowingRecord',
    // 我的还款
    'wechat_GetRepayingList',
    // 短信发送
    'wechat_SmsSend',
    // 判断验证码是否正确
    'wechat_CheckFindPwdCode',
]

// 汽车拍卖API列表
const car_api_list = [
    // 读取车辆拍卖信息
    'selectAuctionsPage',
    // 更新拍卖交易记录接口
    'updateAuctions',
    // 读取准入竞价用户信息
    'selectBiddersPage',
    // 读取拍卖最高价
    'selectMaxOfferPriceByAuctionId',
    // 拍卖记录查询
    'selectAuctionReg',
    // 拍卖报名
    'auctionSign',
]

// 信贷API一些请求参数约定
let xd_rule_post = function (key, data, isQuiet) {
    // 后端的格式要求：如果data只有一个数据的时候，那么不需要写key
    if (data && Object.keys(data).length === 1) { data = Object.values(data)[0] == null ? '' : Object.values(data)[0].toString() }
    // 后端的格式要求：data参数必须是字符串
    if (data && typeof(data) === 'object') { data = JSON.stringify(data) }
    // 发送post请求，并且返回请求结果
    return ajax.postData({ 'MethodName': key, 'Data': data }, isQuiet)
}

// 汽车拍卖API一些请求参数约定
let car_rule_post = function (key, data, isQuiet) {
  // 发送post请求，并且返回请求结果
  return ajax.postData({ 'MethodName': key, 'Data': data }, isQuiet)
}

// Proxy ：这样我访问api.fuck('shift')的时候，fuck就会作为key传过来，而shift就会作为data传过来。
if (typeof(Proxy) == 'function') {
    api = new Proxy({}, {
        get: (target, key, receiver) => (data, isQuiet = false) => { 
            return xd_rule_post(key,data, isQuiet)
        }
    })
    carapi = new Proxy({}, {
        get: (target, key, receiver) => (data, isQuiet = false) => { 
            return car_rule_post(key,data, isQuiet)
        }
    })
// 兼容不支持Proxy的情况，直接将所有API塞入数组中
} else {
    for (let [index,ele] of xd_api_list.entries()) {
        api[ele] = (data, isQuiet = false) => { 
          return xd_rule_post(ele, data, isQuiet)
      }
    }
    for (let [index,ele] of car_api_list.entries()) {
        api[ele] = (data, isQuiet = false) => { 
          return car_rule_post(ele, data, isQuiet)
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
  carapi,
  install (Vue) {
    Vue.prototype.api = api
      Vue.prototype.carapi = carapi
  }
}
