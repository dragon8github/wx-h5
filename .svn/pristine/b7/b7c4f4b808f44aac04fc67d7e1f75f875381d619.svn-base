var wxapi = require('../utils').wxapi;
var Toast = require('../utils').Toast;

describe('验证码', () => {
    it('发送注册验证码', done => {
        wxapi.smsSend({
            telNo: '13713332656',
            type: '1'  
        }).then(data => {
            console.log(data)
            if (data.returnCode == 0) {
                // 测试环境不会发送验证码，但这个值就是验证码
                done()
            } else {
                Toast('发送验证码失败：' + data.msg);
            }
        })
    })

    it('发送忘记密码验证码', done => {
      wxapi.smsSend({
            telNo: '13713332656',
            type: '2'  
        }).then(data=>{
            if (data.returnCode == 0) {
                // 测试环境不会发送验证码，但这个值就是验证码
                done()
            } else {
                console.log(data);
                Toast('发送验证码失败：' + data.msg);
            }
        })
    })

     it('判断验证码是否正确', done => {
        wxapi.checkFindPwdCode({
              telNo: '13713332656',
              code: '079528',
              type: '1'  
        }).then(data => {
            console.log(data) 
            if (data.returnCode == 0) {
                done()
            } else {
                Toast('判断验证码是否正确失败：' + data.msg);
            }
        })
    })
});

describe('登陆', () => {
  it.only('登陆', done => {
        wxapi.login({
            userName: '13713332652',  // 账号
            pwd: '202063'          // 密码
        }).then(data=>{
            if (data.returnCode == 0) {
                done()
            } else {
                console.log(data);
                Toast('登陆失败：' + data.msg);
            }
        })
  })
})

describe('注册', () => {
  it('注册', done => {
        const Register = async () => {
            // 获取验证码
            const data = await wxapi.smsSend({telNo: '13713332661', type: '1'}).then(data=>data);

            if (data.data) {
                return await wxapi.register({
                    telNo: '13713332661',           // 账号
                    password: '123456.a',           // 密码
                    validateCode: data.data,        // 验证码
                    extensiontelNo: '13713332652',  // 推荐手机号
                    type: 'wechat_pulic'            // 注册方式是微信
                }).then(data => data)
            } else {
                return {msg: '获取验证码失败' + data.msg};
            }
        }

        Register().then(data => {
           console.log(data)
           if (data.returnCode == 0) {
               done()
           } else {
               Toast('注册失败：' + data.msg);
           }
        })
  })
})



describe('找回密码', () => {
    it.only('找回密码', done => {
        const FindPwd = async () => {
            // 获取验证码
            const data = await wxapi.smsSend({telNo: '13713332652', type: '2'}).then(data=>data);

            if (data.data) {
                return await wxapi.findPwd({
                        telNo: '13713332652',           // 账号
                        password: '202063',             // 密码
                        validateCode: data.data,        // 验证码
                        type: '2'                       // 类型                  
                }).then(data => data)
            } else {
                return {msg: '获取验证码失败-' + data.msg};
            }
        }

        FindPwd().then(data => {
               console.log(data)

           if (data.returnCode == 0) {
               done()
           } else {
               Toast('找回密码失败：' + data.msg);
           }
        })
    })
})
