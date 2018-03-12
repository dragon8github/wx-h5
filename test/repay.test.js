var api = require('./utils').api;

describe('我的还款', () => {
  it('我的还款获取', done => {
    api.GetRepayingList({
        PageIndex: '1',  // 页数
        PageSize: '10'   // 数量
    }).then(data=>{
        if (data) {
            done()
        } else {
            throw new Error('我的还款获取失败：');
        }
    })
  })
})

