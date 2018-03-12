<template>
 <div id="Borrow">
        <div class="Borrow-Item" v-for="(item, index) in mockData">
            <div class="Borrow-Item-head">
                <div class="Borrow-icon car"></div>
                <div class="Borrow-right">
                    <div class="Borrow-name">{{ type2name(item.type) }}</div>
                    <div class="Borrow-info">
                        <span class="Borrow-time">申请日期：{{ item.time }}</span>
                        <span class="Borrow-approve" v-if="item.status != 'cancel'"><a @click="go(item.businessId)">{{ process2name(item.process) }}</a></span>
                    </div>
                </div>
            </div>
            <div class="Borrow-Item-body">
                <ul class="Borrow-Item-body-ul">
                    <li>借款金额： {{ money2money(item.money) }}</li>
                    <li>借款期限： {{ limit2limit(item.limit) }}</li>
                    <li>还款方式： {{ pattern2pattern(item.pattern) }}</li>
                </ul>
                <i class="Borrow-statusicon" :class="status2icon(item.status)"></i>
                <a class="cancelbtn" v-if="item.status == 'wait' && item.process != 'reject'" @click="gocancel(item.businessId, index)">取消</a>
            </div>
        </div>
 </div>
</template>

<script>
  import mtField from '@components/field/field.vue'
  import Toast   from '@components/toast/index.js'
  import Loader  from '@components/loader/index.js'
  import msg     from '@components/messagebox/messagebox.js'

  export default {
        name: 'Borrow',
        data () {
            return {
                mockData: [
                    {businessId: 'CYD20170912001', type: 'car',   time: '2017-06-16', limit: '12', pattern: '等额本息', money: '100000', status: 'cancel', process: 'finish'},
                    {businessId: 'CYD20170912001', type: 'house', time: '2017-06-16', limit: '12', pattern: '等额本息', money: '100000', status: 'finish', process: 'finish'},
                    {businessId: 'CYD20170912001', type: 'house', time: '2017-06-16', limit: '12', pattern: '等额本息', money: '100000', status: 'wait',   process: 'wait'},
                    {businessId: 'CYD20170912001', type: 'house', time: '2017-06-16', limit: '12', pattern: '等额本息', money: '100000', status: 'wait',   process: 'reject'},
                    {businessId: 'CYD20170912001', type: 'house', time: '2017-06-16', limit: '',   pattern: '',         money: '',       status: 'wait',   process: 'wait'}
                ]
            }
        },
        watch: {

        },
        methods: {
            type2name (type) {
                switch (type) {
                    case 'car':    return '一点车贷'
                    case 'house':  return '一点房贷'
                }
            },
            process2name (process) {
              switch (process) {
                  case 'wait':    return '待审批'
                  case 'reject':  return '已拒绝'
                  case 'finish':  return ''
                  default:        return ''
              }
            },
            status2icon (status) {
                switch (status) {
                    case 'cancel':  return 'cancel'
                    case 'finish':  return 'finish'
                    case 'wait':    return ''
                    default:        return ''
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
            go (businessId) {
               this.$router.push('BorrowProgress')
            },
            gocancel (businessId, index) {
                msg.confirm("你确定要取消订单吗？", "操作提示").then(()=>{
                      this.mockData[index].status = 'cancel'
                }).catch(() => {

                });
            }
        },
        components: {
        }
  }
</script>


<style scoped lang="scss">
@import "~@sass/_variables";
@import "~@sass/_func";

#Borrow {
   background: #f2f2f2;
   margin: 0 pxToRem(30px) pxToRem(100px) pxToRem(30px);
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
