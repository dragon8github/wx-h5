<template>
<div>
     <div id="Status">
        <div class="status-card">
            <div class="statusImg" :class="status.status"></div>
            <div class="status-title">报名成功！</div>

            <article class="status-text">
                尊敬的 李钊鸿 先生/女士，<br>
                请在<span class='status-text-blue'> 2018/02/28 </span>前将<span class='status-text-blue'> 5000元 </span>保证金打到如下账号，以获取竞拍资格。

                <div class="status-line"></div>
                <div class="status-gray">转账请备注注册账号和竞买车辆。如竞拍失败，保证金将如数退还。</div>
                <div class="status-address">
                    单位名称：  广东鸿特信息咨询有限公司<br>
                    开户行：    中国建设银行股份有限公司东莞宏伟路支行<br>
                    账号：   44050177020000000193
                </div>
            </article>
           
            <button class="mybutton" @click="push">确 定</button>
       </div>
    </div>
</div>
</template>

<script>
  import msg    from '@components/messagebox/messagebox.js'
  import Loader from '@components/loader/index.js'

  export default {
    name: 'Status',
    data () {
        return {
            status: this.$store.state.status.CarSellApplyStatus
        }
    },
    methods: {
        push () {
           this.$router.push('/carsell');
        }
    },
    beforeMount () {}
  }
</script>

<style lang="scss" scoped>
@import "~@sass/_variables";
@import "~@sass/_func";
@import "~@sass/_status";

#Status {
    padding-top: pxToRem(30px);

   .status-text {
       font-size: pxToRem(28px);
       line-height: pxToRem(65px);
       color: #222222;
       margin: pxToRem(60px) pxToRem(60px) 0;
   }

   .status-text-blue {
       color: #0e6ae7;
   }

   .status-line {
       @include line(63px, #ccc);
   }

   .status-gray {
       color: #999999;
       line-height: pxToRem(65px);
       font-size: pxToRem(28px);
   }

   .status-address {
       font-size: pxToRem(24px);
   }

   .status-card {
       height: 100%;
       position: relative;
   }

   .status-title {
      font-size: pxToRem(38px);
      text-align: center;
      width: 100%;
      text-indent: pxToRem(20px);
      margin: auto;
      margin-top: pxToRem(40px);
   }
}
</style>
