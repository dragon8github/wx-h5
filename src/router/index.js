import Vue    from 'vue'
import Router from 'vue-router'
import store  from '../store'
import Loader from '@components/loader/index.js'
import Toast  from '@components/toast/index.js'

Vue.use(Router)

// 快速贷款
const Fast              = r => require.ensure([], () => r(require('@/views/Business/Fast')), 'Fast')
// 车易贷详情介绍页面
const CarBusinessInfo   = r => require.ensure([], () => r(require('@/views/Business/CarBusinessInfo')), 'CarBusinessInfo')
// 房速贷详情介绍页面
const HouseBusinessInfo = r => require.ensure([], () => r(require('@/views/Business/HouseBusinessInfo')), 'HouseBusinessInfo')
// 状态页面
const Status            = r => require.ensure([], () => r(require('@/views/Business/Status')), 'Status')
// 城市选择页面
const CitySelect        = r => require.ensure([], () => r(require('@/views/Business/CitySelect')), 'CitySelect')
// 关于我们
const About             = r => require.ensure([], () => r(require('@/views/Business/About')), 'About')

// 登录
const Login     = r => require.ensure([], () => r(require('@/views/User/Login')), 'Login')
// 注册
const Register  = r => require.ensure([], () => r(require('@/views/User/Register')), 'Register')
// 忘记密码
const ForgetPwd = r => require.ensure([], () => r(require('@/views/User/ForgetPwd')), 'ForgetPwd')
// 重置密码
const ResetPwd  = r => require.ensure([], () => r(require('@/views/User/ResetPwd')), 'ResetPwd')


// 还款管理（列表）
const Repay        = r => require.ensure([], () => r(require('@/views/Repay/Repay')), 'Repay')
// 还款管理详情
const RepayInfo    = r => require.ensure([], () => r(require('@/views/Repay/RepayInfo')), 'RepayInfo')
// 还款选择
const RepaySelect  = r => require.ensure([], () => r(require('@/views/Repay/RepaySelect')), 'RepaySelect')
// 确认还款
const RepayMoney   = r => require.ensure([], () => r(require('@/views/Repay/RepayMoney')), 'RepayMoney')
// 还款结果状态
const RepayStatus  = r => require.ensure([], () => r(require('@/views/Repay/RepayStatus')), 'RepayStatus')
// 还款历史
const RepayHistory = r => require.ensure([], () => r(require('@/views/Repay/RepayHistory')), 'RepayHistory')


// 我的借款（列表）
const Borrow         = r => require.ensure([], () => r(require('@/views/Borrow/Borrow')), 'Borrow')
// 借款审批进度
const BorrowProgress = r => require.ensure([], () => r(require('@/views/Borrow/BorrowProgress')), 'BorrowProgress')


// 汽车拍卖
const CarSell            = r => require.ensure([], () => r(require('@/views/CarSell/CarSell')), 'CarSell')
// 汽车拍卖详情
const CarSellInfo        = r => require.ensure([], () => r(require('@/views/CarSell/CarSellInfo')), 'CarSellInfo')
// 汽车拍卖历史详情
const CarSellHistoryInfo        = r => require.ensure([], () => r(require('@/views/CarSell/CarSellHistoryInfo')), 'CarSellHistoryInfo')

// 汽车拍卖报名
const CarSellApply       = r => require.ensure([], () => r(require('@/views/CarSell/CarSellApply')), 'CarSellApply')
// 报名拍卖状态
const CarSellApplyStatus = r => require.ensure([], () => r(require('@/views/CarSell/CarSellApplyStatus')), 'CarSellApplyStatus')
// 汽车拍卖历史记录
const CarSellHistory     = r => require.ensure([], () => r(require('@/views/CarSell/CarSellHistory')), 'CarSellHistory')
// 报名竞买
const CarSellBuy         = r => require.ensure([], () => r(require('@/views/CarSell/CarSellBuy')), 'CarSellBuy')
// 报名竞买成功页面
const CarSellBuySuccess  = r => require.ensure([], () => r(require('@/views/CarSell/CarSellBuySuccess')), 'CarSellBuySuccess')
// 银行卡列表
const BankSelect         = r => require.ensure([], () => r(require('@/views/CarSell/BankSelect')), 'BankSelect')
// 汽车拍卖竞拍错误页面
const ErrorPage          = r => require.ensure([], () => r(require('@/views/CarSell/ErrorPage')), 'ErrorPage')

