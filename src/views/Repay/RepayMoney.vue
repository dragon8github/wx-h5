<template>
    <div id="RepayMoney">
        <div class="RepayMoney">
            <div class="RepayMoney__ad">
                <h1>¥1745.40</h1>
                <p>本期还款</p>
            </div>
            <ul class="RepayMoney__ul">
                <li>
                    <div class="RepayMoney__key">默认支付方式</div>
                    <div class="RepayMoney__value">建设银行储蓄卡(0769)</div>
                </li>
                <li>
                    <div class="RepayMoney__key">银行预留手机号码</div>
                    <div class="RepayMoney__value">189****5555</div>
                </li>
                <li>
                    <div class="RepayMoney__key">持卡人</div>
                    <div class="RepayMoney__value">李**</div>
                </li>
            </ul>
        </div>

        <!-- 提交按钮 -->
        <div class="RepayMoney__sublime">
            <mt-button :text="'确 认'" @click="go" ></mt-button>
        </div>
    </div>
</template>

<script>
import mtButton    from '@myComponents/button.vue'

export default {

  name: 'RepayMoney',

  data () {
    return {

    }
  },
  components: {
    mtButton
  }
}
</script>

<style lang="scss" scoped>
@import "~@sass/_variables";
@import "~@sass/_func";

#RepayMoney {
    background-color: #f2f2f2;
}

.RepayMoney {
    background-color: #ffffff;
}

    .RepayMoney__ad {
        @include flex(c,c,c)
        height: pxToRem(287px);
        width: 100%;

        h1 {
            font-size: pxToRem(72px);
            color: #0e6ae7;
        }

        p {
            color: #999999;
            font-size: pxToRem(24px);
        }
    }

    .RepayMoney__ul {
        li {
            list-style: none;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: pxToRem(88px);
            margin: 0 pxToRem(30px);
            position: relative;
            font-size: pxToRem(28px);
        }

        .RepayMoney__key {
            color: #022222;
        }

        .RepayMoney__value {
            color: #999999;
        }


        li + li::before {
            @include border( 'top', #e5e5e5);
        }
    }

    .RepayMoney__sublime {
        margin: pxToRem(88px) pxToRem(30px);
    }
</style>