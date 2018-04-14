<template>
  <div id="GuaranteeProtocol">
      <h1 class="center">提供担保协议书</h1>
      <p>合同编号：<span class="bottom_line">{{ d.contractCode }}</span></p>
      <p>甲方（被保证人）：<span class="bottom_line">{{ d.borrowerName }}</span></p>
      <p>乙方（担保人）：<span class="bottom_line">{{ d.guaranteeName }}</span></p>
      <p>地址：<span class="bottom_line">{{ d.address }}</span></p>
      <p>法定代表人：<span class="bottom_line">{{ d.legalName }}</span></p>
      
      <p>
        甲方于<span class="bottom_line">{{ d.signYear }}</span> 年 <span class="bottom_line">{{ d.signMonth }}</span> 月 <span class="bottom_line">{{ d.signDate }}</span> 日与“团贷网平台”（运营网址：<a class="link" href="http://www.tuandai.com">http://www.tuandai.com</a>）签订《团贷网服务协议》，并向该平台申请发标融资借款，甲方申请发标借款的金额：<span class="bottom_line">{{ d.borrowerMoney }}</span>元，借款期限：<span class="bottom_line">{{ d.borrowerLimit }}</span>个月，借款年化利率<span class="bottom_line">{{ d.yearRate }}</span>%，还款方式为：<span class="bottom_line">{{ d.repaymentMethod }}</span> 。
         现甲方向乙方申请为上述借款向团贷网平台投资人提供担保。乙方经审查，同意为团贷网平台投资人提供此项担保。团贷网平台根据自身规则为平台用户提供普通会员和超级会员两种会员服务，乙方将根据团贷网平台规则为投资人提供担保服务。若投资人投资时为团贷网平台的超级会员，乙方将提供融资金额（即为本次甲方在团贷网平台所融资借款的总金额）及利息的担保；若投资人投资时为团贷网平台的普通会员，乙方将提供融资金额（即为本次甲方在团贷网平台所融资借款的总金额）的担保。双方根据国家有关法律、法规的规定，经协商一致，达成如下协议：
      </p>

      <p><span class="bold">第一条</span> 乙方为甲方在上述借款项下对团贷网平台线上的投资人（以下简称出借人）所负的债务根据团贷网平台会员制度规则提供担保，担保范围及担保期限等事项由甲方、出借人及乙方签订的《借款合同》或《借款协议》约定。</p>
      <p><span class="bold">第二条</span> 乙方为甲方提供担保，甲方应向乙方支付担保费人民币<span class="bottom_line" v-html="poll(d.guaranteeMoney)"></span>元。甲方应于本合同签订当日内向乙方一次性支付担保费。</p>
      <p><span class="bold">第三条</span> 具备下列条件后，乙方为甲方正式提供担保：
          <ul>
            <li>1、本协议书已签订生效；</li>
            <li>2、甲方已支付相应的担保费；</li>
            <li>3、乙方认为需要的其他条件已满足。</li>
          </ul>
      </p>
         
      <p><span class="bold">第四条</span>  担保借款用途：本担保借款只能用于<span class="bottom_line">{{ d.borrowerUse }}</span>。</p>
    
      <p class="bold">第五条  代偿与追偿</p>
        <ul>
            <li>1、乙方向债权人承担担保责任（或赔偿责任）的，有权向甲方追索下列所有款项费用：
              <p class="smalllP">
                  <ul>
                      <li>（1）乙方因承担担保责任而代偿的所有款项（包括垫付的本金、利息、复利、罚息、未支付的担保费等）；</li>
                      <li>（2）乙方因承担赔偿责任而支付的所有款项及其利息；</li>
                      <li>（3）乙方代偿所产生的滞纳金，滞纳金按每月2%，根据实际逾期天数计算。</li>
                      <li>（4）本协议约定的甲方应付的违约金；</li>
                      <li>（5）乙方为实现追偿权而支付的费用，包括但不限于诉讼费、仲裁费、财产保全费、诉讼保全担保费、律师费、差旅费、执行费、评估费、拍卖费、公证费、送达费、公告费等。</li>
                  </ul>
              </p>
            </li>
            <li>2、乙方有权在承担担保（或赔偿）责任的同时，即向甲方行使追偿权，并可同时选择行使反担保权利，直至收回本条第1款约定的所有款项费用。</li>
            <li>3、若乙方承担担保（或赔偿）责任的，则甲方在收到乙方的书面通知之日起5个工作日内，将通知载明的款项支付至乙方指定的收款账户。</li>
            <li>4、乙方承担了担保责任的自其承担责任之日起，对甲方及其继承人、受让人拥有绝对的追偿权，不受甲方接受上级单位任何指令和甲方与任何第三方签订的任何合同、文件的影响。</li>
            <li>5、鉴于乙方为甲方向出借人提供担保，故不论乙方与其他保证人（若有）在承担责任时内部如何要求对方分担份额，均不影响乙方代偿（赔偿）总额和本条第1项约定的所有款项费用，乙方代偿后有权向甲方行使全部的追偿权。 </li>
            <li>6、在债务履行期间，甲方应于每月还款日前将还款款项存入指定还款账户，否则视为甲方逾期还款，乙方可按如下方式承担担保责任：乙方将应代偿款项转入甲方在团贷网平台个人账户，再由团贷网平台按甲方与各投资人签署的《借款合同》约定划扣还款。甲方确认乙方上述行为已得甲方同意且视为乙方已履行担保责任，有权向甲方行使追索权。</li>
        </ul>
      <p class="bold">第六条  甲方声明与保证</p>
          <ul>
            <li>1、是中国的合法公民、法人及其他经济组织，其身份证明及住址是真实的、合法的；</li>
            <li>2、不存在针对其本人或其财产的正在进行的或悬而未决的诉讼、仲裁；</li>
            <li>3、签署和履行本协议书将不会违反任何有效的法律、法规或企业章程；</li>
            <li>4、所提交予乙方的各种资料及财产证明是真实的，并已如实、准确反映了甲方的经济状况；</li>
            <li>5、需支付的本协议书项下的金额款项不得有任何抵销或反索，并且不得因任何目前或未来税费或其他开支而有任何减少或预扣；</li>
            <li>6、保证按照乙方的要求提供有关财务会计资料及生产经营状况资料，并且对所提供资料的真实性、完整性和有效性负责；</li>
            <li>7、将本协议书项下被保证债务/义务的履行情况及时告知乙方；</li>
            <li>8、积极配合并自觉接受乙方对其生产经营、财务流动及本协议书项下被保证债务/义务的履行情况的检查、监督；</li>
            <li>9、在本协议书有效期间，甲方如要为他人债务提供担保，可能影响本协议书项下被担保债务的履行，甲方保证提前书面通知乙方并征得乙方同意；</li>
            <li>10、本协议项下反担保人出现停产、歇业、注销登记、被吊销营业执照、破产、被撤销以及经营亏损等情况，部分或全部丧失担保能力，或者作为本协议书项下反担保的抵押物、质押物/权利的价值减少、意外毁损或灭失，甲方保证及时提供乙方认可的其他担保；</li>
          </ul>
      <p class="bold">第七条 违约事件：</p>
          1、如发生下列情形之一，即构成甲方违约：
           <ul>
              <li>（1）甲方未支付本协议书项下应付的任何款项；</li>
              <li>（2）甲方未能履行或不遵守本协议书项下任何约定事项；</li>
              <li>（3）甲方在本协议书项下所作的任何陈述或保证，或提供的证明文件或报告及与本协议书有关的其他文件中的陈述或保证被发现在任何重要方面是不真实、不准确、不完整或使人误解的；</li>
              <li>（4）甲方没有付清欠其他债权人的到期（或因违约而提前到期）的任何债务，或即将被起诉，乙方认为可能或已经影响或损害乙方在本协议书项下的权益；</li>
              <li>（5）甲方出售或者以其他方式处置其全部或大部分财产；</li>
              <li>（6）政府或者其他债权人对甲方或反担保人的任何资产、权利或收益等依据法定程序强行征收、索赔、查封、扣押、冻结、没收、拍卖从而影响到乙方的权益的实现，以上情况在七天内仍未消除的。</li>
              <li>（7）甲方未按照其与出借人签订的借款合同履行分期还款计划的。</li>
           </ul>
           2、无论甲方发生何种违约事件，如经乙方通知后仍未纠正的，无论乙方各方面权益有没有受到损害或威胁，乙方均可要求甲方在乙方通知后的3天内将应还的全部款项转入乙方指定的账户进行提存，否则，甲方逾期还款导致乙方垫付后，甲方应向乙方支付垫付金额30%的惩罚性的违约金。另，乙方也可立即宣布本协议书项下被担保的债务及所有应付款项提前到期，甲方应立即提前偿还所有款项，否则应向乙方承担借款本息总额的30%的违约金。
      <p class="bold">第八条  违约责任</p>
          <ul>
             <li>1、如甲方未履行《借款合同》约定的义务，导致乙方应出借人或其权利的承继者要求为甲方承担担保责任的，则甲方自乙方代偿之日起，每日按代偿金额总和的1‰（千分之一）向乙方支付违约金，直至甲方向代偿方付清其已代偿的金额及违约金之日止。</li>
             <li>2、除甲方经乙方事先书面同意的外，甲方未按本协议书约定的用途使用借款的，乙方有权要求甲方提前归还全部借款，且甲方还应向乙方支付相当于借款本金20％的金额的违约金。</li>
             <li>3、违反本协议其他条款的约定的，乙方有权要求甲方提前归还全部借款，且甲方还应向乙方支付借款本金20％的违约金。</li>
             <li>4、本协议各条款约定的违约金均单独计算，相互间不重叠、不相互抵销，累计计算。</li>
             <li>5、违约金均由甲方在接到乙方的书面支付通知之日起3个工作日内将通知载明的违约金金额支付至乙方指定的收款账户。</li>
             <li>6、当甲方逾期还款天数大于等于10天时，乙方有权行使以下一项或几项权利：
                <p class="smalllP">
                    <ul>
                        <li>（1）乙方有权代为甲方提前垫付本合同项下担保金额。</li>
                        <li>（2）委托第三方或通过任何公众媒体发布公告等方式进行催收或追偿。</li>
                        <li>（3）采取法律、法规允许的其他救济措施。</li>
                    </ul>
                </p>
             </li>
          </ul>
      <p class="bold">第九条  合同转让：</p> 
      <p>甲方同意乙方可随时将其在合同中的全部或部分权利或义务转让给第三人。</p>

      <p class="bold">第十条  条款的分割性：</p> 
      <p>本协议书内的一切条款均为可分割及独立之条款，若其中任何条款无效，并不影响其他条款的有效性、合法性或强制性。本协议未尽事宜,甲乙双方可另行签订协议进行约定,另行签订协议与本协议具有同等法律效力。</p>

      <p class="bold">第十一条  争议的解决：</p>
      <ul>
        <li> 1、本协议书的订立、履行、解释、变更和争议的解决适用中华人民共和国法律，并受其约束。</li>
        <li> 2、若发生争议，双方应友好协商解决，协商不能解决时，任何一方提交<span class="bottom_line">{{ d.disputeSolve }}。</span></li>
      </ul>
         
      <p class="bold">第十二条  生效：</p>
      <p>本协议书自双方签署之日起生效。</p>

      <p class="bold">第十三条  通知送达</p>
          <ul>
            <li> 1、本协议双方之间的书面通知，可由专人送达、挂号邮递、特快专递、电子邮件等方式传送。</li>
            <li> 2、下列情形视为通知送达：
                 <p class="smalllP">
                     <ul>
                        <li>（1）专人递送的通知，在专人递送之交付日为有效送达；</li>
                        <li>（2）以挂号信（付清邮资）发出的通知，在寄出（以邮戳为凭）后的第肆日为有效送达；</li>
                        <li>（3）以特快专递（付清邮资）发出的通知，在寄出（以邮戳为凭）后的第叁日为有效送达；</li>
                        <li>（4）通过传真发出的，于得到传真发送报告确认该传真接收号码、发送页数和该传送已成功结束时为有效送达。</li>
                     </ul>
                 </p>
            </li>
            <li>3、甲乙双方在本协议中填写的联系地址即为其有效的送达地址/通讯地址。</li>
          </ul>
      <p class="bold">第十四条  其他事项</p>
          本协议书由双方经过充分友好协商自愿签订，双方已详读并同意遵守全部条款，现签字盖章作实。

      <p>甲方（被保证人）：</p>
      <p>乙方（担保人）：</p>
      <div class="right">
          <p>签约日期：<span class="bottom_line">{{d.signYear}}</span> 年 <span class="bottom_line">{{ d.signMonth }}</span> 月 <span class="bottom_line">{{ d.signDate }}</span> 日 </p>
      </div>
  </div>
</template>

<script>
import Toast from '@components/toast/index.js'

export default {
  name: 'GuaranteeProtocol',
  data () {
    return {
        d: this.$store.state.GuaranteeProtocol || {}
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
  computed: {
    timer () {
      return `${this.d.signYear}年${this.d.signMonth}月${this.d.signDate}日`
    }
  },
  beforeMount () {
      if (!this.$store.state.GuaranteeProtocol) {
        this.$router.push('/sign')
        Toast('协议内容未找到，请重试');
      }
  }
}
</script>

<style scoped lang="scss">
@import "../../sass/variables";
@import "../../sass/func";
  #GuaranteeProtocol {
      margin:auto pxToRem(60px);
      font-size:pxToRem($font-size-small);
      color:$font-gray-color;
      text-indent: pxToRem(30px);
      letter-spacing: pxToRem(2px);
      line-height: pxToRem(55px);
      word-break: break-all;


      .smalllP {
        font-size:pxToRem(20px);
      }

      .link {
        color: #0e6ae7
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

        &.center {
          text-align: center;
        }
      }
      .bottom_line {
          border-bottom: 1px solid #000;
          padding-bottom: pxToRem(5px);
      }
  }
</style>
