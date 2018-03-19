import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Fastclick from 'fastclick'
import Bridge from './bridge'
import api from './fetch/api'
import methods from './methods'

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
    // 添加宏让全局函数库注入Vue之中
    Vue.mixin({
        methods: methods
    })
    new Vue({
        el: '#app',
        router,
        store,
        template: '<App/>',
        components: { App }
    })
}

if (process.env.NODE_ENV === 'production') {
    if (window.openId) {
        // 将核心数据放入store中
        store.dispatch('setAppData', {openId: window.openId || ''}).then(() => {
            // vue初始化
            initial()
        })
    } else {
        window.alert('请从微信中登录本应用φ(≧ω≦*)♪');
    }
} else {
    // 将核心数据放入store中
    store.dispatch('setAppData', {openId: window.openId || '6ad7f9ce-ad0e-457a-a608-6cd5ac67eca7'}).then(() => {
        // vue初始化
        initial()
    })
}
