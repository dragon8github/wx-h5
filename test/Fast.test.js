var api = require('./utils').api;

describe('快速申请', () => {
  it('快速申请', done => {
    api.FastApplyFor({
        BusinessType: '1',             // 【1：房速贷；2：车易贷】
        City: '东莞市',                // 城市
        Latitude:'',                   // 经度
        Longitude: '',                 // 纬度
        RealName: '李钊鸿',            // 真实姓名
        TelNo: '13713332652'           // 电话号码
    }).then(data=>{
        if (data) {
            done()
        } else {
            throw new Error('快速申请失败：');
        }
    })
  })
})
