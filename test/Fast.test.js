var xdapi = require('./utils').xdapi;

describe('快速申请', () => {
  it('快速申请', done => {
    xdapi.wechat_FastApplyFor({
        BusinessType: '1',             // 【1：房速贷；2：车易贷】
        City: '东莞市',                // 城市
        Latitude:'',                   // 经度
        Longitude: '',                 // 纬度
        RealName: '李钊鸿',            // 真实姓名
        TelNo: '13713332659'           // 电话号码
    }).then(data=>{
        if (data.ReturnCode == 1) {
            console.log(data);
            done()
        } else {
            console.log(data);
            throw new Error('快速申请失败：' + data.ReturnMessage);
        }
    })
  })
})
