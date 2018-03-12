var api = require('./utils').api;

describe('读取车辆拍卖信息', () => {
  it('读取车辆拍卖信息', done => {
    api.BorrowingRecord({
        AuctionState: 0  //0.审批未通过 1.审批通过[去掉]
    }).then(data=>{
        if (data) {
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

