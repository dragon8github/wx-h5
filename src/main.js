// 切记结合 .babelrc "useBuiltIns": true, 使用
import "babel-polyfill"
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
    // 过网关 eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhcHAgand0IHRva2VuIiwiYXBwIjoiV1giLCJpc3MiOiJxaXV3ZW53dUBob25ndGUuaW5mbyIsImp0aSI6IjBkMmIzYTU5LWYwOTctNGMwOS1hNmViLTc4N2ZkMmE5YWViZCIsImlhdCI6MTUyMTYxOTU2NywiZXhwIjoxNTUzMTU1NTY3fQ.n60qFsdqNhHlowPSW7vjlFv7a7pT7bkLk0e3RMgy8s-6yDFsDhoEycfJ2fINDXrgKNiRjNNGstUCUe7JMOjQig
    window.Authorization = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvdXQgdXNlciBqd3QgdG9rZW4iLCJ1c2VySWQiOiIyNWFiMTRjNDQ2NGU0ZjU1OTc4MzYwZDU1OTMzODM2YiIsImllbWUiOiIzNTIwOTcwOTA4OTAxMzgiLCJpc3MiOiJxaXV3ZW53dUBob25ndGUuaW5mbyIsImlhdCI6MTUyNzU3NjU0NCwiZXhwIjoxNTI3NTgzNzQ0fQ.0kKWH81iIcfMGr-dDjCFjvX5l7KsZjXcs3xDZaTHcSLK8eJrLpsA3VPwxJTDcnlhqww1IwjdH43rseLWutdC4AeyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvdXQgdXNlciBqd3QgdG9rZW4iLCJ1c2VySWQiOiIyNWFiMTRjNDQ2NGU0ZjU1OTc4MzYwZDU1OTMzODM2YiIsImllbWUiOiIzNTIwOTcwOTA4OTAxMzgiLCJpc3MiOiJxaXV3ZW53dUBob25ndGUuaW5mbyIsImlhdCI6MTUyNzU3NjU0NCwiZXhwIjoxNTI3NTgzNzQ0fQ.0kKWH81iIcfMGr-dDjCFjvX5l7KsZjXcs3xDZaTHcSLK8eJrLpsA3VPwxJTDcnlhqww1IwjdH43rseLWutdC4A`
    // 13794942971  123456.a  oRsEC1tgZQApdeTKAskfUvFY0UqY
    // 15730186820  zhang110  oRsEC1ualLIvMV6E9-IHmZj-ZAQU
    // 18576614482  123456.a
    // 测试合同专用账号：18001894553 
    // 将写死的openid数据放入store中  
    store.dispatch('setAppData', {"app":"CLS_APP","ip":"10.110.1.131","systemName":"IOS","token":"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvdXQgdXNlciBqd3QgdG9rZW4iLCJ1c2VySWQiOiIyNWFiMTRjNDQ2NGU0ZjU1OTc4MzYwZDU1OTMzODM2YiIsImllbWUiOiIzNTIwOTcwOTA4OTAxMzgiLCJpc3MiOiJxaXV3ZW53dUBob25ndGUuaW5mbyIsImlhdCI6MTUyNzU3NjU0NCwiZXhwIjoxNTI3NTgzNzQ0fQ.0kKWH81iIcfMGr-dDjCFjvX5l7KsZjXcs3xDZaTHcSLK8eJrLpsA3VPwxJTDcnlhqww1IwjdH43rseLWutdC4A","userId":"38948ff6-f8ff-4cef-88ea-c013b0d09ae0","version":"99.99","identifyCard":"441900198801011037","customerName":"李鑫","phoneNumber":"15019223411","nickname":"codeyoyo","isLogin":false,"imei":"860596039207127","type":"04","page":1,"limit":15,"vehicleBrand":"","carModel":""}).then(() => {
        // vue初始化
        initial()
    })
}
