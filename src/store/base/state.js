// 异步请求的数量
export let fetchCount = 0

// 页面X轴监听器
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
export let wantTo = '/carsell'

// 修改密码的验证码
export let forgetPwdValidate = ''

// 手机号码
export let phone = window.localStorage.getItem('phone')

// token
export let token = window.localStorage.getItem('token')

// 快速申请的手机号码
export let fastphone = ''

// 提供担保协议书
export let GuaranteeProtocol = null;

// 团贷网服务协议
export let TdServiceProtocol = null;

// 资产端-信息咨询服务协议
export let InforeferProtocol = null;

// 电子签章身份验证的token
export let signToken = window.localStorage.getItem('signToken');

// 是否下次不需要跳转动画
export let nextNotTransition = false;

// 电子签章是否确认了
export let signStatus = null;

// 合同签名的businessId
export let businessId = ''

// 合同签名的customerId
export let customerId = ''

// 合同埋点需要使用的id
export let buriedPointCertificateNo = ''

// 数字证书服务协议的甲方客户名
export let serviceagreement_name = ''

// 数字证书服务协议的甲方身份证
export let serviceagreement_id = ''

// 数字证书服务协议的甲方公司名
export let serviceagreement_companyname = ''

// 数字证书服务协议的甲方统一社会信用代码
export let serviceagreement_unifiedcode = ''

// 数字证书服务协议的甲方类别【个人1/企业23】
export let serviceagreement_type = '1'