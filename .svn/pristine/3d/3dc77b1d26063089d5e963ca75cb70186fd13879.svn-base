var xdapi = require('./utils').xdapi;
describe('我的还款', () => {
  it('我的还款获取', done => {
    xdapi.wechat_GetRepayingList({
        PageIndex: '1',  // 页数
        PageSize: '10'   // 数量
    }).then(data=>{
        if (data.ReturnCode == 1) {
            console.log(data);
            done()
        } else {
            console.log(data);
            throw new Error('我的还款获取失败：' + data.ReturnMessage);
        }
    })
  })
})


