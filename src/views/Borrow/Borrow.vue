<template>
<div>
    <panel :_loadTop = "loadTop" :_isEmpty="isEmpty" :Bottom="false"  :noThingText="'您还没有借款记录'">
        <div id="Borrow" slot="body">
            <div class="Borrow-Item" v-for="(item, index) in myData" @click="go(item)">
                <div class="Borrow-Item-head">
                    <div class="Borrow-icon" :class="item.BusinessType === '一点车贷' ? 'car' : 'house' "></div>
                    <div class="Borrow-right">
                        <div class="Borrow-name">{{ item.BusinessType }}</div>
                        <div class="Borrow-info">
                            <span class="Borrow-time">申请日期：{{ date2date(item.ApplyDate) }}</span>
                            <span class="Borrow-approve" v-if="item.Schedule != '-2' || item.Schedule != '5'">
                              <a>{{ process2name(item.Schedule) }}</a>
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
                    <a class="cancelbtn" v-if="item.Schedule == '0'" @click.stop="gocancel(item.ProtoTypeId, index)">取消</a>
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
                myData: [],
                // 数据源是否为空
                isEmpty: false
            }
        },
        watch: {

        },
        methods: {
            loadTop (cb) {
                this.getData(_=>{
                  this.myData = _.data
                  cb && cb()
                }, true)
            },
            getData (cb, isQuietness = false) {
                this.xdapi.borrowingRecord({
                      pageIndex: '1',  // 页数
                      pageSize: '10'   // 数量
                }, isQuietness).then(data=>{
                    if (data.returnCode == 0) {
                        if (typeof data.data === 'string') {
                            try {
                              data.data = JSON.parse(data.data)
                            } catch (e) { 
                              // ... 
                            }
                        }

                        if (data.data.length === 0) {
                            this.isEmpty = true;
                        } else {
                            this.isEmpty = false;
                        }

                        cb && cb(data)
                    } else {
                        Toast(data.msg || "数据查询失败，请稍后重试");
                    }
                })
            },
            process2name (process) {
              switch (process + '') {
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
            go (item) {
                if (item.BorrowMoney) {
                    this.$store.dispatch('setBorrowInfoData', {
                        // 进度/订单状态
                        Schedule:      item.Schedule,
                        // 借款金额
                        BorrowMoney:   item.BorrowMoney,
                        // 借款期限
                        BorrowLimit:   item.BorrowLimit,
                        // 还款方式
                        RepaymentType: item.RepaymentType,
                        // 门店
                        StoreName:     item.StoreName,
                        // 时间
                        ApplyDate:     item.ApplyDate
                    }).then(_ => {
                        this.$router.push('BorrowProgress')
                    })
                  } else {
                    if (item.Schedule == '-1') {
                      Toast('该订单已取消，未找到详情')
                    } else if (item.Schedule == '0' || item.Schedule == '1' || item.Schedule == '2' || item.Schedule == '3') {
                      Toast('正在审核中，未找到详情')
                    } else {
                      Toast('未找到详情')
                    }
                  }
            },
            gocancel (ProtoTypeId, index) {
                msg.confirm("你确定要取消订单吗？", "操作提示").then(()=>{
                      this.xdapi.businessCancel({
                          ProtoTypeId: ProtoTypeId
                      }).then(data => {
                        if (data.returnCode == 0) {
                            this.myData[index].Schedule = '-1'
                            Toast("订单已取消")
                        } else {
                            Toast(data.msg || "取消失败，请稍后重试");
                        }
                      })
                }).catch(err => {
                    console.log(err)
                });
            }
        },
        components: {
            panel
        },
        beforeMount () {
             this.getData(_ => {
                this.myData = _.data
             })
        },
        activated () {
            if (this.myData.length === 0) {
              this.getData(_ => {
                 this.myData = _.data
              })
            }
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