// 电子签章
const Sign              = r => require.ensure([], () => r(require('@/views/Sign/Sign')), 'Sign')
// 签章状态
const SignStatus        = r => require.ensure([], () => r(require('@/views/Sign/SignStatus')), 'SignStatus')
// 提供担保协议书
const GuaranteeProtocol = r => require.ensure([], () => r(require('@/views/Sign/GuaranteeProtocol')), 'GuaranteeProtocol')
// 团贷网服务协议
const TdServiceProtocol = r => require.ensure([], () => r(require('@/views/Sign/TdServiceProtocol')), 'TdServiceProtocol')
// 信息咨询服务协议
const InfoReferProtocol = r => require.ensure([], () => r(require('@/views/Sign/InforeferProtocol')), 'InforeferProtocol')

// 注册协议
const RegProtocol     = r => require.ensure([], () => r(require('@/views/Protocol/RegProtocol')), 'RegProtocol')
// 竞买须知
const CarSellNeedKnow = r => require.ensure([], () => r(require('@/views/Protocol/CarSellNeedKnow')), 'CarSellNeedKnow')
// 竞买公告
const CarSellNotice   = r => require.ensure([], () => r(require('@/views/Protocol/CarSellNotice')), 'CarSellNotice')

let router =  new Router({
    routes: [
        // 默认页面
        { path: '/', redirect: window.goUrl || '/login'},
        
        { path: '/Fast/:type?',        name: 'Fast',               meta: { title: '快速贷款' }, component: Fast },
        { path: '/CarBusinessInfo',    name: 'CarBusinessInfo',    meta: { title: '一点车贷' }, component: CarBusinessInfo },
        { path: '/HouseBusinessInfo',  name: 'HouseBusinessInfo',  meta: { title: '鸿特微贷' }, component: HouseBusinessInfo },
        { path: '/Status/:type?',      name: 'Status',             meta: { title: '申请结果' }, component: Status },
        { path: '/CitySelect',         name: 'CitySelect',         meta: { title: '选择城市' }, component: CitySelect },
        { path: '/About',              name: 'About',              meta: { title: '关于我们' }, component: About },

        { path: '/Login',      name: 'Login',     meta: { title: '登录' },      component: Login },
        { path: '/Register',   name: 'Register',  meta: { title: '注册' },      component: Register },
        { path: '/ForgetPwd',  name: 'ForgetPwd', meta: { title: '忘记密码' },  component: ForgetPwd },
        { path: '/ResetPwd',   name: 'ResetPwd',  meta: { title: '重置密码' },  component: ResetPwd },

        { path: '/Repay',                name: 'Repay',        meta: { title: '还款管理' },  component: Repay },
        { path: '/RepayInfo/:afterid?',  name: 'RepayInfo',    meta: { title: '还款管理' },  component: RepayInfo },
        { path: '/RepaySelect',          name: 'RepaySelect',  meta: { title: '还款选择' },  component: RepaySelect },
        { path: '/RepayMoney',           name: 'RepayMoney',   meta: { title: '费用明细' },  component: RepayMoney },
        { path: '/RepayStatus',          name: 'RepayStatus',  meta: { title: '还款成功' },  component: RepayStatus },
        { path: '/RepayHistory',         name: 'RepayHistory', meta: { title: '还款记录' },  component: RepayHistory },

        { path: '/CarSell',                           name: 'CarSell',            meta: { title: '汽车拍卖' },     component: CarSell },
        { path: '/CarSellInfo/:id?',                  name: 'CarSellInfo',        meta: { title: '汽车详情' },     component: CarSellInfo },
        { path: '/CarSellHistoryInfo/:id?/:afterid?', name: 'CarSellHistoryInfo', meta: { title: '汽车详情' },     component: CarSellHistoryInfo },
        { path: '/CarSellApply',                      name: 'CarSellApply',       meta: { title: '汽车拍卖报名' }, component: CarSellApply },
        { path: '/CarSellApplyStatus',                name: 'CarSellApplyStatus', meta: { title: '报名拍卖状态' }, component: CarSellApplyStatus },
        { path: '/CarSellHistory',                    name: 'CarSellHistory',     meta: { title: '拍卖记录' },     component: CarSellHistory },
        { path: '/CarSellBuy',                        name: 'CarSellBuy',         meta: { title: '报名竞买' },     component: CarSellBuy },
        { path: '/CarSellBuySuccess',                 name: 'CarSellBuySuccess',  meta: { title: '提交结果' },     component: CarSellBuySuccess },
        { path: '/BankSelect',                        name: 'BankSelect',         meta: { title: '选择银行' },     component: BankSelect },
        { path: '/ErrorPage',                         name: 'ErrorPage',          meta: { title: '提交结果' },     component: ErrorPage },

        { path: '/Sign',              name: 'Sign',              meta: { title: '电子签章' },                component: Sign },
        { path: '/SignStatus',        name: 'SignStatus',        meta: { title: '提交结果' },                component: SignStatus },
        { path: '/GuaranteeProtocol', name: 'GuaranteeProtocol', meta: { title: '提供担保协议书' },          component: GuaranteeProtocol },
        { path: '/TdServiceProtocol', name: 'TdServiceProtocol', meta: { title: '团贷网服务协议' },          component: TdServiceProtocol },
        { path: '/InfoReferProtocol', name: 'InfoReferProtocol', meta: { title: '资产端-信息咨询服务协议' }, component: InfoReferProtocol },


        { path: '/Borrow',                name: 'Borrow',         meta: { title: '我的借款' },  component: Borrow },
        { path: '/BorrowProgress/:type?', name: 'BorrowProgress', meta: { title: '查看进度' },  component: BorrowProgress },

        { path: '/RegProtocol',     name: 'RegProtocol',     meta: { title: '鸿特金服信贷服务协议' },  component: RegProtocol },
        { path: '/CarSellNeedKnow', name: 'CarSellNeedKnow', meta: { title: '竞买须知' }, component: CarSellNeedKnow },
        { path: '/CarSellNotice',   name: 'CarSellNotice',   meta: { title: '竞买公告' }, component: CarSellNotice },
    ]
})

