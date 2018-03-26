var xdapi = require('./utils').xdapi;

describe('我的借款', () => {
  it('我的借款获取', done => {
    xdapi.wechat_BorrowingRecord({
        PageIndex: '1',  // 页数
        PageSize: '10'   // 数量
    }).then(data=>{
        if (data.ReturnCode == 1) {
            console.log(data);
            done()
        } else {
            console.log(data);
            throw new Error('我的借款获取失败：' + data.ReturnMessage);
        }
    })
  })
})

