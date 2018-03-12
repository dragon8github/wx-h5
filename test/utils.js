const fetch = require('node-fetch')
const API_SERVER = 'http://192.168.14.83:8080/wechat/'

const post = (api, data) => {
    // 如果数据为空，那么就传递空字符串
    if (data == null) data = ''

    // 拼接公共数据
    let form = {
        MethodName: api,
        Data : data,
    }

    // 使用fetch进行post请求，并且body参数必须是字符串
    return fetch(API_SERVER + api, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form)
    // fetch的.json()方法可以返回json数据
    }).then(data => {
        return data.json()
    // 拼接form请求参数，然后返回，方便调试
    }).then(json => {
        json.form = form;
        return json;
    })
}

// TODO；生成测试页面
const api =  new Proxy({}, {
    get:  (target, key, receiver) => data => post(key, data)
})

module.exports = {
    api
}

