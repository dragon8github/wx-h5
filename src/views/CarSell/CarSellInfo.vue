<template>
    <div class="CarSellInfo" v-if="d">
            <div class="CarSellInfo__banner">
                <swipe :auto="4000"> 
                    <swipeitem class="slide1" v-for="(img, index) in d.docs" :key="index" > 
                        <img :src="getImg(img.docUrl)" class="CarSellInfo__image" /> 
                    </swipeitem>
                </swipe>
            </div>

            <div class="CarSellInfo__navbar" :class="{'an-ing': !d.isFinish}" v-if="d.priceCount !== 0">
                 <div class="CarSellInfo__navbarleft">{{ d.isFinish ? '拍卖已完成' : '拍卖进行中' }} </div>
                 <div class="CarSellInfo__navbarright" v-if="!d.isFinish">{{ d.etartPriceDate }} 截止</div>
                 <div class="CarSellInfo__navbarright" v-if="d.isFinish">交易价：¥265,000</div>
            </div>

            <div class="carMain">
                <div class="carMain__type">{{ d.vehicleBrand + ' ' + d.carModel }}</div>
                <div class="carMain__id">编号：{{ d.businessId }}</div>
                <div class="carMain__id">车辆属地：{{ d.city }}</div>
                <div class="carMain__start">最低价：<span :style="lowestStyle">¥ {{ d.startPrice }}</span></div>
                <div class="carMain__start" v-if="d.personNum" style="color:#DF2323;">已有{{d.personNum ? d.personNum:'66'}}人报价</div>
                <!-- <div class="carMain__maxtext">当前最高出价：</div>
                <div class="carMain__maxmoney">¥ {{ TopAmount  }}</div> -->
                <div class="carMain__time"> 活动时间：{{ date2date(d.startPriceDate) }} - {{ date2date(d.etartPriceDate) }} </div>
                <!-- <div class="carMain__line"></div> -->
                <!-- <div class="carMain__money">
                    <div class="carMain__moneytop">
                        <div>保证金：¥  {{ d.bond }} </div>
                        <div>加价幅度：¥ {{ d.priceincrease }}</div>
                    </div>
                    <div class="carMain__moneytop">
                        <div>评估价：¥  {{ d.lastEvaluationAmount }} </div>
                        <div>{{ d.delayPeriod ? '延时周期：' + d.delayPeriod + '分钟' : '' }}</div>
                    </div>
                </div> -->
            </div>

            <!-- <div class="carRule">
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
            </div> -->
            

            <!-- <div class="protocol">
                <div class="protocol__item" @click="goCarSellNotice">
                    <div class="protocol__item--image"><img src="~@assets/ad.png" /></div>
                    <div class="protocol__item--text">竞买公告</div>
                </div>
                <div class="protocol__line"></div>
                <div class="protocol__item" @click="goCarSellNeedKnow">
                    <div class="protocol__item--image"><img src="~@assets/need.png" /></div>
                    <div class="protocol__item--text">竞买须知</div>
                </div>
            </div> -->

          <!--   <cell title="《 竞买公告 》"  is-link :clickHandle="goCarSellNotice" :style="{fontWeight: 'bold'}"></cell>
            <cell title="《 竞买须知 》"  is-link :clickHandle="goCarSellNeedKnow" :style="{fontWeight: 'bold'}"></cell> -->
            <div class="subject__title">车辆介绍</div>
            <div class="subject">
                <div class="subject__item">
                    <div class="subject__itemleft">最低报价：</div> <div class="subject__itemright">{{ d.startPrice ? d.startPrice:'232221' }}元</div>
                </div>
                <div class="subject__item">
                    <div class="subject__itemleft">车辆品牌：</div> <div class="subject__itemright">{{ d.vehicleBrand }}</div>
                </div>
                <div class="subject__item">
                    <div class="subject__itemleft">车辆型号：</div> <div class="subject__itemright">{{ d.carModel }}</div>
                </div>
                <div class="subject__item">
                    <!-- <div class="subject__itemleft">车架号：</div> <div class="subject__itemright">{{ d.frameNumber }}</div> -->
                </div>

                <div class="subject__item">
                   <div class="leftitem">
                       <div class="leftitem__left">车身颜色：</div> <div class="leftitem__right">{{ d.carColour }}</div>
                   </div>
                   <div class="rightitem">
                       <div class="rightitem__left">排量：</div> <div class="rightitem__right">{{ d.displacement  }}</div>
                   </div>
               </div>

               <div class="subject__item" v-if="!d.isFinish || d.type == '1'">
                   <div class="leftitem">
                       <div class="leftitem__left">汽车产地：</div> <div class="leftitem__right">{{ d.carproduction }}</div>
                   </div>
                   <div class="rightitem">
                       <div class="rightitem__left">车辆属地：</div> <div class="rightitem__right">{{ d.vehicleTerritory }}</div>
                   </div>
               </div>

               <div class="subject__item" v-if="!d.isFinish || d.type == '1'">
                   <div class="leftitem">
                       <div class="leftitem__left">车显里程：</div> <div class="leftitem__right">{{ d.mileage }} km </div>
                   </div>
                   <div class="rightitem">
                       <!-- <div class="rightitem__left">发动机号：</div> <div class="rightitem__right">{{ d.engineNumber  }}</div> -->
                   </div>
               </div>

               <div class="subject__item" v-if="!d.isFinish || d.type == '1'">
                   <div class="leftitem">
                       <div class="leftitem__left">保险到期日：</div> <div class="leftitem__right">{{ date2date(d.insuranceDate) }}</div>
                   </div>
                   <div class="rightitem">
                       <div class="rightitem__left">使用性质：</div> <div class="rightitem__right">{{ d.useProperty }}</div>
                   </div>
               </div>

               <div class="subject__item" v-if="!d.isFinish || d.type == '1'">
                   <div class="leftitem">
                       <div class="leftitem__left">年检到期日：</div> <div class="leftitem__right">{{ d.inspectionDate ? d.inspectionDate.replace(/\-/g, "/") : ''}}</div>
                   </div>
                   <div class="rightitem">
                       <div class="rightitem__left">交易方式：</div> <div class="rightitem__right">{{ d.transactionMode }}</div>
                   </div>
               </div>

               <div class="subject__item" v-if="!d.isFinish || d.type == '1'">
                   <div class="subject__itemleft">首次登记年月：</div>
                   <div class="subject__itemright">{{ date2date(d.registerDate) }}</div>
               </div>

               <div class="subject__item" v-if="!d.isFinish || d.type == '1'">
                   <div class="subject__itemleft">车辆抵押状态：</div>
                   <div class="subject__itemright">{{ d.mortgageState }}</div>
               </div>


               <div class="carRule__rows mt38" v-if="!d.isFinish || d.type == '1'">
                   <div class="carRule__rowsleft">交易税费：</div>
                   <div class="carRule__rowsright">{{ d.taxation }}</div>
               </div>
               <div class="carRule__rows" v-if="!d.isFinish || d.type == '1'">
                   <div class="carRule__rowsleft">车辆位置：</div>
                   <div class="carRule__rowsright">{{ d.position  }}</div>
               </div>

               <div class="carRule__rows" v-if="!d.isFinish || d.type == '1'">
                   <div class="carRule__rowsleft">提供文件：</div>
                   <div class="carRule__rowsright">{{ d.file  }}</div>
               </div>

               <div class="carRule__rows" v-if="!d.isFinish || d.type == '1'">
                   <div class="carRule__rowsleft">随车工具：</div>
                   <div class="carRule__rowsright">{{ d.tools  }}</div>
               </div>



               <div class="subject__last" v-if="!d.isFinish || d.type == '1'">
                   <div class="subject__lasttitle">违章未处理记录：</div>
                   <div class="subject__lasttext">{{ d.illegal }}</div>
               </div>

               <div class="subject__last" v-if="!d.isFinish || d.type == '1'">
                   <div class="subject__lasttitle">{{ d.remarks ? '备注：' : '' }}</div>
                   <div class="subject__lasttext">{{ d.remarks }}</div>
               </div>
            </div>

            <div class="buyneedknow" v-if="!d.isFinish || d.type == '1'">
                    <div class="buyneedknow__title buyneedknow--bold "> 车辆销售公告 </div>
                    <div>
                        <p class="buyneedknow--indent">现有车辆销售信息，公告如下：</p>
                        <!-- <p><span class="buyneedknow--bold">我方将于 {{ d.startPriceDate }} 至 {{ d.etartPriceDate }} 止进行公开竞买活动，</span> 现公告如下：</p> -->
                        <!--<p class="buyneedknow--indent">一、 活动时间：  车牌号： {{ d.licensePlateNumber }}； 车辆识别代号： {{ d.frameNumber }}； 发动机号： {{ d.engineNumber  }}； 初次登记日期：{{ date2date(d.registerDate)   }}； 行驶总里程： {{ d.mileage }}KM。</p>-->
                        <p class="buyneedknow--indent">一、 活动时间：<span class="bi-time">{{ d.conStartDate }}至{{ d.conEndDate }}时止</span> </p>
                        <!-- <p>竞买起始价： {{ d.startPrice }}元， 增价幅度{{ d.priceincrease }}元（或整倍数）。</p> -->
                        <p class="buyneedknow--indent">二、参与人条件：<br/>凡具备完全民事行为能力的公民、法人和其他组织均可参加。不符合条件参加购买的，买受人自行承担相应的法律责任。</p>
                        <p class="buyneedknow--indent">三、参与渠道：参与人可根据意向报价，实际报价不低于最低报价。交易前请与相关人员确认标的物的情况，交易视为对标的物的确认，由参与人自行承担相应责任。</p>
                        <p class="buyneedknow--indent">四、有意向的参与人可在活动期间在鸿特金服APP/微信公众号等（下简称“鸿特金服平台”）平台上进行报价。最终交易对象以出售方确认为准，交易信息将在活动结束后五个工作日内在鸿特金服APP/微信公众号予以公示。</p>
                        <!-- <p class="buyneedknow--indent"><span class="buyneedknow--bold">三、 咨询、 集中展示看样的时间与方式： 自 {{ d.conStartDate }} 起至 {{ d.conEndDate }} 止接受咨询（ 双休日、 节假日除外）。 有意看样者请于{{ d.vieEndDate }}前到达以下地点进行看样。</span></p> -->
                        <!-- <p>集中看样地点：{{ d.vie }}</p>
                        <p class="buyneedknow--indent">四、 标的物以实物现状为准， 我方不承担竞买标的瑕疵保证。 特别提醒， 有意者请亲自实地看样， 未看样的竞买人视为对本标的实物现状的确认， 由竞买人自行承担相应责任。</p>
                        <p class="buyneedknow--indent">五、 竞拍前请与相关人员确认标的物的情况， 参与竞拍行为视为对标的物的确认， 由竞买人自行承担相应责任。</p>
                        <p class="buyneedknow--indent"> <span class="buyneedknow--bold">六、 本标的物竞得者应将竞买款在 {{ d.starBidTime }} 前缴入我方指定账户（户名：{{ d.account }}  开户银行：{{ d.bank }}  账号： {{ d.cardNo }}）。</span></p>
                        <p class="buyneedknow--indent">七、 竞买成交买受人付清全部竞买价款后， 凭相关证件自行至标的物所在地接收车辆， 过户手续及风险请竞买人在竞买前自行到相关职能部门咨询确认， 过户费用由买受人自行承担。</p>
                        <p class="buyneedknow--indent">竞买人在竞价前请务必再仔细阅读我方发布的的竞价须知。</p> -->
                        <p class="buyneedknow--indent">五、付款方式：买卖双方实地交易。</p>
                        <p class="buyneedknow--indent">六、交付地点：车辆所在地。</p>
                        <p class="buyneedknow--indent">七、相关费用说明：过户手续费、税费等相关费用均由买受人承担。过户手续及风险请报价人在报价前自行到相关职能部门咨询确认。</p>
                        <p class="buyneedknow--indent">八、参与人付清全部价款后的三个工作日内可领取证件办理相关过户手续。买受人付款后应及时提取标的物，并办理交接手续，逾期不办理的，买受人应支付由此产生的费用，并承担本标的物可能发生的损毁、灭失等后果。</p>
                        <p class="buyneedknow--indent">九、本次活动计价货币为人民币，购买时的起始价、成交价均不含买受人在购买标的物交割、过户时所发生的全部费用和税费。</p>
                        <p class="buyneedknow--indent">十、本公告其他未尽事宜，请向相关工作人员咨询。</p>
                        <p class="buyneedknow--indent">十一、备注：详情咨询电话：13827288271 陈先生</p>
                        <!-- <p> 标的物详情咨询电话：{{ d.telephone }} <br> 联系地址： {{ d.contact }} </p> 
                        <p class="buyneedknow--right">{{ date2date(d.auditTime) }}</p>-->
                    </div>
            </div>
            
            <div class="btnblock">
                <button class="btn btn--primary" @click="go" v-if="d.priceCount !== 3 || !d.isFinish">我要报价</button>
            </div>
        </div>
    </div>
