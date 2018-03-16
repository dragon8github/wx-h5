import * as Constants from './constants'
import ajax from './handleFetch.js'

// 信贷API主体
let wdapi = {}
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

// 汽车拍卖主体
let carapi = {}
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

// Proxy ：这样我访问wdapi.fuck('shift')的时候，fuck就会作为key传过来，而shift就会作为data传过来。
if (typeof(Proxy) == 'function') {
    wdapi = new Proxy({}, {
        get: (target, key, receiver) => (data, isQuiet = false) => { 
            return ajax.postData('xindai/' + key, data, isQuiet)
        }
    })
    carapi = new Proxy({}, {
        get: (target, key, receiver) => (data, isQuiet = false) => { 
            return ajax.postData('carAction/' + key, data, isQuiet)
        }
    })

// 兼容不支持Proxy的情况，直接将所有API塞入数组中
} else {
    for (let [index,ele] of xd_api_list.entries()) {
        wdapi[ele] = (data, isQuiet = false) => { 
          return post('xindai/' + ele, data, isQuiet)
      }
    }
    for (let [index,ele] of car_api_list.entries()) {
        wdapi[ele] = (data, isQuiet = false) => { 
          return post('carAction/' + ele, data, isQuiet)
      }
    }
}

/**
 * 支持两种使用形式：
 * 1、Vue 插件化
 * 2、直接import使用,主要是兼容无法使用Vue实例的场景
 */
export default {
  wdapi,
  carapi,
  install (Vue) {
    Vue.prototype.wdapi = wdapi
    Vue.prototype.carapi = carapi
  }
}
