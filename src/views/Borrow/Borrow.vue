<template>
<div>
    <panel :_loadTop = "loadTop" :_isEmpty="isEmpty" :_bottomDisabled="bottomDisabled">
        <div id="Borrow" slot="body">
            <div class="Borrow-Item" v-for="(item, index) in myData">
                <div class="Borrow-Item-head">
                    <div class="Borrow-icon" :class="item.BusinessType === '一点车贷' ? 'car' : 'house' "></div>
                    <div class="Borrow-right">
                        <div class="Borrow-name">{{ item.BusinessType }}</div>
                        <div class="Borrow-info">
                            <span class="Borrow-time">申请日期：{{ date2date(item.ApplyDate) }}</span>
                            <span class="Borrow-approve" v-if="item.Schedule != '-2' || item.Schedule != '5'">
                              <a @click="go(item)">{{ process2name(item.Schedule.toString()) }}</a>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="Borrow-Item-body">
                    <ul class="Borrow-Item-body-ul">
                        <li>借款金额： {{ money2money(item.BorrowMoney) }}</li>
                        <li>借款期限： {{ limit2limit(item.BorrowLimit) }}</li>
                        <li>还款方式： {{ pattern2pattern(item.RepaymentType) }}</li>
                    </ul>
                    <i class="Borrow-statusicon" :class="{cancel: item.Schedule == '-1', finish: item.Schedule == '5'}"></i>
                    <a class="cancelbtn" v-if="item.Schedule == '0'" @click="gocancel(item.BusinessId, index)">取消</a>
                </div>
            </div>
        </div>
    </panel>
</div>
</template>


<script>
  import mtField from '@components/field/field.vue'
  import Toast   from '@components/toast/index.js'
  import Loader  from '@components/loader/index.js'
  import msg     from '@components/messagebox/messagebox.js'
  import panel   from '@myComponents/panel.vue'

  export default {
        name: 'Borrow',
        data () {
            return {
                myData: [{
                      "BusinessId": "TDF8192017092202",
                      "IsDeffer": false,
                      "OrgBusinessId": "TDF8192017092202",
                      "DefferBusinessId": null,
                      "ProtoTypeId": null,
                      "BusinessType": "一点房贷",
                      "Schedule": 1,
                      "ApplyDate": "2017-09-22 00:00:00",
                      "BorrowMoney": 123456,
                      "BorrowLimit": 1,
                      "RepaymentType": "先息后本",
                      "StoreName": "隆宝和公司",
                      "BusinessTypeId": "房速贷标准件",
                      "IsOld": null
                  },
                  {
                      "BusinessId": "TDC10120140103425B",
                      "IsDeffer": false,
                      "OrgBusinessId": "TDC10120140103425B",
                      "DefferBusinessId": null,
                      "ProtoTypeId": null,
                      "BusinessType": "一点房贷",
                      "Schedule": 4,
                      "ApplyDate": "2014-01-03 00:00:00",
                      "BorrowMoney": 740000,
                      "BorrowLimit": 12,
                      "RepaymentType": "分期还本付息",
                      "StoreName": "东莞总部",
                      "BusinessTypeId": "房速贷非标准件",
                      "IsOld": true
                  }],
                // 数据源是否为空
                isEmpty: false,
                // 是否接口已经不能提供更多的数据了
                bottomDisabled: true,
            }
        },
        watch: {

        },
        methods: {
            loadTop (cb) {
                window.setTimeout(cb, 1000);
            },
            getData () {
                // this.xdapi.getRepayingList({
                //       pageIndex: '1',  // 页数
                //       pageSize: '10'   // 数量
                // }).then(data=>{
                //     if (data.ReturnCode == 0) {
                //         console.log(data);
                //     } else {
                //         console.log(data);
                //         Toast(data.msg);
                //     }
                // })
            },
            process2name (process) {
              switch (process) {
                  case '-2': return '已拒绝'
                  case '-1': return '已取消'
                  case '0':  return '待审批'
                  case '1':  return '审核中'  // （申请借款）
                  case '2':  return '审核中'  // （车辆评估/房产核价）
                  case '3':  return '审核中 ' // （手续办理）
                  case '4':  return '已出款 ' // （放款）
                  case '5':  return '已完成 ' // （放款）
                  default:   return ''
              }
            },
            money2money (money) {
                if (money) {
                    return money + '元'
                }
                return '--'
            },
            limit2limit (limit) {
                if (limit) {
                    return limit + '个月'
                }
                return '--'
            },
            pattern2pattern (pattern) {
                if (pattern) {
                  return pattern
                }
                return '--'
            },
            date2date (time) {
                var oldTime = (new Date(time)).getTime();
                var curTime = new Date(oldTime).format("yyyy-MM-dd");
                return curTime
            },
            go (item) {
                this.$store.dispatch('setBorrowInfoData', {
                    Schedule:      item.Schedule,
                    BorrowMoney:   item.BorrowMoney,
                    BorrowLimit:   item.BorrowLimit,
                    RepaymentType: item.RepaymentType,
                    StoreName:     item.StoreName
                }).then(_ => {
                    this.$router.push('BorrowProgress')
                })
            },
            gocancel (businessId, index) {
                msg.confirm("你确定要取消订单吗？", "操作提示").then(()=>{
                      this.myData[index].status = 'cancel'
                }).catch(() => {

                });
            }
        },
        components: {
            panel
        },
        beforeMount () {
            Date.prototype.format = function(fmt) { 
                 var o = { 
                    "M+" : this.getMonth()+1,                 //月份 
                    "d+" : this.getDate(),                    //日 
                    "h+" : this.getHours(),                   //小时 
                    "m+" : this.getMinutes(),                 //分 
                    "s+" : this.getSeconds(),                 //秒 
                    "q+" : Math.floor((this.getMonth()+3)/3), //季度 
                    "S"  : this.getMilliseconds()             //毫秒 
                }; 
                if(/(y+)/.test(fmt)) {
                        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
                }
                 for(var k in o) {
                    if(new RegExp("("+ k +")").test(fmt)){
                         fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                     }
                 }
                return fmt; 
            }      
        },
        activated () {
          this.carapi.selectAuctionsPage({
                pageIndex: '1',  // 页数
                pageSize: '10',   // 数量
                type: '2'
          }).then(data=>{
              if (data.ReturnCode == 0) {
                  console.log(data);
              } else {
                  console.log(data);
                  Toast(data.msg);
              }
          })
        }
  }
