<template>
    <div class="CarSellApply">
        <div v-if="d">
            <div class="cur-car-info">
                <item  
                    :type="d.type"
                    :id="d.businessId"
                    :maindata="d"
                    :image="d.docs && d.docs[0] && d.docs[0].docUrl"
                    :name="d.vehicleBrand"
                    :model="d.carModel"
                    :money="d.startPrice"
                    :starttime="d.startPriceDate"
                    :endtime="d.endPriceDate"
                    :city="d.vcehicleTerritory">
                </item>
            </div>
            <div class="warm">
                <div class="warm__title">
                    <a class="warm__icon">!</a>
                    <article>温馨提示：请填写竞买人真实有效身份信息，标的物交接时将会核实此资料。</article>
                </div>
            </div>
            <!-- <div class="banner">
                <div class="banner_text">保证金</div>
                <div class="banner__money">{{ d.bond }} <span class="banner__money--yuan">元</span></div>
                <div class="banner__price">起拍价： ¥ {{ d.startPrice }}</div>
            </div>
            <div class="navbar">
                <div class="navbar__block">
                    <div class="navbar__text">评估价</div>
                    <div class="navbar__money">¥ {{ d.lastEvaluationAmount }}</div>
                </div>
                <div class="navbar__line"></div>
                <div class="navbar__block">
                    <div class="navbar__text">加价幅度</div>
                    <div class="navbar__money">¥ {{ d.priceincrease }}</div>
                </div>
            </div>
            <div class="time">
                <div class="time__text">拍卖时间：</div>
                <div class="time__section">{{ date2date(d.startPriceDate) }} - {{ date2date(d.etartPriceDate) }}</div>
            </div> -->

            <div class="form">
                <mt-field label="姓名："  :disabled="disabled"   placeholder="请输入姓名" v-model="userName" :maxlength = '20'></mt-field>
                <mt-field label="身份证号：" :disabled="disabled"  placeholder="填写有效身份证信息" @blur="cardkeyup"  v-model="idCard" :maxlength = '18'></mt-field>
                <mt-field style="margin-bottom:0.1rem;" label="手机号码：" v-model="phoneNumber" placeholder="输入本人手机号码"></mt-field>
                <!-- <mt-field label="转账银行：" placeholder="请选择转账银行" @click="goBankSelect" v-model="bank" readonly>
                    <div class="form__bank--arrow"></div>
                </mt-field> -->
                <mt-field label="报价：" placeholder="请输入报价金额" v-model="amount"  :maxlength = '25'></mt-field>
                <mt-field label="备注：" placeholder="填写备注内容" v-model="remark" ></mt-field>
                <div class="warm">
                    <div class="warm__title">
                        <a class="warm__icon">!</a>
                        <article>温馨提示：每台车只能报价三次。</article>
                    </div>
                </div>
            </div>
            <!--<div class="warm">
                 <div class="warm__panel">
                    <div class="warm__text">请在<span class="warm__text--blue"> {{ d.starBidTime }} </span>前将<span class="warm__text--blue"> {{ d.bond }}元 </span>保证金打到如下账号，以获取竞拍资格，转账请备注注册账号和竞买车辆。如竞拍失败，保证金将如数退还。 </div>
                    <div class="warm__line"></div>
                    <div class="warm__address"> 
                        单位名称： {{ d.account }}<br>
                        开户行： {{ d.bank }}<br>
                        账号： {{ d.cardNo }}
                    </div>
                </div> 
            </div>-->
            
            <div class="btn">
                <button class="btn--primary" @click="apply">报 名</button>
            </div>
        </div>
    </div>
</template>

<script>
 import mtField from '@components/field/field2.vue'
 import Toast from '@components/toast/index.js'
 import item from '@/myComponents/carsellitem.vue'

