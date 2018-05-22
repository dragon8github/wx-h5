<template>
 <div id="BorrowProgress">
      <div class="banner">
            <el-steps :active="activeStep" align-center>
                <el-step :title="myapply">
                    <i class="myicon one"   :class="{active: activeStep >= 0}" slot="icon"></i>
                </el-step>
                <el-step :title="myassess">
                    <i class="myicon two"   :class="{active: activeStep >= 1}" slot="icon"></i>
                </el-step>
                <el-step title="手续办理">
                    <i class="myicon three" :class="{active: activeStep >= 2}" slot="icon"></i>
                </el-step>
                <el-step title="放款">
                    <i class="myicon four"  :class="{active: activeStep >= 3}" slot="icon"></i>
                </el-step>
            </el-steps>
      </div>

      <div class="info">
          <div class="info-item">
              <div class="info-item-head">{{ money2money(d.BorrowMoney) }}</div>
              <div class="info-item-body">{{ moneyText }}</div>
          </div>
          <div class="info-item">
              <div class="info-item-head">{{ limit2limit(d.BorrowLimit) }}</div>
              <div class="info-item-body">{{ limitText }}</div>
          </div>
          <div class="info-item">
              <div class="info-item-head">{{ pattern2pattern(d.RepaymentType) }}</div>
              <div class="info-item-body">还款方式</div>
          </div>
      </div>

      <div>

          <!-- <cell title="申请时间：" :value="date2date(d.ApplyDate)"></cell>   -->
          <cell title="所在门店：" :value="d.StoreName"></cell>  
          <cell title="订单状态：" :value="process2name"></cell>  

      </div>
 </div>
</template>

<script>
  import cell   from '@components/cell.vue'
  import Toast  from '@components/toast/index.js'
  import Loader from '@components/loader/index.js'
  import Steps  from '@components/steps/src/steps.vue'
  import Step   from '@components/steps/src/step.vue'

  export default {
        name: 'BorrowProgress',
        data () {
            return {
                d: this.$store.state.BorrowInfo.BorrowInfoData,
                type: this.$route.params.type || ''
            }
        },
        watch: {
            
        },
        methods: {
            money2money (money) {
                if (money) {
                    return (money / 10000).toFixed(2) + '万元'
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
        },
        computed: {
            process2name () {
              switch (this.d.Schedule + '') {
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
            activeStep () {
                var type = this.d.Schedule;
                // 申请借款
                if (type == 0 || type == 1) {
                    return 0
                // 车辆评估/房产核价
                } else if (type == 2) {
                    return 1
                // 手续办理
                } else if (type == 3) {
                    return 2
                // 放款
                } else  if (type == 4 || type == 5) {
                    return 3
                }
            },
            myassess () {
                if (this.type == '一点车贷') {
                    return '车辆评估'
                } else if (this.type == '鸿特微贷') {
                    return '房价评估'
                } else if (this.type === '一点车贷展期') {
                    return '车辆评估'
                } else if (this.type === '鸿特微贷展期') {
                    return '房价评估'
                }
            },
            myapply () {
              if (this.type == '一点车贷') {
                  return '申请借款'
              } else if (this.type == '鸿特微贷') {
                  return '申请借款'
              } else if (this.type === '一点车贷展期') {
                  return '申请展期'
              } else if (this.type === '鸿特微贷展期') {
                  return '申请展期'
              }
            },
            moneyText () {
              if (this.type == '一点车贷') {
                  return '借款金额'
              } else if (this.type == '鸿特微贷') {
                  return '借款金额'
              } else if (this.type === '一点车贷展期') {
                  return '展期金额'
              } else if (this.type === '鸿特微贷展期') {
                  return '展期金额'
              }
            },
            limitText () {
              if (this.type == '一点车贷') {
                  return '借款期限'
              } else if (this.type == '鸿特微贷') {
                  return '借款期限'
              } else if (this.type === '一点车贷展期') {
                  return '展期期限'
              } else if (this.type === '鸿特微贷展期') {
                  return '展期期限'
              }
            },
        },
        components: {
          elSteps: Steps, 
          elStep: Step,
          cell
        },
        beforeMount () {
        }
  }
</script>


<style lang="scss">
@import "~@sass/_variables";
@import "~@sass/_func";

#BorrowProgress {
  .mint-cell .mint-cell-wrapper {
      padding: 0 pxToRem(30px);
      background: #fff;
      margin-bottom: pxToRem(0px);
  }
  

  .info {
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    background: #fff;
    height: pxToRem(163px);
    margin-bottom: pxToRem(20px);

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

}


</style>
