<template>
    <div class="CarSellInfo" v-if="d">
            <div class="CarSellInfo__banner">
                <swipe :auto="4000"> 
                    <swipeitem class="slide1" v-for="(img, index) in d.docs" :key="index" > 
                        <img :src="getImg(img.docUrl)" class="CarSellInfo__image" /> 
                    </swipeitem>
                </swipe>
            </div>

            <div class="CarSellInfo__navbar">
                 <div class="CarSellInfo__navbarleft">拍卖进行中</div>
                 <div class="CarSellInfo__navbarright">{{ d.etartPriceDate }} 截止</div>
            </div>

            <div class="carMain">
                <div class="carMain__type">{{ d.vehicleBrand }}</div>
                <div class="carMain__id">拍卖编号：{{ d.businessId }}</div>
                <div class="carMain__start">起拍价：¥ {{ d.startPrice }}</div>
                <div class="carMain__maxtext">当前最高出价：</div>
                <div class="carMain__maxmoney">¥ {{ TopAmount  }}</div>
                <div class="carMain__time"> 拍卖时间：{{ date2date(d.startPriceDate) }} - {{ date2date(d.etartPriceDate) }} </div>
                <div class="carMain__line"></div>
                <div class="carMain__money">
                    <div class="carMain__moneytop">
                        <div class="carMain__ensure">保证金：¥  {{ d.bond }} </div>
                        <div>加价幅度：¥ {{ d.priceincrease }}</div>
                    </div>
                    <div>评估价：¥  {{ d.lastEvaluationAmount }}</div>
                </div>
            </div>

            <div class="carRule">
                <div class="carRule__rows">
                    <div class="carRule__rowsleft">交易类型：</div> <div class="carRule__rowsright">{{ d.tranType }}</div>
                </div>
                <div class="carRule__rows">
                    <div class="carRule__rowsleft">取货方式：</div> <div class="carRule__rowsright">{{ d.pickupMethod }}</div>
                </div>
                <div class="carRule__rows">
                    <div class="carRule__rowsleft">支付方式：</div> <div class="carRule__rowsright">{{ d.paymentMethod }}</div>
                </div>
                <div class="carRule__rows">
                    <div class="carRule__rowsleft">竞价规则：</div> <div class="carRule__rowsright">{{ d.bidRule }}</div>
                </div>
                <div class="carRule__rows">
                    <div class="carRule__rowsleft">处置单位：</div> <div class="carRule__rowsright">{{ d.disposalUnit }}</div>
                </div>
                <div class="carRule__rows">
                    <div class="carRule__rowsleft">咨询方式：</div> <div class="carRule__rowsright">{{ d.contacts }} {{ d.telephone }}</div>
                </div>
            </div>
            
            <cell title="竞买公告"  is-link :clickHandle="goCarSellNeedKnow"></cell>
            <cell title="竞买须知"  is-link :clickHandle="goCarSellNotice"></cell>

            <div class="subject">
                <div class="subject__title">标的物介绍</div>
                <div class="subject__item">
                    <div class="subject__itemleft">车辆品牌：</div> <div class="subject__itemright">{{ d.vehicleBrand }}</div>
                </div>
                <div class="subject__item">
                    <div class="subject__itemleft">车辆型号：</div> <div class="subject__itemright">{{ d.carModel }}</div>
                </div>
                <div class="subject__item">
                    <div class="subject__itemleft">车架号：</div> <div class="subject__itemright">{{ d.frameNumber }}</div>
                </div>

                <div class="subject__item">
                   <div class="leftitem">
                       <div class="leftitem__left">车身颜色：</div> <div class="leftitem__right">{{ d.carColour }}</div>
                   </div>
                   <div class="rightitem">
                       <div class="rightitem__left">排量：</div> <div class="rightitem__right">{{ d.displacement  }}</div>
                   </div>
               </div>

               <div class="subject__item">
                   <div class="leftitem">
                       <div class="leftitem__left">汽车产地：</div> <div class="leftitem__right">{{ d.carproduction }}</div>
                   </div>
                   <div class="rightitem">
                       <div class="rightitem__left">车辆属地：</div> <div class="rightitem__right">{{ d.vehicleTerritory }}</div>
                   </div>
               </div>

               <div class="subject__item">
                   <div class="leftitem">
                       <div class="leftitem__left">车显里程：</div> <div class="leftitem__right">{{ d.mileage }} km </div>
                   </div>
                   <div class="rightitem">
                       <div class="rightitem__left">发动机号：</div> <div class="rightitem__right">{{ d.engineNumber  }}</div>
                   </div>
               </div>

               <div class="subject__item">
                   <div class="leftitem">
                       <div class="leftitem__left">保险到期日：</div> <div class="leftitem__right">{{ d.insuranceDate }}</div>
                   </div>
                   <div class="rightitem">
                       <div class="rightitem__left">使用性质：</div> <div class="rightitem__right">{{ d.useProperty }}</div>
                   </div>
               </div>

               <div class="subject__item">
                   <div class="leftitem">
                       <div class="leftitem__left">保险到期日：</div> <div class="leftitem__right">{{ d.insuranceDate }}</div>
                   </div>
                   <div class="rightitem">
                       <div class="rightitem__left">交易方式：</div> <div class="rightitem__right">{{ d.transactionMode }}</div>
                   </div>
               </div>

               <div class="subject__item">
                   <div class="subject__itemleft">首次登记年月：</div>
                   <div class="subject__itemright">{{ d.registerDate }}</div>
               </div>

               <div class="subject__item">
                   <div class="subject__itemleft">车辆抵押状态：</div>
                   <div class="subject__itemright">{{ d.mortgageState }}</div>
               </div>


               <div class="carRule__rows mt38">
                   <div class="carRule__rowsleft">交易税费：</div>
                   <div class="carRule__rowsright">{{ d.taxation }}</div>
               </div>
               <div class="carRule__rows">
                   <div class="carRule__rowsleft">车辆位置：</div>
                   <div class="carRule__rowsright">{{ d.position  }}</div>
               </div>

               <div class="carRule__rows">
                   <div class="carRule__rowsleft">提供文件：</div>
                   <div class="carRule__rowsright">{{ d.file  }}</div>
               </div>

               <div class="carRule__rows">
                   <div class="carRule__rowsleft">随车工具：</div>
                   <div class="carRule__rowsright">{{ d.tools  }}</div>
               </div>



               <div class="subject__last">
                   <div class="subject__lasttitle">违章未处理记录：</div>
                   <div class="subject__lasttext">{{ d.illegal }}</div>
               </div>

               <div class="subject__last">
                   <div class="subject__lasttitle">{{ d.remarks ? '备注：' : '' }}</div>
                   <div class="subject__lasttext">{{ d.remarks }}</div>
               </div>
            </div>

            <div class="buyneedknow">
                    <div class="buyneedknow__title buyneedknow--bold "> 竞买公告 </div>
                    <div>
                        <p class="buyneedknow--indent">竞拍前请务必遵照《竞买公告》的要求，进行实地看样、调查标的物信息（如过户要求、 违章情况等）、 了解竞买资质、 支付方式等内容。</p>
                        <p><span class="buyneedknow--bold">我方将于 {{ d.starBidTime }} 至 {{ d.endBidTime }} 止进行公开竞买活动，</span> 现公告如下：</p>
                        <p class="buyneedknow--indent">一、 竞买标的： 车牌号： {{ d.licensePlateNumber }}； 车辆型号： {{ d.carModel }}； 车辆识别代号： {{ d.frameNumber }}； 发动机号： {{ d.engineNumber  }}； 初次登记日期：{{ d.registerDate   }}； 行驶总里程： {{ d.mileage }}KM。</p>
                        <p>竞买起始价： {{ d.startPrice }}万元， 增价幅度{{ d.priceincrease }}元（或整倍数）。</p>
                        <p class="buyneedknow--indent">二、 竞买人条件： 凡具备完全民事行为能力的公民、 法人和其他组织均可参加竞买。</p>
                        <p class="buyneedknow--indent">竞买人应当具备完全民事行为能力， 法律、 行政法规和司法解释对买受人资格或者条件有特殊规定的， 竞买人应当具备规定的资格或者条件。 如为限购地区车辆请自行确定是否具有相关资格。</p>
                        <p class="buyneedknow--indent">因不符合条件参加竞买的， 由竞买人自行承担相应的责任。</p>
                        <p class="buyneedknow--indent"><span class="buyneedknow--bold">三、 咨询、 集中展示看样的时间与方式： 自 {{ d.conStartDate }} 起至 {{ d.conEndDate }} 止接受咨询（ 双休日、 节假日除外）。 有意看样者请于{{ d.vieEndDate }}前到达以下地点进行看样。</span></p>
                        <p>集中看样地点：{{ d.vie }}</p>
                        <p class="buyneedknow--indent">四、 标的物以实物现状为准， 我方不承担竞买标的瑕疵保证。 特别提醒， 有意者请亲自实地看样， 未看样的竞买人视为对本标的实物现状的确认， 由竞买人自行承担相应责任。</p>
                        <p class="buyneedknow--indent">五、 竞拍前请与相关人员确认标的物的情况， 参与竞拍行为视为对标的物的确认， 由竞买人自行承担相应责任。</p>
                        <p class="buyneedknow--indent"> <span class="buyneedknow--bold">六、 本标的物竞得者应将竞买款在 {{ d.paymentEndTime }} 前缴入我方指定账户（户名：{{ d.account }}  开户银行：{{ d.bank }}  账号： {{ d.cardNo }}）。</span></p>
                        <p class="buyneedknow--indent">七、 竞买成交买受人付清全部竞买价款后， 凭相关证件自行至标的物所在地接收车辆， 过户手续及风险请竞买人在竞买前自行到相关职能部门咨询确认， 过户费用由买受人自行承担。</p>
                        <p class="buyneedknow--indent">竞买人在竞价前请务必再仔细阅读我方发布的的竞价须知。</p>
                        <p> 标的物详情咨询电话：{{ d.telephone }} <br> 联系地址： {{ d.contact }} </p>
                        <p class="buyneedknow--right">X年X月X日</p>
                    </div>
            </div>
            
            <div class="btnblock">
                <button class="btn btn--primary" @click="go">我 要 竞 买</button>
            </div>
        </div>
    </div>