export default {

  name: 'CarSellApply',

  data () {
    return {
        disabled:true,
        d: this.$store.state.CarInfoData.CarInfoData || {},  // 汽车详情
        phoneNumber: this.$store.getters.AppData.phoneNumber || '',                     // 手机号码
        userName: this.$store.getters.AppData.customerName,                                      // 用户名
        userId: this.$store.getters.AppData.userId,
        idCard: this.$store.getters.AppData.identifyCard,                                 // 身份证号
        amount: '',
        remark: '',                //备注
        count: 0,
    }
  },
  components: {
    mtField,
    item
  },
  methods: {
    goBankSelect() {
        this.$router.push('/bankselect')
    },
    apply() {
        if (this.userName.trim() === '') {
            return Toast('请输入用户名')
        } else if (!/^[\u4e00-\u9fa5]+$/.test(this.userName.trim())) {
            return Toast('用户名必须为纯中文')
        }
        if (this.idCard.trim() === '') {
            return Toast('请输入身份证号')
        } else if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.idCard.replace(/\s|\xA0/g,""))) {
            return Toast('请输入正确的身份证号')
        }


        if (this.phoneNumber.trim() === '') {
            return Toast('请输入手机号码')
        } else if (!/^1\d{10}$/.test(this.phoneNumber.trim())) {
            return Toast('请输入正确的手机号码')
        }

        // if (!this.$store.state.bank) {
        //     Toast('请选择转账银行')
        //     return this.$router.push('/bankselect')
        // }

        // if (this.id.trim().length < 12 || this.card.trim().length > 25 || !/\d+/.test(this.card.trim())) {
        //   return Toast('请输入正确的银行卡号')
        // }
        if(this.count >= 3) {
            Toast('已经超过报价次数，不能报价!')
        }else {
            this.carapi.updateAuctions({
                auctionId: this.d.auctionId,
                userId:this.userId,
                userName: this.userName,
                idCard: this.idCard,
                telephone: this.phoneNumber,
                remark: this.remark,
                amount: this.amount
            }).then(_ => {
                if ( _.returnCode == 0 ) {
                    // this.$store.dispatch('setCarInfoData', {
                    //     userName: this.username
                    // }).then(_ => {
                    
                    // }) 
                    this.$router.push('/CarSellApplyStatus')               
                } else {
                    Toast(_.msg)
                    this.$router.push('/ErrorPage')  
                }
            })
        }
    },
    cardkeyup (v) {
        var op = "";  
        var t = v.replace(/\D/g, "");
        for (var i=0; i < t.length; i++) {
            if (i % 4 === 0 && i > 0) {
                op += " " + t.charAt(i);
            } else {
                op += t.charAt(i);
            }
        }
        this.idCard = op
    },
    obtainQuotationHistory() {
        this.carapi.myBids({auctionId: this.d.auctionId,userId: this.userId}).then(_ => {
            if(_.returnCode == 0){
                this.count = _.data.length
            }
        })
    }
  },
  created () {
    this.obtainQuotationHistory()
    if (!this.$store.state.CarInfoData.CarInfoData.auctionId) {
        return this.$router.push('/carsell')
    }
    this.cardkeyup(this.idCard);
    this.d = this.$store.state.CarInfoData.CarInfoData
  },

} 
</script>

<style lang="scss" scoped>
@import "~@sass/_variables";
@import "~@sass/_func";
.cur-car-info{
    padding: .3rem 0.4rem 0.1rem 0.4rem;
    background: $bg-white;
    //border-bottom: 1px solid #ccc;
    margin-top: .266667rem;
    margin-bottom: .266667rem;
}
// .banner {
//     @include flex(a, c, c);
//     height: pxToRem(302px);
//     background-color: #0e6ae7;
//     color: #fff;
//     padding: pxToRem(45px) 0;
//     margin: 0;

//     .banner_text {
//         font-size: pxToRem(28px);
//     }

//     .banner__money {
//         font-size: pxToRem(80px);
//     }

//     .banner__money--yuan {
//         font-size: pxToRem(28px);
//     }

//     .banner__price {
//         font-size: pxToRem(36px);
//     }
// }

// .navbar {
//     @include flex(a, c);
//     height: pxToRem(110px);
//     background-color: #075dd3;
//     margin: 0;

//     .navbar__block {
//         text-align: center;
//         flex: 1;
//     }

//     .navbar__line {
//         @include line(66px, #fff, col)
//     }

//     .navbar__text {
//         color: #b9c8ee;
//         font-size: pxToRem(28px);
//         margin-bottom: pxToRem(8px);
//     }

//     .navbar__money {
//          color: #ffffff;
//          font-size: pxToRem(32px);
//     }
// }

.time {
    @include flex(b, s, c);
    height: pxToRem(140px);
    margin-bottom: pxToRem(10px);
    background-color: $bg-white;
    padding: pxToRem(20px) pxToRem(30px);

    .time__text {
        color: $font-text;
        font-size: pxToRem(32px);
    }

    .time__section {
        color: $font-primary;
        font-size: pxToRem(32px);
    }
}


.form {
    margin-top: .266667rem;
    // .form__bank--arrow::after {
    //     border: pxToRem(2px) solid #c8c8cd;
    //     border-bottom-width: 0;
    //     border-left-width: 0;
    //     content: " ";
    //     position: absolute;
    //     top: 50%;
    //     right: pxToRem(20px * 2);
    //     height: pxToRem(5px * 2);
    //     width: pxToRem(5px * 2);
    //     transform: translateY(-50%) rotate(45deg);
    // }
}

.warm {
    padding: .2rem 0.30667rem;
    color: $font-text;
    font-size: 0.37333rem;
    background: $bg-white;
    .warm__title {
       @include flex(s);
       //margin: pxToRem(20px) auto;
    }

    .warm__icon {
        @include size(36px, 36px);
        background-color: #ffba00;
        border-radius: 100%;
        display: inline-block;
        font-size: pxToRem(24px);
        color: $font-white;
        line-height: pxToRem(36px);
        text-align: center;
        margin-right: pxToRem(20px);
        flex-shrink: 0;
    }

    .warm__panel {
        background: $bg-white;
        padding: pxToRem(30px) pxToRem(40px);
        line-height: pxToRem(60px);
    }

    .warm__text {

    }

    .warm__text--blue {
        color: $tip-primary;
    }

    .warm__address {
        font-size: pxToRem(26px);
    }

    .warm__line {
        @include line(100px, #c8c7cc);
    }
}


.btn {
   @include flex(center);
   margin: pxToRem(38px) 0 pxToRem(63px);

   .btn--primary {
       margin: auto;
       width: pxToRem(690px);
       height: pxToRem(100px);
       background-color: $btn-bg;
       border-radius: pxToRem(6px);
       text-align: center;
       line-height: pxToRem(100px);
       color: $btn-font-color;
       font-size: pxToRem(32px);
       border: 0;
   }
}

</style>