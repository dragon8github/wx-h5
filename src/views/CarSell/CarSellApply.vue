<template>
    <div class="CarSellApply">
        <div class="banner">
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
            <div class="time__section">{{ d.startPriceDate }} - {{ d.etartPriceDate }}</div>
        </div>
        <div class="form">
            <mt-field label="姓名："     placeholder="请输入姓名" v-model="username" :maxlength = '20'></mt-field>
            <mt-field label="身份证号：" placeholder="填写有效身份证信息" v-model="id" :maxlength = '18'></mt-field>
            <mt-field label="手机号码：" v-model="phone" readonly></mt-field>
            <mt-field label="转账银行：" placeholder="请选择转账银行" @click="goBankSelect" v-model="bank" readonly>
                <div class="form__bank--arrow"></div>
            </mt-field>
            <mt-field label="转账银行：" placeholder="请填入转账卡号" v-model="card" @keyup="cardkeyup" :maxlength = '19'></mt-field>
        </div>
        <div class="warm">
            <div class="warm__title">
                <a class="warm__icon">!</a>
                <article>温馨提示：请填写竞买人真实有效身份信息，标的物交接时将会核实此资料。</article>
            </div>


            <div class="warm__panel">
                <div class="warm__text">请在<span class="warm__text--blue"> {{ d.paymentEndTime }} </span>前将<span class="warm__text--blue"> {{ d.bond }}元 </span>保证金打到如下账号，以获取竞拍资格，转账请备注注册账号和竞买车辆。如竞拍失败，保证金将如数退还。 </div>
                <div class="warm__line"></div>
                <div class="warm__address"> 
                    单位名称： {{ d.account }}<br>
                    开户行： {{ d.bank }}<br>
                    账号： {{ d.cardNo }}
                </div>
            </div>
        </div>
        
        <div class="btn">
            <button class="btn--primary" @click="apply">报 名</button>
        </div>
    </div>
</template>

<script>
 import mtField from '@components/field/field2.vue'
 import Toast from '@components/toast/index.js'

export default {

  name: 'CarSellApply',

  data () {
    return {
        phone: this.$store.state.phone,                     // 手机号码
        bank: this.$store.state.bank,                       // 银行
        card: '',                                           // 银行卡号
        username: '',                                       // 用户名
        id: '',                                             // 身份证号
        d: this.$store.state.CarInfoData.CarInfoData.data,  // 汽车详情
    }
  },
  components: {
    mtField
  },
  methods: {
    goBankSelect () {
        this.$router.push('/bankselect')
    },
    apply () {
        if (this.username.trim() === '') {
            return Toast('请输入用户名')
        } else if (!/^[\u4e00-\u9fa5]+$/.test(this.username.trim())) {
            return Toast('用户名必须为纯中文')
        }

        if (this.id.trim() === '') {
            return Toast('请输入身份证号')
        } else if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.id.trim())) {
            return Toast('请输入正确的身份证号')
        }

        if (this.phone.trim() === '') {
            return Toast('请输入手机号码')
        } else if (!/^1\d{10}$/.test(this.phone.trim())) {
            return Toast('请输入正确的手机号码')
        }

        if (!this.$store.state.bank) {
            return Toast('请选择转账银行')
        }

        if (this.card.trim().length < 12 || this.card.trim().length > 19 || !/\d+/.test(this.card.trim())) {
          return Toast('请输入正确的银行卡号')
        }

        this.carapi.auctionSign({
            priceID: this.d.priceID,
            userName: this.userName,
            userId: this.id,
            telePhone: this.phone
        }).then(_ => {
            console.log(_);
            if ( _.returnCode == 0 ) {
                this.$router.push('/CarSellApplyStatus')
            } else {
                Toast(_.msg)
            }
        })

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
        this.card = op
    }
  },
  beforeMount () {
        this.cardkeyup(this.card);
        if (!this.$store.state.CarInfoData.CarInfoData.data) {
            this.$router.push('/carsell')
        }
  }
} 
</script>

<style lang="scss" scoped>
@import "~@sass/_variables";
@import "~@sass/_func";


.banner {
    @include flex(a, c, c);
    height: pxToRem(302px);
    background-color: #0e6ae7;
    color: #fff;
    padding: pxToRem(45px) 0;

    .banner_text {
        font-size: pxToRem(28px);
    }

    .banner__money {
        font-size: pxToRem(80px);
    }

    .banner__money--yuan {
        font-size: pxToRem(28px);
    }

    .banner__price {
        font-size: pxToRem(36px);
    }
}

.navbar {
    @include flex(a, c);
    height: pxToRem(110px);
    background-color: #075dd3;

    .navbar__block {
        text-align: center;
        flex: 1;
    }

    .navbar__line {
        @include line(66px, #fff, col)
    }

    .navbar__text {
        color: #b9c8ee;
        font-size: pxToRem(28px);
        margin-bottom: pxToRem(8px);
    }

    .navbar__money {
         color: #ffffff;
         font-size: pxToRem(32px);
    }
}

.time {
    @include flex(b, s, c);
    height: pxToRem(140px);
    margin-bottom: pxToRem(10px);
    background-color: #fff;
    padding: pxToRem(20px) pxToRem(30px);

    .time__text {
        color: #222222;
        font-size: pxToRem(32px);
    }

    .time__section {
        color: #0e6ae7;
        font-size: pxToRem(32px);
    }
}


.form {
    .form__bank--arrow::after {
        border: pxToRem(2px) solid #c8c8cd;
        border-bottom-width: 0;
        border-left-width: 0;
        content: " ";
        position: absolute;
        top: 50%;
        right: pxToRem(20px * 2);
        height: pxToRem(5px * 2);
        width: pxToRem(5px * 2);
        transform: translateY(-50%) rotate(45deg);
    }
}

.warm {
    background-color: #f2f2f2;
    margin: pxToRem(30px) pxToRem(23px);
    color: #222222;
    font-size: pxToRem(28px);
    line-height: pxToRem(50px);

    .warm__title {
       @include flex(s);
       margin: pxToRem(20px) auto;
    }

    .warm__icon {
        @include size(50px, 36px);
        background-color: #ffba00;
        border-radius: 100%;
        display: inline-block;
        font-size: pxToRem(24px);
        color: #fff;
        line-height: pxToRem(36px);
        text-align: center;
        margin-right: pxToRem(20px);
        position: relative;
        top: pxToRem(5px);
    }

    .warm__panel {
        background: #fff;
        padding: pxToRem(30px) pxToRem(40px);
        line-height: pxToRem(60px);
    }

    .warm__text {

    }

    .warm__text--blue {
        color: #0e6ae7;
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
       background-color: #0e6ae7;
       border-radius: pxToRem(6px);
       text-align: center;
       line-height: pxToRem(100px);
       color: #fff;
       font-size: pxToRem(32px);
       border: 0;
   }
}

</style>