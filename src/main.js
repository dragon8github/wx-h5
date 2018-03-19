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

// 稍后放到公共类库去
Date.prototype.format = function(fmt) { 
     var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
    }
    return fmt; 
}

// vue初始化
let initial = () => {
    // 添加宏让全局函数库注入Vue之中
    Vue.mixin({
        methods: {
            date2date (time) {
                var oldTime = (new Date(time)).getTime();
                var curTime = new Date(oldTime).format("yyyy-MM-dd");
                return curTime
            },
        }
    })
    new Vue({
        el: '#app',
        router,
        store,
        template: '<App/>',
        components: { App }
    })
}

// 将核心数据放入store中
store.dispatch('setAppData', {openId: window.openId || '6ad7f9ce-ad0e-457a-a608-6cd5ac67eca7'}).then(() => {
    // vue初始化
    initial()
})
