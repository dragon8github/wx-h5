<template>
    <div class="CarSellInfo">
            <div class="CarSellInfo__banner">
                <swipe :auto="4000"> 
                    <swipeitem class="slide1"><img src='~@assets/carsell/carinfodemo.png' class="CarSellInfo__image" /> </swipeitem> 
                    <swipeitem class="slide2"><img src='~@assets/carsell/carinfodemo.png' class="CarSellInfo__image" /> </swipeitem> 
                    <swipeitem class="slide3"><img src='~@assets/carsell/carinfodemo.png' class="CarSellInfo__image" /> </swipeitem>
                </swipe>
            </div>

            <div class="CarSellInfo__navbar">
                <div class="CarSellInfo__navbarleft">拍卖已完成</div>
                <div class="CarSellInfo__navbarright">成交价：¥16,000.00</div>
            </div>

            <div class="carMain">
                <div class="carMain__type">奔驰B级车 B 200 时尚型</div>
                <div class="carMain__id">拍卖编号：HTPM201702281234</div>
                <div class="carMain__price">
                    <div class="carMain__pricetext">起拍价：<span class="carMain__pricetext--red">¥265,000</span></div>
                    <div class="carMain__pricetext">我的竞拍价：<span class="carMain__pricetext--red">¥1265,000</span></div>
                </div>
                <div class="carMain__time"> 拍卖时间：2018/02/23-2018/02/28 </div>
                <div class="carMain__line"></div>
                <div class="carMain__money">
                    <div class="carMain__moneytop">
                        <div>保证金：¥  5,000 <span class="carMain__money--red">（未交）</span></div>
                        <div>加价幅度：¥ 500</div>
                    </div>
                    <div>评估价：¥ 16,000</div>
                </div>
            </div>

            <div class="carRule">
                <div class="carRule__rows">
                    <div class="carRule__rowsleft">交易类型：</div> <div class="carRule__rowsright">债权转让</div>
                </div>
                <div class="carRule__rows">
                    <div class="carRule__rowsleft">取货方式：</div> <div class="carRule__rowsright">门店自提</div>
                </div>
                <div class="carRule__rows">
                    <div class="carRule__rowsleft">支付方式：</div> <div class="carRule__rowsright">竞买成功后，尾款线下支付</div>
                </div>
                <div class="carRule__rows">
                    <div class="carRule__rowsleft">交易类型：</div> <div class="carRule__rowsright">债权转让</div>
                </div>
                <div class="carRule__rows">
                    <div class="carRule__rowsleft">竞价规则：</div> <div class="carRule__rowsright">至少一人报名且出价不低于起拍价，方可成交。</div>
                </div>
                <div class="carRule__rows">
                    <div class="carRule__rowsleft">处置单位：</div> <div class="carRule__rowsright">广东鸿特信息咨询有限公司</div>
                </div>
                <div class="carRule__rows">
                    <div class="carRule__rowsleft">咨询方式：</div> <div class="carRule__rowsright">肖经理 18924195506</div>
                </div>
            </div>
            
            <cell title="竞买公告"  is-link :clickHandle="goCarSellNeedKnow"></cell>
            <cell title="竞买须知"  is-link :clickHandle="goCarSellNotice"></cell>

            <div class="subject">
                <div class="subject__title">标的物介绍</div>
                <div class="subject__item">
                    <div class="subject__itemleft">车辆品牌：</div> <div class="subject__itemright">丰田卡罗拉</div>
                </div>
                <div class="subject__item">
                    <div class="subject__itemleft">车辆型号：</div> <div class="subject__itemright">卡罗拉CAM7150A5</div>
                </div>
                <div class="subject__item">
                    <div class="subject__itemleft">车架号：</div> <div class="subject__itemright">LVRHDFAL7FN389879</div>
                </div>

                <div class="subject__item">
                   <div class="leftitem">
                       <div class="leftitem__left">车身颜色：</div> <div class="leftitem__right">白色</div>
                   </div>
                   <div class="rightitem">
                       <div class="rightitem__left">排量：</div> <div class="rightitem__right">1.5 L</div>
                   </div>
               </div>

               <div class="subject__item">
                   <div class="leftitem">
                       <div class="leftitem__left">汽车产地：</div> <div class="leftitem__right">国产</div>
                   </div>
                   <div class="rightitem">
                       <div class="rightitem__left">车辆属地：</div> <div class="rightitem__right">南昌</div>
                   </div>
               </div>

               <div class="subject__item">
                   <div class="leftitem">
                       <div class="leftitem__left">表显里程：</div> <div class="leftitem__right">154566 km </div>
                   </div>
                   <div class="rightitem">
                       <div class="rightitem__left">发动机号：</div> <div class="rightitem__right">3156626</div>
                   </div>
               </div>

               <div class="subject__item">
                   <div class="leftitem">
                       <div class="leftitem__left">保险到期日：</div> <div class="leftitem__right">2017.05.15</div>
                   </div>
                   <div class="rightitem">
                       <div class="rightitem__left">使用性质：</div> <div class="rightitem__right">客运</div>
                   </div>
               </div>

               <div class="subject__item">
                   <div class="leftitem">
                       <div class="leftitem__left">保险到期日：</div> <div class="leftitem__right">2017.05.15</div>
                   </div>
                   <div class="rightitem">
                       <div class="rightitem__left">交易方式：</div> <div class="rightitem__right">债权转让</div>
                   </div>
               </div>

               <div class="subject__item">
                   <div class="subject__itemleft">首次登记年月：</div>
                   <div class="subject__itemright">2017.05.15</div>
               </div>

               <div class="subject__item">
                   <div class="subject__itemleft">车辆抵押状态：</div>
                   <div class="subject__itemright">未抵押</div>
               </div>


               <div class="carRule__rows mt38">
                   <div class="carRule__rowsleft">交易税费：</div>
                   <div class="carRule__rowsright">产品的任何税费均由买受人承担，包括客户等</div>
               </div>
               <div class="carRule__rows">
                   <div class="carRule__rowsleft">车辆位置：</div>
                   <div class="carRule__rowsright">产品的任何税费均由买产品的任何税费均由买产品的任何税费均由买</div>
               </div>

               <div class="carRule__rows">
                   <div class="carRule__rowsleft">提供文件：</div>
                   <div class="carRule__rowsright">产品的任何税费均由买产品的任何税费均由买产品的任何税费均由买</div>
               </div>

               <div class="carRule__rows">
                   <div class="carRule__rowsleft">随车工具：</div>
                   <div class="carRule__rowsright">产品的任何税费均由买产品的任何税费均由买产品的任何税费均由买</div>
               </div>



               <div class="subject__last">
                   <div class="subject__lasttitle">违章未处理记录：</div>
                   <div class="subject__lasttext">产品的任何税费均由买产品的任何税费均由买产品的任何税费均由买产品的任何税费均由买产品的任何税费均由买买产品的任何税费均由买</div>
               </div>

               <div class="subject__last">
                   <div class="subject__lasttitle">备注：</div>
                   <div class="subject__lasttext">产品的任何税费均由买产品的任何税费均由买产品的任何税费均由买产品的任何税费均由买产品的任何税费均由买买产品的任何税费均由买</div>
               </div>
            </div>

            <div class="buyneedknow">
                    <div class="buyneedknow__title buyneedknow--bold "> 竞买公告 </div>
                    <div>
                        <p class="buyneedknow--indent">竞拍前请务必遵照《竞买公告》的要求，进行实地看样、调查标的物信息（如过户要求、 违章情况等）、 了解竞买资质、 支付方式等内容。</p>
                        <p><span class="buyneedknow--bold">我方将于X年X月X日X时至X年X月X日X时止进行公开竞买活动，</span> 现公告如下：</p>
                        <p class="buyneedknow--indent">一、 竞买标的： 车牌号： XXX； 车辆型号： XXX； 车辆识别代号： XXX； 发动机号： XXX； 初次登记日期： X年X月X日； 行驶总里程： XXXKM。</p>
                        <p>竞买起始价： XX万元， 增价幅度XX元（ 或整倍数）。</p>
                        <p class="buyneedknow--indent">二、 竞买人条件： 凡具备完全民事行为能力的公民、 法人和其他组织均可参加竞买。</p>
                        <p class="buyneedknow--indent">竞买人应当具备完全民事行为能力， 法律、 行政法规和司法解释对买受人资格或者条件有特殊规定的， 竞买人应当具备规定的资格或者条件。 如为限购地区车辆请自行确定是否具有相关资格。</p>
                        <p class="buyneedknow--indent">因不符合条件参加竞买的， 由竞买人自行承担相应的责任。</p>
                        <p class="buyneedknow--indent"><span class="buyneedknow--bold">三、 咨询、 集中展示看样的时间与方式： 自X年X月X日起至X年X月X日X时止接受咨询（ 双休日、 节假日除外）。 有意看样者请于XXXX年XX月XX日XX时前到达以下地点进行看样。</span></p>
                        <p>集中看样地点：</p>
                        <p class="buyneedknow--indent">四、 标的物以实物现状为准， 我方不承担竞买标的瑕疵保证。 特别提醒， 有意者请亲自实地看样， 未看样的竞买人视为对本标的实物现状的确认， 由竞买人自行承担相应责任。</p>
                        <p class="buyneedknow--indent">五、 竞拍前请与相关人员确认标的物的情况， 参与竞拍行为视为对标的物的确认， 由竞买人自行承担相应责任。</p>
                        <p class="buyneedknow--indent"> <span class="buyneedknow--bold">六、 本标的物竞得者应将竞买款在X年X月X日X时前缴入我方指定账户(户名： XX开户银行： XX账号： XXX)。</span></p>
                        <p class="buyneedknow--indent">七、 竞买成交买受人付清全部竞买价款后， 凭相关证件自行至标的物所在地接收车辆， 过户手续及风险请竞买人在竞买前自行到相关职能部门咨询确认， 过户费用由买受人自行承担。</p>
                        <p class="buyneedknow--indent">竞买人在竞价前请务必再仔细阅读我方发布的的竞价须知。</p>
                        <p> 标的物详情咨询电话： XXX <br> 联系地址： xxx </p>
                        <p class="buyneedknow--right">X年X月X日</p>
                    </div>
            </div>
            
            <div class="btnblock">
                <button class="btn btn--disable">报名交保证金</button>
            </div>
    </div>
</template>

<script>
  import cell from '@components/xcell.vue'
  import swipe from '@components/swipe/swipe.vue'
  import swipeitem from '@components/swipe/swipe-item.vue'


export default {
  name: 'CarSellInfo',
  data () {
    return {
        
    }
  },
  components: {
    cell,
    swipe,
    swipeitem
  },
  methods: {
    goCarSellNeedKnow () {
      this.$router.push('/CarSellNeedKnow')
    },
    goCarSellNotice () {
      this.$router.push('/CarSellNotice')
    }
  },
  beforeMount () {
      console.log(this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
@import "~@sass/_variables";
@import "~@sass/_func";


.CarSellInfo {
    height: 100%;
    position: relative;
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
    @include flex(start);
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
