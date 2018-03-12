/**
 * 中文汉字
 */
describe('测试中文汉字', () => {
  it('中文汉字', done => {
    if (!/^[\u4e00-\u9fa5]+$/.test('李钊鸿')) {
      throw new Error('请输入中文汉字')
    }
    done()
  })
})


/**
 * 用户名
 * 登录名由6-16位数字、字母、“_”、“-”、“/”组成，不含特殊字符，如：%、@、#、空格等
 */
describe('用户名', () => {
  it('登录名由6-16位数字、字母、“_”、“-”、“/”组成，不含特殊字符，如：%、@、#、空格等', done => {
    const loginName = 'dragon'
    var reg = new RegExp("^[a-zA-Z0-9\-_/]*$");
    if (loginName == null || loginName == "") {
      throw new Error("登录名不能为空或空格。");
    } else if (loginName.length < 6) {
      throw new Error("登录名不能小于6个字符。");
    } else if (loginName.length > 16) {
      throw new Error("登录名不能大于16个字符。");
    } else if (!reg.test(loginName)) {
      throw new Error("登录名由字母、数字、_、-、/组成 。");
    }
    done()
  })
})

/**
 * 密码 
 * 必须含字母和数字6-16个字符
 * 支持非法符号
 */
describe('密码', () => {
  it('须含字母和数字6-16个字符 设置密码，须含字母和数字6-16个字符', done => {
    const password = '123456a##'
    var reg = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/;
    if (password == null || password == "") {
      throw new Error("密码不能为空。");
    } else if (password.length < 6) {
      throw new Error("密码不能小于6个字符。");
    } else if (password.length > 16) {
      throw new Error("密码不能超过16个字符。");
    } else if (!reg.test(password)) {
      throw new Error("密码必须同时包含数字和字母,支持非法符号");
    }
    done()
  })
})

/**
 * 身份证号
 */
describe('身份证号', () => {
  const identity = '445222199307100337'
  it('由6-16位数字字母组成，不包含特殊字符', done => {
    if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(identity)) {
      throw new Error('非法身份证')
    }
    done()
  })
})

/**
 * 手机号码
 * 请输入11位手机号码
 */
describe('手机号码', () => {
  const phoneNumber = '13713342652'
  it('由6-16位数字字母组成，不包含特殊字符', done => {
    if (!/^1\d{10}$/.test(phoneNumber)) {
      throw new Error('非法手机号码')
    }
    done()
  })
})

/**
 * 手机验证码
 * 6位数字或英文，不包含特殊字符
 */
describe('手机短信验证码', () => {
  const validate = '123456'
  it('6位数字或英文，不包含特殊字符', done => {
    if (/[^A-Za-z0-9]/.test(validate)) {
      throw new Error('包含非法符号');
    } else if (validate.length != 6) {
      throw new Error('手机验证码长度为6');
    }
    done()
  })
})


 /**
 * 银行卡号
 * 银行卡号有效性判断
 */
describe('银行卡号有效性判断', () => {
  const data = '6221888200060448957'
  it('银行卡号有效性判断', done => {
    if (data.length < 12 || data.length > 19 || !/\d+/.test(data)) {
      throw new Error('###################请输入正确的银行卡号###################')
    }
    done()
  })
})