import Vue from 'vue'
import Router from 'vue-router'
import Loader  from '@components/loader/index.js'
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

// 注册协议
const RegProtocol     = r => require.ensure([], () => r(require('@/views/Protocol/RegProtocol')), 'RegProtocol')
// 竞买须知
const CarSellNeedKnow = r => require.ensure([], () => r(require('@/views/Protocol/CarSellNeedKnow')), 'CarSellNeedKnow')
// 竞买公告
const CarSellNotice   = r => require.ensure([], () => r(require('@/views/Protocol/CarSellNotice')), 'CarSellNotice')


let router =  new Router({
    routes: [
        // { path: '/', redirect: '/Fast'},

        { path: '/Fast',               name: 'Fast',               meta: { title: '快速贷款' }, component: Fast },
        { path: '/CarBusinessInfo',    name: 'CarBusinessInfo',    meta: { title: '一点车贷' }, component: CarBusinessInfo },
        { path: '/HouseBusinessInfo',  name: 'HouseBusinessInfo',  meta: { title: '一点房贷' }, component: HouseBusinessInfo },
        { path: '/Status',             name: 'Status',             meta: { title: '申请结果' }, component: Status },
        { path: '/CitySelect',         name: 'CitySelect',         meta: { title: '选择城市' }, component: CitySelect },

        { path: '/Login',      name: 'Login',     meta: { title: '登录' },      component: Login },
        { path: '/Register',   name: 'Register',  meta: { title: '注册' },      component: Register },
        { path: '/ForgetPwd',  name: 'ForgetPwd', meta: { title: '忘记密码' },  component: ForgetPwd },
        { path: '/ResetPwd',   name: 'ResetPwd',  meta: { title: '重置密码' },  component: ResetPwd },

        { path: '/Repay',        name: 'Repay',        meta: { title: '还款管理' },  component: Repay },
        { path: '/RepayInfo',    name: 'RepayInfo',    meta: { title: '还款管理' },  component: RepayInfo },
        { path: '/RepaySelect',  name: 'RepaySelect',  meta: { title: '还款选择' },  component: RepaySelect },
        { path: '/RepayMoney',   name: 'RepayMoney',   meta: { title: '费用明细' },  component: RepayMoney },
        { path: '/RepayStatus',  name: 'RepayStatus',  meta: { title: '还款成功' },  component: RepayStatus },
        { path: '/RepayHistory', name: 'RepayHistory', meta: { title: '还款记录' },  component: RepayHistory },

        { path: '/CarSell',                   name: ' CarSell',            meta: { title: '汽车拍卖' },          component: CarSell },
        { path: '/CarSellInfo/:id',           name: ' CarSellInfo',        meta: { title: '汽车详情' },          component: CarSellInfo },
        { path: '/CarSellHistoryInfo/:id',    name: ' CarSellHistoryInfo', meta: { title: '汽车详情' },          component: CarSellHistoryInfo },
        { path: '/CarSellApply',              name: ' CarSellApply',       meta: { title: '汽车拍卖报名' },      component: CarSellApply },
        { path: '/CarSellApplyStatus',        name: ' CarSellApplyStatus', meta: { title: '报名拍卖状态' },      component: CarSellApplyStatus },
        { path: '/CarSellHistory',            name: ' CarSellHistory',     meta: { title: '汽车拍卖历史记录' },  component: CarSellHistory },
        { path: '/CarSellBuy',                name: ' CarSellBuy',         meta: { title: '报名竞买' },          component: CarSellBuy },
        { path: '/CarSellBuySuccess',         name: ' CarSellBuySuccess',  meta: { title: '提交结果' },          component: CarSellBuySuccess },
        { path: '/BankSelect',                name: ' BankSelect',         meta: { title: '选择银行' },          component: BankSelect },
        { path: '/ErrorPage',                 name: ' ErrorPage',          meta: { title: '提交结果' },          component: ErrorPage },

        { path: '/Borrow',         name: 'Borrow',         meta: { title: '我的借款' },  component: Borrow },
        { path: '/BorrowProgress', name: 'BorrowProgress', meta: { title: '查看进度' },  component: BorrowProgress },

        { path: '/RegProtocol',     name: 'RegProtocol',     meta: { title: '团贷网信贷服务协议' },  component: RegProtocol },
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

router.beforeEach((to, from, next) => {
    // 滚动之前，先弹回顶部
    window.scrollTo(0, 0)
    // 放行页面
    next()
    // 设置标题
    setTitle(to.meta.title)
})

router.afterEach((to, from) => {
    // 关闭所有的loading
    Loader.hideAll();
})

export default router