// 解决微信、QQ、闪银等内置浏览器单页应用无法刷新title的问题
var setTitle = title => {
    var i = document.createElement('iframe');
    i.src = 'https://www.baidu.com/favicon.ico';
    i.style.display = 'none';
    i.onload = function() {
        setTimeout(function(){
            i.remove();
        }, 9)
    }
    document.title = title;
    document.body.appendChild(i);
}

// 以下界面是进入时要判断是否登录的，如果没有的话，那么就跳转到Login页面
const needLoginPage = [
    // 快速申请
    'fast', 'fasthouse', 'fastcar',
    // 我的借款 / 我的借款详情
    'borrow', 'borrowinfo',
    // 我的还款 / 我的还款详情
    'repay', 'repayinfo',
    // 汽车拍卖、汽车竞拍历史 / 汽车拍卖竞拍历史详情
    'carsellhistory', 'carsellhistoryinfo',
    // 报名竞买
    'carsellbuy',
    // 汽车拍卖报名
    'carsellapply'
]

String.prototype.toUrl = function () {
    return this.toString().replace(/\/|\\/g, '').toLocaleLowerCase().trim()
}


var wxclose = function () {
    if (window.WeixinJSBridge) {
        window.WeixinJSBridge.call('closeWindow');
    } else {
        window.setTimeout(_=>{
            return wxclose()
        }, 10)
    }
}

var is_weixn = function () {
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}

var beforeNext = null;

// 猜测：历史已经形成了。就算我拦截了。也无法阻止历史？
router.beforeEach((to, from, next) => {

    // 前往页面
    let _to = to.fullPath.toUrl()

    // 来路页面
    let _from = from.fullPath.toUrl()

    // 需求补丁：已登录的用户再进入登录界面的场景是不存在的（目前不存在），
    // 除非是用户登陆之后，又按了返回，回到了登陆页面，按照需求的想法，用户应该直接退出微信，也就是直接关闭页面。
    if (is_weixn() &&_to == 'login' && store.state.token) {
        // 关闭微信内置浏览器
        return wxclose();
    }

    // 需求补丁：如果从登陆页面返回，并且没有登陆，用户应该直接退出微信，也就是直接关闭页面。
    if (is_weixn() && _from == 'login' && _to === store.state.wantTo.toUrl() && !store.state.token) {
        // 关闭微信内置浏览器
        return wxclose();
    }

    // 如果用户要前往需要登录的页面并且没有登录的话。
    // 这里你可能会想，恶意用户随时可以修改isLogin为true，那么还是可以进入的啊。
    // 实际上就算进入了。当调用API的时候，后端依然会返回205没有登录的状态码，然后又跳转到登录页去，也就是跑得了和尚跑不了庙。
    if (needLoginPage.indexOf(_to) >= 0 && !store.state.token) {
        Toast('请先登录')

        // 史诗级神坑，别以为跳转了就可以省略这个next()，这里必须先next，否则一直卡着不给后退
        beforeNext = next

        // 设置去路
        return store.dispatch('set_wantTo', to.path).then(_ => {
            router.push('/login')
        })
    }

    // 设置标题
    setTitle(to.meta.title)

    // 放行上一个页面
    beforeNext && beforeNext() 

    // 放行页面
    next()
})

router.afterEach((to, from) => {
    // 关闭所有的loading
    Loader.hideAll();
})

export default router
