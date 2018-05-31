<template>
    <div id="RepayDetails">
        <div class="RepayDetails">
            <ul class="RepayDetails__ul">
                <li class="RepayDetails__header">
                    <div>本期还款共计</div>
                    <div>1900.40</div>
                </li>
                <li>
                    <div>本金</div>
                    <div>1900.40</div>
                </li>
                <li>
                    <div>利息</div>
                    <div>1900.40</div>
                </li>
                <li>
                    <div>服务费</div>
                    <div>1900.40</div>
                </li>
                <li>
                    <div>其他费用</div>
                    <div>1900.40</div>
                </li>
                <li>
                    <div>滞纳金</div>
                    <div>1900.40</div>
                </li>
                <li>
                    <div>结余</div>
                    <div>1900.40</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {

  name: 'RepayDetails',

  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@sass/_variables";
@import "~@sass/_func";

#RepayDetails {
    background-color: #f2f2f2;

    .RepayDetails {
        margin: pxToRem(20px) pxToRem(30px) pxToRem(30px);
        background-color: #ffffff;
        font-size: pxToRem(28px);
        box-shadow: 0 5px 20px 0 rgba(101, 101, 101, 0.1);
        padding-bottom: pxToRem(10px);
        border: pxToRem(4px);

        .RepayDetails__header {
            color: #999999;
            height: pxToRem(68px);
        }
        
        .RepayDetails__ul {
            li {
                list-style: none;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: pxToRem(88px);
                margin: 0 pxToRem(30px);
                position: relative;
            }

            li + li::before {
                @include border( 'top', #e5e5e5);
            }
        }
    }
}
</style>