</script>


<style scoped lang="scss">
@import "~@sass/_variables";
@import "~@sass/_func";

#Borrow {
   background: #f2f2f2;
   margin: 0 pxToRem(30px) pxToRem(30px) pxToRem(30px);
   height: auto;
}

.Borrow-Item {
  background: #fff;
  min-height: pxToRem(311px);
  position: relative;
  padding: pxToRem(30px);
  border-radius: 4px;
  margin-top: pxToRem(20px);
}

.Borrow-Item-head {
  position: relative;
  width: 100%;
  height: pxToRem(130px);
  padding-bottom: pxToRem(30px);
  display: flex;


  .Borrow-name {
     font-size: pxToRem(28px);
     color: #222222;
  }

  .Borrow-time {
    color: #999999;
    font-size: pxToRem(24px);
  }

  .Borrow-approve {
    color: #0e6ae7;
    font-size: pxToRem(28px);
    float: right;
  }

  .Borrow-icon {
      width: pxToRem(100px);
      height: pxToRem(100px);
      margin-right: pxToRem(28px);

      &.car {
          background: url('~@assets/borrow/car_icon@2x.png') center / pxToRem(70px) no-repeat content-box;
      }

      &.house {
          background: url('~@assets/borrow/home_icon@2x.png') center / pxToRem(70px) no-repeat content-box;
      }
  }

  .Borrow-right {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 100%;
  }

  .Borrow-info {
      font-size:0;
  }


  &::after {
      @include border('bottom', #999999);
  }
}

.Borrow-Item-body {
  position: relative;

  .Borrow-Item-body-ul {
     margin-top: pxToRem(30px);

      li {
           font-size: pxToRem(28px);
           color: #222222;
           display: block;
           line-height: pxToRem(55px);
      }
  }

  .cancelbtn {
      position: absolute;
      width: pxToRem(120px);
      height: pxToRem(68px);
      background-color: #0e6ae7;
      border-radius: 4px;
      right: 0;
      bottom: pxToRem(10px);
      font-size: pxToRem(32px);
      color: #ffffff;
      text-align: center;
      line-height: pxToRem(68px);
  }

  .Borrow-statusicon {
      width: pxToRem(210px);
      height: pxToRem(188px);
      right: pxToRem(-48px);
      bottom: pxToRem(-38px);
      position: absolute;

      &.cancel {
          background: url('~@assets/borrow/cancel_icon@2x.png') center / 100% no-repeat;
      }

      &.finish {
          background: url('~@assets/borrow/complete_icon@2x.png') center / 100% no-repeat;
      }
  }
}




</style>
