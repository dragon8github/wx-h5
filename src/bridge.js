// 判断是否ios系统
let isIOS = () => {
    return navigator.userAgent.match(/(iPad|iPhone)/)
}

// 初始化android jsbridge
let connectWebViewJavascriptBridge = function(cb) {
    if (window.WebViewJavascriptBridge) {
        typeof cb === 'function' && cb.call(this, window.WebViewJavascriptBridge)
    } else {
        document.addEventListener(
            'WebViewJavascriptBridgeReady',
            function() {
                typeof cb === 'function' && cb.call(this, window.WebViewJavascriptBridge)
            },
            false
        )
    }
}

// ios 调用处理
let iosHandler = function(method, successCb, failCb, params) {
    if (!window[method]) {
        console.error('没有此方法::' + method)
        return
    }
    window[method](function(response) {
        typeof successCb === 'function' && successCb.call(this, JSON.parse(response))
    }, function(response) {
        typeof failCb === 'function' && failCb.call(this, JSON.parse(response))
    }, params)
}

// android 调用处理
let androidHandler = function(method, successCb, failCb, params) {
    if (!window.WebViewJavascriptBridge) {
        console.error('android没有此方法::' + method)
        return
    }
    window.WebViewJavascriptBridge.callHandler(
            method, params,
            function(responseData) {
                // console.log("监听Android的问题:" + responseData);
                typeof successCb === 'function' && successCb.call(this, JSON.parse(responseData));
            }
        )
        // window.WebViewJavascriptBridge.callHandler(
        //     method,
        //     function(responseData) {
        //         typeof successCb === 'function' && successCb.apply(this, arguments);
        //     },
        //     function(responseData) {
        //         typeof failCb === 'function' && failCb.apply(this, arguments);
        //     },
        //     params
        // )

}

let registeAndroidEvent = function(method, cb) {
    connectWebViewJavascriptBridge(function(bridge) {
        try {
            if (!window.WebViewJavascriptBridge._messageHandler) {
                bridge.init(function(message, responseCb) {
                    let data = {
                        'Javascript respones': '测试中文'
                    }
                    method === 'init' && typeof cb === 'function' && cb.apply(this, arguments);
                    responseCb(data)
                })
            }
        } catch (e) {
            console.error("jsbridge-----error--", e)
        }
        if (method !== 'init') {
            bridge.registerHandler(method, function(data, responseCb) {
                let responseData = "Javascript Says Right back aka!"
                typeof cb === 'function' && cb.apply(this, arguments)
                responseCb(responseData)
            });
        }
    });
}

let BridgeConstructor = function() {}

BridgeConstructor.prototype = {
    constructor: BridgeConstructor,
    // 生命周期
    /*
        initCb：初始化回调
        webonResumeCb：打开活动页回调（只执行一次，hybrid app初始化在这里执行）
        webonPauseCb：离开webview回调（情况1:离开webview，情况2: 打开webview后，挂起ap）
        webonDestroyCb：销毁进程回调
        webonResumeHomeCb: 离开后回到页面时回调
     **/
    deviceReady(initCb, webonResumeCb, webonPauseCb, webonDestroyCb, webonResumeHomeCb) {
        if (isIOS()) {
            /*
            step:
            1： h5界面加载完毕 注册h5调用原生的方法， 此时原生调用h5 传参数1
            2： 当前的h5界面 将进入了下一个界面或者上一个界面。 此时传参2
            3: 用户按home键 将程序退至后台， 此时传参3
            4: 用户重新启动程序(程序由后台切换至前台), 此时传数4
            */
            // 问了作者都不知道这句话是什么意思！ 
            // !window.ToAppLifeCycle && console.error('不支持jsbridge')

            window.ToAppLifeCycle = function(step) {
                setTimeout(() => {
                    switch (step) {
                        case 1:
                            typeof webonResumeCb === 'function' && webonResumeCb.apply(this, arguments)
                            break;
                        case 2:
                            typeof webonPauseCb === 'function' && webonPauseCb.apply(this, arguments)
                            break;
                        case 3:
                            typeof webonPauseCb === 'function' && webonPauseCb.apply(this, arguments)
                            break;
                        case 4:
                            typeof webonResumeHomeCb === 'function' && webonResumeHomeCb.apply(this, arguments)
                            break;
                    }
                }, 0)
            }
        } else {
            setTimeout(() => {
                registeAndroidEvent('init', initCb)
                registeAndroidEvent('WebonResume', webonResumeCb)
                registeAndroidEvent('WebonResumeHome', webonResumeHomeCb)
                registeAndroidEvent('WebonPause', webonPauseCb)
                registeAndroidEvent('WebonDestroy', webonDestroyCb)
            }, 0)

        }

    },
    // 统一调用方法
    exec(methodName, successCb, failCb, params) {
        try {
            if (isIOS()) {
                iosHandler(methodName, successCb, failCb, params)
            } else {
                androidHandler(methodName, successCb, failCb, params)
            }
        } catch (e) {
            console.error("不支持jsbridge", e)
        }
    },
    // 监听原生事件
    registEvent(method, cb) {
        if (isIOS()) {
            window[method] = cb
        } else {
            //android需要注册方法
            registeAndroidEvent(method, cb)
        }

    }
}

let Bridge = new BridgeConstructor()

window.Bridge = Bridge

export default {
    Bridge,
    install(Vue) {
        Vue.prototype.Bridge = Bridge
    }
}
