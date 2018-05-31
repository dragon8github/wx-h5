<template>
    <div id="RepayRecord">
        <ul class="RepayRecord__ul">
            <li>
                <div class="RepayRecord__top">
                    <div>中国建设银行</div>
                    <div>1745.40</div>
                </div>
                <div class="RepayRecord__bottom">
                    <div>2017-03-28  09:35</div>
                    <div>TDCZQ4052017091401</div>
                </div>
            </li>
            <li>
                <div class="RepayRecord__top">
                    <div>中国建设银行</div>
                    <div>1745.40</div>
                </div>
                <div class="RepayRecord__bottom">
                    <div>2017-03-28  09:35</div>
                    <div>TDCZQ4052017091401</div>
                </div>
            </li>
            <li>
                <div class="RepayRecord__top">
                    <div>中国建设银行</div>
                    <div>1745.40</div>
                </div>
                <div class="RepayRecord__bottom">
                    <div>2017-03-28  09:35</div>
                    <div>TDCZQ4052017091401</div>
                </div>
            </li>
            <li>
                <div class="RepayRecord__top">
                    <div>中国建设银行</div>
                    <div>1745.40</div>
                </div>
                <div class="RepayRecord__bottom">
                    <div>2017-03-28  09:35</div>
                    <div>TDCZQ4052017091401</div>
                </div>
            </li>
            <li>
                <div class="RepayRecord__top">
                    <div>中国建设银行</div>
                    <div>1745.40</div>
                </div>
                <div class="RepayRecord__bottom">
                    <div>2017-03-28  09:35</div>
                    <div>TDCZQ4052017091401</div>
                </div>
            </li>
            <li>
                <div class="RepayRecord__top">
                    <div>中国建设银行</div>
                    <div>1745.40</div>
                </div>
                <div class="RepayRecord__bottom">
                    <div>2017-03-28  09:35</div>
                    <div>TDCZQ4052017091401</div>
                </div>
            </li>
            <li>
                <div class="RepayRecord__top">
                    <div>中国建设银行</div>
                    <div>1745.40</div>
                </div>
                <div class="RepayRecord__bottom">
                    <div>2017-03-28  09:35</div>
                    <div>TDCZQ4052017091401</div>
                </div>
            </li>
            <li>
                <div class="RepayRecord__top">
                    <div>中国建设银行</div>
                    <div>1745.40</div>
                </div>
                <div class="RepayRecord__bottom">
                    <div>2017-03-28  09:35</div>
                    <div>TDCZQ4052017091401</div>
                </div>
            </li>
            <li>
                <div class="RepayRecord__top">
                    <div>中国建设银行</div>
                    <div>1745.40</div>
                </div>
                <div class="RepayRecord__bottom">
                    <div>2017-03-28  09:35</div>
                    <div>TDCZQ4052017091401</div>
                </div>
            </li>
            <li>
                <div class="RepayRecord__top">
                    <div>中国建设银行</div>
                    <div>1745.40</div>
                </div>
                <div class="RepayRecord__bottom">
                    <div>2017-03-28  09:35</div>
                    <div>TDCZQ4052017091401</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {

  name: 'RepayRecord',

  data () {
    return {

    }
  }
}
</script>


<style lang="scss" scoped>
@import "~@sass/_variables";
@import "~@sass/_func";

#RepayRecord {
    background-color:#fff;

    .RepayRecord__ul {
        margin: 0 pxToRem(30px);

        li {
            height: pxToRem(128px);
            position: relative;
        }

        li + li::before {
            @include border( 'top', #e5e5e5);
        }

        .RepayRecord__top {
            @include flex(b, c)
            font-size: pxToRem(28px);
            padding-top: pxToRem(30px);
            padding-bottom: pxToRem(20px);
            color: #022222;
        }

        .RepayRecord__bottom {
            @include flex(b, c)
            font-size: pxToRem(24px);
            color: #999999;
        }
    }
}
</style>