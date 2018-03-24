<template>
<div>
   <panel :_loadTop = "loadTop" :_isEmpty="isEmpty" :Bottom="false">
       <div id="Repay" slot="body">
            
           <div class="Repay-Item" v-for="(item, index) in myData" @click="go(item.BusinessId)">
                
                <!-- 右上角的图标 -->
                <i class="right-icon" :class="type2icon(item)"></i>

                <div class="Repay-Item-Warp">
                    <!-- 业务编号 -->
                    <p class="bunsinessId">业务编号：{{ item.BusinessId }}</p>

                    <div class="Repay-Item-Warp-Center">
                            
                            <!-- 本期应还，如果是【已展期】【本期已还清】【已结清】的情况就不需要显示本文本 -->
                            <p class="shouldrepay" v-if="getStatus(item.Tip, item.Plans) != '本期已还清'">本期应还</p>

                            <!-- 金额，还款计划的累积 -->
                            <p class="money" :class="status2Color(item.IsOver)">{{ moneystatus2text(item) }}</p>

                            <!-- 还款日期，根据不同的情况显示不同的文本 -->
                            <p class="timer">{{ status2time(item) }}</p>

                            <!-- 低调的分割线 -->
                            <p class="line"></p>

                            <!-- 历史账单 / 请按以下日期还款 -->
                            <p class="info"  v-if="item.status != 'plan'" @click.stop="goHistory(item.BusinessId)">
                                <a>{{ status2gotext(item) }}</a>
                            </p>

                            <!-- 还款计划 -->
                            <div class="manyorder" v-for="(item2, index2) in item.order" v-if="item.plans.length > 1">
                                <div class="manyorder-row">
                                    <div class="manyorder-plan">还款计划 {{ index2 + 1 }}</div>
                                    <div class="manyorder-money" :class="{red: item2.status == 'over'}">{{ ordermoneystatus2ordermoneytext(item2.money, item2.status) }}</div>
                                </div>
                                <div class="manyorder-row">
                                    <div class="manyorder-timer">请在{{ item2.Date }}前还款</div>
                                    <div class="manyorder-info" @click.stop="goHistory(item.BusinessId, item.AfterId)">{{ status2gotext(item2) }}</div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
   </panel> 
</div>
</template>

<script>
/*
考虑把item分为多种：
1、普通类型
2、已展期、本期已还清、已结清类型
3、多个还款计划类型
 */
  import mtField from '@components/field/field.vue'
  import Toast   from '@components/toast/index.js'
  import Loader  from '@components/loader/index.js'
  import panel   from '@myComponents/panel.vue'

  export default {
        name: 'Repay',
        data () {
            return {
                myData: [],
                isEmpty: false
            }
        },
        methods: {
            loadTop (cb) {
                this.getData(_=>{
                  this.myData = _.data
                  cb && cb()
                }, true)
            },
            getData (cb, isQuietness = false) {
                this.xdapi.getRepayingList({
                      pageIndex: '1',  // 页数
                      pageSize: '10'   // 数量
                }, isQuietness).then(data => {
                    if (data.returnCode == 0) {
                        if (typeof data.data === 'string') {
                            try {
                              data.data = JSON.parse(data.data)
                            } catch (e) { 
                              // ... 
                            }
                        }
                        cb && cb(data)
                    } else {
                        Toast(data.msg);
                    }
                })
            },

            // 根据状态返回文字颜色
            status2Color (status) {
                if (status) {
                    return 'red'
                } else {
                    return 'blue'
                }
            },

            // 获取金额
            getAllMoney (plans) {
                var money = 0;
                for (var i = plans.length - 1; i >= 0; i--) {
                    money = plans[i].TotalAmount
                }
                return money;
            },

            // 获取订单状态
            getStatus (item) {
                if (!item.Tip) {
                    var text = ''
                    for (var i = item.Plans.length - 1; i >= 0; i--) {
                        if (item.Plans[i].Status === "已还款") {
                            return text = '本期已结清'
                        }
                    }
                    return text;
                } else {
                    // 已结清 / 已展期
                    return item.Tip; 
                }
            },

            // 如果是已展期、展期订单、已结清的情况下，返回的文本是历史账单，否则返回查看账单
            status2gotext (item) {
                if (item.BusinessId != item.OrgBusinessId || // 展期订单
                    item.Tip === '已结清' // 已结清
                   ) {
                    return '历史账单' : '查看账单'
                }
            },

            // 根据业务类型返回右上角的图标
            type2icon (item) {
                var type = item.BusinessType.indexOf('车') ? 'car' : 'house'
                var HasDeffer = item.OrgBusinessId === item.BusinessId ? true : false
                if (type === 'car' && HasDeffer)    return 'carzhanqi'
                if (type === 'car' && !HasDeffer)   return 'car'
                if (type === 'house' && HasDeffer)  return 'housezhanqi'
                if (type === 'house' && !HasDeffer) return 'house'
            },

            // 根据状态返回显示的文本
            moneystatus2text (item) {
                // 获取还款
                var status = this.getStatus(item);
                // 如果返回空，说明不属于 【本期已还清】 【已结清】 【已展期】
                if (!status) {
                    return '￥' + this.getAllMoney(item.plans)
                }
                return status
            },

            // 根据状态返回时间文本
            status2time (item) {

                var status = this.getStatus()

                if (!status)


                // 以下业务类型【还款计划】，需要返回值
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
            // 根据状态来返回文本
            ordermoneystatus2ordermoneytext (money, status) {
                switch (status) {
                    case 'normal': return '￥' + money
                    case 'over':   return '已逾期'
                    case 'finish': return '本期已还清'
                }
            },
            // 查看详情
            go (BusinessId) {
                this.$router.push(`RepayInfo/${BusinessId}`)
            },
            // 查看账单 / 查看历史
            goHistory (BusinessId) {
                this.$router.push(`RepayHistory/${BusinessId}/${afterid}`)
            },
        },
        components: {
            panel
        },
        computed: {
        },
        beforeMount () {
             this.getData(_ => {
                console.log(_.data);
                this.myData = _.data
             })
        },
        activated () {
          
        }
  }
</script>

<style scoped lang="scss">
@import "~@sass/_variables";
@import "~@sass/_func";

#Repay {
   background: #f2f2f2;
   margin:0 pxToRem(30px) pxToRem(30px) pxToRem(30px);
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
