const fetch = require('node-fetch')
const XDAPI_SERVER = 'http://172.16.200.104:8084/apitest/api/wechat/doold'
const CARAPI_SERVER = 'http://10.110.1.145:30677/open/carAuction/'
const WX_SERVER = 'http://192.168.14.29:31006/xindai/'
// const uuid =  (function guid() {
//         function S4() {
//            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
//         }
//         return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
// })();

const uuid = 'da05b57a-ccc6-f043-fc7c-a6604f3d4a66'

const xdpost = (api, data) => {
   // 后端的格式要求：如果data只有一个数据的时候，那么不需要写key
   if (data && Object.keys(data).length === 1) { data = Object.values(data)[0] }
   // 后端的格式要求：data参数必须是字符串
   if (data && typeof(data) === 'object') { data = JSON.stringify(data) }
   // 如果为空
   if (data == null) data = ''

    // 拼接公共数据
    let form = {
        MethodName: api,
        Data : data,
        UserId: uuid
    }

    return fetch(XDAPI_SERVER, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        // 使用application/json请求，body参数必须是字符串
        body: JSON.stringify(form)
    }).then(data => {
        // json()方法可以返回json对象数据，是必用的套路
        return data.json()
    }).then(json => {
        // 拼接form请求参数，然后返回，方便调试
        json.form = JSON.stringify(data);
        return json;
    })
}

const carpost = (api, data) => {
    return fetch(CARAPI_SERVER + api, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        // 使用application/json请求，body参数必须是字符串
        body: JSON.stringify(data)
    }).then(data => {
        // json()方法可以返回json对象数据，是必用的套路
        return data.json()
    }).then(json => {
        // 拼接form请求参数，然后返回，方便调试
        json.form = JSON.stringify(data);
        return json;
    })
}


const wxpost = (api, data) => {
   // 拼接一下参数
   data = Object.assign({}, {openId: uuid}, data);
   return fetch(WX_SERVER + api, {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=UTF-8'},
        // 使用application/json请求，body参数必须是字符串
        body: JSON.stringify(data)
    }).then(data => {
        // json()方法可以返回json对象数据，是必用的套路
        return data.json()
    }).then(json => {
        // 拼接form请求参数，然后返回，方便调试
        json.form = JSON.stringify(data);
        return json;
    })
}

// 信贷API
const xdapi =  new Proxy({}, {
    get:  (target, key, receiver) => data => xdpost(key, data)
})

// 汽车拍卖API
const carapi =  new Proxy({}, {
    get:  (target, key, receiver) => data => carpost(key, data)
})


// 微信综合API
const wxapi =  new Proxy({}, {
    get:  (target, key, receiver) => data => wxpost(key, data)
})


// 报错专用
const Toast = function (text) {
    throw new Error(text)
}


module.exports = {
    xdapi,
    carapi,
    wxapi,
    Toast
}

