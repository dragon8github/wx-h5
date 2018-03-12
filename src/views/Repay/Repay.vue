<template>
   <div id="Repay">
       <div class="Repay-Item" v-for="(item, index) in mockData" @click="go(item.businessId)">
            <i class="right-icon" :class="type2icon(item.type)"></i>
            <div class="Repay-Item-Warp">
                <p class="bunsinessId">业务编号：{{ item.businessId }}</p>
                <div class="Repay-Item-Warp-Center">
                    <p class="shouldrepay">{{ status2shouldrepay(item.status) }}</p>
                    <p class="money" :class="status2Color(item.status)">{{ moneystatus2text(item.money, item.status) }}</p>
                    <p class="timer">{{ status2time(item.type, item.status, item.time) }}</p>
                    <p class="line"  v-if="item.order == null"></p>
                    <p class="info"  v-if="item.status != 'plan'"  @click.stop="goHistory(item.businessId)"><a>{{ status2gotext(item.status) }}</a></p>

                    <div class="manyorder" v-for="(item2, index2) in item.order">
                        <div class="manyorder-row">
                            <div class="manyorder-plan">还款计划 {{ index2 + 1 }}</div>
                            <div class="manyorder-money" :class="{red: item2.status == 'over'}">{{ ordermoneystatus2ordermoneytext(item2.money, item2.status) }}</div>
                        </div>
                        <div class="manyorder-row">
                            <div class="manyorder-timer">请在{{ item2.time }}前还款</div>
                            <div class="manyorder-info" @click.stop="goHistory(item.businessId)">{{ status2gotext(item2.status) }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   </div>
</template>

<script>
  import mtField from '@components/field/field.vue'
  import Toast   from '@components/toast/index.js'
  import Loader  from '@components/loader/index.js'
  export default {
        name: 'Repay',
        data () {
            return {
                mockData: [
                    // 车易贷
                    {businessId: 'CYD20170912001', money: '1745.40',  type: 'car',             status: 'normal', time: '2017/06/28'},
                    // 车易贷展期  
                    {businessId: 'CYD20170912345', money: '1745.40',  type: 'carsinglezhanqi', status: 'normal', time: '2017/06/28'}, 
                    // 车易贷展期（逾期）  
                    {businessId: 'CYD20170912315', money: '1745.40',  type: 'carsinglezhanqi', status: 'over',   time: '2017/06/28'},
                    // 房速贷已展期  
                    {businessId: 'CYD20170912345', money: '',         type: 'house',           status: 'alreadyzhanqi'},
                    // 房速贷（本期已还清）        
                    {businessId: 'CYD20170912578', money: '',         type: 'house',           status: 'termfinish'},
                    // 房速贷（已结清）      
                    {businessId: 'CYD20170912315', money: '',         type: 'house',           status: 'allfinish'},
                    // 车易贷（还款计划）        
                    {businessId: 'CYD20170912345', money: '2745.40',  type: 'houseplan',       status: 'plan',   order: [{businessId: 'CYD20170122345', time: '2017/06/28', money: '1745', status: 'normal'}, {businessId: 'CYD20170122345', time: '2017/07/28', money: '1000', status: 'normal'} ]},
                    // 房速贷展期（还款计划）      
                    {businessId: 'CYD20170912345', money: '2745.40',  type: 'housezhanqi',     status: 'zhanqi', order: [{businessId: 'CYD20170122345', time: '2017/06/28', money: '1745', status: 'finish'}, {businessId: 'CYD20173222345', time: '2017/07/28', money: '1000', status: 'over'} ]},
                    // 房速贷展期（还款计划）（已逾期）      
                    {businessId: 'CYD20170912345', money: '2745.40',  type: 'housezhanqi',     status: 'zhanqi', order: [{businessId: 'CYD20170122345', time: '2017/06/28', money: '1745', status: 'over'},   {businessId: 'CYD20173222345', time: '2017/07/28', money: '1000', status: 'over'} ]}
                ]
            }
        },
        methods: {
            // 根据业务类型返回右上角的图标
            type2icon (type) {
                switch (type) {
                    // 普通业务
                    case 'car':   return 'car'
                    case 'house': return 'house'

                    // 还款计划
                    case 'carplan':   return 'car'
                    case 'houseplan': return 'house'

                    // 单展期
                    case 'carsinglezhanqi':   return 'carzhanqi'
                    case 'housesinglezhanqi': return 'housezhanqi'

                    // 展期
                    case 'carzhanqi':   return 'carzhanqi'
                    case 'housezhanqi': return 'housezhanqi'
                }
            },
            // 根据状态返回显示的文本
            moneystatus2text (money, status) {
                switch (status) {
                    case 'termfinish':    return '本期已还清'
                    case 'allfinish':     return '已结清'
                    case 'alreadyzhanqi': return '已展期'
                    default:              return '￥' + money
                }
            },
            // 根据状态返回时间文本
            status2time (type, status, time) {
                // 以下业务类型【普通业务 + 单展期 + 还款计划】，需要返回值
                if (['car', 'house', 'carplan', 'houseplan', 'carsinglezhanqi', 'housesinglezhanqi'].indexOf(type) >= 0) {
                    // 根据状态来返回结果
                    switch (status) {
                        case 'over':   return '已逾期，请尽快还款！'
                        case 'plan':   return '请按以下日期还款'
                        case 'normal': return `请在${time}前还款`
                        default:       return ''
                    }
                }
                return ''
            },
            // 根据状态返回文字颜色
            status2Color (status) {
                switch (status) {
                    case 'normal': return 'blue'
                    case 'plan':   return 'blue'
                    case 'over':   return 'red'
                    default:       return ''
                }
            },
            // 根据状态返回是否应还
            status2shouldrepay (status) {
                return ['本期已还清', '已结清', '已展期'].indexOf(status) >= 0 ? '' : '本期应还'
            },
            // 如果是已展期、展期订单、已结清的情况下，返回的文本是历史账单，否则返回查看账单
            status2gotext (status) {
                return ['alreadyzhanqi', 'allfinish', 'zhanqi'].indexOf(status) >= 0 ?  '历史账单' : '查看账单'
            },
            // 根据状态来返回文本
            ordermoneystatus2ordermoneytext (money, status) {
                switch (status) {
                    case 'normal': return '￥' + money
                    case 'over':   return '已逾期'
                    case 'finish': return '本期已还清'
                    default:       return '￥' + money
                }
            },
            // 查看详情
            go (businessId) {
                this.$router.push('RepayInfo')
            },
            goHistory (businessId) {
                this.$router.push('RepayHistory')
            }
        },
        components: {

        },
        beforeMount () {

        }
  }
</script>

<style scoped lang="scss">
@import "~@sass/_variables";
@import "~@sass/_func";

#Repay {
   background: #f2f2f2;
   margin:0 pxToRem(30px) pxToRem(100px) pxToRem(30px);
   height: auto;
}

