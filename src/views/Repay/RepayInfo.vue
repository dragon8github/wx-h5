<template>
 <div id="RepayInfo" v-if="d.business_type">
       <div class="Repay-Item">
           <i class="right-icon" :class="type2icon(d.business_type, d.Is_extend_flag)"></i>
           <div class="Repay-Item-Warp">
               <p class="bunsinessId">业务编号：{{ d.business_id }}</p>
               <div class="Repay-Item-Warp-Center">
                   <p class="shouldrepay" v-if="d.CurrentRepayStatus != '已还款'">本期应还</p>
                   <p class="money" :class="status2Color(d.CurrentRepayStatus)"> {{ d.CurrentRepayStatus === '已还款' ? '本期已还清' : '¥' + d.CurrentRepayMoney }}</p>
                   <p class="timer" v-if="d.CurrentRepayStatus != '已还款'"><a>请在{{ date2date(d.CurrentRepayDate, 'MM月dd日') }}前还款</a></p>
                   <div class="info">
                       <div class="info-item">
                           <div class="info-item-head">{{ (d.borrow_money / 10000).toFixed(2) }}万元</div>
                           <div class="info-item-body">{{ d.Is_extend_flag ? "展期金额" : "借款金额" }}</div>
                       </div>
                       <div class="info-item">
                           <div class="info-item-head">{{ d.loan_term }}个月</div>
                           <div class="info-item-body">{{ d.Is_extend_flag ? "展期期限" : "借款期限" }}</div>
                       </div>
                       <div class="info-item">
                           <div class="info-item-head">{{ d.repayment_type }}</div>
                           <div class="info-item-body">还款方式</div>
                       </div>
                   </div>
                   <div class="info-bottom">
                      <div class="info-bottom-left">借款日期 {{ date2date(d.borrow_time) }}</div>
                      <div class="info-bottom-right">每月{{ date2date(d.CurrentRepayDate, 'dd日') }}自动扣款</div>
                   </div>
               </div>
           </div>
       </div>

       <div class="RepayList">
            <div class="RepayList-head">
                <div class="RepayList-head-left">剩余{{ d.NoRepayPlanList.length }}期</div>
                <div class="RepayList-head-right">金额（元）</div>
            </div>
            <div class="RepayList-body">
                <div class="RepayList-body-item" v-for="(item, index) in d.NoRepayPlanList" > 
                  <div class="RepayList-body-left" :class="{red: isOverdue(item.borrow_date)}">{{ date2date(item.borrow_date) }} {{ getTimeStatus(item.car_business_after_id, item.borrow_date) }} </div>
                  <div class="RepayList-body-right" :class="{red: isOverdue(item.borrow_date)}">{{ item.current_repaing_amount }}</div> 
                </div>
            </div>
            <div class="RepayList-tail">未还共计：{{ nopaymoney }}</div>
       </div>

       <div class="RepayList" v-if="d.RepayedPlanList.length > 0">
            <div class="RepayList-head">
                <div class="RepayList-head-left">已还{{ d.RepayedPlanList.length }}期</div>
                <div class="RepayList-head-right">金额（元）</div>
            </div>
            <div class="RepayList-body">
                <div class="RepayList-body-item"  v-for="(item, index) in d.RepayedPlanList"> 
                    <div class="RepayList-body-left">{{ date2date(item.borrow_date) }}</div> 
                    <div class="RepayList-body-right">{{ item.total_plan_repayment === item.total_plan_repayment_contains_overdue ? item.total_plan_repayment : item.total_plan_repayment_contains_overdue  }}</div> 
                </div>
            </div>
            <div class="RepayList-tail">已还共计：{{ paymoney }}</div>
       </div>

 </div>
</template>

