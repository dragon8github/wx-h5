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

// 正式环境
if (process.env.NODE_ENV === 'production') {
    // 默认后端会给我渲染一个openId，如果没有说明你不是从后端进来的.
    if (window.openId) {
        // 将核心数据放入store中
        store.dispatch('setAppData', {openId: window.openId || ''}).then(() => {
            // vue初始化
            initial()
        })
    } else {
        window.alert('请从微信中登录本应用');
    }
// 测试环境
} else {
    // 将写死的openid数据放入store中  13794942971  123456.a
    store.dispatch('setAppData', {openId: 'oRsEC1j8tXY17plMksWb_wqFJZ_U'}).then(() => {
        // vue初始化
        initial()
    })
}
