<template>
  <div id="RegProtocol">
      <h1 class="center">团贷网|网贷投资服务协议</h1>

      <p>委托方（甲方）：{{ AppData.customerName }}</p>
      <p>身份证号码：{{ AppData.identifyCard }}</p>

      <p>服务方（乙方）：东莞团贷网互联网科技服务有限公司</p>
      <p>地址：东莞市南城街道莞太路111号民间金融大厦1号楼28楼</p>
      <p>法定代表人：张林</p>


      <h1>一、重要提示</h1>
      <p>“团贷网|网贷投资”网络金融平台（运营网址：http://www.tuandai.com，以下简称“团贷网|网贷投资平台”）是由乙方负责运营的金融中介信息服务网站。甲方通过团贷网|网贷投资平台进行融资，乙方提供平台供甲方进行融资并收取相应中介服务费用。且甲方委托授权乙方完成本协议约定之内容，乙方有权在甲方授权范围内代为甲方行使相应的权利，甲方均予以承认。</p>

      <h1>二、提供服务及费用收取</h1>
      <p>
        <ul>
            <li>1、乙方为甲方提供的服务包括但不限于提供发布借款需求的平台、查阅交易机会、签订和查阅合同、资金充值、提现、还款、定向划扣款项等业务。</li>
            <li>2、乙方为甲方提供上述服务，甲方应支付乙方相应的服务费，甲方应支付乙方的服务费费率标准为甲方申请借款金额的{{ +(AppData.serviceFeeRate) * 100 }}%，即该服务费为人民币{{ AppData.serviceFee }}元，甲方按前述标准每月向乙方分期支付服务费，甲方每月支付服务费金额为人民币{{ AppData.serviceFeeMonthly }}元。若甲方申请提前结清，不足一个月的服务费按一个月来计算。</li>
            <li>3、现甲方申请在团贷网|网贷投资平台发标融资借款，借款金额为人民币{{ AppData.amount }}元（大写金额：{{ AppData.traditionalBigAmount }}），借款年化利率为{{ AppData.annualizedRate * 100 }}%，借款期限为{{ AppData.timeLimit }} 个月。</li>
        </ul>
      </p>

      <h1>三、甲方委托</h1>
      <p>甲方已委托<span class="bold">广东鸿特信息咨询有限公司</span>代为在团贷网|网贷投资平台操作融资借款事宜，甲方的委托事项包括但不限于在团贷网|网贷投资平台注册个人账户、上传资料、申请发布借款标、申请提现、按时充值还款等事宜（详细约定见甲方与代理方签署的《借款服务协议》），代理方代甲方处理上述事项均视为甲方之行为，乙方应给予配合。</p>

      <h1>四、甲方借款金额的划转及授权</h1>
      <p>
        <ul>
          <li>1、甲方在团贷网|网贷投资平台发标融资借款，标满后该笔借款应归集于甲方在团贷网|网贷投资平台合作的第三方存管银行开设的个人账户（以下简称“个人账户”）。</li>
          <li>2、乙方有权根据本协议第二条约定收取相应的服务费，自借款归集于甲方个人账户时，甲方授权第三方银行可将该服务费从甲方个人账户中予以扣除。 </li>
          <li>3、因甲方与代理方签订《借款服务协议》由代理方为甲方融资提供服务，甲方需向代理方支付借款服务费用，甲方授权委托乙方自融资款归集于甲方个人账户时，代甲方将借款服务费用划扣至代理方项下（划扣金额按照《借款服务协议》约定的服务费为准）。</li>
          <li>4、因本次融资借款事宜，甲方与担保公司“  东莞市联胜非融资性担保有限公司 ”（以下简称“担保公司”）签署《提供担保协议书》，由担保公司为甲方本次融资借款提供担保。担保公司将根据团贷网|网贷投资规则为投资人提供担保服务。若投资人投资时为团贷网|网贷投资的超级会员，担保公司将提供融资金额（即为本次甲方在团贷网|网贷投资平台所融资借款的总金额）及利息的担保；若投资人投资时为团贷网|网贷投资的普通会员，担保公司将提供融资金额（即为本次甲方在团贷网|网贷投资平台所融资借款的总金额）的担保。甲方授权委托乙方及第三方存管银行在借款资金划扣至甲方个人账户时，代甲方将担保费划扣至担保公司项下（划扣金额按照《提供担保协议书》约定的担保费为准）。</li>
          <li>5、第三方存管银行完成上述款项的划扣转款后，甲方委托第三方存管银行将其个人账户中余下款项提现至甲方的个人指定银行账户</li>
          <li>6、乙方受甲方之委托，向团贷网|网贷投资平台合作的第三方存管银行申请将该个人账户内的上述资金从甲方的个人账户中划转至甲方指定收款主体账户中，转账如产生费用及一切法律风险均由甲方个人承担，乙方仅依据本协议的约定履行相应的权利或义务。</li>
        </ul>
      </p>


      <h1>五、 充值还款</h1>
      <p>
        <ul>
          <li>1、甲方可向团贷网|网贷投资平台的个人账户中及时充值，第三方存款银行可在还款到期时予以划扣。</li>
          <li>2、甲方可委托第三方（根据甲方向第三方出具的《还款服务委托书》）代为在团贷网|网贷投资平台进行个人账户定期充值。受托第三方通过网上银行在团贷网|网贷投资平台充值视为甲方本人行为，乙方应予以接受。充值后的资金由第三方存管银行应按照甲方与各投资人在团贷网|网贷投资平台签署的《借款合同》约定还款时间准时划扣还款。</li>
        </ul>
      </p>
      
      <h1> 六、信息披露 </h1>
      <p>
        <ul>
            <li>1、乙方有义务根据有关法律要求向司法机关和政府部门提供用户的个人信息。</li>
            <li>2、为了保护投资人的合法权益或防止严重侵害他人合法权益或为了公共利益的需求，乙方将善意地披露甲方的个人信息。</li>
            <li>3、根据甲方与线上投资人签署的《借款合同》相关约定，甲方未按时足额还款的，乙方有权第一时间在团贷网|网贷投资平台披露甲方的个人信息。</li>
            <li>4、经国家生效法律文书或行政处罚决定确认甲方存在违法行为，或者乙方有足够的事实依据可以认定甲方存在违法或违反本协议的行为，甲方同意并授权乙方在团贷网|网贷投资平台公布甲方的违法、违约行为，并将该内容记入任何与甲方相关的信用资料和档案。</li>
        </ul>
      </p>

      <h1>七、争议解决方式</h1>
      <p> 因本合同发生的任何争议，由双方协商解决，协商不成的，任何一方提交湛江仲裁委员会在东莞仲裁，并适用书面简易程序审理。仲裁裁决是终局的，对各方均有约束力。 </p>

      <h1>八、生效</h1>
      <p> 本协议一式两份，双方各执一份。本协议自甲、乙双方签字或盖章立即生效。 </p>

      <p class="bold">各方签署：</p>
      <p>甲方：{{ AppData.customerName }}</p>
      <p>乙方：东莞团贷网互联网科技服务有限公司</p>
      <p>签署日期：{{ timer }}</p>
  </div>