</template>

<script>
  import cell from '@components/xcell.vue'
  import swipe from '@components/swipe/swipe.vue'
  import swipeitem from '@components/swipe/swipe-item.vue'
  import Toast from '@components/toast/index.js'

export default {
  name: 'CarSellInfo',
  data () {
    return {
        isCash: false,
        d: this.$store.state.CarInfoData.CarInfoData.data,
        TopAmount: '', // 当前最高价，需要读取API来获取的。TODO: 那么默认应该填什么呢？
        getMaxTimer: null
    }
  },
  components: {
    cell,
    swipe,
    swipeitem
  },
  methods: {
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
        console.log(this.$route.params.id, this.$store.state.phone)
        this.carapi.selectBiddersPage({
              priceID: this.$route.params.id,
              telephone: this.$store.state.phone
          }).then(_=>{
            if ( _.returnCode == 0 ) {
                // 如果数组为空，说明用户没有交保证金

                // TODO 估计弄反。
                if (_.data.length == 0) {
                  // 缴纳保证金：是，跳转竞买
                  this.$router.push('/carsellbuy')
                } else {
                   // 缴纳保证金：否，跳转报名
                   this.$router.push('/carsellapply')
                }
            } else {
                Toast("获取拍卖状态失败：" + _.msg)
            }
        })
    },
    goCarSellNeedKnow () {
      this.$router.push('/CarSellNeedKnow')
    },
    goCarSellNotice () {
      this.$router.push('/CarSellNotice')
    },
    getImg (url) {
      return 'http://xiaodaioa.oss-cn-beijing.aliyuncs.com/' + url
    }    
  }, 
  beforeRouteLeave  (to, from, next) {
      window.clearInterval(this.getMaxTimer);
      next();
  },
  beforeMount () {
      if (!this.$store.state.CarInfoData.CarInfoData.data) {
         return this.$router.push('/carsell')
      }

      this.carapi.selectMaxOfferPriceByAuctionId({
          priceID: this.d.priceID
      }).then(_=>{
          if (_.returnCode == 0) {
              this.TopAmount = _.data.offerAmount

              // 不断的获取最高价
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


.CarSellInfo {
    height: 100%;
    position: relative;
    overflow-x: hidden;
}

.CarSellInfo__banner {
    height: pxToRem(750px);
    position: relative;

    .CarSellInfo__image {
        width: 100%;
        height: 100%;
    }
}


.CarSellInfo__navbar {
    @include flex(between, center);
    background-color: #3fc121;
    color:#fff;
    height: pxToRem(76px);
    padding: 0 pxToRem(30px);
    font-size: pxToRem(32px);


    .CarSellInfo__navbarleft {
        width: pxToRem(200px);
        height: pxToRem(54px);
        background-color: #35a51b;
        border-radius: pxToRem(8px);
        text-align: center;
        line-height: pxToRem(54px);
    }

    .CarSellInfo__navbarright {
        
    }
}


.carMain {
    @include flex(false, false, column)
    padding: pxToRem(30px);
    background: #fff;


    .carMain__type {
        color: #222222;
        font-size: pxToRem(36px);
        margin-bottom: pxToRem(20px);
    }

    .carMain__id {
        color: #999999;
        font-size: pxToRem(28px);
        margin-bottom: pxToRem(20px);
    }

    .carMain__start {
      font-size: pxToRem(28px);
      color: #222222;
      margin-bottom: pxToRem(32px);
    }

    .carMain__ensure {
      margin-right: pxToRem(126px);
    }

    .carMain__maxtext {
      font-size: pxToRem(28px);
      color: #222222;
      margin-bottom: pxToRem(21px);
    }

    .carMain__maxmoney {
      color: #df2323;
      font-size: pxToRem(48px);
      margin-bottom: pxToRem(30px);
    }

    .carMain__price {
        @include flex(b);
        font-size: pxToRem(32px);
        margin-bottom: pxToRem(20px);
    }

    .carMain__pricetext {
        color: #222222;
    }

    .carMain__pricetext--red {
        color: #df2323;
    }

    .carMain__time {
        color: #999999;
        font-size: pxToRem(28px);
    }

    .carMain__line {
        @include line(65px, #ccc)
    }

    .carMain__money {
        color: #999999;
        font-size: pxToRem(28px);
    }

    .carMain__moneytop {
        @include flex(s);
        margin-bottom: pxToRem(20px);
    }

    .carMain__money--red {
        color: #df2323;
        margin-right: pxToRem(35px);
    }
}

.carRule {
    background: #fff;
    margin: pxToRem(10px) 0;
    padding: pxToRem(40px) pxToRem(30px);
}

.carRule__rows {
    @include flex(start, center);
    color: #222222;
    font-size: pxToRem(28px);

    .carRule__rowsleft {
        word-break: keep-all;
        color: #666666;
    }

    .carRule__rowsright {
        margin-left: pxToRem(10px);
    }

    & + & {
        margin-top: pxToRem(50px);
    }
}

.subject {
    color: #222222;
    background: #fff;
    margin-top: pxToRem(10px);
    padding: pxToRem(30px);
    font-size: pxToRem(28px);

    .subject__title {
        font-size: pxToRem(32px);
        padding-bottom: pxToRem(30px);
    }

    .subject__item {
        @include flex(s);
        margin-top: pxToRem(38px);
    }

    .subject__itemleft {
        width: pxToRem(205px);
        color: #666666;
    }

    .subject__itemright {
        
    }

    .leftitem {
        @include flex(s);
    }

    .leftitem__left {
        width: pxToRem(205px);
        color: #666666;
    }

    .leftitem__right {
        width: pxToRem(215px);
    }

    .rightitem {
        @include flex(s);
    }

    .rightitem__left {
        word-break: keep-all;
        width: pxToRem(140px);
        color: #666666;
    }

    .rightitem__right {
        padding-left: pxToRem(10px);
    }
    
    .subject__last {
        margin-top: pxToRem(48px);
    }

    .subject__lasttitle {
        color: #666666;
        margin-bottom: pxToRem(20px);
    }

    .subject__lasttext {
        
    }
}

.buyneedknow {
    font-size: pxToRem(28px);
    margin-top: pxToRem(10px);
    padding: 0 pxToRem(30px);
    background: #fff;
    padding-bottom: pxToRem(5px);

    p {
        margin: pxToRem(45px) auto;
        line-height: pxToRem(50px);
    }

    .buyneedknow__title {
        padding: pxToRem(45px) 0 pxToRem(10px);
        text-align: center;
        font-size: pxToRem(32px);
    }

    .buyneedknow--bold {
       font-weight: bold;
    }

    .buyneedknow--indent {
        text-indent: pxToRem(50px);
        word-break: break-all;
    }

    .buyneedknow--right {
        text-align: right;
    }
}

.btnblock {
    @include flex(center);
    margin: pxToRem(80px) 0;

    .btn {
      margin: auto;
      width: pxToRem(666px);
      height: pxToRem(76px);
      border-radius: pxToRem(6px);
      text-align: center;
      line-height: pxToRem(76px);
      color: #fff;
      font-size: pxToRem(32px);
      position: fixed;
      bottom: pxToRem(50px);
      box-shadow: 0 0 pxToRem(10px) pxToRem(5px) rgba(128, 126, 126, 0.3);
      z-index: 999;
      border: 0;
    }

    .btn--primary {
        background-color: #0e6ae7;
    }

    .btn--disable {
        background-color: #cccccc;
    }
}

.mt38 {
    margin-top: pxToRem(38px);
}
</style>
