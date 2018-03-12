var api = require('./utils').api;

describe.only('注册', () => {
  it.only('发送验证码', done => {
    api.SmsSend({
        TelNo: '13713332652'
    }).then(data=>{
        if (data) {
            done()
        } else {
            throw new Error('发送验证码失败：');
        }
    })
  })

  it('注册', done => {
    api.Register({
        TelNo: '13713332652',  // 账号
        Password: '123456',  // 密码
        ValidateCode: '123456',  // 验证码
        ExtensionTelNo: '13713332652',  // 推荐手机号
    }).then(data=>{
        if (data) {
            done()
        } else {
            throw new Error('注册失败：');
        }
    })
  })
})

describe('登陆', () => {
  it('登陆', done => {
    api.Login({
        UserName: '13713332652',  // 账号
        Pwd: '123456',  // 密码
    }).then(data=>{
        if (data) {
            done()
        } else {
            throw new Error('登陆失败：');
        }
    })
  })
})


describe('找回密码', () => {
  it('找回密码', done => {
    api.FindPwd({
        TelNo: '13713332652',  // 账号
        ValidateCode: '123456',  // 验证码
    }).then(data=>{
        if (data) {
            done()
        } else {
            throw new Error('找回密码失败：');
        }
    })
  })

  // TODO： 修改密码这个接口中，只传入新密码和旧密码就可以了吗？不需要别的用户信息参数？
  it('修改密码', done => {
        api.ChangePassword({
            OldPwd: '123456',  // 旧密码
            NewPassWord: '123456',  // 新密码
        }).then(data=>{
            if (data) {
                done()
            } else {
                throw new Error('修改密码失败：');
            }
        })
  })
})