.Repay-Item {
    background: #fff;
    min-height: pxToRem(379px);
    position: relative;
    padding: pxToRem(30px);
    border-radius: 4px;
    margin-top: pxToRem(20px);

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

    p {
        margin: auto;
    }   

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
          font-weight: bolder;
        }

        &.red {
          color: #e60012;
          font-weight: bolder;
        }
    }

    .timer {
        font-size: pxToRem(24px);
        color: #999999;
        margin: 0 auto pxToRem(43px);
    }

    .line {
        width: pxToRem(100px);
        height: pxToRem(1px);
        background: #999999;
        margin: 0 auto pxToRem(43px);
    }

    .manyorder {
        width: 100%;
        position: relative;
        padding-top: pxToRem(30px);
        margin-top: pxToRem(30px);
        

        .manyorder-row {
            display: flex;
            justify-content: space-between;
            align-items:center;

            &:first-child {
                margin-bottom: pxToRem(20px);
            }
        }
        
        .manyorder-plan {
            width: pxToRem(152px);
            height: pxToRem(44px);
            font-size: pxToRem(24px);
            line-height: pxToRem(44px);
            background-color: #e5e5e5;
            color: #999999;
            position: relative;
            z-index: 1;
            left: pxToRem(-33px);
            text-align:left;
            padding-left: pxToRem(32px);

            &:before {
                content: '';
                background-color: #e5e5e5;
                width: pxToRem(31px);
                height: pxToRem(31px);
                position: absolute;
                right: pxToRem(-17px);
                top: pxToRem(6px);
                transform: rotate(45deg);
                z-index: -1;
            }
        }

        .manyorder-money {
            font-size: pxToRem(36px);
            color: #222222;

            &.red {
                color: #e60012;
            }
        }

        .manyorder-timer {
            font-size: pxToRem(24px);
            color: #999999;
        }

        .manyorder-info {
            font-size: pxToRem(28px);
            color: #0e6ae7;
        }

        &::before {
            @include border('top', #999999);
        }

    }


    .info {
        font-size: pxToRem(28px);
        color: #0e6ae7;
    }
}

</style>
