<template>
 <div id="BorrowProgress">
      <div class="banner">
            <el-steps :active="activeStep" align-center>
                <el-step title="申请借款">
                    <i class="myicon one"   :class="{active: activeStep >= 0}" slot="icon"></i>
                </el-step>
                <el-step title="车辆评估">
                    <i class="myicon two"   :class="{active: activeStep >= 1}" slot="icon"></i>
                </el-step>
                <el-step title="手续办理">
                    <i class="myicon three" :class="{active: activeStep >= 2}" slot="icon"></i>
                </el-step>
                <el-step title="放款">
                    <i class="myicon four" :class="{active: activeStep >= 3}" slot="icon"></i>
                </el-step>
            </el-steps>
      </div>

      <div class="info">
          <div class="info-item">
              <div class="info-item-head">100000元</div>
              <div class="info-item-body">借款金额</div>
          </div>
          <div class="info-item">
              <div class="info-item-head">12个月</div>
              <div class="info-item-body">借款期限</div>
          </div>
          <div class="info-item">
              <div class="info-item-head">等额本息</div>
              <div class="info-item-body">还款方式</div>
          </div>
      </div>

      <div>

          <cell title="评估预约时间："  :value="time"></cell>  
          <cell title="所在门店："      :value="shop"></cell>  
          <cell title="订单状态："      :value="status"></cell>  

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
              time: '2017-06-16',
              shop: '东莞塘厦营业部',
              status: '审核中',
              activeStep: 1
            }
        },
        watch: {
            
        },
        methods: {
            
        },
        components: {
          elSteps: Steps, 
          elStep: Step,
          cell
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
  
  .banner {
      width: 100%;
      height: pxToRem(290px);
      background-color: #0e6ae7;
      box-shadow: pxToRem(0px) pxToRem(0px) pxToRem(20px) pxToRem(0px) rgba(0, 0, 0, 0.06);
      padding-top: pxToRem(75px);
      box-sizing: border-box;
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


  .myicon {
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
      width: 100%;
      height: 100%;

      &.one {
          background-image: url('~@assets/borrow/1_icon_nor.png');

          &.one.active {
              background-image: url('~@assets/borrow/1_icon_light.png');
          }
      }
      &.two {
          background-image: url('~@assets/borrow/2_icon_nor.png');
                 
          &.active {
              background-image: url('~@assets/borrow/2_icon_light.png');
          }
      }
      &.three {
          background-image: url('~@assets/borrow/3_icon_nor.png');
                 
          &.active {
              background-image: url('~@assets/borrow/3_icon_light.png');
          }
      }

      &.four {
          background-image: url('~@assets/borrow/4_icon_nor.png');
                 
          &.active {
              background-image: url('~@assets/borrow/4_icon_light.png');
          }
      }
  }
}


</style>