<script>
  import mtField from '@components/field/field.vue'
  import Toast   from '@components/toast/index.js'
  import Loader  from '@components/loader/index.js'
  export default {
        name: 'RepayInfo',
        data () {
            return {
              d: this.$store.state.RepayInfo.RepayInfo,
              afterid:this.$route.params.afterid
            }
        },
        watch: {

        },
        methods: {

          // 根据业务类型返回右上角的图标
          type2icon (type, HasDeffer) {
              type = type.indexOf('车') >= 0 ? 'car' : 'house'
              if (type === 'car' && HasDeffer)    return 'carzhanqi'
              if (type === 'car' && !HasDeffer)   return 'car'
              if (type === 'house' && HasDeffer)  return 'housezhanqi'
              if (type === 'house' && !HasDeffer) return 'house'
          },

          // 根据状态返回文字颜色
          status2Color (status) {
              if (status == "逾期") {
                  return 'red'
              } else if (status == "还款中") {
                  return 'blue'
              } else if (status === '已还款') {
                  return ''
              }
          },

          isOverdue (time) {
              time = time.replace(/\-/g, "/")
              time = (new Date(time)).getTime();
              var curTime = new Date(new Date().toLocaleDateString()).getTime();
              if (curTime > time) {
                  return true
              }
              return false
          },

          getTimeStatus (id, date) {
              if (id === this.afterid && this.isOverdue(date)) {
                  return '（逾期）'
              } else if (this.isOverdue(date)) {
                  return '（逾期）'
              } else if (id === this.afterid) {
                 return '（本期）'
              }
          }
        },
        computed: {
          nopaymoney () {
            var money = 0
            if (this.d.NoRepayPlanList) {
              for (var i = this.d.NoRepayPlanList.length - 1; i >= 0; i--) {
                 money += this.d.NoRepayPlanList[i].current_repaing_amount
              }
            }
            return Math.floor(money * 100) / 100;
          },
          paymoney () {
            var money = 0
            if (this.d.RepayedPlanList) {
              for (var i = this.d.RepayedPlanList.length - 1; i >= 0; i--) {
                 var a = this.d.RepayedPlanList[i].total_plan_repayment
                 var b = this.d.RepayedPlanList[i].total_plan_repayment_contains_overdue
                 var _money =  a === b ? a : b 
                 money += _money
              }
            }
            return Math.floor(money * 100) / 100;
          }
        },
        components: {
        },
        beforeMount () {
          console.log(this.d)

          if (!this.d.business_type) {
            this.$router.push('/Repay')
             Toast('未找到详情数据，请稍后重试')
          }
        }
  }
</script>


<style scoped lang="scss">
@import "~@sass/_variables";
@import "~@sass/_func";

#RepayInfo {
   position: relative;
   height: 100%;
   background: #f2f2f2;
   padding: pxToRem(20px) pxToRem(30px) pxToRem(60px) pxToRem(30px);
}

.Repay-Item {
    background: #fff;
    min-height: pxToRem(379px);
    position: relative;
    padding: pxToRem(30px);
    border-radius: 4px;

    .Repay-Item-Warp {
        padding: pxToRem(43px) pxToRem(33px);
        border: pxToRem(2px) solid #e5e5e5;
    }
    .right-icon {
        position: absolute;
        right: pxToRem(-5px);
        top: pxToRem(-5px);
        width: pxToRem(200px);
        height: pxToRem(200px);

        &.car {
            background: url('~@assets/repay/cyd_img@2x.png') center / 100% no-repeat content-box;
        }

        &.carzhanqi {
            background: url('~@assets/repay/cydzq_img@2x.png') center / 100% no-repeat content-box;
        }

        &.house {
            background: url('~@assets/repay/fsd_img@2x.png') center / 100% no-repeat content-box;
        }

        &.housezhanqi {
            background: url('~@assets/repay/fsdzq_img@2x.png') center / 100% no-repeat content-box;
        }
    }

    .bunsinessId {
        font-size: pxToRem(24px);
        color: #999999;
    }
}



.Repay-Item-Warp-Center {
    text-align: center;

    .shouldrepay {
        font-size: pxToRem(24px);
        color: #999999;
    }

    .money {
        font-size: pxToRem(72px);
        color: #222222;
        margin: pxToRem(30px) auto;

        &.blue {
          color: #0e6ae7;
        }

        &.red {
          color: #e60012;
        }
    }

    .timer {
        font-size: pxToRem(24px);
        color: #999999;
        margin: 0 auto pxToRem(43px);
    }
}

.red {
  color: #e60012 !important;
}

.info {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  height: pxToRem(163px);
  margin-bottom: pxToRem(34px);
  position: relative;

  &::before {
          @include border('top', #e5e5e5)

  }

  &::after {
          @include border('bottom', #e5e5e5)

  }

  .info-item {
    flex: 1;
  }

  .info-item + .info-item {
      position: relative;

      &::before {
         position: absolute;
         left: 0;
         top: 50%;
         transform: translateY(-50%);
         content: '';
         width: pxToRem(1px);
         height: pxToRem(49px);
         background: #e5e5e5;
      }
  }

  .info-item-head {
      font-size: pxToRem(32px);
      color: #222222;
      line-height: pxToRem(55px);
  }

  .info-item-body {
      font-size: pxToRem(24px);
      color: #999999;
  }
}

.info-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .info-bottom-left {
    color: #999999;
    font-size: pxToRem(24px);
  }

  .info-bottom-right {
    color: #0e6ae7;
    font-size: pxToRem(24px);
  }
}



.RepayList {
  margin-top: pxToRem(20px);
  background: #fff;
  padding: 0 pxToRem(30px);
  font-size: pxToRem(28px);
  color: #999999;

  .RepayList-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: pxToRem(68px);
  }

  .RepayList-body-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: pxToRem(88px);
      position: relative;

      &::before {
          @include border('top', #e5e5e5)
      }

      & .RepayList-body-left {
        color: #022222;
      }

      & .RepayList-body-right {
        color: #0e6ae7;
      }
  }

  .RepayList-tail {
    height: pxToRem(68px);
    text-align: right;
    line-height: pxToRem(68px);

  }

}
</style>
