var api = require('./utils').carapi;

describe('读取车辆拍卖信息selectAuctionsPage', () => {
  it('读取车辆拍卖信息selectAuctionsPage', done => {
    api.selectAuctionsPage({
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

describe('更新拍卖交易记录接口updateAuctions', () => {
  it('更新拍卖交易记录接口updateAuctions', done => {
    api.updateAuctions({
        PriceID: '',   // 拍卖ID
        UserName: '',  // 用户姓名
        UserID: '',    // 身份证号码
        Telephone: '', // 手机号码
        Amount : '',   // 出价金额
    }).then(data=>{
        if (data) {
            done()
        } else {
            throw new Error('更新拍卖交易记录接口：');
        }
    })
  })
})

describe('读取准入竞价用户信息selectBiddersPage', () => {
  it('读取准入竞价用户信息selectBiddersPage', done => {
    api.selectBiddersPage({
        PriceID: '',   // 拍卖ID
        Telephone: '', // 联系方式
        page: '',      // 当前页
        Limit: '',     // 每页条数
        Type: ''       // 查询类型
    }).then(data=>{
        if (data) {
            done()
        } else {
            throw new Error('读取准入竞价用户信息：');
        }
    })
  })
})

describe('读取拍卖最高价selectMaxOfferPriceByAuctionId', () => {
  it('读取拍卖最高价selectMaxOfferPriceByAuctionId', done => {
    api.selectMaxOfferPriceByAuctionId({
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

describe('拍卖记录查询selectAuctionReg', () => {
  it('拍卖记录查询selectAuctionReg', done => {
    api.selectAuctionReg({
        Telephone: '13713332652',  // 手机号码
    }).then(data=>{
        if (data) {
            console.log(data)
            done()
        } else {
            throw new Error('拍卖记录查询');
        }
    })
  })
})

describe('拍卖报名auctionSign', () => {
  it.only('拍卖报名auctionSign', done => {
    api.auctionSign({
        priceID: '',    // 拍卖ID     
        userName: '',   // 用户名     
        userId: '',     // 身份证     
        telePhone: '',  // 手机号     
        bank: '',       // 开户银行   
        carNO: '',      // 银行卡号   
        isPayBood: ''   // 是否缴纳保证金  
    }).then(data=>{
        console.log(data);
        if (data) {
            done()
        } else {
            throw new Error('拍卖报名');
        }
    })
  })
})


