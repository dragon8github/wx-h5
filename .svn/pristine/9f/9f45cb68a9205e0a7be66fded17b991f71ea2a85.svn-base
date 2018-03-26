<template>
    <div class="CarSellProtocol">
        <div class="buyneedknow">
                <div class="buyneedknow__title buyneedknow--bold "> 竞买须知 </div>
                <div>
                    <p>我方将于  {{ d.startPriceDate }} 至 {{ d.etartPriceDate }} 止（延时的除外）进行公开竞买活动，现就有关的竞买事宜敬告各位竞买人：</p>
                    <p>一、凡具备完全民事行为能力的公民、法人和其他组织均可参加竞买。</p>
                    <p>不符合条件参加竞买的，竞买人自行承担相应的法律责任。</p>
                    <p>二、本次竞买活动设置延时出价功能，在竞买活动结束前，每最后5分钟如果有竞买人出价，就自动延迟5分钟。</p>
                    <p>三、参与竞买前，竞买人需已线下支付保证金，竞买未成交的，竞买人的保证金在竞买活动结束后可退还。</p>
                    <p>四、本次竞买活动是实地看样展示活动后才举行的，我方对竞买标的物所作的说明和提供的视频资料、图片等，仅供竞买人参考，不构成对标的物的任何担保。竞买标的以现状进行竞买，其外观、结构、固定装修及内在质量以移交时的现状为准。所以请竞买人在竞买前必须仔细审查竞买标的物，调查是否存在瑕疵，自行了解落户地市车辆过户问题，认真研究查看所竞买标的物的实际情况，并请亲临展示现场，实地看样，未看样的竞买人视为对本标的实物现状的确认，慎重决定竞买行为，竞买人一旦作出竞买决定，即表明已完全了解，并接受标的物的现状和一切已知及未知的瑕疵。</p>
                    <p>对竞买标的能否办理过户手续、办理时间以及过户等情况，请竞买人在竞买前自行到相关职能部门咨询确认。涉及违法、违章部分，由买受人自行接受行政主管部门依照有关行政法规的处理。   </p>
                    <p>五、竞买活动结束后，竞买成功的竞买人应于 {{ d.paymentEndTime }} 前将竞买成交价余款（扣除保证金后的余款）缴纳完毕，并凭相关证件自行前往指定地点接收车辆。</p>
                    <p>六、竞买成交后买受人悔拍的，交纳的保证金不予退还，我方可以重新举行竞价。</p>
                    <p>七、买受人按规定付清成交款后，需办理财产权证的证照转移、变更手续的，自行办理过户手续，由买受人自行承担过户涉及的一切费用。能否办理过户手续及办理过户手续的时间请竞买人在竞买前自行到相关职能部门咨询确认，标的物现状及存在瑕疵等原因不能或延迟办理过户手续及办理二次过户造成的费用增加的后果自负，我方不作过户的任何承诺，不承担过户涉及的一切费用。</p>
                    <p>标的物如有原违章记录等由买受人自行负责处理，相应的罚款、养路规费、停车费用等及其他可能存在的一切拖欠的费用及未明确缴费义务人的费用亦由买受人自行解决（交通罚款扣分情况请咨询各地职能部门），我方不承担上述费用。</p>
                    <p>八、买受人付款后应及时提取标的物，并办理交接手续，逾期不办理的，买受人应支付由此产生的费用，并承担本标的物可能发生的损毁、灭失等后果。</p>
                    <p>九、本次竞买活动计价货币为人民币，竞买时的起始价、成交价均不含买受人在拍卖标的物交割、过户时所发生的全部费用和税费。</p>
                    <p>因网络或其他不可抗力导致竞买活动无法正常进行的，我方待以上因素消除后视情决定重新举行竞买活动，并不承担因此造成的损失。</p>
                    <p>十、为便于买受人及时收到我方竞买活动相关的通知，竞买人应在竞价前如实提供联系方式、身份信息和保证金账号信息。</p>
                    <p>本规则其他未尽事宜，请向我方工作人员咨询。</p>
                    <p>咨询电话: {{ d.telephone }}<br>联系地址：{{ d.contact }}</p>
                    <p class="buyneedknow--right">{{ date2date(d.auditTime) }}</p>
                </div>
        </div>
    </div>
</template>

<script>
export default {

  name: 'CarSellProtocol',

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
</style>