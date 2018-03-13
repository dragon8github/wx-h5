var xdapi = require('./utils').xdapi;

describe('注册', () => {
  it('发送验证码', done => {
    xdapi.wechat_SmsSend({
        TelNo: '13713332652',
        Type: '1'  
    }).then(data=>{
        if (data.ReturnCode == 1) {
            // 测试环境不会发送验证码，但这个值就是验证码
            console.log(data.Data) 
            done()
        } else {
            throw new Error('发送验证码失败：' + data.ReturnMessage);
        }
    })
  })

  it('注册', done => {
    xdapi.wechat_Register({
        TelNo: '13713332652',           // 账号
        Password: '123456.a',             // 密码
        ValidateCode: '186743',         // 验证码
        ExtensionTelNo: '13713332652',  // 推荐手机号
        Type: 'wechat_pulic',           // 注册方式是微信
    }).then(data=>{
        if (data.ReturnCode == 1) {
            console.log(data)
            done()
        } else {
            throw new Error('注册失败：' + data.ReturnMessage);
        }
    })
  })
})

describe('登陆', () => {
  it.only('登陆', done => {
    xdapi.wechat_Login({
        UserName: '13713332652',  // 账号
        Pwd: '123456.a',          // 密码
    }).then(data=>{
        if (data.ReturnCode == 1) {
            console.log(data);
            done()
        } else {
            throw new Error('登陆失败：' + data.ReturnMessage);
        }
    })
  })
})


describe('找回密码', () => {
  it('发送验证码', done => {
    xdapi.wechat_SmsSend({
          TelNo: '15014854228',
          Type: '2'  
      }).then(data=>{
          if (data.ReturnCode == 1) {
              // 测试环境不会发送验证码，但这个值就是验证码
              console.log(data.Data) 
              done()
          } else {
              throw new Error('发送验证码失败：' + data.ReturnMessage);
          }
      })
  })

  it('找回密码', done => {
    xdapi.wechat_FindPwd({
        TelNo: '15014854228',    // 账号
        ValidateCode: '154176',  // 验证码
        Password: '123456@a'     // 新密码
    }).then(data=>{
            console.log(data);

        if (data.ReturnCode == 1) {
            done()
        } else {
            throw new Error('找回密码失败：');
        }
    })
  })
})
