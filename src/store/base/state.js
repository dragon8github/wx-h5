// 异步请求的数量
export let fetchCount = 0

// 页面X轴专用的监听器
export let translateX = 0

// 页面Y的监听器
export let translateY = 0

// 当前用户选择的银行卡
export let bank = ''

// 当前用户选择的城市
export let city = ''

// 用户定位城市
export let localcity = ''

// 用户希望前往的url，这个主要是在登录和注册完成之后，前往的页面。
export let wantTo = ''

// 修改密码的手机号码
export let forgetPwdPhone = ''

// 修改密码的验证码
export let forgetPwdValidate = ''

// token
export let token = window.localStorage.getItem('token')
