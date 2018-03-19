<template>
    <div class="CarSellBuy" v-if="d">
        <div class="banner">
            <div class="banner_text">当前最高出价</div>
            <div class="banner__money">{{ max_money }} <span class="banner__money--yuan">元</span></div>
            <div class="banner__price">起拍价： ¥ {{ d.startPrice }}</div>
        </div>
        <div class="navbar">
            <div class="navbar__block">
                <div class="navbar__text">保证金</div>
                <div class="navbar__money">¥ {{ d.bond }}</div>
            </div>
            <div class="navbar__line"></div>
            <div class="navbar__block">
                <div class="navbar__text">评估价</div>
                <div class="navbar__money">¥ {{ d.lastEvaluationAmount }}</div>
            </div>
        </div>
        <div class="time">
            <div class="time__text">拍卖时间：</div>
            <div class="time__section">{{ date2date(d.startPriceDate) }} - {{ date2date(d.etartPriceDate) }}</div>
        </div>
        <div class="form">
                <div class="form__left">
                    <div class="form__addtext">加价幅度<span class="form__addtext--yuan">（元 / 次）</span></div>
                    <div class="form__addmoney">{{ d.priceincrease }}</div>
                </div>

                <div class="form__right">
                    <div class="form__addtext">出价金额<span class="form__addtext--yuan">（元）</span></div>
                    <div class="InputNumber">
                        <a class="InputNumber__reduce" @click="reduce"></a>
                        <input type="text" class="InputNumber__input" v-model='input_money'>
                        <a class="InputNumber__add" @click="add"></a>
                    </div>
                    <div class="form__overtop">出价须高于 ¥ {{ max_money }}</div>
                </div>

        </div>
        <div class="btn">
            <button class="btn--primary" @click="go">报 名</button>
        </div>
    </div>
</template>

<script>
 import mtField from '@components/field/field2.vue'
 import Toast from '@components/toast/index.js'
 // messagebox 组件
 import msg from '@components/messagebox/messagebox.js'

export default {

  name: 'CarSellBuy',

  data () {
    return {
        input_money: 0,
        max_money: 0,
        d: this.$store.state.CarInfoData.CarInfoData.data,  // 汽车详情
        getMaxTimer: null
    }
  },
  components: {
    mtField
  },
  methods: {
    reduce () {
        if (this.input_money <= this.max_money + this.d.priceincrease) return false;
        this.input_money =  this.input_money - this.d.priceincrease
    },
    add () {
        this.input_money =  this.input_money + this.d.priceincrease
    },
    getMAX () {
      this.getMaxTimer = window.setInterval(_=>{
          this.carapi.selectMaxOfferPriceByAuctionId({
              priceID: this.d.priceID
          }, true).then(_=>{
              if (_.returnCode == 0) {
                  this.TopAmount = _.data.offerAmount
              }
          })
      }, 2000);
    },
    go () {
        if ((this.input_money - this.max_money) >= this.d.priceincrease * 5) {
            msg.confirm(`已经大于5个加价幅度，您确认以 ¥ ${this.input_money} 出价？`, "温馨提示").then(()=>{
                this.submit()
            }).catch(() => {
                return false;
            });
        } else {
            msg.confirm(`您确认以 ¥ ${this.input_money} 出价？`, "温馨提示").then(()=>{
                this.submit()
            }).catch(() => {
                return false;
            });
        }
    },
    submit () {
        this.carapi.updateAuctions({
           priceID: this.d.priceID,
           amount : this.input_money,
        }).then(_=>{
            console.log(_);
            if (_.returnCode == 0) {
                this.$router.push('/CarSellBuySuccess');
            } else {
                Toast(_.msg)
            }
        })
    }
  },
  beforeRouteLeave  (to, from, next) {
      window.clearInterval(this.getMaxTimer);
      next();
  },
  computed: {
  },
  watch: {
  },
  beforeMount () {
        if (!this.$store.state.CarInfoData.CarInfoData.data) {
           return this.$router.push('/carsell')
        }
        this.carapi.selectMaxOfferPriceByAuctionId({
            priceID: this.d.priceID
        }).then(_=>{
            if (_.returnCode == 0) {
                this.max_money = _.data.offerAmount
                this.input_money =  this.max_money + this.d.priceincrease
                this.getMAX();
            } else {
                Toast(_.msg)
            }
        })
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
    @include flex(b, c);
    padding: pxToRem(30px) pxToRem(30px);
    background: #fff;

    .form__left {
        align-self: flex-start;
        height: pxToRem(200px);
    }

    .form__addtext {
        font-size: pxToRem(32px);
        color: #828282;        
    }

    .form__addmoney {
        font-size: pxToRem(48px);
        color: #1c1c1c;
        margin-top: pxToRem(35px);
    }

    .form__addtext--yuan {
        font-size: pxToRem(24px);
        color: #828282;
    }

    .form__right {
        @include flex(b,s,c);
        height: pxToRem(200px);
    }

    .InputNumber {
        @include flex(c,c);
    }

    .InputNumber__reduce {
        @include size(82px, 82px);
        border: solid pxToRem(2px) #ebebeb;
        position: relative;

        &::after {
            @include bg(33px, 2px, '~@assets/-.png');
            @include center;
            content: '';
            position: absolute;
        }

        &:active {
            background: #ccc;
        }
    }

    .InputNumber__add {
        @include size(82px, 82px);
        border: solid pxToRem(2px) #ebebeb;
        position: relative;

        &::after {
            @include bg(33px, 33px, '~@assets/+.png');
            @include center;
            content: '';
            position: absolute;
        }

        &:active {
            background: #ccc;
        }
    }

    .InputNumber__input {
        @include size(240px, 82px);
        border: solid pxToRem(2px) #ebebeb;
        background: #fff;
        font-size: pxToRem(48px);
        text-align: center;
        margin: auto pxToRem(5px);
    }

    .form__overtop {
        color: #df2323;
        font-size: pxToRem(28px);
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