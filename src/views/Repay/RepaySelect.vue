<template>
    <div id="RepaySelect">
        <div class="RepaySelect">
            <div class="RepaySelect__header">
                <div>剩余4期</div>
                <div>金额（元）</div>
            </div>
            <ul class="RepaySelect__ul">
                <li>
                    <label>
                        <div class="RepaySelect__time">2017-08-28</div>
                        <div class="RepaySelect__money">1900.40</div>
                    </label>
                </li>
                <li>
                    <label>
                        <div class="RepaySelect__time">2017-08-28</div>
                        <div class="RepaySelect__money">1900.40</div>
                    </label>
                </li>
                <li>
                    <label>
                        <div class="RepaySelect__time">2017-08-28</div>
                        <div class="RepaySelect__money">1900.40</div>
                    </label>
                </li>
                <li>
                    <label>
                        <div class="RepaySelect__time">2017-08-28</div>
                        <div class="RepaySelect__money">1900.40</div>
                    </label>
                </li>
            </ul>
            <div class="RepaySelect__footer">
                <div class="RepaySelect__footer--text">未还共计：6254.60</div>
            </div>
        </div>

        <!-- 提交按钮 -->
        <div class="RepaySelect__sublime">
            <mt-button :text="'确 认'" @click="go" ></mt-button>
        </div>
    </div>
</template>

<script>
import mtButton    from '@myComponents/button.vue'

export default {

  name: 'RepaySelect',

  data () {
    return {

    }
  },
  methods: {
    go () {

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

#RepaySelect {
    background-color: #f2f2f2;
}

.RepaySelect {
    
}

    .RepaySelect__header {
        @include flex(b, c);
        margin: 0 pxToRem(30px);
        color: #999999;
        font-size: pxToRem(28px);
        height: pxToRem(68px);
    }

    .RepaySelect__ul {
        background-color: #ffffff;
        font-size: pxToRem(28px);

        li {
            position: relative;
            margin: 0 pxToRem(30px);
            list-style: none;
        }

        li > label {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: pxToRem(88px);
        }    
        
        .RepaySelect__time {
            color: #022222;
        }

        .RepaySelect__money {
            color: #0e6ae7;
        }

        li::after {
            @include border( 'bottom', #e5e5e5);
        }    
    }

    .RepaySelect__footer {
        @include flex(e, c);
        padding: 0 pxToRem(30px);
        color: #999999;
        font-size: pxToRem(28px);
        height: pxToRem(68px);
        background-color: #ffffff;
    }

    .RepaySelect__sublime {
        margin: pxToRem(88px) pxToRem(30px);
    }
    
</style>