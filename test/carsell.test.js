var carapi = require('./utils').carapi;

describe('读取车辆拍卖信息', () => {
  it.only('读取车辆拍卖信息', done => {
    carapi.selectAuctionsPage({
         page: 1,
         limit: 10,
         Type: '1'     // 1.即将拍卖，2进行中，3.拍卖完成
    }).then(data=>{
        console.log(data);
        if (data.code) {
            console.log(data);
            done()
        } else {
            throw new Error('读取车辆拍卖信息：');
        }
    })
  })
})

describe('更新拍卖交易记录接口', () => {
  it('更新拍卖交易记录接口', done => {
    api.BorrowingRecord({
        PriceID: '',  // 拍卖ID
        UserName: '', // 用户姓名
        UserID: '',   // 身份证号码
        Amount : '',  // 出价金额
    }).then(data=>{
        if (data) {
            done()
        } else {
            throw new Error('更新拍卖交易记录接口：');
        }
    })
  })
})

describe('读取准入竞价用户信息', () => {
  it('读取准入竞价用户信息', done => {
    api.BorrowingRecord({
        PriceID: '',  // 拍卖ID
        Telephone: '' // 联系方式
    }).then(data=>{
        if (data) {
            done()
        } else {
            throw new Error('读取准入竞价用户信息：');
        }
    })
  })
})

describe('读取拍卖最高价', () => {
  it('读取拍卖最高价', done => {
    api.BorrowingRecord({
        PriceID: '',  // 拍卖ID
    }).then(data=>{
        if (data) {
            done()
        } else {
            throw new Error('读取拍卖最高价');
        }
    })
  })
})

