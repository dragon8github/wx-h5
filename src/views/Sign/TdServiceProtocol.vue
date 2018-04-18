<template>
  <div id="TdServiceProtocol">
      <h1 class="center">团贷网服务协议</h1>

      <p>合同编号：<span class="bottom_line" v-html="poll(d.contractCode)"></span></p>
      <p>委托方（甲方）：<span class="bottom_line" v-html="poll(d.entrustName)"></span></p>
      <p>服务方（乙方）：<span class="bottom_line">东莞团贷网互联网科技服务有限公司</span></p>
      <p>地址：<span class="bottom_line">东莞市南城街道莞太路111号民间金融大厦1号楼28楼</span></p>
      <p>法定代表人：<span class="bottom_line">余军</span></p>


      <h1>一、重要提示</h1>
      <p>“团贷网平台”网络金融平台（运营网址：<a class="link" href="http://www.tuandai.com">http://www.tuandai.com</a>，以下简称“团贷网平台”）是由乙方负责运营的金融中介信息服务网站。甲方通过团贷网平台进行融资，乙方提供平台供甲方进行融资并收取相应中介服务费用。且甲方委托授权乙方完成本协议约定之内容，乙方有权在甲方授权范围内代为甲方行使相应的权利，甲方均予以承认。甲方成功融资后，乙方通过团贷网平台站内信告知甲方本次融资的综合资金成本（含利息及各类费用）。</p>

      <h1>二、提供服务及费用收取</h1>
      <p>
        <ul>
            <li>1、乙方为甲方提供的服务包括但不限于提供发布借款需求的平台、查阅交易机会、签订和查阅合同等业务。甲方授权委托乙方合作的第三方金融机构进行资金充值、提现、还款、定向支付、划扣款项等业务。</li>
            <li>2、乙方为甲方提供上述服务，甲方应支付乙方相应的服务费，甲方应支付乙方的服务费费率标准为甲方申请借款金额的<span class="bottom_line" v-html="poll(d.serviceScale)"></span>%，即该服务费为人民币<span class="bottom_line" v-html="poll(d.serviceMoney)"></span>元，支付时间：于本合同签订当日支付人民币<span class="bottom_line" v-html="poll(d.firstServiceMoney)"></span>元，次月开始每月<span class="bottom_line" v-html="poll(d.monthDate)"></span>日前支付人民币<span class="bottom_line" v-html="poll(d.perServiceMoney)"></span>元整，直至支付完全部服务费。</li>
            <li>3、若甲方申请提前结清全部借款本金的，在结清借款前，甲方需一次性向乙方支付结清时当月服务费的二倍作为违约金。</li>
            <li>4、现甲方申请在团贷网平台发标融资借款，借款金额为人民币<span class="bottom_line" v-html="poll(d.borrowerMoney)"></span>元（大写金额：<span class="bottom_line" v-html="poll(d.capitalMoney)"></span>元整），借款年化利率为<span class="bottom_line" v-html="poll(d.yearRate)"></span>%，借款期限为<span class="bottom_line" v-html="poll(d.borrowerLimit)"></span> 个月。</li>
        </ul>
      </p>

      <h1>三、甲方委托</h1>
      <p>甲方已委托<span class="bottom_line" v-html="poll(d.proxyName, 20)"></span>代为在团贷网平台操作融资借款事宜，甲方的委托事项包括但不限于在团贷网平台注册个人账户、上传资料、申请发布借款标、申请提现、按时充值还款等事宜（详细约定见甲方与代理方签署的《借款服务协议》），代理方代甲方处理上述事项均视为甲方之行为，乙方应给予配合。</p>

      <h1>四、融资款归集及委托转账</h1>
      <p>
        <ul>
          <li>1、甲方在团贷网平台发标融资借款，标满后该笔融资款应归集于甲方在团贷网平台合作的存管银行开设的个人账户（以下简称“个人账户”）。</li>
          <li>2、乙方有权根据本协议第二条约定收取相应的服务费，自融资款归集于甲方个人账户时，乙方即可将服务费从甲方个人账户中予以支付至乙方。 </li>
          <li>3、因甲方与代理方签订《信息咨询服务协议》由代理方为甲方融资提供服务，甲方需向代理方支付借款服务费用，甲方授权委托乙方自融资款归集于甲方个人账户时，代甲方将借款服务费用支付至代理方项下（支付金额按照《信息咨询服务协议》约定的服务费为准）。</li>
          <li>4、因本次融资借款事宜，甲方与担保公司“<span class="bottom_line" v-html="poll(d.bondCompany)"></span>”（以下简称“担保公司”）签署《提供担保协议书》，由担保公司为甲方本次融资借款提供担保。担保公司将根据团贷网平台规则为投资人提供担保服务。若投资人投资时为团贷网平台的超级会员，担保公司将提供融资金额（即为本次甲方在团贷网平台所融资借款的总金额）及利息的担保；若投资人投资时为团贷网平台的普通会员，担保公司将提供融资金额（即为本次甲方在团贷网平台所融资借款的总金额）的担保。甲方授权委托乙方在融资款归集于甲方个人账户时，代甲方将担保费支付至担保公司项下（支付金额按照《提供担保协议书》约定的担保费为准）。</li>
          <li>5、乙方完成上述款项的支付转款后，甲方委托乙方将其个人账户中余下款项提现至甲方的个人指定银行账户。</li>
          <li>6、乙方受甲方之委托，向团贷网平台合作的存管银行申请将该个人账户内的上述资金从甲方的个人账户中划转至甲方指定收款主体账户中，转账如产生费用及一切法律风险均由甲方个人承担，乙方仅依据本协议的约定履行相应的权利或义务。</li>
        </ul>
      </p>


      <h1>五、 代充值还款</h1>
      <p>
        <ul>
          <li>1、甲方可委托第三方（根据甲方向第三方出具的《还款服务委托书》）代为在团贷网平台进行个人账户定期充值。受托第三方通过网上银行在团贷网平台充值视为甲方本人行为，乙方应予以接受。充值后的资金乙方应按照甲方与各投资人在团贷网平台签署的《借款合同》约定还款时间准时划扣还款。</li>
          <li>2、甲方同时授权委托代理方（根据甲方与委托代理方签署的《信息咨询服务协议》约定）代为甲方在乙方运营平台充值用于归还融资借款，上述行为视为甲方个人行为。</li>
          <li>3、甲方同意并授权担保公司（根据甲方与担保公司签署的《提供担保协议》约定）在甲方逾期时，可直接将代偿款项支付至甲方个人账户，再由团贷网平台按《借款合同》约定划扣还款，上述行为视为担保公司已履行担保责任。</li>
        </ul>
      </p>
      
      <h1> 六、信息披露 </h1>
      <p>
        <ul>
            <li>1、乙方有义务根据有关法律要求向司法机关和政府部门提供用户的个人信息。</li>
            <li>2、为了保护投资人的合法权益或防止严重侵害他人合法权益或为了公共利益的需求，乙方将善意地披露甲方的个人信息。</li>
            <li>3、根据甲方与线上投资人签署的《借款合同》相关约定，甲方未按时足额还款的，乙方有权第一时间在团贷网平台披露甲方的个人信息。</li>
            <li>4、经国家生效法律文书或行政处罚决定确认甲方存在违法行为，或者乙方有足够的事实依据可以认定甲方存在违法或违反本协议的行为，甲方同意并授权乙方在团贷网平台公布甲方的违法、违约行为，并将该内容记入任何与甲方相关的信用资料和档案。</li>
        </ul>
      </p>

      <h1>七、争议解决方式</h1>
      <p> 因本合同发生的任何争议，由双方协商解决，协商不成的，任何一方提交<span class="bottom_line" v-html="poll(d.disputeSolve)"></span>。仲裁裁决是终局的，对各方均有约束力。 </p>

      <h1>八、生效</h1>
      <p> 本协议一式两份，双方各执一份。本协议自甲、乙双方签字或盖章立即生效。 </p>

      <p class="bold">各方签署：</p>
      <p>甲方：<span class="bottom_line" v-html="poll(d.signName, 30)"></span></p>
      <p>乙方：</p>
      <div class="right">
          <div class="right">
           <p>签约日期：<span class="bottom_line">{{ new Date().getFullYear() }}</span> 年 <span class="bottom_line">{{ pad(new Date().getMonth() + 1, 2) }}</span> 月 <span class="bottom_line">{{ pad(new Date().getDate(), 2) }}</span> 日 </p>
          </div>
      </div>
  </div>
</template>

<script>
import Toast    from '@components/toast/index.js'

export default {
  name: 'TdServiceProtocol',
  data () {
    return {
        d: this.$store.state.TdServiceProtocol || {}
    }
  },
  methods: {
    poll (data, n = 10) {
      if (!data || !data.trim()) {
          return (new Array(n + 1)).join('&nbsp');
      }
      return data
    }
  },
  beforeMount () {
      if (!this.$store.state.TdServiceProtocol) {
        this.$router.push('/sign')
        Toast('协议内容未找到，请重试');
      }
  }
}
</script>

<style scoped lang="scss">
@import "../../sass/variables";
@import "../../sass/func";
  #TdServiceProtocol {
    margin:auto pxToRem(60px);

    .bottom_line {
        border-bottom: 1px solid #000;
        padding-bottom: pxToRem(5px);
    }


    .link {
      color: #0e6ae7
    }

    p {
      font-size:pxToRem($font-size-small);
      color:$font-gray-color;
      text-indent: pxToRem(30px);
      letter-spacing: pxToRem(2px);
      line-height: pxToRem(55px);
      word-break: break-all;
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
