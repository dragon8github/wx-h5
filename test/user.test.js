var xdapi = require('./utils').xdapi;

describe('发送验证码', () => {
    it('发送注册验证码', done => {
        xdapi.wechat_SmsSend({
            TelNo: '13713332659',
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

    it('发送忘记密码验证码', done => {
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
});

describe('登陆', () => {
  it.only('登陆', done => {
        xdapi.wechat_Login({
            UserName: '13713332657',  // 账号
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

describe('注册', () => {
  it('注册', done => {
        const Register = async () => {
            // 获取验证码
            const data = await xdapi.wechat_SmsSend({TelNo: '13713332657', Type: '1'}).then(data=>data);

            if (data.Data) {
                return await xdapi.wechat_Register({
                        TelNo: '13713332657',           // 账号
                        Password: '123456.a',           // 密码
                        ValidateCode: data.Data,        // 验证码
                        ExtensionTelNo: '13713332652',  // 推荐手机号
                        Type: 'wechat_pulic'            // 注册方式是微信
                }).then(data => data)
            } else {
                return {ReturnMessage: '获取验证码失败' + data.ReturnMessage};
            }
        }

        Register().then(data => {
           if (data.ReturnCode == 1) {
               console.log(data)
               done()
           } else {
               throw new Error('注册失败：' + data.ReturnMessage);
           }
        })
  })
})



describe('找回密码', () => {
    it.only('找回密码', done => {
        const FindPwd = async () => {
            // 获取验证码
            const data = await xdapi.wechat_SmsSend({TelNo: '13713332657', Type: '2'}).then(data=>data);

            if (data.Data) {
                return await xdapi.wechat_FindPwd({
                        TelNo: '13713332657',           // 账号
                        Password: '123456@a',           // 密码
                        ValidateCode: data.Data,        // 验证码
                        ExtensionTelNo: '13713332652',  // 推荐手机号
                        Type: 'wechat_pulic'            // 注册方式是微信
                }).then(data => data)
            } else {
                return {ReturnMessage: '获取验证码失败-' + data.ReturnMessage};
            }
        }

        FindPwd().then(data => {
           if (data.ReturnCode == 1) {
               console.log(data)
               done()
           } else {
               throw new Error('找回密码失败：' + data.ReturnMessage);
           }
        })
    })
})
