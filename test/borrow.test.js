var api = require('./utils').api;

describe('我的借款', () => {
  it('我的借款获取', done => {
    api.BorrowingRecord({
        PageIndex: '1',  // 页数
        PageSize: '10'   // 数量
    }).then(data=>{
        if (data) {
            done()
        } else {
            throw new Error('我的借款获取失败：');
        }
    })
  })
})

