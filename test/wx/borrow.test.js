var wxapi = require('../utils').wxapi;

describe('我的借款', () => {
  it('我的借款获取', done => {
    wxapi.borrowingRecord({
        pageIndex: '1',  // 页数
        pageSize: '10',   // 数量
        openId: "6ad7f9ce-ad0e-457a-a608-6cd5ac67eca7" 
    }).then(data=>{
        if (data.ReturnCode == 1) {
            done()
        } else {
            console.log(data);
            throw new Error('我的借款获取失败：' + data.msg);
        }
    })
  })
})

