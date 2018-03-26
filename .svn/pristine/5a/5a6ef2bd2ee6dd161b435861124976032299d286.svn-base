<template>
    <div class="CarSellNotice">
        <div class="Notice">
                <div class="Notice__title Notice--bold "> 竞买公告 </div>
                <div>
                    <p class="Notice--indent">竞拍前请务必遵照《竞买公告》的要求，进行实地看样、调查标的物信息（如过户要求、 违章情况等）、 了解竞买资质、 支付方式等内容。</p>
                    <p><span class="Notice--bold">我方将于  {{ d.startPriceDate }} 至 {{ d.etartPriceDate }} 止进行公开竞买活动，</span> 现公告如下：</p>
                    <p class="Notice--indent">一、 竞买标的： 车牌号： {{ d.licensePlateNumber }}； 车辆型号：{{ d.carModel }}； 车辆识别代号： {{ d.frameNumber }}； 发动机号： {{ d.engineNumber  }}； 初次登记日期： {{ date2date(d.registerDate)  }}； 行驶总里程： {{ d.mileage }}KM。</p>
                    <p>竞买起始价： {{ d.startPrice }}元， 增价幅度 {{ d.priceincrease }} 元（ 或整倍数）。</p>
                    <p class="Notice--indent">二、 竞买人条件： 凡具备完全民事行为能力的公民、 法人和其他组织均可参加竞买。</p>
                    <p class="Notice--indent">竞买人应当具备完全民事行为能力， 法律、 行政法规和司法解释对买受人资格或者条件有特殊规定的， 竞买人应当具备规定的资格或者条件。 如为限购地区车辆请自行确定是否具有相关资格。</p>
                    <p class="Notice--indent">因不符合条件参加竞买的， 由竞买人自行承担相应的责任。</p>
                    <p class="Notice--indent"><span class="Notice--bold">三、 咨询、 集中展示看样的时间与方式： 自 {{ d.conStartDate }} 起至 {{ d.conEndDate }} 止接受咨询（ 双休日、 节假日除外）。 有意看样者请于 {{ d.vieEndDate }} 前到达以下地点进行看样。</span></p>
                    <p>集中看样地点：</p>
                    <p class="Notice--indent">四、 标的物以实物现状为准， 我方不承担竞买标的瑕疵保证。 特别提醒， 有意者请亲自实地看样， 未看样的竞买人视为对本标的实物现状的确认， 由竞买人自行承担相应责任。</p>
                    <p class="Notice--indent">五、 竞拍前请与相关人员确认标的物的情况， 参与竞拍行为视为对标的物的确认， 由竞买人自行承担相应责任。</p>
                    <p class="Notice--indent"> <span class="Notice--bold">六、 本标的物竞得者应将竞买款在 {{ d.starBidTime }} 前缴入我方指定账户（户名：{{ d.account }}  开户银行：{{ d.bank }}  账号： {{ d.cardNo }}）。</span></p>
                    <p class="Notice--indent">七、 竞买成交买受人付清全部竞买价款后， 凭相关证件自行至标的物所在地接收车辆， 过户手续及风险请竞买人在竞买前自行到相关职能部门咨询确认， 过户费用由买受人自行承担。</p>
                    <p class="Notice--indent">竞买人在竞价前请务必再仔细阅读我方发布的的竞价须知。</p>
                    <p> 标的物详情咨询电话： {{ d.telephone }} <br> 联系地址：  {{ d.contact }}  </p>
                    <p class="Notice--right">{{ date2date(d.auditTime) }}</p>
                </div>
        </div>
    </div>
</template>

<script>
export default {

  name: 'CarSellNotice',

  data () {
    return {
         d: this.$store.state.CarInfoData.CarInfoData,
    }
  }
}
</script>


<style lang="scss" scoped>
@import "~@sass/_variables";
@import "~@sass/_func";


.Notice {
    font-size: pxToRem(28px);
    margin-top: pxToRem(10px);
    padding: 0 pxToRem(30px);
    background: #fff;
    padding-bottom: pxToRem(5px);

    p {
        margin: pxToRem(45px) auto;
        line-height: pxToRem(50px);
    }

    .Notice__title {
        padding: pxToRem(45px) 0 pxToRem(10px);
        text-align: center;
        font-size: pxToRem(32px);
    }

    .Notice--bold {
       font-weight: bold;
    }

    .Notice--indent {
        text-indent: pxToRem(50px);
    }

    .Notice--right {
        text-align: right;
    }
}
</style>