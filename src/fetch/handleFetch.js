// 请求API地址
import * as Constants from './constants'
// Toast 组件
import Toast from '@components/toast/index.js'
// messagebox 组件
import msg from '@components/messagebox/messagebox.js'
// loader 组件
import Loader from '@components/loader/index.js'
// 状态管理工具vuex
import store from '../store/index.js';
// Fetch兼容插件
import 'whatwg-fetch'

/**
 * helper methods
 * 验证状态码
 */
const checkStatus = async(response) => {
    // 请求数量--
    store.dispatch('set_fetch_count', '-');

    // 判断请求状态
    if (response.status >= 200 && response.status < 300) {
        // 返回Promise 
        return response.json()
    } else {
      // 服务器响应异常
      Toast('网络异常:' + response.status)
      throw new Error(response.statusText)
    }
}


/**
 * helper methods
 * 检查是否有登录权限
 */
const checkLog = json => {
    // 如果请求数量已经为0，那么关闭loader.并且重置fetchCount
    if (store.state.fetchCount <= 0) {
        // 重置fetchCount
        store.dispatch('set_fetch_zero')
        // 关闭loader
        Loader.hide()
    }

    // 如果状态码为205的话，说明需要重新登录了
    if (json.ReturnCode == 205) {
        msg.alert('登录状态失效，请退出后重新登录账号！', '警告').then(() => {
           // 退出登录并且回到登录页API
           window.router.push('/login')
        })
    }

    return json
}


/**
 * helper methods
 * 检查是否重复登录
 */
const checkRepLog = json => {

    // 如果请求数量已经为0，那么关闭loader.并且重置fetchCount
    if (store.state.fetchCount <= 0) {
        // 重置fetchCount
        store.dispatch('set_fetch_zero')
        // 关闭loader
        Loader.hide()
    }

    // 如果状态码为4的话，说明账号被人抢占了。要求对方重新登录！
    if (json.ReturnCode == 4) {
         msg.alert('登录状态失效，请退出后重新登录账号！', '警告').then(() => {
             // 退出登录并且回到登录页API
             bridge.exec('LoginOut', (response) => {
                 // code...
             }, (err) => {
                 // code...
             }, {})
         });
    }

    return json
}



/**
 * helper methods
 * 抛出响应异常
 */
const throwError = (err) => {
    // 请求数量--
    store.dispatch('set_fetch_count', '-')

    // 如果请求数量已经为0，那么关闭loader。并且仅弹出一次错误提示.并且重置fetchCount
    if (store.state.fetchCount <= 0) {
        // 重置fetchCount
        store.dispatch('set_fetch_zero')
        // 关闭loader
        Loader.hideAll()
        // 弹出异常提示
        Toast('网络不稳定,请稍后重试')
    }

    // 弹出错误供调试
    console.log("接口返回异常" + err)
    throw new Error("接口返回异常:" + err)
}


/**
 * core methods
 * 发送请求
 * isQuiet 为 treu 时表示偷偷的运行，不显示loading图.某些业务需要偷偷进行的
 */
const handleFetch = async(api, params, isQuiet = false) => {
    // 默认配置
    let header = { headers: { "Content-Type": "application/json", 'token': store.state.token }}

    // 拼接默认配置，
    let option = Object.assign(params, header)

    // 将公共参数合并到body属性中去，后面的参数会覆盖前面的参数
    let body = Object.assign(store.getters.AppData, option.body)

    // 在进行fetch请求时，body参数必须字符串化.
    option.body = JSON.stringify(body)

    // 请求数量++
    store.dispatch('set_fetch_count', '+')

    // 是否显示loading？
    // 默认开启了loading，并且启动了超时限制。
    // 如果 isQuiet 为true时，不启动loading
    if (isQuiet === false) {
        // 开始倒计时
        store.dispatch('startTimer')
        // 打开蒙版loading
        Loader.show('加载中...')
    }
    
    // 开发环境使用代理地址请求数据
    const url = process.env.NODE_ENV === 'development' ?  '/api/' + api : Constants.API_WX_SERVER + api

    // 一切准备就绪，开始HTTP请求.请注意返回的是Promise对象.调用者必须通过使用.then(data=>{}).catch(err=>{})来操作Promose
    return window.fetch(url, option).then(checkStatus).then(checkLog).catch(throwError);
}

/**
 * core methods
 * 发送post请求
 * 如果isQuiet 为 true 的话，则不开启loading。悄悄偷偷摸摸在后台运行
 */
const postData = (api, params, isQuiet = false) => {
    return handleFetch(api, {method: 'POST', body: params }, isQuiet)
}

export default {
    postData
}