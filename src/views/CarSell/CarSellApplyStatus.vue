<template>
<div id="Status_view">
     <div id="Status">
        <div class="status-card">
            <div class="statusImg success"></div>
            <div class="status-title">报名成功！</div>

            <article class="status-text">
                尊敬的 {{ d.userName }} 先生/女士，<br>
                请在<span class='status-text-blue'> {{ date2date(d.starBidTime) }} </span>前将<span class='status-text-blue'> {{ d.bond }}元 </span>保证金打到如下账号，以获取竞拍资格。

                <div class="status-line"></div>
                <div class="status-gray">转账请备注注册账号和竞买车辆。如竞拍失败，保证金将如数退还。</div>
                <div class="status-address">
                    单位名称：  {{ d.account }}<br>
                    开户行：     {{ d.bank }}<br>
                    账号：   {{ d.cardNo }}
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
            d: this.$store.state.CarInfoData.CarInfoData || {},  // 汽车详情
        }
    },
    methods: {
        push () {
           // this.$router.push('/carsell');
           window.history.back()
        }
    },
    beforeMount () {
    }
  }
</script>

<style lang="scss" scoped>
@import "~@sass/_variables";
@import "~@sass/_func";
@import "~@sass/_status";

#Status_view {
  height: 100%;
}

#Status {
    padding-top: pxToRem(30px);
    min-height: pxToRem(1200px);
    height: 90%;

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
