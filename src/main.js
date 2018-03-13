import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Fastclick from 'fastclick'
import Bridge from './bridge'
import api from './fetch/api'

// 加载全局css
require('./sass/_common.scss')

// 加载第三方【快速点击】插件
Fastclick.attach(document.body)

// 兼容三星
window.Promise = require('promise')

// 加载API
Vue.use(api)

// vue初始化
let initial = () => {
    new Vue({
        el: '#app',
        router,
        store,
        template: '<App/>',
        components: { App }
    })
}

// 将核心数据放入store中
store.dispatch('setAppData', {openid: window.openid, isLogin: window.isLogin}).then(() => {
    // vue初始化
    initial()
    // 跳转页面
    if (window.goUrl) router.push(window.goUrl);
})