</template>

<script>
export default {
  name: 'RegProtocol',
  data () {
    return {
        AppData: {},
        timer: ''
    }
  },
  beforeMount () {
      Date.prototype.format = function(format) {
          var o = {
              "M+": this.getMonth() + 1, //month 
              "d+": this.getDate(), //day 
              "h+": this.getHours(), //hour 
              "m+": this.getMinutes(), //minute 
              "s+": this.getSeconds(), //second 
              "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
              "S": this.getMilliseconds() //millisecond 
          }
          if (/(y+)/i.test(format)) {
              format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
          }
          for (var k in o) {
              if (new RegExp("(" + k + ")").test(format)) {
                  format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
              }
          }
          return format;
      }

      this.timer = new Date().format("yyyy年MM月dd日")

      this.Bridge.exec('GetTdServiceProtocolData', (AppData) => {
          this.AppData = AppData
      })
  }
}
</script>

<style scoped lang="scss">
@import "../../sass/variables";
@import "../../sass/func";
  #RegProtocol {
    margin:auto pxToRem(60px);

    p {
      font-size:pxToRem($font-size-small);
      color:$font-gray-color;
      text-indent: pxToRem(30px);
      letter-spacing: pxToRem(2px);
      line-height: pxToRem(55px);
    }

    .right {
      text-align: right;
    }

    .bold {
      color: $font-black-color;
      font-weight: bold;

    }

    .b {
      text-decoration: underline;
    }

    .n {
      padding-right:pxToRem(15px);
    }

    li {
      list-style: none;
    }

    h1 {
      font-size: pxToRem($font-size-middle);
      color:$font-black-color;
      text-align: center;
      margin-top: pxToRem(60px);
      text-indent: pxToRem(0px);

      &.center {
        text-align: center;
      }
    }
  }
</style>
