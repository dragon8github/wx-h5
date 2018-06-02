import * as Constants from './constants'
import ajax from './handleFetch.js'

// 微信API
let wxapi = {}

// 信贷API主体
let xdapi = {}

// 汽车拍卖主体
let carapi = {}

// 人才招聘
let recruit = {}

// Proxy ：这样我访问xdapi.fuck('shift')的时候，fuck就会作为key传过来，而shift就会作为data传过来。
if (typeof(Proxy) == 'function') {
    xdapi = new Proxy({}, {
        get: (target, key, receiver) => (data, isQuiet = false) => { 
            return ajax.postData('xindai/' + key, data, isQuiet)
        }
    })
    carapi = new Proxy({}, {
        get: (target, key, receiver) => (data, isQuiet = false) => {
            return ajax.postData('nonLogin/' + key, data, isQuiet)
        }
    })
    wxapi = new Proxy({}, {
        get: (target, key, receiver) => (data, isQuiet = false) => { 
            return ajax.postData(key, data, isQuiet)
        }
    })
    recruit = new Proxy({}, {
        get: (target,key,receiver) => (data,isQuiet = true) =>{
            return ajax.postData('recruit/' + key,data,isQuiet)
        }
    })

// 兼容不支持Proxy的情况，直接将所有API塞入数组中
} else {
    // 信贷API
    for (let [index,ele] of [
        // 登录
        'login',
        // 登录检测
        'loginCheck',
        // 注册
        'register',
        // 找回密码
        'findPwd',
        // 快速申请
        'fastApplyFor',
        // 我的借款
        'borrowingRecord',
        // 业务取消
        'businessCancel',
        // 我的还款
        'getRepayingList',
        // 短信发送
        'smsSend',
        // 判断验证码是否正确
        'checkFindPwdCode',
        // 历史详情
        'getRepaidList',
        // 还款详情
        'getRapayPlanBalance',
        // 获取电子签章验证码
        'sendSmsCode',
        // 合同确认操作接口
        'contractConfirm',
        // 合同列表接口
        'contractList',
        // 身份确认接口
        'identityConfirm',
        // 提交签名
        'contractSignature',
        // 埋点接口
        'buriedPoint',
    ].entries()) {
        xdapi[ele] = (data, isQuiet = false) => { 
          return ajax.postData('xindai/' + ele, data, isQuiet)
      }
    }

    // 汽车拍卖
    for (let [index,ele] of [
        // 我报过价的车辆
        'myBidCars',
        // 我的报价记录
        'myBids',
        // 读取车辆拍卖信息
        'selectAuctionsPage',
        // 更新拍卖交易记录接口
        'updateAuctions'
        // // 读取车辆拍卖信息
        // 'selectAuctionsPage',
        // // 更新拍卖交易记录接口
        // 'updateAuctions',
        // // 读取准入竞价用户信息
        // 'selectBiddersPage',
        // // 读取拍卖最高价
        // 'selectMaxOfferPriceByAuctionId',
        // // 拍卖记录查询
        // 'selectAuctionReg',
        // // 拍卖报名
        // 'auctionSign',
    ].entries()) {
        carapi[ele] = (data, isQuiet = false) => { 
          return ajax.postData('nonLogin/' + ele, data, isQuiet)
      }
    }

    // 微信api
    for (let [index,ele] of [
        // 获取微信配置
        'getWxConfig',
    ].entries()) {
        wxapi[ele] = (data, isQuiet = false) => { 
          return ajax.postData(ele, data, isQuiet)
      }
    }

    //人才招聘
    for(let [index,ele] of [
        'recruitListApp',
        'getProviceCity',
        'getProviceCityApp'
    ].entries()){
        recruit[ele] = (data, isQuiet = true) => {
            return ajax.postData('recruit/' + ele,data,isQuiet)
        }
    }
}

/**
 * 支持两种使用形式：
 * 1、Vue 插件化
 * 2、直接import使用,主要是兼容无法使用Vue实例的场景
 */
export default {
  wxapi,
  xdapi,
  carapi,
  recruit,
  install (Vue) {
    Vue.prototype.xdapi = xdapi
    Vue.prototype.carapi = carapi
    Vue.prototype.wxapi = wxapi
    Vue.prototype.recruit = recruit
  }
}