</template>

<script>
    import cell from '@/components/xcell.vue'
    import swipe from '@/components/swipe/swipe.vue'
    import swipeitem from '@/components/swipe/swipe-item.vue'
    import Toast from '@/components/toast/index.js'
    // messagebox 组件
    import msg from '@/components/messagebox/messagebox.js'
    export default {
    name: 'CarSellInfo',
    data () {
        return {
            isCash: false,
            d: this.$store.state.CarInfoData.CarInfoData,
            TopAmount: '', // 当前最高价，需要读取API来获取的。TODO: 那么默认应该填什么呢？
            getMaxTimer: 0,
        }
    },
    computed:{
        lowestStyle() {
            if(this.d.priceCount == 0) {
                return {
                    color:'#DF2323',
                    fontSize:'.64rem'
                }
            }
        }
    },
    components: {
        cell,
        swipe,
        swipeitem
    },
    methods: {
        getMAX () {
        // this.getMaxTimer = window.setInterval(_=>{
        //     this.carapi.selectMaxOfferPriceByAuctionId({
        //         priceID: this.d.priceID
        //     }, true).then(_=>{
        //         if (_.returnCode == 0) {
        //             if (this.TopAmount != _.data.offerAmount) {
        //                 Toast(`当前最高出价已更新为：￥ ${_.data.offerAmount}` )
        //                 this.TopAmount = _.data.offerAmount
        //             }
        //         }
        //     })
        // }, 2000);
        },
        go () {
            // 获取开始时间的时间戳
            // var starttime = new Date(this.d.starBidTime.replace(/\-/g, "/")).valueOf()
            // var nowtime = new Date().valueOf()
            // var endtime = new Date(this.d.endBidTime.replace(/\-/g, "/")).valueOf()
            // if (nowtime < starttime) {
            //     Toast('还未到活动时间，请耐心等待！')
            // } else {
            //     //是否有登录
            //     if(!this.$store.getters.AppData.isLogin) {
            //         //跳转至原生登录
            //         let bridge = this.Bridge
            //         // bridge 的初始化完成事件.必须在此事件之后再开始页面的生命周期，否则期间使用bridge 很可能由于未初始化完成而找不到插件函数报错
            //         bridge.deviceReady(null, () => {
            //             // 获取设备信息API
            //             bridge.exec('Login', () => {
            //                 // 登录成功之后返回
            //                 console.log('success')
            //                 this.$router.push('/carsellapply')
            //             }, () => {
            //                 console.log('err')
            //             }, {
            //                 'key': 'APP_DATA'
            //             })
            //         })
            //     }
            // }
            
            this.$router.push('/carsellapply')

            // this.carapi.selectBiddersPage({
            //     priceID: this.$route.params.id,
            //     telephone: this.$store.state.phone
            // }).then(_=>{
            //     if ( _.returnCode == 0 ) {
            //         // 返回的一定是一个数组，该数组要么为空，要么只有一个值
            //         if (Object.prototype.toString.call(_.data) == '[object Array]') {
            //         // 如果数组为空，说明用户没有交保证金
            //         if (_.data.length == 0) {
            //             // 缴纳保证金：否，跳转报名
            //             this.$router.push('/carsellapply')
            //         } else {
            //             // 如果数组不为空，那么判断第一条数据（只会给我一条数据的），然后判断isPayDeposit是否为true，如果为true说明已经交钱了。
            //             if ( _.data[0].isPayDeposit && _.data[0].isPayDeposit == true ) {
            //             // 缴纳保证金：是，跳转竞买
            //             this.$router.push('/carsellbuy')

            //             // 报名了但没交钱
            //             } else {

            //             // 获取开始时间的时间戳
            //             var starttime = new Date(this.d.starBidTime.replace(/\-/g, "/")).valueOf()
            //             var nowtime = new Date().valueOf()
            //             var endtime = new Date(this.d.endBidTime.replace(/\-/g, "/")).valueOf()

            //             // 说明竞买未开始
            //             if (nowtime < starttime) {
            //                 msg.alert('已报名成功，请及时交保证金，否则无法参与竞拍', '警告').then(() => {
            //                 return false
            //                 })
            //             // 说明竞价
            //             } else if (nowtime >= starttime && nowtime <= endtime) {
            //                 msg.alert('竞拍已开始，没有交保证金，无法参与竞拍!', '警告').then(() => {
            //                 return false
            //                 })
            //             } else if (nowtime > endtime) {
            //                 msg.alert('竞拍已结束', '警告').then(() => {
            //                 return false
            //                 })
            //             }

            //             }
            //         }
            //         }
            //     } else {
            //         Toast("获取拍卖状态失败：" + _.msg)
            //     }
            // })
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
        //window.clearInterval(this.getMaxTimer);
        next();
    },
    beforeMount () {
        if (!this.$store.state.CarInfoData.CarInfoData.priceID) {
            return this.$router.push('/carsell')
        }

        // this.carapi.selectMaxOfferPriceByAuctionId({
        //     priceID: this.d.priceID
        // }).then(_=>{
        //     if (_.returnCode == 0) {
        //         this.TopAmount = _.data.offerAmount
        //         // 不断的获取最高价
        //         this.getMAX();
        //     } else {
        //         Toast(_.msg)
        //     }
        // })
    }
    }
</script>

<style lang="scss" scoped>
@import "../../sass/_variables";
@import "../../sass/_func";


.CarSellInfo {
    height: 100%;
    position: relative;
    overflow-x: hidden;
}

.CarSellInfo__banner {
    height: 7.5rem;
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
.CarSellInfo__navbar.an-ing{
    background: #F59A31;
    .CarSellInfo__navbarleft{
        background: #E48805;
    }
}

.carMain {
    @include flex(false, false, column);
    padding: pxToRem(30px);
    background: $bg-white;


    .carMain__type {
        color: $font-text;
        font-size: pxToRem(36px);
        margin-bottom: pxToRem(20px);
    }

    .carMain__id {
        color: $tip-light-gray;
        font-size: pxToRem(28px);
        margin-bottom: pxToRem(20px);
    }

    .carMain__start {
      font-size: pxToRem(28px);
      color: $font-text;
      margin-bottom: pxToRem(32px);
    }

    .carMain__ensure {
      margin-right: pxToRem(126px);
    }

    .carMain__maxtext {
      font-size: pxToRem(28px);
      color: $font-text;
      margin-bottom: pxToRem(21px);
    }

    .carMain__maxmoney {
      color: $err-status;
      font-size: pxToRem(48px);
      margin-bottom: pxToRem(30px);
    }

    .carMain__price {
        @include flex(b);
        font-size: pxToRem(32px);
        margin-bottom: pxToRem(20px);
    }

    .carMain__pricetext {
        color: $font-text;
    }

    .carMain__pricetext--red {
        color: $err-status;
    }

    .carMain__time {
        color: $tip-light-gray;
        font-size: pxToRem(28px);
    }

    .carMain__line {
        @include line(65px, #ccc)
    }

    .carMain__money {
        color: $tip-light-gray;
        font-size: pxToRem(28px);
    }

    .carMain__moneytop {
        @include flex(s);
        margin-bottom: pxToRem(20px);

        div {
          width: 45%;
        }
    }

    .carMain__money--red {
        color: $err-status;
        margin-right: pxToRem(35px);
    }
}

.carRule {
    background: $bg-white;
    margin: pxToRem(10px) 0;
    padding: pxToRem(40px) pxToRem(30px);
}

.carRule__rows {
    @include flex(start, center);
    color: $font-text;
    font-size: pxToRem(28px);

    .carRule__rowsleft {
        word-break: keep-all;
        color: $font-txt-light;
    }

    .carRule__rowsright {
        margin-left: pxToRem(10px);
    }

    & + & {
        margin-top: pxToRem(50px);
    }
}
.subject__title {
    padding:.4rem;
    font-size: pxToRem(32px);
    border-bottom: pxToRem(1px) solid $border-color;
    background: $bg-white;
}
.subject {
    color: $font-text;
    background: $bg-white;
    padding: pxToRem(30px);
    font-size: pxToRem(28px);

    

    .subject__item {
        @include flex(s);
        margin-top: pxToRem(30px);
        line-height: 1.2;
    }

    .subject__itemleft {
        width: pxToRem(205px);
        color: $font-txt-light;
    }

    .subject__itemright {
        
    }

    .leftitem {
        @include flex(s);
    }

    .leftitem__left {
        width: pxToRem(205px);
        color: $font-txt-light;
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
        color: $font-txt-light;
    }

    .rightitem__right {
        padding-left: pxToRem(10px);
    }
    
    .subject__last {
        margin-top: pxToRem(48px);
    }

    .subject__lasttitle {
        color: $font-txt-light;
        margin-bottom: pxToRem(20px);
    }

    .subject__lasttext {
        
    }
}

.buyneedknow {
    font-size: pxToRem(28px);
    margin-top: pxToRem(10px);
    padding: 0 pxToRem(30px);
    background: $bg-white;
    padding-bottom: 1.5rem;

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
        // text-indent: pxToRem(50px);
        // word-break: break-all;
        font-size: .373333rem;
        color:$font-text;
        .bi-time {
            color: $err-status;
        }
    }

    .buyneedknow--right {
        text-align: right;
    }
}

.btnblock {
    @include flex(center);
    position: fixed;
    width: 100%;
    bottom: pxToRem(50px);
    z-index: 999;

    .btn {
      margin: auto;
      width: pxToRem(666px);
      height: pxToRem(76px);
      border-radius: pxToRem(6px);
      text-align: center;
      line-height: pxToRem(76px);
      color: $font-white;
      font-size: pxToRem(32px);
      box-shadow: 0 0 pxToRem(10px) pxToRem(5px) rgba(128, 126, 126, 0.3);
      z-index: 999;
      border: 0;
    }

    .btn--primary {
        background-color: $bg-primary;
    }

    .btn--disable {
        background-color: #cccccc;
    }
}

.mt38 {
    margin-top: pxToRem(38px);
}

.protocol {
  @include flex(a, c);
  height: pxToRem(178px);
  background: $bg-white;
  margin: pxToRem(10px) auto;

  .protocol__item {
      text-align: center;
      width: pxToRem(375px);
  }

  .protocol__line {
    @include line(140px, #e5e5e5, c);
  }

  .protocol__item--image {
      text-align: center;

      img {
        @include size(76px, 76px);
      }
  }

  .protocol__item--text {
      font-size: pxToRem(32px);
  }
}


</style>
